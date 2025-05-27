'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Facebook,
  Eye,
  Share2,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  Copy
} from 'lucide-react'

interface Post {
  id: string
  title?: string
  content: string
  mediaUrls: string[]
  mediaType?: string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
  scheduledAt?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  postPages: {
    id: string
    pageId: string
    status: string
    fbPostId?: string
    publishedAt?: string
    errorMsg?: string
    page: {
      id: string
      pageId: string
      name: string
      picture?: string
      category?: string
    }
  }[]
}

export default function ViewPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Fetch post data
  const fetchPost = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/posts/${postId}`)
      const data = await response.json()

      if (response.ok) {
        setPost(data.post)
      } else {
        setError(data.error || 'Không thể tải bài viết')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (postId) {
      fetchPost()
    }
  }, [postId])

  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`)
  }

  const handleDelete = async () => {
    if (!post) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/posts')
      } else {
        const data = await response.json()
        setError(data.error || 'Không thể xóa bài viết')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handlePublish = async () => {
    if (!post) return

    try {
      const response = await fetch(`/api/posts/${postId}/publish`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh post data
        fetchPost()
      } else {
        setError(data.error || 'Không thể đăng bài')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Edit className="h-4 w-4" />
      case 'SCHEDULED':
        return <Clock className="h-4 w-4" />
      case 'PUBLISHED':
        return <CheckCircle className="h-4 w-4" />
      case 'FAILED':
        return <XCircle className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'secondary'
      case 'SCHEDULED':
        return 'default'
      case 'PUBLISHED':
        return 'default'
      case 'FAILED':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Nháp'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải bài viết...</span>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {error || 'Không tìm thấy bài viết'}
          </h2>
          <p className="text-gray-600 mb-4">
            Bài viết có thể đã bị xóa hoặc bạn không có quyền truy cập.
          </p>
          <Button onClick={() => router.push('/posts')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {post.title || 'Bài viết không có tiêu đề'}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={getStatusColor(post.status) as any} className="text-xs">
                  {getStatusIcon(post.status)}
                  <span className="ml-1">{getStatusText(post.status)}</span>
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Tạo lúc {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>

            {post.status === 'DRAFT' && (
              <Button
                size="sm"
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Đăng ngay
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-950"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Main Content Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {post.title || 'Bài viết không có tiêu đề'}
                </CardTitle>
                <CardDescription className="mt-2">
                  Tạo lúc {formatDate(post.createdAt)}
                  {post.updatedAt !== post.createdAt && (
                    <span> • Cập nhật lúc {formatDate(post.updatedAt)}</span>
                  )}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(post.content)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Media */}
            {post.mediaUrls && post.mediaUrls.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Media đính kèm</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.mediaUrls.map((url, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule Info */}
        {post.scheduledAt && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Thông tin lịch đăng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Clock className="h-4 w-4" />
                <span>Đã lên lịch đăng vào {formatDate(post.scheduledAt)}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Publishing Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-500" />
              Trạng thái đăng bài ({post.postPages.length} fanpage)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {post.postPages.map((postPage) => (
                <div
                  key={postPage.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {postPage.page.picture ? (
                      <img
                        src={postPage.page.picture}
                        alt={postPage.page.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium">{postPage.page.name}</h4>
                      <p className="text-sm text-gray-500">{postPage.page.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(postPage.status) as any}>
                      {getStatusIcon(postPage.status)}
                      <span className="ml-1">{getStatusText(postPage.status)}</span>
                    </Badge>

                    {postPage.fbPostId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://www.facebook.com/${postPage.fbPostId}`, '_blank')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Xem trên FB
                      </Button>
                    )}

                    {postPage.status === 'PUBLISHED' && postPage.fbPostId && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        ✓ Đã đồng bộ Facebook
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {post.postPages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Facebook className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Chưa chọn fanpage nào để đăng bài</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error Messages */}
        {post.postPages.some(pp => pp.errorMsg) && (
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Lỗi đăng bài
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {post.postPages
                  .filter(pp => pp.errorMsg)
                  .map((postPage) => (
                    <div key={postPage.id} className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <div className="font-medium text-red-800 dark:text-red-200">
                        {postPage.page.name}
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                        {postPage.errorMsg}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Xác nhận xóa bài viết</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bạn có chắc chắn muốn xóa bài viết "{post.title || 'này'}"?
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  'Xóa bài viết'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
