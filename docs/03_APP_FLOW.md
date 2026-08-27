# App Flow Document
## Project: INFINITUS — Math Club Website

---

### 1. High-Level User Flow
```
Visitor lands on URL
        │
        ▼
[Loading Screen]  — logo centered, screen splits from middle
        │  (auto, ~1.5–2s, skippable on click)
        ▼
[Landing / Hero Section]
  - Cloud background animation running (continuous, ambient)
  - Nav bar visible: Home | About | Events | Gallery   [Contact →]
        │
        ├── User scrolls down ─────────────┐
        │                                   ▼
        │                        [Club Members Details]
        │                          - Roster grid / cards
        │                                   │
        │                                   ▼
        │                        [About Us]
        │                          ├── Events Conducted (past)
        │                          └── Upcoming Events
        │                                   │
        │                                   ▼
        │                        [Contact Section / Footer]
        │                          - Form or contact links
        │
        └── User clicks nav item ──────────► Smooth-scrolls directly
                                              to that section
```

### 2. Detailed Screen-by-Screen Flow

**Step 0 — Initial Load**
1. Browser requests page → critical assets (logo, fonts, hero background) load first.
2. Loading overlay renders immediately, blocking interaction with the page beneath (`overflow: hidden` on body).
3. Logo mark animates in at center of screen.
4. After a short hold, the screen visually splits along a horizontal midline — top half exits upward, bottom half exits downward — revealing the landing page beneath.
5. Overlay unmounts; scroll is re-enabled; landing page animations (hero fade/slide-in) begin immediately after.
6. *(Optional, confirm)*: if the loader has already played this session, skip straight to the landing page on subsequent internal navigation.

**Step 1 — Landing Page**
1. Hero section shows: INFINITUS wordmark/logo, tagline, cloud background looping.
2. Top nav bar is visible (sticky on scroll): Home / About / Events / Gallery icons + Contact button.
3. A subtle scroll-cue (arrow/chevron) invites the user to scroll down.
4. As user scrolls, hero content parallax/fades out while the next section fades/slides in (section-scroll transition).

**Step 2 — Club Members Details**
1. Section header ("Meet the Team" / "Club Members").
2. Grid of member cards: photo, name, role — leadership (Chair/Vice Chair) shown first, then core team.
3. Optional: click/hover on a card reveals a short bio or social link (LinkedIn/Instagram).
4. Scroll continues to About Us.

**Step 3 — About Us**
1. Club mission/description block (short paragraph on what INFINITUS is and does).
2. Sub-section: **Events Conducted**
   - Chronological/grid list of past events, each with title, date, short description, photo.
   - Optional filter/tag by event type (workshop, competition, guest talk) if content volume warrants it.
3. Sub-section: **Upcoming Events**
   - Cards for scheduled events: title, date, venue, short blurb.
   - Optional CTA per card ("Learn more" → links to contact or an external registration link if one exists).

**Step 4 — Contact**
1. Contact form: name, email, message fields, submit button.
2. On submit: client-side validation → `POST /api/contact` → success/error toast shown inline (no page reload).
3. Footer alongside/below contact: social links, club email, copyright.

### 3. Navigation Behavior
- **Nav bar** is present from the moment the loader finishes and stays visible (sticky) through scroll.
- Clicking a nav item smooth-scrolls to the matching section anchor rather than navigating to a new URL — this keeps the whole experience on one page load.
- **Contact button** in the nav behaves the same way: smooth-scrolls to the Contact section (rather than opening a separate page), unless you'd prefer it open a modal — confirm.
- Active nav item highlights based on which section is currently in view (scroll-spy behavior).

### 4. Error / Edge-Case Flows
- **Contact form submission fails** (network/server error): inline error message, form data preserved, retry allowed.
- **No upcoming events currently scheduled**: section shows a friendly placeholder ("New events coming soon — check back!") instead of an empty grid.
- **Slow network on first load**: loader stays visible until hero assets are ready (with a max-wait fallback, e.g. 4s, so users are never stuck on a stalled loader).
- **`prefers-reduced-motion` enabled**: loader and section-scroll animations are replaced with simple fades/instant reveals; cloud background animation is either paused or slowed significantly.

### 5. Mobile Flow Adjustments
- Nav collapses into a hamburger/menu icon; tapping opens a simple list of the same anchor links.
- Member grid and event cards stack to a single column.
- Loader split-reveal animation shortened slightly (mobile devices are more render-constrained).
