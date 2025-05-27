'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserSync } from '@/hooks/use-user-sync'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { isSignedIn, isLoaded } = useUser()
  const { isLoading: isSyncing, isError: syncError } = useUserSync()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Loading state
  if (!isLoaded || isSyncing) {
    return fallback || <AuthLoadingSkeleton />
  }

  // Not signed in
  if (!isSignedIn) {
    return null // Will redirect in useEffect
  }

  // Sync error
  if (syncError) {
    return <AuthErrorState />
  }

  return <>{children}</>
}

const AuthLoadingSkeleton = () => (
  <div className="flex min-h-screen w-full">
    {/* Sidebar skeleton */}
    <div className="w-64 border-r border-border/40 p-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    </div>
    
    {/* Main content skeleton */}
    <div className="flex-1 p-6">
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  </div>
)

const AuthErrorState = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-destructive mb-2">
        Lỗi đồng bộ tài khoản
      </h1>
      <p className="text-muted-foreground mb-4">
        Không thể đồng bộ thông tin tài khoản. Vui lòng thử lại.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Thử lại
      </button>
    </div>
  </div>
)
