"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { GithubIcon, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginUI() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/dashboard"
      });
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 z-50">
      <div className="h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left section - Marketing */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 text-2xl font-bold text-white">
                <Image 
                  src="/logo.png" 
                  alt="Reviewers Logo" 
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span>Reviewers</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                Cut Code Review
                <span className="block">Time & Bugs in Half.</span>
                <span className="block">Instantly.</span>
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-md">
                Supercharge your team to ship faster with the most advanced AI
                code reviews.
              </p>
            </div>
          </div>

          {/* Right section - Login Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-sm bg-transparent border-0">
              <CardHeader className="space-y-4 text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                <CardDescription className="text-slate-300">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-600 gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <GithubIcon className="w-5 h-5" />
                      Continue with GitHub
                    </>
                  )}
                </Button>

                <div className="space-y-4 text-center text-sm text-slate-300">
                  <div>
                    New to CodeHorse?{" "}
                    <a href="#" className="text-white hover:text-slate-200 font-medium">
                      Continue with Reviwer
                    </a>
                  </div>
                  <div>
                    <a href="#" className="text-white hover:text-slate-200 font-medium">
                      Self-Hosted Services
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <a href="#" className="hover:text-slate-300 transition-colors">
                    Terms of Use
                  </a>
                  <span>and</span>
                  <a href="#" className="hover:text-slate-300 transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}