"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Loginui from "@/module/auth/components/Loginui";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (session?.user) {
      // Check for stored redirect destination from sessionStorage
      const storedRedirect = sessionStorage.getItem("postLoginRedirect");
      if (storedRedirect) {
        sessionStorage.removeItem("postLoginRedirect"); // Clear the stored redirect
        router.push(storedRedirect);
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (session?.user) {
    return null; // Will redirect
  }

  return <Loginui />;
}
