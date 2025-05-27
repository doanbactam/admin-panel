'use client'

import { useState, useEffect } from 'react'
import {
  CalendarProvider,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarYearPicker,
  CalendarDate,
  CalendarDatePagination,
  useCalendarMonth,
  useCalendarYear,
  type Feature
} from '@/components/ui/kibo-ui/calendar'
import PostEvent from './post-event'
import CalendarFilters from './calendar-filters'
import CustomCalendarBody from './custom-calendar-body'
import CalendarDaysHeader from './calendar-days-header'
import OverduePostsAlert from './overdue-posts-alert'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw, Calendar as CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface CalendarEvent extends Feature {
  post: {
    id: string
    title?: string
    content: string
    postType?: string
    status: string
    scheduledAt: string
    publishedAt?: string
    pages: {
      id: string
      pageId: string
      name: string
      picture?: string
      status: string
      fbPostId?: string
      errorMsg?: string
    }[]
  }
}

interface CalendarViewProps {
  className?: string
}

const CalendarContent = ({ className }: CalendarViewProps) => {
  const [month] = useCalendarMonth()
  const [year] = useCalendarYear()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPageId, setSelectedPageId] = useState<string>()
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()

  // Fetch calendar events
  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        month: `${year}-${String(month + 1).padStart(2, '0')}`
      })

      if (selectedPageId) {
        params.append('pageId', selectedPageId)
      }

      const response = await fetch(`/api/posts/calendar?${params}`)
      if (response.ok) {
        const data = await response.json()
        let filteredEvents = data.events || []



        // Apply status filter on client side
        if (selectedStatus) {
          filteredEvents = filteredEvents.filter((event: CalendarEvent) =>
            event.post.status === selectedStatus
          )
        }

        setEvents(filteredEvents)
      } else {
        console.error('Failed to fetch calendar events')
        setEvents([])
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      setEvents([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch events when month, year, or filters change
  useEffect(() => {
    fetchEvents()
  }, [month, year, selectedPageId, selectedStatus])

  const handleClearFilters = () => {
    setSelectedPageId(undefined)
    setSelectedStatus(undefined)
  }

  // Handle creating new post with selected date
  const handleCreatePost = (date?: Date) => {
    const targetDate = date || selectedDate || new Date()

    // Set default time to 10:00 AM if no time specified
    const scheduledDate = new Date(targetDate)
    if (scheduledDate.getHours() === 0 && scheduledDate.getMinutes() === 0) {
      scheduledDate.setHours(10, 0, 0, 0)
    }

    // Navigate to create post page with pre-filled scheduled time
    const scheduledTime = scheduledDate.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm format
    router.push(`/posts/new?scheduledAt=${encodeURIComponent(scheduledTime)}`)
  }

  // Handle day click on calendar
  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    // Optionally auto-create post when clicking on a day
    // handleCreatePost(date)
  }

  const currentMonthName = format(new Date(year, month), 'MMMM yyyy', { locale: vi })

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Lịch đăng bài
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý và theo dõi bài viết đã lên lịch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchEvents}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>

          {selectedDate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCreatePost(selectedDate)}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Tạo bài cho {format(selectedDate, 'dd/MM', { locale: vi })}
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => handleCreatePost()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo bài viết
          </Button>
        </div>
      </div>

      {/* Overdue Posts Alert */}
      <OverduePostsAlert onPostsProcessed={fetchEvents} />

      {/* Filters */}
      <CalendarFilters
        selectedPageId={selectedPageId}
        selectedStatus={selectedStatus}
        onPageChange={setSelectedPageId}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
      />

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CalendarDate>
            <div className="flex items-center gap-3">
              <CalendarMonthPicker />
              <CalendarYearPicker start={2020} end={2030} />
              <CalendarDatePagination />
            </div>

            <div className="text-sm text-gray-500">
              {events.length} bài viết trong {currentMonthName}
            </div>
          </CalendarDate>
        </div>

        {/* Calendar Days Header */}
        <CalendarDaysHeader startDay={1} />

        {/* Calendar Body */}
        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Đang tải lịch...</p>
              </div>
            </div>
          ) : (
            <CustomCalendarBody
              month={month}
              year={year}
              events={events}
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
              onCreatePost={handleCreatePost}
            />
          )}
        </div>
      </div>

      {/* Stats */}
      {!isLoading && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {events.filter(e => e.post.status === 'SCHEDULED').length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Đã lên lịch
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {events.filter(e => e.post.status === 'PUBLISHED').length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Đã đăng
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {events.filter(e => e.post.status === 'FAILED').length}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">
              Thất bại
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Không có bài viết nào
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Chưa có bài viết nào được lên lịch trong tháng này
          </p>
          <Button asChild>
            <Link href="/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài viết đầu tiên
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

const CalendarView = ({ className }: CalendarViewProps) => {
  return (
    <CalendarProvider locale="vi-VN" startDay={1} className={className}>
      <CalendarContent className={className} />
    </CalendarProvider>
  )
}

export default CalendarView
