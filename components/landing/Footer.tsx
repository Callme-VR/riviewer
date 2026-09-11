"use client";
import React from "react";
import Link from "next/link";
import { ReviewersLogo } from "@/components/ui/logo";
import { Github, Twitter, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export const Mine = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <footer className="relative bg-background pt-16 pb-12 px-6 md:px-12 border-t border-border-strong/60">


      <div className="container relative z-10 mx-auto max-w-6xl space-y-12">
        {/* Animated Hairline Top Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-px w-full bg-border-strong origin-left"
        />

        {/* Main Footer 5-Column Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5"
        >
          {/* Column 1: Brand & Status */}
          <motion.div variants={itemVariants} className="col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-2.5">
              <ReviewersLogo />
            </Link>

            <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-xs">
              Autonomous AI Code Reviewer. Catch security flaws, enforce architectural rules, and accelerate pull request velocity.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-2.5 py-1 text-[11px] font-mono text-foreground shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#9fc9a2]" />
              <span>All Systems Operational</span>
            </div>
          </motion.div>

          {/* Column 2: Product */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  AI PR Analysis
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Security Guard
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-foreground transition-colors">
                  5-Stage Timeline
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  GitHub Integration
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Social */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Social
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-muted-foreground">
              <li>
                <a
                  href="https://github.com/Callme-VR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CodeAi_Vishal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5" /> X (Twitter) <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border-strong/60 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-muted-foreground"
        >
          <div>
            © {new Date().getFullYear()} Reviewers AI Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};


