"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";
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
    <section
      id="pricing"
      className="bg-[#0a0a0a] py-20 sm:py-32 px-4 sm:px-6 lg:px-12"
    >
      <div className="container mx-auto">
        <div className="mb-16 sm:mb-24 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-6xl px-4">
            Simple pricing for{" "}
            <span className="italic font-normal text-orange-500">
              serious teams.
            </span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 transition-all hover:border-white/20">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-medium text-white mb-2">
                Hobbyist
              </h3>
              <p className="font-sans text-[10px] sm:text-sm text-white/40 font-medium uppercase tracking-widest">
                Free Forever
              </p>
            </div>

            <div className="mb-8 sm:mb-10 flex items-baseline gap-1">
              <span className="font-serif text-4xl sm:text-5xl font-medium text-white">
                $0
              </span>
              <span className="font-sans text-sm sm:text-base text-white/40">
                /month
              </span>
            </div>

            <ul className="mb-8 sm:mb-10 flex-1 space-y-3 sm:space-y-4 font-sans text-sm sm:text-base text-white/60">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                10 Repositories
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Basic AI Review
              </li>
              <li className="flex items-center gap-3 text-white/20 line-through">
                Priority Support
              </li>
            </ul>

            <Button
              variant="outline"
              className="h-12 sm:h-14 rounded-2xl border-white/10 bg-white/5 font-poppins text-base sm:text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
              onClick={handleLogin}
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="group relative flex flex-col rounded-3xl border border-orange-500/30 bg-orange-500/5 p-8 sm:p-10 transition-all hover:border-orange-500/50 shadow-[0_0_50px_rgba(255,77,21,0.05)]">
            <div className="absolute -top-4 right-6 sm:right-10 rounded-full bg-orange-500 px-3 py-1 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-widest">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="font-serif text-2xl font-medium text-white mb-2">
                Team
              </h3>
              <p className="font-sans text-[10px] sm:text-sm text-orange-500/80 font-bold uppercase tracking-widest">
                Scaling Fast
              </p>
            </div>

            <div className="mb-8 sm:mb-10 flex items-baseline gap-1">
              <span className="font-serif text-4xl sm:text-5xl font-medium text-white">
                $19
              </span>
              <span className="font-sans text-sm sm:text-base text-white/40">
                /month
              </span>
            </div>

            <ul className="mb-8 sm:mb-10 flex-1 space-y-3 sm:space-y-4 font-sans text-sm sm:text-base text-white/80">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Unlimited Repositories
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Priority AI Review
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Custom Style Guides
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                24/7 Priority Support
              </li>
            </ul>

            <Button
              onClick={handleLogin}
              className="h-12 sm:h-14 rounded-2xl bg-orange-500 font-poppins text-base sm:text-lg font-bold text-white transition-all hover:bg-orange-500/90 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,77,21,0.2)]"
            >
              Join the Team
              <MoveRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
