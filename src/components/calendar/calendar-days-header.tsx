'use client'

import { cn } from '@/lib/utils'

interface CalendarDaysHeaderProps {
  startDay?: number
  locale?: string
  className?: string
}

const CalendarDaysHeader = ({ 
  startDay = 1, // Monday = 1, Sunday = 0
  locale = 'vi-VN',
  className 
}: CalendarDaysHeaderProps) => {
  // Vietnamese day names
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] // Sunday to Saturday
  
  // Reorder based on start day
  const orderedDays = [
    ...dayNames.slice(startDay),
    ...dayNames.slice(0, startDay)
  ]

  return (
    <div className={cn(
      'grid grid-cols-7 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
      className
    )}>
      {orderedDays.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-center py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export default CalendarDaysHeader
