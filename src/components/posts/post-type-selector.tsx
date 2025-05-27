'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Video,
  Camera,
  Sparkles,
  Clock,
  Users
} from 'lucide-react'

type PostType = 'post' | 'reel' | 'story'

interface PostTypeOption {
  type: PostType
  label: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
  recommended?: boolean
}

interface PostTypeSelectorProps {
  selectedType: PostType
  onChange: (type: PostType) => void
  className?: string
}

const postTypeOptions: PostTypeOption[] = [
  {
    type: 'post',
    label: 'Post',
    description: 'Bài viết thông thường trên timeline',
    icon: <FileText className="h-5 w-5" />,
    color: 'blue',
    features: ['Văn bản', 'Hình ảnh', 'Video', 'Link'],
    recommended: true
  },
  {
    type: 'reel',
    label: 'Reel',
    description: 'Video ngắn thu hút nhiều tương tác',
    icon: <Video className="h-5 w-5" />,
    color: 'purple',
    features: ['Video ngắn', 'Hiệu ứng', 'Âm thanh', 'Trending']
  },
  {
    type: 'story',
    label: 'Story',
    description: 'Nội dung tạm thời 24 giờ',
    icon: <Camera className="h-5 w-5" />,
    color: 'green',
    features: ['24h', 'Tương tác nhanh', 'Sticker', 'Poll']
  }
]

export const PostTypeSelector = ({
  selectedType,
  onChange,
  className = ''
}: PostTypeSelectorProps) => {
  const [hoveredType, setHoveredType] = useState<PostType | null>(null)

  const getColorClasses = (color: string, isSelected: boolean, isHovered: boolean) => {
    const baseClasses = 'transition-all duration-300'

    switch (color) {
      case 'blue':
        return `${baseClasses} ${
          isSelected
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
            : isHovered
              ? 'border-blue-300 bg-blue-25 dark:bg-blue-950/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-200'
        }`
      case 'purple':
        return `${baseClasses} ${
          isSelected
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 ring-2 ring-purple-500/20'
            : isHovered
              ? 'border-purple-300 bg-purple-25 dark:bg-purple-950/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-purple-200'
        }`
      case 'green':
        return `${baseClasses} ${
          isSelected
            ? 'border-green-500 bg-green-50 dark:bg-green-950/20 ring-2 ring-green-500/20'
            : isHovered
              ? 'border-green-300 bg-green-25 dark:bg-green-950/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-green-200'
        }`
      default:
        return baseClasses
    }
  }

  const getIconColor = (color: string, isSelected: boolean) => {
    if (!isSelected) return 'text-gray-500 dark:text-gray-400'

    switch (color) {
      case 'blue': return 'text-blue-600 dark:text-blue-400'
      case 'purple': return 'text-purple-600 dark:text-purple-400'
      case 'green': return 'text-green-600 dark:text-green-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Post Type Grid - Compact */}
      <div className="grid grid-cols-3 gap-2">
        {postTypeOptions.map((option) => {
          const isSelected = selectedType === option.type
          const isHovered = hoveredType === option.type

          return (
            <Card
              key={option.type}
              className={`cursor-pointer relative overflow-hidden ${getColorClasses(
                option.color,
                isSelected,
                isHovered
              )}`}
              onClick={() => onChange(option.type)}
              onMouseEnter={() => setHoveredType(option.type)}
              onMouseLeave={() => setHoveredType(null)}
            >
              {/* Recommended Badge */}
              {option.recommended && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    Khuyến nghị
                  </Badge>
                </div>
              )}

              <CardContent className="p-3 space-y-2">
                {/* Icon & Title */}
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 ${getIconColor(option.color, isSelected)}`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {option.label}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="flex items-center gap-1 pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      Đã chọn
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>


    </div>
  )
}
