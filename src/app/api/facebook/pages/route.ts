import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPageInfo, validateAccessToken, handleFacebookError } from '@/lib/facebook'

// GET /api/facebook/pages - Lấy danh sách pages
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        socialAccounts: {
          where: { 
            platform: 'facebook',
            isActive: true 
          },
          include: {
            pages: {
              where: { isActive: true },
              orderBy: { name: 'asc' }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const refresh = searchParams.get('refresh') === 'true'

    let allPages: any[] = []

    for (const socialAccount of user.socialAccounts) {
      // Validate access token
      const isValidToken = await validateAccessToken(socialAccount.accessToken)
      
      if (!isValidToken) {
        // Mark account as inactive if token is invalid
        await prisma.socialAccount.update({
          where: { id: socialAccount.id },
          data: { isActive: false }
        })
        continue
      }

      for (const page of socialAccount.pages) {
        let pageData = page

        // Refresh page info if requested
        if (refresh) {
          try {
            const freshPageInfo = await getPageInfo(page.pageId, page.accessToken)
            
            // Update page info in database
            pageData = await prisma.page.update({
              where: { id: page.id },
              data: {
                name: freshPageInfo.name,
                category: freshPageInfo.category,
                about: freshPageInfo.about || null,
                picture: freshPageInfo.picture?.data?.url || null,
              }
            })
          } catch (error) {
            console.error(`Error refreshing page ${page.pageId}:`, error)
            // Continue with existing data if refresh fails
          }
        }

        allPages.push({
          id: pageData.id,
          pageId: pageData.pageId,
          name: pageData.name,
          category: pageData.category,
          about: pageData.about,
          picture: pageData.picture,
          isActive: pageData.isActive,
          socialAccount: {
            id: socialAccount.id,
            accountName: socialAccount.accountName,
            platform: socialAccount.platform
          }
        })
      }
    }

    return NextResponse.json({
      pages: allPages,
      total: allPages.length,
      hasActiveConnection: user.socialAccounts.length > 0
    })

  } catch (error) {
    console.error('Error fetching Facebook pages:', error)
    
    const fbError = handleFacebookError(error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch pages',
        details: fbError.message 
      },
      { status: 500 }
    )
  }
}

// POST /api/facebook/pages - Sync pages from Facebook
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user with social accounts
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        socialAccounts: {
          where: { 
            platform: 'facebook',
            isActive: true 
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.socialAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No active Facebook connection found' },
        { status: 400 }
      )
    }

    let totalSynced = 0

    for (const socialAccount of user.socialAccounts) {
      try {
        // Validate access token
        const isValidToken = await validateAccessToken(socialAccount.accessToken)
        
        if (!isValidToken) {
          await prisma.socialAccount.update({
            where: { id: socialAccount.id },
            data: { isActive: false }
          })
          continue
        }

        // Get fresh pages from Facebook
        const { getUserPages } = await import('@/lib/facebook')
        const pages = await getUserPages(socialAccount.accessToken)

        // Sync pages to database
        for (const pageData of pages) {
          await prisma.page.upsert({
            where: {
              socialAccountId_pageId: {
                socialAccountId: socialAccount.id,
                pageId: pageData.id
              }
            },
            update: {
              name: pageData.name,
              category: pageData.category,
              about: pageData.about || null,
              picture: pageData.picture?.data?.url || null,
              accessToken: pageData.access_token,
              isActive: true
            },
            create: {
              socialAccountId: socialAccount.id,
              pageId: pageData.id,
              name: pageData.name,
              category: pageData.category,
              about: pageData.about || null,
              picture: pageData.picture?.data?.url || null,
              accessToken: pageData.access_token,
              isActive: true
            }
          })
          totalSynced++
        }

      } catch (error) {
        console.error(`Error syncing pages for account ${socialAccount.id}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      synced: totalSynced,
      message: `Synced ${totalSynced} pages successfully`
    })

  } catch (error) {
    console.error('Error syncing Facebook pages:', error)
    
    const fbError = handleFacebookError(error)
    
    return NextResponse.json(
      { 
        error: 'Failed to sync pages',
        details: fbError.message 
      },
      { status: 500 }
    )
  }
}
