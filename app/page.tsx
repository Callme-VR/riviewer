import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Playground } from "@/components/landing/Playground";
import { Features } from "@/components/landing/Features";
import { Comparison } from "@/components/landing/Comparison";
import { SocialProof } from "@/components/landing/SocialProof";
import { Pricing } from "@/components/landing/Pricing";
import { Mine } from "@/components/landing/Footer";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <main className="min-h-screen bg-background relative overflow-x-hidden">
        <Navbar />

        {/* Global Continuous Side Grid Guide Lines */}
        <div className="pointer-events-none absolute inset-0 z-10 flex justify-center">
          <div className="w-full max-w-6xl border-x border-border-strong/60 h-full relative" />
        </div>

        <div className="relative z-20">
          <Hero />
          <Playground />
          <Features />
          <Comparison />
          <SocialProof />
          <Pricing />
          <Mine />
        </div>
      </main>
    </Suspense>
  );
}

