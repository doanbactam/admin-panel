'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Facebook, 
  Plus, 
  Settings, 
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2
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

export default function PagesPage() {
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasConnection, setHasConnection] = useState(false)

  const fetchPages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/facebook/pages')
      const data = await response.json()

      if (response.ok) {
        setPages(data.pages || [])
        setHasConnection(data.hasActiveConnection)
      } else {
        console.error('Error fetching pages:', data.error)
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Fanpages</h1>
          <p className="text-muted-foreground">
            Quản lý các fanpage Facebook đã kết nối
          </p>
        </div>
        <Link href="/pages/connect">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Kết nối Facebook
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Fanpages
            </CardTitle>
            <Facebook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.length}</div>
            <p className="text-xs text-muted-foreground">
              {hasConnection ? 'Đã kết nối' : 'Chưa kết nối'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang hoạt động
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pages.filter(p => p.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Fanpages có thể đăng bài
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bài viết hôm nay
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Chưa có bài viết nào
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tương tác
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Tổng tương tác
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Fanpages</CardTitle>
          <CardDescription>
            Tất cả fanpages đã kết nối với tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasConnection ? (
            <div className="text-center py-12">
              <Facebook className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">Chưa kết nối Facebook</h3>
              <p className="text-muted-foreground mb-4">
                Kết nối tài khoản Facebook để bắt đầu quản lý fanpages
              </p>
              <Link href="/pages/connect">
                <Button>
                  <Facebook className="mr-2 h-4 w-4" />
                  Kết nối Facebook
                </Button>
              </Link>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">Không tìm thấy fanpage</h3>
              <p className="text-muted-foreground mb-4">
                Tài khoản Facebook của bạn chưa có fanpage nào hoặc chưa được cấp quyền
              </p>
              <Link href="/pages/connect">
                <Button variant="outline">
                  Kiểm tra lại kết nối
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Card key={page.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {page.picture ? (
                        <img
                          src={page.picture}
                          alt={page.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <Facebook className="h-8 w-8 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{page.name}</h3>
                        <p className="text-sm text-muted-foreground">{page.category}</p>
                        {page.about && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                            {page.about}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {page.socialAccount.accountName}
                          </Badge>
                          {page.isActive ? (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Hoạt động
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Không hoạt động
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Thống kê
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Cài đặt
                          </Button>
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
    </div>
  )
}
