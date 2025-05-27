'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface UserSyncState {
  isLoading: boolean
  isError: boolean
  error: string | null
  isSynced: boolean
}

export const useUserSync = () => {
  const { user, isLoaded } = useUser()
  const [syncState, setSyncState] = useState<UserSyncState>({
    isLoading: false,
    isError: false,
    error: null,
    isSynced: false,
  })

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return

      // Tạm thời disable sync để test
      setSyncState({
        isLoading: false,
        isError: false,
        error: null,
        isSynced: true,
      })

      console.log('User sync disabled for testing')
      return

      setSyncState(prev => ({ ...prev, isLoading: true, isError: false, error: null }))

      try {
        const response = await fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Sync failed: ${response.statusText}`)
        }

        const data = await response.json()

        setSyncState({
          isLoading: false,
          isError: false,
          error: null,
          isSynced: true,
        })

        console.log('User synced successfully:', data.user)
      } catch (error) {
        console.error('Error syncing user:', error)
        setSyncState({
          isLoading: false,
          isError: true,
          error: error instanceof Error ? error.message : 'Unknown error',
          isSynced: false,
        })
      }
    }

    syncUser()
  }, [isLoaded, user])

  return {
    ...syncState,
    user,
    isUserLoaded: isLoaded,
  }
}
