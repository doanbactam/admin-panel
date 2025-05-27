'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Facebook,
  AlertTriangle,
  RefreshCw
} from 'lucide-react'

interface PublishingResult {
  pageId: string
  postPageId: string
  success: boolean
  facebookPostId?: string
  error?: {
    code: string
    message: string
    type: string
  }
}

interface PublishingProgressProps {
  postId: string
  isPublishing: boolean
  onComplete?: (results: any) => void
  onRetry?: () => void
}

export const PublishingProgress = ({
  postId,
  isPublishing,
  onComplete,
  onRetry
}: PublishingProgressProps) => {
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<PublishingResult[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [status, setStatus] = useState<'idle' | 'publishing' | 'completed' | 'failed'>('idle')
  const [summary, setSummary] = useState<{
    total: number
    successful: number
    failed: number
    commented?: number
  } | null>(null)

  // Fetch post pages
  useEffect(() => {
    const fetchPostPages = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`)
        const data = await response.json()

        if (response.ok && data.post) {
          setPages(data.post.postPages || [])
        }
      } catch (error) {
        console.error('Error fetching post pages:', error)
      }
    }

    if (postId) {
      fetchPostPages()
    }
  }, [postId])

  // Start publishing when isPublishing becomes true
  useEffect(() => {
    if (isPublishing && status === 'idle') {
      startPublishing()
    }
  }, [isPublishing, status])

  const startPublishing = async () => {
    setStatus('publishing')
    setProgress(0)
    setResults([])

    try {
      console.log('Starting publish request for post:', postId)

      const response = await fetch(`/api/posts/${postId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Publish response status:', response.status)

      const data = await response.json()
      console.log('Publish response data:', data)

      if (response.ok) {
        setResults(data.results || [])
        setSummary(data.summary)
        setProgress(100)
        setStatus('completed')

        if (onComplete) {
          onComplete(data)
        }
      } else {
        setStatus('failed')
        console.error('Publishing failed:', {
          status: response.status,
          error: data.error,
          details: data.details,
          postId: data.postId
        })
      }
    } catch (error) {
      setStatus('failed')
      console.error('Publishing error:', error)
    }
  }

  const getStatusIcon = (success: boolean, error?: any) => {
    if (success) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else {
      return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (success: boolean, error?: any) => {
    if (success) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Thành công
        </Badge>
      )
    } else {
      return (
        <Badge variant="destructive">
          Thất bại
        </Badge>
      )
    }
  }

  if (!isPublishing && status === 'idle') {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === 'publishing' && <Loader2 className="h-5 w-5 animate-spin" />}
          {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
          {status === 'failed' && <XCircle className="h-5 w-5 text-red-600" />}
          Quá trình đăng bài
        </CardTitle>
        <CardDescription>
          {status === 'publishing' && 'Đang đăng bài lên các fanpage...'}
          {status === 'completed' && 'Đã hoàn thành đăng bài'}
          {status === 'failed' && 'Đăng bài thất bại'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {status === 'publishing' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tiến độ</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Summary */}
        {summary && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center gap-4 text-sm">
                <span>Tổng: {summary.total}</span>
                <span className="text-green-600">Thành công: {summary.successful}</span>
                <span className="text-red-600">Thất bại: {summary.failed}</span>
                {summary.commented !== undefined && summary.commented > 0 && (
                  <span className="text-blue-600">Comment: {summary.commented}</span>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Results List */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Chi tiết kết quả:</h4>
            {results.map((result, index) => {
              const page = pages.find(p => p.id === result.postPageId)

              return (
                <div
                  key={result.postPageId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.success, result.error)}
                    <div>
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">
                          {page?.page?.name || 'Unknown Page'}
                        </span>
                      </div>
                      {result.error && (
                        <p className="text-xs text-red-600 mt-1">
                          {result.error.message}
                        </p>
                      )}
                      {result.facebookPostId && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Post ID: {result.facebookPostId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(result.success, result.error)}
                    {result.success && result.facebookPostId && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Use real Facebook post URL
                          const url = `https://www.facebook.com/${result.facebookPostId}`
                          window.open(url, '_blank')
                        }}
                      >
                        Xem bài viết
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Actions */}
        {status === 'failed' && onRetry && (
          <div className="flex justify-center">
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </div>
        )}

        {/* Publishing Status */}
        {status === 'publishing' && (
          <div className="text-center text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
            Đang đăng bài... Vui lòng không đóng trang này.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
