import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getQueueStats, scheduledPostsQueue, triggerOverdueCheck } from '@/lib/queue'
import { checkOverduePosts, initializeScheduler } from '@/lib/scheduler'

// Get queue statistics and status
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get queue stats
    const stats = await getQueueStats()

    // Get recent jobs
    const waiting = await scheduledPostsQueue.getWaiting(0, 10)
    const active = await scheduledPostsQueue.getActive(0, 10)
    const completed = await scheduledPostsQueue.getCompleted(0, 10)
    const failed = await scheduledPostsQueue.getFailed(0, 10)

    return NextResponse.json({
      stats,
      jobs: {
        waiting: waiting.map(job => ({
          id: job.id,
          name: job.name,
          data: job.data,
          delay: job.opts.delay,
          timestamp: job.timestamp,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn
        })),
        active: active.map(job => ({
          id: job.id,
          name: job.name,
          data: job.data,
          timestamp: job.timestamp,
          processedOn: job.processedOn
        })),
        completed: completed.map(job => ({
          id: job.id,
          name: job.name,
          data: job.data,
          timestamp: job.timestamp,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn,
          returnvalue: job.returnvalue
        })),
        failed: failed.map(job => ({
          id: job.id,
          name: job.name,
          data: job.data,
          timestamp: job.timestamp,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn,
          failedReason: job.failedReason
        }))
      }
    })

  } catch (error) {
    console.error('Queue stats error:', error)
    return NextResponse.json(
      { error: 'Failed to get queue stats' },
      { status: 500 }
    )
  }
}

// Queue management actions
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, jobId } = await request.json()

    switch (action) {
      case 'initialize':
        const initResult = await initializeScheduler()
        return NextResponse.json({
          success: true,
          message: 'Scheduler initialized',
          ...initResult
        })

      case 'check-overdue':
        const overdueResult = await checkOverduePosts()
        return NextResponse.json({
          success: true,
          message: 'Triggered overdue check',
          ...overdueResult
        })

      case 'retry-job':
        if (!jobId) {
          return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
        }

        const job = await scheduledPostsQueue.getJob(jobId)
        if (!job) {
          return NextResponse.json({ error: 'Job not found' }, { status: 404 })
        }

        await job.retry()
        return NextResponse.json({
          success: true,
          message: 'Job retried successfully'
        })

      case 'remove-job':
        if (!jobId) {
          return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
        }

        const jobToRemove = await scheduledPostsQueue.getJob(jobId)
        if (!jobToRemove) {
          return NextResponse.json({ error: 'Job not found' }, { status: 404 })
        }

        await jobToRemove.remove()
        return NextResponse.json({
          success: true,
          message: 'Job removed successfully'
        })

      case 'clean-queue':
        // Clean completed and failed jobs
        await scheduledPostsQueue.clean(24 * 60 * 60 * 1000, 100, 'completed') // Keep 1 day of completed jobs
        await scheduledPostsQueue.clean(7 * 24 * 60 * 60 * 1000, 50, 'failed') // Keep 1 week of failed jobs

        return NextResponse.json({
          success: true,
          message: 'Queue cleaned successfully'
        })

      case 'pause-queue':
        await scheduledPostsQueue.pause()
        return NextResponse.json({
          success: true,
          message: 'Queue paused'
        })

      case 'resume-queue':
        await scheduledPostsQueue.resume()
        return NextResponse.json({
          success: true,
          message: 'Queue resumed'
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Queue management error:', error)
    return NextResponse.json(
      { error: 'Queue management action failed' },
      { status: 500 }
    )
  }
}
