import { Metadata } from 'next'
import CalendarView from '@/components/calendar/calendar-view'

export const metadata: Metadata = {
  title: 'Lịch đăng bài | Facebook Admin Panel',
  description: 'Quản lý và theo dõi lịch đăng bài trên Facebook',
}

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <CalendarView />
    </div>
  )
}
