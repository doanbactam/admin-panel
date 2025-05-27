"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  Package,
  Settings,
  Home,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Edit,
  Calendar,
  Cog,
  FolderOpen,
  Image,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Bài viết",
    url: "/posts",
    icon: Edit,
    items: [
      {
        title: "Tất cả bài viết",
        url: "/posts",
      },
      {
        title: "Tạo bài viết",
        url: "/posts/new",
      },
      {
        title: "Lịch đăng bài",
        url: "/calendar",
      },
    ],
  },
  {
    title: "Fanpages",
    url: "/pages",
    icon: Users,
    items: [
      {
        title: "Quản lý trang",
        url: "/pages",
      },
      {
        title: "Kết nối Facebook",
        url: "/pages/connect",
      },
    ],
  },
  {
    title: "Media",
    url: "/media",
    icon: FolderOpen,
    items: [
      {
        title: "Thư viện Media",
        url: "/media",
      },
      {
        title: "Upload File",
        url: "/media?tab=upload",
      },
    ],
  },
  {
    title: "Thống kê",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Cài đặt",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Cog,
    items: [
      {
        title: "Queue Management",
        url: "/admin/queue",
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Facebook Ads</span>
            <span className="truncate text-xs text-muted-foreground">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full justify-between",
                        pathname.startsWith(item.url) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        pathname === item.url && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              pathname === subItem.url && "bg-accent text-accent-foreground"
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 px-2 py-2 h-auto"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin User</span>
                <span className="truncate text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="top"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin User</span>
                  <span className="truncate text-xs text-muted-foreground">
                    admin@example.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
