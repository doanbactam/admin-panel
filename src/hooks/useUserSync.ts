'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface UserSyncState {
  isLoading: boolean
  isError: boolean
  error: string | null
  isSynced: boolean
}

export const useUserSync = () => {
  const { user: clerkUser, isLoaded } = useUser()
  const [state, setState] = useState<UserSyncState>({
    isLoading: false,
    isError: false,
    error: null,
    isSynced: false
  })

  const syncUser = async () => {
    if (!clerkUser) return

    setState(prev => ({ ...prev, isLoading: true, isError: false, error: null }))

    try {
      // First check if user exists
      const checkResponse = await fetch('/api/user/sync')
      
      if (checkResponse.status === 404) {
        // User doesn't exist, create it
        const syncResponse = await fetch('/api/user/sync', {
          method: 'POST'
        })

        if (!syncResponse.ok) {
          const errorData = await syncResponse.json()
          throw new Error(errorData.error || 'Failed to sync user')
        }

        console.log('User synced successfully')
      } else if (!checkResponse.ok) {
        const errorData = await checkResponse.json()
        throw new Error(errorData.error || 'Failed to check user')
      }

      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSynced: true 
      }))

    } catch (error) {
      console.error('Error syncing user:', error)
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }))
    }
  }

  useEffect(() => {
    if (isLoaded && clerkUser && !state.isSynced && !state.isLoading) {
      syncUser()
    }
  }, [isLoaded, clerkUser, state.isSynced, state.isLoading])

  return {
    ...state,
    syncUser
  }
}
