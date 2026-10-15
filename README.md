# Infinitus Club of Mathematics

Official website for **Infinitus**, the mathematics club at Rajalakshmi Institute of Technology (RIT).

## Project structure

```
Infinitus/
├── app/                    # Next.js App Router (pages + API)
│   ├── page.jsx            # Public homepage
│   ├── layout.jsx          # Site metadata + fonts
│   ├── api/                # Read-only members / events JSON
│   ├── opengraph-image.jsx # Link-preview image
│   ├── icon.svg            # Browser tab favicon
│   └── apple-icon.png
├── assets/
│   └── brand/source/       # Master logo PNGs (not served publicly)
├── public/
│   ├── brand/              # Optimized logos for the website
│   ├── events/             # Event posters
│   └── gallery/            # Gallery photos
├── components/
│   ├── brand/              # InfinitusLogo, RitLogo
│   ├── layout/             # Nav, Footer, Loader
│   ├── sections/           # Page sections (Hero, About, Events…)
│   └── ui/                 # Shared UI (cards, dialogs, figures, reveal)
├── lib/                    # Site config, data (members, events, gallery)
├── scripts/
│   ├── optimize-branding.mjs
│   └── db/                 # schema.sql, seed.mjs, migrations
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

Copy `.env.example` → `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- Optional: Supabase keys

To add or update members, events (including a Google Form `registrationFormUrl` for upcoming events) and gallery photos, edit `lib/data.js`.

Official contact email: **infinitus@ritchennai.edu.in**
