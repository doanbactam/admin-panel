'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  RefreshCw,
  Play,
  Pause,
  Trash2,
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface QueueStats {
  waiting: number
  active: number
  completed: number
  failed: number
  total: number
}

interface Job {
  id: string
  name: string
  data: any
  delay?: number
  timestamp: number
  processedOn?: number
  finishedOn?: number
  failedReason?: string
  returnvalue?: any
}

interface QueueData {
  stats: QueueStats
  jobs: {
    waiting: Job[]
    active: Job[]
    completed: Job[]
    failed: Job[]
  }
}

const QueueDashboard = () => {
  const [queueData, setQueueData] = useState<QueueData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchQueueData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch('/api/admin/queue')
      if (response.ok) {
        const data = await response.json()
        setQueueData(data)
      }
    } catch (error) {
      console.error('Error fetching queue data:', error)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }

  const performAction = async (action: string, jobId?: string) => {
    try {
      const response = await fetch('/api/admin/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, jobId })
      })

      if (response.ok) {
        await fetchQueueData() // Refresh data
      }
    } catch (error) {
      console.error('Error performing action:', error)
    }
  }

  const processOverduePosts = async () => {
    try {
      setIsRefreshing(true)

      // Trigger via queue management API
      const response = await fetch('/api/admin/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'check-overdue' })
      })

      if (response.ok) {
        // Wait a moment then refresh
        setTimeout(async () => {
          await fetchQueueData()
        }, 2000)
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchQueueData()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchQueueData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!queueData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không thể tải dữ liệu queue</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Queue Management</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchQueueData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => performAction('initialize')}
          >
            <Play className="h-4 w-4 mr-2" />
            Initialize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => performAction('clean-queue')}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clean
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => processOverduePosts()}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Process Overdue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {queueData.stats.waiting}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {queueData.stats.active}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {queueData.stats.completed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {queueData.stats.failed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiting Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Waiting Jobs ({queueData.jobs.waiting.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queueData.jobs.waiting.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <div className="flex-1">
                    <div className="font-medium">Post: {job.data.postId}</div>
                    <div className="text-sm text-gray-500">
                      Scheduled: {format(new Date(job.data.scheduledAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => performAction('remove-job', job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {queueData.jobs.waiting.length === 0 && (
                <p className="text-gray-500 text-center py-4">No waiting jobs</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Failed Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Failed Jobs ({queueData.jobs.failed.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queueData.jobs.failed.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex-1">
                    <div className="font-medium">Post: {job.data.postId}</div>
                    <div className="text-sm text-red-600">
                      {job.failedReason}
                    </div>
                    <div className="text-xs text-gray-500">
                      Failed: {job.finishedOn ? format(new Date(job.finishedOn), 'dd/MM/yyyy HH:mm', { locale: vi }) : 'Unknown'}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => performAction('retry-job', job.id)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => performAction('remove-job', job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {queueData.jobs.failed.length === 0 && (
                <p className="text-gray-500 text-center py-4">No failed jobs</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs */}
      {queueData.jobs.active.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
              Active Jobs ({queueData.jobs.active.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {queueData.jobs.active.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div className="flex-1">
                    <div className="font-medium">Post: {job.data.postId}</div>
                    <div className="text-sm text-blue-600">
                      Processing since: {job.processedOn ? format(new Date(job.processedOn), 'HH:mm:ss', { locale: vi }) : 'Unknown'}
                    </div>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QueueDashboard
