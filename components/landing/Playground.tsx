"use client";

import React, { useState } from "react";
import { ShieldAlert, Zap, Cpu, Play, CheckCircle2, Sparkles, ArrowRight, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const scenarios = [
  {
    id: "security",
    title: "SQL Injection & Auth Leak",
    icon: ShieldAlert,
    tagColor: "#cf2d56",
    file: "auth/session.ts",
    originalCode: `// ❌ Vulnerable Database Query
export async function getSession(userId: string) {
  const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;
  return await db.raw(query);
}`,
    aiAnalysis: "Security Risk Detected: String concatenation in SQL query allows unescaped SQL injection. User input 'userId' is passed directly into raw query execution.",
    suggestedFix: `// ✅ Parameterized Query Fix
export async function getSession(userId: string) {
  return await db.query('SELECT * FROM users WHERE id = $1', [userId]);
}`,
    stage: "Grepping -> Editing",
    stageBg: "#c0a8dd",
  },
  {
    id: "style",
    title: "Team Pattern & Lint Breach",
    icon: Zap,
    tagColor: "#f54e00",
    file: "api/checkout.ts",
    originalCode: `// ❌ Unhandled Promise & Missing Error Guard
export async function POST(req: Request) {
  const data = await req.json();
  processPayment(data); // Unhandled async promise floating!
  return Response.json({ success: true });
}`,
    aiAnalysis: "Architecture Rule Violation: Floating unhandled promise detected in 'processPayment(data)'. Exceptions will bypass response error handlers.",
    suggestedFix: `// ✅ Awaited Promise with Error Guard
export async function POST(req: Request) {
  const data = await req.json();
  await processPayment(data);
  return Response.json({ success: true });
}`,
    stage: "Reading -> Editing",
    stageBg: "#9fbbe0",
  },
  {
    id: "performance",
    title: "N+1 Query & Memory Leak",
    icon: Cpu,
    tagColor: "#9fc9a2",
    file: "services/analytics.ts",
    originalCode: `// ❌ N+1 Database Queries inside Loop
for (const user of users) {
  user.posts = await db.posts.findMany({ where: { userId: user.id } });
}`,
    aiAnalysis: "Performance Warning: N+1 database queries executed inside array loop. Batch include or JOIN query required.",
    suggestedFix: `// ✅ Batch Joined Query
const postsGrouped = await db.posts.findMany({
  where: { userId: { in: users.map(u => u.id) } }
});`,
    stage: "Thinking -> Done",
    stageBg: "#c08532",
  },
];

export const Playground = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeScenario = scenarios[activeTab];

  return (
    <section id="sandbox" className="relative bg-background py-20 md:py-28 px-4 md:px-8 border-t border-border-strong/70 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1 text-xs font-mono text-muted-foreground shadow-xs">
            <Code2 className="h-3.5 w-3.5 text-[#f54e00]" />
            <span>INTERACTIVE SANDBOX</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-foreground">
            Try Reviewers AI <span className="italic font-normal text-[#f54e00]">in realtime.</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Select a sample PR vulnerability scenario below and see how Reviewers AI analyzes and generates diff suggestions live.
          </p>
        </motion.div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            const isSelected = idx === activeTab;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${isSelected
                    ? "border-[#f54e00] bg-card text-foreground shadow-xs ring-1 ring-[#f54e00]"
                    : "border-border-strong bg-canvas-soft text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <Icon className="h-4 w-4" style={{ color: sc.tagColor }} />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Diff Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-border-strong bg-card p-6 md:p-8 space-y-6 shadow-md"
          >
            {/* Top Bar info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-strong pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-[#f54e00]" /> {activeScenario.file}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">AI Stage:</span>
                <span
                  className="rounded-full px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#26251e]"
                  style={{ backgroundColor: activeScenario.stageBg }}
                >
                  {activeScenario.stage}
                </span>
              </div>
            </div>

            {/* Code Split View */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Original Code */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-red-500 font-semibold flex items-center gap-1">
                  <span>BEFORE (Vulnerable / Flawed Code)</span>
                </div>
                <pre className="rounded-lg border border-border-strong/80 bg-[#161512] text-[#f7f7f4] p-4 font-mono text-xs overflow-x-auto leading-relaxed min-h-[160px]">
                  {activeScenario.originalCode}
                </pre>
              </div>

              {/* AI Suggested Fix */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-emerald-500 font-semibold flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> AFTER (Reviewers AI Auto-Fix Suggestion)
                </div>
                <pre className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-[#f7f7f4] p-4 font-mono text-xs overflow-x-auto leading-relaxed min-h-[160px]">
                  {activeScenario.suggestedFix}
                </pre>
              </div>
            </div>

            {/* AI Review Explanation Card */}
            <div className="rounded-lg border border-[#f54e00]/30 bg-[#f54e00]/5 p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#f54e00]">
                <CheckCircle2 className="h-4 w-4" /> Reviewers AI Analysis & Verdict
              </div>
              <p className="font-sans text-xs text-foreground leading-relaxed">
                {activeScenario.aiAnalysis}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
