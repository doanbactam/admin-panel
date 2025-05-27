import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getOrCreateUser } from '@/lib/user'
import { schedulePost, unschedulePost, reschedulePost, validateScheduleTime } from '@/lib/scheduler'
import { prisma } from '@/lib/prisma'

// Schedule a post
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)
    const postId = params.id

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

    const { scheduledAt, timezone } = await request.json()

    if (!scheduledAt) {
      return NextResponse.json({ error: 'scheduledAt is required' }, { status: 400 })
    }

    const scheduledDate = new Date(scheduledAt)

    // Validate schedule time
    const validation = validateScheduleTime(scheduledDate, timezone)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Schedule the post
    const result = await schedulePost(postId, scheduledDate)

    return NextResponse.json({
      success: true,
      message: 'Post scheduled successfully',
      scheduledAt: scheduledDate,
      warning: validation.warning
    })

  } catch (error) {
    console.error('Schedule post error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule post' },
      { status: 500 }
    )
  }
}

// Reschedule a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)
    const postId = params.id

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

    const { scheduledAt, timezone } = await request.json()

    if (!scheduledAt) {
      return NextResponse.json({ error: 'scheduledAt is required' }, { status: 400 })
    }

    const newScheduledDate = new Date(scheduledAt)

    // Validate schedule time
    const validation = validateScheduleTime(newScheduledDate, timezone)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Reschedule the post
    const result = await reschedulePost(postId, newScheduledDate)

    return NextResponse.json({
      success: true,
      message: 'Post rescheduled successfully',
      oldScheduledAt: result.oldScheduledAt,
      newScheduledAt: result.newScheduledAt,
      warning: validation.warning
    })

  } catch (error) {
    console.error('Reschedule post error:', error)
    return NextResponse.json(
      { error: 'Failed to reschedule post' },
      { status: 500 }
    )
  }
}

// Unschedule a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getOrCreateUser(clerkId)
    const postId = params.id

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

    // Unschedule the post
    const result = await unschedulePost(postId)

    return NextResponse.json({
      success: true,
      message: 'Post unscheduled successfully'
    })

  } catch (error) {
    console.error('Unschedule post error:', error)
    return NextResponse.json(
      { error: 'Failed to unschedule post' },
      { status: 500 }
    )
  }
}
