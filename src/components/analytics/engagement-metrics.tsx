'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { Heart, TrendingUp, Clock, Target } from 'lucide-react'

interface EngagementData {
  totalEngagement: number
  engagementRate: number
  reactionBreakdown: {
    like: number
    love: number
    wow: number
    haha: number
    sorry: number
    anger: number
  }
  bestPerformingTimes: Array<{
    hour: number
    engagement: number
    posts: number
  }>
  postTypePerformance: Array<{
    type: string
    engagement: number
    reach: number
    posts: number
  }>
  topHashtags: Array<{
    hashtag: string
    usage: number
    avgEngagement: number
  }>
}

interface EngagementMetricsProps {
  period: 'day' | 'week' | 'days_28'
  pageId?: string
}

export function EngagementMetrics({ period, pageId }: EngagementMetricsProps) {
  const [engagementData, setEngagementData] = useState<EngagementData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchEngagementData = async () => {
    try {
      setIsLoading(true)

      const params = new URLSearchParams({
        period,
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      const response = await fetch(`/api/analytics/engagement?${params}`)
      if (response.ok) {
        const data = await response.json()
        setEngagementData(data)
      }
    } catch (error) {
      console.error('Error fetching engagement data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEngagementData()
  }, [period, pageId])

  const reactionColors = {
    like: '#3b82f6',
    love: '#ef4444',
    wow: '#f59e0b',
    haha: '#10b981',
    sorry: '#8b5cf6',
    anger: '#f97316'
  }

  const reactionEmojis = {
    like: '👍',
    love: '❤️',
    wow: '😮',
    haha: '😂',
    sorry: '😢',
    anger: '😡'
  }

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Phân tích tương tác</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Đang tải dữ liệu...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!engagementData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Phân tích tương tác</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Chưa có dữ liệu tương tác
          </div>
        </CardContent>
      </Card>
    )
  }

  const reactionData = Object.entries(engagementData.reactionBreakdown).map(([key, value]) => ({
    name: key,
    value,
    emoji: reactionEmojis[key as keyof typeof reactionEmojis],
    color: reactionColors[key as keyof typeof reactionColors]
  }))

  return (
    <div className="space-y-4">
      {/* Engagement Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Tổng quan tương tác
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tỷ lệ tương tác</span>
              <Badge variant="secondary">
                {engagementData.engagementRate.toFixed(2)}%
              </Badge>
            </div>
            <Progress value={engagementData.engagementRate} className="h-2" />

            <div className="text-center">
              <div className="text-2xl font-bold">
                {engagementData.totalEngagement.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Tổng tương tác trong {period === 'day' ? '24h' : period === 'week' ? '7 ngày' : '28 ngày'} qua
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reaction Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích reactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {reactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value.toLocaleString(),
                    `${reactionEmojis[name as keyof typeof reactionEmojis]} ${name}`
                  ]}
                />
                <Legend
                  formatter={(value) => `${reactionEmojis[value as keyof typeof reactionEmojis]} ${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Best Performing Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Thời gian hiệu quả nhất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData.bestPerformingTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={formatTime}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), 'Tương tác']}
                  labelFormatter={(label) => `Giờ: ${formatTime(label)}`}
                />
                <Bar dataKey="engagement" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Post Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Hiệu suất theo loại bài viết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {engagementData.postTypePerformance.map((type) => (
              <div key={type.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {type.type === 'post' ? '📝 Post' :
                       type.type === 'reel' ? '🎬 Reel' :
                       '📖 Story'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {type.posts} bài viết
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {type.engagement.toLocaleString()} tương tác
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {type.reach.toLocaleString()} tiếp cận
                    </div>
                  </div>
                </div>
                <Progress
                  value={(type.engagement / Math.max(...engagementData.postTypePerformance.map(p => p.engagement))) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Hashtags */}
      {engagementData.topHashtags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hashtags hiệu quả nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {engagementData.topHashtags.slice(0, 5).map((hashtag, index) => (
                <div key={hashtag.hashtag} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <span className="font-medium text-blue-600">
                      #{hashtag.hashtag}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {hashtag.usage} lần sử dụng
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hashtag.avgEngagement.toFixed(1)} tương tác TB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
