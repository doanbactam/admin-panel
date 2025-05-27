'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Users,
  Eye,
  MousePointer,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  TrendingDown,
  ExternalLink
} from 'lucide-react'

interface PostInsight {
  id: string
  fbPostId: string
  content: string
  createdAt: string
  analytics: {
    likes: number
    reach: number
    impressions: number
    clicks: number
    engagement: number
    reactions: {
      like: number
      love: number
      wow: number
      haha: number
      sorry: number
      anger: number
    }
  }
  page: {
    name: string
    picture: string
  }
}

interface PageInsight {
  pageId: string
  name: string
  picture: string
  analytics: {
    impressions: number
    reach: number
    engagement: number
    fans: number
    fanAdds: number
    fanRemoves: number
    views: number
  }
}

interface InsightsDashboardProps {
  period: 'day' | 'week' | 'days_28'
  pageId?: string
  searchQuery?: string
}

export function InsightsDashboard({ period, pageId, searchQuery }: InsightsDashboardProps) {
  const [postInsights, setPostInsights] = useState<PostInsight[]>([])
  const [pageInsights, setPageInsights] = useState<PageInsight[]>([])
  const [sortBy, setSortBy] = useState<'reach' | 'engagement' | 'impressions'>('reach')
  const [isLoading, setIsLoading] = useState(true)

  const fetchInsights = async () => {
    try {
      setIsLoading(true)

      // Fetch post insights
      const postsParams = new URLSearchParams({
        period,
        page: pageId || 'all',
        sort: sortBy,
        ...(searchQuery && { search: searchQuery })
      })
      const postsResponse = await fetch(`/api/analytics/posts?${postsParams}`)
      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setPostInsights(postsData.posts || [])
      }

      // Fetch page insights
      const pagesParams = new URLSearchParams({
        period,
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      const pagesResponse = await fetch(`/api/analytics/pages?${pagesParams}`)
      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPageInsights(pagesData.pages || [])
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [period, pageId, sortBy, searchQuery])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const calculateEngagementRate = (engagement: number, reach: number) => {
    if (reach === 0) return 0
    return ((engagement / reach) * 100).toFixed(2)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                  <div className="flex space-x-2">
                    <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Insights */}
      {pageInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Thống kê Fanpage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pageInsights.map((page) => (
                <div key={page.pageId} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    {page.picture && (
                      <img
                        src={page.picture}
                        alt={page.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{page.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(page.analytics.fans)} followers
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-500" />
                      <span>{formatNumber(page.analytics.reach)} tiếp cận</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span>{formatNumber(page.analytics.engagement)} tương tác</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span>+{page.analytics.fanAdds} follows</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-orange-500" />
                      <span>-{page.analytics.fanRemoves} unfollows</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hiệu suất bài viết
            </CardTitle>

            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reach">Tiếp cận</SelectItem>
                  <SelectItem value="engagement">Tương tác</SelectItem>
                  <SelectItem value="impressions">Hiển thị</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postInsights.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có dữ liệu insights cho bài viết
              </div>
            ) : (
              postInsights.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={post.page.picture || '/avatars/01.png'}
                          alt={post.page.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{post.page.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 && '...'}
                      </p>
                    </div>

                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">{formatNumber(post.analytics.reach)}</div>
                        <div className="text-xs text-muted-foreground">Tiếp cận</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="font-medium">{formatNumber(post.analytics.impressions)}</div>
                        <div className="text-xs text-muted-foreground">Hiển thị</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <div>
                        <div className="font-medium">{formatNumber(post.analytics.engagement)}</div>
                        <div className="text-xs text-muted-foreground">Tương tác</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-purple-500" />
                      <div>
                        <div className="font-medium">{formatNumber(post.analytics.clicks)}</div>
                        <div className="text-xs text-muted-foreground">Clicks</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <span>❤️ {post.analytics.reactions.like}</span>
                      <span>😍 {post.analytics.reactions.love}</span>
                      <span>😮 {post.analytics.reactions.wow}</span>
                      <span>😂 {post.analytics.reactions.haha}</span>
                    </div>

                    <Badge variant="secondary">
                      {calculateEngagementRate(post.analytics.engagement, post.analytics.reach)}% engagement
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
