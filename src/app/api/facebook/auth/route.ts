import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { getFacebookAuthUrl } from '@/lib/facebook'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state') || `${clerkId}_${Date.now()}`

    // Generate Facebook OAuth URL
    const authUrl = getFacebookAuthUrl(state)

    // Redirect to Facebook OAuth
    return NextResponse.redirect(authUrl)

  } catch (error) {
    console.error('Facebook auth error:', error)
    return NextResponse.redirect(
      new URL('/pages/connect?error=auth_failed', request.url)
    )
  }
}
