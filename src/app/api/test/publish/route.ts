import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get latest post
    const latestPost = await prisma.post.findFirst({
      where: { userId: user.id },
      include: {
        postPages: {
          include: {
            page: {
              include: {
                socialAccount: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email
      },
      latestPost: latestPost ? {
        id: latestPost.id,
        title: latestPost.title,
        content: latestPost.content?.substring(0, 100) + '...',
        status: latestPost.status,
        postPagesCount: latestPost.postPages.length,
        postPages: latestPost.postPages.map(pp => ({
          id: pp.id,
          status: pp.status,
          page: {
            id: pp.page.id,
            name: pp.page.name,
            pageId: pp.page.pageId,
            hasAccessToken: !!pp.page.accessToken
          }
        }))
      } : null
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({
      error: 'Test API failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
