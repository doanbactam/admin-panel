import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Facebook,
  Calendar,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield
} from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { AuthTest } from "@/components/auth/auth-test"

const features = [
  {
    icon: Facebook,
    title: "Kết nối Facebook",
    description: "Kết nối và quản lý nhiều tài khoản Facebook, fanpage một cách dễ dàng"
  },
  {
    icon: Calendar,
    title: "Lên lịch đăng bài",
    description: "Lên lịch đăng bài tự động theo thời gian bạn muốn"
  },
  {
    icon: BarChart3,
    title: "Thống kê chi tiết",
    description: "Theo dõi hiệu quả bài viết với thống kê tương tác chi tiết"
  },
  {
    icon: Users,
    title: "Quản lý đa tài khoản",
    description: "Quản lý nhiều fanpage và tài khoản từ một dashboard duy nhất"
  }
]

const benefits = [
  "Tiết kiệm thời gian với tính năng lên lịch tự động",
  "Tăng hiệu quả marketing với thống kê chi tiết",
  "Quản lý tập trung nhiều fanpage",
  "Giao diện thân thiện, dễ sử dụng",
  "Bảo mật cao với Clerk Authentication",
  "Hỗ trợ đa nền tảng"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            Công cụ quản lý Facebook hàng đầu
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Facebook Ads
            <span className="text-primary"> Admin Panel</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quản lý, lên lịch và đăng bài Facebook tự động.
            Tăng hiệu quả marketing với thống kê chi tiết và giao diện thân thiện.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-8">
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Vào Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>

            <Button variant="outline" size="lg" className="text-lg px-8">
              Xem demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tất cả những gì bạn cần để quản lý Facebook marketing hiệu quả
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-lg text-muted-foreground">
              Giải pháp toàn diện cho việc quản lý Facebook marketing của bạn
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg">
                    Bắt đầu ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg">
                    Vào Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>

          <div className="relative">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Bảo mật cao</h3>
                    <p className="text-sm text-muted-foreground">Clerk Authentication</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Facebook className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Tích hợp Facebook</h3>
                    <p className="text-sm text-muted-foreground">API chính thức</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Thống kê real-time</h3>
                    <p className="text-sm text-muted-foreground">Dữ liệu cập nhật liên tục</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Auth Test Section - Only for development */}
      {process.env.NODE_ENV === 'development' && (
        <section className="container mx-auto px-4 py-10">
          <div className="flex justify-center">
            <AuthTest />
          </div>
        </section>
      )}
    </div>
  )
}
