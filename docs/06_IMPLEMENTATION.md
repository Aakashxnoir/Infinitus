# Implementation Plan
## Project: INFINITUS — Math Club Website

---

### 1. Suggested Build Order
Build the riskiest/most novel piece first (the loader + scroll system), then layer content sections on top — this avoids discovering late that the animation approach doesn't fit the content structure.

**Phase 0 — Setup**
1. Scaffold Next.js (or Vite + React) project, Tailwind configured.
2. Install `gsap` (+ `ScrollTrigger`, optionally `ScrollToPlugin`), `framer-motion`.
3. Set up folder structure per TRD `/components` layout.
4. Push repo, connect Vercel deploy for continuous preview.

**Phase 1 — Loader + Landing Shell (highest risk, build first)**
1. Build `Loader.jsx`: centered logo, GSAP timeline for scale-in → hold → split-reveal.
2. Wire `sessionStorage` flag so it only plays once per session (confirm this behavior with the club before finalizing).
3. Build `Nav.jsx` with scroll-spy + smooth-scroll-to-anchor behavior.
4. Build `CloudBackground.jsx` — looping drift animation, placed behind Hero.
5. **Validate**: this is the piece worth demoing to the club early, since it's the signature interaction from the sketch.

**Phase 2 — Content Sections**
1. `Hero.jsx` — wordmark, tagline, scroll cue.
2. `MembersGrid.jsx` + `MemberCard.jsx` — start with static/mock data.
3. `AboutUs.jsx` — mission copy block.
4. `EventsConducted.jsx` + `UpcomingEvents.jsx` sharing one `EventCard.jsx` component (per UI/UX brief).
5. `ContactForm.jsx` — build UI first with client-side validation, stub the submit handler.
6. `Footer.jsx`.
7. Wire GSAP `ScrollTrigger` fade/slide-in on each section as it enters viewport.

**Phase 3 — Backend**
1. Provision Supabase project (Postgres + Storage + optional Auth for later).
2. Run schema migration from `05_BACKEND_SCHEMA.md`.
3. Build API routes: `GET /api/members`, `GET /api/events`, `POST /api/contact`.
4. Seed `members` and `events` tables with real club data (replace mock data from Phase 2).
5. Wire contact form submit → `POST /api/contact` → email notification (Resend/EmailJS) → success/error state in UI.

**Phase 4 — Polish & QA**
1. Responsive pass: mobile nav collapse, single-column grids, shortened loader animation on mobile.
2. Accessibility pass: `prefers-reduced-motion` fallback, keyboard nav test, contrast check on cloud background text.
3. Performance pass: image lazy-loading, Lighthouse audit (target ≥85 mobile), GSAP animation profiling for jank.
4. Cross-browser check (Chrome, Safari, Firefox, mobile Safari).
5. SEO/meta pass: title, description, Open Graph image.

**Phase 5 — Launch**
1. Final content pass (real photos, bios, event history) replacing all placeholders.
2. Deploy to production domain via Vercel.
3. Smoke-test contact form delivery end-to-end in production.

### 2. File/Folder Structure
```
infinitus-website/
├── app/ or pages/
│   ├── index.jsx                # single scroll page assembling all sections
│   └── api/
│       ├── members.ts
│       ├── events.ts
│       └── contact.ts
├── components/
│   ├── Loader.jsx
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── CloudBackground.jsx
│   ├── MembersGrid.jsx
│   ├── MemberCard.jsx
│   ├── AboutUs.jsx
│   ├── EventsConducted.jsx
│   ├── UpcomingEvents.jsx
│   ├── EventCard.jsx
│   ├── ContactForm.jsx
│   └── Footer.jsx
├── lib/
│   ├── db.ts                    # DB client (Supabase/Prisma)
│   └── rateLimiter.ts
├── scripts/
│   └── seed.ts                  # initial members/events seed data
├── public/
│   └── assets/ (logo, cloud SVGs, icons)
└── styles/
    └── globals.css
```

### 3. Key Dependencies
```json
{
  "next": "^15",
  "react": "^19",
  "gsap": "^3",
  "framer-motion": "^11",
  "tailwindcss": "^3",
  "@supabase/supabase-js": "^2",
  "resend": "^3"
}
```

### 4. Risk Register
| Risk | Mitigation |
|---|---|
| Split-screen loader feels janky on slower devices | Build and test Phase 1 first, in isolation, before committing to it across the whole site; have a plain-fade fallback ready |
| GSAP ScrollTrigger conflicts with Next.js SSR/hydration | Initialize all ScrollTrigger instances inside `useEffect` (client-only), never during SSR render |
| Content (member bios, event photos) not ready by build time | Phase 2 uses mock/placeholder data so frontend work isn't blocked on content collection |
| Contact form becomes a spam target | Add basic IP rate-limiting + honeypot field before public launch |

### 5. Definition of Done (v1)
- [ ] Loader plays once, split-reveals into landing page, respects reduced-motion
- [ ] All four sections reachable via scroll and via nav
- [ ] Member and event data pulled from live DB, not mock data
- [ ] Contact form successfully sends and is spam-guarded
- [ ] Responsive on mobile/tablet/desktop
- [ ] Lighthouse mobile performance ≥ 85
- [ ] Deployed to production domain
