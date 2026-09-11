"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { MoveRight, GitPullRequest, ShieldCheck, CheckCircle2, FileCode, Sparkles, Code, Play } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const codeSamples = {
  ts: {
    filename: "auth-client.ts",
    lang: "TypeScript",
    diff: [
      { type: "comment", text: "// auth-client.ts - Pull Request #142" },
      { type: "del", text: '- const token = req.headers.get("authorization");' },
      { type: "add", text: "+ const token = await verifyAuthBearer(req);" },
      { type: "add", text: '+ if (!token.isValid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });' },
    ],
    verdict: "Verified bearer token validation prevents unauthenticated bypass vulnerability in endpoint handlers.",
  },
  py: {
    filename: "db/models.py",
    lang: "Python",
    diff: [
      { type: "comment", text: "# db/models.py - Pull Request #89" },
      { type: "del", text: '- cursor.execute(f"SELECT * FROM users WHERE email=\'{user_email}\'")' },
      { type: "add", text: '+ cursor.execute("SELECT * FROM users WHERE email=%s", (user_email,))' },
      { type: "add", text: "+ # Fixed SQL Injection vulnerability using parameterized queries" },
    ],
    verdict: "Replaced raw string formatting with parameterized query to eliminate SQL injection attack vectors.",
  },
  go: {
    filename: "server/handler.go",
    lang: "Go",
    diff: [
      { type: "comment", text: "// server/handler.go - Pull Request #210" },
      { type: "del", text: "- resp, err := http.Get(targetUrl)" },
      { type: "add", text: "+ ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)" },
      { type: "add", text: "+ resp, err := client.Do(req.WithContext(ctx))" },
    ],
    verdict: "Enforced HTTP context timeout guard to prevent connection exhaustion and memory leaks.",
  },
};

const timelineStages = [
  { id: "thinking", label: "Thinking", bg: "#dfa88f", text: "#26251e", desc: "Analyzing PR AST & modified dependencies..." },
  { id: "reading", label: "Reading", bg: "#9fbbe0", text: "#26251e", desc: "Scanning modified code files and type definitions..." },
  { id: "grepping", label: "Grepping", bg: "#9fc9a2", text: "#26251e", desc: "Checking codebase for function usages & imports..." },
  { id: "editing", label: "Editing", bg: "#c0a8dd", text: "#26251e", desc: "Formulating actionable inline code diff suggestions..." },
  { id: "done", label: "Done", bg: "#c08532", text: "#ffffff", desc: "PR approved with 1 security warning resolved" },
];

export const Hero = () => {
  const [activeLang, setActiveLang] = useState<"ts" | "py" | "go">("ts");
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % timelineStages.length);
    }, 2800);
    return () => clearInterval(timer);
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const sample = codeSamples[activeLang];

  return (
    <section className="relative min-h-[92vh] w-full bg-background pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-6xl">
        {/* Editorial Badge Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-start mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-3.5 py-1 text-xs font-mono font-medium text-foreground shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#f54e00] animate-pulse" />
            <span className="text-[#26251e] dark:text-[#f7f7f4] font-semibold">Reviewers v2.0</span>
            <span className="text-muted-foreground">• Autonomous AI Code Reviews</span>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Left Hero Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-center md:text-left items-center md:items-start"
          >
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-[-0.035em] text-foreground"
            >
              {"Code reviews "}
              <br className="hidden sm:inline" />
              {"aren't "}
              <span className="italic font-normal text-[#f54e00]">linear.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg font-sans text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {"Stop merging bugs. Reviewers acts as your senior staff engineer, analyzing pull requests, catching security flaws, and enforcing standards in seconds."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <Button
                onClick={handleLogin}
                className="h-11 w-full sm:w-auto rounded-md bg-[#f54e00] px-6 text-sm font-medium text-white hover:bg-[#d04200] transition-all shadow-xs group"
              >
                Start Reviewing PRs
                <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <a
                href="#sandbox"
                className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-md border border-border-strong bg-card px-6 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors shadow-xs"
              >
                Try Live Sandbox
              </a>
            </motion.div>

            {/* Trust Micro-metrics */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-6 text-xs text-muted-foreground font-sans border-t border-border-strong/60 pt-6 w-full justify-center md:justify-start"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#f54e00]" />
                <span>Zero configuration required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#9fc9a2]" />
                <span>SOC2 Type II compliant</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Interactive IDE Terminal Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full"
          >
            <div className="rounded-xl border border-border-strong bg-card shadow-md overflow-hidden">
              {/* IDE Top Bar & Language Selector */}
              <div className="flex h-10 items-center justify-between border-b border-border-strong bg-muted/40 px-3.5 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  </div>
                  <span className="text-[11px] font-medium text-foreground ml-2 flex items-center gap-1">
                    <GitPullRequest className="h-3 w-3 text-[#f54e00]" /> {sample.filename}
                  </span>
                </div>

                {/* Multi-language Tabs */}
                <div className="flex items-center gap-1 border border-border-strong/80 rounded-md p-0.5 bg-background">
                  {(["ts", "py", "go"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-2 py-0.5 text-[10px] font-mono font-semibold uppercase rounded transition-colors ${activeLang === lang
                        ? "bg-[#f54e00] text-white"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* IDE Workspace */}
              <div className="p-4 font-mono text-xs space-y-4 bg-card text-foreground min-h-[340px]">
                {/* AI Timeline Stage Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-border-strong/60">
                  {timelineStages.map((stage, idx) => {
                    const isActive = idx === activeStage;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setActiveStage(idx)}
                        style={{
                          backgroundColor: stage.bg,
                          color: stage.text,
                          opacity: isActive ? 1 : 0.6,
                        }}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${isActive ? "ring-2 ring-foreground scale-105" : "hover:opacity-90"
                          }`}
                      >
                        {stage.label}
                      </button>
                    );
                  })}
                </div>

                {/* Active Stage Status Bar */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md border border-border-strong bg-canvas-soft p-2.5 text-[11px] text-foreground flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: timelineStages[activeStage].bg }} />
                      <span className="font-semibold">{timelineStages[activeStage].label}:</span>
                      <span className="text-muted-foreground">{timelineStages[activeStage].desc}</span>
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Code Diff Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md border border-border-strong/80 bg-[#161512] text-[#f7f7f4] p-3 space-y-1 overflow-x-auto text-[11px] leading-relaxed min-h-[110px]"
                  >
                    {sample.diff.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.type === "del"
                            ? "text-red-400 bg-red-950/40 -mx-3 px-3 py-0.5"
                            : line.type === "add"
                              ? "text-emerald-400 bg-emerald-950/40 -mx-3 px-3 py-0.5"
                              : "text-[#a09c92]"
                        }
                      >
                        {line.text}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Inline AI Verdict Card */}
                <div className="rounded-md border border-[#f54e00]/30 bg-[#f54e00]/5 p-3 text-xs text-foreground space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-[#f54e00] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Reviewers AI Guard
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">Security Check Passed</span>
                  </div>
                  <p className="font-sans text-[11px] text-muted-foreground leading-normal">
                    {sample.verdict}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


