'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Upload,
  X,
  Image as ImageIcon,
  Video,
  File,
  Loader2,
  Eye,
  Trash2,
  RotateCcw
} from 'lucide-react'

export interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
  size: number
  name: string
  // Upload states
  uploading?: boolean
  uploaded?: boolean
  uploadProgress?: number
  url?: string
  error?: string
}

interface DropzoneProps {
  files: MediaFile[]
  onChange: (files: MediaFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  accept?: string[]
  disabled?: boolean
  className?: string
  showPreview?: boolean
  allowMultiple?: boolean
  onUpload?: (files: MediaFile[]) => Promise<void>
}

export const Dropzone = ({
  files,
  onChange,
  maxFiles = 10,
  maxSize = 50,
  accept = ['image/*', 'video/*'],
  disabled = false,
  className,
  showPreview = true,
  allowMultiple = true,
  onUpload
}: DropzoneProps) => {
  const [dragActive, setDragActive] = useState(false)

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
        size: file.size,
        name: file.name,
        uploading: false,
        uploaded: false,
        uploadProgress: 0
      }
    })

    const updatedFiles = allowMultiple 
      ? [...files, ...newFiles].slice(0, maxFiles)
      : newFiles.slice(0, 1)
    
    onChange(updatedFiles)
  }, [files, maxFiles, onChange, allowMultiple])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    maxFiles: allowMultiple ? maxFiles - files.length : 1,
    disabled: disabled || files.length >= maxFiles,
    multiple: allowMultiple,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  })

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId)
    onChange(updatedFiles)
  }

  const retryUpload = async (fileId: string) => {
    if (!onUpload) return
    
    const file = files.find(f => f.id === fileId)
    if (!file) return

    try {
      await onUpload([file])
    } catch (error) {
      console.error('Retry upload failed:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  const canAddMore = files.length < maxFiles

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone Area */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer',
            'hover:border-primary/50 hover:bg-primary/5',
            isDragActive || dragActive
              ? 'border-primary bg-primary/10 scale-[1.02]'
              : 'border-muted-foreground/25',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
              isDragActive || dragActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}>
              <Upload className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive || dragActive
                  ? 'Thả file vào đây...'
                  : 'Kéo thả file hoặc click để chọn'
                }
              </p>
              <p className="text-xs text-muted-foreground">
                Hỗ trợ {accept.join(', ')} • Tối đa {maxSize}MB • {allowMultiple ? `${maxFiles} files` : '1 file'}
              </p>
            </div>
            
            <Button variant="outline" size="sm" type="button">
              Chọn file
            </Button>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Files đã chọn ({files.length}/{maxFiles})
            </h4>
            {files.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange([])}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Xóa tất cả
              </Button>
            )}
          </div>

          <div className="grid gap-3">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {/* Preview */}
                    {showPreview && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {file.type === 'image' ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : file.type === 'video' ? (
                          <video
                            src={file.preview}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                        
                        {/* Status Overlay */}
                        {file.uploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 text-white animate-spin" />
                          </div>
                        )}
                        
                        {file.uploaded && (
                          <div className="absolute top-1 right-1">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <Eye className="h-2 w-2 text-white" />
                            </div>
                          </div>
                        )}
                        
                        {file.error && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {/* Status Badge */}
                          {file.uploading && (
                            <Badge variant="secondary" className="text-xs">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Uploading
                            </Badge>
                          )}
                          
                          {file.uploaded && (
                            <Badge variant="default" className="text-xs">
                              Uploaded
                            </Badge>
                          )}
                          
                          {file.error && (
                            <Badge variant="destructive" className="text-xs">
                              Error
                            </Badge>
                          )}
                          
                          {!file.uploading && !file.uploaded && !file.error && (
                            <Badge variant="outline" className="text-xs">
                              Ready
                            </Badge>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            {file.error && onUpload && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => retryUpload(file.id)}
                                className="h-6 w-6 p-0"
                              >
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Upload Progress */}
                      {file.uploading && typeof file.uploadProgress === 'number' && (
                        <div className="mt-2">
                          <Progress value={file.uploadProgress} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {file.uploadProgress}% uploaded
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {file.error && (
                        <p className="text-xs text-destructive mt-1">
                          {file.error}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropzone
