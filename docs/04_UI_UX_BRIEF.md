# UI/UX Brief
## Project: INFINITUS — Math Club Website

---

### 1. Design Direction
INFINITUS should feel like a math club that takes its craft seriously but presents it with warmth and motion, not sterility. The concept sketches point to a **sky/cloud metaphor** (clouds rising, drifting, a "cloud animation" background layer) paired with **precise, symbolic math motifs** (formulas, calculations, dropdown "signal" details) — read as: *structure and infinity, floating in open space.* The infinity-themed name should show up visually, not just in the wordmark (e.g., an ∞ motif worked into transitions, loaders, or dividers).

**Mood**: airy, curious, quietly technical, welcoming rather than intimidating.

### 2. Visual System

**2.1 Color**
- Base: soft sky tones (light blue/off-white) for the cloud/hero backdrop, per the sketch's airy feel.
- Accent: a confident secondary color for CTAs and highlights — deep indigo/navy or a warm accent (amber/coral) reads well against sky blue and nods to "math meets energy."
- Avoid pure black/white flatness — use warm off-whites and soft shadows so the cloud motif has depth.
- *(You've navigated club-color constraints before for merch — worth checking those same constraints apply here before finalizing a palette.)*

**2.2 Typography**
- Headline/logo face: something with a bit of geometric character (rounded-geometric sans, e.g. Poppins/Space Grotesk/Sora) — ties back to "math = geometry" without being a cliché monospace/code font.
- Body: a clean, highly legible sans (Inter/Manrope) for member bios and event descriptions.
- Consider using an actual mathematical symbol (∞, Σ, π) as a recurring micro-detail — divider, bullet, loader element — rather than decoration scattered everywhere.

**2.3 Iconography**
- Nav icons (Home/About/Events/Gallery per sketch) should be a single consistent icon set — simple line icons, not mixed styles.
- Cloud shapes: soft, rounded, layered (2–3 depth layers) rather than one flat cloud silhouette — gives the drift/rise animation somewhere to go.

### 3. Motion & Animation Language
This site is animation-led, so motion is a design decision, not an afterthought:

| Moment | Motion treatment |
|---|---|
| Loading screen | Logo centers, holds briefly, screen splits top/bottom from the middle — should feel like curtains opening onto the sky, not a mechanical wipe. Ease: `power2.inOut`, ~0.8s split duration. |
| Cloud background | Continuous slow drift (horizontal) + gentle vertical "rise" pulse. Should read as ambient, never distracting — keep opacity low (~40–60%) behind foreground text. |
| Section transitions | Content fades/slides in as it enters viewport (8–12% vertical offset, not a dramatic swoop) — subtlety over spectacle so repeat visits don't feel exhausting. |
| Nav dropdown | Signal-style reveal (per sketch annotation "signal dropdown") — quick, snappy easing, not a slow fade, since it's a utility interaction. |
| Member cards / event cards | Slight lift + shadow on hover (desktop); tap-scale feedback on mobile. |

**Guiding rule**: every animation should have a reason (guide attention, mask load, confirm interaction) — avoid decorative motion that adds jank without adding meaning, especially on mobile.

### 4. Layout Principles
- **Single continuous scroll** — no hard page-to-page navigation for the core sections; the nav is a scroll-assist, not a router.
- Generous vertical whitespace between sections so the cloud/sky feeling has room to breathe — avoid a cramped, form-dense feel.
- Section headers should be consistent in scale/weight across Members, About, Events, Contact — this is what makes a scroll site feel designed rather than stitched together.
- Content max-width ~1200px on desktop, centered, with full-bleed background layers (clouds) behind it.

### 5. Component-Level Notes

**Member Cards**: photo (consistent aspect ratio/crop across all members — headshot style), name, role. Leadership roles visually distinguished (badge or subtle color) from general members without a jarring size jump.

**Event Cards (Conducted vs. Upcoming)**: use the *same card component* for both, differentiated by a small status tag ("Past" / "Upcoming") — keeps the design system tight rather than building two visually different systems for what's structurally the same content.

**Contact Form**: keep it to 3 fields (name, email, message) — friction is the enemy of a club contact form. Inline validation, no full-page redirect on submit.

### 6. Accessibility Notes
- Maintain WCAG AA contrast for text over the cloud background (test text-on-sky-blue combinations directly — light-on-light is the most likely failure point given this palette direction).
- Respect `prefers-reduced-motion`: swap split-reveal loader and scroll-parallax for simple fades.
- Nav must be fully operable by keyboard (tab order matches visual order, dropdown accessible via keyboard).

### 7. Deliverables Recommended Before Build
- Finalized logo/wordmark (sketch shows a bell-like mark under "INFINITUS CLUB" — needs a clean vector pass).
- A 4–6 color palette + 2-typeface pairing locked in Figma before component build starts.
- One fully animated reference prototype of the loader (highest-risk animation piece) built and validated before the rest of the site is built around it.
