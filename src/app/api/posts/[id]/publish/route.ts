import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { batchPostToPages, batchCreateFacebookComments } from '@/lib/facebook'
import { getOrCreateUser } from '@/lib/user'

// POST /api/posts/[id]/publish - Publish post to Facebook
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: postId } = await params

    // Get or create user in database
    const user = await getOrCreateUser(clerkId)

    // Find post with pages
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      },
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
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.status === 'PUBLISHED') {
      return NextResponse.json({ error: 'Post already published' }, { status: 400 })
    }

    console.log('Publishing post:', { postId, status: post.status, pagesCount: post.postPages.length })

    // Validate that we have pages to publish to
    if (post.postPages.length === 0) {
      return NextResponse.json({ error: 'No pages selected for publishing' }, { status: 400 })
    }

    // Validate that all pages have access tokens
    const invalidPages = post.postPages.filter(pp => !pp.page.accessToken)
    if (invalidPages.length > 0) {
      console.error('Pages without access tokens:', invalidPages.map(p => p.page.name))
      return NextResponse.json({
        error: 'Some pages do not have valid access tokens',
        invalidPages: invalidPages.map(p => p.page.name)
      }, { status: 400 })
    }

    // Update post status to publishing
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'PUBLISHING' }
    })

    // Update all post pages to publishing
    await prisma.postPage.updateMany({
      where: { postId },
      data: { status: 'PUBLISHING' }
    })

    // Prepare pages data for Facebook API
    const pages = post.postPages.map(pp => ({
      pageId: pp.page.pageId,
      pageAccessToken: pp.page.accessToken,
      postPageId: pp.id
    }))

    // Prepare post data
    const postData = {
      message: post.content,
      mediaUrls: post.mediaUrls,
      mediaType: post.mediaType as 'photo' | 'video' | undefined,
      postType: post.postType,
      published: true
    }

    // Track publishing progress
    const publishResults: Array<{
      pageId: string
      postPageId: string
      success: boolean
      facebookPostId?: string
      error?: any
    }> = []

    // Publish to Facebook with progress tracking
    const results = await batchPostToPages(
      pages,
      postData,
      async (pageId, result) => {
        // Find the corresponding postPage
        const postPage = pages.find(p => p.pageId === pageId)
        if (!postPage) return

        const publishResult = {
          pageId,
          postPageId: postPage.postPageId,
          success: result.success,
          facebookPostId: result.data?.id,
          error: result.error
        }

        publishResults.push(publishResult)

        // Update database immediately
        try {
          await prisma.postPage.update({
            where: { id: postPage.postPageId },
            data: {
              status: result.success ? 'PUBLISHED' : 'FAILED',
              fbPostId: result.data?.id || null,
              publishedAt: result.success ? new Date() : null,
              errorMsg: result.error?.message || null,
              errorCode: result.error?.code || null
            }
          })
        } catch (dbError) {
          console.error('Error updating post page status:', dbError)
        }
      }
    )

    // Calculate overall status
    const successCount = publishResults.filter(r => r.success).length
    const totalCount = publishResults.length

    let finalStatus: string
    if (successCount === 0) {
      finalStatus = 'FAILED'
    } else if (successCount === totalCount) {
      finalStatus = 'PUBLISHED'
    } else {
      finalStatus = 'PARTIAL_SUCCESS'
    }

    // Update post final status
    await prisma.post.update({
      where: { id: postId },
      data: {
        status: finalStatus,
        publishedAt: successCount > 0 ? new Date() : null
      }
    })

    // Create first comments if specified and posts were published successfully
    let commentResults: any[] = []
    if (post.firstComment && successCount > 0) {
      console.log('Creating first comments for published posts...')

      // Get successfully published posts
      const successfulPosts = publishResults
        .filter(r => r.success && r.facebookPostId)
        .map(r => {
          const page = post.postPages.find(pp => pp.id === r.postPageId)?.page
          return {
            postId: r.facebookPostId!,
            pageAccessToken: page?.accessToken!,
            pageId: page?.pageId!,
            postPageId: r.postPageId
          }
        })

      if (successfulPosts.length > 0) {
        commentResults = await batchCreateFacebookComments(
          successfulPosts,
          post.firstComment,
          async (fbPostId, result) => {
            // Find the corresponding postPage
            const successfulPost = successfulPosts.find(p => p.postId === fbPostId)
            if (!successfulPost) return

            // Update database with comment info
            try {
              await prisma.postPage.update({
                where: { id: successfulPost.postPageId },
                data: {
                  fbCommentId: result.data?.id || null,
                  commentedAt: result.success ? new Date() : null
                }
              })
            } catch (dbError) {
              console.error('Error updating comment info:', dbError)
            }
          }
        )

        console.log('First comment creation completed:', {
          total: commentResults.length,
          successful: commentResults.filter(r => r.success).length,
          failed: commentResults.filter(r => !r.success).length
        })
      }
    }

    // Return detailed results
    return NextResponse.json({
      success: successCount > 0,
      status: finalStatus,
      results: publishResults,
      commentResults,
      summary: {
        total: totalCount,
        successful: successCount,
        failed: totalCount - successCount,
        commented: commentResults.filter(r => r.success).length
      }
    })

  } catch (error) {
    console.error('Error publishing post:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      postId,
      error
    })

    // Update post status to failed
    try {
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'FAILED' }
      })

      await prisma.postPage.updateMany({
        where: { postId: postId },
        data: {
          status: 'FAILED',
          errorMsg: 'Internal server error during publishing'
        }
      })
    } catch (dbError) {
      console.error('Error updating post status to failed:', dbError)
    }

    return NextResponse.json(
      {
        error: 'Failed to publish post',
        details: error instanceof Error ? error.message : 'Unknown error',
        postId
      },
      { status: 500 }
    )
  }
}
