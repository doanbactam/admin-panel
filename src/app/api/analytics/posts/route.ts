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
    const pageFilter = searchParams.get('page') || 'all'
    const sortBy = searchParams.get('sort') as 'reach' | 'engagement' | 'impressions' || 'reach'
    const searchQuery = searchParams.get('search') || ''

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

    // Build where clause for posts
    const whereClause: any = {
      post: {
        userId: user.id,
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        ...(searchQuery && {
          content: {
            contains: searchQuery,
            mode: 'insensitive'
          }
        })
      },
      status: 'PUBLISHED',
      fbPostId: { not: null }
    }

    // Add page filter if specified
    if (pageFilter !== 'all') {
      whereClause.page = {
        pageId: pageFilter
      }
    }

    // Get posts with analytics
    const posts = await prisma.postPage.findMany({
      where: whereClause,
      include: {
        post: {
          select: {
            id: true,
            content: true,
            createdAt: true
          }
        },
        page: {
          select: {
            name: true,
            picture: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    // Get analytics for these posts
    const fbPostIds = posts.map(p => p.fbPostId).filter(Boolean) as string[]
    const analyticsMap = new Map()

    if (fbPostIds.length > 0) {
      const analytics = await prisma.postAnalytics.findMany({
        where: { fbPostId: { in: fbPostIds } }
      })

      analytics.forEach(a => {
        analyticsMap.set(a.fbPostId, a)
      })
    }

    // Transform and sort posts
    const postsWithAnalytics = posts
      .filter(post => post.fbPostId && analyticsMap.has(post.fbPostId)) // Only posts with analytics
      .map(post => {
        const analytics = analyticsMap.get(post.fbPostId!)
        const engagement = analytics.likes + analytics.comments + analytics.shares

        return {
          id: post.post.id,
          fbPostId: post.fbPostId!,
          content: post.post.content || '',
          createdAt: post.post.createdAt.toISOString(),
          analytics: {
            likes: analytics.likes,
            reach: analytics.reach,
            impressions: analytics.impressions,
            clicks: analytics.clicks,
            engagement,
            reactions: {
              like: analytics.likes, // Simplified - in real app, get from Facebook API
              love: 0,
              wow: 0,
              haha: 0,
              sorry: 0,
              anger: 0
            }
          },
          page: {
            name: post.page.name,
            picture: post.page.picture || ''
          }
        }
      })

    // Sort posts based on sortBy parameter
    postsWithAnalytics.sort((a, b) => {
      switch (sortBy) {
        case 'reach':
          return b.analytics.reach - a.analytics.reach
        case 'engagement':
          return b.analytics.engagement - a.analytics.engagement
        case 'impressions':
          return b.analytics.impressions - a.analytics.impressions
        default:
          return b.analytics.reach - a.analytics.reach
      }
    })

    return NextResponse.json({
      posts: postsWithAnalytics.slice(0, 20) // Limit to 20 posts
    })

  } catch (error) {
    console.error('Error getting posts analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
