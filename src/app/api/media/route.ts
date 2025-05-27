import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { deleteFromS3 } from '@/lib/aws-s3'

// GET /api/media - Get user's media library
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category') // 'image', 'video', 'other'
    const folder = searchParams.get('folder')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {
      userId: user.id
    }

    if (category) {
      where.category = category
    }

    if (folder) {
      where.folder = folder
    }

    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get total count
    const totalCount = await prisma.media.count({ where })

    // Get media with pagination
    const media = await prisma.media.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        filename: true,
        originalName: true,
        url: true,
        mimeType: true,
        size: true,
        width: true,
        height: true,
        duration: true,
        category: true,
        folder: true,
        isProcessed: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Get folder statistics
    const folderStats = await prisma.media.groupBy({
      by: ['folder'],
      where: { userId: user.id },
      _count: {
        id: true
      }
    })

    // Get category statistics
    const categoryStats = await prisma.media.groupBy({
      by: ['category'],
      where: { userId: user.id },
      _count: {
        id: true
      },
      _sum: {
        size: true
      }
    })

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      },
      stats: {
        folders: folderStats.map(stat => ({
          folder: stat.folder,
          count: stat._count.id
        })),
        categories: categoryStats.map(stat => ({
          category: stat.category,
          count: stat._count.id,
          totalSize: stat._sum.size || 0
        })),
        totalFiles: totalCount,
        totalSize: categoryStats.reduce((sum, stat) => sum + (stat._sum.size || 0), 0)
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

// DELETE /api/media - Delete multiple media files
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    const body = await request.json()
    const { mediaIds } = body

    if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
      return NextResponse.json(
        { error: 'Media IDs are required' },
        { status: 400 }
      )
    }

    // Get media records to delete
    const mediaToDelete = await prisma.media.findMany({
      where: {
        id: { in: mediaIds },
        userId: user.id
      },
      select: {
        id: true,
        s3Key: true,
        filename: true
      }
    })

    if (mediaToDelete.length === 0) {
      return NextResponse.json(
        { error: 'No media found to delete' },
        { status: 404 }
      )
    }

    // Delete from S3
    const s3DeletePromises = mediaToDelete.map(media => 
      deleteFromS3(media.s3Key)
    )

    const s3Results = await Promise.allSettled(s3DeletePromises)
    
    // Count successful S3 deletions
    const successfulS3Deletions = s3Results.filter(result => 
      result.status === 'fulfilled' && result.value === true
    ).length

    // Delete from database (even if S3 deletion failed)
    const deletedMedia = await prisma.media.deleteMany({
      where: {
        id: { in: mediaToDelete.map(m => m.id) },
        userId: user.id
      }
    })

    return NextResponse.json({
      success: true,
      deletedCount: deletedMedia.count,
      s3DeletedCount: successfulS3Deletions,
      message: `Deleted ${deletedMedia.count} media files`
    })

  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
