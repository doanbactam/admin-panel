'use client'

import { useState, useEffect } from 'react'
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
  Clock
} from 'lucide-react'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
}

interface PostFormData {
  title: string
  content: string
  mediaFiles: MediaFile[]
  selectedPageIds: string[]
  scheduledAt: string
}

interface PostFormProps {
  initialData?: Partial<PostFormData>
  mode: 'create' | 'edit'
  postId?: string
  onSave: (data: PostFormData, action: 'draft' | 'publish' | 'schedule') => Promise<void>
  isLoading?: boolean
  error?: string | null
  success?: string | null
  className?: string
}

export const PostForm = ({
  initialData = {},
  mode,
  postId,
  onSave,
  isLoading = false,
  error = null,
  success = null,
  className = ''
}: PostFormProps) => {
  // Form state
  const [title, setTitle] = useState(initialData.title || '')
  const [content, setContent] = useState(initialData.content || '')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialData.mediaFiles || [])
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>(initialData.selectedPageIds || [])
  const [scheduledAt, setScheduledAt] = useState(initialData.scheduledAt || '')
  
  // UI state
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-generate title from content
  const generateTitle = () => {
    if (content.trim()) {
      return content.trim().substring(0, 50) + (content.length > 50 ? '...' : '')
    }
    return title || `Bài viết ${new Date().toLocaleDateString('vi-VN')}`
  }

  // Track changes
  useEffect(() => {
    if (mode === 'edit') {
      const hasContentChanges = content !== (initialData.content || '')
      const hasTitleChanges = title !== (initialData.title || '')
      const hasPageChanges = JSON.stringify(selectedPageIds.sort()) !== 
        JSON.stringify((initialData.selectedPageIds || []).sort())
      const hasScheduleChanges = scheduledAt !== (initialData.scheduledAt || '')
      
      setHasChanges(hasContentChanges || hasTitleChanges || hasPageChanges || hasScheduleChanges)
    } else {
      setHasChanges(content.trim().length > 0 || title.trim().length > 0 || selectedPageIds.length > 0)
    }
  }, [mode, initialData, title, content, selectedPageIds, scheduledAt])

  // Auto-save for edit mode
  useEffect(() => {
    if (mode === 'edit' && hasChanges && !isSaving) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft(true) // Silent save
      }, 30000) // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer)
    }
  }, [mode, hasChanges, title, content, selectedPageIds, scheduledAt, isSaving])

  const getFormData = (): PostFormData => ({
    title: title || generateTitle(),
    content: content.trim(),
    mediaFiles,
    selectedPageIds,
    scheduledAt
  })

  const handleSaveDraft = async (silent = false) => {
    if (!content.trim()) {
      return
    }

    setIsSaving(true)
    try {
      await onSave(getFormData(), 'draft')
      setHasChanges(false)
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublishNow = async () => {
    if (!content.trim()) {
      return
    }

    if (selectedPageIds.length === 0) {
      return
    }

    try {
      await onSave(getFormData(), 'publish')
      setHasChanges(false)
    } catch (error) {
      // Error handled by parent
    }
  }

  const handleSchedule = async () => {
    if (!content.trim()) {
      return
    }

    if (selectedPageIds.length === 0) {
      return
    }

    if (!scheduledAt) {
      return
    }

    try {
      await onSave(getFormData(), 'schedule')
      setHasChanges(false)
    } catch (error) {
      // Error handled by parent
    }
  }

  // Mock selected pages for preview
  const selectedPages = selectedPageIds.map(id => ({
    id,
    name: `Fanpage ${id.slice(-4)}`,
    picture: null
  }))

  return (
    <div className={`flex h-full ${className}`}>
      {/* Left Panel - Form */}
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

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <Label htmlFor="title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Tiêu đề bài viết
                </Label>
              </div>
              <Input
                id="title"
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
                <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Chọn fanpage để đăng
                </Label>
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
                <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Nội dung bài viết
                </Label>
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
                <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Hình ảnh & Video
                </Label>
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
                <Label htmlFor="schedule" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Lên lịch đăng bài
                </Label>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <Input
                    id="schedule"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Để trống nếu muốn đăng ngay
                  </p>
                  {mode === 'edit' && initialData.scheduledAt && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                      <Clock className="h-4 w-4" />
                      <span>
                        Hiện tại đã lên lịch: {new Date(initialData.scheduledAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => handleSaveDraft()}
                disabled={isLoading || isSaving || !content.trim()}
                className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {mode === 'edit' && hasChanges ? 'Lưu thay đổi' : 'Lưu nháp'}
              </Button>

              {scheduledAt ? (
                <Button
                  onClick={handleSchedule}
                  disabled={isLoading || !content.trim() || selectedPageIds.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Calendar className="mr-2 h-4 w-4" />
                  )}
                  {mode === 'edit' ? 'Cập nhật lịch' : 'Lên lịch đăng'}
                </Button>
              ) : (
                <Button
                  onClick={handlePublishNow}
                  disabled={isLoading || !content.trim() || selectedPageIds.length === 0}
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
      </div>

      {/* Right Panel - Preview */}
      <div className="w-96 flex flex-col bg-gray-50 dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Preview
          </h2>
          {mode === 'edit' && hasChanges && (
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
              Có thay đổi chưa lưu
            </p>
          )}
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
  )
}
