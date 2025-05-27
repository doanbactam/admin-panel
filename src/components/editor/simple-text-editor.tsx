'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Hash,
  AtSign,
  Smile
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SimpleTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  maxLength?: number
  showToolbar?: boolean
}

export const SimpleTextEditor = ({
  content = '',
  onChange,
  placeholder = 'Viết nội dung bài viết...',
  className,
  maxLength = 2000,
  showToolbar = true
}: SimpleTextEditorProps) => {
  const [text, setText] = useState(content)
  const [cursorPosition, setCursorPosition] = useState(0)

  const handleTextChange = (value: string) => {
    setText(value)
    onChange?.(value)
  }

  const insertText = (insertValue: string, wrapText = false) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = text.substring(start, end)

    let newText: string
    let newCursorPos: number

    if (wrapText && selectedText) {
      // Wrap selected text
      newText = text.substring(0, start) + insertValue + selectedText + insertValue + text.substring(end)
      newCursorPos = start + insertValue.length + selectedText.length + insertValue.length
    } else {
      // Insert at cursor
      newText = text.substring(0, start) + insertValue + text.substring(end)
      newCursorPos = start + insertValue.length
    }

    handleTextChange(newText)

    // Set cursor position after state update
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const addBold = () => insertText('**', true)
  const addItalic = () => insertText('*', true)
  const addLink = () => {
    const url = prompt('Nhập URL:')
    if (url) {
      insertText(`[link](${url})`)
    }
  }
  const addHashtag = () => insertText('#')
  const addMention = () => insertText('@')
  const addEmoji = () => {
    const emojis = ['😀', '😍', '🎉', '👍', '❤️', '🔥', '💯', '🚀']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    insertText(emoji)
  }

  const characterCount = text.length
  const isNearLimit = characterCount > maxLength * 0.8
  const isOverLimit = characterCount > maxLength

  return (
    <div className={cn('space-y-3', className)}>
      {/* ContentStudio-style Toolbar */}
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addBold}
            title="Bold (**text**)"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addItalic}
            title="Italic (*text*)"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addLink}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addHashtag}
            title="Hashtag"
          >
            <Hash className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addMention}
            title="Mention"
          >
            <AtSign className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addEmoji}
            title="Add Emoji"
          >
            <Smile className="h-4 w-4" />
          </Button>

          <div className="flex-1" />

          {/* Character Count */}
          <Badge
            variant={isOverLimit ? "destructive" : isNearLimit ? "secondary" : "outline"}
            className="text-xs"
          >
            {characterCount}/{maxLength}
          </Badge>
        </div>
      )}

      {/* Text Area */}
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "min-h-[300px] resize-none text-base leading-relaxed p-4 border border-gray-300 dark:border-gray-600 rounded-lg",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            "bg-white dark:bg-gray-900",
            isOverLimit && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          maxLength={maxLength}
          onSelect={(e) => {
            const target = e.target as HTMLTextAreaElement
            setCursorPosition(target.selectionStart)
          }}
        />

        {/* Character limit warning */}
        {isOverLimit && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="destructive" className="text-xs">
              Vượt quá giới hạn!
            </Badge>
          </div>
        )}
      </div>

      {/* ContentStudio-style Helper Text */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p><strong>Mẹo:</strong> Sử dụng **text** cho chữ đậm, *text* cho chữ nghiêng</p>
          <p>Thêm link: [tên link](URL)</p>
          <p>Sử dụng #hashtag và @mention để tăng tương tác</p>
        </div>
      </div>
    </div>
  )
}
