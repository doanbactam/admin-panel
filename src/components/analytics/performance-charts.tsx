'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface ChartData {
  date: string
  reach: number
  impressions: number
  engagement: number
  clicks: number
  posts: number
}

interface PerformanceChartsProps {
  period: 'day' | 'week' | 'days_28'
  pageId?: string
}

export function PerformanceCharts({ period, pageId }: PerformanceChartsProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchChartData = async () => {
    try {
      setIsLoading(true)

      const params = new URLSearchParams({
        period,
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      const response = await fetch(`/api/analytics/charts?${params}`)
      if (response.ok) {
        const data = await response.json()
        setChartData(data.chartData || [])
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChartData()
  }, [period, pageId])

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }
    return value.toString()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (period === 'day') {
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    }
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Biểu đồ hiệu suất</CardTitle>
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

  return (
    <div className="space-y-4">
      {/* Reach & Impressions Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tiếp cận & Hiển thị
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                fontSize={12}
              />
              <YAxis
                tickFormatter={formatNumber}
                fontSize={12}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatNumber(value),
                  name === 'reach' ? 'Tiếp cận' : 'Hiển thị'
                ]}
                labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
              />
              <Legend
                formatter={(value) => value === 'reach' ? 'Tiếp cận' : 'Hiển thị'}
              />
              <Area
                type="monotone"
                dataKey="reach"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="impressions"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement & Clicks Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tương tác & Clicks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                fontSize={12}
              />
              <YAxis
                tickFormatter={formatNumber}
                fontSize={12}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatNumber(value),
                  name === 'engagement' ? 'Tương tác' : 'Clicks'
                ]}
                labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
              />
              <Legend
                formatter={(value) => value === 'engagement' ? 'Tương tác' : 'Clicks'}
              />
              <Bar dataKey="engagement" fill="#ef4444" />
              <Bar dataKey="clicks" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Posts Published Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Số bài viết đăng</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                fontSize={12}
              />
              <YAxis fontSize={12} />
              <Tooltip
                formatter={(value: number) => [value, 'Bài viết']}
                labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
              />
              <Line
                type="monotone"
                dataKey="posts"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
