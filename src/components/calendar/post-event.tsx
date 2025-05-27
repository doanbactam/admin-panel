'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Users, Edit, Eye, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Link from 'next/link'

interface PostEventData {
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

interface PostEventProps {
  event: {
    id: string
    name: string
    startAt: Date
    endAt: Date
    status: {
      id: string
      name: string
      color: string
    }
    post: PostEventData
  }
  className?: string
}

const PostEvent = ({ event, className }: PostEventProps) => {
  const { post } = event
  const scheduledTime = format(new Date(post.scheduledAt), 'HH:mm', { locale: vi })
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`
            w-full text-left p-1 rounded text-xs cursor-pointer
            hover:opacity-80 transition-opacity
            ${className}
          `}
          style={{ backgroundColor: event.status.color }}
        >
          <div className="text-white font-medium truncate">
            {scheduledTime} - {event.name}
          </div>
          <div className="text-white/80 text-xs truncate">
            {post.pages.length} trang
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Chi tiết bài viết
          </DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về bài viết đã lên lịch
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status & Time */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              style={{ 
                borderColor: event.status.color,
                color: event.status.color 
              }}
            >
              {event.status.name}
            </Badge>
            <div className="text-sm text-gray-500">
              {format(new Date(post.scheduledAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </div>
          </div>

          {/* Post Type */}
          {post.postType && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Loại bài viết:</span>
              <Badge variant="secondary">
                {post.postType === 'post' ? 'Bài viết' : 
                 post.postType === 'reel' ? 'Reel' : 
                 post.postType === 'story' ? 'Story' : post.postType}
              </Badge>
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            {post.title && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </h4>
              </div>
            )}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="font-medium">Fanpages ({post.pages.length})</span>
            </div>
            <div className="space-y-2">
              {post.pages.map((page) => (
                <div 
                  key={page.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={page.picture || ''} alt={page.name} />
                      <AvatarFallback>
                        {page.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{page.name}</div>
                      <div className="text-xs text-gray-500">
                        {page.status === 'PUBLISHED' ? 'Đã đăng' :
                         page.status === 'SCHEDULED' ? 'Đã lên lịch' :
                         page.status === 'FAILED' ? 'Thất bại' : page.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {page.status === 'FAILED' && page.errorMsg && (
                      <AlertCircle className="h-4 w-4 text-red-500" title={page.errorMsg} />
                    )}
                    {page.fbPostId && (
                      <Badge variant="outline" className="text-xs">
                        FB: {page.fbPostId.slice(-6)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button asChild variant="outline" size="sm">
              <Link href={`/posts/${post.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Link>
            </Button>
            
            {post.status === 'SCHEDULED' && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/posts/${post.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEvent
