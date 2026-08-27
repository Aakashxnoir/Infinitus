-- INFINITUS — Math Club Website
-- Run this in the Supabase SQL editor before running scripts/seed.mjs.
-- Mirrors docs/05_BACKEND_SCHEMA.md.

create extension if not exists "pgcrypto";

create table if not exists members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text not null,
  role_rank     int not null default 100,
  photo_url     text,
  bio           text,
  linkedin_url  text,
  instagram_url text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists events (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  description     text,
  event_date      date not null,
  event_type      text,
  status          text not null default 'upcoming', -- 'upcoming' | 'conducted'
  cover_image_url text,
  venue           text,
  external_link   text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists event_images (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references events(id) on delete cascade,
  image_url  text not null,
  caption    text,
  sort_order int not null default 0
);

create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  status     text not null default 'new', -- 'new' | 'read' | 'replied'
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_events_status_date on events (status, event_date desc);
create index if not exists idx_members_role_rank on members (role_rank asc);
create index if not exists idx_contact_status on contact_messages (status);

-- Row Level Security: public read on members/events, no public access to
-- contact_messages (writes go through the server-side API route using the
-- service role key, which bypasses RLS).
alter table members enable row level security;
alter table events enable row level security;
alter table event_images enable row level security;
alter table contact_messages enable row level security;

create policy "Public can read active members" on members
  for select using (is_active = true);

create policy "Public can read events" on events
  for select using (true);

create policy "Public can read event images" on event_images
  for select using (true);
