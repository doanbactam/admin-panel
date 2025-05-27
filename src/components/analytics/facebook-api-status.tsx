'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Activity,
  Database,
  Zap
} from 'lucide-react'

interface FacebookAPIStatus {
  isConnected: boolean
  lastSync: string | null
  totalPosts: number
  syncedPosts: number
  pendingSync: number
  apiCallsToday: number
  apiLimit: number
  errors: string[]
  pages: {
    pageId: string
    name: string
    status: 'connected' | 'error' | 'syncing'
    lastSync: string | null
  }[]
}

interface FacebookAPIStatusProps {
  onSync?: () => void
  isSyncing?: boolean
}

export function FacebookAPIStatus({ onSync, isSyncing = false }: FacebookAPIStatusProps) {
  const [status, setStatus] = useState<FacebookAPIStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/analytics/sync')
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error('Error fetching Facebook API status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (connected: boolean, hasErrors: boolean) => {
    if (!connected || hasErrors) {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getStatusText = (connected: boolean, hasErrors: boolean) => {
    if (!connected) return 'Không kết nối'
    if (hasErrors) return 'Có lỗi'
    return 'Hoạt động bình thường'
  }

  const getStatusColor = (connected: boolean, hasErrors: boolean) => {
    if (!connected || hasErrors) return 'destructive'
    return 'secondary'
  }

  // Safe access to status properties with defaults
  const isConnected = status?.isConnected ?? false
  const errors = status?.errors ?? []
  const pages = status?.pages ?? []
  const totalPosts = status?.totalPosts ?? 0
  const syncedPosts = status?.syncedPosts ?? 0
  const pendingSync = status?.pendingSync ?? 0
  const apiCallsToday = status?.apiCallsToday ?? 0
  const apiLimit = status?.apiLimit ?? 1000

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Facebook API Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Không thể tải trạng thái API</p>
        </CardContent>
      </Card>
    )
  }

  const syncProgress = totalPosts > 0 ? (syncedPosts / totalPosts) * 100 : 0
  const apiUsageProgress = apiLimit > 0 ? (apiCallsToday / apiLimit) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Facebook API Status
          </CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon(isConnected, errors.length > 0)}
            <Badge variant={getStatusColor(isConnected, errors.length > 0)}>
              {getStatusText(isConnected, errors.length > 0)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sync Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Trạng thái đồng bộ
            </span>
            <span className="text-sm text-muted-foreground">
              {syncedPosts}/{totalPosts} bài viết
            </span>
          </div>
          <Progress value={syncProgress} className="h-2" />
          {pendingSync > 0 && (
            <p className="text-xs text-orange-600">
              {pendingSync} bài viết chờ đồng bộ
            </p>
          )}
        </div>

        {/* API Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              API Usage (hôm nay)
            </span>
            <span className="text-sm text-muted-foreground">
              {apiCallsToday.toLocaleString()}/{apiLimit.toLocaleString()}
            </span>
          </div>
          <Progress
            value={apiUsageProgress}
            className={`h-2 ${apiUsageProgress > 80 ? 'bg-red-100' : ''}`}
          />
          {apiUsageProgress > 80 && (
            <p className="text-xs text-red-600">
              Gần đạt giới hạn API
            </p>
          )}
        </div>

        {/* Last Sync */}
        {status?.lastSync && (
          <div className="text-sm text-muted-foreground">
            Đồng bộ lần cuối: {new Date(status.lastSync).toLocaleString('vi-VN')}
          </div>
        )}

        {/* Pages Status */}
        {pages.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Trạng thái fanpage:</span>
            <div className="space-y-1">
              {pages.map((page) => (
                <div key={page.pageId} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{page.name}</span>
                  <div className="flex items-center gap-2">
                    {page.status === 'connected' && <CheckCircle className="h-3 w-3 text-green-500" />}
                    {page.status === 'error' && <XCircle className="h-3 w-3 text-red-500" />}
                    {page.status === 'syncing' && <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />}
                    <Badge variant="outline" className="text-xs">
                      {page.status === 'connected' ? 'OK' :
                       page.status === 'error' ? 'Lỗi' : 'Đang sync'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Lỗi gần đây:
            </span>
            <div className="space-y-1">
              {errors.slice(0, 3).map((error, index) => (
                <p key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Sync Button */}
        {onSync && (
          <Button
            onClick={onSync}
            disabled={isSyncing}
            size="sm"
            className="w-full"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
