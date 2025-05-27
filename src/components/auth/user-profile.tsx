'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  User, 
  Mail, 
  Calendar, 
  Shield,
  Settings,
  ExternalLink
} from 'lucide-react'
import { useUserSync } from '@/hooks/use-user-sync'

export const UserProfile = () => {
  const { user, isLoaded } = useUser()
  const { isSynced, isLoading: isSyncing } = useUserSync()

  if (!isLoaded || isSyncing) {
    return <UserProfileSkeleton />
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Thông tin tài khoản
        </CardTitle>
        <CardDescription>
          Quản lý thông tin cá nhân và cài đặt tài khoản
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback className="text-lg">
              {getInitials(user.fullName || user.emailAddresses[0]?.emailAddress || 'U')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">
                {user.fullName || 'Chưa cập nhật tên'}
              </h3>
              {isSynced && (
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Đã đồng bộ
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.emailAddresses[0]?.emailAddress}</span>
              {user.emailAddresses[0]?.verification?.status === 'verified' && (
                <Badge variant="outline" className="text-xs">
                  Đã xác thực
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Tham gia {formatDate(user.createdAt!)}</span>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Fanpages</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Bài viết</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Đã lên lịch</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Tương tác</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(user.profileImageUrl, '_blank')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt Clerk
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              // TODO: Implement profile edit
              console.log('Edit profile')
            }}
          >
            <User className="h-4 w-4 mr-2" />
            Chỉnh sửa hồ sơ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const UserProfileSkeleton = () => (
  <Card className="w-full max-w-2xl">
    <CardHeader>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-64" />
    </CardHeader>
    
    <CardContent className="space-y-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
      
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </CardContent>
  </Card>
)
