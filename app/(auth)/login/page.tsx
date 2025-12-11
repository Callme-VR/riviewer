import Loginui from "@/module/auth/components/Loginui";
import { requireunAuth } from "@/module/auth/utils/auth-utils";

export default async function Loginpage() {
    // Require unauthenticated user
    await requireunAuth();
    return (
        <div>
            <Loginui />
        </div>
    )
}