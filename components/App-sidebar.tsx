"use client"
import { GithubIcon, BookOpen, Settings, MoonIcon, SunIcon, LogOutIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarSeparator, SidebarMenuButton } from "./ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

import Link from "next/link"
import Logout from "@/module/auth/components/Logout"

export default function AppSidebar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, [])

    const navigationItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: BookOpen,
        },
        {
            name: "Repository",
            href: "/dashboard/repository",
            icon: GithubIcon,
        },
        {
            name: "Reviews",
            href: "/dashboard/reviews",
            icon: BookOpen,
        },
        {
            name: "Subscriptions",
            href: "/dashboard/subscriptions",
            icon: BookOpen,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        }
    ]
    
    const isActive = (url: string) => {
        return pathname === url;
    }
    
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    if (!mounted) return null;

    const user = session?.user;
    const userAvatar = user?.image;
    const userName = user?.name;
    const userEmail = user?.email;
    const userInitial = userName?.charAt(0)?.toUpperCase() || 'U';

    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <div className="flex flex-col gap-4 px-3 py-7">
                    <div className="flex items-center gap-4 px-3 py-5 rounded-lg bg-sidebar-accent/5 hover:bg-sidebar-accent">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                            <GithubIcon className="h-5 w-5" />
                        </div>

                        {/* for written section in left of github icons */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                                Connected Account
                            </p>
                            <p className="text-sm font-medium text-sidebar-foreground/90">
                                @{userName || 'User'}
                            </p>
                        </div>

                    </div>

                </div>

            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="px-3 flex-col gap-1 py-6">
                <div className="mb-2">
                    <p className="text-xs font-semibold text-sidebar-foreground/60 mb-3 px-3 uppercase tracking-widest">
                        Menu
                    </p>
                </div>

                <SidebarMenu>
                    {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton 
                                className={`h-11 rounded-lg px-4 transition-all duration-200 ${
                                    isActive(item.href) 
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" 
                                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                }`} 
                                asChild
                            >
                                <Link href={item.href} className="flex items-center gap-3">
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarContent>

            {/* SE */}
            <SidebarFooter className="border-t px-3 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="h-12 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors">
                                    <Avatar className="h-10 w-10 rounded-lg shrink-0">
                                        <AvatarImage src={userAvatar || undefined} alt={userName || 'User'} />
                                        <AvatarFallback>{userInitial}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-relaxed min-w-0">
                                        <span className="truncate font-semibold text-base">{userName || 'User'}</span>
                                        <span className="text-xs font-medium text-sidebar-foreground/90">{userEmail || 'user@example.com'}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            {/* for dark and light mode */}
                            <DropdownMenuContent sideOffset={8} className="w-80 rounded-lg" side="right" align="end">
                                <div className="px-2 py-3 border-t border-b">
                                    <DropdownMenuItem asChild>
                                        <button 
                                            onClick={toggleTheme}
                                            className="w-full px-3 py-3 flex items-center gap-2 cursor-pointer rounded-md hover:bg-sidebar-accent/50 transition-colors text-sm font-medium"
                                        >
                                            {theme === "dark" ? (
                                                <>
                                                    <SunIcon className="h-4 w-4 shrink-0" />
                                                    <span>Light</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MoonIcon className="h-4 w-4 shrink-0" />
                                                    <span>Dark</span>
                                                </>
                                            )}
                                        </button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer px-3 py-3 flex items-center gap-2 rounded-md hover:bg-sidebar-accent/50 transition-colors text-sm font-medium hover:text-red-500">
                                        <LogOutIcon className="h-5 w-5 mr-3 shrink-0" />
                                        <Logout redirectUrl="/login">Sign out</Logout>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}