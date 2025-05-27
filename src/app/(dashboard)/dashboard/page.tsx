import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Package,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Facebook,
  Download,
  Plus
} from "lucide-react"

// Mock data for Facebook Ads dashboard
const stats = [
  {
    title: "Tổng bài viết",
    value: "124",
    change: "+12",
    trend: "up",
    icon: Package,
  },
  {
    title: "Fanpages kết nối",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Facebook,
  },
  {
    title: "Bài viết đã lên lịch",
    value: "45",
    change: "+8",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Tương tác trung bình",
    value: "2.4K",
    change: "+15%",
    trend: "up",
    icon: TrendingUp,
  },
]

const recentPosts = [
  {
    title: "Khuyến mãi cuối năm 2024",
    page: "Shop ABC Official",
    status: "Đã đăng",
    engagement: "1.2K",
  },
  {
    title: "Sản phẩm mới ra mắt",
    page: "Brand XYZ",
    status: "Đã lên lịch",
    engagement: "0",
  },
  {
    title: "Chia sẻ kinh nghiệm",
    page: "Personal Blog",
    status: "Đã đăng",
    engagement: "856",
  },
  {
    title: "Thông báo sự kiện",
    page: "Event Page",
    status: "Nháp",
    engagement: "0",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Chào mừng trở lại! Đây là tổng quan về hoạt động Facebook của bạn.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Tạo bài viết
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-smooth hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Placeholder */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Thống kê tương tác</CardTitle>
            <CardDescription>
              Tổng quan tương tác trong 6 tháng qua
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Biểu đồ sẽ được triển khai với Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Bài viết gần đây</CardTitle>
            <CardDescription>
              Bạn đã tạo {recentPosts.length} bài viết trong tháng này.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {post.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {post.page}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm font-medium">
                      {post.engagement} tương tác
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {post.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>
            Các tác vụ thường dùng và phím tắt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Tạo bài viết
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Kết nối Fanpage
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Xem thống kê
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Xuất dữ liệu
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Cài đặt hệ thống
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
