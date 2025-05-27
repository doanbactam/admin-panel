'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  MoreHorizontal,
  Globe,
  Facebook,
  Video,
  Camera,
  FileText,
  Badge as BadgeIcon
} from 'lucide-react'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
}

interface SelectedPage {
  id: string
  name: string
  picture?: string | null
}

type PostType = 'post' | 'reel' | 'story'

interface FacebookPreviewProps {
  content: string
  mediaFiles?: MediaFile[]
  selectedMediaIds?: string[]
  selectedPages?: SelectedPage[]
  postType?: PostType
  firstComment?: string
  className?: string
}

export const FacebookPreview = ({
  content,
  mediaFiles = [],
  selectedMediaIds = [],
  selectedPages = [],
  postType = 'post',
  firstComment = '',
  className = ''
}: FacebookPreviewProps) => {
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 10)
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 20) + 2)
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 10) + 1)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const formatContent = (text: string) => {
    if (!text) return ''

    // Convert hashtags and mentions to clickable links
    return text
      .replace(/#(\w+)/g, '<span class="text-blue-600 hover:underline cursor-pointer">#$1</span>')
      .replace(/@(\w+)/g, '<span class="text-blue-600 hover:underline cursor-pointer">@$1</span>')
      .replace(/\n/g, '<br />')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getPostTypeIcon = (type: PostType) => {
    switch (type) {
      case 'reel':
        return <Video className="h-3 w-3" />
      case 'story':
        return <Camera className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  const getPostTypeLabel = (type: PostType) => {
    switch (type) {
      case 'reel':
        return 'Reel'
      case 'story':
        return 'Story'
      default:
        return 'Post'
    }
  }

  if (selectedPages.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Facebook className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Chọn fanpage để xem preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {selectedPages.map((page) => (
        <Card key={page.id} className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-0">
            {/* Post Header */}
            <div className="p-4 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={page.picture || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Facebook className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {page.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>2 phút</span>
                      <span>•</span>
                      <Globe className="h-3 w-3" />
                      {postType !== 'post' && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            {getPostTypeIcon(postType)}
                            <span>{getPostTypeLabel(postType)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            {content && (
              <div className="px-4 pb-3">
                <div
                  className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                />
              </div>
            )}

            {/* Media */}
            {(mediaFiles.length > 0 || selectedMediaIds.length > 0) && (
              <div className="relative">
                {mediaFiles.length === 1 ? (
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                    {mediaFiles[0].type === 'video' ? (
                      <video
                        src={mediaFiles[0].preview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={mediaFiles[0].preview}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    {mediaFiles.slice(0, 4).map((file, index) => (
                      <div key={file.id} className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
                        {file.type === 'video' ? (
                          <video
                            src={file.preview}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={file.preview}
                            alt={`Media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {index === 3 && mediaFiles.length > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              +{mediaFiles.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Engagement Stats */}
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-1">
                      <ThumbsUp className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center -ml-1">
                      <Heart className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                  <span className="ml-1">{formatNumber(likeCount)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{formatNumber(commentCount)} bình luận</span>
                  <span>{formatNumber(shareCount)} chia sẻ</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-2">
              <div className="flex items-center justify-around">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isLiked
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  Thích
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Bình luận
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="px-4 pb-4 space-y-3">
              {/* First Comment (from page owner) */}
              {firstComment && (
                <div className="flex items-start gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={page.picture || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      <Facebook className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl px-3 py-2 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {page.name}
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                        <BadgeIcon className="h-2.5 w-2.5" />
                        <span className="text-xs">Tác giả</span>
                      </div>
                    </div>
                    <div
                      className="text-xs text-gray-700 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: formatContent(firstComment) }}
                    />
                  </div>
                </div>
              )}

              {/* Sample Comments */}
              <div className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    U1
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2 flex-1">
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    Người dùng mẫu
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    Bài viết hay quá! 👍
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    U2
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2 flex-1">
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    Fan của page
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    Cảm ơn page đã chia sẻ! ❤️
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
