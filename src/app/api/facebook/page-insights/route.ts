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

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    const period = searchParams.get('period') || 'day'

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      )
    }

    // Get user and social account
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get page and social account
    const page = await prisma.page.findFirst({
      where: {
        pageId: pageId,
        socialAccount: {
          userId: user.id,
          isActive: true
        }
      },
      include: {
        socialAccount: true
      }
    })

    if (!page || !page.socialAccount) {
      return NextResponse.json(
        { error: 'Page not found or access denied' },
        { status: 404 }
      )
    }

    // Fetch page insights from Facebook API
    const metrics = [
      'page_impressions',
      'page_impressions_unique',
      'page_engaged_users',
      'page_post_engagements',
      'page_fans',
      'page_fan_adds',
      'page_fan_removes',
      'page_views_total',
      'page_actions_post_reactions_total'
    ].join(',')

    const insightsUrl = `https://graph.facebook.com/v21.0/${pageId}/insights?metric=${metrics}&period=${period}&access_token=${page.socialAccount.accessToken}`

    const response = await fetch(insightsUrl)
    
    if (!response.ok) {
      const error = await response.json()
      console.error('Facebook API error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch page insights from Facebook' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    // Process and format the insights data
    const processedInsights = processPageInsights(data.data)

    return NextResponse.json({
      success: true,
      pageId,
      period,
      insights: processedInsights,
      fetchedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching page insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to process Facebook page insights data
function processPageInsights(insightsData: any[]) {
  const insights: any = {
    impressions: 0,
    reach: 0,
    engagement: 0,
    fans: 0,
    fanAdds: 0,
    fanRemoves: 0,
    pageViews: 0,
    reactions: 0
  }

  insightsData.forEach(metric => {
    const latestValue = metric.values?.[metric.values.length - 1]?.value || 0
    
    switch (metric.name) {
      case 'page_impressions':
        insights.impressions = latestValue
        break
      case 'page_impressions_unique':
        insights.reach = latestValue
        break
      case 'page_engaged_users':
        insights.engagement = latestValue
        break
      case 'page_fans':
        insights.fans = latestValue
        break
      case 'page_fan_adds':
        insights.fanAdds = latestValue
        break
      case 'page_fan_removes':
        insights.fanRemoves = latestValue
        break
      case 'page_views_total':
        insights.pageViews = latestValue
        break
      case 'page_actions_post_reactions_total':
        insights.reactions = latestValue
        break
    }
  })

  // Calculate derived metrics
  insights.netFanGrowth = insights.fanAdds - insights.fanRemoves
  insights.engagementRate = insights.reach > 0 ? (insights.engagement / insights.reach) * 100 : 0
  insights.growthRate = insights.fans > 0 ? (insights.netFanGrowth / insights.fans) * 100 : 0

  return insights
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { pageId, period = 'day' } = body

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
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

    // Get page insights using GET endpoint logic
    const getResponse = await GET(request)
    const insightsData = await getResponse.json()

    if (!insightsData.success) {
      return NextResponse.json(insightsData, { status: 500 })
    }

    // Store insights in database for caching
    try {
      await prisma.pageInsights.upsert({
        where: {
          pageId_period: {
            pageId: pageId,
            period: period
          }
        },
        update: {
          impressions: insightsData.insights.impressions,
          reach: insightsData.insights.reach,
          engagement: insightsData.insights.engagement,
          fans: insightsData.insights.fans,
          fanAdds: insightsData.insights.fanAdds,
          fanRemoves: insightsData.insights.fanRemoves,
          pageViews: insightsData.insights.pageViews,
          reactions: insightsData.insights.reactions,
          engagementRate: insightsData.insights.engagementRate,
          growthRate: insightsData.insights.growthRate,
          lastSyncAt: new Date()
        },
        create: {
          pageId: pageId,
          period: period,
          impressions: insightsData.insights.impressions,
          reach: insightsData.insights.reach,
          engagement: insightsData.insights.engagement,
          fans: insightsData.insights.fans,
          fanAdds: insightsData.insights.fanAdds,
          fanRemoves: insightsData.insights.fanRemoves,
          pageViews: insightsData.insights.pageViews,
          reactions: insightsData.insights.reactions,
          engagementRate: insightsData.insights.engagementRate,
          growthRate: insightsData.insights.growthRate,
          lastSyncAt: new Date()
        }
      })
    } catch (dbError) {
      console.error('Error storing page insights:', dbError)
      // Continue even if DB storage fails
    }

    return NextResponse.json({
      success: true,
      message: 'Page insights synced successfully',
      insights: insightsData.insights
    })

  } catch (error) {
    console.error('Error syncing page insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
