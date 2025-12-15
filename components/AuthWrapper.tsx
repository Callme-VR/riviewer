"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isClient] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    // If we're not loading and there's no session, redirect to login
    if (isClient && !isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router, isClient]);

  // While checking auth or if user is authenticated, render children
  // If not authenticated, the effect will redirect
  return <>{children}</>;
}
