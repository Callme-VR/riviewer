"use client";
import React from "react";
import Link from "next/link";
import { Github, Twitter, MoveRight } from "lucide-react";
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] pt-24 pb-12 px-6 lg:px-12 border-t border-white/5">
      <div className="container relative z-10 mx-auto">
        {/* Top Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative mb-16 h-px w-full bg-white/10 origin-left"
        >
          <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Features Column */}
          <motion.div
            variants={itemVariants}
            className="relative pr-8 lg:border-r lg:border-white/5"
          >
            <div className="absolute -right-[4.5px] top-0 h-2 w-2 rounded-sm bg-orange-500 hidden lg:block" />
            <div className="absolute -right-[4.5px] bottom-0 h-2 w-2 rounded-sm bg-orange-500 hidden lg:block" />
            <h4 className="font-serif text-lg font-medium text-white mb-8">
              Features
            </h4>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  AI Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Security Scan
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Style Guard
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  PR Automation
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Column */}
          <motion.div
            variants={itemVariants}
            className="relative lg:px-8 lg:border-r lg:border-white/5"
          >
            <div className="absolute -right-[4.5px] top-0 h-2 w-2 rounded-sm bg-orange-500 hidden lg:block" />
            <div className="absolute -right-[4.5px] bottom-0 h-2 w-2 rounded-sm bg-orange-500 hidden lg:block" />
            <h4 className="font-serif text-lg font-medium text-white mb-8">
              Social
            </h4>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li>
                <a
                  href="https://github.com/Callme-VR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CodeAi_Vishal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Twitter className="h-4 w-4" /> X (Twitter)
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="relative lg:pl-8">
            <h4 className="font-serif text-lg font-medium text-white mb-8">
              Join Us
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                Ready to automate your reviews?
              </p>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold text-orange-500 group"
              >
                Start Now{" "}
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          className="relative mt-24 mb-12 h-px w-full bg-white/10 origin-right"
        >
          <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500" />
          <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500" />
        </motion.div>

        {/* Footer Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">
            © 2026 MINE. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <Link
              href="/privacy"
              className="hover:text-orange-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-orange-500 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>

        {/* Massive Background Text */}
        <div className="pointer-events-none absolute -bottom-16 left-0 w-full select-none text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-bricolage text-[15vw] font-black leading-none text-white/2 uppercase tracking-tighter"
          >
            ReviewerAi
          </motion.h2>
        </div>
      </div>
    </footer>
  );
};
