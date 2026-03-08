"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export const Navbar = () => {
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
    <nav className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md border-2 border-foreground bg-primary p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="/logo.png"
              alt="Reviewers Logo"
              width={24}
              height={24}
              className="rounded-sm"
            />
          </div>
          <span className="font-poppins text-xl font-bold tracking-tight text-foreground">
            Reviewers
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="font-poppins font-semibold text-foreground hover:bg-transparent hover:text-primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            className="rounded-md border-2 border-foreground bg-primary font-poppins font-bold text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            onClick={handleLogin}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
