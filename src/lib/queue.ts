import { Queue, Worker, Job } from 'bullmq'
import Redis from 'ioredis'
import { prisma } from './prisma'
import { publishPostToFacebook } from './facebook'

// Check if Redis is available
const isRedisAvailable = process.env.REDIS_URL && process.env.ENABLE_CRON === 'true'

// Redis connection (only if available)
let redis: Redis | undefined = undefined

if (isRedisAvailable) {
  try {
    redis = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: null, // Required by BullMQ
      lazyConnect: true, // Don't connect immediately
    })
  } catch {
    redis = undefined
  }
}

// Mock job interface
interface MockJob {
  id: string
  name: string
  data: ScheduledPostJobData
  timestamp: number
  delay: number
}

// Mock queue options interface
interface MockQueueOptions {
  jobId?: string
  delay?: number
}

// Mock queue for development without Redis
class MockQueue {
  private jobs: Map<string, MockJob> = new Map()

  async add(name: string, data: ScheduledPostJobData, options?: MockQueueOptions): Promise<MockJob> {
    const jobId = options?.jobId || `job-${Date.now()}`
    const job: MockJob = {
      id: jobId,
      name,
      data,
      timestamp: Date.now(),
      delay: options?.delay || 0
    }

    this.jobs.set(jobId, job)

    // Simulate processing after delay
    if (job.delay > 0) {
      setTimeout(() => {
        // In real implementation, this would trigger the worker
      }, job.delay)
    }

    return job
  }

  async getJob(jobId: string): Promise<MockJob | null> {
    return this.jobs.get(jobId) || null
  }

  async getWaiting(): Promise<MockJob[]> { return [] }
  async getActive(): Promise<MockJob[]> { return [] }
  async getCompleted(): Promise<MockJob[]> { return [] }
  async getFailed(): Promise<MockJob[]> { return [] }
  async clean(): Promise<number> { return 0 }
  async pause(): Promise<void> { return }
  async resume(): Promise<void> { return }
}

// Queue for scheduled posts
export const scheduledPostsQueue = redis
  ? new Queue('scheduled-posts', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    })
  : (new MockQueue() as unknown as Queue)

// Job data interface
interface ScheduledPostJobData {
  postId: string
  userId: string
  scheduledAt: string
}

// Overdue check job interface
interface OverdueCheckJobData {
  type: 'overdue-check'
  userId?: string // Optional - if not provided, check all users
}

// Process overdue check job
async function processOverdueCheck(data: OverdueCheckJobData) {
  try {
    const now = new Date()

    // Find overdue posts
    const whereClause = {
      status: 'SCHEDULED' as const,
      scheduledAt: {
        lte: now
      },
      ...(data.userId && { userId: data.userId })
    }

    const overduePosts = await prisma.post.findMany({
      where: whereClause,
      include: {
        postPages: {
          include: {
            page: {
              include: {
                socialAccount: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    })

    const results = []

    // Process each overdue post
    for (const post of overduePosts) {
      try {
        // Add individual post to queue for immediate processing
        await addScheduledPostToQueue(post.id, post.userId, new Date())

        results.push({
          postId: post.id,
          title: post.title,
          scheduledAt: post.scheduledAt,
          status: 'queued-for-processing'
        })
      } catch (error) {
        results.push({
          postId: post.id,
          title: post.title,
          scheduledAt: post.scheduledAt,
          status: 'failed-to-queue',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Schedule next overdue check (every 5 minutes)
    await scheduleOverdueCheck(5 * 60 * 1000) // 5 minutes

    return {
      success: true,
      overdueCount: overduePosts.length,
      processedCount: results.length,
      results,
      nextCheckIn: '5 minutes'
    }

  } catch (error) {
    // Schedule retry in 1 minute
    await scheduleOverdueCheck(60 * 1000) // 1 minute
    throw error
  }
}

// Mock worker for development
class MockWorker {
  on(_event: string, callback: (...args: unknown[]) => void): void {
    // Store callback for potential future use
    void callback
  }

  async close(): Promise<void> {
    // Mock close
  }
}

// Worker to process scheduled posts (only if Redis is available)
export const scheduledPostsWorker = redis
  ? new Worker(
      'scheduled-posts',
      async (job: Job<ScheduledPostJobData | OverdueCheckJobData>) => {
        // Check if this is an overdue check job
        if ('type' in job.data && job.data.type === 'overdue-check') {
          return await processOverdueCheck(job.data)
        }

        // Otherwise, process as scheduled post
        const { postId } = job.data as ScheduledPostJobData

        try {
          // Get post with pages
          const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
              postPages: {
                include: {
                  page: {
                    include: {
                      socialAccount: true
                    }
                  }
                }
              }
            }
          })

          if (!post) {
            throw new Error(`Post ${postId} not found`)
          }

          if (post.status !== 'SCHEDULED') {
            return { success: true, message: 'Post not scheduled' }
          }

          // Check if it's time to publish
          const now = new Date()
          const scheduledTime = new Date(post.scheduledAt!)

          if (now < scheduledTime) {
            throw new Error(`Post ${postId} is not ready to publish yet`)
          }

          // Update post status to publishing
          await prisma.post.update({
            where: { id: postId },
            data: { status: 'PUBLISHING' }
          })

          const results = []
          let hasSuccess = false
          let hasFailure = false

          // Publish to each page
          for (const postPage of post.postPages) {
            try {
              const accessToken = postPage.page.socialAccount?.accessToken
              if (!accessToken) {
                throw new Error(`No access token for page ${postPage.page.name}`)
              }

              // Publish to Facebook
              const result = await publishPostToFacebook({
                pageId: postPage.page.pageId,
                accessToken,
                content: post.content,
                mediaUrls: post.mediaUrls || [],
                firstComment: post.firstComment || undefined
              })

              if (result.success && result.data) {
                // Update post page status
                await prisma.postPage.update({
                  where: { id: postPage.id },
                  data: {
                    status: 'PUBLISHED',
                    fbPostId: result.data.id,
                    publishedAt: new Date(),
                    errorMsg: null
                  }
                })

                hasSuccess = true
                results.push({
                  pageId: postPage.page.pageId,
                  success: true,
                  fbPostId: result.data.id
                })
              } else {
                throw new Error(result.error?.message || 'Unknown Facebook API error')
              }
            } catch (error) {
              hasFailure = true
              const errorMessage = error instanceof Error ? error.message : 'Unknown error'

              // Update post page with error
              await prisma.postPage.update({
                where: { id: postPage.id },
                data: {
                  status: 'FAILED',
                  errorMsg: errorMessage
                }
              })

              results.push({
                pageId: postPage.page.pageId,
                success: false,
                error: errorMessage
              })
            }
          }

          // Update overall post status
          let finalStatus: 'PUBLISHED' | 'FAILED'
          if (hasSuccess && !hasFailure) {
            finalStatus = 'PUBLISHED'
          } else {
            finalStatus = 'FAILED'
          }

          await prisma.post.update({
            where: { id: postId },
            data: {
              status: finalStatus,
              publishedAt: hasSuccess ? new Date() : null
            }
          })

          return {
            success: true,
            status: finalStatus,
            results
          }

        } catch (error) {

          // Update post status to failed
          await prisma.post.update({
            where: { id: postId },
            data: { status: 'FAILED' }
          })

          throw error
        }
      },
      {
        connection: redis,
        concurrency: 5, // Process up to 5 jobs concurrently
      }
    )
  : (new MockWorker() as unknown as Worker)

// Add a scheduled post to the queue
export async function addScheduledPostToQueue(
  postId: string,
  userId: string,
  scheduledAt: Date
) {
  const delay = scheduledAt.getTime() - Date.now()

  if (delay <= 0) {
    throw new Error('Scheduled time must be in the future')
  }

  const job = await scheduledPostsQueue.add(
    'publish-post',
    {
      postId,
      userId,
      scheduledAt: scheduledAt.toISOString()
    },
    {
      delay,
      jobId: `post-${postId}`, // Unique job ID to prevent duplicates
    }
  )

  return job
}

// Remove a scheduled post from the queue
export async function removeScheduledPostFromQueue(postId: string) {
  const jobId = `post-${postId}`
  const job = await scheduledPostsQueue.getJob(jobId)

  if (job) {
    await job.remove()
    return true
  }

  return false
}

// Get queue statistics
export async function getQueueStats() {
  const waiting = await scheduledPostsQueue.getWaiting()
  const active = await scheduledPostsQueue.getActive()
  const completed = await scheduledPostsQueue.getCompleted()
  const failed = await scheduledPostsQueue.getFailed()

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length,
    total: waiting.length + active.length + completed.length + failed.length
  }
}

// Worker event handlers (only for real worker)
if (redis) {
  scheduledPostsWorker.on('completed', () => {
    // Job completed successfully
  })

  scheduledPostsWorker.on('failed', () => {
    // Job failed
  })

  scheduledPostsWorker.on('error', () => {
    // Worker error
  })
}

// Schedule overdue check job
export async function scheduleOverdueCheck(delayMs: number = 5 * 60 * 1000) {
  try {
    const job = await scheduledPostsQueue.add(
      'overdue-check',
      {
        type: 'overdue-check'
      } as OverdueCheckJobData,
      {
        delay: delayMs,
        jobId: 'overdue-check', // Single recurring job
        removeOnComplete: 1,
        removeOnFail: 1
      }
    )

    return job
  } catch (error) {
    throw error
  }
}

// Initialize overdue checking system
export async function initializeOverdueChecking() {
  try {
    // Remove any existing overdue check jobs
    const existingJob = await scheduledPostsQueue.getJob('overdue-check')
    if (existingJob) {
      await existingJob.remove()
    }

    // Schedule first overdue check
    await scheduleOverdueCheck(30 * 1000) // Start in 30 seconds

    return { success: true }
  } catch (error) {
    throw error
  }
}

// Manual trigger for overdue processing
export async function triggerOverdueCheck(userId?: string) {
  try {
    const job = await scheduledPostsQueue.add(
      'overdue-check-manual',
      {
        type: 'overdue-check',
        userId
      } as OverdueCheckJobData,
      {
        priority: 10, // High priority for manual triggers
        removeOnComplete: 5,
        removeOnFail: 5
      }
    )

    return job
  } catch (error) {
    throw error
  }
}

export { redis }
