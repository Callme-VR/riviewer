"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReviewersLogo } from "@/components/ui/logo";
import { ModeToggle } from "@/components/ModeToggle";
import { signIn } from "@/lib/auth-client";
import { ChevronRight, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Sandbox", href: "#sandbox" },
  { label: "Comparison", href: "#comparison" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-center transition-all duration-200 px-4 md:px-8 border-b ${scrolled
        ? "border-border bg-background/85 backdrop-blur-md shadow-xs"
        : "border-border/40 bg-background/60 backdrop-blur-xs"
        }`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        {/* Modern Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <ReviewersLogo />
        </Link>

        {/* Center Desktop Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <ModeToggle />

          <Button
            onClick={handleLogin}
            className="h-9 rounded-md bg-[#f54e00] px-4 font-sans text-xs font-medium text-white transition-all hover:bg-[#d04200] active:scale-[0.98] shadow-xs"
          >
            <span className="flex items-center gap-1.5">
              Sign In
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Button>

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 md:hidden rounded-md border border-border bg-card text-foreground"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 right-0 border-b border-border bg-background px-6 py-6 md:hidden shadow-lg"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-[#f54e00] transition-colors py-1 flex items-center justify-between border-b border-border/40"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ))}
              <div className="pt-2">
                <Button
                  onClick={handleLogin}
                  className="w-full h-10 bg-[#f54e00] text-white hover:bg-[#d04200] font-medium text-sm"
                >
                  Sign In with GitHub
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};


