# Infinitus Club of Mathematics

Official website for **Infinitus**, the mathematics club at Rajalakshmi Institute of Technology (RIT).

## Project structure

```
Infinitus/
├── app/                    # Next.js App Router (pages + API)
│   ├── page.jsx            # Public homepage
│   ├── layout.jsx          # Site metadata + fonts
│   ├── admin/              # Club admin (messages + Google Forms)
│   ├── api/                # Contact + admin APIs
│   ├── icon.png            # Browser tab favicon
│   └── apple-icon.png
├── assets/
│   └── brand/source/       # Master logo PNGs (not served publicly)
├── public/
│   ├── brand/              # Optimized logos for the website
│   └── images/             # Photos / backgrounds
├── components/
│   ├── brand/              # InfinitusLogo, RitLogo
│   ├── layout/             # Nav, Footer, Loader
│   ├── sections/           # Page sections (Hero, About, Events…)
│   └── ui/                 # Shared UI (cards, form, reveal)
├── lib/                    # Site config, data, stores, auth
├── scripts/
│   ├── optimize-branding.mjs
│   └── db/                 # schema.sql, seed.mjs, migrations
├── data/                   # Local contact/form storage (gitignored JSON)
├── docs/                   # Product / design docs
└── styles/                 # Global CSS + Tailwind
```

## Commands

```bash
npm install
npm run dev                 # http://localhost:3000
npm run branding:optimize   # rebuild public/brand from assets/brand/source
npm run db:seed             # seed Supabase (needs .env.local)
```

## Environment

Copy `.env.example` → `.env.local` and set at least:

- `ADMIN_PASSWORD` — for `/admin`
- `NEXT_PUBLIC_SITE_URL`
- Optional: Supabase + Resend keys

Official contact email: **infinitus@ritchennai.edu.in**
