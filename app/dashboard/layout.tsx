import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/App-sidebar";
import { AuthWrapper } from "@/components/AuthWrapper";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthWrapper>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-3 border-b px-5">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mx-2 h-4" orientation="vertical" />
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </header>
          <main className="flex-1 overflow-hidden p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthWrapper>
  );
}