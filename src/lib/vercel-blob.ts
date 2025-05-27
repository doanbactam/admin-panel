import { put, del, list } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
}

export interface MediaMetadata {
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
}

// Generate unique file key
export function generateFileKey(originalName: string, userId: string): string {
  const timestamp = Date.now()
  const uuid = uuidv4()
  const extension = originalName.split('.').pop()
  return `media/${userId}/${timestamp}-${uuid}.${extension}`
}

// Upload file to Vercel Blob
export async function uploadToVercelBlob(
  buffer: Buffer,
  key: string,
  metadata: MediaMetadata
): Promise<UploadResult> {
  try {
    const blob = await put(key, buffer, {
      access: 'public',
      contentType: metadata.mimeType,
      addRandomSuffix: false,
    })

    return {
      success: true,
      url: blob.url,
      key: key,
    }
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

// Delete file from Vercel Blob
export async function deleteFromVercelBlob(url: string): Promise<boolean> {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error)
    return false
  }
}

// List files in Vercel Blob
export async function listVercelBlobFiles(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix: prefix || 'media/',
      limit: 1000,
    })
    return blobs
  } catch (error) {
    console.error('Error listing Vercel Blob files:', error)
    return []
  }
}

// Validate file type and size
export function validateFile(file: File, maxSize: number = 50): { valid: boolean; error?: string } {
  // Check file size (in MB)
  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize}MB limit`,
    }
  }

  // Check file type
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/webm',
  ]

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not supported',
    }
  }

  return { valid: true }
}

// Get file type category
export function getFileCategory(mimeType: string): 'image' | 'video' | 'other' {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  return 'other'
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Check if Vercel Blob is configured
export function isVercelBlobConfigured(): boolean {
  return !!(process.env.BLOB_READ_WRITE_TOKEN)
}

// Get storage type preference
export function getStorageType(): 'vercel' | 's3' | 'local' {
  if (isVercelBlobConfigured()) return 'vercel'
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) return 's3'
  return 'local'
}
