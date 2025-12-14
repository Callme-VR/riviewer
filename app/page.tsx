import { AuthWrapper } from "@/components/AuthWrapper";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to dashboard - auth will be handled by the dashboard layout
  redirect('/dashboard');
}