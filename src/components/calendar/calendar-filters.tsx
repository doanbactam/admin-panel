'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Filter, X, Calendar, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Page {
  id: string
  pageId: string
  name: string
  picture?: string
  category?: string
}

interface CalendarFiltersProps {
  selectedPageId?: string
  selectedStatus?: string
  onPageChange: (pageId?: string) => void
  onStatusChange: (status?: string) => void
  onClearFilters: () => void
  className?: string
}

const CalendarFilters = ({
  selectedPageId,
  selectedStatus,
  onPageChange,
  onStatusChange,
  onClearFilters,
  className
}: CalendarFiltersProps) => {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user's pages
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/facebook/pages')
        if (response.ok) {
          const data = await response.json()
          setPages(data.pages || [])
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [])

  const statusOptions = [
    { value: 'SCHEDULED', label: 'Đã lên lịch', color: '#3b82f6' },
    { value: 'PUBLISHED', label: 'Đã đăng', color: '#10b981' },
    { value: 'FAILED', label: 'Thất bại', color: '#ef4444' },
  ]

  const hasActiveFilters = selectedPageId || selectedStatus
  const selectedPage = pages.find(p => p.pageId === selectedPageId)
  const selectedStatusOption = statusOptions.find(s => s.value === selectedStatus)

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Page Filter */}
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-500" />
        <Select value={selectedPageId || 'all'} onValueChange={(value) => onPageChange(value === 'all' ? undefined : value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tất cả fanpages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả fanpages</SelectItem>
            {pages.map((page) => (
              <SelectItem key={page.pageId} value={page.pageId}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={page.picture || ''} alt={page.name} />
                    <AvatarFallback className="text-xs">
                      {page.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-32">{page.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Select value={selectedStatus || 'all'} onValueChange={(value) => onStatusChange(value === 'all' ? undefined : value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  {status.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          {selectedPage && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src={selectedPage.picture || ''} alt={selectedPage.name} />
                <AvatarFallback className="text-xs">
                  {selectedPage.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-20 truncate">{selectedPage.name}</span>
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onPageChange(undefined)}
              />
            </Badge>
          )}

          {selectedStatusOption && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedStatusOption.color }}
              />
              {selectedStatusOption.label}
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-500"
                onClick={() => onStatusChange(undefined)}
              />
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-sm text-gray-500">
          Đang tải fanpages...
        </div>
      )}
    </div>
  )
}

export default CalendarFilters
