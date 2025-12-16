"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  const [isClient] = useState(() => typeof window !== "undefined");
  const success = searchParams?.get("success");

  useEffect(() => {
    // If we're not loading and there's no session, redirect to login
    if (isClient && !isPending && !session) {
      // Special handling for subscription success - redirect to dashboard after login
      if (success === "true") {
        // Store the intended destination in sessionStorage
        sessionStorage.setItem("postLoginRedirect", "/dashboard/subscription?success=true");
        router.push("/login");
      } else {
        router.push("/login");
      }
    }
  }, [session, isPending, router, isClient, success]);

  // While checking auth or if user is authenticated, render children
  // If not authenticated, the effect will redirect
  return <>{children}</>;
}
