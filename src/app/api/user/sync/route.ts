import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/user/sync - Sync user from Clerk to database
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user details from Clerk
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return NextResponse.json({ error: 'Clerk user not found' }, { status: 404 })
    }

    // Check if user already exists in database
    let user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      // Create user in database
      user = await prisma.user.create({
        data: {
          clerkId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
          imageUrl: clerkUser.imageUrl || null
        }
      })

      console.log('Created new user:', {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name
      })
    } else {
      // Update user info if needed
      const updatedData: any = {}
      const currentEmail = clerkUser.emailAddresses[0]?.emailAddress || ''
      const currentName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null
      const currentImageUrl = clerkUser.imageUrl || null

      if (user.email !== currentEmail) {
        updatedData.email = currentEmail
      }
      if (user.name !== currentName) {
        updatedData.name = currentName
      }
      if (user.imageUrl !== currentImageUrl) {
        updatedData.imageUrl = currentImageUrl
      }

      if (Object.keys(updatedData).length > 0) {
        user = await prisma.user.update({
          where: { clerkId },
          data: updatedData
        })

        console.log('Updated user:', {
          id: user.id,
          clerkId: user.clerkId,
          changes: updatedData
        })
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl
      }
    })

  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      {
        error: 'Failed to sync user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET /api/user/sync - Get current user info
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        socialAccounts: {
          include: {
            pages: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({
        error: 'User not found in database',
        needsSync: true
      }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        socialAccounts: user.socialAccounts
      }
    })

  } catch (error) {
    console.error('Error getting user:', error)
    return NextResponse.json(
      {
        error: 'Failed to get user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
