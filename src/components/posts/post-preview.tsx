'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FacebookPreview } from './facebook-preview'
import { Facebook } from 'lucide-react'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
}

type PostType = 'post' | 'reel' | 'story'

interface PostPreviewProps {
  content: string
  mediaFiles: MediaFile[]
  selectedMediaIds?: string[]
  selectedPages: any[]
  postType?: PostType
  firstComment?: string
  className?: string
}

export const PostPreview = ({
  content,
  mediaFiles,
  selectedMediaIds = [],
  selectedPages,
  postType = 'post',
  firstComment = '',
  className
}: PostPreviewProps) => {
  return (
    <div className={className}>
      {/* Selected Pages Info */}
      {selectedPages.length > 0 && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Facebook className="h-4 w-4 text-blue-600" />
              Sẽ đăng lên {selectedPages.length} fanpage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedPages.slice(0, 3).map((page) => (
                <Badge key={page.id} variant="secondary" className="text-xs">
                  {page.name}
                </Badge>
              ))}
              {selectedPages.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedPages.length - 3} khác
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Facebook Preview */}
      <FacebookPreview
        content={content}
        mediaFiles={mediaFiles}
        selectedMediaIds={selectedMediaIds}
        selectedPages={selectedPages}
        postType={postType}
        firstComment={firstComment}
      />

      {/* Preview Note */}
      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg mt-4">
        💡 Đây chỉ là bản xem trước. Giao diện thực tế trên Facebook có thể khác một chút.
      </div>
    </div>
  )
}
