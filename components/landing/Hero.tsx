"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const handleLogin = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
      });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="font-poppins text-5xl font-extrabold leading-tight tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            Code Reviews on{" "}
            <span className="text-primary italic">Autopilot.</span>
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg text-foreground/80 md:text-xl">
            Stop merging bugs. Let AI review your PRs instantly, enforce style
            guides, and catch security issues before your team does.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              size="lg"
              className="h-14 px-8 rounded-md border-2 border-foreground bg-primary font-poppins text-xl font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              onClick={handleLogin}
            >
              Review My Code
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="flex flex-col gap-6 sm:flex-row lg:flex-col xl:flex-row items-center">
            {/* Bad Code Card */}
            <div className="w-full max-w-[280px] -rotate-2 rounded-lg border-2 border-foreground bg-[#ff8a8a] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-2 h-3 w-3 rounded-full bg-red-800" />
              <div className="space-y-2 font-mono text-xs text-red-950">
                <p>{"if (user == admin) {"}</p>
                <p className="pl-4">{"delete_all();"}</p>
                <p>{"}"}</p>
              </div>
              <div className="mt-4 flex items-center justify-center rounded border-2 border-red-900 bg-red-100/50 p-1 text-[10px] font-bold text-red-900">
                SECURITY RISK!
              </div>
            </div>

            <div className="flex items-center justify-center rotate-0 lg:rotate-90 xl:rotate-0">
              <ArrowRight className="h-12 w-12 text-foreground" />
            </div>

            {/* Fixed Code Card */}
            <div className="w-full max-w-[280px] rotate-2 rounded-lg border-2 border-foreground bg-secondary p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-2 h-3 w-3 rounded-full bg-teal-900" />
              <div className="space-y-2 font-mono text-xs text-teal-950">
                <p>{"if (user.role === 'admin') {"}</p>
                <p className="pl-4">{"await safeDelete(id);"}</p>
                <p>{"}"}</p>
              </div>
              <div className="mt-4 flex items-center justify-center rounded border-2 border-teal-900 bg-teal-100/50 p-1 text-[10px] font-bold text-teal-900">
                FIXED & SECURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
