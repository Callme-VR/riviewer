"use client";
import React from "react";
import { Timer, ShieldCheck, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";

export const Features = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section
      id="features"
      className="relative bg-[#0a0a0a] py-20 sm:py-32 px-4 sm:px-6 lg:px-12"
    >
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 sm:mb-24 flex flex-col items-center text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl font-medium tracking-tight text-white sm:text-6xl"
          >
            Built for{" "}
            <span className="italic font-normal text-orange-500">
              Playful Efficiency.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-sans text-base sm:text-lg text-white/40 leading-relaxed px-4"
          >
            We combined high-performance AI with a design that keeps you focused
            and fast.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid gap-4 sm:gap-1 lg:grid-cols-3"
        >
          {/* Instant Feedback Card */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col border border-white/5 bg-white/2 p-8 sm:p-10 transition-all hover:bg-white/5"
          >
            <div className="mb-6 sm:mb-8 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform group-hover:scale-110 group-hover:bg-orange-500/10">
              <Timer className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
              Instant Feedback
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/40 leading-relaxed">
              Human: 4 hours. AI: 4 seconds. Get your code reviewed before you
              even finish your coffee.
            </p>
          </motion.div>

          {/* Security Scanner Card */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col border border-white/5 bg-white/2 p-8 sm:p-10 transition-all hover:bg-white/5"
          >
            <div className="mb-6 sm:mb-8 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform group-hover:scale-110 group-hover:bg-teal-500/10">
              <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-teal-500" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
              Security Scanner
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/40 leading-relaxed">
              Identify SQL injections, XSS, and hardcoded secrets automatically.
              Lock your doors, cryptographically.
            </p>
          </motion.div>

          {/* Style Enforcer Card */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col border border-white/5 bg-white/2 p-8 sm:p-10 transition-all hover:bg-white/5"
          >
            <div className="mb-6 sm:mb-8 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform group-hover:scale-110 group-hover:bg-purple-500/10">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-purple-500" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
              Style Enforcer
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/40 leading-relaxed">
              Linting on steroids. Enforce team-specific patterns and best
              practices without the nagging.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
