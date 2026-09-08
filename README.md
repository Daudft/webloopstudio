# Webloop Studio — Production-Grade Agency Website

A modern, high-performance, and scalable digital agency platform engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Architecture & Folder Structure

```
webloopstudio/
├── .env.example                         # Environment configuration template
├── .eslintrc.json                       # ESLint configuration
├── .gitignore                           # Git ignore rules
├── next.config.mjs                      # Next.js image optimization, security & caching headers
├── package.json                         # Dependencies and npm scripts
├── postcss.config.mjs                   # PostCSS configuration
├── tailwind.config.ts                   # Tailwind configuration & custom design tokens
├── tsconfig.json                        # Strict TypeScript compiler options
│
├── public/                              # Public static assets
│   ├── favicon.ico
│   ├── icons/                           # SVG icons and vector assets
│   └── images/                          # Portfolio, hero, client logos, and team imagery
│
└── src/
    ├── app/                             # Next.js App Router (Layouts, routes, server actions)
    │   ├── (marketing)/                 # Route group for marketing pages
    │   │   ├── page.tsx                 # Homepage (Hero, Services, Portfolio, Process, Reviews, CTA)
    │   │   ├── about/page.tsx           # Agency story, values, leadership
    │   │   ├── services/page.tsx        # Services catalog & deliverables
    │   │   ├── work/page.tsx            # Portfolio gallery & case studies
    │   │   ├── pricing/page.tsx         # Transparent engagement tiers
    │   │   ├── contact/page.tsx         # Discovery & project inquiry form
    │   │   ├── privacy/page.tsx         # Privacy policy
    │   │   └── terms/page.tsx           # Terms of service
    │   ├── api/                         # Backend API endpoints
    │   │   ├── contact/route.ts         # Contact form handler + Zod validation
    │   │   ├── newsletter/route.ts      # Newsletter subscription
    │   │   └── health/route.ts          # Health check endpoint
    │   ├── layout.tsx                   # Root layout (Fonts, ThemeProvider, SEO)
    │   ├── error.tsx                    # Error boundary
    │   ├── global-error.tsx             # Fallback root error handler
    │   ├── not-found.tsx                # Custom 404 page
    │   ├── loading.tsx                  # Loading skeleton
    │   ├── robots.ts                    # Dynamic robots.txt
    │   ├── sitemap.ts                   # Dynamic sitemap.xml
    │   └── manifest.ts                  # PWA Manifest
    │
    ├── components/                      # Modular UI components
    │   ├── animations/                  # Framer Motion animation primitives (FadeIn, MagneticButton, TextReveal)
    │   ├── common/                      # Common components (Navbar, Footer, MobileNav)
    │   ├── sections/                    # Composable page sections (Hero, Stats, Services, Portfolio, Testimonials, FAQ, CTA)
    │   ├── ui/                          # Reusable UI primitives (Button, Card, Badge, Input, Textarea, Accordion)
    │   └── providers/                   # Context providers (ThemeProvider)
    │
    ├── config/                          # Centralized site configurations
    │   ├── site.ts                      # Company metadata, contact info, and social links
    │   └── navigation.ts                # Main menu and footer links
    │
    ├── data/                            # Decoupled mock/initial data (easy CMS migration)
    │   ├── services.ts                  # Services catalog and features
    │   ├── projects.ts                  # Case study data and metrics
    │   ├── testimonials.ts              # Client reviews
    │   ├── faqs.ts                      # Frequently asked questions
    │   └── team.ts                      # Leadership team
    │
    ├── hooks/                           # Custom React hooks (useScrollPosition, useMediaQuery)
    ├── lib/                             # Utilities, metadata generator, JSON-LD schemas, Zod validations
    ├── styles/                          # Global Tailwind CSS and glassmorphism styling
    └── types/                           # Strict TypeScript data models & interfaces
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start
```
