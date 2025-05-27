'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Activity,
  Users,
  Eye,
  Heart,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap
} from 'lucide-react'

interface RealTimeMetrics {
  activeUsers: number
  liveEngagement: number
  recentPosts: {
    id: string
    content: string
    publishedAt: string
    liveMetrics: {
      views: number
      likes: number
      comments: number
      shares: number
    }
  }[]
  hourlyStats: {
    hour: number
    engagement: number
    reach: number
  }[]
  topPerformingNow: {
    postId: string
    content: string
    engagementRate: number
  } | null
}

interface RealTimeMetricsProps {
  pageId?: string
}

export function RealTimeMetrics({ pageId }: RealTimeMetricsProps) {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchRealTimeMetrics = async () => {
    try {
      const params = new URLSearchParams({
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      
      const response = await fetch(`/api/analytics/realtime?${params}`)
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Error fetching real-time metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRealTimeMetrics()
    
    // Update every 30 seconds
    const interval = setInterval(fetchRealTimeMetrics, 30000)
    
    return () => clearInterval(interval)
  }, [pageId])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getEngagementTrend = (current: number, previous: number) => {
    if (previous === 0) return { trend: 'neutral', percentage: 0 }
    const change = ((current - previous) / previous) * 100
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs(change)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Thống kê thời gian thực
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Không có dữ liệu thời gian thực</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Real-time Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Thống kê thời gian thực
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">
                Cập nhật: {lastUpdate.toLocaleTimeString('vi-VN')}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{formatNumber(metrics.activeUsers)}</div>
              <div className="text-sm text-muted-foreground">Người dùng hoạt động</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold">{formatNumber(metrics.liveEngagement)}</div>
              <div className="text-sm text-muted-foreground">Tương tác trực tiếp</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold">{metrics.recentPosts.length}</div>
              <div className="text-sm text-muted-foreground">Bài viết gần đây</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold">
                {metrics.topPerformingNow?.engagementRate.toFixed(1) || '0'}%
              </div>
              <div className="text-sm text-muted-foreground">Tỷ lệ tương tác cao nhất</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Hiệu suất bài viết gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.recentPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có bài viết gần đây
              </div>
            ) : (
              metrics.recentPosts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {post.content.substring(0, 100)}
                        {post.content.length > 100 && '...'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Đăng lúc: {new Date(post.publishedAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      Live
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.liveMetrics.views)}</div>
                      <div className="text-xs text-muted-foreground">Lượt xem</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.liveMetrics.likes)}</div>
                      <div className="text-xs text-muted-foreground">Thích</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.liveMetrics.comments)}</div>
                      <div className="text-xs text-muted-foreground">Bình luận</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.liveMetrics.shares)}</div>
                      <div className="text-xs text-muted-foreground">Chia sẻ</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Tổng tương tác: {formatNumber(
                        post.liveMetrics.likes + 
                        post.liveMetrics.comments + 
                        post.liveMetrics.shares
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Đang tăng</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tương tác theo giờ (24h qua)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.hourlyStats.slice(-12).map((stat, index) => {
              const maxEngagement = Math.max(...metrics.hourlyStats.map(s => s.engagement))
              const percentage = maxEngagement > 0 ? (stat.engagement / maxEngagement) * 100 : 0
              
              return (
                <div key={stat.hour} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium">
                    {stat.hour.toString().padStart(2, '0')}:00
                  </div>
                  <div className="flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="w-16 text-sm text-right">
                    {formatNumber(stat.engagement)}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Post */}
      {metrics.topPerformingNow && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Bài viết hot nhất hiện tại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium">
                  {metrics.topPerformingNow.content.substring(0, 150)}
                  {metrics.topPerformingNow.content.length > 150 && '...'}
                </p>
                <Badge variant="secondary" className="ml-2">
                  🔥 Hot
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  Tỷ lệ tương tác: {metrics.topPerformingNow.engagementRate.toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
