import sharp from 'sharp'
import { MediaMetadata } from './aws-s3'

export interface ProcessedImage {
  buffer: Buffer
  metadata: {
    width: number
    height: number
    format: string
    size: number
  }
}

export interface ImageProcessingOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
  progressive?: boolean
}

// Process and optimize images
export async function processImage(
  inputBuffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 85,
    format = 'jpeg',
    progressive = true,
  } = options

  try {
    let sharpInstance = sharp(inputBuffer)

    // Get original metadata
    const originalMetadata = await sharpInstance.metadata()

    // Resize if needed
    if (originalMetadata.width && originalMetadata.height) {
      if (originalMetadata.width > maxWidth || originalMetadata.height > maxHeight) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      }
    }

    // Apply format and quality settings
    switch (format) {
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({
          quality,
          progressive,
          mozjpeg: true,
        })
        break
      case 'png':
        sharpInstance = sharpInstance.png({
          quality,
          progressive,
          compressionLevel: 9,
        })
        break
      case 'webp':
        sharpInstance = sharpInstance.webp({
          quality,
          effort: 6,
        })
        break
    }

    // Process the image
    const processedBuffer = await sharpInstance.toBuffer()
    const processedMetadata = await sharp(processedBuffer).metadata()

    return {
      buffer: processedBuffer,
      metadata: {
        width: processedMetadata.width || 0,
        height: processedMetadata.height || 0,
        format: processedMetadata.format || format,
        size: processedBuffer.length,
      },
    }
  } catch (error) {
    console.error('Error processing image:', error)
    throw new Error('Failed to process image')
  }
}

// Generate multiple image sizes (thumbnails, medium, large)
export async function generateImageVariants(
  inputBuffer: Buffer,
  originalName: string
): Promise<{
  thumbnail: ProcessedImage
  medium: ProcessedImage
  large: ProcessedImage
  original: ProcessedImage
}> {
  try {
    const [thumbnail, medium, large, original] = await Promise.all([
      // Thumbnail: 150x150
      processImage(inputBuffer, {
        maxWidth: 150,
        maxHeight: 150,
        quality: 80,
        format: 'jpeg',
      }),
      // Medium: 800x600
      processImage(inputBuffer, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 85,
        format: 'jpeg',
      }),
      // Large: 1920x1080
      processImage(inputBuffer, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 90,
        format: 'jpeg',
      }),
      // Original: optimized but full size
      processImage(inputBuffer, {
        maxWidth: 4096,
        maxHeight: 4096,
        quality: 95,
        format: 'jpeg',
      }),
    ])

    return { thumbnail, medium, large, original }
  } catch (error) {
    console.error('Error generating image variants:', error)
    throw new Error('Failed to generate image variants')
  }
}

// Extract video metadata (basic implementation)
export async function extractVideoMetadata(buffer: Buffer): Promise<{
  duration?: number
  width?: number
  height?: number
  format?: string
}> {
  // Note: For full video processing, you'd typically use ffmpeg
  // This is a basic implementation that returns empty metadata
  // In production, you'd want to integrate with ffmpeg or a video processing service
  
  try {
    // Basic video metadata extraction would go here
    // For now, return empty metadata
    return {
      duration: undefined,
      width: undefined,
      height: undefined,
      format: undefined,
    }
  } catch (error) {
    console.error('Error extracting video metadata:', error)
    return {}
  }
}

// Generate video thumbnail
export async function generateVideoThumbnail(
  videoBuffer: Buffer,
  timeOffset: number = 1
): Promise<Buffer | null> {
  // Note: This would typically use ffmpeg to extract a frame from the video
  // For now, return null as we'd need ffmpeg integration
  
  try {
    // Video thumbnail generation would go here using ffmpeg
    // Example: ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -f image2 thumbnail.jpg
    
    console.log('Video thumbnail generation not implemented yet')
    return null
  } catch (error) {
    console.error('Error generating video thumbnail:', error)
    return null
  }
}

// Validate and extract media metadata
export async function extractMediaMetadata(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<MediaMetadata> {
  const metadata: MediaMetadata = {
    originalName,
    mimeType,
    size: buffer.length,
  }

  try {
    if (mimeType.startsWith('image/')) {
      // Extract image metadata
      const imageMetadata = await sharp(buffer).metadata()
      metadata.width = imageMetadata.width
      metadata.height = imageMetadata.height
    } else if (mimeType.startsWith('video/')) {
      // Extract video metadata
      const videoMetadata = await extractVideoMetadata(buffer)
      metadata.width = videoMetadata.width
      metadata.height = videoMetadata.height
      metadata.duration = videoMetadata.duration
    }
  } catch (error) {
    console.error('Error extracting media metadata:', error)
    // Continue with basic metadata even if extraction fails
  }

  return metadata
}

// Optimize file for web delivery
export async function optimizeForWeb(
  buffer: Buffer,
  mimeType: string,
  options: {
    maxSize?: number // Max file size in bytes
    quality?: number
  } = {}
): Promise<Buffer> {
  const { maxSize = 1024 * 1024, quality = 85 } = options // Default 1MB max

  try {
    if (mimeType.startsWith('image/')) {
      let currentQuality = quality
      let optimizedBuffer = buffer

      // Reduce quality until file size is acceptable
      while (optimizedBuffer.length > maxSize && currentQuality > 20) {
        const processed = await processImage(buffer, {
          quality: currentQuality,
          format: 'jpeg',
        })
        optimizedBuffer = processed.buffer
        currentQuality -= 10
      }

      return optimizedBuffer
    }

    // For non-images, return original buffer
    return buffer
  } catch (error) {
    console.error('Error optimizing for web:', error)
    return buffer
  }
}

// Check if file needs processing
export function needsProcessing(mimeType: string, size: number): boolean {
  // Process images larger than 2MB or videos
  const maxSizeForProcessing = 2 * 1024 * 1024 // 2MB
  
  return (
    mimeType.startsWith('image/') && size > maxSizeForProcessing
  ) || mimeType.startsWith('video/')
}

// Get recommended processing options based on file type and size
export function getProcessingOptions(
  mimeType: string,
  size: number
): ImageProcessingOptions {
  const options: ImageProcessingOptions = {}

  if (mimeType.startsWith('image/')) {
    // Larger files need more aggressive compression
    if (size > 5 * 1024 * 1024) { // > 5MB
      options.quality = 75
      options.maxWidth = 1920
      options.maxHeight = 1080
    } else if (size > 2 * 1024 * 1024) { // > 2MB
      options.quality = 80
      options.maxWidth = 1920
      options.maxHeight = 1080
    } else {
      options.quality = 85
    }

    // Use WebP for better compression if supported
    options.format = 'jpeg' // Default to JPEG for better compatibility
    options.progressive = true
  }

  return options
}
