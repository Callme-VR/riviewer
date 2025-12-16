import { Suspense } from "react";
import { AuthWrapper } from "@/components/AuthWrapper";
import LoginUI from "@/module/auth/components/Loginui";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner /></div>}>
      <AuthWrapper>
        <LoginUI />
      </AuthWrapper>
    </Suspense>
  );
}