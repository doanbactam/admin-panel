// Unified Storage Service - supports multiple providers
import { uploadToS3, deleteFromS3, isS3Configured } from './aws-s3'
import { uploadToVercelBlob, deleteFromVercelBlob, isVercelBlobConfigured } from './vercel-blob'
import { uploadToCloudinary, deleteFromCloudinary, isCloudinaryConfigured } from './cloudinary'
import { extractMediaMetadata } from './media-processing'

export type StorageProvider = 'vercel' | 'cloudinary' | 's3' | 'local'

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
  provider?: StorageProvider
}

export interface MediaMetadata {
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
}

// Get preferred storage provider
export function getStorageProvider(): StorageProvider {
  // Priority: Vercel Blob > Cloudinary > S3 > Local
  if (isVercelBlobConfigured()) return 'vercel'
  if (isCloudinaryConfigured()) return 'cloudinary'
  if (isS3Configured()) return 's3'
  return 'local'
}

// Generate unique file key based on provider
export function generateFileKey(originalName: string, userId: string, provider: StorageProvider): string {
  const timestamp = Date.now()
  const extension = originalName.split('.').pop()
  const baseName = originalName.split('.')[0]
  
  switch (provider) {
    case 'vercel':
    case 's3':
      return `media/${userId}/${timestamp}-${baseName}.${extension}`
    case 'cloudinary':
      return `media/${userId}/${timestamp}-${baseName}`
    case 'local':
      return `uploads/${userId}/${timestamp}-${baseName}.${extension}`
    default:
      return `media/${userId}/${timestamp}-${baseName}.${extension}`
  }
}

// Upload file using preferred provider
export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  userId: string,
  mimeType: string,
  provider?: StorageProvider
): Promise<UploadResult> {
  try {
    // Extract metadata
    const metadata = await extractMediaMetadata(buffer, originalName, mimeType)
    
    // Use specified provider or auto-detect
    const selectedProvider = provider || getStorageProvider()
    const fileKey = generateFileKey(originalName, userId, selectedProvider)
    
    let result: UploadResult
    
    switch (selectedProvider) {
      case 'vercel':
        result = await uploadToVercelBlob(buffer, fileKey, metadata)
        break
        
      case 'cloudinary':
        result = await uploadToCloudinary(buffer, fileKey, metadata)
        break
        
      case 's3':
        result = await uploadToS3(buffer, fileKey, metadata)
        break
        
      case 'local':
        result = await uploadToLocal(buffer, fileKey, metadata)
        break
        
      default:
        throw new Error(`Unsupported storage provider: ${selectedProvider}`)
    }
    
    return {
      ...result,
      provider: selectedProvider
    }
    
  } catch (error) {
    console.error('Error uploading file:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

// Delete file using appropriate provider
export async function deleteFile(key: string, provider: StorageProvider): Promise<boolean> {
  try {
    switch (provider) {
      case 'vercel':
        return await deleteFromVercelBlob(key)
        
      case 'cloudinary':
        return await deleteFromCloudinary(key)
        
      case 's3':
        return await deleteFromS3(key)
        
      case 'local':
        return await deleteFromLocal(key)
        
      default:
        console.error(`Unsupported storage provider: ${provider}`)
        return false
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}

// Local storage implementation (fallback)
async function uploadToLocal(
  buffer: Buffer,
  key: string,
  metadata: MediaMetadata
): Promise<UploadResult> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, key)
    const fileDir = path.dirname(filePath)
    
    // Ensure directory exists
    await fs.mkdir(fileDir, { recursive: true })
    
    // Write file
    await fs.writeFile(filePath, buffer)
    
    // Generate public URL
    const url = `/uploads/${key}`
    
    return {
      success: true,
      url,
      key
    }
  } catch (error) {
    console.error('Error uploading to local storage:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Local upload failed'
    }
  }
}

// Delete from local storage
async function deleteFromLocal(key: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'uploads', key)
    await fs.unlink(filePath)
    return true
  } catch (error) {
    console.error('Error deleting from local storage:', error)
    return false
  }
}

// Get storage configuration info
export function getStorageInfo() {
  const provider = getStorageProvider()
  
  const configs = {
    vercel: {
      name: 'Vercel Blob',
      configured: isVercelBlobConfigured(),
      features: ['CDN', 'Global Edge', 'Automatic Optimization'],
      limits: { maxSize: '500MB', bandwidth: 'Unlimited' }
    },
    cloudinary: {
      name: 'Cloudinary',
      configured: isCloudinaryConfigured(),
      features: ['Image/Video Processing', 'CDN', 'AI Features', 'Transformations'],
      limits: { maxSize: '100MB', bandwidth: '25GB/month free' }
    },
    s3: {
      name: 'AWS S3',
      configured: isS3Configured(),
      features: ['Scalable Storage', 'Versioning', 'Lifecycle Management'],
      limits: { maxSize: '5TB', bandwidth: 'Pay per use' }
    },
    local: {
      name: 'Local Storage',
      configured: true,
      features: ['Simple', 'No External Dependencies'],
      limits: { maxSize: 'Disk Space', bandwidth: 'Server Bandwidth' }
    }
  }
  
  return {
    current: provider,
    available: Object.keys(configs).filter(key => 
      configs[key as keyof typeof configs].configured
    ),
    configs
  }
}

// Validate file before upload
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
