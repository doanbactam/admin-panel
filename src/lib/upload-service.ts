import { MediaFile } from '@/components/ui/kibo-ui/dropzone'

export interface UploadProgress {
  fileId: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  url?: string
}

export interface UploadResult {
  success: boolean
  uploadedFiles: Array<{
    id: string
    url: string
    mediaId: string
  }>
  errors: Array<{
    id: string
    error: string
  }>
}

class UploadService {
  private uploadQueue: Map<string, MediaFile> = new Map()
  private progressCallbacks: Map<string, (progress: UploadProgress) => void> = new Map()

  // Add files to upload queue (no immediate upload)
  queueFiles(files: MediaFile[], onProgress?: (progress: UploadProgress) => void): void {
    files.forEach(file => {
      this.uploadQueue.set(file.id, file)
      if (onProgress) {
        this.progressCallbacks.set(file.id, onProgress)
      }
    })
  }

  // Remove files from queue
  removeFromQueue(fileIds: string[]): void {
    fileIds.forEach(id => {
      this.uploadQueue.delete(id)
      this.progressCallbacks.delete(id)
    })
  }

  // Get queued files
  getQueuedFiles(): MediaFile[] {
    return Array.from(this.uploadQueue.values())
  }

  // Upload all queued files
  async uploadQueuedFiles(folder: string = 'posts'): Promise<UploadResult> {
    const files = this.getQueuedFiles()
    if (files.length === 0) {
      return { success: true, uploadedFiles: [], errors: [] }
    }

    const uploadedFiles: Array<{ id: string; url: string; mediaId: string }> = []
    const errors: Array<{ id: string; error: string }> = []

    // Upload files in parallel with progress tracking
    const uploadPromises = files.map(async (file) => {
      try {
        // Notify upload start
        this.notifyProgress(file.id, {
          fileId: file.id,
          progress: 0,
          status: 'uploading'
        })

        const result = await this.uploadSingleFile(file, folder, (progress) => {
          this.notifyProgress(file.id, {
            fileId: file.id,
            progress,
            status: 'uploading'
          })
        })

        // Notify completion
        this.notifyProgress(file.id, {
          fileId: file.id,
          progress: 100,
          status: 'completed',
          url: result.url
        })

        uploadedFiles.push({
          id: file.id,
          url: result.url,
          mediaId: result.mediaId
        })

        // Remove from queue after successful upload
        this.removeFromQueue([file.id])

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed'
        
        // Notify error
        this.notifyProgress(file.id, {
          fileId: file.id,
          progress: 0,
          status: 'error',
          error: errorMessage
        })

        errors.push({
          id: file.id,
          error: errorMessage
        })
      }
    })

    await Promise.all(uploadPromises)

    return {
      success: errors.length === 0,
      uploadedFiles,
      errors
    }
  }

  // Upload single file with progress
  private async uploadSingleFile(
    file: MediaFile, 
    folder: string,
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; mediaId: string }> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('folder', folder)

      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          onProgress?.(progress)
        }
      })

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const result = JSON.parse(xhr.responseText)
            resolve({
              url: result.media.url,
              mediaId: result.media.id
            })
          } catch (error) {
            reject(new Error('Invalid response format'))
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText)
            reject(new Error(error.error || `Upload failed with status ${xhr.status}`))
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        }
      })

      // Handle errors
      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was aborted'))
      })

      // Start upload
      xhr.open('POST', '/api/media/upload')
      xhr.send(formData)
    })
  }

  // Notify progress to callbacks
  private notifyProgress(fileId: string, progress: UploadProgress): void {
    const callback = this.progressCallbacks.get(fileId)
    if (callback) {
      callback(progress)
    }
  }

  // Upload files immediately (for backward compatibility)
  async uploadFiles(files: MediaFile[], folder: string = 'posts'): Promise<UploadResult> {
    this.queueFiles(files)
    return this.uploadQueuedFiles(folder)
  }

  // Clear all queued files
  clearQueue(): void {
    this.uploadQueue.clear()
    this.progressCallbacks.clear()
  }

  // Get upload statistics
  getUploadStats(): {
    total: number
    pending: number
    uploading: number
    completed: number
    errors: number
  } {
    const files = this.getQueuedFiles()
    return {
      total: files.length,
      pending: files.filter(f => !f.uploading && !f.uploaded && !f.error).length,
      uploading: files.filter(f => f.uploading).length,
      completed: files.filter(f => f.uploaded).length,
      errors: files.filter(f => f.error).length
    }
  }

  // Validate files before upload
  validateFiles(files: MediaFile[], options: {
    maxSize?: number // in MB
    allowedTypes?: string[]
    maxFiles?: number
  } = {}): { valid: MediaFile[]; invalid: Array<{ file: MediaFile; reason: string }> } {
    const { maxSize = 50, allowedTypes = ['image/*', 'video/*'], maxFiles = 10 } = options
    
    const valid: MediaFile[] = []
    const invalid: Array<{ file: MediaFile; reason: string }> = []

    // Check total file count
    if (files.length > maxFiles) {
      files.slice(maxFiles).forEach(file => {
        invalid.push({ file, reason: `Exceeded maximum files limit (${maxFiles})` })
      })
    }

    files.slice(0, maxFiles).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        invalid.push({ file, reason: `File size exceeds ${maxSize}MB limit` })
        return
      }

      // Check file type
      const isAllowed = allowedTypes.some(type => {
        if (type.endsWith('/*')) {
          const category = type.replace('/*', '')
          return file.file.type.startsWith(category)
        }
        return file.file.type === type
      })

      if (!isAllowed) {
        invalid.push({ file, reason: `File type not allowed. Allowed: ${allowedTypes.join(', ')}` })
        return
      }

      valid.push(file)
    })

    return { valid, invalid }
  }
}

// Export singleton instance
export const uploadService = new UploadService()

// Export utility functions
export const createMediaFile = (file: File): MediaFile => {
  const id = Math.random().toString(36).substr(2, 9)
  const preview = URL.createObjectURL(file)

  let type: 'image' | 'video' | 'other' = 'other'
  if (file.type.startsWith('image/')) type = 'image'
  else if (file.type.startsWith('video/')) type = 'video'

  return {
    id,
    file,
    preview,
    type,
    size: file.size,
    name: file.name,
    uploading: false,
    uploaded: false,
    uploadProgress: 0
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default uploadService
