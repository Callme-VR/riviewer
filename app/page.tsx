import { requireAuth } from "@/module/auth/utils/auth-utils";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // Require authenticated user
  await requireAuth()

  return redirect('/dashboard');
}