"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Logout({ 
  children, 
  className, 
  redirectUrl = "/login" 
}: { 
  children: React.ReactNode; 
  className?: string;
  redirectUrl?: string;
}) {
  const router = useRouter();
  
  const handleLogout = useCallback(async () => {
    try {
      // Sign out and wait for the promise to resolve
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            // Use a slight delay to ensure the session is fully cleared
            setTimeout(() => {
              router.push(redirectUrl);
            }, 100);
          }
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, still redirect to login page
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  return (
    <span 
      className={className} 
      onClick={handleLogout}
    >
      {children}
    </span>
  );
}