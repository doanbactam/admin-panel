import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Đăng ký
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tạo tài khoản Facebook Ads Admin Panel
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-border",
            }
          }}
        />
      </div>
    </div>
  )
}
