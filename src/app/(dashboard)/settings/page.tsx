import { UserProfile } from '@/components/auth/user-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Trash2,
  Download
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý tài khoản và tùy chỉnh trải nghiệm của bạn
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Profile */}
        <div className="lg:col-span-2">
          <UserProfile />
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Thông báo
              </CardTitle>
              <CardDescription>
                Cấu hình thông báo và cảnh báo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-sm">
                  Email thông báo
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="post-notifications" className="text-sm">
                  Thông báo bài viết
                </Label>
                <Switch id="post-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="error-notifications" className="text-sm">
                  Cảnh báo lỗi
                </Label>
                <Switch id="error-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật
              </CardTitle>
              <CardDescription>
                Cài đặt bảo mật và quyền riêng tư
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="text-sm">
                  Xác thực 2 bước
                </Label>
                <Switch id="two-factor" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout" className="text-sm">
                  Tự động đăng xuất
                </Label>
                <Switch id="session-timeout" defaultChecked />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Quản lý phiên đăng nhập
              </Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Giao diện
              </CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện ứng dụng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-sm">
                  Chế độ tối
                </Label>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode" className="text-sm">
                  Giao diện compact
                </Label>
                <Switch id="compact-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="text-sm">
                  Hiệu ứng động
                </Label>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Dữ liệu
              </CardTitle>
              <CardDescription>
                Quản lý và xuất dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Xuất dữ liệu
              </Button>
              
              <Button variant="outline" size="sm" className="w-full">
                Xóa cache
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tài khoản
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
