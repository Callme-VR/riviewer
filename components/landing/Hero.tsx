"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Github, MoveRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export const Hero = () => {
  const handleLogin = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 pb-20">
      {/* Background Grid/Ruler Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute left-10 top-0 h-full w-px bg-white/10" />
        <div className="absolute right-10 top-0 h-full w-px bg-white/10" />
        <div className="absolute bottom-10 left-0 w-full h-px bg-white/10" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl font-medium leading-[1.2] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Code Reviews <br className="hidden sm:block" />
              aren't{" "}
              <motion.span
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="italic inline-block font-normal text-orange-500"
              >
                linear.
              </motion.span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-lg font-sans text-base sm:text-lg lg:text-xl text-white/50 leading-relaxed px-4 lg:px-0"
            >
              Stop merging bugs. Let AI review your PRs instantly, enforce style
              guides, and catch security issues before your team does.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 w-full sm:w-auto px-6 lg:px-0"
            >
              <Button
                size="lg"
                onClick={handleLogin}
                className="h-14 w-full sm:w-auto rounded-xl bg-[#ff4d15] px-8 font-poppins text-lg font-bold text-white transition-all hover:bg-[#ff4d15]/90 hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(255,77,21,0.2)]"
              >
                Review My Code
                <MoveRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full sm:w-auto rounded-xl border-white/10 bg-white/5 px-8 font-poppins text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 backdrop-blur-sm"
              >
                Explore Docs
                <Github className="ml-2 h-5 w-5 opacity-50" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            {/* Isometric Graphic Representation */}
            <div className="relative flex justify-center py-20 pr-10">
              <div className="relative h-[480px] w-[380px]">
                {/* Simulated Stacked Layers from the screenshot */}
                <motion.div
                  animate={{ y: [-5, 5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 right-0 h-40 w-60 rotate-25 skew-x-[-20deg] border border-orange-500/40 bg-orange-500/5 backdrop-blur-sm transition-all hover:border-orange-500 hover:bg-orange-500/10 cursor-default"
                >
                  <div className="p-4 font-mono text-[10px] text-orange-400 opacity-60">
                    {"// AI ANALYSIS LAYER"}
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-20 right-10 h-40 w-60 rotate-25 skew-x-[-20deg] border border-white/10 bg-white/5 backdrop-blur-sm translate-x-4 translate-y-4 hover:border-white/20 cursor-default"
                >
                  <div className="p-4 font-mono text-[10px] text-white/40">
                    {"// SECURITY HUB"}
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="absolute top-40 right-20 h-40 w-60 rotate-25 skew-x-[-20deg] border border-white/10 bg-white/5 backdrop-blur-sm translate-x-8 translate-y-8 hover:border-white/20 cursor-default"
                >
                  <div className="p-4 font-mono text-[10px] text-white/40">
                    {"// LINTING ENGINE"}
                  </div>
                </motion.div>

                {/* Floating Elements (Icons like nodes) */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 left-0 h-12 w-12 rounded-lg border border-white/10 bg-[#121212] flex items-center justify-center shadow-2xl"
                >
                  <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-500 italic">
                    AI
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-10 right-0 h-12 w-12 rounded-lg border border-white/10 bg-[#121212] flex items-center justify-center shadow-2xl"
                >
                  <Github className="h-5 w-5 text-white opacity-40" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
