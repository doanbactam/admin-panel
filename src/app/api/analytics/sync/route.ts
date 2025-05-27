import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getPostInsights } from '@/lib/facebook'

export async function POST(request: NextRequest) {
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

    // Get all active social accounts
    const socialAccounts = await prisma.socialAccount.findMany({
      where: {
        userId: user.id,
        isActive: true
      },
      include: {
        pages: {
          where: { isActive: true }
        }
      }
    })

    if (socialAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No active social accounts found' },
        { status: 404 }
      )
    }

    let totalSynced = 0
    let totalErrors = 0
    const syncResults: any[] = []

    // Sync insights for each page
    for (const account of socialAccounts) {
      for (const page of account.pages) {
        try {
          // Get published posts for this page
          const publishedPosts = await prisma.postPage.findMany({
            where: {
              pageId: page.pageId,
              status: 'PUBLISHED',
              fbPostId: { not: null },
              publishedAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
              }
            },
            include: {
              post: true
            }
          })

          let pageSynced = 0
          let pageErrors = 0

          // Sync insights for each post
          for (const postPage of publishedPosts) {
            try {
              if (!postPage.fbPostId) continue

              // Get insights from Facebook API
              const insightsResult = await getPostInsights(
                postPage.fbPostId,
                account.accessToken
              )

              if (insightsResult.success && insightsResult.insights) {
                const insights = insightsResult.insights

                // Get additional post data (likes, comments, shares) from Graph API
                const postDataResponse = await fetch(
                  `https://graph.facebook.com/v21.0/${postPage.fbPostId}?fields=likes.summary(true),comments.summary(true),shares&access_token=${account.accessToken}`
                )

                let postData = { likes: { summary: { total_count: 0 } }, comments: { summary: { total_count: 0 } }, shares: { count: 0 } }
                if (postDataResponse.ok) {
                  postData = await postDataResponse.json()
                }

                // Upsert analytics data
                await prisma.postAnalytics.upsert({
                  where: {
                    fbPostId: postPage.fbPostId
                  },
                  update: {
                    reach: insights.post_impressions_unique || 0,
                    impressions: insights.post_impressions || 0,
                    likes: postData.likes?.summary?.total_count || 0,
                    comments: postData.comments?.summary?.total_count || 0,
                    shares: postData.shares?.count || 0,
                    clicks: insights.post_clicks || 0,
                    videoViews: insights.post_video_views || 0,
                    lastSyncAt: new Date()
                  },
                  create: {
                    fbPostId: postPage.fbPostId,
                    reach: insights.post_impressions_unique || 0,
                    impressions: insights.post_impressions || 0,
                    likes: postData.likes?.summary?.total_count || 0,
                    comments: postData.comments?.summary?.total_count || 0,
                    shares: postData.shares?.count || 0,
                    clicks: insights.post_clicks || 0,
                    videoViews: insights.post_video_views || 0,
                    lastSyncAt: new Date()
                  }
                })

                pageSynced++
                totalSynced++
              } else {
                console.error(`Failed to sync insights for post ${postPage.fbPostId}:`, insightsResult.error)
                pageErrors++
                totalErrors++
              }

              // Add small delay to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 100))

            } catch (error) {
              console.error(`Error syncing post ${postPage.fbPostId}:`, error)
              pageErrors++
              totalErrors++
            }
          }

          syncResults.push({
            pageId: page.pageId,
            pageName: page.name,
            totalPosts: publishedPosts.length,
            synced: pageSynced,
            errors: pageErrors
          })

        } catch (error) {
          console.error(`Error syncing page ${page.pageId}:`, error)
          syncResults.push({
            pageId: page.pageId,
            pageName: page.name,
            totalPosts: 0,
            synced: 0,
            errors: 1,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          totalErrors++
        }
      }
    }

    // Update last sync time for user
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      totalSynced,
      totalErrors,
      syncResults,
      syncedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error syncing insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get sync status
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

    // Get last sync time
    const lastSync = await prisma.postAnalytics.findFirst({
      orderBy: { lastSyncAt: 'desc' },
      select: { lastSyncAt: true }
    })

    // Get total analytics records
    const totalAnalytics = await prisma.postAnalytics.count()

    // Get total published posts
    const totalPublishedPosts = await prisma.postPage.count({
      where: {
        post: {
          userId: user.id
        },
        status: 'PUBLISHED',
        fbPostId: { not: null }
      }
    })

    // Get posts without analytics
    const postsWithoutAnalytics = await prisma.postPage.count({
      where: {
        post: {
          userId: user.id
        },
        status: 'PUBLISHED',
        fbPostId: { not: null },
        fbPostId: {
          notIn: await prisma.postAnalytics.findMany({
            select: { fbPostId: true }
          }).then(analytics => analytics.map(a => a.fbPostId))
        }
      }
    })

    // Get pages status
    const pages = await prisma.page.findMany({
      where: {
        socialAccount: {
          userId: user.id,
          isActive: true
        },
        isActive: true
      },
      select: {
        pageId: true,
        name: true
      }
    })

    return NextResponse.json({
      isConnected: true,
      lastSync: lastSync?.lastSyncAt?.toISOString() || null,
      totalPosts: totalPublishedPosts,
      syncedPosts: totalAnalytics,
      pendingSync: postsWithoutAnalytics,
      apiCallsToday: Math.floor(Math.random() * 500) + 100, // Mock data
      apiLimit: 1000,
      errors: [],
      pages: pages.map(page => ({
        pageId: page.pageId,
        name: page.name,
        status: 'connected' as const,
        lastSync: lastSync?.lastSyncAt?.toISOString() || null
      }))
    })

  } catch (error) {
    console.error('Error getting sync status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
