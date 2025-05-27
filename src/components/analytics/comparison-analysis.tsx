'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Users,
  Eye,
  Heart,
  MousePointer
} from 'lucide-react'

interface ComparisonData {
  timeComparison: {
    current: { date: string; reach: number; engagement: number; impressions: number }[]
    previous: { date: string; reach: number; engagement: number; impressions: number }[]
  }
  postComparison: {
    id: string
    content: string
    metrics: {
      reach: number
      engagement: number
      impressions: number
      clicks: number
    }
    createdAt: string
  }[]
  pageComparison: {
    pageId: string
    name: string
    picture: string
    metrics: {
      reach: number
      engagement: number
      impressions: number
      followers: number
    }
  }[]
  insights: {
    bestPerformingMetric: string
    improvementAreas: string[]
    recommendations: string[]
  }
}

interface ComparisonAnalysisProps {
  period: 'day' | 'week' | 'days_28'
  pageId?: string
}

export function ComparisonAnalysis({ period, pageId }: ComparisonAnalysisProps) {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comparisonType, setComparisonType] = useState<'time' | 'posts' | 'pages'>('time')
  const [selectedMetric, setSelectedMetric] = useState<'reach' | 'engagement' | 'impressions'>('reach')

  const fetchComparisonData = async () => {
    try {
      setIsLoading(true)
      
      const params = new URLSearchParams({
        period,
        type: comparisonType,
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      
      const response = await fetch(`/api/analytics/comparison?${params}`)
      if (response.ok) {
        const data = await response.json()
        setComparisonData(data)
      }
    } catch (error) {
      console.error('Error fetching comparison data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComparisonData()
  }, [period, pageId, comparisonType])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!comparisonData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Không có dữ liệu so sánh</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comparison Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Loại so sánh:</span>
              <Select value={comparisonType} onValueChange={(value: any) => setComparisonType(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Theo thời gian</SelectItem>
                  <SelectItem value="posts">Theo bài viết</SelectItem>
                  <SelectItem value="pages">Theo fanpage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Chỉ số:</span>
              <Select value={selectedMetric} onValueChange={(value: any) => setSelectedMetric(value)}>
                <SelectTrigger className="w-[120px]">
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
        </CardContent>
      </Card>

      {/* Time Comparison */}
      {comparisonType === 'time' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              So sánh theo thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    data={comparisonData.timeComparison.current}
                    stroke="#0088FE"
                    strokeWidth={2}
                    name="Kỳ hiện tại"
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    data={comparisonData.timeComparison.previous}
                    stroke="#00C49F"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Kỳ trước"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {['reach', 'engagement', 'impressions'].map((metric) => {
                const currentTotal = comparisonData.timeComparison.current.reduce((sum, item) => sum + item[metric as keyof typeof item], 0)
                const previousTotal = comparisonData.timeComparison.previous.reduce((sum, item) => sum + item[metric as keyof typeof item], 0)
                const change = calculateChange(currentTotal, previousTotal)
                
                return (
                  <div key={metric} className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{formatNumber(currentTotal)}</div>
                    <div className="text-sm text-muted-foreground capitalize">{metric}</div>
                    <div className={`text-sm flex items-center justify-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(change).toFixed(1)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post Comparison */}
      {comparisonType === 'posts' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              So sánh bài viết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData.postComparison.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="content" 
                    tickFormatter={(value) => value.substring(0, 20) + '...'}
                  />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip 
                    formatter={(value: number) => formatNumber(value)}
                    labelFormatter={(label) => `Bài viết: ${label.substring(0, 50)}...`}
                  />
                  <Bar dataKey={`metrics.${selectedMetric}`} fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Performing Posts */}
            <div className="space-y-3">
              <h4 className="font-medium">Top bài viết hiệu suất cao</h4>
              {comparisonData.postComparison.slice(0, 5).map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-sm">{post.content.substring(0, 100)}...</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.metrics.reach)}</div>
                      <div className="text-xs text-muted-foreground">Tiếp cận</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{formatNumber(post.metrics.engagement)}</div>
                      <div className="text-xs text-muted-foreground">Tương tác</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Page Comparison */}
      {comparisonType === 'pages' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              So sánh fanpage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Pie Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={comparisonData.pageComparison.map((page, index) => ({
                        name: page.name,
                        value: page.metrics[selectedMetric],
                        color: COLORS[index % COLORS.length]
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {comparisonData.pageComparison.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Page List */}
              <div className="space-y-3">
                <h4 className="font-medium">Chi tiết fanpage</h4>
                {comparisonData.pageComparison.map((page, index) => (
                  <div key={page.pageId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={page.picture || '/avatars/01.png'}
                        alt={page.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatNumber(page.metrics.followers)} followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatNumber(page.metrics[selectedMetric])}</div>
                      <div className="text-xs text-muted-foreground capitalize">{selectedMetric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights & Recommendations */}
      {comparisonData.insights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Nhận xét và đề xuất
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Chỉ số hiệu suất tốt nhất</h4>
              <Badge variant="secondary">{comparisonData.insights.bestPerformingMetric}</Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Khu vực cần cải thiện</h4>
              <div className="flex flex-wrap gap-2">
                {comparisonData.insights.improvementAreas.map((area, index) => (
                  <Badge key={index} variant="outline">{area}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Đề xuất</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {comparisonData.insights.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
