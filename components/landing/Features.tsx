"use client";
import React from "react";
import { Timer, ShieldCheck, Zap } from "lucide-react";

export const Features = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h2 className="font-poppins text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Built for <span className="text-primary">Playful Efficiency.</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Instant Feedback Card */}
        <div className="group rounded-xl border-2 border-foreground bg-card p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground bg-[#b2e1eb] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Timer className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="font-poppins text-2xl font-bold text-foreground">
            Instant Feedback
          </h3>
          <p className="mt-4 font-sans text-foreground/70">
            Human: 4 hours. AI: 4 seconds. Get your code reviewed before you
            even finish your coffee.
          </p>
        </div>

        {/* Security Scanner Card */}
        <div className="group rounded-xl border-2 border-foreground bg-card p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground bg-secondary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="font-poppins text-2xl font-bold text-foreground">
            Security Scanner
          </h3>
          <p className="mt-4 font-sans text-foreground/70">
            Identify SQL injections, XSS, and hardcoded secrets automatically.
            Lock your doors, cryptographically.
          </p>
        </div>

        {/* Style Enforcer Card */}
        <div className="group rounded-xl border-2 border-foreground bg-card p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-poppins text-2xl font-bold text-foreground">
            Style Enforcer
          </h3>
          <p className="mt-4 font-sans text-foreground/70">
            Linting on steroids. Enforce team-specific patterns and best
            practices without the nagging.
          </p>
        </div>
      </div>
    </section>
  );
};
