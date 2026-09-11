"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, MoveRight, CreditCard } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { motion, Variants } from "framer-motion";

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const handleLogin = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: (process.env.NEXT_PUBLIC_APP_URL || "") + "/dashboard",
      });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section id="pricing" className="relative bg-background py-20 md:py-28 px-4 md:px-8 border-t border-border-strong/60">
      <div className="container relative z-10 mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs">
            <CreditCard className="h-3.5 w-3.5 text-[#f54e00]" />
            <span>SIMPLE PRICING</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-foreground">
            Simple plans for <span className="italic font-normal text-[#f54e00]">ambitious developers.</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Start reviewing public and private repositories today. Upgrade whenever your team scales.
          </p>

          {/* Billing Interval Switcher */}
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-xs font-mono font-medium transition-colors ${!isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
            >
              Monthly Billing
            </button>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-border-strong p-0.5 transition-colors focus:outline-hidden"
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-[#f54e00] transition-transform ${isAnnual ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className={`text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards with Staggered Viewport Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {/* Hobby Tier */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-xl border border-border-strong bg-card p-8 md:p-10 flex flex-col justify-between space-y-8 shadow-xs hover:border-foreground/30 transition-all"
          >
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Individual</span>
                <h3 className="font-sans text-2xl font-semibold text-foreground mt-1">Hobbyist</h3>
                <p className="font-sans text-sm text-muted-foreground mt-2">
                  Perfect for solo developers and personal side projects.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-sans text-4xl md:text-5xl font-normal text-foreground">$0</span>
                <span className="font-sans text-sm text-muted-foreground">/ month</span>
              </div>

              <ul className="space-y-3 font-sans text-sm text-muted-foreground pt-4 border-t border-border-strong/60">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Up to 10 GitHub repositories</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Standard AI PR Review & Security Scanner</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Interactive 5-stage timeline visualizer</span>
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              onClick={handleLogin}
              className="h-11 w-full rounded-md border-border-strong bg-canvas-soft text-foreground hover:bg-muted font-medium transition-all"
            >
              Get Started Free
            </Button>
          </motion.div>

          {/* Featured Tier (Inverted Ink per cursor/DESIGN.md spec) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative rounded-xl border border-[#26251e] bg-[#26251e] text-[#f7f7f4] p-8 md:p-10 flex flex-col justify-between space-y-8 shadow-md"
          >
            <div className="absolute -top-3 right-6 rounded-full bg-[#f54e00] px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-xs">
              POPULAR
            </div>

            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#a09c92]">Team Tier</span>
                <h3 className="font-sans text-2xl font-semibold text-white mt-1">Pro Team</h3>
                <p className="font-sans text-sm text-[#a09c92] mt-2">
                  For engineering teams who want automated code reviews on every commit.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-sans text-4xl md:text-5xl font-normal text-white">
                  ${isAnnual ? "15" : "19"}
                </span>
                <span className="font-sans text-sm text-[#a09c92]">
                  / seat / month {isAnnual && "(billed annually)"}
                </span>
              </div>

              <ul className="space-y-3 font-sans text-sm text-[#e6e5e0] pt-4 border-t border-white/10">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Unlimited GitHub repositories & PRs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Priority AI inference & processing queue</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>Custom team style & lint rules guard</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#f54e00]" />
                  <span>24/7 Priority support & Slack bot sync</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleLogin}
              className="h-11 w-full rounded-md bg-[#f54e00] text-white hover:bg-[#d04200] font-medium transition-all shadow-xs group"
            >
              Start 14-Day Free Trial
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


