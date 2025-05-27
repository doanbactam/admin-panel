'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertTriangle,
  Trash2,
  Loader2,
  Info,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface Post {
  id: string
  title?: string
  content: string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
  scheduledAt?: string
  publishedAt?: string
  postPages: {
    id: string
    pageId: string
    status: string
    page: {
      name: string
    }
  }[]
}

interface DeleteConfirmationProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  isDeleting?: boolean
}

export const DeleteConfirmation = ({
  post,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false
}: DeleteConfirmationProps) => {
  const [confirmText, setConfirmText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  if (!post) return null

  const postTitle = post.title || post.content.substring(0, 50) + (post.content.length > 50 ? '...' : '')
  const expectedConfirmText = 'XÓA'
  const canConfirm = confirmText.toUpperCase() === expectedConfirmText

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Clock className="h-4 w-4 text-gray-500" />
      case 'SCHEDULED':
        return <Clock className="h-4 w-4 text-orange-500" />
      case 'PUBLISHED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Bản nháp'
      case 'SCHEDULED':
        return 'Đã lên lịch'
      case 'PUBLISHED':
        return 'Đã đăng'
      case 'FAILED':
        return 'Thất bại'
      default:
        return status
    }
  }

  const getDeleteWarning = () => {
    const publishedPages = post.postPages.filter(pp => pp.status === 'PUBLISHED' && pp.fbPostId)

    switch (post.status) {
      case 'PUBLISHED':
        return {
          type: 'destructive' as const,
          title: 'Cảnh báo: Bài viết đã được đăng',
          message: publishedPages.length > 0
            ? `Bài viết này đã được đăng lên ${publishedPages.length} fanpage Facebook. Việc xóa sẽ XÓA BÀI VIẾT TRÊN FACEBOOK và xóa khỏi hệ thống quản lý.`
            : 'Bài viết này đã được đăng lên Facebook. Việc xóa sẽ xóa bài viết khỏi hệ thống quản lý.'
        }
      case 'SCHEDULED':
        return {
          type: 'warning' as const,
          title: 'Cảnh báo: Bài viết đã lên lịch',
          message: 'Bài viết này đã được lên lịch đăng. Việc xóa sẽ hủy lịch đăng và xóa bài viết khỏi hệ thống.'
        }
      default:
        return null
    }
  }

  const warning = getDeleteWarning()

  const handleConfirm = async () => {
    if (!canConfirm) return

    try {
      await onConfirm()
      setConfirmText('')
      onClose()
    } catch (error) {
      // Error handled by parent
    }
  }

  const handleClose = () => {
    setConfirmText('')
    setShowAdvanced(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Xác nhận xóa bài viết
          </DialogTitle>
          <DialogDescription>
            Hành động này không thể hoàn tác. Bài viết sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Post Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              {getStatusIcon(post.status)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                  {postTitle}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getStatusText(post.status)}
                  </span>
                  {post.postPages.length > 0 && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.postPages.length} fanpage
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Warning Alert */}
          {warning && (
            <Alert variant={warning.type}>
              <AlertTriangle className="h-4 w-4" />
              <div>
                <div className="font-medium">{warning.title}</div>
                <AlertDescription className="mt-1">
                  {warning.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Advanced Info */}
          {showAdvanced && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Chi tiết bài viết:
              </div>

              {post.scheduledAt && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Lịch đăng:</strong> {new Date(post.scheduledAt).toLocaleString('vi-VN')}
                </div>
              )}

              {post.publishedAt && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Đã đăng lúc:</strong> {new Date(post.publishedAt).toLocaleString('vi-VN')}
                </div>
              )}

              {post.postPages.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Fanpages:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    {post.postPages.map((pp) => (
                      <li key={pp.id}>{pp.page.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-text" className="text-sm font-medium">
              Để xác nhận, vui lòng nhập "<strong>{expectedConfirmText}</strong>":
            </Label>
            <Input
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Nhập "${expectedConfirmText}" để xác nhận`}
              className="font-mono"
              disabled={isDeleting}
            />
          </div>

          {/* Toggle Advanced */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto"
          >
            {showAdvanced ? 'Ẩn chi tiết' : 'Xem chi tiết'}
          </Button>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!canConfirm || isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa bài viết
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
