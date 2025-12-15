import { AuthWrapper } from "@/components/AuthWrapper";
import LoginUI from "@/module/auth/components/Loginui";

export default function HomePage() {
  return (
    <AuthWrapper>
      <LoginUI />
    </AuthWrapper>
  );
}