"use client";

import React from "react";
import { Check, X, ArrowRight, Zap, Shield, Clock, Brain } from "lucide-react";
import { motion } from "framer-motion";

const comparisonRows = [
  {
    feature: "PR Review Latency",
    manual: "4 to 12 hours waiting on senior engineers",
    ai: "4 seconds automated turnaround",
    icon: Clock,
  },
  {
    feature: "Security Flaw Detection",
    manual: "Human fatigue misses subtle auth & SQL leaks",
    ai: "100% automated AST vulnerability scanning",
    icon: Shield,
  },
  {
    feature: "Team Architecture Rules",
    manual: "Inconsistent linting enforcement across PRs",
    ai: "Strict automated style & lint rule guard",
    icon: Zap,
  },
  {
    feature: "24/7 Availability",
    manual: "Blocked overnight & on weekends",
    ai: "Continuous 24/7 autonomous review pipeline",
    icon: Brain,
  },
];

export const Comparison = () => {
  return (
    <section id="comparison" className="relative bg-background py-20 md:py-28 px-4 md:px-8 border-t border-border-strong/70 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-5xl space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs">
            <Zap className="h-3.5 w-3.5 text-[#f54e00]" />
            <span>SIDE-BY-SIDE ANALYSIS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-foreground">
            Manual PR Reviews <span className="italic font-normal text-[#f54e00]">vs Reviewers AI.</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Stop letting pull requests sit idle for hours. See how switching to automated AI reviews accelerates developer velocity.
          </p>
        </motion.div>

        {/* Comparison Table Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-xl border border-border-strong bg-card overflow-hidden shadow-xs"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border-strong bg-muted/40 p-4 font-mono text-xs font-semibold text-foreground">
            <div className="hidden md:block text-muted-foreground uppercase tracking-wider">Metric / Feature</div>
            <div className="text-red-500 flex items-center gap-1.5 pb-2 md:pb-0">
              <X className="h-4 w-4" /> Traditional Manual Reviews
            </div>
            <div className="text-[#f54e00] flex items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-border-strong">
              <Check className="h-4 w-4" /> Reviewers AI Autopilot
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border-strong/60 font-sans text-xs">
            {comparisonRows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.feature} className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-5 items-center gap-3 hover:bg-canvas-soft transition-colors">
                  <div className="font-medium text-foreground flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#f54e00]" />
                    <span>{row.feature}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>{row.manual}</span>
                  </div>
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f54e00] flex-shrink-0" />
                    <span>{row.ai}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
