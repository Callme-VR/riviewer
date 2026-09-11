"use client";

import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

export const ReviewersLogo: React.FC<LogoProps> = ({
  className = "",
  iconOnly = false,
  size = 22,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern Geometric AI Code Review Icon */}
      <div
        className="relative flex items-center justify-center rounded-lg bg-foreground text-background transition-transform duration-200 hover:scale-105 shadow-xs"
        style={{ width: size + 10, height: size + 10 }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Code Brackets */}
          <path
            d="M8.5 6L3.5 12L8.5 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 6L20.5 12L15.5 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Signature Cursor Orange Central AI Spark / Slash */}
          <path
            d="M13.5 4.5L10.5 19.5"
            stroke="#f54e00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex items-center gap-1 font-sans">
          <span className="text-base font-bold tracking-tight text-foreground">
            Reviewers
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#f54e00]" />
        </div>
      )}
    </div>
  );
};
