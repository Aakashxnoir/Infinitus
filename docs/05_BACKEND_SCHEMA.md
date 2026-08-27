# Backend Schema
## Project: INFINITUS — Math Club Website

---

### 1. Entities Overview
```
Member        — club roster
Event         — past (conducted) and upcoming events, distinguished by type/date
ContactMessage — inbound contact-form submissions
(optional) GalleryImage — if Gallery is split out from Events, per PRD open question
```

### 2. Table Definitions (PostgreSQL / SQL-style; maps 1:1 to Mongo collections if you go that route instead)

**2.1 `members`**
```sql
CREATE TABLE members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  role          TEXT NOT NULL,          -- e.g. "Chair", "Vice Chair", "Core Member", "Faculty Advisor"
  role_rank     INT NOT NULL DEFAULT 100, -- lower = shown first (leadership = 1,2,3...)
  photo_url     TEXT,
  bio           TEXT,
  linkedin_url  TEXT,
  instagram_url TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**2.2 `events`**
```sql
CREATE TABLE events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  event_date    DATE NOT NULL,
  event_type    TEXT,                    -- e.g. "Workshop", "Competition", "Guest Talk"
  status        TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming' | 'conducted'
  cover_image_url TEXT,
  venue         TEXT,
  external_link TEXT,                    -- e.g. registration/RSVP link if one exists
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
- `status` can be derived automatically (`event_date < now() → 'conducted'`) via a scheduled job or computed at query time instead of stored, if you'd rather not maintain it manually — flag your preference.

**2.3 `event_images`** (optional, for multi-photo events / gallery)
```sql
CREATE TABLE event_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url  TEXT NOT NULL,
  caption    TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
```

**2.4 `contact_messages`**
```sql
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new', -- 'new' | 'read' | 'replied'
  ip_address  TEXT,                        -- for basic rate-limiting/spam tracking
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 3. Indexes
```sql
CREATE INDEX idx_events_status_date ON events (status, event_date DESC);
CREATE INDEX idx_members_role_rank ON members (role_rank ASC);
CREATE INDEX idx_contact_status ON contact_messages (status);
```

### 4. Relationships
```
events (1) ──< event_images (many)
members — standalone (no FK dependencies in v1)
contact_messages — standalone (no FK dependencies in v1)
```

### 5. API Contract (matches TRD endpoints)

**GET /api/members**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "role": "string",
    "photoUrl": "string",
    "bio": "string",
    "linkedinUrl": "string | null",
    "instagramUrl": "string | null"
  }
]
```
Sorted by `role_rank ASC`, `is_active = true` only.

**GET /api/events?type=upcoming|conducted**
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "eventDate": "YYYY-MM-DD",
    "eventType": "string",
    "venue": "string | null",
    "coverImageUrl": "string | null",
    "externalLink": "string | null",
    "images": ["string", "..."]
  }
]
```

**POST /api/contact**
Request:
```json
{ "name": "string", "email": "string", "message": "string" }
```
Response (success):
```json
{ "success": true }
```
Response (validation error):
```json
{ "success": false, "error": "Invalid email address" }
```
Server behavior: validate → rate-limit by IP (e.g. max 5 submissions/hour) → insert into `contact_messages` → send email notification via provider (Resend/EmailJS) → return success.

### 6. Seed Data Strategy
For launch, populate `members` and `events` via a one-time seed script (`/scripts/seed.ts` or `.sql`) rather than building an admin UI in v1 — matches the PRD's "no CMS in v1" scope. Revisit once content changes often enough to justify an admin form.

### 7. Storage
- Member photos and event images stored in Supabase Storage (or Cloudinary) buckets, referenced by URL in the tables above — not stored as binary blobs in the DB.
- Suggested buckets: `member-photos/`, `event-covers/`, `event-gallery/`.
