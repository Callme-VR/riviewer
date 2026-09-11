"use client";
import React, { useState } from "react";
import { Timer, ShieldCheck, Zap, Cpu, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

const timelinePills = [
  { stage: "Thinking", color: "#dfa88f", text: "#26251e", step: "1. Parsing PR AST & modified dependencies" },
  { stage: "Reading", color: "#9fbbe0", text: "#26251e", step: "2. Inspecting imports, types, & schema relations" },
  { stage: "Grepping", color: "#9fc9a2", text: "#26251e", step: "3. Searching repository usages & function signatures" },
  { stage: "Editing", color: "#c0a8dd", text: "#26251e", step: "4. Formulating actionable diff code review suggestions" },
  { stage: "Done", color: "#c08532", text: "#ffffff", step: "5. Posting automated review report directly to GitHub PR" },
];

export const Features = () => {
  const [selectedPill, setSelectedPill] = useState(0);

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
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section id="features" className="relative bg-background py-20 md:py-28 px-4 md:px-8 border-t border-border-strong/60">


      <div className="container relative z-10 mx-auto max-w-6xl space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs">
            <Cpu className="h-3.5 w-3.5 text-[#f54e00]" />
            <span>AI ARCHITECTURE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-foreground">
            Built for <span className="italic font-normal text-[#f54e00]">editorial precision.</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Every code review is executed through a 5-stage AI timeline system—giving your team instant feedback, security assurance, and consistent code quality.
          </p>
        </motion.div>

        {/* Feature Cards Grid with Staggered Viewport Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {/* Feature 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-xl border border-border-strong bg-card p-6 md:p-8 space-y-4 hover:border-foreground/30 transition-all shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-canvas-soft text-[#f54e00]">
              <Timer className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-lg font-medium text-foreground">
              Instant Automated Feedback
            </h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Human reviews take hours. Reviewers scans diffs, runs deep AST checks, and leaves structured feedback before your build finishes.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-xl border border-border-strong bg-card p-6 md:p-8 space-y-4 hover:border-foreground/30 transition-all shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-canvas-soft text-[#9fc9a2]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-lg font-medium text-foreground">
              Security Vulnerability Guard
            </h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Automatically flag SQL injection risk, missing authorization guards, unhandled promises, and hardcoded API credentials.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-xl border border-border-strong bg-card p-6 md:p-8 space-y-4 hover:border-foreground/30 transition-all shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-canvas-soft text-[#c0a8dd]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-lg font-medium text-foreground">
              Custom Style Guard
            </h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Enforce your repository's exact architecture standards, naming conventions, and docstring rules automatically.
            </p>
          </motion.div>
        </motion.div>

        {/* Signature AI Action Timeline Visualization Section */}
        <motion.div
          id="timeline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-xl border border-border-strong bg-card p-6 md:p-10 space-y-6 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-strong pb-6">
            <div>
              <span className="font-mono text-xs font-semibold text-[#f54e00] uppercase tracking-wider">Product Signature</span>
              <h3 className="font-sans text-2xl font-normal tracking-tight text-foreground mt-1">
                The 5-Stage AI Agent Timeline
              </h3>
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-md">
              Watch how our agent transitions across stage tokens inside your pull request workflow:
            </p>
          </div>

          {/* Pastel Timeline Pills Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {timelinePills.map((item, idx) => (
              <button
                key={item.stage}
                onClick={() => setSelectedPill(idx)}
                style={{
                  backgroundColor: item.color,
                  color: item.text,
                  opacity: selectedPill === idx ? 1 : 0.65,
                }}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${selectedPill === idx ? "ring-2 ring-foreground scale-105" : "hover:opacity-90"
                  }`}
              >
                {item.stage}
              </button>
            ))}
          </div>

          {/* Interactive Timeline Detail Box */}
          <motion.div
            key={selectedPill}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border-strong bg-canvas-soft p-4 md:p-6 font-mono text-xs text-foreground flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: timelinePills[selectedPill].color }}
              />
              <span className="font-semibold text-sm">{timelinePills[selectedPill].stage} Phase:</span>
              <span className="text-muted-foreground">{timelinePills[selectedPill].step}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-sans text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#9fc9a2]" /> Live Timeline Visualization
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


