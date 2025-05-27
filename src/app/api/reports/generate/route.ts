import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const config = await request.json()

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

    switch (config.period) {
      case 'day':
        startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'days_28':
        startDate = new Date(endDate.getTime() - 28 * 24 * 60 * 60 * 1000)
        break
      case 'custom':
        startDate = new Date(config.startDate)
        endDate.setTime(new Date(config.endDate).getTime())
        break
      default:
        startDate = new Date(endDate.getTime() - 28 * 24 * 60 * 60 * 1000)
    }

    // Gather report data
    const reportData: any = {
      title: config.title,
      period: config.period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      generatedAt: new Date().toISOString(),
      user: {
        name: user.name || 'User',
        email: user.email
      }
    }

    // Get overview data if requested
    if (config.sections.overview) {
      const totalPosts = await prisma.post.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      })

      const analyticsData = await prisma.postAnalytics.aggregate({
        where: {
          fbPostId: {
            in: await prisma.postPage.findMany({
              where: {
                post: {
                  userId: user.id,
                  createdAt: {
                    gte: startDate,
                    lte: endDate
                  }
                },
                status: 'PUBLISHED',
                fbPostId: { not: null }
              },
              select: { fbPostId: true }
            }).then(posts => posts.map(p => p.fbPostId).filter(Boolean) as string[])
          }
        },
        _sum: {
          reach: true,
          impressions: true,
          likes: true,
          comments: true,
          shares: true,
          clicks: true
        }
      })

      reportData.overview = {
        totalPosts,
        totalReach: analyticsData._sum.reach || 0,
        totalImpressions: analyticsData._sum.impressions || 0,
        totalEngagement: (analyticsData._sum.likes || 0) +
                        (analyticsData._sum.comments || 0) +
                        (analyticsData._sum.shares || 0),
        totalClicks: analyticsData._sum.clicks || 0
      }
    }

    // Get posts data if requested
    if (config.sections.posts) {
      const posts = await prisma.postPage.findMany({
        where: {
          post: {
            userId: user.id,
            createdAt: {
              gte: startDate,
              lte: endDate
            }
          },
          status: 'PUBLISHED',
          fbPostId: { not: null }
        },
        include: {
          post: {
            select: {
              content: true,
              createdAt: true
            }
          },
          page: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        },
        take: 20
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

      reportData.posts = posts.map(post => {
        const analytics = analyticsMap.get(post.fbPostId!)
        return {
          content: post.post.content?.substring(0, 100) + '...',
          page: post.page.name,
          publishedAt: post.publishedAt,
          analytics: analytics ? {
            reach: analytics.reach,
            impressions: analytics.impressions,
            engagement: analytics.likes + analytics.comments + analytics.shares,
            clicks: analytics.clicks
          } : null
        }
      })
    }

    // Get pages data if requested
    if (config.sections.pages) {
      const pages = await prisma.page.findMany({
        where: {
          socialAccount: {
            userId: user.id,
            isActive: true
          },
          isActive: true
        },
        select: {
          name: true,
          pageId: true,
          followers: true
        }
      })

      reportData.pages = pages
    }

    // Generate report based on format
    if (config.format === 'csv') {
      // Generate CSV
      const csvData = generateCSV(reportData, config.sections)

      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${config.title.replace(/\s+/g, '_')}.csv"`
        }
      })
    } else if (config.format === 'excel') {
      // For now, return JSON (in real app, use a library like xlsx)
      return NextResponse.json(reportData, {
        headers: {
          'Content-Disposition': `attachment; filename="${config.title.replace(/\s+/g, '_')}.json"`
        }
      })
    } else {
      // PDF format - return JSON for now (in real app, use a PDF library)
      return NextResponse.json(reportData, {
        headers: {
          'Content-Disposition': `attachment; filename="${config.title.replace(/\s+/g, '_')}.json"`
        }
      })
    }

  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateCSV(data: any, sections: any): string {
  let csv = `"Report: ${data.title}"\n`
  csv += `"Period: ${data.startDate} to ${data.endDate}"\n`
  csv += `"Generated: ${data.generatedAt}"\n\n`

  if (sections.overview && data.overview) {
    csv += '"OVERVIEW"\n'
    csv += '"Metric","Value"\n'
    csv += `"Total Posts","${data.overview.totalPosts}"\n`
    csv += `"Total Reach","${data.overview.totalReach}"\n`
    csv += `"Total Impressions","${data.overview.totalImpressions}"\n`
    csv += `"Total Engagement","${data.overview.totalEngagement}"\n`
    csv += `"Total Clicks","${data.overview.totalClicks}"\n\n`
  }

  if (sections.posts && data.posts) {
    csv += '"POSTS PERFORMANCE"\n'
    csv += '"Content","Page","Published At","Reach","Impressions","Engagement","Clicks"\n'

    data.posts.forEach((post: any) => {
      csv += `"${post.content}","${post.page}","${post.publishedAt}",`
      if (post.analytics) {
        csv += `"${post.analytics.reach}","${post.analytics.impressions}","${post.analytics.engagement}","${post.analytics.clicks}"\n`
      } else {
        csv += '"0","0","0","0"\n'
      }
    })
    csv += '\n'
  }

  if (sections.pages && data.pages) {
    csv += '"PAGES"\n'
    csv += '"Page Name","Page ID","Followers"\n'

    data.pages.forEach((page: any) => {
      csv += `"${page.name}","${page.pageId}","${page.followers || 0}"\n`
    })
  }

  return csv
}
