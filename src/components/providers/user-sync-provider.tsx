'use client'

import { useEffect } from 'react'
import { useUserSync } from '@/hooks/useUserSync'
import { Loader2 } from 'lucide-react'

interface UserSyncProviderProps {
  children: React.ReactNode
}

export const UserSyncProvider = ({ children }: UserSyncProviderProps) => {
  const { isLoading, isError, error, isSynced } = useUserSync()

  // Show loading state while syncing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang đồng bộ tài khoản...</p>
        </div>
      </div>
    )
  }

  // Show error state if sync failed
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Lỗi đồng bộ tài khoản
            </h2>
            <p className="text-red-600 mb-4">
              {error || 'Không thể đồng bộ thông tin tài khoản'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render children once synced
  return <>{children}</>
}
