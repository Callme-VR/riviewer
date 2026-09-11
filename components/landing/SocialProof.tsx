"use client";
import React from "react";
import { GitMerge, Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    name: "Alex Rivera",
    handle: "@alexcodes",
    role: "Staff Engineer at Vercel",
    text: "Reviewers caught a critical SQL injection vulnerability in a 400-line PR that two human reviewers missed. It's like having an automated security auditor on call 24/7.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    handle: "@schen_dev",
    role: "Tech Lead at Stripe",
    text: "The 5-stage timeline visualizer keeps PR reviews transparent and ridiculously fast. Our average PR turnaround dropped from 6 hours down to 9 minutes.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Marcus Aurelius",
    handle: "@marcus_dev",
    role: "Open Source Maintainer",
    text: "Enforcing repository design guides automatically without human friction is a superpower. Every PR merged into our core branch now adheres to our style guide.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
];

const metrics = [
  { value: "50,000+", label: "PRs Reviewed" },
  { value: "98%", label: "Faster Cycle Time" },
  { value: "< 4s", label: "Average AI Latency" },
  { value: "0", label: "False Positives Swallowed" },
];

export const SocialProof = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section id="testimonials" className="relative bg-background py-20 md:py-28 px-4 md:px-8 border-t border-border-strong/60">


      <div className="container relative z-10 mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs">
            <GitMerge className="h-3.5 w-3.5 text-[#f54e00]" />
            <span>DEVELOPER PROOF</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-foreground">
            Loved by <span className="italic font-normal text-[#f54e00]">engineering teams.</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            See how lead developers and open-source maintainers ship cleaner code faster.
          </p>
        </motion.div>

        {/* Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl border border-border-strong bg-card p-6 md:p-8 shadow-xs"
        >
          {metrics.map((m) => (
            <div key={m.label} className="text-center space-y-1">
              <div className="font-sans text-3xl md:text-4xl font-normal tracking-tight text-foreground">{m.value}</div>
              <div className="font-sans text-xs text-muted-foreground font-medium uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid with Staggered Viewport Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.handle}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-xl border border-border-strong bg-card p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-foreground/30 transition-all shadow-xs"
            >
              <div className="space-y-4">
                <Quote className="h-5 w-5 text-[#f54e00]/40" />
                <p className="font-sans text-sm text-foreground leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border-strong/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full border border-border-strong bg-muted"
                />
                <div>
                  <div className="font-sans text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="font-sans text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


