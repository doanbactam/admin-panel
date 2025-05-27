import { prisma } from './prisma'
import { addScheduledPostToQueue, removeScheduledPostFromQueue, initializeOverdueChecking, triggerOverdueCheck } from './queue'

// Schedule a post for publishing
export async function schedulePost(postId: string, scheduledAt: Date) {
  try {
    // Get post details
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        userId: true,
        status: true,
        scheduledAt: true
      }
    })

    if (!post) {
      throw new Error('Post not found')
    }

    // Remove existing scheduled job if any
    await removeScheduledPostFromQueue(postId)

    // Update post in database
    await prisma.post.update({
      where: { id: postId },
      data: {
        scheduledAt,
        status: 'SCHEDULED'
      }
    })

    // Update all post pages to scheduled status
    await prisma.postPage.updateMany({
      where: { postId },
      data: {
        status: 'SCHEDULED',
        errorMsg: null
      }
    })

    // Add to queue
    await addScheduledPostToQueue(postId, post.userId, scheduledAt)

    console.log(`Post ${postId} scheduled for ${scheduledAt}`)

    return {
      success: true,
      message: 'Post scheduled successfully',
      scheduledAt
    }
  } catch (error) {
    console.error('Error scheduling post:', error)
    throw error
  }
}

// Unschedule a post
export async function unschedulePost(postId: string) {
  try {
    // Remove from queue
    await removeScheduledPostFromQueue(postId)

    // Update post in database
    await prisma.post.update({
      where: { id: postId },
      data: {
        scheduledAt: null,
        status: 'DRAFT'
      }
    })

    // Update all post pages to pending status
    await prisma.postPage.updateMany({
      where: { postId },
      data: {
        status: 'PENDING',
        errorMsg: null
      }
    })

    console.log(`Post ${postId} unscheduled`)

    return {
      success: true,
      message: 'Post unscheduled successfully'
    }
  } catch (error) {
    console.error('Error unscheduling post:', error)
    throw error
  }
}

// Reschedule a post to a new time
export async function reschedulePost(postId: string, newScheduledAt: Date) {
  try {
    // Validate new time is in the future
    if (newScheduledAt <= new Date()) {
      throw new Error('Scheduled time must be in the future')
    }

    // Get post details
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        userId: true,
        status: true,
        scheduledAt: true
      }
    })

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.status !== 'SCHEDULED') {
      throw new Error('Post is not scheduled')
    }

    // Remove existing job
    await removeScheduledPostFromQueue(postId)

    // Update database
    await prisma.post.update({
      where: { id: postId },
      data: {
        scheduledAt: newScheduledAt
      }
    })

    // Add new job to queue
    await addScheduledPostToQueue(postId, post.userId, newScheduledAt)

    console.log(`Post ${postId} rescheduled from ${post.scheduledAt} to ${newScheduledAt}`)

    return {
      success: true,
      message: 'Post rescheduled successfully',
      oldScheduledAt: post.scheduledAt,
      newScheduledAt
    }
  } catch (error) {
    console.error('Error rescheduling post:', error)
    throw error
  }
}

// Get all scheduled posts for a user
export async function getScheduledPosts(userId: string, limit = 50) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
        status: 'SCHEDULED',
        scheduledAt: {
          gte: new Date() // Only future posts
        }
      },
      include: {
        postPages: {
          include: {
            page: {
              select: {
                id: true,
                name: true,
                pageId: true,
                picture: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      },
      take: limit
    })

    return posts
  } catch (error) {
    console.error('Error getting scheduled posts:', error)
    throw error
  }
}

// Trigger overdue check for specific user or all users
export async function checkOverduePosts(userId?: string) {
  try {
    const job = await triggerOverdueCheck(userId)

    return {
      success: true,
      message: 'Overdue check triggered',
      jobId: job.id
    }
  } catch (error) {
    throw error
  }
}

// Initialize scheduler - sync database with queue
export async function initializeScheduler() {
  try {
    // Get all scheduled posts from database
    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: {
          gte: new Date() // Only future posts
        }
      },
      select: {
        id: true,
        userId: true,
        scheduledAt: true
      }
    })

    // Add them to queue
    for (const post of scheduledPosts) {
      try {
        await addScheduledPostToQueue(post.id, post.userId, post.scheduledAt!)
      } catch (error) {
        // Skip failed posts
      }
    }

    // Initialize overdue checking system
    await initializeOverdueChecking()

    return {
      success: true,
      scheduledCount: scheduledPosts.length
    }
  } catch (error) {
    throw error
  }
}

// Utility function to validate scheduling time
export function validateScheduleTime(scheduledAt: Date, timezone?: string, allowPastTime = false) {
  const now = new Date()

  // Must be in the future (unless explicitly allowed for testing)
  if (!allowPastTime && scheduledAt <= now) {
    return {
      valid: false,
      error: 'Scheduled time must be in the future'
    }
  }

  // Must be within 6 months
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

  if (scheduledAt > sixMonthsFromNow) {
    return {
      valid: false,
      error: 'Cannot schedule posts more than 6 months in advance'
    }
  }

  // Check if it's a reasonable time (not too late at night)
  const hour = scheduledAt.getHours()
  if (hour < 6 || hour > 23) {
    return {
      valid: true,
      warning: 'Posting outside business hours (6 AM - 11 PM) may have lower engagement'
    }
  }

  return {
    valid: true
  }
}
