"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export const Pricing = () => {
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
    <section className="container mx-auto px-4 py-20 bg-background/50 rounded-3xl border-2 border-dashed border-foreground/20">
      <div className="mb-16 text-center">
        <h2 className="font-poppins text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pricing that <span className="text-secondary italic">actually</span>{" "}
          makes sense.
        </h2>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* Free Plan */}
        <div className="relative flex flex-col rounded-2xl border-2 border-foreground bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground/60">
            Hobbyist
          </div>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-4xl font-black text-foreground">$0</span>
            <span className="text-foreground/60">/ forever</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 font-sans font-medium text-foreground">
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-secondary" />
              10 Repositories
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-secondary" />
              Basic Review Comments
            </li>
            <li className="flex items-center gap-3 text-foreground/40 line-through">
              Priority Support
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-foreground font-poppins font-bold bg-transparent hover:bg-foreground hover:text-white transition-colors"
            onClick={handleLogin}
          >
            Get Started
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="relative flex flex-col rounded-2xl border-2 border-foreground bg-[#fdedc9] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-[1.05] z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-foreground bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
            Most Loved
          </div>
          <div className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground/60">
            Team
          </div>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-4xl font-black text-foreground">$19</span>
            <span className="text-foreground/60">/ month</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 font-sans font-medium text-foreground">
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              Unlimited Repositories
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              Priority AI Review
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              Custom Style Guides
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              Priority Support
            </li>
          </ul>
          <Button
            className="w-full h-12 border-2 border-foreground bg-primary font-poppins font-bold text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            onClick={handleLogin}
          >
            Join the Team
          </Button>
        </div>
      </div>
    </section>
  );
};
