'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Facebook,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

interface Post {
  id: string
  title?: string
  content: string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
  scheduledAt?: string
  publishedAt?: string
  createdAt: string
  postPages: {
    id: string
    status: 'PENDING' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
    page: {
      id: string
      name: string
      picture?: string
    }
  }[]
}

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/posts')
      const data = await response.json()

      if (response.ok) {
        setPosts(data.posts || [])
      } else {
        console.error('Error fetching posts:', data.error)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleView = (post: Post) => {
    // Navigate to detailed view page
    router.push(`/posts/${post.id}`)
  }

  const handleEdit = (post: Post) => {
    // Navigate to edit page
    router.push(`/posts/${post.id}/edit`)
  }

  const handleDelete = (post: Post) => {
    setSelectedPost(post)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!selectedPost) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== selectedPost.id))
        setShowDeleteDialog(false)
        setSelectedPost(null)
      } else {
        console.error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDuplicate = async (post: Post) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${post.title} (Copy)`,
          content: post.content,
          status: 'DRAFT'
        })
      })

      if (response.ok) {
        fetchPosts() // Refresh the list
      }
    } catch (error) {
      console.error('Error duplicating post:', error)
    }
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

  const stripMarkdown = (text: string) => {
    if (!text) return ''

    // Remove markdown syntax for display
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/#(\w+)/g, '$1')        // Remove hashtags #
      .replace(/@(\w+)/g, '$1')        // Remove mentions @
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm ||
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripMarkdown(post.content).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || post.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Vercel-style Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
                Posts
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                Create, manage, and publish content across your Facebook pages with ease.
              </p>
            </div>
            <Link href="/posts/new">
              <Button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white border-0 h-10 px-4 text-sm font-medium transition-colors">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Vercel-style Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-12">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-black dark:text-white">{posts.length}</p>
              </div>
              <Edit className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {posts.filter(p => p.status === 'PUBLISHED').length}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {posts.filter(p => p.status === 'SCHEDULED').length}
                </p>
              </div>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {posts.filter(p => p.status === 'DRAFT').length}
                </p>
              </div>
              <Edit className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Vercel-style Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-md text-sm focus:border-black dark:focus:border-white min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PUBLISHED">Published</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>

        {/* Vercel-style Posts List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Posts
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPosts.length} posts
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Create your first post to start managing your Facebook content.
              </p>
              <Link href="/posts/new">
                <Button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={getStatusColor(post.status) as any}
                          className="text-xs"
                        >
                          {getStatusIcon(post.status)}
                          <span className="ml-1">{getStatusText(post.status)}</span>
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors cursor-pointer"
                          onClick={() => handleView(post)}>
                        {post.title || 'Untitled Post'}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {stripMarkdown(post.content)}
                      </p>

                      {/* Fanpages */}
                      {post.postPages.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.postPages.length} page{post.postPages.length > 1 ? 's' : ''}
                          </span>
                          <div className="flex gap-1">
                            {post.postPages.slice(0, 3).map((pp) => (
                              <span key={pp.id} className="text-xs text-gray-500 dark:text-gray-400">
                                {pp.page.name}
                              </span>
                            ))}
                            {post.postPages.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{post.postPages.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Schedule Info */}
                      {post.scheduledAt && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                          <Clock className="h-4 w-4" />
                          <span>Scheduled for {formatDate(post.scheduledAt)}</span>
                        </div>
                      )}
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Published {formatDate(post.publishedAt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(post)}
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPost?.title || 'Untitled Post'}</DialogTitle>
              <DialogDescription>
                Created {selectedPost && formatDate(selectedPost.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                {selectedPost && (
                  <Badge variant={getStatusColor(selectedPost.status) as any}>
                    {getStatusIcon(selectedPost.status)}
                    <span className="ml-1">{getStatusText(selectedPost.status)}</span>
                  </Badge>
                )}
              </div>
              <div>
                <h4 className="font-medium mb-2">Content</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{selectedPost?.content}</p>
                </div>
              </div>
              {selectedPost?.postPages && selectedPost.postPages.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Facebook Pages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.postPages.map((pp) => (
                      <Badge key={pp.id} variant="outline">
                        {pp.page.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {selectedPost?.scheduledAt && (
                <div>
                  <h4 className="font-medium mb-2">Scheduled</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(selectedPost.scheduledAt)}
                  </p>
                </div>
              )}
              {selectedPost?.publishedAt && (
                <div>
                  <h4 className="font-medium mb-2">Published</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(selectedPost.publishedAt)}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
              {selectedPost && (
                <Button onClick={() => handleEdit(selectedPost)}>
                  Edit Post
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedPost?.title || 'this post'}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
