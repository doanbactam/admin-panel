import { NextRequest, NextResponse } from 'next/server'
import { initializeScheduler, checkMissedPosts } from '@/lib/scheduler'

// Cron job to initialize scheduler and check for missed posts
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Running cron job: initialize scheduler')

    // Initialize scheduler
    const initResult = await initializeScheduler()
    
    // Check for missed posts
    const missedResult = await checkMissedPosts()

    console.log('Cron job completed:', {
      scheduledCount: initResult.scheduledCount,
      missedCount: missedResult.missedCount
    })

    return NextResponse.json({
      success: true,
      message: 'Scheduler initialized and missed posts checked',
      scheduledCount: initResult.scheduledCount,
      missedCount: missedResult.missedCount,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
