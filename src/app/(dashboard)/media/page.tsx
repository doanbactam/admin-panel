'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MediaUpload } from '@/components/editor/media-upload'
import { MediaLibrary } from '@/components/media/media-library'
import { StorageProviderInfo } from '@/components/media/storage-provider-info'
import {
  Upload,
  FolderOpen,
  Image as ImageIcon,
  Video,
  BarChart3,
  Settings,
  Cloud,
  HardDrive
} from 'lucide-react'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'other'
  uploading?: boolean
  uploaded?: boolean
  url?: string
  uploadProgress?: number
  error?: string
  s3Key?: string
}

export default function MediaPage() {
  const [uploadFiles, setUploadFiles] = useState<MediaFile[]>([])
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('general')

  const handleUploadComplete = () => {
    setUploadFiles([])
    setUploadDialogOpen(false)
    // Refresh media library
    window.location.reload()
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Management</h1>
          <p className="text-muted-foreground">
            Quản lý hình ảnh, video và tài liệu của bạn
          </p>
        </div>

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={selectedFolder === 'general' ? 'default' : 'outline'}
                  onClick={() => setSelectedFolder('general')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <FolderOpen className="h-6 w-6 mb-2" />
                  General
                </Button>
                <Button
                  variant={selectedFolder === 'posts' ? 'default' : 'outline'}
                  onClick={() => setSelectedFolder('posts')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <ImageIcon className="h-6 w-6 mb-2" />
                  Posts
                </Button>
                <Button
                  variant={selectedFolder === 'profile' ? 'default' : 'outline'}
                  onClick={() => setSelectedFolder('profile')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Video className="h-6 w-6 mb-2" />
                  Profile
                </Button>
              </div>

              <MediaUpload
                files={uploadFiles}
                onChange={setUploadFiles}
                maxFiles={20}
                maxSize={100}
                folder={selectedFolder}
                enableS3Upload={true}
              />

              {uploadFiles.length > 0 && uploadFiles.every(f => f.uploaded) && (
                <div className="flex justify-end">
                  <Button onClick={handleUploadComplete}>
                    Done
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">
              of 10 GB available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">
              69% of total files
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">378</div>
            <p className="text-xs text-muted-foreground">
              31% of total files
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">Media Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <MediaLibrary
            selectionMode="multiple"
            className="min-h-[600px]"
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Upload Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Upload trends chart would go here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Storage usage chart would go here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Storage Provider Info */}
            <StorageProviderInfo />

            {/* Upload Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Upload Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Upload Limits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Max File Size</label>
                      <p className="text-sm text-muted-foreground">50 MB</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Max Files per Upload</label>
                      <p className="text-sm text-muted-foreground">20 files</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Supported Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JPEG', 'PNG', 'GIF', 'WebP', 'MP4', 'AVI', 'MOV', 'WebM'].map(format => (
                      <span key={format} className="px-2 py-1 bg-muted rounded text-xs">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Processing Features</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>✅ Automatic image optimization</div>
                    <div>✅ Multiple size variants</div>
                    <div>✅ Format conversion</div>
                    <div>✅ Progressive JPEG</div>
                    <div>✅ WebP support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
