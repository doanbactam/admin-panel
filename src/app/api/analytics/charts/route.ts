import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { subDays, format, eachDayOfInterval } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') as 'day' | 'week' | 'days_28' || 'days_28'
    const pageFilter = searchParams.get('page')

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

    // Calculate date range
    const endDate = new Date()
    let startDate: Date
    let dateFormat: string

    switch (period) {
      case 'day':
        startDate = subDays(endDate, 1)
        dateFormat = 'HH:mm'
        break
      case 'week':
        startDate = subDays(endDate, 7)
        dateFormat = 'dd/MM'
        break
      case 'days_28':
      default:
        startDate = subDays(endDate, 28)
        dateFormat = 'dd/MM'
        break
    }

    // Get user's published posts in date range
    const userPostIds = await prisma.postPage.findMany({
      where: {
        post: {
          userId: user.id
        },
        status: 'PUBLISHED',
        fbPostId: { not: null },
        publishedAt: {
          gte: startDate,
          lte: endDate
        },
        ...(pageFilter && pageFilter !== 'all' && { pageId: pageFilter })
      },
      select: {
        fbPostId: true,
        publishedAt: true
      }
    })

    const fbPostIds = userPostIds.map(p => p.fbPostId).filter(Boolean) as string[]

    if (fbPostIds.length === 0) {
      // Return empty chart data
      const dates = eachDayOfInterval({ start: startDate, end: endDate })
      const chartData = dates.map(date => ({
        date: format(date, dateFormat),
        reach: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        posts: 0
      }))

      return NextResponse.json({ chartData })
    }

    // Get analytics data
    const analyticsData = await prisma.postAnalytics.findMany({
      where: {
        fbPostId: { in: fbPostIds }
      }
    })

    // Get publishedAt dates for posts
    const postDatesMap = new Map()
    userPostIds.forEach(post => {
      if (post.fbPostId && post.publishedAt) {
        postDatesMap.set(post.fbPostId, post.publishedAt)
      }
    })

    // Group data by date
    const dataByDate: Record<string, {
      reach: number
      impressions: number
      engagement: number
      clicks: number
      posts: number
    }> = {}

    // Initialize all dates with zero values
    const dates = eachDayOfInterval({ start: startDate, end: endDate })
    dates.forEach(date => {
      const dateKey = format(date, dateFormat)
      dataByDate[dateKey] = {
        reach: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        posts: 0
      }
    })

    // Aggregate analytics data by date
    analyticsData.forEach(analytics => {
      const publishedAt = postDatesMap.get(analytics.fbPostId)
      if (publishedAt) {
        const dateKey = format(new Date(publishedAt), dateFormat)

        if (dataByDate[dateKey]) {
          dataByDate[dateKey].reach += analytics.reach
          dataByDate[dateKey].impressions += analytics.impressions
          dataByDate[dateKey].engagement += analytics.likes + analytics.comments + analytics.shares
          dataByDate[dateKey].clicks += analytics.clicks
          dataByDate[dateKey].posts += 1
        }
      }
    })

    // Convert to chart format with calculated rates
    const chartData = Object.entries(dataByDate).map(([date, data]) => ({
      date,
      ...data,
      engagementRate: data.reach > 0 ? Math.round((data.engagement / data.reach) * 10000) / 100 : 0,
      clickThroughRate: data.impressions > 0 ? Math.round((data.clicks / data.impressions) * 10000) / 100 : 0,
      videoViews: 0 // Will be populated from analytics if available
    }))

    // Sort by date
    chartData.sort((a, b) => {
      if (period === 'day') {
        return a.date.localeCompare(b.date)
      }
      // For date format dd/MM, we need to parse and compare
      const [dayA, monthA] = a.date.split('/').map(Number)
      const [dayB, monthB] = b.date.split('/').map(Number)

      if (monthA !== monthB) {
        return monthA - monthB
      }
      return dayA - dayB
    })

    return NextResponse.json({ chartData })

  } catch (error) {
    console.error('Error getting chart data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
