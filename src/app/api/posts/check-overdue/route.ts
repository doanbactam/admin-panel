import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/user'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)
    const now = new Date()

    // Find overdue posts for this user
    const overduePosts = await prisma.post.findMany({
      where: {
        userId: user.id,
        status: 'SCHEDULED',
        scheduledAt: {
          lte: now
        }
      },
      include: {
        postPages: {
          include: {
            page: {
              select: {
                id: true,
                pageId: true,
                name: true,
                picture: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    })

    // Calculate how overdue each post is
    const overdueWithDelay = overduePosts.map(post => {
      const scheduledTime = new Date(post.scheduledAt!)
      const delayMinutes = Math.floor((now.getTime() - scheduledTime.getTime()) / (1000 * 60))

      return {
        id: post.id,
        title: post.title,
        content: post.content.substring(0, 100) + '...',
        scheduledAt: post.scheduledAt,
        delayMinutes,
        delayText: delayMinutes < 60
          ? `${delayMinutes} phút`
          : `${Math.floor(delayMinutes / 60)} giờ ${delayMinutes % 60} phút`,
        pages: post.postPages.map(pp => ({
          id: pp.page.id,
          name: pp.page.name,
          picture: pp.page.picture
        }))
      }
    })

    return NextResponse.json({
      success: true,
      overdueCount: overduePosts.length,
      overduePosts: overdueWithDelay,
      currentTime: now.toISOString()
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check overdue posts' },
      { status: 500 }
    )
  }
}

// Manual trigger to process specific overdue post
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)
    const { postId, action } = await request.json()

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 })
    }

    // Verify post ownership
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (action === 'mark-failed') {
      // Mark post as failed
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'FAILED' }
      })

      await prisma.postPage.updateMany({
        where: { postId },
        data: {
          status: 'FAILED',
          errorMsg: 'Marked as failed by user'
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Post marked as failed'
      })
    }

    if (action === 'reschedule') {
      const { newScheduledAt } = await request.json()

      if (!newScheduledAt) {
        return NextResponse.json({ error: 'newScheduledAt is required' }, { status: 400 })
      }

      const newDate = new Date(newScheduledAt)
      if (newDate <= new Date()) {
        return NextResponse.json({ error: 'New scheduled time must be in the future' }, { status: 400 })
      }

      // Update scheduled time
      await prisma.post.update({
        where: { id: postId },
        data: {
          scheduledAt: newDate,
          status: 'SCHEDULED'
        }
      })

      await prisma.postPage.updateMany({
        where: { postId },
        data: {
          status: 'SCHEDULED',
          errorMsg: null
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Post rescheduled successfully',
        newScheduledAt: newDate.toISOString()
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process overdue post' },
      { status: 500 }
    )
  }
}
