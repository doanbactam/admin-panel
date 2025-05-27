import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/user'
import { startOfMonth, endOfMonth, parseISO } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user in database
    const user = await getOrCreateUser(clerkId)
    const userId = user.id

    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month') // YYYY-MM format
    const pageId = searchParams.get('pageId') // Optional filter by page

    // Parse month or use current month
    const targetDate = month ? parseISO(`${month}-01`) : new Date()
    const startDate = startOfMonth(targetDate)
    const endDate = endOfMonth(targetDate)

    // Adjust for timezone - make sure we cover the full month in local time
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(23, 59, 59, 999)

    // Build where clause
    const whereClause: any = {
      userId,
      scheduledAt: {
        gte: startDate,
        lte: endDate,
      },
      status: {
        in: ['SCHEDULED', 'PUBLISHED', 'FAILED']
      }
    }

    // Add page filter if specified
    if (pageId) {
      whereClause.postPages = {
        some: {
          pageId: pageId
        }
      }
    }

    // Fetch scheduled posts for the month
    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        postPages: {
          include: {
            page: {
              select: {
                id: true,
                pageId: true,
                name: true,
                picture: true,
                category: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    })

    // Transform posts to calendar events format
    const events = posts.map(post => {
      const primaryPage = post.postPages[0]?.page

      return {
        id: post.id,
        name: post.title || post.content.substring(0, 50) + '...',
        startAt: new Date(post.scheduledAt!), // Ensure Date object
        endAt: new Date(post.scheduledAt!), // Same as start for posts
        status: {
          id: post.status,
          name: getStatusName(post.status),
          color: getStatusColor(post.status)
        },
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
          postType: post.postType,
          status: post.status,
          scheduledAt: post.scheduledAt,
          publishedAt: post.publishedAt,
          pages: post.postPages.map(pp => ({
            id: pp.page.id,
            pageId: pp.page.pageId,
            name: pp.page.name,
            picture: pp.page.picture,
            status: pp.status,
            fbPostId: pp.fbPostId,
            errorMsg: pp.errorMsg
          }))
        }
      }
    })



    return NextResponse.json({
      events,
      month: targetDate.toISOString().substring(0, 7),
      total: events.length
    })

  } catch (error) {
    console.error('Calendar API Error:', error)
    return NextResponse.json(
      { error: 'Lỗi khi tải dữ liệu calendar' },
      { status: 500 }
    )
  }
}

// Helper functions
function getStatusName(status: string): string {
  switch (status) {
    case 'SCHEDULED':
      return 'Đã lên lịch'
    case 'PUBLISHED':
      return 'Đã đăng'
    case 'FAILED':
      return 'Thất bại'
    case 'DRAFT':
      return 'Bản nháp'
    default:
      return status
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'SCHEDULED':
      return '#3b82f6' // blue
    case 'PUBLISHED':
      return '#10b981' // green
    case 'FAILED':
      return '#ef4444' // red
    case 'DRAFT':
      return '#6b7280' // gray
    default:
      return '#6b7280'
  }
}
