import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import {
  uploadFile,
  validateFile,
  getFileCategory,
  getStorageProvider,
  getStorageInfo
} from '@/lib/storage'
import {
  processImage,
  extractMediaMetadata,
  optimizeForWeb,
  needsProcessing,
  getProcessingOptions
} from '@/lib/media-processing'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get storage provider info
    const storageInfo = getStorageInfo()
    const provider = getStorageProvider()

    if (provider === 'local' && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Cloud storage not configured for production' },
        { status: 500 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Extract metadata
    const metadata = await extractMediaMetadata(buffer, file.name, file.type)
    const category = getFileCategory(file.type)

    let finalBuffer = buffer
    let processedMetadata = metadata

    // Process image if needed
    if (category === 'image' && needsProcessing(file.type, file.size)) {
      try {
        const processingOptions = getProcessingOptions(file.type, file.size)
        const processed = await processImage(buffer, processingOptions)

        finalBuffer = processed.buffer
        processedMetadata = {
          ...metadata,
          size: processed.buffer.length,
          width: processed.metadata.width,
          height: processed.metadata.height,
        }
      } catch (error) {
        console.error('Error processing image:', error)
        // Continue with original file if processing fails
      }
    }

    // Optimize for web if file is still large
    if (finalBuffer.length > 1024 * 1024) { // > 1MB
      try {
        finalBuffer = await optimizeForWeb(finalBuffer, file.type)
        processedMetadata.size = finalBuffer.length
      } catch (error) {
        console.error('Error optimizing for web:', error)
        // Continue with unoptimized file
      }
    }

    // Upload using unified storage service
    const uploadResult = await uploadFile(
      finalBuffer,
      file.name,
      user.id,
      file.type,
      provider
    )

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Save to database
    const mediaRecord = await prisma.media.create({
      data: {
        userId: user.id,
        filename: file.name,
        originalName: file.name,
        mimeType: file.type,
        size: processedMetadata.size,
        width: processedMetadata.width,
        height: processedMetadata.height,
        duration: processedMetadata.duration,
        url: uploadResult.url!,
        s3Key: uploadResult.key!,
        storageProvider: uploadResult.provider || provider,
        folder: folder,
        category: category,
        isProcessed: finalBuffer !== buffer,
      }
    })

    return NextResponse.json({
      success: true,
      media: {
        id: mediaRecord.id,
        filename: mediaRecord.filename,
        originalName: mediaRecord.originalName,
        url: mediaRecord.url,
        mimeType: mediaRecord.mimeType,
        size: mediaRecord.size,
        width: mediaRecord.width,
        height: mediaRecord.height,
        duration: mediaRecord.duration,
        category: mediaRecord.category,
        folder: mediaRecord.folder,
        createdAt: mediaRecord.createdAt,
        isProcessed: mediaRecord.isProcessed,
      }
    })

  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/media/upload - Get upload status or presigned URL
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get storage configuration
    const storageInfo = getStorageInfo()

    return NextResponse.json({
      configured: storageInfo.current !== 'local' || process.env.NODE_ENV !== 'production',
      provider: storageInfo.current,
      available: storageInfo.available,
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/avi',
        'video/mov',
        'video/wmv',
        'video/webm'
      ],
      features: {
        imageProcessing: true,
        videoThumbnails: storageInfo.current === 'cloudinary',
        multipleVariants: true,
        webOptimization: true,
        cdn: storageInfo.current !== 'local'
      },
      storageInfo: storageInfo.configs[storageInfo.current]
    })

  } catch (error) {
    console.error('Error getting upload config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
