import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { socialAccountId } = body

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (socialAccountId) {
      // Disconnect specific social account
      const socialAccount = await prisma.socialAccount.findFirst({
        where: {
          id: socialAccountId,
          userId: user.id,
          platform: 'facebook'
        }
      })

      if (!socialAccount) {
        return NextResponse.json(
          { error: 'Social account not found' },
          { status: 404 }
        )
      }

      // Deactivate social account and its pages
      await prisma.socialAccount.update({
        where: { id: socialAccountId },
        data: { isActive: false }
      })

      await prisma.page.updateMany({
        where: { socialAccountId },
        data: { isActive: false }
      })

      return NextResponse.json({
        success: true,
        message: 'Facebook account disconnected successfully'
      })
    } else {
      // Disconnect all Facebook accounts
      const socialAccounts = await prisma.socialAccount.findMany({
        where: {
          userId: user.id,
          platform: 'facebook',
          isActive: true
        }
      })

      // Deactivate all Facebook social accounts
      await prisma.socialAccount.updateMany({
        where: {
          userId: user.id,
          platform: 'facebook'
        },
        data: { isActive: false }
      })

      // Deactivate all pages
      await prisma.page.updateMany({
        where: {
          socialAccount: {
            userId: user.id,
            platform: 'facebook'
          }
        },
        data: { isActive: false }
      })

      return NextResponse.json({
        success: true,
        message: `Disconnected ${socialAccounts.length} Facebook account(s) successfully`
      })
    }

  } catch (error) {
    console.error('Error disconnecting Facebook:', error)
    return NextResponse.json(
      { error: 'Failed to disconnect Facebook account' },
      { status: 500 }
    )
  }
}
