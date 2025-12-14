"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  useEffect(() => {
    // If we're not pending and there's no session, redirect to login
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);
  
  // While checking auth or if user is authenticated, render children
  // If not authenticated, the effect will redirect
  return <>{children}</>;
}