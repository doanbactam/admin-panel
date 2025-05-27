'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Filter,
  Calendar,
  Users,
  BarChart3,
  X,
  Plus,
  Settings
} from 'lucide-react'

interface FilterConfig {
  dateRange: {
    from: string
    to: string
  }
  metrics: {
    minReach: number | null
    maxReach: number | null
    minEngagement: number | null
    maxEngagement: number | null
    minImpressions: number | null
    maxImpressions: number | null
  }
  postTypes: string[]
  pages: string[]
  contentKeywords: string[]
  engagementRate: {
    min: number | null
    max: number | null
  }
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterConfig) => void
  availablePages: { pageId: string; name: string }[]
}

export function AdvancedFilters({ onFiltersChange, availablePages }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: '',
      to: ''
    },
    metrics: {
      minReach: null,
      maxReach: null,
      minEngagement: null,
      maxEngagement: null,
      minImpressions: null,
      maxImpressions: null
    },
    postTypes: [],
    pages: [],
    contentKeywords: [],
    engagementRate: {
      min: null,
      max: null
    }
  })

  const [newKeyword, setNewKeyword] = useState('')

  const handleMetricChange = (metric: keyof FilterConfig['metrics'], value: string) => {
    const numValue = value === '' ? null : parseInt(value)
    setFilters(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: numValue
      }
    }))
  }

  const handlePostTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      postTypes: checked 
        ? [...prev.postTypes, type]
        : prev.postTypes.filter(t => t !== type)
    }))
  }

  const handlePageChange = (pageId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      pages: checked 
        ? [...prev.pages, pageId]
        : prev.pages.filter(p => p !== pageId)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !filters.contentKeywords.includes(newKeyword.trim())) {
      setFilters(prev => ({
        ...prev,
        contentKeywords: [...prev.contentKeywords, newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      contentKeywords: prev.contentKeywords.filter(k => k !== keyword)
    }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const emptyFilters: FilterConfig = {
      dateRange: { from: '', to: '' },
      metrics: {
        minReach: null,
        maxReach: null,
        minEngagement: null,
        maxEngagement: null,
        minImpressions: null,
        maxImpressions: null
      },
      postTypes: [],
      pages: [],
      contentKeywords: [],
      engagementRate: { min: null, max: null }
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (Object.values(filters.metrics).some(v => v !== null)) count++
    if (filters.postTypes.length > 0) count++
    if (filters.pages.length > 0) count++
    if (filters.contentKeywords.length > 0) count++
    if (filters.engagementRate.min !== null || filters.engagementRate.max !== null) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Settings className="mr-2 h-4 w-4" />
          Bộ lọc nâng cao
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc nâng cao
              </span>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {/* Date Range */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Khoảng thời gian
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="from-date" className="text-xs">Từ ngày</Label>
                  <Input
                    id="from-date"
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, from: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="to-date" className="text-xs">Đến ngày</Label>
                  <Input
                    id="to-date"
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, to: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Metrics Range */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Khoảng chỉ số
              </Label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Tiếp cận tối thiểu</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.metrics.minReach || ''}
                      onChange={(e) => handleMetricChange('minReach', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Tiếp cận tối đa</Label>
                    <Input
                      type="number"
                      placeholder="∞"
                      value={filters.metrics.maxReach || ''}
                      onChange={(e) => handleMetricChange('maxReach', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Tương tác tối thiểu</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.metrics.minEngagement || ''}
                      onChange={(e) => handleMetricChange('minEngagement', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Tương tác tối đa</Label>
                    <Input
                      type="number"
                      placeholder="∞"
                      value={filters.metrics.maxEngagement || ''}
                      onChange={(e) => handleMetricChange('maxEngagement', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Post Types */}
            <div className="space-y-2">
              <Label>Loại bài viết</Label>
              <div className="space-y-2">
                {['Post', 'Reel', 'Story'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.postTypes.includes(type)}
                      onCheckedChange={(checked) => handlePostTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Fanpage
              </Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availablePages.map((page) => (
                  <div key={page.pageId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`page-${page.pageId}`}
                      checked={filters.pages.includes(page.pageId)}
                      onCheckedChange={(checked) => handlePageChange(page.pageId, checked as boolean)}
                    />
                    <Label htmlFor={`page-${page.pageId}`} className="text-sm">{page.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Keywords */}
            <div className="space-y-2">
              <Label>Từ khóa nội dung</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập từ khóa..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button size="sm" onClick={addKeyword}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {filters.contentKeywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.contentKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-xs">
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Engagement Rate */}
            <div className="space-y-2">
              <Label>Tỷ lệ tương tác (%)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Tối thiểu</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0"
                    value={filters.engagementRate.min || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      engagementRate: {
                        ...prev.engagementRate,
                        min: e.target.value === '' ? null : parseFloat(e.target.value)
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Tối đa</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="100"
                    value={filters.engagementRate.max || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      engagementRate: {
                        ...prev.engagementRate,
                        max: e.target.value === '' ? null : parseFloat(e.target.value)
                      }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={clearFilters}>
                Xóa tất cả
              </Button>
              <Button onClick={applyFilters}>
                Áp dụng bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
