"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
      });
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left section - Marketing */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-md border-2 border-foreground bg-primary p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src="/logo.png"
                alt="Reviewers Logo"
                width={40}
                height={40}
                className="rounded-sm"
              />
            </div>
            <span className="font-poppins text-3xl font-bold tracking-tight text-foreground">
              Reviewers
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="font-poppins text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tighter">
              Cut Code Review
              <span className="block text-primary italic">Time & Bugs.</span>
              <span className="block italic">Instantly.</span>
            </h1>

            <p className="font-sans text-xl text-foreground/70 leading-relaxed max-w-md font-medium">
              Supercharge your team to ship faster with AI-powered code reviews
              that don't sleep.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-0 h-full w-1 bg-secondary rounded-full" />
            <p className="pl-6 font-mono text-sm text-foreground/60 italic">
              "The only reviewer that doesn't complain about whitespace."
            </p>
          </div>
        </div>

        {/* Right section - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md border-2 border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
            <CardHeader className="space-y-2 text-center bg-primary/10 border-b-2 border-foreground py-8">
              <CardTitle className="font-poppins text-3xl font-black text-foreground">
                Welcome Back
              </CardTitle>
              <p className="font-sans text-sm font-bold text-foreground/60 uppercase tracking-widest">
                Ready to Review?
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-poppins font-bold text-lg border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <GithubIcon className="w-6 h-6" />
                    Continue with GitHub
                  </>
                )}
              </Button>

              <div className="space-y-4 text-center">
                <div className="font-sans text-sm font-semibold text-foreground/60">
                  New to Reviewers?{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-bold"
                  >
                    Create an account
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-foreground/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-widest text-foreground/40">
                <a href="#" className="hover:text-primary transition-colors">
                  Terms
                </a>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
