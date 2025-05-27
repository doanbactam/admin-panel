import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getPageInsights } from '@/lib/facebook'

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

    // Get user with pages
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        socialAccounts: {
          where: { isActive: true },
          include: {
            pages: {
              where: { isActive: true }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    let pages = user.socialAccounts.flatMap(account => account.pages)

    // Filter by specific page if requested
    if (pageFilter && pageFilter !== 'all') {
      pages = pages.filter(page => page.pageId === pageFilter)
    }

    if (pages.length === 0) {
      return NextResponse.json({ pages: [] })
    }

    // Get insights for each page
    const pagesWithInsights = await Promise.all(
      pages.map(async (page) => {
        try {
          // Try to get fresh insights from Facebook (with fallback)
          const insights = await getPageInsights(page.pageId, page.accessToken, period)

          if (insights.success && insights.insights.page_impressions > 0) {
            return {
              pageId: page.pageId,
              name: page.name,
              picture: page.picture,
              analytics: {
                impressions: insights.insights.page_impressions || 0,
                reach: insights.insights.page_impressions_unique || 0,
                engagement: insights.insights.page_engaged_users || 0,
                fans: insights.insights.page_fans || 0,
                fanAdds: 0, // Not available in basic metrics
                fanRemoves: 0, // Not available in basic metrics
                views: 0 // Not available in basic metrics
              }
            }
          } else {
            // Fallback to aggregated data from posts
            const postAnalytics = await prisma.postAnalytics.aggregate({
              where: {
                pageId: page.pageId
              },
              _sum: {
                reach: true,
                impressions: true,
                likes: true,
                comments: true,
                shares: true
              }
            })

            return {
              pageId: page.pageId,
              name: page.name,
              picture: page.picture,
              analytics: {
                impressions: postAnalytics._sum.impressions || 0,
                reach: postAnalytics._sum.reach || 0,
                engagement: (postAnalytics._sum.likes || 0) +
                           (postAnalytics._sum.comments || 0) +
                           (postAnalytics._sum.shares || 0),
                fans: 0, // Not available from post analytics
                fanAdds: 0,
                fanRemoves: 0,
                views: 0
              }
            }
          }
        } catch (error) {
          console.error(`Error getting insights for page ${page.pageId}:`, error)

          // Return page with zero analytics on error
          return {
            pageId: page.pageId,
            name: page.name,
            picture: page.picture,
            analytics: {
              impressions: 0,
              reach: 0,
              engagement: 0,
              fans: 0,
              fanAdds: 0,
              fanRemoves: 0,
              views: 0
            }
          }
        }
      })
    )

    return NextResponse.json({
      pages: pagesWithInsights
    })

  } catch (error) {
    console.error('Error getting pages analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
