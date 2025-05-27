'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Clock,
  RefreshCw,
  X,
  Calendar,
  XCircle,
  Play
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface OverduePost {
  id: string
  title?: string
  content: string
  scheduledAt: string
  delayMinutes: number
  delayText: string
  pages: {
    id: string
    name: string
    picture?: string
  }[]
}

interface OverduePostsAlertProps {
  onPostsProcessed?: () => void
}

const OverduePostsAlert = ({ onPostsProcessed }: OverduePostsAlertProps) => {
  const [overduePosts, setOverduePosts] = useState<OverduePost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const fetchOverduePosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/posts/check-overdue')
      if (response.ok) {
        const data = await response.json()
        setOverduePosts(data.overduePosts || [])
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsLoading(false)
    }
  }

  const processOverduePosts = async () => {
    try {
      setIsProcessing(true)

      // Trigger overdue processing via queue system
      const response = await fetch('/api/cron/process-overdue-posts', {
        method: 'POST'
      })

      if (response.ok) {
        // Wait a moment for queue to process
        setTimeout(async () => {
          // Refresh overdue posts list
          await fetchOverduePosts()

          // Notify parent component
          onPostsProcessed?.()
        }, 2000) // Wait 2 seconds for processing
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsProcessing(false)
    }
  }

  const markPostAsFailed = async (postId: string) => {
    try {
      const response = await fetch('/api/posts/check-overdue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          action: 'mark-failed'
        })
      })

      if (response.ok) {
        // Remove from overdue list
        setOverduePosts(prev => prev.filter(p => p.id !== postId))
        onPostsProcessed?.()
      }
    } catch (error) {
      // Handle error silently
    }
  }

  const reschedulePost = async (postId: string) => {
    const newTime = prompt('Nhập thời gian mới (YYYY-MM-DDTHH:MM):')
    if (!newTime) return

    try {
      const response = await fetch('/api/posts/check-overdue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          action: 'reschedule',
          newScheduledAt: newTime
        })
      })

      if (response.ok) {
        // Remove from overdue list
        setOverduePosts(prev => prev.filter(p => p.id !== postId))
        onPostsProcessed?.()
      }
    } catch (error) {
      // Handle error silently
    }
  }

  useEffect(() => {
    fetchOverduePosts()

    // Check for overdue posts every 5 minutes
    const interval = setInterval(fetchOverduePosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible || overduePosts.length === 0) {
    return null
  }

  return (
    <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-orange-800 dark:text-orange-200">
                Có {overduePosts.length} bài viết đã quá thời gian đăng
              </span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <Clock className="h-3 w-3 mr-1" />
                Quá hạn
              </Badge>
            </div>

            <div className="space-y-2 mb-3">
              {overduePosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {post.title || post.content.substring(0, 50) + '...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Dự kiến: {format(new Date(post.scheduledAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      <span className="text-orange-600 ml-2">
                        (Trễ {post.delayText})
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {post.pages.map(p => p.name).join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => reschedulePost(post.id)}
                      className="h-6 px-2 text-xs"
                    >
                      <Calendar className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markPostAsFailed(post.id)}
                      className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}

              {overduePosts.length > 3 && (
                <div className="text-xs text-gray-500">
                  và {overduePosts.length - 3} bài viết khác...
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={processOverduePosts}
                disabled={isProcessing}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Đăng ngay
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={fetchOverduePosts}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Làm mới
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-orange-600 hover:text-orange-700 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export default OverduePostsAlert
