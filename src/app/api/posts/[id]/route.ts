import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/user'

// GET /api/posts/[id] - Lấy chi tiết bài viết
export async function GET(
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

    // Find post with all related data
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      },
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
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post })

  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - Cập nhật bài viết
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

    // Get or create user in database
    const user = await getOrCreateUser(clerkId)

    const body = await request.json()
    const {
      title,
      content,
      mediaUrls = [],
      mediaType,
      pageIds = [],
      scheduledAt
    } = body

    // Find existing post
    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      }
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Allow editing published posts but with restrictions
    // Published posts can be edited but won't be re-published automatically

    // Validate required fields
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Validate pages belong to user
    if (pageIds.length > 0) {
      const userPages = await prisma.page.findMany({
        where: {
          id: { in: pageIds },
          socialAccount: {
            userId: user.id,
            isActive: true
          },
          isActive: true
        }
      })

      if (userPages.length !== pageIds.length) {
        return NextResponse.json(
          { error: 'Some pages are invalid or not accessible' },
          { status: 400 }
        )
      }
    }

    // Determine post status
    let status = existingPost.status
    if (scheduledAt && status === 'DRAFT') {
      const scheduledDate = new Date(scheduledAt)
      if (scheduledDate > new Date()) {
        status = 'SCHEDULED'
      }
    }

    // Check if content changed and post is published (need to edit on Facebook)
    const contentChanged = content.trim() !== existingPost.content
    const isPublished = existingPost.status === 'PUBLISHED'
    const shouldEditFacebook = contentChanged && isPublished

    // Update post in transaction
    const updatedPost = await prisma.$transaction(async (tx) => {
      // Update post
      const post = await tx.post.update({
        where: { id: postId },
        data: {
          title: title?.trim() || null,
          content: content.trim(),
          mediaUrls,
          mediaType,
          status,
          scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        }
      })

      // Delete existing post pages
      await tx.postPage.deleteMany({
        where: { postId }
      })

      // Create new post pages
      if (pageIds.length > 0) {
        await tx.postPage.createMany({
          data: pageIds.map((pageId: string) => ({
            postId,
            pageId,
            status: status === 'SCHEDULED' ? 'SCHEDULED' : 'PENDING'
          }))
        })
      }

      return post
    })

    // If content changed and post is published, edit on Facebook
    if (shouldEditFacebook) {
      try {
        // Get published Facebook posts from existing post
        const existingPostWithPages = await prisma.post.findUnique({
          where: { id: postId },
          include: {
            postPages: {
              where: {
                fbPostId: { not: null },
                status: 'PUBLISHED'
              },
              include: {
                page: {
                  select: {
                    pageId: true,
                    name: true,
                    accessToken: true
                  }
                }
              }
            }
          }
        })

        const facebookPosts = existingPostWithPages?.postPages.filter(pp =>
          pp.fbPostId && pp.page?.accessToken
        ) || []

        if (facebookPosts.length > 0) {
          console.log(`Auto-editing ${facebookPosts.length} Facebook posts due to content change`)

          // Import Facebook functions dynamically
          const { batchEditFacebookPosts } = await import('@/lib/facebook')

          // Prepare posts for batch edit
          const postsToEdit = facebookPosts.map(pp => ({
            postId: pp.fbPostId!,
            pageAccessToken: pp.page!.accessToken!,
            pageId: pp.page!.pageId
          }))

          // Edit posts on Facebook (run in background to avoid timeout)
          setImmediate(async () => {
            try {
              const results = await batchEditFacebookPosts(postsToEdit, content.trim())

              // Update database with results
              const updatePromises = results.map(async (result, index) => {
                const postPage = facebookPosts[index]

                if (result.success) {
                  await prisma.postPage.update({
                    where: { id: postPage.id },
                    data: {
                      status: 'PUBLISHED',
                      errorMsg: null,
                      updatedAt: new Date()
                    }
                  })
                } else {
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
              console.log('Facebook edit results updated in database')
            } catch (error) {
              console.error('Error editing Facebook posts in background:', error)
            }
          })
        }
      } catch (error) {
        console.error('Error setting up Facebook edit:', error)
        // Don't fail the main request if Facebook edit setup fails
      }
    }

    // Fetch updated post with relations
    const postWithRelations = await prisma.post.findUnique({
      where: { id: postId },
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
      }
    })

    return NextResponse.json({
      success: true,
      post: postWithRelations
    })

  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Xóa bài viết
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

    // Get or create user in database
    const user = await getOrCreateUser(clerkId)

    // Find existing post with Facebook post IDs
    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.id
      },
      include: {
        postPages: {
          where: {
            fbPostId: { not: null },
            status: 'PUBLISHED'
          },
          include: {
            page: {
              select: {
                pageId: true,
                name: true,
                accessToken: true
              }
            }
          }
        }
      }
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if post has Facebook posts to delete
    const facebookPosts = existingPost.postPages.filter(pp =>
      pp.fbPostId && pp.page?.accessToken
    )

    // Delete from Facebook first if there are published posts
    if (facebookPosts.length > 0) {
      try {
        console.log(`Deleting ${facebookPosts.length} Facebook posts before deleting from database`)

        // Import Facebook functions dynamically
        const { batchDeleteFacebookPosts } = await import('@/lib/facebook')

        // Prepare posts for batch delete
        const postsToDelete = facebookPosts.map(pp => ({
          postId: pp.fbPostId!,
          pageAccessToken: pp.page!.accessToken!,
          pageId: pp.page!.pageId
        }))

        // Delete posts on Facebook
        const results = await batchDeleteFacebookPosts(postsToDelete)

        const successful = results.filter(r => r.success).length
        const failed = results.filter(r => !r.success).length

        console.log(`Facebook deletion results: ${successful}/${results.length} successful`)

        // If some deletions failed, log the errors but continue with database deletion
        if (failed > 0) {
          console.warn(`${failed} Facebook posts failed to delete:`,
            results.filter(r => !r.success).map(r => r.error?.message)
          )
        }
      } catch (error) {
        console.error('Error deleting Facebook posts:', error)
        // Continue with database deletion even if Facebook deletion fails
      }
    }

    // Delete post from database (cascade will delete post pages)
    await prisma.post.delete({
      where: { id: postId }
    })

    return NextResponse.json({
      success: true,
      message: facebookPosts.length > 0
        ? `Post deleted from database and ${facebookPosts.length} Facebook posts deleted`
        : 'Post deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
