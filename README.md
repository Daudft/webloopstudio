# Webloop Studio

Marketing site for Webloop Studio, a small digital studio building websites, apps and custom software for growing businesses.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3 and Framer Motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see Environment below
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run typecheck` | `tsc --noEmit` |
| `node scripts/optimize-images.mjs` | Re-encode source photos and regenerate icons (see Assets) |

## Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              Home: hero, intro, work, services, process, FAQ, CTA
│   │   ├── about/page.tsx        About, rendered as a full-screen overlay
│   │   └── contact/page.tsx      Contact page with the inquiry form
│   ├── api/contact/route.ts      Form endpoint: validation, honeypot, rate limit, delivery
│   ├── layout.tsx                Fonts, metadata, JSON-LD, navbar and footer
│   ├── icon.svg / apple-icon.png Favicons (file conventions)
│   ├── opengraph-image.tsx       Open Graph image, generated at build time
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── error.tsx, global-error.tsx, not-found.tsx, loading.tsx
├── components/
│   ├── common/                   Navbar, Footer, SiteLoader (intro animation)
│   ├── sections/                 Homepage sections, contact form, about overlay
│   ├── ui/                       Button (+ buttonClasses), Input, Textarea, Select, Field
│   └── animations/               FadeIn / FadeInStagger (Framer Motion)
├── config/                       site.ts (name, tagline, email, socials), navigation.ts
├── data/                         projects.ts, services.ts, faqs.ts
├── lib/                          leads.ts (delivery), rate-limit.ts, metadata.ts, schema.ts, validations/
├── styles/globals.css
└── types/
scripts/optimize-images.mjs       Asset pipeline (sharp)
public/images, public/icons       Generated assets
```

## Design system

Everything is defined in `tailwind.config.ts`.

| Token | Value | Use |
|---|---|---|
| `navy` | `#0A1F44` | Dark sections, primary text on light |
| `ice` | `#eaf2ff` | Light sections, text on navy |
| `sky` | `#a9c8ea` | Eyebrow labels and hover accents on navy |
| `steel` | `#52627a` | Secondary body text on light |

Fonts: `font-sans` is Montserrat (body), `font-display` is Sora (headings), `font-commissioner` is used for the intro statement. All are loaded through `next/font/google`.

Buttons: use `buttonClasses({ variant, size })` on a `<Link>` for navigation and `<Button>` for real button elements. Variants are `navy`, `ice` and `ghost`.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes in production | Absolute URL for metadata, sitemap and JSON-LD |
| `RESEND_API_KEY` | no | Enables email delivery of contact inquiries via Resend |
| `CONTACT_RECEIVER_EMAIL` | no | Inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | no | Sender address; must be on a domain verified in Resend |

When the Resend variables are not set, inquiries are printed to the server log. The transport lives in `src/lib/leads.ts` and is easy to swap for another provider.

## Content that still needs real material

Placeholder copy and data are marked so they are easy to find:

```bash
grep -rn "TODO(content)" src
```

This covers the case studies, service descriptions, FAQ answers, social links, the contact email and two lines in the About overlay.

## Assets

Source photos are not committed at full size. To add a new photo, drop it in `public/`, add an entry to `photos` in `scripts/optimize-images.mjs`, run the script, then delete the original. Icons are regenerated from `src/app/icon.svg` by the same script.

## Deployment

Any Node host that runs `next build` and `next start` works. On Vercel, set `NEXT_PUBLIC_SITE_URL` and, when ready, the Resend variables in the project settings. Security headers are set in `next.config.mjs`. A strict Content-Security-Policy is a known follow-up.
