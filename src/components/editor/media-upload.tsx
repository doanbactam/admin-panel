'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Upload,
  X,
  Image as ImageIcon,
  Video,
  File,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
  uploading?: boolean
  uploaded?: boolean
  url?: string
  uploadProgress?: number
  error?: string
  s3Key?: string
}

interface MediaUploadProps {
  files: MediaFile[]
  onChange: (files: MediaFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  accept?: string[]
  className?: string
  folder?: string
  enableS3Upload?: boolean
}

export const MediaUpload = ({
  files,
  onChange,
  maxFiles = 10,
  maxSize = 50, // 50MB
  accept = ['image/*', 'video/*'],
  className,
  folder = 'general',
  enableS3Upload = true
}: MediaUploadProps) => {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: MediaFile[] = acceptedFiles.map(file => {
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
        uploading: false,
        uploaded: false
      }
    })

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
    onChange(updatedFiles)

    // Auto upload to S3 if enabled
    if (enableS3Upload) {
      newFiles.forEach(uploadFile)
    }
  }, [files, maxFiles, onChange, enableS3Upload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles
  })

  // Upload file to S3
  const uploadFile = async (mediaFile: MediaFile) => {
    try {
      // Update file status to uploading
      updateFileStatus(mediaFile.id, { uploading: true, uploadProgress: 0 })

      const formData = new FormData()
      formData.append('file', mediaFile.file)
      formData.append('folder', folder)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()

      // Update file with upload result
      updateFileStatus(mediaFile.id, {
        uploading: false,
        uploaded: true,
        url: result.media.url,
        s3Key: result.media.id,
        uploadProgress: 100
      })

    } catch (error) {
      console.error('Upload error:', error)
      updateFileStatus(mediaFile.id, {
        uploading: false,
        uploaded: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        uploadProgress: 0
      })
    }
  }

  // Update file status
  const updateFileStatus = (fileId: string, updates: Partial<MediaFile>) => {
    const updatedFiles = files.map(file =>
      file.id === fileId ? { ...file, ...updates } : file
    )
    onChange(updatedFiles)
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => {
      if (file.id === id) {
        URL.revokeObjectURL(file.preview)
        return false
      }
      return true
    })
    onChange(updatedFiles)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {files.length < maxFiles && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">
              Thả file vào đây...
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Kéo thả file vào đây hoặc click để chọn
              </p>
              <p className="text-xs text-muted-foreground">
                Hỗ trợ: {accept.join(', ')} • Tối đa {maxSize}MB • {maxFiles - files.length} file còn lại
              </p>
            </div>
          )}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <Card key={file.id} className="relative group">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  {/* Preview */}
                  <div className="flex-shrink-0">
                    {file.type === 'image' ? (
                      <img
                        src={file.preview}
                        alt={file.file.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {file.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.file.size)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {file.type}
                      </Badge>
                      {file.uploading && (
                        <Badge variant="secondary" className="text-xs">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          {file.uploadProgress ? `${file.uploadProgress}%` : 'Uploading...'}
                        </Badge>
                      )}
                      {file.uploaded && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          ✓ Uploaded
                        </Badge>
                      )}
                      {file.error && (
                        <Badge variant="destructive" className="text-xs">
                          ✗ Error
                        </Badge>
                      )}
                    </div>
                    {file.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {file.error}
                      </p>
                    )}
                    {enableS3Upload && !file.uploaded && !file.uploading && !file.error && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => uploadFile(file)}
                        className="mt-2 text-xs h-6"
                      >
                        Upload to Cloud
                      </Button>
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      {files.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {files.length} file(s) đã chọn • {files.filter(f => f.uploaded).length} đã upload
        </div>
      )}
    </div>
  )
}
