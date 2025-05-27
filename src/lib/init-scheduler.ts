import { initializeScheduler } from './scheduler'

// Initialize scheduler when the application starts
export async function startScheduler() {
  try {
    // Check if scheduling is enabled
    const enableCron = process.env.ENABLE_CRON === 'true'

    if (!enableCron) {
      return
    }

    // Initialize the scheduler
    await initializeScheduler()

    // Set up periodic health checks (every 5 minutes)
    setInterval(async () => {
      try {
        const { checkOverduePosts } = await import('./scheduler')
        await checkOverduePosts()
      } catch (error) {
        // Handle error silently
      }
    }, 5 * 60 * 1000) // 5 minutes

  } catch (error) {
    // Retry after 30 seconds
    setTimeout(() => {
      startScheduler()
    }, 30000)
  }
}

// Graceful shutdown
export async function stopScheduler() {
  try {
    const { scheduledPostsWorker } = await import('./queue')
    await scheduledPostsWorker.close()
  } catch (error) {
    // Handle error silently
  }
}

// Handle process signals for graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGTERM', stopScheduler)
  process.on('SIGINT', stopScheduler)
}
