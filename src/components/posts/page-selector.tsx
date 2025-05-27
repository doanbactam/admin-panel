'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Facebook,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react'

interface FacebookPage {
  id: string
  pageId: string
  name: string
  category: string
  about?: string
  picture?: string
  isActive: boolean
  socialAccount: {
    id: string
    accountName: string
    platform: string
  }
}

interface PageSelectorProps {
  selectedPageIds: string[]
  onChange: (pageIds: string[]) => void
  className?: string
}

export const PageSelector = ({ selectedPageIds, onChange, className }: PageSelectorProps) => {
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchPages = async (refresh = false) => {
    try {
      setIsLoading(!refresh)
      setIsRefreshing(refresh)
      setError(null)

      const response = await fetch(`/api/facebook/pages${refresh ? '?refresh=true' : ''}`)
      const data = await response.json()

      if (response.ok) {
        setPages(data.pages || [])
      } else {
        setError(data.error || 'Không thể tải danh sách fanpage')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handlePageToggle = (pageId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedPageIds, pageId])
    } else {
      onChange(selectedPageIds.filter(id => id !== pageId))
    }
  }

  const handleSelectAll = () => {
    const activePageIds = pages.filter(p => p.isActive).map(p => p.id)
    onChange(activePageIds)
  }

  const handleDeselectAll = () => {
    onChange([])
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2 text-sm text-gray-500">Đang tải...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={className}>
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchPages()}
        >
          Thử lại
        </Button>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-4">
          <Facebook className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-3">
            Chưa có fanpage nào được kết nối
          </p>
          <Button variant="outline" size="sm" onClick={() => window.open('/pages/connect', '_blank')}>
            Kết nối Facebook
          </Button>
        </div>
      </div>
    )
  }

  const activePages = pages.filter(p => p.isActive)
  const selectedCount = selectedPageIds.length

  return (
    <div className={className}>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Modern Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedCount} / {activePages.length} fanpage được chọn
            </span>
            {selectedCount > 0 && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPages(true)}
              disabled={isRefreshing}
              className="h-8 px-3 text-xs hover:bg-white dark:hover:bg-gray-700"
            >
              {isRefreshing ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
              Làm mới
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={selectedCount === activePages.length ? handleDeselectAll : handleSelectAll}
              className="h-8 px-3 text-xs hover:bg-white dark:hover:bg-gray-700"
            >
              {selectedCount === activePages.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </Button>
          </div>
        </div>

        {/* Enhanced Avatar Grid */}
        <div className="flex flex-wrap gap-3">
          {activePages.map((page) => {
            const isSelected = selectedPageIds.includes(page.id)
            return (
              <div
                key={page.id}
                className="relative group"
              >
                <button
                  onClick={() => handlePageToggle(page.id, !isSelected)}
                  className={`
                    relative w-16 h-16 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                    ${isSelected
                      ? 'border-blue-500 ring-4 ring-blue-500/20 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                    }
                  `}
                  title={page.name}
                >
                  {page.picture ? (
                    <img
                      src={page.picture}
                      alt={page.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 flex items-center justify-center">
                      <Facebook className="h-6 w-6 text-blue-600" />
                    </div>
                  )}

                  {/* Enhanced Selection Indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>

                {/* Enhanced Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                  <div className="font-medium">{page.name}</div>
                  <div className="text-gray-300 text-xs">{page.category}</div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
