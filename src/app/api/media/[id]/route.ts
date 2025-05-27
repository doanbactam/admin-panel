import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { deleteFromS3 } from '@/lib/aws-s3'

// GET /api/media/[id] - Get single media file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

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

    // Get media file
    const media = await prisma.media.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      media: {
        id: media.id,
        filename: media.filename,
        originalName: media.originalName,
        url: media.url,
        mimeType: media.mimeType,
        size: media.size,
        width: media.width,
        height: media.height,
        duration: media.duration,
        category: media.category,
        folder: media.folder,
        s3Key: media.s3Key,
        isProcessed: media.isProcessed,
        createdAt: media.createdAt,
        updatedAt: media.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/media/[id] - Update media metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

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

    const body = await request.json()
    const { filename, folder } = body

    // Validate input
    if (!filename || filename.trim() === '') {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Update media
    const updatedMedia = await prisma.media.update({
      where: {
        id: id,
        userId: user.id
      },
      data: {
        filename: filename.trim(),
        ...(folder && { folder: folder.trim() })
      }
    })

    return NextResponse.json({
      success: true,
      media: {
        id: updatedMedia.id,
        filename: updatedMedia.filename,
        originalName: updatedMedia.originalName,
        url: updatedMedia.url,
        mimeType: updatedMedia.mimeType,
        size: updatedMedia.size,
        width: updatedMedia.width,
        height: updatedMedia.height,
        duration: updatedMedia.duration,
        category: updatedMedia.category,
        folder: updatedMedia.folder,
        isProcessed: updatedMedia.isProcessed,
        createdAt: updatedMedia.createdAt,
        updatedAt: updatedMedia.updatedAt
      }
    })

  } catch (error) {
    console.error('Error updating media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/media/[id] - Delete single media file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

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

    // Get media to delete
    const media = await prisma.media.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      )
    }

    // Delete from S3
    const s3DeleteSuccess = await deleteFromS3(media.s3Key)

    // Delete from database (even if S3 deletion failed)
    await prisma.media.delete({
      where: {
        id: id,
        userId: user.id
      }
    })

    return NextResponse.json({
      success: true,
      s3Deleted: s3DeleteSuccess,
      message: 'Media deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
