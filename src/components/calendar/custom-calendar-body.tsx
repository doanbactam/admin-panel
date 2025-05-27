'use client'

import React, { useContext } from 'react'
import { getDaysInMonth, getDay, isSameDay, isToday } from 'date-fns'
import { cn } from '@/lib/utils'
import CalendarDay from './calendar-day'
import PostEvent from './post-event'

// Import calendar context from Kibo UI
const CalendarContext = React.createContext<{
  locale: Intl.LocalesArgument
  startDay: number
}>({
  locale: 'en-US',
  startDay: 0,
})

interface CalendarEvent {
  id: string
  name: string
  startAt: Date
  endAt: Date
  status: {
    id: string
    name: string
    color: string
  }
  post: any
}

interface CustomCalendarBodyProps {
  month: number
  year: number
  events: CalendarEvent[]
  selectedDate: Date | null
  onDayClick: (date: Date) => void
  onCreatePost: (date: Date) => void
  className?: string
}

const CustomCalendarBody = ({
  month,
  year,
  events,
  selectedDate,
  onDayClick,
  onCreatePost,
  className
}: CustomCalendarBodyProps) => {
  const { startDay } = useContext(CalendarContext)

  const daysInMonth = getDaysInMonth(new Date(year, month, 1))
  const firstDay = (getDay(new Date(year, month, 1)) - startDay + 7) % 7

  // Previous month days
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const prevMonthDays = getDaysInMonth(new Date(prevYear, prevMonth, 1))

  // Next month
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  const days = []

  // Previous month days
  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + i + 1
    const date = new Date(prevYear, prevMonth, day)
    const dayEvents = events.filter(event =>
      isSameDay(new Date(event.endAt), date)
    )

    days.push(
      <CalendarDay
        key={`prev-${i}`}
        day={day}
        month={prevMonth}
        year={prevYear}
        events={dayEvents}
        isCurrentMonth={false}
        isToday={isToday(date)}
        isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
        onDayClick={onDayClick}
        onCreatePost={onCreatePost}
      >
        <div>
          {dayEvents.slice(0, 3).map((event) => (
            <PostEvent
              key={event.id}
              event={event}
              className="mb-1"
            />
          ))}
        </div>
      </CalendarDay>
    )
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dayEvents = events.filter(event =>
      isSameDay(new Date(event.endAt), date)
    )

    days.push(
      <CalendarDay
        key={day}
        day={day}
        month={month}
        year={year}
        events={dayEvents}
        isCurrentMonth={true}
        isToday={isToday(date)}
        isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
        onDayClick={onDayClick}
        onCreatePost={onCreatePost}
      >
        <div>
          {dayEvents.slice(0, 3).map((event) => (
            <PostEvent
              key={event.id}
              event={event}
              className="mb-1"
            />
          ))}
        </div>
      </CalendarDay>
    )
  }

  // Next month days to fill the grid
  const remainingDays = 7 - ((firstDay + daysInMonth) % 7)
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      const day = i + 1
      const date = new Date(nextYear, nextMonth, day)
      const dayEvents = events.filter(event =>
        isSameDay(new Date(event.endAt), date)
      )

      days.push(
        <CalendarDay
          key={`next-${i}`}
          day={day}
          month={nextMonth}
          year={nextYear}
          events={dayEvents}
          isCurrentMonth={false}
          isToday={isToday(date)}
          isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
          onDayClick={onDayClick}
          onCreatePost={onCreatePost}
        >
          <div>
            {dayEvents.slice(0, 3).map((event) => (
              <PostEvent
                key={event.id}
                event={event}
                className="mb-1"
              />
            ))}
          </div>
        </CalendarDay>
      )
    }
  }

  return (
    <div className={cn('grid flex-grow grid-cols-7', className)}>
      {days}
    </div>
  )
}

export default CustomCalendarBody
