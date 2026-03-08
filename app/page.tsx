import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
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
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <Mine />
      </main>
    </Suspense>
  );
}
