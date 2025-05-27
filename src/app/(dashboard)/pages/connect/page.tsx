'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Facebook,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  Unlink
} from 'lucide-react'

interface FacebookPage {
  id: string
  pageId: string
  name: string
  category: string
  about?: string
  picture?: string
  isActive: boolean
  socialAccount: {
    id: string
    accountName: string
    platform: string
  }
}

export default function FacebookConnectPage() {
  const searchParams = useSearchParams()
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Handle URL parameters
  useEffect(() => {
    const errorParam = searchParams.get('error')
    const successParam = searchParams.get('success')
    const pagesCount = searchParams.get('pages')

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }

    if (successParam === 'true') {
      setSuccess(`Kết nối Facebook thành công! Đã tìm thấy ${pagesCount || 0} fanpage.`)
    }
  }, [searchParams])

  // Fetch pages
  const fetchPages = async (refresh = false) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/facebook/pages${refresh ? '?refresh=true' : ''}`)
      const data = await response.json()

      if (response.ok) {
        setPages(data.pages || [])
      } else {
        setError(data.error || 'Không thể tải danh sách fanpage')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    } finally {
      setIsLoading(false)
    }
  }

  // Connect to Facebook
  const handleConnectFacebook = () => {
    setIsConnecting(true)
    const authUrl = `/api/facebook/auth?state=${Date.now()}`
    window.location.href = authUrl
  }

  // Refresh pages
  const handleRefreshPages = async () => {
    setIsRefreshing(true)
    await fetchPages(true)
    setIsRefreshing(false)
  }

  // Disconnect Facebook
  const handleDisconnect = async (socialAccountId?: string) => {
    try {
      const response = await fetch('/api/facebook/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ socialAccountId })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        await fetchPages()
      } else {
        setError(data.error || 'Không thể ngắt kết nối')
      }
    } catch (error) {
      setError('Lỗi kết nối API')
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kết nối Facebook</h1>
        <p className="text-muted-foreground">
          Kết nối tài khoản Facebook để quản lý fanpages và đăng bài tự động
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Connect Facebook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-blue-600" />
            Kết nối Facebook
          </CardTitle>
          <CardDescription>
            Kết nối tài khoản Facebook để truy cập fanpages và đăng bài
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Quyền cần thiết:
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Quản lý bài viết</Badge>
                <Badge variant="secondary">Đọc thống kê</Badge>
                <Badge variant="secondary">Danh sách trang</Badge>
                <Badge variant="secondary">Quản lý metadata</Badge>
                <Badge variant="secondary">Đọc nội dung</Badge>
                <Badge variant="secondary">Quản lý business</Badge>
              </div>
            </div>
            <Button
              onClick={handleConnectFacebook}
              disabled={isConnecting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang kết nối...
                </>
              ) : (
                <>
                  <Facebook className="mr-2 h-4 w-4" />
                  Kết nối Facebook
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Pages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fanpages đã kết nối</CardTitle>
              <CardDescription>
                Danh sách các fanpage bạn có thể đăng bài
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshPages}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Làm mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Đang tải...</span>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Facebook className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có fanpage nào được kết nối</p>
              <p className="text-sm">Hãy kết nối Facebook để bắt đầu</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Card key={page.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {page.picture ? (
                        <img
                          src={page.picture}
                          alt={page.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Facebook className="h-6 w-6 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{page.name}</h3>
                        <p className="text-sm text-muted-foreground">{page.category}</p>
                        {page.about && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {page.about}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {page.socialAccount.accountName}
                          </Badge>
                          {page.isActive && (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Hoạt động
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disconnect */}
      {pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Ngắt kết nối</CardTitle>
            <CardDescription>
              Ngắt kết nối tài khoản Facebook và xóa tất cả fanpages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => handleDisconnect()}
            >
              <Unlink className="mr-2 h-4 w-4" />
              Ngắt kết nối Facebook
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
