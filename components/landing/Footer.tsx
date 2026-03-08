"use client";
import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-between gap-8 border-t-2 border-foreground/10 pt-12 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md border-2 border-foreground bg-primary p-1">
            <Image
              src="/logo.png"
              alt="Reviewers Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-poppins text-lg font-bold tracking-tight text-foreground">
            Reviewers
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-sans text-sm font-semibold text-foreground/60">
          <a
            href="#"
            className="hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary"
          >
            Security
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary"
          >
            Contact
          </a>
        </div>

        <div className="font-sans text-xs font-bold uppercase tracking-widest text-foreground/40">
          Built with ❤️ and ☕ in 2026
        </div>
      </div>
    </footer>
  );
};
