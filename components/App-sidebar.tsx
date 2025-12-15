"use client"
import { GithubIcon, BookOpen, Settings, MoonIcon, SunIcon, LogOutIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { data: session, isPending } = useSession();
    const pathname = usePathname();

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

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    }

    if (isPending) {
        return (
            <div className="w-64 h-screen bg-background border-r flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    const user = session?.user;
    const userName = user?.name || 'User';
    const userEmail = user?.email || null;
    const userInitial = userName?.charAt(0)?.toUpperCase() || 'U';

    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <div className="flex flex-col gap-4 px-3 py-7">
                    <div className="flex items-center gap-4 px-3 py-5 rounded-lg bg-sidebar-accent/5 hover:bg-sidebar-accent">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                            <GithubIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                                Connected Account
                            </p>
                            <p className="text-sm font-medium text-sidebar-foreground/90">
                                @{userName}
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

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

            <SidebarFooter className="border-t px-3 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="h-12 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors">
                                    <Avatar className="h-10 w-10 rounded-lg shrink-0">
                                        <AvatarImage src={user?.image || undefined} alt={userName} />
                                        <AvatarFallback>{userInitial}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-relaxed min-w-0">
                                        <span className="truncate font-semibold text-base">{userName}</span>
                                        {userEmail && (
                                            <span className="text-xs font-medium text-sidebar-foreground/90 truncate">
                                                {userEmail}
                                            </span>
                                        )}
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                                    {theme === 'dark' ? (
                                        <>
                                            <SunIcon className="mr-2 h-4 w-4" />
                                            <span>Light Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <MoonIcon className="mr-2 h-4 w-4" />
                                            <span>Dark Mode</span>
                                        </>
                                    )}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}