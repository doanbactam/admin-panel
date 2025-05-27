'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dropzone, MediaFile } from '@/components/ui/kibo-ui/dropzone'
import {
  Upload,
  Image as ImageIcon,
  Video,
  AlertCircle,
  CheckCircle,
  Loader2,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnhancedMediaUploadProps {
  files: MediaFile[]
  onChange: (files: MediaFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  accept?: string[]
  className?: string
  folder?: string
  postType?: 'post' | 'reel' | 'story'
  disabled?: boolean
  showUploadButton?: boolean
  autoUpload?: boolean
}

export const EnhancedMediaUpload = ({
  files,
  onChange,
  maxFiles = 10,
  maxSize = 50,
  accept = ['image/*', 'video/*'],
  className,
  folder = 'posts',
  postType = 'post',
  disabled = false,
  showUploadButton = false,
  autoUpload = false
}: EnhancedMediaUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Adjust settings based on post type
  const getPostTypeSettings = () => {
    switch (postType) {
      case 'reel':
        return {
          maxFiles: 1,
          accept: ['video/*'],
          description: 'Reels chỉ hỗ trợ 1 video (15s-90s, tỷ lệ 9:16)'
        }
      case 'story':
        return {
          maxFiles: 1,
          accept: ['image/*', 'video/*'],
          description: 'Stories hỗ trợ 1 hình ảnh hoặc video (tỷ lệ 9:16)'
        }
      default:
        return {
          maxFiles,
          accept,
          description: `Hỗ trợ tối đa ${maxFiles} hình ảnh/video`
        }
    }
  }

  const settings = getPostTypeSettings()

  // Upload files to server
  const uploadFiles = useCallback(async (filesToUpload: MediaFile[]) => {
    if (filesToUpload.length === 0) return

    setUploading(true)
    setUploadError(null)

    try {
      const uploadPromises = filesToUpload.map(async (mediaFile) => {
        // Update file status to uploading
        updateFileStatus(mediaFile.id, { 
          uploading: true, 
          uploadProgress: 0,
          error: undefined 
        })

        try {
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
            uploadProgress: 100,
            error: undefined
          })

          return result
        } catch (error) {
          // Update file with error
          updateFileStatus(mediaFile.id, {
            uploading: false,
            uploaded: false,
            uploadProgress: 0,
            error: error instanceof Error ? error.message : 'Upload failed'
          })
          throw error
        }
      })

      await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [folder])

  // Update file status helper
  const updateFileStatus = (fileId: string, updates: Partial<MediaFile>) => {
    onChange(files.map(file => 
      file.id === fileId 
        ? { ...file, ...updates }
        : file
    ))
  }

  // Handle file changes
  const handleFilesChange = (newFiles: MediaFile[]) => {
    onChange(newFiles)
    
    // Auto upload if enabled
    if (autoUpload) {
      const unuploadedFiles = newFiles.filter(f => !f.uploaded && !f.uploading)
      if (unuploadedFiles.length > 0) {
        uploadFiles(unuploadedFiles)
      }
    }
  }

  // Manual upload trigger
  const handleUpload = () => {
    const unuploadedFiles = files.filter(f => !f.uploaded && !f.uploading && !f.error)
    uploadFiles(unuploadedFiles)
  }

  // Get upload statistics
  const getUploadStats = () => {
    const total = files.length
    const uploaded = files.filter(f => f.uploaded).length
    const uploading = files.filter(f => f.uploading).length
    const errors = files.filter(f => f.error).length
    const pending = total - uploaded - uploading - errors

    return { total, uploaded, uploading, errors, pending }
  }

  const stats = getUploadStats()

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {postType === 'reel' ? (
            <Video className="h-5 w-5 text-purple-600" />
          ) : (
            <ImageIcon className="h-5 w-5 text-blue-600" />
          )}
          <h3 className="text-sm font-medium">
            {postType === 'reel' ? 'Video cho Reel' : 'Hình ảnh & Video'}
          </h3>
        </div>

        {/* Upload Stats */}
        {files.length > 0 && (
          <div className="flex items-center gap-2">
            {stats.uploaded > 0 && (
              <Badge variant="default" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                {stats.uploaded} uploaded
              </Badge>
            )}
            {stats.uploading > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                {stats.uploading} uploading
              </Badge>
            )}
            {stats.errors > 0 && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {stats.errors} errors
              </Badge>
            )}
            {stats.pending > 0 && (
              <Badge variant="outline" className="text-xs">
                {stats.pending} pending
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Dropzone */}
      <Dropzone
        files={files}
        onChange={handleFilesChange}
        maxFiles={settings.maxFiles}
        maxSize={maxSize}
        accept={settings.accept}
        disabled={disabled}
        allowMultiple={postType !== 'reel' && postType !== 'story'}
        onUpload={uploadFiles}
        showPreview={true}
      />

      {/* Upload Button */}
      {showUploadButton && !autoUpload && stats.pending > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={handleUpload}
            disabled={uploading || disabled}
            className="w-full sm:w-auto"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Tải lên {stats.pending} file
              </>
            )}
          </Button>
        </div>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Info */}
      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">{settings.description}</p>
            <p>
              {autoUpload 
                ? 'Files sẽ được tải lên tự động khi chọn'
                : 'Files sẽ được tải lên khi bạn đăng bài hoặc lên lịch'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Post Type Specific Warnings */}
      {postType === 'reel' && files.length > 0 && (
        <Alert>
          <Video className="h-4 w-4" />
          <AlertDescription>
            Đảm bảo video có tỷ lệ khung hình 9:16 (dọc) và thời lượng 15-90 giây để có hiệu quả tốt nhất trên Reels.
          </AlertDescription>
        </Alert>
      )}

      {postType === 'post' && files.length > 4 && (
        <Alert>
          <ImageIcon className="h-4 w-4" />
          <AlertDescription>
            Bạn đang chọn {files.length} files. Facebook sẽ tạo album carousel cho nhiều hình ảnh.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default EnhancedMediaUpload
