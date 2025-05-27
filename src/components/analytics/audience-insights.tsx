'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import {
  Users,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'

interface AudienceData {
  demographics: {
    gender: { male: number; female: number; unknown: number }
    ageGroups: { range: string; count: number; percentage: number }[]
    countries: { name: string; count: number; percentage: number }[]
    cities: { name: string; count: number; percentage: number }[]
  }
  behavior: {
    activeHours: { hour: number; engagement: number }[]
    activeDays: { day: string; engagement: number }[]
    deviceTypes: { type: string; count: number; percentage: number }[]
  }
  growth: {
    newFollowers: number
    unfollowers: number
    netGrowth: number
    growthRate: number
  }
}

interface AudienceInsightsProps {
  period: 'day' | 'week' | 'days_28'
  pageId?: string
}

export function AudienceInsights({ period, pageId }: AudienceInsightsProps) {
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchAudienceData = async () => {
    try {
      setIsLoading(true)
      
      const params = new URLSearchParams({
        period,
        ...(pageId && pageId !== 'all' && { page: pageId })
      })
      
      const response = await fetch(`/api/analytics/audience?${params}`)
      if (response.ok) {
        const data = await response.json()
        setAudienceData(data)
      }
    } catch (error) {
      console.error('Error fetching audience data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAudienceData()
  }, [period, pageId])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const genderData = audienceData ? [
    { name: 'Nam', value: audienceData.demographics.gender.male, color: '#0088FE' },
    { name: 'Nữ', value: audienceData.demographics.gender.female, color: '#00C49F' },
    { name: 'Khác', value: audienceData.demographics.gender.unknown, color: '#FFBB28' }
  ] : []

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!audienceData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Không có dữ liệu đối tượng</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Audience Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tăng trưởng đối tượng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                +{audienceData.growth.newFollowers.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Người theo dõi mới</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                -{audienceData.growth.unfollowers.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Bỏ theo dõi</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {audienceData.growth.netGrowth >= 0 ? '+' : ''}{audienceData.growth.netGrowth.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Tăng trưởng ròng</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {audienceData.growth.growthRate.toFixed(2)}%
              </div>
              <p className="text-sm text-muted-foreground">Tỷ lệ tăng trưởng</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Phân bố giới tính
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Age Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Nhóm tuổi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={audienceData.demographics.ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Quốc gia hàng đầu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceData.demographics.countries.slice(0, 5).map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={country.percentage} className="w-20" />
                    <span className="text-sm text-muted-foreground w-12">
                      {country.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Thành phố hàng đầu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceData.demographics.cities.slice(0, 5).map((city, index) => (
                <div key={city.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="font-medium">{city.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={city.percentage} className="w-20" />
                    <span className="text-sm text-muted-foreground w-12">
                      {city.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Behavior Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Giờ hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={audienceData.behavior.activeHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Thiết bị sử dụng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceData.behavior.deviceTypes.map((device, index) => (
                <div key={device.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {device.type === 'mobile' ? (
                      <Smartphone className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                    <span className="font-medium capitalize">{device.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={device.percentage} className="w-20" />
                    <span className="text-sm text-muted-foreground w-12">
                      {device.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
