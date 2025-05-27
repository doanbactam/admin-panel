import { NextRequest, NextResponse } from 'next/server'
import { checkOverduePosts } from '@/lib/scheduler'

// Trigger overdue posts processing via queue system
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional for manual triggers)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // Allow manual triggers without auth for development
    const isManualTrigger = !authHeader

    if (!isManualTrigger && (!cronSecret || authHeader !== `Bearer ${cronSecret}`)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Trigger overdue check via queue system
    const result = await checkOverduePosts()

    return NextResponse.json({
      success: true,
      message: 'Overdue posts processing triggered via queue system',
      jobId: result.jobId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to trigger overdue processing' },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
