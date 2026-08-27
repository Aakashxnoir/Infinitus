# Technical Requirements Document (TRD)
## Project: INFINITUS — Math Club Website

---

### 1. Tech Stack (recommended)

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **React (Next.js)** or **React + Vite** | Matches your existing stack (echofilter, Centre of Image Processing site both Next.js/Vite-based) |
| Animation | **GSAP** (ScrollTrigger plugin) + **Framer Motion** for component-level transitions | GSAP ScrollTrigger is the standard tool for the section-scroll + split-screen loader you sketched; Framer Motion handles simpler mount/hover animations |
| Styling | Tailwind CSS | Fast iteration, matches your other projects |
| 3D/extra motion (optional) | Three.js | Only if the cloud animation or logo reveal goes 3D — you've used this before (neuron login page). Otherwise pure CSS/SVG clouds are lighter-weight and sufficient. |
| Backend | **Node.js (Express) or Next.js API routes** | Small surface area (members, events, contact) — doesn't need a separate service |
| Database | **PostgreSQL** (via Supabase) or **MongoDB** | Either works for this schema size; Supabase gives you hosted Postgres + storage for images + auth for free if you ever add an admin login |
| Image hosting | Supabase Storage / Cloudinary | For member photos and event galleries |
| Hosting | Vercel (frontend + API routes) | Matches your portfolio deployment pattern |
| Contact form delivery | Resend / EmailJS / a simple API route → SMTP | No backend mail server needed |

### 2. Architecture Overview
```
┌─────────────────────────────┐
│   Client (Next.js / React)  │
│  - Landing/Loader (GSAP)    │
│  - Members section          │
│  - About/Events section     │
│  - Contact form             │
└───────────┬─────────────────┘
            │ REST/JSON (fetch)
┌───────────▼─────────────────┐
│   API layer (Next.js API    │
│   routes or Express)        │
│  /api/members                │
│  /api/events                 │
│  /api/contact                │
└───────────┬─────────────────┘
            │
┌───────────▼─────────────────┐
│  PostgreSQL / MongoDB        │
│  + Object storage (images)   │
└──────────────────────────────┘
```

### 3. Frontend Requirements

**3.1 Loading Screen / Split Reveal**
- Implement as a fixed-position overlay (`z-index` above all content) shown on initial mount.
- Two panels (top half / bottom half of viewport) containing the logo mark, animated with GSAP timeline:
  1. Logo scales/fades in (0–0.8s)
  2. Brief hold (0.8–1.2s)
  3. Top panel translates `-100%` on Y, bottom panel translates `+100%` on Y, simultaneously (1.2–2s)
  4. Overlay `display: none` / unmounted after animation completes, `document.body` scroll re-enabled.
- Lock body scroll (`overflow: hidden`) while the loader is active.
- Should run once per session (use `sessionStorage` flag) so repeat navigation within the same visit doesn't replay it — confirm if you want it on every load instead.

**3.2 Scroll System**
- Use GSAP `ScrollTrigger` to pin/fade each section (Landing → Members → About/Events → Contact) as the user scrolls.
- Nav links (Home/About/Events/Gallery) scroll-to-anchor with smooth scroll (`scrollIntoView` or GSAP `scrollTo` plugin) rather than full page navigation.
- Background cloud layer: implement as absolutely-positioned SVG/PNG cloud shapes with an infinite CSS/GSAP loop (`x`/`y` drift + slow opacity pulse for "rise" effect), placed behind content with `pointer-events: none`.

**3.3 Component Structure**
```
/components
  Loader.jsx
  Nav.jsx
  Hero.jsx
  CloudBackground.jsx
  MembersGrid.jsx
  MemberCard.jsx
  AboutUs.jsx
  EventsConducted.jsx
  UpcomingEvents.jsx
  EventCard.jsx
  ContactForm.jsx
  Footer.jsx
```

**3.4 Responsive Requirements**
- Breakpoints: mobile (<640px), tablet (640–1024px), desktop (>1024px).
- Member grid: 1 col mobile → 2 col tablet → 3–4 col desktop.
- Loader split-reveal simplifies to a straight fade on very low-power devices if `prefers-reduced-motion` is set (accessibility requirement).

**3.5 Performance**
- Lazy-load event/member images (`next/image` or `loading="lazy"`).
- GSAP timelines built with `will-change: transform` on animated elements only.
- Target: Lighthouse performance score ≥ 85 on mobile.

### 4. Backend Requirements
- REST endpoints: `GET /api/members`, `GET /api/events?type=past|upcoming`, `POST /api/contact`.
- `POST /api/contact` validates input (name, email format, non-empty message), rate-limits by IP (basic in-memory or Upstash Redis), then sends via email provider and/or stores in DB.
- No auth required for GET endpoints (public read data). If an admin panel is added later, protect write endpoints with a simple token or Supabase Auth.

### 5. Non-Functional Requirements
- **Accessibility**: respect `prefers-reduced-motion`; all interactive elements keyboard-navigable; alt text on member/event images.
- **Browser support**: latest 2 versions of Chrome, Firefox, Safari, Edge; mobile Safari/Chrome.
- **SEO**: basic meta tags, Open Graph image (club logo/hero frame) for link sharing.
- **Uptime/hosting**: static-friendly deploy (Vercel) so the marketing site stays up even if the small API layer has issues.

### 6. Environment / Config
```
NEXT_PUBLIC_SITE_URL=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
EMAIL_API_KEY=        # Resend/EmailJS
CONTACT_RECEIVER_EMAIL=
```

### 7. Out of Scope (v1)
- CMS/admin dashboard UI (data can be edited directly in the DB or via a seed script initially).
- Multi-language support.
- Event RSVP/ticketing logic.
