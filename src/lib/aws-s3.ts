import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { put, del } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'facebook-admin-panel-media'
const CDN_URL = process.env.AWS_CLOUDFRONT_URL || `https://${BUCKET_NAME}.s3.amazonaws.com`

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

// Upload file to S3
export async function uploadToS3(
  buffer: Buffer,
  key: string,
  metadata: MediaMetadata
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: metadata.mimeType,
      Metadata: {
        originalName: metadata.originalName,
        size: metadata.size.toString(),
        ...(metadata.width && { width: metadata.width.toString() }),
        ...(metadata.height && { height: metadata.height.toString() }),
        ...(metadata.duration && { duration: metadata.duration.toString() }),
      },
      // Set cache control for better performance
      CacheControl: 'max-age=31536000', // 1 year
    })

    await s3Client.send(command)

    const url = `${CDN_URL}/${key}`

    return {
      success: true,
      url,
      key,
    }
  } catch (error) {
    console.error('Error uploading to S3:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

// Delete file from S3
export async function deleteFromS3(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)
    return true
  } catch (error) {
    console.error('Error deleting from S3:', error)
    return false
  }
}

// Generate presigned URL for secure uploads
export async function generatePresignedUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
    return signedUrl
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    throw error
  }
}

// Generate presigned URL for downloads
export async function generateDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
    return signedUrl
  } catch (error) {
    console.error('Error generating download URL:', error)
    throw error
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

// Check if S3 is configured
export function isS3Configured(): boolean {
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION &&
    process.env.AWS_S3_BUCKET
  )
}

export { s3Client, BUCKET_NAME, CDN_URL }
