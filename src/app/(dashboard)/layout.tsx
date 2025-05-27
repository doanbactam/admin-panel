import { AuthGuard } from '@/components/auth/auth-guard'
import { UserSyncProvider } from '@/components/providers/user-sync-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <UserSyncProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 overflow-auto p-6 scrollbar-thin">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </UserSyncProvider>
    </AuthGuard>
  )
}
