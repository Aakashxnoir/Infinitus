// Builds the README's animated SVGs into .github/readme/.
//
//   node scripts/readme/build.mjs
//
// Logos, posters and photos are read from public/ and embedded with sharp.
// Everything moves with CSS keyframes or SMIL, because GitHub shows these as
// plain images. The numbers and posters come from lib/data.js, so re-run it
// after adding events or members and the README catches up.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { EVENTS, GALLERY, MEMBERS } from '../../lib/data.js';
import { COPY, PAGES, SITE, SOCIAL } from '../../lib/site.js';
import { LEADERSHIP_ROLES } from '../../lib/format.js';

const ROOT = join(import.meta.dirname, '..', '..');
const OUT = join(ROOT, '.github', 'readme');
mkdirSync(OUT, { recursive: true });

// The site's own "ink" theme (styles/globals.css, .dark).
const INK = '#eceae2';
const MUTED = '#a0a3b8';
const DIM = 'rgba(236,234,226,.4)';
const EDGE = 'rgba(236,234,226,.14)';
const PAPER = '#0c0e1f';
const ACC = '#8a9bff';
const ACC2 = '#bac5ff';
const GOLD = '#ecbe50';
const EASE = 'cubic-bezier(.65,0,.35,1)';
const OUTE = 'cubic-bezier(.2,.7,.2,1)';

const BASE_CSS = `
.s{font-family:'STIX Two Text','STIX Two Math',Cambria,Georgia,'Times New Roman',serif}
.b{font-family:'IBM Plex Sans',Inter,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}
.m{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,'DejaVu Sans Mono','Liberation Mono',monospace}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.mo{display:none}}`;

const f2 = (n) => +n.toFixed(2);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

function frame(w, h, body, { css = '', defs = '', title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${attr(title)}">
<title>${esc(title)}</title>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" stop-color="#07091a"/><stop offset=".55" stop-color="${PAPER}"/><stop offset="1" stop-color="#151934"/></linearGradient>
<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 .5H.5V48" fill="none" stroke="${INK}" stroke-opacity=".06"/></pattern>
<radialGradient id="gridfade" cx=".5" cy=".4" r=".7"><stop offset=".3" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="gridmask"><rect width="${w}" height="${h}" fill="url(#gridfade)"/></mask>
<radialGradient id="glow"><stop offset="0" stop-color="${ACC}" stop-opacity=".55"/><stop offset="1" stop-color="${ACC}" stop-opacity="0"/></radialGradient>
<clipPath id="card"><rect width="${w}" height="${h}" rx="22"/></clipPath>
${defs}
</defs>
<style>${BASE_CSS}${css}</style>
<g clip-path="url(#card)">
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#grid)" mask="url(#gridmask)"/>
${body}
</g>
<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="21.5" fill="none" stroke="${EDGE}"/>
</svg>
`;
}

/** Keyframes from [seconds, css] stops over a `dur`-second loop, eased segment by segment. */
function track(name, dur, stops, ease = EASE) {
  const kf = stops.map(([t, css]) => `${f2((t / dur) * 100)}%{${css};animation-timing-function:${ease}}`).join('');
  return `@keyframes ${name}{${kf}}.${name}{animation:${name} ${dur}s linear infinite}`;
}

/** Shown from `a` to `b` seconds of the loop, with a short fade at each end. */
function shown(name, dur, a, b, fade = 0.04) {
  const s = a <= 0 ? [[0, 'opacity:1']] : [[0, 'opacity:0'], [a, 'opacity:0'], [a + fade, 'opacity:1']];
  s.push(...(b >= dur ? [[dur, 'opacity:1']] : [[b, 'opacity:1'], [b + fade, 'opacity:0'], [dur, 'opacity:0']]));
  return track(name, dur, s, 'linear');
}

/** Lemniscate of Bernoulli, (x² + y²)² = a²(x² − y²), around the origin. Same curve as components/ui/Lemniscate.jsx. */
function lemniscate(a, n = 240) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const d = 1 + s * s;
    return `${i ? 'L' : 'M'}${f2((a * c) / d)} ${f2((a * s * c) / d)}`;
  }).join('');
}

/** A dot that rides the curve forever, with a soft glow. */
function rider(d, { r = 3.5, dur = 9, begin = 0 } = {}) {
  return `<g class="mo"><circle r="${r * 4}" fill="url(#glow)"/><circle r="${r}" fill="${INK}"/><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${d}"/></g>`;
}

/** Textbook axes with ticks at ±a, ±a/2 and italic labels. */
function axes(a, { ext = 1.12, h = 0.42, labels = true } = {}) {
  const X = f2(a * ext);
  const Y = f2(a * h);
  const ticks = [-a, -a / 2, a / 2, a].map((x) => `M${f2(x)} -3V3`).join('');
  const lab = labels
    ? `<g class="s" font-style="italic" font-size="13" fill="${MUTED}"><text x="${X - 6}" y="-7">x</text><text x="6" y="${-Y + 10}">y</text><text x="${a + 4}" y="17">a</text><text x="${-a - 4}" y="17" text-anchor="end">−a</text></g>`
    : '';
  return `<path d="M${-X} 0H${X}M0 ${-Y}V${Y}${ticks}" stroke="${INK}" stroke-opacity=".28" stroke-width=".8" fill="none"/>${lab}`;
}

async function embed(file, w, h, { q = 64, fit = 'cover' } = {}) {
  const buf = await sharp(join(ROOT, 'public', file))
    .resize(w, h, { fit, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: q })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

const month = (d) => new Date(d).toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

/** Greedy word wrap by character count; good enough for short titles. */
function wrap(text, max, lines = 2) {
  const out = [''];
  for (const word of text.split(' ')) {
    const cur = out[out.length - 1];
    if (!cur || cur.length + 1 + word.length <= max) out[out.length - 1] = cur ? `${cur} ${word}` : word;
    else out.push(word);
  }
  if (out.length > lines) {
    out.length = lines;
    out[lines - 1] = `${out[lines - 1].replace(/[\s,:—-]+$/, '')}…`;
  }
  return out;
}

const past = EVENTS.filter((e) => e.status === 'conducted');
const STATS = [
  { value: past.length, label: 'Events hosted' },
  { value: MEMBERS.length, label: 'Core members' },
  { value: new Set(MEMBERS.map((m) => m.department).filter(Boolean)).size, label: 'Departments' },
];

// ------------------------------------------------------------------ hero

async function hero() {
  const W = 960;
  const H = 470;
  const a = 176;
  const [cx, cy] = [700, 322];
  const d = lemniscate(a);
  const rit = await embed('brand/rit-white-md.webp', 180, 40, { q: 80, fit: 'contain' });
  const badge = await embed('brand/infinitus-hero.webp', 112, 112, { q: 72 });

  const stats = STATS.map(
    (s, i) => `<g transform="translate(${48 + i * 128} 0)">
<text class="s" x="0" y="420" font-size="40" font-weight="500" fill="${INK}">${s.value}</text>
<text class="b" x="0" y="442" font-size="12" fill="${MUTED}">${esc(s.label)}</text>
${i ? `<path d="M-16 384V446" stroke="${EDGE}"/>` : ''}</g>`
  ).join('');

  const body = `
<ellipse cx="${cx}" cy="${cy}" rx="300" ry="150" fill="url(#glow)" opacity=".22"/>
<g class="r r0">
<image href="${rit}" x="48" y="42" width="90" height="20"/>
<path d="M152 44V62" stroke="${EDGE}"/>
<text class="b" x="166" y="57" font-size="14" fill="${MUTED}">${esc(COPY.hero.badge)} · ${esc(SITE.location.split(',')[0])}</text>
</g>
<g class="r r0"><image href="${badge}" x="856" y="28" width="56" height="56"/></g>
<g clip-path="url(#wm)"><text class="s wm" x="44" y="206" font-size="150" font-weight="600" letter-spacing="-2" textLength="870" lengthAdjust="spacingAndGlyphs" fill="${INK}">INFINITUS</text></g>
<path class="rule" d="M48 236H912" stroke="${INK}" stroke-opacity=".2"/>
<g class="r r1">
<text class="s" x="48" y="292" font-size="30" font-style="italic" fill="${INK}">${esc(COPY.hero.tagline)}.</text>
<text class="b" font-size="14" fill="${MUTED}"><tspan x="48" y="326">The Mathematics Club of Rajalakshmi Institute of</tspan><tspan x="48" y="346">Technology, Chennai — competitions, workshops,</tspan><tspan x="48" y="366">puzzles and learning beyond the classroom.</tspan></text>
</g>
<path class="r r2" d="M48 384H420" stroke="${EDGE}"/>
<g class="r r2">${stats}</g>
<g transform="translate(${cx} ${cy})">
<g class="r r1">${axes(a)}</g>
<path class="curve" d="${d}" pathLength="1" fill="none" stroke="${ACC}" stroke-width="2" stroke-linejoin="round"/>
${rider(d, { begin: 3.2 })}
</g>
<g class="r r2">
<text class="b" x="512" y="438" font-size="12" fill="${MUTED}"><tspan font-weight="600" fill="${INK}">Fig. 1.</tspan> The lemniscate of Bernoulli, <tspan class="s" font-style="italic" font-size="13" fill="${INK}">(x² + y²)² = a²(x² − y²)</tspan></text>
<text class="b" x="512" y="456" font-size="12" fill="${MUTED}">— the curve behind our name.</text>
</g>`;

  const css = `
@keyframes rise{from{opacity:0;transform:translateY(16px)}}
.r{animation:rise .9s ${OUTE} both}.r0{animation-delay:.1s}.r1{animation-delay:1s}.r2{animation-delay:1.4s}
@keyframes wm{from{transform:translateY(150px)}}
.wm{animation:wm 1.1s ${OUTE} .2s both}
@keyframes rule{from{transform:scaleX(0)}}
.rule{transform-origin:48px 236px;animation:rule 1.2s ${EASE} .7s both}
@keyframes draw{from{stroke-dashoffset:1}}
.curve{stroke-dasharray:1;animation:draw 2.2s ${EASE} 1s both}`;

  const defs = `<clipPath id="wm"><rect x="0" y="80" width="${W}" height="140"/></clipPath>`;
  return frame(W, H, body, {
    css,
    defs,
    title: `INFINITUS — ${COPY.hero.badge}, Rajalakshmi Institute of Technology. ${COPY.hero.tagline}.`,
  });
}

// ------------------------------------------------------------ six pages

async function pages() {
  const W = 960;
  const H = 340;
  const P = 2.6;
  const N = PAGES.length;
  const T = f2(P * N);
  const VH = 240;
  const host = new URL(SITE.url).host;
  let css = '';

  // Contents, like the homepage's "Find your way around"
  const rowY = (i) => 152 + i * 30;
  const rows = PAGES.map(
    (p, i) => `<text class="m" x="52" y="${rowY(i)}" font-size="12" fill="${ACC}">§${p.index}</text>
<text class="s" x="88" y="${rowY(i)}" font-size="19" fill="${INK}">${esc(p.navLabel)}</text>
<path d="M200 ${rowY(i) - 4}H362" stroke="${DIM}" stroke-dasharray="0 6" stroke-linecap="round" stroke-width="1.6"/>
<text class="m" x="440" y="${rowY(i)}" font-size="11" fill="${MUTED}" text-anchor="end">${esc(p.href)}</text>`
  ).join('');

  const hl = [[0, 'transform:translateY(0)']];
  for (let i = 1; i < N; i++) hl.push([i * P - 0.35, `transform:translateY(${(i - 1) * 30}px)`], [i * P, `transform:translateY(${i * 30}px)`]);
  hl.push([T - 0.35, `transform:translateY(${(N - 1) * 30}px)`], [T, 'transform:translateY(0)']);
  css += track('hl', T, hl);

  // The curtain from app/template.jsx: it sweeps up over the old page and off the top of the new one
  const cur = [[0, 'transform:translateY(0)'], [0.08, 'transform:translateY(0)'], [0.7, `transform:translateY(-${VH}px)`]];
  for (let i = 1; i <= N; i++) {
    const b = i * P;
    cur.push([b - 0.36, `transform:translateY(-${VH}px)`], [b - 0.35, `transform:translateY(${VH}px)`], [Math.min(b, T), 'transform:translateY(0)']);
    if (i < N) cur.push([b + 0.08, 'transform:translateY(0)'], [b + 0.7, `transform:translateY(-${VH}px)`]);
  }
  css += track('cur', T, cur);
  css += `.cur{transform:translateY(-${VH}px)}.pg{opacity:0}.pg0{opacity:1}`;

  const latest = past.slice(0, 3);
  const posters = await Promise.all(latest.map((e) => embed(e.coverImageUrl.slice(1), 160, 200, { q: 58 })));
  const photos = await Promise.all(
    [[240, 140], [240, 128], [240, 280], [240, 128], [240, 140]].map(([w, h], i) => embed(GALLERY[i].src.slice(1), w, h, { q: 55 }))
  );
  const roles = [...LEADERSHIP_ROLES, 'Treasurer', 'Creative Director', 'Innovation Head'];
  const x0 = 512;
  const head = (t) => `<text class="s" x="${x0}" y="136" font-size="26" fill="${INK}">${esc(t)}</text>`;

  const content = {
    home: `<text class="s" x="${x0}" y="150" font-size="46" font-weight="600" fill="${INK}">INFINITUS</text>
<text class="s" x="${x0}" y="180" font-size="17" font-style="italic" fill="${INK}">${esc(COPY.hero.tagline)}.</text>
<path d="M${x0} 198H888" stroke="${EDGE}"/>
${STATS.map((s, i) => `<text class="s" x="${x0 + i * 78}" y="244" font-size="26" fill="${INK}">${s.value}</text><text class="b" x="${x0 + i * 78}" y="262" font-size="10" fill="${MUTED}">${esc(s.label)}</text>`).join('')}
<g transform="translate(822 246)">${axes(56, { labels: false })}<path d="${lemniscate(56)}" fill="none" stroke="${ACC}" stroke-width="1.6"/>${rider(lemniscate(56), { r: 2.5, dur: 6 })}</g>`,
    about: `${head(COPY.about.journeyHeading)}
<path d="M548 200H860" stroke="${EDGE}"/>
${COPY.about.journey.map((j, i) => { const x = 548 + i * 104; return `<circle cx="${x}" cy="200" r="4.5" fill="${PAPER}" stroke="${ACC}" stroke-width="1.6"/><text class="m" x="${x}" y="186" font-size="12" fill="${ACC}" text-anchor="middle">${j.year}</text><text class="b" x="${x}" y="224" font-size="11" fill="${INK}" text-anchor="middle">${esc(j.title)}</text>`; }).join('')}
<text class="s" x="${x0}" y="270" font-size="16" font-style="italic" fill="${MUTED}">${esc(COPY.about.focusQuote)}</text>`,
    events: `${head(COPY.events.heading)}
${latest.map((e, i) => { const x = x0 + i * 92; return `<image href="${posters[i]}" x="${x}" y="150" width="80" height="100" preserveAspectRatio="xMidYMid slice"/><rect x="${x + 0.5}" y="150.5" width="79" height="99" rx="3" fill="none" stroke="${EDGE}"/><text class="m" x="${x}" y="268" font-size="9" fill="${MUTED}">${month(e.eventDate)}</text>`; }).join('')}
<rect x="${x0 + 276.5}" y="150.5" width="79" height="99" rx="3" fill="none" stroke="${DIM}" stroke-dasharray="3 4"/>
<text class="s" x="${x0 + 316}" y="208" font-size="22" font-style="italic" fill="${MUTED}" text-anchor="middle">+${past.length - latest.length}</text>`,
    team: `${head(COPY.members.heading)}
${roles.map((r, i) => { const x = x0 + (i % 2) * 192; const y = 152 + Math.floor(i / 2) * 36; const on = r === 'Technical Head'; return `<rect x="${x + 0.5}" y="${y + 0.5}" width="182" height="28" rx="5" fill="${on ? 'rgba(138,155,255,.12)' : 'rgba(236,234,226,.03)'}" stroke="${on ? ACC : EDGE}"/><circle cx="${x + 16}" cy="${y + 14}" r="6.5" fill="${ACC}" fill-opacity="${on ? 0.7 : 0.25}"/><text class="b" x="${x + 30}" y="${y + 18.5}" font-size="11" fill="${INK}">${esc(r)}</text><text class="m" x="${x + 168}" y="${y + 18.5}" font-size="11" fill="${on ? ACC : DIM}" text-anchor="end">→</text>`; }).join('')}`,
    gallery: `${head(COPY.gallery.heading)}
${[[x0, 150, 120, 70], [x0, 226, 120, 64], [x0 + 128, 150, 120, 140], [x0 + 256, 150, 120, 64], [x0 + 256, 220, 120, 70]].map(([x, y, w, h], i) => `<image href="${photos[i]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/><rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="3" fill="none" stroke="${EDGE}"/>`).join('')}`,
    contact: `${head(COPY.contact.heading)}
<text class="s" font-size="18" font-style="italic" fill="${INK}"><tspan x="${x0}" y="174">Have a question, an idea,</tspan><tspan x="${x0}" y="198">or a problem worth solving?</tspan></text>
<rect x="${x0}" y="218" width="176" height="34" rx="17" fill="${INK}"/>
<text class="b" x="${x0 + 88}" y="239.5" font-size="12" font-weight="600" fill="${PAPER}" text-anchor="middle">${esc(COPY.contact.formCta)} →</text>
<text class="m" x="${x0}" y="282" font-size="11" fill="${MUTED}">${esc(SITE.contactEmail)}</text>`,
  };

  const screens = PAGES.map((p, i) => {
    css += shown(`pg${i}`, T, i * P, (i + 1) * P);
    return `<g class="pg pg${i}"><text class="m" x="${x0}" y="96" font-size="11" fill="${ACC}">§${p.index} ${esc(p.navLabel)}</text>${content[p.id]}</g>`;
  }).join('\n');
  const urls = PAGES.map((p, i) => `<text class="m pg pg${i}" x="570" y="54" font-size="10" fill="${MUTED}">${host}${p.href === '/' ? '' : esc(p.href)}</text>`).join('');

  const body = `
<text class="m" x="48" y="70" font-size="11" fill="${ACC}">${esc(COPY.home.exploreEyebrow)}</text>
<text class="s" x="48" y="104" font-size="26" fill="${INK}">${esc(COPY.home.exploreHeading)}</text>
<g class="hl"><rect x="36" y="${rowY(0) - 20}" width="416" height="28" rx="6" fill="${ACC}" fill-opacity=".1"/><rect x="36" y="${rowY(0) - 20}" width="3" height="28" fill="${ACC}"/></g>
${rows}
<rect x="488.5" y="36.5" width="423" height="267" rx="12" fill="${PAPER}" stroke="${EDGE}"/>
<path d="M489 64H911" stroke="${EDGE}"/>
<circle cx="506" cy="50" r="4" fill="${DIM}"/><circle cx="520" cy="50" r="4" fill="${DIM}"/><circle cx="534" cy="50" r="4" fill="${DIM}"/>
<rect x="556" y="42" width="340" height="16" rx="8" fill="${INK}" fill-opacity=".05"/>
${urls}
<g clip-path="url(#vp)">
${screens}
<rect class="cur" x="488" y="64" width="424" height="${VH}" fill="${ACC}"/>
</g>`;

  const defs = `<clipPath id="vp"><path d="M489 64H911V292a11 11 0 0 1-11 11H500a11 11 0 0 1-11-11Z"/></clipPath>`;
  return frame(W, H, body, { css, defs, title: 'Six pages numbered like chapters, from §0 Home to §5 Contact, with a curtain that wipes up between them' });
}

// ---------------------------------------------------------------- events

async function events() {
  const W = 960;
  const H = 300;
  const [pw, ph, gap] = [136, 170, 20];
  const pitch = pw + gap;
  const strip = EVENTS.length * pitch;
  const imgs = await Promise.all(EVENTS.map((e) => embed(e.coverImageUrl.slice(1), 170, 213, { q: 58 })));

  const defs = `${imgs.map((src, i) => `<image id="p${i}" width="${pw}" height="${ph}" href="${src}" preserveAspectRatio="xMidYMid slice"/>`).join('\n')}
<linearGradient id="edge" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".06" stop-color="#fff"/><stop offset=".94" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="fade"><rect width="${W}" height="${H}" fill="url(#edge)"/></mask>
<clipPath id="pc" clipPathUnits="objectBoundingBox"><rect width="1" height="1" rx=".03" ry=".024"/></clipPath>`;

  const card = (e, i, x) => {
    const title = wrap(e.title.split(/: | — /)[0], 21);
    return `<g transform="translate(${x} 28)"><use href="#p${i}" clip-path="url(#pc)"/><rect x=".5" y=".5" width="${pw - 1}" height="${ph - 1}" rx="4" fill="none" stroke="${EDGE}"/>
<text class="m" y="${ph + 24}" font-size="10" fill="${ACC}">${month(e.eventDate)}</text>
<text class="b" font-size="12.5" fill="${INK}">${title.map((t, j) => `<tspan x="0" y="${ph + 43 + j * 16}">${esc(t)}</tspan>`).join('')}</text>
<text class="b" y="${ph + 80}" font-size="11" fill="${MUTED}">${esc(e.eventType)}</text></g>`;
  };
  const once = EVENTS.map((e, i) => card(e, i, 48 + i * pitch)).join('\n');
  const twice = EVENTS.map((e, i) => card(e, i, 48 + strip + i * pitch)).join('\n');

  const css = `@keyframes slide{to{transform:translateX(-${strip}px)}}.track{animation:slide ${EVENTS.length * 4}s linear infinite}`;
  const body = `<g mask="url(#fade)"><g class="track">${once}${twice}</g></g>`;
  return frame(W, H, body, { css, defs, title: `${EVENTS.length} event posters sliding past, from ${EVENTS.at(-1).title} to ${EVENTS[0].title}` });
}

// ---------------------------------------------------------------- wiring

function wiring() {
  const W = 960;
  const H = 320;
  const node = ({ x, y, w, h, title, sub, dashed = false, size = 13 }) => `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="10" fill="#151934" fill-opacity=".85" stroke="${dashed ? ACC : EDGE}" stroke-opacity="${dashed ? 0.55 : 1}"${dashed ? ' stroke-dasharray="5 5"' : ''}/>
<text class="m" x="${x + 16}" y="${y + 27}" font-size="${size}" fill="${INK}">${esc(title)}</text>
${[].concat(sub).map((s, i) => `<text class="${s.startsWith('/') ? 'm' : 'b'}" x="${x + 16}" y="${y + 47 + i * 17}" font-size="11" fill="${MUTED}">${esc(s)}</text>`).join('')}`;

  const A = { x: 40, w: 240 };
  const B = { x: 360, w: 250 };
  const C = { x: 690, w: 230 };
  const n = {
    data: { ...A, y: 56, h: 62, title: 'lib/data.js', sub: 'members · events · gallery' },
    db: { ...A, y: 142, h: 62, title: 'Supabase', sub: 'optional · on when keys are set', dashed: true },
    roles: { ...A, y: 228, h: 62, title: 'lib/roleResponsibilities.js', sub: 'what each role looks after', size: 12 },
    members: { ...B, y: 86, h: 62, title: 'getMembers()', sub: 'Supabase rows, or the bundled roster' },
    events: { ...B, y: 196, h: 62, title: 'getEvents()', sub: 'bundled + Supabase, newest first' },
    pages: { ...C, y: 56, h: 100, title: 'Pages', sub: ['/  /about  /events', '/team  /gallery  /contact', 'server-rendered, refreshed every 60 s'] },
    api: { ...C, y: 196, h: 62, title: '/api/members  /api/events', sub: 'read-only JSON', size: 12 },
  };
  const out = (k) => [n[k].x + n[k].w, n[k].y + n[k].h / 2];
  const inn = (k) => [n[k].x, n[k].y + n[k].h / 2];
  const curve = ([x1, y1], [x2, y2]) => {
    const dx = (x2 - x1) / 2;
    return `M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
  };
  const edges = [
    ['data', 'members'], ['data', 'events'], ['db', 'members', true], ['db', 'events', true], ['roles', 'members'],
    ['members', 'pages'], ['events', 'pages'], ['members', 'api'], ['events', 'api'],
  ].map(([a, b, opt]) => ({ d: curve(out(a), inn(b)), opt }));
  edges.push({ d: `M${out('data')[0]} 70C480 22 560 22 ${n.pages.x} 80`, label: 'gallery' });

  const lines = edges.map((e) => `<path d="${e.d}" fill="none" stroke="${ACC}" stroke-opacity="${e.opt ? 0.3 : 0.32}" stroke-width="1.2"${e.opt ? ' stroke-dasharray="4 5"' : ''}/>`).join('');
  const packets = edges
    .map((e, i) => `<g class="mo" opacity="${e.opt ? 0.5 : 1}"><circle r="8" fill="url(#glow)"/><circle r="2.6" fill="${e.opt ? ACC2 : INK}"/><animateMotion dur="2.4s" begin="${f2((i % 5) * 0.48 + (i >= 5 ? 1.2 : 0))}s" repeatCount="indefinite" path="${e.d}"/></g>`)
    .join('');
  const body = `
<g class="m" font-size="10" fill="${DIM}" letter-spacing="1.5"><text x="40" y="34">SOURCES</text><text x="360" y="34">LIB</text><text x="690" y="34">SERVED</text></g>
<text class="m" x="505" y="24" font-size="10" fill="${DIM}" text-anchor="middle">gallery</text>
${lines}
${Object.values(n).map(node).join('\n')}
${packets}`;
  return frame(W, H, body, {
    title: 'lib/data.js and an optional Supabase feed getMembers() and getEvents(), which serve the pages and the read-only JSON API',
  });
}

// ---------------------------------------------------------------- footer

function footer() {
  const W = 960;
  const H = 190;
  const d = lemniscate(58);
  const ig = SOCIAL.instagramHandle;
  const body = `
<ellipse cx="480" cy="76" rx="150" ry="56" fill="url(#glow)" opacity=".25"/>
<g transform="translate(480 76)">${axes(58, { labels: false, h: 0.6 })}<path d="${d}" fill="none" stroke="${ACC}" stroke-width="1.8"/>${rider(d, { r: 3, dur: 7 })}</g>
<text class="s" x="480" y="144" font-size="22" font-style="italic" fill="${INK}" text-anchor="middle">${esc(COPY.about.focusQuote)}</text>
<text class="m" x="480" y="170" font-size="11" fill="${MUTED}" text-anchor="middle">${esc(SITE.contactEmail)}  ·  ${esc(ig)}  ·  RIT Chennai</text>`;
  return frame(W, H, body, { title: `${COPY.about.focusQuote} ${SITE.contactEmail}` });
}

// --------------------------------------------------------------- divider

function divider() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 16" width="960" height="16" role="img" aria-label="">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${MUTED}" stop-opacity="0"/><stop offset=".5" stop-color="${MUTED}" stop-opacity=".55"/><stop offset="1" stop-color="${MUTED}" stop-opacity="0"/></linearGradient>
<radialGradient id="s"><stop offset="0" stop-color="${ACC}"/><stop offset="1" stop-color="${ACC}" stop-opacity="0"/></radialGradient></defs>
<style>@keyframes run{from{transform:translate(-80px,0)}to{transform:translate(1040px,0)}}.s{animation:run 5s ${EASE} infinite}@media (prefers-reduced-motion:reduce){.s{animation:none;opacity:0}}</style>
<rect x="0" y="7.5" width="462" height="1" fill="url(#g)"/><rect x="498" y="7.5" width="462" height="1" fill="url(#g)"/>
<path transform="translate(480 8)" d="${lemniscate(15, 96)}" fill="none" stroke="${ACC}" stroke-opacity=".85" stroke-width="1.2"/>
<ellipse class="s" cy="8" rx="40" ry="3" fill="url(#s)"/>
</svg>
`;
}

const files = {
  'hero.svg': await hero(),
  'pages.svg': await pages(),
  'events.svg': await events(),
  'wiring.svg': wiring(),
  'footer.svg': footer(),
  'divider.svg': divider(),
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg);
  console.log(`${name.padEnd(12)} ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
