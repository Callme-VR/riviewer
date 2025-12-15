"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-client-wrapper";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const { session, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useState(() => {
    setIsClient(true);
  });

  useEffect(() => {
    // If we're not loading and there's no session, redirect to login
    if (isClient && !isLoading && !session) {
      router.push("/login");
    }
  }, [session, isLoading, router, isClient]);

  // While checking auth or if user is authenticated, render children
  // If not authenticated, the effect will redirect
  return <>{children}</>;
}
