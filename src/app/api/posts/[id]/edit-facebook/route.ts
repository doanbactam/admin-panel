import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { batchEditFacebookPosts } from '@/lib/facebook'

// PUT /api/posts/[id]/edit-facebook - Sửa bài viết trên Facebook
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: postId } = await params
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find post with Facebook post IDs
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      },
      include: {
        postPages: {
          where: {
            fbPostId: { not: null }, // Only get posts that were actually published to Facebook
            status: 'PUBLISHED'
          },
          include: {
            page: {
              select: {
                id: true,
                pageId: true,
                name: true,
                accessToken: true
              }
            }
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if post has any Facebook posts to edit
    const facebookPosts = post.postPages.filter(pp => pp.fbPostId && pp.page.accessToken)

    if (facebookPosts.length === 0) {
      return NextResponse.json({ 
        error: 'No published Facebook posts found to edit' 
      }, { status: 400 })
    }

    console.log(`Editing ${facebookPosts.length} Facebook posts for post ${postId}`)

    // Prepare Facebook posts for batch edit
    const postsToEdit = facebookPosts.map(pp => ({
      postId: pp.fbPostId!,
      pageAccessToken: pp.page.accessToken!,
      pageId: pp.page.pageId,
      postPageId: pp.id
    }))

    // Track results
    const results: Array<{
      pageId: string
      pageName: string
      success: boolean
      error?: string
    }> = []

    // Edit posts on Facebook
    const facebookResults = await batchEditFacebookPosts(
      postsToEdit,
      content,
      (postId, result) => {
        const postPage = facebookPosts.find(pp => pp.fbPostId === postId)
        if (postPage) {
          results.push({
            pageId: postPage.page.pageId,
            pageName: postPage.page.name,
            success: result.success,
            error: result.error?.message
          })
        }
      }
    )

    // Update database with results
    const updatePromises = facebookResults.map(async (result, index) => {
      const postPage = facebookPosts[index]
      
      if (result.success) {
        // Update post page status and clear error
        await prisma.postPage.update({
          where: { id: postPage.id },
          data: {
            status: 'PUBLISHED',
            errorMsg: null,
            updatedAt: new Date()
          }
        })
      } else {
        // Update with error message
        await prisma.postPage.update({
          where: { id: postPage.id },
          data: {
            status: 'FAILED',
            errorMsg: result.error?.message || 'Failed to edit on Facebook',
            updatedAt: new Date()
          }
        })
      }
    })

    await Promise.all(updatePromises)

    // Update the post content in database
    await prisma.post.update({
      where: { id: postId },
      data: {
        content,
        updatedAt: new Date()
      }
    })

    // Calculate summary
    const successful = facebookResults.filter(r => r.success).length
    const failed = facebookResults.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Đã cập nhật ${successful}/${facebookResults.length} bài viết trên Facebook`,
      summary: {
        total: facebookResults.length,
        successful,
        failed
      },
      results,
      facebookResults
    })

  } catch (error) {
    console.error('Error editing Facebook posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
