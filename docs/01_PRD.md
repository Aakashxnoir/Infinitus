# Product Requirements Document (PRD)
## Project: INFINITUS — Math Club Website

---

### 1. Overview
INFINITUS is the official website for a college math club. The site introduces the club, showcases its members, documents past events, promotes upcoming events, and gives visitors a way to get in touch. The experience is built around a distinctive scroll-driven landing sequence with a "cloud rise" motif and a signature split-screen loading animation, reflecting the club's identity through motion rather than static pages.

### 2. Goals
- Give INFINITUS a memorable, animation-led web presence that feels distinct from a generic club page.
- Make it easy for prospective and current members to learn who runs the club, what it has done, and what's coming next.
- Provide a simple, low-friction way for visitors to make contact (queries, collaboration, joining).
- Keep the build lightweight enough to be maintained by student contributors without a dedicated backend team.

### 3. Non-Goals
- No member login/authentication system in v1 — the site is public/informational, not a portal.
- No payment or event-registration/ticketing flow in v1 (can be a v2 addition).
- No CMS-driven multi-admin editing in v1; content updates go through a lightweight admin form or direct data file edits.

### 4. Target Users
| User | Needs |
|---|---|
| Prospective member (student) | Understand what the club is, see it's active, find how to join |
| Current member | Check upcoming events, see who else is on the team |
| Faculty / IEEE CI chapter stakeholders | Verify legitimacy, see event history, get a contact point |
| Event partners / other clubs | Quick "about us" + contact for collaboration |

### 5. Information Architecture (from concept sketch)
```
INFINITUS
├── Landing Page            (scroll + entrance animation)
├── Club Members Details    (team grid / roster)
├── About Us
│   ├── Events Conducted    (past events)
│   └── Upcoming Events
└── Contact
```
This is a **single-page-application-style scroll site**: Home / About / Events / Gallery / Contact are anchor sections reached via the top nav and scroll, not separate route-heavy pages (see header sketch: Home, About, Event, Gallery icons + Contact button).

### 6. Core Features (v1)

**6.1 Loading / Entrance Sequence**
- On first load, a branded loading screen plays: the INFINITUS logo/bell mark sits center screen, then the screen **splits from the middle** (top half slides up, bottom half slides down — curtain-reveal) to expose the landing page underneath.
- Purpose: sets tone immediately, masks initial asset load time.

**6.2 Landing / Hero Section**
- Full-viewport hero with the INFINITUS wordmark and club tagline.
- Ambient **cloud animation** in the background (clouds drift/rise continuously — "cloud rise ↑" per sketch).
- Scroll-triggered entrance animations for hero elements (fade/slide in as the page loads and as the user scrolls).
- Sticky/floating top nav: Home, About, Events, Gallery icons, with a **Contact** button pinned top-right.

**6.3 Club Members Details**
- Grid/carousel of member cards: photo, name, role (e.g., Vice Chair, core team, faculty advisor), optional short bio or social link.
- Should support easy reordering by role hierarchy (leadership first).

**6.4 About Us**
- Club mission/description block.
- **Events Conducted** — a chronological list/grid of past events with short descriptions, dates, and photos.
- **Upcoming Events** — highlighted cards for scheduled events (title, date, short blurb, optional RSVP/contact link).

**6.5 Contact**
- Contact form (name, email, message) or mailto/social links, reachable both via the nav button and a footer section.
- Section-scroll animation as the user reaches this part of the page (per "section scroll" note in sketch).

**6.6 Motion/Interaction Layer (cross-cutting)**
- Section-scroll transitions between each block (not a hard cut).
- A subtle animated calculation/formula motif (math-club branding — numbers, symbols, or an equation drifting/dropping in) as a background or transition detail.
- A **signal/dropdown** interaction on the nav (dropdown menu behavior for nav items, per sketch annotation).

### 7. Content Requirements
- Club logo/wordmark (final asset — sketch shows a bell-like mark, needs design pass).
- Member photos + role list.
- Past event write-ups + photos (for "Events Conducted").
- Upcoming event details (title, date, venue, short description).
- Club mission statement / "About Us" copy.
- Contact email / social handles.

### 8. Success Criteria
- Loading → landing transition plays smoothly with no visible jank on a mid-range laptop/mobile browser.
- All four sections (Landing, Members, About/Events, Contact) reachable both by scroll and by nav click within one page load.
- Site is legible and functional on mobile (single-column fallback for the member grid and event cards).
- Contact form/link successfully delivers a message or opens mail client.

### 9. Assumptions Made (flag for confirmation)
- Single-page scroll site rather than multi-route site — inferred from the sketch showing all sections stacked under one flow with a shared header.
- "Gallery" (seen in header sketch) is treated as part of/adjacent to Events Conducted unless you want it as a separate section — confirm.
- No backend/auth needed beyond storing member, event, and contact-form data — confirm before backend work proceeds.

### 10. Open Questions
- Should "Upcoming Events" support any RSVP/interest tracking, or is it purely informational in v1?
- Is Gallery a distinct photo section, or folded into Events Conducted?
- Any existing brand guideline (colors/fonts) beyond what's in the sketches?
