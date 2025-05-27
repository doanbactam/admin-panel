'use client'

import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  XCircle,
  User,
  Shield,
  Loader2
} from 'lucide-react'

export const AuthTest = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Đang tải...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Authentication Test
        </CardTitle>
        <CardDescription>
          Test Clerk authentication và theme
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Authentication Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Trạng thái đăng nhập:</span>
          <Badge variant={isSignedIn ? "default" : "secondary"} className="flex items-center gap-1">
            {isSignedIn ? (
              <>
                <CheckCircle className="h-3 w-3" />
                Đã đăng nhập
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Chưa đăng nhập
              </>
            )}
          </Badge>
        </div>

        {/* User Info */}
        {isSignedIn && user && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Thông tin user:</span>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div>Tên: {user.fullName || 'Chưa cập nhật'}</div>
              <div>Email: {user.emailAddresses[0]?.emailAddress}</div>
              <div>ID: {user.id}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t">
          {isSignedIn ? (
            <div className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard">Vào Dashboard</a>
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/test-clerk')
                    const data = await response.json()
                    console.log('Test Clerk API:', data)
                    alert(response.ok ? 'API hoạt động!' : `Lỗi: ${data.error}`)
                  } catch (error) {
                    console.error('Error:', error)
                    alert('Lỗi kết nối API')
                  }
                }}
              >
                Test Clerk API
              </Button>
              <SignOutButton>
                <Button variant="destructive" className="w-full">
                  Đăng xuất
                </Button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">
                Đăng nhập / Đăng ký
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Theme Test */}
        <div className="pt-4 border-t">
          <div className="text-sm font-medium mb-2">Theme Test:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-background border rounded">Background</div>
            <div className="p-2 bg-muted border rounded">Muted</div>
            <div className="p-2 bg-primary text-primary-foreground rounded">Primary</div>
            <div className="p-2 bg-secondary text-secondary-foreground rounded">Secondary</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
