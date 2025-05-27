import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
  publicId?: string
}

export interface MediaMetadata {
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
}

// Generate unique public ID
export function generatePublicId(originalName: string, userId: string): string {
  const timestamp = Date.now()
  const uuid = uuidv4()
  const nameWithoutExt = originalName.split('.')[0]
  return `media/${userId}/${timestamp}-${uuid}-${nameWithoutExt}`
}

// Upload file to Cloudinary
export async function uploadToCloudinary(
  buffer: Buffer,
  publicId: string,
  metadata: MediaMetadata
): Promise<UploadResult> {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: 'auto', // Automatically detect file type
          folder: 'media',
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          // Optimization settings
          quality: 'auto:good',
          fetch_format: 'auto',
          // Metadata
          context: {
            original_name: metadata.originalName,
            mime_type: metadata.mimeType,
            file_size: metadata.size.toString(),
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const uploadResult = result as any

    return {
      success: true,
      url: uploadResult.secure_url,
      key: uploadResult.public_id,
      publicId: uploadResult.public_id,
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

// Delete file from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    return false
  }
}

// Generate optimized URL
export function generateOptimizedUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
    crop?: string
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto:good',
    format = 'auto',
    crop = 'fill'
  } = options

  return cloudinary.url(publicId, {
    quality,
    fetch_format: format,
    ...(width && { width }),
    ...(height && { height }),
    ...(width && height && { crop }),
    secure: true,
  })
}

// Generate multiple image variants
export function generateImageVariants(publicId: string) {
  return {
    thumbnail: generateOptimizedUrl(publicId, { width: 150, height: 150 }),
    medium: generateOptimizedUrl(publicId, { width: 800, height: 600 }),
    large: generateOptimizedUrl(publicId, { width: 1920, height: 1080 }),
    original: generateOptimizedUrl(publicId),
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

// Check if Cloudinary is configured
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
}

// Get video thumbnail URL
export function getVideoThumbnail(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    quality: 'auto:good',
    secure: true,
  })
}

// Search media files
export async function searchCloudinaryMedia(query: string, resourceType: 'image' | 'video' | 'auto' = 'auto') {
  try {
    const result = await cloudinary.search
      .expression(`folder:media AND ${query}`)
      .with_field('context')
      .with_field('tags')
      .max_results(100)
      .execute()

    return result.resources
  } catch (error) {
    console.error('Error searching Cloudinary media:', error)
    return []
  }
}
