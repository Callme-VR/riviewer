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
    <section className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h2 className="font-poppins text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Developers love us{" "}
          <span className="text-foreground/40 italic">(mostly).</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-xl border-2 border-foreground bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-12 w-12 rounded-full border-2 border-foreground"
              />
              <div>
                <div className="font-poppins font-bold text-foreground">
                  {t.name}
                </div>
                <div className="font-sans text-xs font-semibold text-foreground/50">
                  {t.handle}
                </div>
              </div>
            </div>
            <p className="mt-4 font-sans text-foreground/80 leading-relaxed italic">
              "{t.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
