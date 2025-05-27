import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { batchDeleteFacebookPosts } from '@/lib/facebook'

// DELETE /api/posts/[id]/delete-facebook - Xóa bài viết trên Facebook
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: postId } = await params

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

    // Check if post has any Facebook posts to delete
    const facebookPosts = post.postPages.filter(pp => pp.fbPostId && pp.page.accessToken)

    if (facebookPosts.length === 0) {
      return NextResponse.json({ 
        error: 'No published Facebook posts found to delete' 
      }, { status: 400 })
    }

    console.log(`Deleting ${facebookPosts.length} Facebook posts for post ${postId}`)

    // Prepare Facebook posts for batch delete
    const postsToDelete = facebookPosts.map(pp => ({
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

    // Delete posts on Facebook
    const facebookResults = await batchDeleteFacebookPosts(
      postsToDelete,
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
        // Mark as deleted on Facebook
        await prisma.postPage.update({
          where: { id: postPage.id },
          data: {
            status: 'FAILED', // Use FAILED status to indicate deleted
            errorMsg: 'Deleted from Facebook',
            updatedAt: new Date()
          }
        })
      } else {
        // Update with error message
        await prisma.postPage.update({
          where: { id: postPage.id },
          data: {
            status: 'FAILED',
            errorMsg: result.error?.message || 'Failed to delete from Facebook',
            updatedAt: new Date()
          }
        })
      }
    })

    await Promise.all(updatePromises)

    // Mark the post as deleted in database (soft delete)
    await prisma.post.update({
      where: { id: postId },
      data: {
        status: 'FAILED', // Use FAILED status as soft delete marker
        updatedAt: new Date()
      }
    })

    // Calculate summary
    const successful = facebookResults.filter(r => r.success).length
    const failed = facebookResults.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Đã xóa ${successful}/${facebookResults.length} bài viết trên Facebook`,
      summary: {
        total: facebookResults.length,
        successful,
        failed
      },
      results,
      facebookResults
    })

  } catch (error) {
    console.error('Error deleting Facebook posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
