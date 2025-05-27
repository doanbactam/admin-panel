import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'days_28'
    const pageFilter = searchParams.get('page')

    // Calculate date range based on period
    const now = new Date()
    let startDate: Date
    let previousStartDate: Date
    let previousEndDate: Date

    switch (period) {
      case 'day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        previousEndDate = startDate
        previousStartDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        previousEndDate = startDate
        previousStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'days_28':
      default:
        startDate = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000)
        previousEndDate = startDate
        previousStartDate = new Date(startDate.getTime() - 28 * 24 * 60 * 60 * 1000)
        break
    }

    // Get current and previous period post IDs for comparison
    const currentPeriodPostIds = await prisma.postPage.findMany({
      where: {
        post: {
          userId: user.id,
          createdAt: {
            gte: startDate,
            lte: now
          }
        },
        status: 'PUBLISHED',
        fbPostId: { not: null },
        ...(pageFilter && pageFilter !== 'all' && { pageId: pageFilter })
      },
      select: { fbPostId: true }
    }).then(posts => posts.map(p => p.fbPostId).filter(Boolean) as string[])

    const previousPeriodPostIds = await prisma.postPage.findMany({
      where: {
        post: {
          userId: user.id,
          createdAt: {
            gte: previousStartDate,
            lte: previousEndDate
          }
        },
        status: 'PUBLISHED',
        fbPostId: { not: null },
        ...(pageFilter && pageFilter !== 'all' && { pageId: pageFilter })
      },
      select: { fbPostId: true }
    }).then(posts => posts.map(p => p.fbPostId).filter(Boolean) as string[])

    // Get analytics summary
    const [
      totalPosts,
      analyticsData,
      previousAnalyticsData,
      topPerformingPost
    ] = await Promise.all([
      // Total published posts in current period
      prisma.post.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: startDate,
            lte: now
          },
          postPages: {
            some: {
              status: 'PUBLISHED',
              ...(pageFilter && pageFilter !== 'all' && { pageId: pageFilter })
            }
          }
        }
      }),

      // Current period analytics aggregation
      prisma.postAnalytics.aggregate({
        where: {
          fbPostId: { in: currentPeriodPostIds }
        },
        _sum: {
          reach: true,
          impressions: true,
          likes: true,
          comments: true,
          shares: true,
          clicks: true
        },
        _avg: {
          reach: true,
          impressions: true
        }
      }),

      // Previous period analytics aggregation for trend comparison
      prisma.postAnalytics.aggregate({
        where: {
          fbPostId: { in: previousPeriodPostIds }
        },
        _sum: {
          reach: true,
          impressions: true,
          likes: true,
          comments: true,
          shares: true,
          clicks: true
        }
      }),

      // Top performing post in current period
      prisma.postAnalytics.findFirst({
        where: {
          fbPostId: { in: currentPeriodPostIds }
        },
        orderBy: {
          reach: 'desc'
        }
      })
    ])

    // Calculate engagement
    const totalEngagement = (analyticsData._sum.likes || 0) +
                           (analyticsData._sum.comments || 0) +
                           (analyticsData._sum.shares || 0)

    const totalReach = analyticsData._sum.reach || 0
    const averageEngagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0

    // Get last sync time
    const lastSync = await prisma.postAnalytics.findFirst({
      orderBy: { lastSyncAt: 'desc' },
      select: { lastSyncAt: true }
    })

    // Get post content for top performing post
    let topPostData = null
    if (topPerformingPost) {
      const postPage = await prisma.postPage.findFirst({
        where: { fbPostId: topPerformingPost.fbPostId },
        include: { post: true }
      })

      topPostData = {
        id: postPage?.post.id,
        content: postPage?.post.content?.substring(0, 200) || '',
        reach: topPerformingPost.reach,
        engagement: topPerformingPost.likes + topPerformingPost.comments + topPerformingPost.shares
      }
    }

    // Calculate real trends by comparing current vs previous period
    const currentReach = analyticsData._sum.reach || 0
    const previousReach = previousAnalyticsData._sum.reach || 0
    const currentImpressions = analyticsData._sum.impressions || 0
    const previousImpressions = previousAnalyticsData._sum.impressions || 0
    const currentEngagementTotal = totalEngagement
    const previousEngagementTotal = (previousAnalyticsData._sum.likes || 0) +
                                   (previousAnalyticsData._sum.comments || 0) +
                                   (previousAnalyticsData._sum.shares || 0)

    const calculatePercentageChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    const trends = {
      reach: Math.round(calculatePercentageChange(currentReach, previousReach) * 100) / 100,
      engagement: Math.round(calculatePercentageChange(currentEngagementTotal, previousEngagementTotal) * 100) / 100,
      impressions: Math.round(calculatePercentageChange(currentImpressions, previousImpressions) * 100) / 100
    }

    // Calculate growth rate based on reach trend
    const growthRate = Math.round(trends.reach * 100) / 100

    // Calculate best performing time based on actual post data
    let bestPerformingTime = '19:00 - 21:00' // Default

    if (currentPeriodPostIds.length > 0) {
      // Get posts with their creation times and analytics
      const postsWithTimes = await prisma.postPage.findMany({
        where: {
          fbPostId: { in: currentPeriodPostIds }
        },
        include: {
          post: {
            select: { createdAt: true }
          }
        }
      })

      // Group by hour and calculate average engagement
      const hourlyEngagement: { [hour: number]: { total: number; count: number } } = {}

      for (const postPage of postsWithTimes) {
        const hour = postPage.post.createdAt.getHours()
        if (!hourlyEngagement[hour]) {
          hourlyEngagement[hour] = { total: 0, count: 0 }
        }

        // Get analytics for this post
        const analytics = await prisma.postAnalytics.findFirst({
          where: { fbPostId: postPage.fbPostId! }
        })

        if (analytics) {
          const engagement = analytics.likes + analytics.comments + analytics.shares
          hourlyEngagement[hour].total += engagement
          hourlyEngagement[hour].count += 1
        }
      }

      // Find hour with highest average engagement
      let bestHour = 19 // Default
      let maxAvgEngagement = 0

      for (const [hour, data] of Object.entries(hourlyEngagement)) {
        const avgEngagement = data.count > 0 ? data.total / data.count : 0
        if (avgEngagement > maxAvgEngagement) {
          maxAvgEngagement = avgEngagement
          bestHour = parseInt(hour)
        }
      }

      bestPerformingTime = `${bestHour.toString().padStart(2, '0')}:00 - ${(bestHour + 1).toString().padStart(2, '0')}:00`
    }

    return NextResponse.json({
      totalPosts,
      totalReach: totalReach,
      totalImpressions: analyticsData._sum.impressions || 0,
      totalEngagement,
      totalClicks: analyticsData._sum.clicks || 0,
      totalLikes: analyticsData._sum.likes || 0,
      averageEngagementRate,
      growthRate,
      bestPerformingTime,
      topPerformingPost: topPostData,
      trends,
      lastSyncAt: lastSync?.lastSyncAt || new Date()
    })

  } catch (error) {
    console.error('Error getting analytics summary:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
