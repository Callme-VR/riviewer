"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import Loginui from "@/module/auth/components/Loginui";
import { Spinner } from '@/components/ui/spinner';

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
                router.push('/dashboard');
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <Loginui />
            </div>
        </div>
    );
}