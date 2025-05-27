import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  exchangeCodeForToken,
  getLongLivedToken,
  getFacebookUser,
  getUserPages,
  handleFacebookError
} from '@/lib/facebook'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const state = searchParams.get('state')

    // Handle Facebook OAuth errors
    if (error) {
      console.error('Facebook OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/pages/connect?error=${encodeURIComponent(error)}`, request.url)
      )
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/pages/connect?error=no_code', request.url)
      )
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.redirect(
        new URL('/pages/connect?error=user_not_found', request.url)
      )
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code)
    const shortLivedToken = tokenData.access_token

    // Get long-lived token
    const longLivedTokenData = await getLongLivedToken(shortLivedToken)
    const accessToken = longLivedTokenData.access_token
    const expiresIn = longLivedTokenData.expires_in

    // Get Facebook user info
    const fbUser = await getFacebookUser(accessToken)

    // Calculate expiration date
    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000)
      : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days default

    // Save or update social account
    const socialAccount = await prisma.socialAccount.upsert({
      where: {
        userId_platform_accountId: {
          userId: user.id,
          platform: 'facebook',
          accountId: fbUser.id
        }
      },
      update: {
        accountName: fbUser.name,
        accessToken,
        expiresAt,
        isActive: true,
        scope: 'pages_manage_posts,pages_read_engagement,pages_show_list,business_management,pages_manage_metadata,pages_read_user_content'
      },
      create: {
        userId: user.id,
        platform: 'facebook',
        accountId: fbUser.id,
        accountName: fbUser.name,
        accessToken,
        expiresAt,
        scope: 'pages_manage_posts,pages_read_engagement,pages_show_list,business_management,pages_manage_metadata,pages_read_user_content',
        isActive: true
      }
    })

    // Get user's pages
    const pages = await getUserPages(accessToken)

    // Save pages to database
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
    }

    // Redirect to success page
    return NextResponse.redirect(
      new URL(`/pages/connect?success=true&pages=${pages.length}`, request.url)
    )

  } catch (error) {
    console.error('Facebook callback error:', error)

    const fbError = handleFacebookError(error)

    return NextResponse.redirect(
      new URL(
        `/pages/connect?error=${encodeURIComponent(fbError.message)}`,
        request.url
      )
    )
  }
}
