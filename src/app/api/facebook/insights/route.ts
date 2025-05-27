import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getPostInsights, getPageInsights } from '@/lib/facebook'

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
    const type = searchParams.get('type') // 'post' or 'page'
    const id = searchParams.get('id') // postId or pageId
    const period = searchParams.get('period') as 'day' | 'week' | 'days_28' || 'days_28'

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Missing type or id parameter' },
        { status: 400 }
      )
    }

    // Get user with social accounts
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

    if (type === 'post') {
      // Get post insights
      const postPage = await prisma.postPage.findFirst({
        where: {
          fbPostId: id,
          post: {
            userId: user.id
          }
        },
        include: {
          page: true
        }
      })

      if (!postPage) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }

      const insights = await getPostInsights(id, postPage.page.accessToken)

      if (!insights.success) {
        return NextResponse.json(
          { error: insights.error || 'Failed to get post insights' },
          { status: 500 }
        )
      }

      // Save/update analytics in database
      await prisma.postAnalytics.upsert({
        where: { fbPostId: id },
        update: {
          likes: 0, // Not available in basic metrics
          comments: 0, // Facebook doesn't provide this in insights
          shares: 0, // Facebook doesn't provide this in insights
          reach: insights.insights.post_impressions_unique || 0,
          impressions: insights.insights.post_impressions || 0,
          clicks: insights.insights.post_clicks || 0,
          lastSyncAt: new Date()
        },
        create: {
          fbPostId: id,
          pageId: postPage.page.pageId,
          likes: 0,
          comments: 0,
          shares: 0,
          reach: insights.insights.post_impressions_unique || 0,
          impressions: insights.insights.post_impressions || 0,
          clicks: insights.insights.post_clicks || 0,
          lastSyncAt: new Date()
        }
      })

      return NextResponse.json({
        success: true,
        type: 'post',
        id,
        insights: insights.insights,
        analytics: {
          likes: 0, // Not available in basic metrics
          reach: insights.insights.post_impressions_unique || 0,
          impressions: insights.insights.post_impressions || 0,
          clicks: insights.insights.post_clicks || 0,
          engagement: insights.insights.post_engaged_users || 0,
          reactions: {
            like: 0,
            love: 0,
            wow: 0,
            haha: 0,
            sorry: 0,
            anger: 0
          },
          video: {
            views: 0,
            uniqueViews: 0
          }
        }
      })

    } else if (type === 'page') {
      // Get page insights
      const page = user.socialAccounts
        .flatMap(account => account.pages)
        .find(page => page.pageId === id)

      if (!page) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        )
      }

      const insights = await getPageInsights(id, page.accessToken, period)

      if (!insights.success) {
        return NextResponse.json(
          { error: insights.error || 'Failed to get page insights' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        type: 'page',
        id,
        period,
        insights: insights.insights,
        analytics: {
          impressions: insights.insights.page_impressions || 0,
          reach: insights.insights.page_impressions_unique || 0,
          engagement: insights.insights.page_engaged_users || 0,
          postEngagements: 0, // Not available in basic metrics
          fans: insights.insights.page_fans || 0,
          fanAdds: 0, // Not available in basic metrics
          fanRemoves: 0, // Not available in basic metrics
          views: 0, // Not available in basic metrics
          videoViews: 0 // Not available in basic metrics
        }
      })

    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "post" or "page"' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error getting Facebook insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Sync all analytics for user's posts
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        posts: {
          include: {
            postPages: {
              where: {
                status: 'PUBLISHED',
                fbPostId: { not: null }
              },
              include: {
                page: true
              }
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

    let syncedCount = 0
    let errorCount = 0

    // Sync insights for all published posts
    for (const post of user.posts) {
      for (const postPage of post.postPages) {
        if (postPage.fbPostId) {
          try {
            const insights = await getPostInsights(postPage.fbPostId, postPage.page.accessToken)

            if (insights.success) {
              await prisma.postAnalytics.upsert({
                where: { fbPostId: postPage.fbPostId },
                update: {
                  likes: 0, // Not available in basic metrics
                  reach: insights.insights.post_impressions_unique || 0,
                  impressions: insights.insights.post_impressions || 0,
                  clicks: insights.insights.post_clicks || 0,
                  lastSyncAt: new Date()
                },
                create: {
                  fbPostId: postPage.fbPostId,
                  pageId: postPage.page.pageId,
                  likes: 0,
                  comments: 0,
                  shares: 0,
                  reach: insights.insights.post_impressions_unique || 0,
                  impressions: insights.insights.post_impressions || 0,
                  clicks: insights.insights.post_clicks || 0,
                  lastSyncAt: new Date()
                }
              })
              syncedCount++
            } else {
              errorCount++
            }
          } catch (error) {
            console.error(`Error syncing insights for post ${postPage.fbPostId}:`, error)
            errorCount++
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} posts, ${errorCount} errors`,
      synced: syncedCount,
      errors: errorCount
    })

  } catch (error) {
    console.error('Error syncing analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
