'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SimpleTextEditor } from '@/components/editor/simple-text-editor'
import { MediaUpload } from '@/components/editor/media-upload'
import { PageSelector } from '@/components/posts/page-selector'
import { PostPreview } from '@/components/posts/post-preview'
import {
  Save,
  Send,
  Calendar,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Clock,
  Eye
} from 'lucide-react'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
}

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
    page: {
      id: string
      name: string
      picture?: string
    }
  }[]
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  // Form state
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([])
  const [scheduledAt, setScheduledAt] = useState('')

  // UI state
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSyncingFacebook, setIsSyncingFacebook] = useState(false)

  // Auto-generate title from content
  const generateTitle = () => {
    if (content.trim()) {
      return content.trim().substring(0, 50) + (content.length > 50 ? '...' : '')
    }
    return title || `Bài viết ${new Date().toLocaleDateString('vi-VN')}`
  }

  // Fetch post data
  const fetchPost = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/posts/${postId}`)
      const data = await response.json()

      if (response.ok) {
        const postData = data.post
        setPost(postData)
        setTitle(postData.title || '')
        setContent(postData.content || '')
        setSelectedPageIds(postData.postPages.map((pp: any) => pp.pageId))
        setScheduledAt(postData.scheduledAt ? new Date(postData.scheduledAt).toISOString().slice(0, 16) : '')
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

  // Track changes
  useEffect(() => {
    if (post) {
      const hasContentChanges = content !== (post.content || '')
      const hasTitleChanges = title !== (post.title || '')
      const hasPageChanges = JSON.stringify(selectedPageIds.sort()) !==
        JSON.stringify(post.postPages.map(pp => pp.pageId).sort())
      const hasScheduleChanges = scheduledAt !==
        (post.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : '')

      setHasChanges(hasContentChanges || hasTitleChanges || hasPageChanges || hasScheduleChanges)
    }
  }, [post, title, content, selectedPageIds, scheduledAt])

  // Auto-save functionality
  useEffect(() => {
    if (hasChanges && post) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft(true) // Silent save
      }, 30000) // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer)
    }
  }, [hasChanges, title, content, selectedPageIds, scheduledAt])

  const handleSaveDraft = async (silent = false) => {
    if (!content.trim()) {
      if (!silent) setError('Vui lòng nhập nội dung bài viết')
      return
    }

    setIsSaving(true)
    if (!silent) setError(null)

    // Check if this will trigger Facebook sync
    const willSyncFacebook = post?.status === 'PUBLISHED' && content.trim() !== (post.content || '')
    if (willSyncFacebook && !silent) {
      setIsSyncingFacebook(true)
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || generateTitle(),
          content: content.trim(),
          mediaUrls: [], // TODO: Handle media files
          pageIds: selectedPageIds,
          scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
          status: 'DRAFT'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setPost(data.post)
        setHasChanges(false)
        if (!silent) {
          if (willSyncFacebook) {
            setSuccess('Đã lưu thay đổi và đang cập nhật trên Facebook...')
            setTimeout(() => {
              setSuccess('Đã lưu thay đổi thành công!')
              setTimeout(() => setSuccess(null), 2000)
            }, 3000)
          } else {
            setSuccess('Đã lưu thay đổi thành công!')
            setTimeout(() => setSuccess(null), 3000)
          }
        }
      } else {
        if (!silent) setError(data.error || 'Không thể lưu bài viết')
      }
    } catch (error) {
      if (!silent) setError('Lỗi kết nối API')
    } finally {
      setIsSaving(false)
      if (willSyncFacebook) {
        setTimeout(() => setIsSyncingFacebook(false), 5000) // Hide sync indicator after 5 seconds
      }
    }
  }

  const handlePublishNow = async () => {
    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bài viết')
      return
    }

    if (selectedPageIds.length === 0) {
      setError('Vui lòng chọn ít nhất một fanpage')
      return
    }

    // Save first, then publish
    await handleSaveDraft(true)

    setIsPublishing(true)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${postId}/publish`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Đã đăng bài thành công lên ${data.summary.successful}/${data.summary.total} fanpage!`)
        setTimeout(() => {
          router.push('/posts')
        }, 3000)
      } else {
        setError(data.error || 'Không thể đăng bài')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleSchedule = async () => {
    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bài viết')
      return
    }

    if (selectedPageIds.length === 0) {
      setError('Vui lòng chọn ít nhất một fanpage')
      return
    }

    if (!scheduledAt) {
      setError('Vui lòng chọn thời gian đăng bài')
      return
    }

    await handleSaveDraft(true)

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || generateTitle(),
          content: content.trim(),
          mediaUrls: [],
          pageIds: selectedPageIds,
          scheduledAt: new Date(scheduledAt).toISOString(),
          status: 'SCHEDULED'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Đã cập nhật lịch đăng bài thành công!')
        setTimeout(() => {
          router.push('/posts')
        }, 2000)
      } else {
        setError(data.error || 'Không thể lên lịch đăng bài')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    }
  }

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/posts/${postId}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải bài viết...</span>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Không tìm thấy bài viết</h2>
          <p className="text-gray-600 mb-4">Bài viết có thể đã bị xóa hoặc bạn không có quyền truy cập.</p>
          <Button onClick={() => router.push('/posts')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    )
  }

  // Mock selected pages for preview
  const selectedPages = selectedPageIds.map(id => ({
    id,
    name: `Fanpage ${id.slice(-4)}`,
    picture: null
  }))

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
                Chỉnh sửa bài viết
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.status === 'PUBLISHED' ? 'Đã đăng' :
                 post.status === 'SCHEDULED' ? 'Đã lên lịch' : 'Bản nháp'}
                {hasChanges && ' • Có thay đổi chưa lưu'}
                {isSyncingFacebook && ' • Đang đồng bộ Facebook...'}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              <Eye className="mr-2 h-4 w-4" />
              Xem trước
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSaveDraft()}
              disabled={isSaving || !hasChanges}
              className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {hasChanges ? 'Lưu thay đổi' : 'Đã lưu'}
            </Button>

            {scheduledAt ? (
              <Button
                size="sm"
                onClick={handleSchedule}
                disabled={isSaving || isPublishing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="mr-2 h-4 w-4" />
                )}
                Cập nhật lịch
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handlePublishNow}
                disabled={isSaving || isPublishing || post.status === 'PUBLISHED'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isPublishing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {post.status === 'PUBLISHED' ? 'Đã đăng' : 'Đăng ngay'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Alerts */}
          {(error || success) && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {error && (
                <Alert variant="destructive" className="mb-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Title */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Tiêu đề bài viết
                  </h2>
                </div>
                <Input
                  placeholder="Nhập tiêu đề (tùy chọn)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
              </div>

              {/* Page Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Chọn fanpage để đăng
                  </h2>
                </div>
                <PageSelector
                  selectedPageIds={selectedPageIds}
                  onChange={setSelectedPageIds}
                />
              </div>

              {/* Content Editor */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Nội dung bài viết
                  </h2>
                </div>
                <SimpleTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Viết nội dung bài viết của bạn..."
                  maxLength={2000}
                  showToolbar={true}
                />
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Hình ảnh & Video
                  </h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <MediaUpload
                    files={mediaFiles}
                    onChange={setMediaFiles}
                    maxFiles={10}
                    maxSize={50}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    Thêm hình ảnh hoặc video để làm bài viết sinh động hơn
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Lên lịch đăng bài
                  </h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <Input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Để trống nếu muốn đăng ngay
                    </p>
                    {post.scheduledAt && (
                      <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                        <Clock className="h-4 w-4" />
                        <span>
                          Hiện tại đã lên lịch: {new Date(post.scheduledAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-96 flex flex-col bg-gray-50 dark:bg-gray-800">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Preview
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <PostPreview
              content={content}
              mediaFiles={mediaFiles}
              selectedPages={selectedPages}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
