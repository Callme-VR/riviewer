import { Button } from "@/components/ui/button";
import Logout from "@/module/auth/components/Logout";
import { requireAuth } from "@/module/auth/utils/auth-utils";

export default async function HomePage() {
  // Require authenticated user
  await requireAuth()

  return (
    <div className="text-center text-4xl">
      <Logout >
        <Button>Logout</Button>
      </Logout>
    </div>
  )
} 