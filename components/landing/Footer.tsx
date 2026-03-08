"use client";
import React from "react";
import Link from "next/link";
import { Github, Twitter, MoveRight } from "lucide-react";

export const Mine = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] pt-24 pb-12 px-6 lg:px-12 border-t border-white/5">
      <div className="container relative z-10 mx-auto">
        {/* Top Decorative Line */}
        <div className="relative mb-16 h-px w-full bg-white/10">
          <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
        </div>

        <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Features Column */}
          <div className="relative pr-8 lg:border-r lg:border-white/5">
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
          </div>

          {/* Social Column */}
          <div className="relative lg:px-8 lg:border-r lg:border-white/5">
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
          </div>

          {/* Contact Column */}
          <div className="relative lg:pl-8">
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
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="relative mt-24 mb-12 h-px w-full bg-white/10">
          <div className="absolute -left-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500" />
          <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-sm bg-orange-500" />
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
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
        </div>

        {/* Massive Background Text */}
        <div className="pointer-events-none absolute -bottom-16 left-0 w-full select-none text-center">
          <h2 className="font-bricolage text-[15vw] font-black leading-none text-white/2 uppercase tracking-tighter">
            ReviewerAi
          </h2>
        </div>
      </div>
    </footer>
  );
};
