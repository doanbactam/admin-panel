import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Đăng nhập
          </h1>
          <p className="mt-2 text-muted-foreground">
            Đăng nhập vào Facebook Ads Admin Panel
          </p>
        </div>
        <SignIn 
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
