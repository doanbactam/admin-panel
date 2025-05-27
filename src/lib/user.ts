import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/**
 * Get or create user in database from Clerk ID
 * This function ensures that a user exists in our database
 */
export async function getOrCreateUser(clerkId: string) {
  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (user) {
    return user
  }

  // User doesn't exist, get details from Clerk and create
  try {
    const clerkUser = await currentUser()

    if (!clerkUser || clerkUser.id !== clerkId) {
      throw new Error('Clerk user not found or ID mismatch')
    }

    // Create user in database
    user = await prisma.user.create({
      data: {
        clerkId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
        imageUrl: clerkUser.imageUrl || null
      }
    })

    console.log('Auto-created user:', {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      name: user.name
    })

    return user

  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user in database')
  }
}

/**
 * Update user information from Clerk
 */
export async function updateUserFromClerk(clerkId: string) {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser || clerkUser.id !== clerkId) {
      throw new Error('Clerk user not found or ID mismatch')
    }

    const updatedData: any = {}
    const currentEmail = clerkUser.emailAddresses[0]?.emailAddress || ''
    const currentName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null
    const currentImageUrl = clerkUser.imageUrl || null

    // Get current user from database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      throw new Error('User not found in database')
    }

    // Check what needs to be updated
    if (user.email !== currentEmail) {
      updatedData.email = currentEmail
    }
    if (user.name !== currentName) {
      updatedData.name = currentName
    }
    if (user.imageUrl !== currentImageUrl) {
      updatedData.imageUrl = currentImageUrl
    }

    // Update if there are changes
    if (Object.keys(updatedData).length > 0) {
      const updatedUser = await prisma.user.update({
        where: { clerkId },
        data: updatedData
      })

      console.log('Updated user:', {
        id: updatedUser.id,
        clerkId: updatedUser.clerkId,
        changes: updatedData
      })

      return updatedUser
    }

    return user

  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user information')
  }
}
