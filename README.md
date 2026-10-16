<p align="center">
  <img src=".github/readme/hero.svg" width="100%" alt="INFINITUS, the official Mathematics Club of Rajalakshmi Institute of Technology: the wordmark rises in and a lemniscate draws itself, traced by a moving dot">
</p>

<p align="center">
  <code>next.js 15</code>&nbsp;
  <code>react 19</code>&nbsp;
  <code>tailwind css</code>&nbsp;
  <code>framer motion</code>&nbsp;
  <code>supabase · optional</code>&nbsp;
  <code>vercel</code>
</p>

<p align="center"><b>Live:</b> <a href="https://infinitus-seven.vercel.app">infinitus-seven.vercel.app</a></p>

Most club websites are a poster and a contact form. **INFINITUS reads like a maths textbook.**

It's the official site of INFINITUS, the Mathematics Club of Rajalakshmi
Institute of Technology, Chennai. Every page is a numbered section, from **§0
Home** to **§5 Contact**. The ∞ in the hero is a real lemniscate of Bernoulli,
plotted point by point and traced by a moving dot, captioned *Fig. 1.* like a
figure in a book. The 404 page "tends to infinity". It comes in paper (light)
and ink (dark).

All the content lives in one plain JS file, so the site runs without a
database. Supabase can be switched on later without touching a page.

<img src=".github/readme/divider.svg" width="100%" alt="">

## Six pages, numbered like chapters

<p align="center">
  <img src=".github/readme/pages.svg" width="100%" alt="A contents list from §0 Home to §5 Contact; each page opens in turn behind a curtain that wipes up">
</p>

The homepage has a **Contents** section that links to every page. Moving between
pages, an accent curtain wipes up off the new one (`app/template.jsx`). Visitors
who ask for reduced motion get a plain fade instead.

<img src=".github/readme/divider.svg" width="100%" alt="">

## What's on it

|  |  |
|---|---|
| **§0 Home** | the wordmark and Fig. 1, the club in numbers, a marquee of what the club stands for, the latest events, the committee and the gallery |
| **§1 About** | who the club is, six pillars of what it does, and the journey from 2023 to 2026 |
| **§2 Events** | every event with its poster and its own page, linked newer ↔ older; upcoming ones get a **Register now** button to their Google Form |
| **§3 Team** | the Core Committee 2026–27; open a card to read what that role looks after |
| **§4 Gallery** | photos from events, celebrations and milestones |
| **§5 Contact** | the queries Google Form, email, Instagram and address |

It also ships a link-preview image, a sitemap, `robots.txt`, and read-only
JSON at `/api/members` and `/api/events`.

<img src=".github/readme/divider.svg" width="100%" alt="">

## Every event, on the wall

<p align="center">
  <img src=".github/readme/events.svg" width="100%" alt="Event posters sliding past, newest first">
</p>

Fifteen events since 2024, from a guest lecture on mathematics in modern
technology to **SHINKA 2026**, a mathematics and innovation championship for
school students. Each poster is a WebP in `public/events/`, and the strip above
is built from the same files.

<img src=".github/readme/divider.svg" width="100%" alt="">

## How it's wired

<p align="center">
  <img src=".github/readme/wiring.svg" width="100%" alt="lib/data.js and an optional Supabase feed getMembers() and getEvents(), which serve the pages and the JSON API">
</p>

Pages are server components that ask `lib/members.js` and `lib/events.js` for
their data, refreshed every 60 seconds. With no Supabase keys, everything comes
from `lib/data.js`. With keys set, members come from Supabase (falling back to
the bundled roster if the table is empty or the query fails), and Supabase
events are merged in with the bundled ones, newest first. The gallery and the
role responsibilities are always read from the repo.

<img src=".github/readme/divider.svg" width="100%" alt="">

## Run it locally

You need **Node 18.18+**.

```bash
git clone https://github.com/Aakashxnoir/Infinitus.git
cd Infinitus
npm install
npm run dev        # http://localhost:3000
```

> [!NOTE]
> No `.env.local` is needed to start. Without Supabase keys the site serves the
> bundled data in `lib/data.js`.

| | |
|---|---|
| `npm run dev` | dev server at localhost:3000 |
| `npm run build` · `npm start` | production build, then serve it |
| `npm run branding:optimize` | rebuild `public/brand/` from the master logos in `assets/brand/source/` |
| `npm run db:seed` | push the bundled members and events into Supabase (needs `.env.local`) |

<img src=".github/readme/divider.svg" width="100%" alt="">

## Keeping it up to date

| To… | Edit |
|---|---|
| add an **event** | `EVENTS` in `lib/data.js`, with its poster as a WebP in `public/events/` |
| open **registrations** | set `status: 'upcoming'` and a Google Form `registrationFormUrl` on the event |
| change the **committee** | `MEMBERS` in `lib/data.js` |
| update **role responsibilities** | `INFINITUS_Member_Role_Responsibilities.md`, then mirror it in `lib/roleResponsibilities.js` |
| add **gallery** photos | `GALLERY` in `lib/data.js`, with the image in `public/gallery/` |
| change **site copy** or the nav | `COPY` and `PAGES` in `lib/site.js` |
| swap **logos** | masters in `assets/brand/source/`, then `npm run branding:optimize` |

After adding events or members, run `node scripts/readme/build.mjs` so the
README's numbers and poster strip catch up.

<details>
<summary><b>Project structure</b></summary>
<br>

```
Infinitus/
├── app/                    # Next.js App Router (pages + API)
│   ├── page.jsx            # Homepage
│   ├── about/              # About the club + journey
│   ├── events/             # Events list + [id] detail pages
│   ├── team/               # Core committee / members
│   ├── gallery/            # Photo gallery
│   ├── contact/            # Contact + queries form link
│   ├── api/                # Read-only members / events JSON
│   ├── layout.jsx          # Site metadata + fonts
│   ├── template.jsx        # Page-transition curtain
│   ├── not-found.jsx       # 404 page
│   ├── sitemap.js, robots.js
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
│   ├── layout/             # Nav, Footer, Loader, PageHeader
│   ├── sections/           # Page sections (Hero, About, Journey, Events…)
│   │   └── home/           # Homepage-only sections
│   └── ui/                 # Shared UI (cards, browsers, gallery grid, lemniscate, reveal)
├── lib/                    # Site config, data (members, events, gallery), Supabase client
├── scripts/
│   ├── optimize-branding.mjs
│   ├── readme/build.mjs    # Draws the README's animated SVGs
│   └── db/                 # schema.sql, seed.mjs, migrations
├── .github/readme/         # The SVGs on this page
├── docs/                   # Product / design docs + official website content
├── styles/                 # Global CSS + Tailwind
└── INFINITUS_Member_Role_Responsibilities.md  # Source for lib/roleResponsibilities.js
```

</details>

<details>
<summary><b>Environment</b></summary>
<br>

Copy `.env.example` → `.env.local`. Every variable is optional.

| Variable | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://infinitus-seven.vercel.app` | canonical URL for metadata, the sitemap and link previews |
| `SUPABASE_URL` | — | turns Supabase on, together with a key below |
| `SUPABASE_SERVICE_ROLE_KEY` | — | server-side key, used by the site and `db:seed` |
| `SUPABASE_ANON_KEY` | — | used when there's no service-role key |

</details>

<details>
<summary><b>Database</b></summary>
<br>

Run `scripts/db/schema.sql` in the Supabase SQL editor (plus the `migrate-*.sql`
files if the database is older), set the keys in `.env.local`, then
`npm run db:seed` to copy the bundled members and events across.

</details>

<details>
<summary><b>Rebuilding these animations</b></summary>
<br>

Every image on this page is drawn by `node scripts/readme/build.mjs` from the
site's own data, theme and lemniscate. It uses `sharp` (already a dev
dependency) to embed the logos, posters and photos, and everything moves with
CSS keyframes or SMIL, so GitHub plays it as a plain image.

</details>

<img src=".github/readme/divider.svg" width="100%" alt="">

<table>
<tr>
<td width="96"><a href="https://github.com/Aakashxnoir"><img src="https://github.com/Aakashxnoir.png?size=160" width="80" alt="Aakashxnoir"></a></td>
<td><b>Aakash Buddha Kannan</b> · <a href="https://github.com/Aakashxnoir">@Aakashxnoir</a><br>Technical Head, INFINITUS 2026–27. Built the website.</td>
</tr>
</table>

<p align="center">
  <img src=".github/readme/footer.svg" width="100%" alt="Mathematics beyond the classroom.">
</p>

**INFINITUS** · Mathematics Club, Rajalakshmi Institute of Technology, Chennai ·
[infinitus@ritchennai.edu.in](mailto:infinitus@ritchennai.edu.in) ·
[Instagram](https://www.instagram.com/infinitus_club.rit/)
