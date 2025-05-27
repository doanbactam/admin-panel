'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageCircle,
  Hash,
  AtSign,
  Smile,
  Info,
  Lightbulb,
  TrendingUp
} from 'lucide-react'

interface FirstCommentEditorProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  placeholder?: string
  className?: string
}

const commentSuggestions = [
  {
    category: 'Tương tác',
    icon: <TrendingUp className="h-4 w-4" />,
    suggestions: [
      'Bạn nghĩ sao về điều này? 💭',
      'Hãy chia sẻ ý kiến của bạn nhé! 👇',
      'Tag bạn bè để cùng thảo luận! 👥',
      'Reaction nếu bạn đồng ý! 👍'
    ]
  },
  {
    category: 'Call-to-Action',
    icon: <MessageCircle className="h-4 w-4" />,
    suggestions: [
      'Đừng quên follow để không bỏ lỡ bài viết mới! 🔔',
      'Save bài viết để đọc lại sau nhé! 📌',
      'Share để nhiều người biết đến! 🔄',
      'Comment câu hỏi nếu bạn cần tư vấn! ❓'
    ]
  },
  {
    category: 'Hashtag',
    icon: <Hash className="h-4 w-4" />,
    suggestions: [
      '#marketing #business #tips',
      '#lifestyle #motivation #success',
      '#technology #innovation #future',
      '#health #fitness #wellness'
    ]
  }
]

export const FirstCommentEditor = ({
  value,
  onChange,
  maxLength = 500,
  placeholder = 'Viết comment đầu tiên cho bài viết...',
  className = ''
}: FirstCommentEditorProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const remainingChars = maxLength - value.length
  const isNearLimit = remainingChars <= 50

  const handleSuggestionClick = (suggestion: string) => {
    const currentValue = value
    const newValue = currentValue ? `${currentValue}\n\n${suggestion}` : suggestion

    if (newValue.length <= maxLength) {
      onChange(newValue)
    }

    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = value
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end)

    if (newValue.length <= maxLength) {
      onChange(newValue)

      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length
        textarea.focus()
      }, 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Quick hashtag insertion with #
    if (e.key === '#' && e.ctrlKey) {
      e.preventDefault()
      insertAtCursor('#')
    }

    // Quick mention insertion with @
    if (e.key === '@' && e.ctrlKey) {
      e.preventDefault()
      insertAtCursor('@')
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Info Card - Compact */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Info className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Comment đầu tiên giúp tăng tương tác và cải thiện độ hiển thị của bài viết.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <div className="space-y-3">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={4}
            className="resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />

          {/* Character Counter */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
            <span className={isNearLimit ? 'text-orange-500' : ''}>
              {remainingChars}
            </span>
          </div>
        </div>

        {/* Quick Actions - Compact */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => insertAtCursor('#')}
            className="text-xs h-7 px-2"
          >
            <Hash className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => insertAtCursor('@')}
            className="text-xs h-7 px-2"
          >
            <AtSign className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => insertAtCursor('😊')}
            className="text-xs h-7 px-2"
          >
            <Smile className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-xs h-7 px-2"
          >
            <Lightbulb className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Suggestions Panel */}
      {showSuggestions && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Category Tabs */}
              <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                {commentSuggestions.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selectedCategory === index
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {category.icon}
                    {category.category}
                  </button>
                ))}
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                {commentSuggestions[selectedCategory].suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {suggestion}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
