'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Search,
  Filter,
  Grid,
  List,
  Upload,
  Trash2,
  Download,
  Eye,
  Image as ImageIcon,
  Video,
  File,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
  category: 'image' | 'video' | 'other'
  folder: string
  isProcessed: boolean
  createdAt: string
  updatedAt: string
}

interface MediaLibraryProps {
  onSelect?: (media: MediaItem) => void
  onSelectMultiple?: (media: MediaItem[]) => void
  selectionMode?: 'single' | 'multiple'
  allowedTypes?: string[]
  className?: string
}

export function MediaLibrary({
  onSelect,
  onSelectMultiple,
  selectionMode = 'single',
  allowedTypes,
  className
}: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [folderFilter, setFolderFilter] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch media from API
  const fetchMedia = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchQuery && { search: searchQuery }),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(folderFilter !== 'all' && { folder: folderFilter }),
      })

      const response = await fetch(`/api/media?${params}`)
      if (response.ok) {
        const data = await response.json()
        setMedia(data.media)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [page, searchQuery, categoryFilter, folderFilter])

  // Handle item selection
  const handleItemSelect = (item: MediaItem) => {
    if (selectionMode === 'single') {
      setSelectedItems([item.id])
      onSelect?.(item)
    } else {
      const newSelection = selectedItems.includes(item.id)
        ? selectedItems.filter(id => id !== item.id)
        : [...selectedItems, item.id]
      
      setSelectedItems(newSelection)
      
      const selectedMedia = media.filter(m => newSelection.includes(m.id))
      onSelectMultiple?.(selectedMedia)
    }
  }

  // Delete selected items
  const handleDelete = async () => {
    if (selectedItems.length === 0) return

    try {
      const response = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaIds: selectedItems })
      })

      if (response.ok) {
        setSelectedItems([])
        fetchMedia()
      }
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get file icon
  const getFileIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  // Filter media by allowed types
  const filteredMedia = allowedTypes 
    ? media.filter(item => allowedTypes.some(type => item.mimeType.startsWith(type.replace('/*', ''))))
    : media

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Media Library</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            {selectedItems.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedItems.length})
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="profile">Profile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No media found</p>
          </div>
        ) : (
          <>
            {/* Media Grid/List */}
            <div className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
                : 'space-y-2'
            )}>
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'relative cursor-pointer rounded-lg border transition-all',
                    selectedItems.includes(item.id)
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:border-muted-foreground/50',
                    viewMode === 'grid' ? 'aspect-square' : 'p-3'
                  )}
                  onClick={() => handleItemSelect(item)}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="relative w-full h-full">
                      {item.category === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                          {getFileIcon(item.category)}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                        <p className="text-xs truncate">{item.filename}</p>
                        <p className="text-xs opacity-75">{formatFileSize(item.size)}</p>
                      </div>
                      {selectedItems.includes(item.id) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    // List View
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        {item.category === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.filename}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                            {getFileIcon(item.category)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.filename}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(item.size)}
                          </span>
                          {item.width && item.height && (
                            <span className="text-xs text-muted-foreground">
                              {item.width}×{item.height}
                            </span>
                          )}
                        </div>
                      </div>
                      {selectedItems.includes(item.id) && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
