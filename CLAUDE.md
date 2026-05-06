# Golf Sim Gurus — Project Instructions

## Stack
- **Framework:** Next.js 16 + React 19 (App Router, `src/` dir)
- **Styling:** Tailwind CSS 4 with custom design tokens in `globals.css`
- **Animation:** Framer Motion (scroll reveals, transitions), GSAP (scroll-driven timelines)
- **3D:** @react-three/fiber + drei (Room Builder feature)
- **Forms:** react-hook-form + zod
- **CMS:** Sanity (gallery, testimonials, equipment)
- **Database:** Supabase (leads from quiz/contact)
- **Icons:** lucide-react

## Design System (Celtic-inspired)
- **Fonts:** EB Garamond (headings), Montserrat (body), JetBrains Mono (mono)
- **Backgrounds:** cream (#fdfcfa) primary, stone (#f8f7f5) secondary, champagne (#F5F5F1) accent
- **Text:** charcoal (#32373c) headings, charcoal-light (#4a4f54) body, text-muted (#5a5f64) secondary
- **Primary accent:** Celtic green (#1a3d2e) — CTAs, active states, progress indicators
- **Secondary accent:** Brass (#c9a959) — focus states, dividers, luxury highlights
- **Dark surfaces:** celtic-dark (#142f24) footer/hero, forest (#1B3022) gradients
- **Rule:** Cream/stone backgrounds, charcoal text. Celtic green for actions. Brass sparingly for luxury touches.

## Conventions
- All client components use `"use client"` directive
- UI components in `src/components/ui/` — atomic, reusable
- Page sections in `src/components/sections/` — homepage value ladder
- Use `cn()` from `@/lib/utils/cn` for class composition
- Zod schemas in `src/lib/validations/`
- API routes validate with zod before any DB operation

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Session Protocol
Same as global — see `~/projects/CLAUDE.md`
