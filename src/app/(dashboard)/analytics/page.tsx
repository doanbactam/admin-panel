'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { InsightsDashboard } from '@/components/analytics/insights-dashboard'
import { PerformanceCharts } from '@/components/analytics/performance-charts'
import { EngagementMetrics } from '@/components/analytics/engagement-metrics'

import { AudienceInsights } from '@/components/analytics/audience-insights'
import { ComparisonAnalysis } from '@/components/analytics/comparison-analysis'
import { RealTimeMetrics } from '@/components/analytics/real-time-metrics'
import { FacebookAPIStatus } from '@/components/analytics/facebook-api-status'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Heart,
  RefreshCw,
  Download,
  Calendar,
  Filter,
  Search,
  FileText,
  PieChart,
  Activity,
  Target
} from 'lucide-react'

interface AnalyticsData {
  totalPosts: number
  totalReach: number
  totalImpressions: number
  totalEngagement: number
  totalClicks: number
  totalLikes: number
  averageEngagementRate: number
  growthRate: number
  bestPerformingTime: string
  topPerformingPost: {
    id: string
    content: string
    reach: number
    engagement: number
  } | null
  trends: {
    reach: number
    engagement: number
    impressions: number
  }
}

interface PageData {
  pageId: string
  name: string
  picture: string
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [pages, setPages] = useState<PageData[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'days_28'>('days_28')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState<{
    from: Date | null
    to: Date | null
  }>({
    from: null,
    to: null
  })


  const fetchPages = async () => {
    try {
      const response = await fetch('/api/user/sync')
      if (response.ok) {
        const data = await response.json()

        const userPages = data.user?.socialAccounts
          ?.filter((account: any) => account.isActive !== false) // Include active and null
          ?.flatMap((account: any) => {
            return account.pages?.filter((page: any) => page.isActive !== false) || [] // Include active and null
          })
          ?.map((page: any) => ({
            pageId: page.pageId,
            name: page.name,
            picture: page.picture || ''
          })) || []

        setPages(userPages)
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)

      // Fetch analytics summary from database
      const params = new URLSearchParams({
        period: selectedPeriod,
        ...(selectedPage !== 'all' && { page: selectedPage })
      })
      const response = await fetch(`/api/analytics/summary?${params}`)

      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
        setLastSyncAt(new Date(data.lastSyncAt))
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncInsights = async () => {
    try {
      setIsSyncing(true)

      const response = await fetch('/api/analytics/sync', {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Sync completed:', result)

        // Show success message
        if (result.success) {
          console.log(`Synced ${result.totalSynced} posts successfully`)
          if (result.totalErrors > 0) {
            console.warn(`${result.totalErrors} errors occurred during sync`)
          }
        }

        // Refresh analytics data
        await fetchAnalytics()
        setLastSyncAt(new Date())
      } else {
        const error = await response.json()
        console.error('Sync failed:', error.error)
      }
    } catch (error) {
      console.error('Error syncing insights:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [selectedPeriod, selectedPage])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Theo dõi hiệu suất bài viết và tương tác của bạn
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Phân tích chi tiết hiệu suất bài viết và tương tác của bạn
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {lastSyncAt && (
            <div className="text-sm text-muted-foreground">
              Cập nhật: {lastSyncAt.toLocaleString('vi-VN')}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncInsights}
              disabled={isSyncing}
              className="relative"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Đang đồng bộ Facebook API...' : 'Đồng bộ Facebook Insights'}
              <Badge variant="secondary" className="ml-2 text-xs">
                API
              </Badge>
            </Button>


          </div>
        </div>
      </div>



      {/* Enhanced Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex items-center space-x-2 flex-1 max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Page Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Fanpage:</span>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn fanpage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả fanpage</SelectItem>
                    {pages.map((page) => (
                      <SelectItem key={page.pageId} value={page.pageId}>
                        <div className="flex items-center space-x-2">
                          {page.picture && (
                            <img
                              src={page.picture}
                              alt={page.name}
                              className="w-4 h-4 rounded-full"
                            />
                          )}
                          <span>{page.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6 hidden sm:block" />

              {/* Period Filter */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Thời gian:</span>
                <div className="flex space-x-1">
                  {[
                    { value: 'day', label: '24h' },
                    { value: 'week', label: '7 ngày' },
                    { value: 'days_28', label: '28 ngày' }
                  ].map((period) => (
                    <Button
                      key={period.value}
                      variant={selectedPeriod === period.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period.value as any)}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Overview Cards */}
      {analyticsData && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                Bài viết đã đăng
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng tiếp cận</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalReach.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className={`text-xs ${analyticsData.trends.reach >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.trends.reach >= 0 ? '↗' : '↘'} {Math.abs(analyticsData.trends.reach)}%
                </span>
                vs kỳ trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt hiển thị</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalImpressions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className={`text-xs ${analyticsData.trends.impressions >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.trends.impressions >= 0 ? '↗' : '↘'} {Math.abs(analyticsData.trends.impressions)}%
                </span>
                vs kỳ trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tương tác</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalEngagement.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className={`text-xs ${analyticsData.trends.engagement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.trends.engagement >= 0 ? '↗' : '↘'} {Math.abs(analyticsData.trends.engagement)}%
                </span>
                vs kỳ trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ tương tác</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.averageEngagementRate.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Tỷ lệ tương tác trung bình
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabbed Analytics Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Thời gian thực
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Hiệu suất
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Đối tượng
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            So sánh
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Chi tiết
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceCharts period={selectedPeriod} pageId={selectedPage} />
            <EngagementMetrics period={selectedPeriod} pageId={selectedPage} />
          </div>

          {/* Top Performing Post */}
          {analyticsData?.topPerformingPost && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Bài viết hiệu suất cao nhất
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">
                      {analyticsData.topPerformingPost.content.substring(0, 200)}
                      {analyticsData.topPerformingPost.content.length > 200 && '...'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {analyticsData.topPerformingPost.reach.toLocaleString()} tiếp cận
                    </Badge>
                    <Badge variant="secondary">
                      <Heart className="h-3 w-3 mr-1" />
                      {analyticsData.topPerformingPost.engagement.toLocaleString()} tương tác
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RealTimeMetrics pageId={selectedPage} />
            </div>
            <div>
              <FacebookAPIStatus
                onSync={handleSyncInsights}
                isSyncing={isSyncing}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6">
            <PerformanceCharts period={selectedPeriod} pageId={selectedPage} />
            <EngagementMetrics period={selectedPeriod} pageId={selectedPage} />
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <AudienceInsights period={selectedPeriod} pageId={selectedPage} />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <ComparisonAnalysis period={selectedPeriod} pageId={selectedPage} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <InsightsDashboard
            period={selectedPeriod}
            pageId={selectedPage}
            searchQuery={searchQuery}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
