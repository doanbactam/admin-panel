'use client'

import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface CalendarDayProps {
  day: number
  month: number
  year: number
  events: any[]
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  onDayClick: (date: Date) => void
  onCreatePost: (date: Date) => void
  children: React.ReactNode
}

const CalendarDay = ({
  day,
  month,
  year,
  events,
  isCurrentMonth,
  isToday,
  isSelected,
  onDayClick,
  onCreatePost,
  children
}: CalendarDayProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const date = new Date(year, month, day)
  
  const handleClick = () => {
    onDayClick(date)
  }
  
  const handleCreateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCreatePost(date)
  }

  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden border-t border-r cursor-pointer transition-colors',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        isSelected && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        isToday && 'bg-yellow-50 dark:bg-yellow-900/20',
        !isCurrentMonth && 'opacity-50'
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex h-full w-full flex-col gap-1 p-1 text-muted-foreground text-xs">
        {/* Day number */}
        <div className="flex items-center justify-between">
          <span className={cn(
            'text-xs',
            isToday && 'font-bold text-blue-600 dark:text-blue-400',
            isSelected && 'font-semibold text-blue-700 dark:text-blue-300'
          )}>
            {day}
          </span>
          
          {/* Add button - show on hover or when selected */}
          {(isHovered || isSelected) && isCurrentMonth && (
            <button
              onClick={handleCreateClick}
              className={cn(
                'flex items-center justify-center w-4 h-4 rounded-full',
                'bg-blue-500 hover:bg-blue-600 text-white',
                'transition-colors opacity-80 hover:opacity-100'
              )}
              title={`Tạo bài viết cho ngày ${day}`}
            >
              <Plus className="h-2.5 w-2.5" />
            </button>
          )}
        </div>
        
        {/* Events */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        
        {/* Event count indicator */}
        {events.length > 3 && (
          <span className="block text-muted-foreground text-xs">
            +{events.length - 3} more
          </span>
        )}
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
      )}
      
      {/* Today indicator */}
      {isToday && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" />
      )}
    </div>
  )
}

export default CalendarDay
