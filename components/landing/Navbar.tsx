"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { ChevronRight } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

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
    <div className="fixed top-6 z-50 flex w-full justify-center px-4">
      <nav className="flex h-14 items-center gap-4 sm:gap-8 rounded-full border border-white/10 bg-[#121212]/80 px-3 sm:px-6 py-2 backdrop-blur-xl shadow-2xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-white/5 p-1.5 border border-white/10">
            <Image
              src="/logo.png"
              alt="Reviewers Logo"
              width={20}
              height={20}
              className="brightness-125"
            />
          </div>
          <span className="font-bricolage text-base sm:text-lg font-bold tracking-tight text-white hidden sm:block cursor-pointer">
            Reviewers
          </span>
        </Link>

        <div className="hidden items-center gap-4 sm:gap-6 md:flex">
          {["Features", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 transition-colors hover:text-orange-500"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <Button
            onClick={handleLogin}
            className="group relative h-9 rounded-full bg-[#ff4d15] px-4 sm:px-5 font-poppins text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#ff4d15]/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,77,21,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Login
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Button>
        </div>
      </nav>
    </div>
  );
};
