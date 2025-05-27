import { auth } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Test clerkClient
    console.log('clerkId:', clerkId)

    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    console.log('clerk:', typeof clerk)
    console.log('clerk.users:', typeof clerk.users)

    const clerkUser = await clerk.users.getUser(clerkId)

    return NextResponse.json({
      success: true,
      clerkId,
      user: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      }
    })
  } catch (error) {
    console.error('Error testing clerk:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
