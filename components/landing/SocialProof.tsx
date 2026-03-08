"use client";
import React from "react";

const testimonials = [
  {
    name: "Alex River",
    handle: "@alexcodes",
    text: "Reviewers caught a security bug in my PR that even my senior missed. It's like having a 24/7 security guard for my repo.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    handle: "@schen_dev",
    text: "The style enforcer is hilarious. It nags my team so I don't have to. Best $19 I've spent on my engineering team.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Marcus Aurelius",
    handle: "@marcus_dev",
    text: "Instant feedback is not an exaggeration. It's faster than my build pipeline. Highly recommended!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
];

export const SocialProof = () => {
  return (
    <section className="bg-[#0a0a0a] py-20 sm:py-32 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="mb-16 sm:mb-20 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-6xl">
            Developers love us{" "}
            <span className="italic font-normal text-white/40">(mostly).</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-all hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/20"
                />
                <div>
                  <div className="font-serif text-base sm:text-lg font-medium text-white">
                    {t.name}
                  </div>
                  <div className="font-sans text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {t.handle}
                  </div>
                </div>
              </div>
              <p className="mt-4 sm:mt-6 font-sans text-sm sm:text-base text-white/60 leading-relaxed italic">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
