import { Metadata } from 'next'
import QueueDashboard from '@/components/admin/queue-dashboard'

export const metadata: Metadata = {
  title: 'Queue Management | Facebook Admin Panel',
  description: 'Quản lý queue và scheduled posts',
}

export default function QueueManagementPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <QueueDashboard />
    </div>
  )
}
