'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SimpleTextEditor } from '@/components/editor/simple-text-editor'
import { MediaLibrary } from '@/components/media/media-library'
import { EnhancedMediaUpload } from '@/components/editor/enhanced-media-upload'
import { uploadService, UploadProgress } from '@/lib/upload-service'
import { MediaFile } from '@/components/ui/kibo-ui/dropzone'
import { PageSelector } from '@/components/posts/page-selector'
import { PostPreview } from '@/components/posts/post-preview'
import { PublishingProgress } from '@/components/posts/publishing-progress'
import { PostTypeSelector } from '@/components/posts/post-type-selector'
import { FirstCommentEditor } from '@/components/posts/first-comment-editor'
import { CompactSection } from '@/components/posts/compact-section'
import {
  Save,
  Send,
  Calendar,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Users,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Clock
} from 'lucide-react'

// MediaFile interface is now imported from kibo-ui/dropzone

type PostType = 'post' | 'reel' | 'story'

export default function CreatePostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Auto-generate title from content or timestamp
  const generateTitle = () => {
    if (content.trim()) {
      // Use first 50 characters of content as title
      return content.trim().substring(0, 50) + (content.length > 50 ? '...' : '')
    }
    // Fallback to timestamp
    return `Bài viết ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
  }

  const getMediaType = () => {
    // Check uploaded files first
    if (mediaFiles.length > 0) {
      return mediaFiles[0].type === 'video' ? 'video' : 'image'
    }
    // For selected media from library, we'll need to fetch their types
    // For now, assume mixed or image
    return selectedMediaIds.length > 0 ? 'image' : null
  }

  // Handle upload progress
  const handleUploadProgress = (progress: UploadProgress) => {
    setMediaFiles(prev => prev.map(file =>
      file.id === progress.fileId
        ? {
            ...file,
            uploading: progress.status === 'uploading',
            uploaded: progress.status === 'completed',
            uploadProgress: progress.progress,
            error: progress.error,
            url: progress.url
          }
        : file
    ))
  }
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([])
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([])
  const [scheduledAt, setScheduledAt] = useState('')
  const [postType, setPostType] = useState<PostType>('post')
  const [firstComment, setFirstComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [createdPostId, setCreatedPostId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Pre-fill scheduledAt from URL params (from calendar)
  useEffect(() => {
    const scheduledAtParam = searchParams.get('scheduledAt')
    if (scheduledAtParam) {
      setScheduledAt(scheduledAtParam)
      // Auto-expand schedule section when coming from calendar
      setExpandedSections(prev => ({
        ...prev,
        schedule: true
      }))
    }
  }, [searchParams])

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    pages: true,
    postType: true,
    content: true,
    media: false,
    comment: false,
    schedule: false
  })

  // Helper function to toggle sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Mock selected pages for preview (in real app, fetch from API)
  const selectedPages = selectedPageIds.map(id => ({
    id,
    name: `Fanpage ${id.slice(-4)}`,
    picture: null
  }))

  const handleSaveDraft = async () => {
    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bài viết')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Upload pending media files first
      const pendingFiles = mediaFiles.filter(f => !f.uploaded && !f.uploading)
      let uploadedMediaIds: string[] = []

      if (pendingFiles.length > 0) {
        setSuccess('Đang tải lên media files...')
        uploadService.queueFiles(pendingFiles, handleUploadProgress)
        const uploadResult = await uploadService.uploadQueuedFiles('posts')

        if (!uploadResult.success) {
          setError(`Upload failed: ${uploadResult.errors.map(e => e.error).join(', ')}`)
          return
        }

        uploadedMediaIds = uploadResult.uploadedFiles.map(f => f.mediaId)
      }



      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generateTitle(),
          content: content.trim(),
          firstComment: firstComment.trim() || null,
          postType: postType,
          mediaIds: [...selectedMediaIds, ...uploadedMediaIds],
          mediaUrls: [], // Will be populated from mediaIds
          mediaType: getMediaType(),
          pageIds: selectedPageIds,
          scheduledAt: null // Draft
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Đã lưu nháp thành công!')
        setTimeout(() => {
          router.push('/posts')
        }, 1500)
      } else {
        setError(data.error || 'Không thể lưu bài viết')
      }
    } catch {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
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

    setIsLoading(true)
    setError(null)

    try {
      // Upload pending media files first
      const pendingFiles = mediaFiles.filter(f => !f.uploaded && !f.uploading)
      let uploadedMediaIds: string[] = []

      if (pendingFiles.length > 0) {
        setSuccess('Đang tải lên media files...')
        uploadService.queueFiles(pendingFiles, handleUploadProgress)
        const uploadResult = await uploadService.uploadQueuedFiles('posts')

        if (!uploadResult.success) {
          setError(`Upload failed: ${uploadResult.errors.map(e => e.error).join(', ')}`)
          return
        }

        uploadedMediaIds = uploadResult.uploadedFiles.map(f => f.mediaId)
      }

      // Create the post
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generateTitle(),
          content: content.trim(),
          firstComment: firstComment.trim() || null,
          postType: postType,
          mediaIds: [...selectedMediaIds, ...uploadedMediaIds],
          mediaUrls: [], // Will be populated from mediaIds
          mediaType: getMediaType(),
          pageIds: selectedPageIds,
          scheduledAt: null // Publish immediately
        })
      })

      const data = await response.json()

      if (response.ok) {
        setCreatedPostId(data.post.id)
        setIsPublishing(true)
        setSuccess('Bài viết đã được tạo, đang đăng lên Facebook...')
      } else {
        setError(data.error || 'Không thể tạo bài viết')
      }
    } catch {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishingComplete = (results: { success: boolean; summary: { successful: number; total: number; failed: number } }) => {
    setIsPublishing(false)

    if (results.success) {
      setSuccess(`Đã đăng bài thành công lên ${results.summary.successful}/${results.summary.total} fanpage!`)
      setTimeout(() => {
        router.push('/posts')
      }, 3000)
    } else {
      setError(`Đăng bài thất bại. ${results.summary.failed}/${results.summary.total} fanpage gặp lỗi.`)
    }
  }

  const handleRetryPublishing = () => {
    if (createdPostId) {
      setIsPublishing(true)
      setError(null)
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

    setIsLoading(true)
    setError(null)

    try {
      // Upload pending media files first
      const pendingFiles = mediaFiles.filter(f => !f.uploaded && !f.uploading)
      let uploadedMediaIds: string[] = []

      if (pendingFiles.length > 0) {
        setSuccess('Đang tải lên media files...')
        uploadService.queueFiles(pendingFiles, handleUploadProgress)
        const uploadResult = await uploadService.uploadQueuedFiles('posts')

        if (!uploadResult.success) {
          setError(`Upload failed: ${uploadResult.errors.map(e => e.error).join(', ')}`)
          return
        }

        uploadedMediaIds = uploadResult.uploadedFiles.map(f => f.mediaId)
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generateTitle(),
          content: content.trim(),
          firstComment: firstComment.trim() || null,
          postType: postType,
          mediaIds: [...selectedMediaIds, ...uploadedMediaIds],
          mediaUrls: [], // Will be populated from mediaIds
          mediaType: getMediaType(),
          pageIds: selectedPageIds,
          scheduledAt: new Date(scheduledAt).toISOString()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Đã lên lịch đăng bài thành công!')
        setTimeout(() => {
          router.push('/posts')
        }, 1500)
      } else {
        setError(data.error || 'Không thể lên lịch đăng bài')
      }
    } catch {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ContentStudio-style Header */}
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
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Tạo bài viết mới
            </h1>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Lưu nháp
            </Button>

            {scheduledAt ? (
              <Button
                size="sm"
                onClick={handleSchedule}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="mr-2 h-4 w-4" />
                )}
                Lên lịch đăng
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handlePublishNow}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Đăng ngay
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Compact 2-Panel Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Alerts */}
          {(error || success) && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              {error && (
                <Alert variant="destructive" className="mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-200 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{success}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Page Selector */}
              <CompactSection
                title="Chọn fanpage để đăng"
                icon={<Users className="h-5 w-5" />}
                isExpanded={expandedSections.pages}
                onToggle={() => toggleSection('pages')}
                required
                badge={selectedPageIds.length > 0 ? `${selectedPageIds.length} đã chọn` : undefined}
              >
                <PageSelector
                  selectedPageIds={selectedPageIds}
                  onChange={setSelectedPageIds}
                />
              </CompactSection>

              {/* Post Type Selector */}
              <CompactSection
                title="Loại bài viết"
                icon={<FileText className="h-5 w-5" />}
                isExpanded={expandedSections.postType}
                onToggle={() => toggleSection('postType')}
                badge={postType === 'post' ? 'Post' : postType === 'reel' ? 'Reel' : 'Story'}
              >
                <PostTypeSelector
                  selectedType={postType}
                  onChange={setPostType}
                />
              </CompactSection>

              {/* Content Editor */}
              <CompactSection
                title="Nội dung bài viết"
                icon={<MessageCircle className="h-5 w-5" />}
                isExpanded={expandedSections.content}
                onToggle={() => toggleSection('content')}
                required
                badge={content.length > 0 ? `${content.length} ký tự` : undefined}
              >
                <SimpleTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Viết nội dung bài viết của bạn..."
                  maxLength={2000}
                  showToolbar={true}
                />
              </CompactSection>

              {/* Media Upload */}
              <CompactSection
                title="Hình ảnh & Video"
                icon={<ImageIcon className="h-5 w-5" />}
                isExpanded={expandedSections.media}
                onToggle={() => toggleSection('media')}
                badge={
                  (mediaFiles.length + selectedMediaIds.length) > 0
                    ? `${mediaFiles.length + selectedMediaIds.length} file`
                    : 'Tùy chọn'
                }
              >
                <div className="space-y-4">
                  {/* Media Library Selection */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Chọn từ thư viện
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMediaLibrary(!showMediaLibrary)}
                      >
                        {showMediaLibrary ? 'Ẩn thư viện' : 'Mở thư viện'}
                      </Button>
                    </div>

                    {showMediaLibrary && (
                      <div className="max-h-60 overflow-hidden">
                        <MediaLibrary
                          selectionMode="multiple"
                          onSelectMultiple={(media) => {
                            setSelectedMediaIds(media.map(m => m.id))
                          }}
                          allowedTypes={postType === 'reel' ? ['video/*'] : ['image/*', 'video/*']}
                          className="border-0"
                        />
                      </div>
                    )}

                    {selectedMediaIds.length > 0 && (
                      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Đã chọn {selectedMediaIds.length} file từ thư viện
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Media Upload */}
                  <EnhancedMediaUpload
                    files={mediaFiles}
                    onChange={setMediaFiles}
                    maxFiles={postType === 'reel' ? 1 : 10}
                    maxSize={50}
                    accept={postType === 'reel' ? ['video/*'] : ['image/*', 'video/*']}
                    postType={postType}
                    folder="posts"
                    autoUpload={false}
                    showUploadButton={false}
                  />
                </div>
              </CompactSection>

              {/* First Comment */}
              <CompactSection
                title="Comment đầu tiên"
                icon={<MessageCircle className="h-5 w-5" />}
                isExpanded={expandedSections.comment}
                onToggle={() => toggleSection('comment')}
                badge={firstComment.length > 0 ? `${firstComment.length} ký tự` : 'Tùy chọn'}
              >
                <FirstCommentEditor
                  value={firstComment}
                  onChange={setFirstComment}
                  maxLength={500}
                />
              </CompactSection>

              {/* Schedule */}
              <CompactSection
                title="Lên lịch đăng bài"
                icon={<Clock className="h-5 w-5" />}
                isExpanded={expandedSections.schedule}
                onToggle={() => toggleSection('schedule')}
                badge={scheduledAt ? 'Đã lên lịch' : 'Đăng ngay'}
              >
                <div className="space-y-3">
                  <Input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Để trống nếu muốn đăng ngay
                  </p>
                </div>
              </CompactSection>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-80 flex flex-col bg-gray-50 dark:bg-gray-800">
          {/* Panel Header */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Preview
            </h2>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Preview */}
            <PostPreview
              content={content}
              mediaFiles={mediaFiles}
              selectedMediaIds={selectedMediaIds}
              selectedPages={selectedPages}
              postType={postType}
              firstComment={firstComment}
            />

            {/* Publishing Progress */}
            {createdPostId && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tiến trình đăng bài
                </h3>
                <PublishingProgress
                  postId={createdPostId}
                  isPublishing={isPublishing}
                  onComplete={handlePublishingComplete}
                  onRetry={handleRetryPublishing}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
