import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { subDays } from 'date-fns'

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

    switch (period) {
      case 'day':
        startDate = subDays(endDate, 1)
        break
      case 'week':
        startDate = subDays(endDate, 7)
        break
      case 'days_28':
      default:
        startDate = subDays(endDate, 28)
        break
    }

    // Get user's published posts in date range
    const userPosts = await prisma.postPage.findMany({
      where: {
        post: {
          userId: user.id,
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        status: 'PUBLISHED',
        fbPostId: { not: null },
        ...(pageFilter && pageFilter !== 'all' && { pageId: pageFilter })
      },
      include: {
        post: {
          select: {
            content: true,
            postType: true,
            createdAt: true
          }
        }
      }
    })

    const fbPostIds = userPosts.map(p => p.fbPostId).filter(Boolean) as string[]

    if (fbPostIds.length === 0) {
      return NextResponse.json({
        totalEngagement: 0,
        engagementRate: 0,
        reactionBreakdown: {
          like: 0,
          love: 0,
          wow: 0,
          haha: 0,
          sorry: 0,
          anger: 0
        },
        bestPerformingTimes: [],
        postTypePerformance: [],
        topHashtags: []
      })
    }

    // Get analytics data
    const analyticsData = await prisma.postAnalytics.findMany({
      where: {
        fbPostId: { in: fbPostIds }
      }
    })

    // Calculate total engagement and rate
    const totalEngagement = analyticsData.reduce((sum, analytics) =>
      sum + analytics.likes + analytics.comments + analytics.shares, 0
    )

    const totalReach = analyticsData.reduce((sum, analytics) => sum + analytics.reach, 0)
    const engagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0

    // Mock reaction breakdown (Facebook API doesn't provide detailed reactions in basic insights)
    const reactionBreakdown = {
      like: Math.floor(totalEngagement * 0.6), // 60% likes
      love: Math.floor(totalEngagement * 0.2), // 20% love
      wow: Math.floor(totalEngagement * 0.08), // 8% wow
      haha: Math.floor(totalEngagement * 0.07), // 7% haha
      sorry: Math.floor(totalEngagement * 0.03), // 3% sorry
      anger: Math.floor(totalEngagement * 0.02)  // 2% anger
    }

    // Analyze best performing times
    const timeAnalysis: Record<number, { engagement: number; posts: number }> = {}

    userPosts.forEach(post => {
      if (post.publishedAt) {
        const hour = new Date(post.publishedAt).getHours()
        const analytics = analyticsData.find(a => a.fbPostId === post.fbPostId)

        if (!timeAnalysis[hour]) {
          timeAnalysis[hour] = { engagement: 0, posts: 0 }
        }

        timeAnalysis[hour].posts += 1
        if (analytics) {
          timeAnalysis[hour].engagement += analytics.likes + analytics.comments + analytics.shares
        }
      }
    })

    const bestPerformingTimes = Object.entries(timeAnalysis)
      .map(([hour, data]) => ({
        hour: parseInt(hour),
        engagement: data.engagement,
        posts: data.posts
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 24) // All hours

    // Analyze post type performance
    const postTypeAnalysis: Record<string, { engagement: number; reach: number; posts: number }> = {}

    userPosts.forEach(post => {
      const postType = post.post.postType || 'post'
      const analytics = analyticsData.find(a => a.fbPostId === post.fbPostId)

      if (!postTypeAnalysis[postType]) {
        postTypeAnalysis[postType] = { engagement: 0, reach: 0, posts: 0 }
      }

      postTypeAnalysis[postType].posts += 1
      if (analytics) {
        postTypeAnalysis[postType].engagement += analytics.likes + analytics.comments + analytics.shares
        postTypeAnalysis[postType].reach += analytics.reach
      }
    })

    const postTypePerformance = Object.entries(postTypeAnalysis)
      .map(([type, data]) => ({
        type,
        engagement: data.engagement,
        reach: data.reach,
        posts: data.posts
      }))
      .sort((a, b) => b.engagement - a.engagement)

    // Extract hashtags from post content
    const hashtagAnalysis: Record<string, { usage: number; totalEngagement: number }> = {}

    userPosts.forEach(post => {
      const content = post.post.content || ''
      const hashtags = content.match(/#\w+/g) || []
      const analytics = analyticsData.find(a => a.fbPostId === post.fbPostId)
      const engagement = analytics ? analytics.likes + analytics.comments + analytics.shares : 0

      hashtags.forEach(hashtag => {
        const cleanHashtag = hashtag.substring(1).toLowerCase()

        if (!hashtagAnalysis[cleanHashtag]) {
          hashtagAnalysis[cleanHashtag] = { usage: 0, totalEngagement: 0 }
        }

        hashtagAnalysis[cleanHashtag].usage += 1
        hashtagAnalysis[cleanHashtag].totalEngagement += engagement
      })
    })

    const topHashtags = Object.entries(hashtagAnalysis)
      .map(([hashtag, data]) => ({
        hashtag,
        usage: data.usage,
        avgEngagement: data.usage > 0 ? data.totalEngagement / data.usage : 0
      }))
      .filter(h => h.usage >= 2) // Only hashtags used at least twice
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 10)

    return NextResponse.json({
      totalEngagement,
      engagementRate,
      reactionBreakdown,
      bestPerformingTimes,
      postTypePerformance,
      topHashtags
    })

  } catch (error) {
    console.error('Error getting engagement data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
