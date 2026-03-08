# Design Specification: "Reviewers" Landing Page

## 1. Design Concept: "Playful Efficiency"
The core idea is to merge the strict, technical nature of code reviews (structured, linted, precise) with a playful, encouraging aesthetic (Neo-Brutalism/Pop).

- **Vibe:** "Your friendly, strict robot code reviewer."
- **Keywords:** Bold, Clear, Fast, Playful, Honest.
- **Visual Motif:** Hard shadows (`3px 3px`), thick borders (`2px`), high contrast, pastel backgrounds with vibrant accents.

## 2. Color Palette (Strict Adherence to `globals.css`)
- **Background:** `bg-background` (#f6e6ee - Light Pink)
- **Cards/Surface:** `bg-card` (#fdedc9 - Cream/Pale Yellow)
- **Primary Action:** `bg-primary` (#d04f99 - Magenta/Pink)
- **Secondary Action:** `bg-secondary` (#8acfd1 - Teal/Cyan)
- **Text:** `text-foreground` (#5b5b5b - Dark Grey) -> Avoid pure black.
- **Borders:** `border-primary` (#d04f99) or `border-foreground` (#5b5b5b).

## 3. Typography
- **Headings (H1, H2, H3):** `Poppins` (Bold, Tight Tracking `-0.02em`).
- **Body Text:** `Geist Sans` or `Inter` (Standard tracking).
- **Code Snippets:** `Fira Code` (Monospace).

## 4. Layout Structure (Landing Page)

### A. Navbar (Sticky)
- **Left:** Logo (Emoji or Icon with thick border) + "Reviewers" (Poppins Bold).
- **Right:** "Login" (Ghost Button) + "Get Started" (Primary Button, Hard Shadow).

### B. Hero Section (Above the Fold)
- **Headline:** "Code Reviews on Autopilot." (Large, 4rem+).
- **Subheadline:** "Stop merging bugs. Let AI review your PRs instantly, enforce style guides, and catch security issues before your team does."
- **CTA:** "Review My Code" (Primary Button) -> Opens GitHub OAuth.
- **Visual:** A split view showing "Bad Code" (Red/Destructive background card) vs "Fixed Code" (Green/Teal background card) with a hard arrow pointing between them.

### C. Features Grid (Bento Style)
- **Card 1 (Large):** "Instant Feedback" - Shows a time comparison (Human: 4 hours vs AI: 4 seconds).
- **Card 2 (Medium):** "Security Scanner" - Icon of a shield with a checkmark.
- **Card 3 (Medium):** "Style Enforcer" - "Linting on Steroids."
- **Style:** All cards use `bg-card`, `border-2`, `shadow-md`.

### D. Social Proof / "The Wall of Love"
- **Headline:** "Developers love us (mostly)."
- **Grid:** 3-4 testimonials in "Tweet" style cards.
- **Visuals:** Avatars with thick borders.

### E. Pricing (Simple)
- **Free:** "Hobbyist" - 10 Repos, Basic Review. (Grey/White card).
- **Pro:** "Team" - Unlimited Repos, Priority Review. (Highlighted card: `bg-secondary` or `bg-primary/10`, Scaled up 1.05x).

### F. Footer
- Simple links, Copyright, "Built with ❤️ and ☕".

## 5. UI Component Details

### Buttons
- **Default:** `bg-primary`, `text-white`, `rounded-md`, `border-2 border-primary`, `shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]` (or darkened primary).
- **Hover:** `translate-x-[1px] translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`.
- **Active:** `translate-x-[3px] translate-y-[3px] shadow-none`.

### Inputs
- `bg-white`, `border-2 border-foreground`, `rounded-md`.
- Focus: `ring-2 ring-primary ring-offset-2`.

### Cards
- `bg-card`, `border-2 border-foreground` (or `border-primary/20`), `rounded-lg`, `shadow-md`.
- **Hover Effect:** Lift up slightly (`-translate-y-1`) with increased shadow.

## 6. Implementation Plan
1.  **Refactor `app/layout.tsx`:** Fix font loading (`Poppins`, `Fira Code`).
2.  **Create `components/landing`:** Folder for landing page specific sections (`Hero.tsx`, `Features.tsx`, `Pricing.tsx`).
3.  **Update `app/page.tsx`:** Assemble the landing page sections.
4.  **Migrate `LoginUI`:** Move the login logic into a modal or a dedicated `/login` page that respects the new design system.
