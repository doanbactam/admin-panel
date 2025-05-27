import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/user'
import { schedulePost, validateScheduleTime } from '@/lib/scheduler'

// GET /api/posts - Lấy danh sách bài viết
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user in database
    const user = await getOrCreateUser(clerkId)

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const where = {
      userId: user.id,
      ...(status && { status: status as any }),
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          postPages: {
            include: {
              page: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Tạo bài viết mới
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)

    const body = await request.json()
    const { title, content, firstComment, postType, mediaIds, mediaUrls, mediaType, scheduledAt, pageIds } = body

    // Validate required fields
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    if (!pageIds || pageIds.length === 0) {
      return NextResponse.json({ error: 'At least one page must be selected' }, { status: 400 })
    }

    // Validate scheduled time if provided
    let scheduledDate = null
    let scheduleWarning = null

    if (scheduledAt) {
      scheduledDate = new Date(scheduledAt)

      // Check if this is a debug request (allow past times for testing)
      const isDebugMode = request.headers.get('x-debug-mode') === 'true'

      const validation = validateScheduleTime(scheduledDate, undefined, isDebugMode)

      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 })
      }

      scheduleWarning = validation.warning
    }

    // Validate pages exist and user has access
    const pages = await prisma.page.findMany({
      where: {
        pageId: { in: pageIds },
        socialAccount: {
          userId: user.id,
          isActive: true
        },
        isActive: true
      }
    })

    if (pages.length !== pageIds.length) {
      return NextResponse.json({ error: 'Some pages not found or access denied' }, { status: 400 })
    }

    // Process media if provided
    let processedMediaUrls: string[] = []
    let detectedMediaType: string | null = null

    if (mediaIds && mediaIds.length > 0) {
      // Get media from database
      const mediaFiles = await prisma.media.findMany({
        where: {
          id: { in: mediaIds },
          userId: user.id
        }
      })

      if (mediaFiles.length !== mediaIds.length) {
        return NextResponse.json({ error: 'Some media files not found' }, { status: 400 })
      }

      processedMediaUrls = mediaFiles.map(media => media.url)
      detectedMediaType = mediaFiles[0].category === 'video' ? 'video' : 'image'

      // Validate media for post type
      if (postType === 'reel' && detectedMediaType !== 'video') {
        return NextResponse.json({ error: 'Reels require video content' }, { status: 400 })
      }

      // Validate media count for different post types
      if (postType === 'reel' && mediaFiles.length > 1) {
        return NextResponse.json({ error: 'Reels can only have one video' }, { status: 400 })
      }

      if (postType === 'post' && mediaFiles.length > 10) {
        return NextResponse.json({ error: 'Posts can have maximum 10 media files' }, { status: 400 })
      }
    } else if (mediaUrls && mediaUrls.length > 0) {
      // Use provided URLs (backward compatibility)
      processedMediaUrls = mediaUrls
      detectedMediaType = mediaType
    }

    // Tạo bài viết
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        title,
        content,
        firstComment: firstComment || null,
        postType: postType || 'post',
        mediaUrls: processedMediaUrls,
        mediaType: detectedMediaType || mediaType,
        scheduledAt: scheduledDate,
        status: scheduledDate ? 'SCHEDULED' : 'DRAFT',
      },
    })

    // Tạo liên kết với các pages
    await prisma.postPage.createMany({
      data: pageIds.map((pageId: string) => ({
        postId: post.id,
        pageId,
        status: scheduledDate ? 'SCHEDULED' : 'PENDING',
      })),
    })

    // Add to queue if scheduled
    if (scheduledDate) {
      try {
        await schedulePost(post.id, scheduledDate)
      } catch (error) {
        console.error('Error adding post to queue:', error)
        // Don't fail the request, just log the error
      }
    }

    // Lấy bài viết với thông tin đầy đủ
    const fullPost = await prisma.post.findUnique({
      where: { id: post.id },
      include: {
        postPages: {
          include: {
            page: true,
          },
        },
      },
    })

    return NextResponse.json({
      post: fullPost,
      ...(scheduleWarning && { warning: scheduleWarning })
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
