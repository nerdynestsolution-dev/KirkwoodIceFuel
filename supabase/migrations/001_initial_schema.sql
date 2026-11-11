-- ============================================================================
-- Kirkwood Ice & Fuel — Supabase Database Schema & Row Level Security (RLS)
-- Migration: 001_initial_schema.sql
-- ============================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- to initialize tables, indexes, Row Level Security policies, and Storage.
-- ============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- 1. Admin Users Whitelist Table
-- Allows restricting write access strictly to authorized administrator emails/UIDs
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'owner')),
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

-- Helper function to check if the current authenticated user is an authorized admin.
-- Checks if the user exists in admin_profiles OR if admin_profiles is empty (first-time setup fallback for authenticated owner)
create or replace function public.is_authorized_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select (
    auth.role() = 'authenticated'
    and (
      exists (select 1 from public.admin_profiles where id = auth.uid())
      or not exists (select 1 from public.admin_profiles)
    )
  );
$$;

create policy "Admins can view their own admin profile"
  on public.admin_profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_authorized_admin());

-- ============================================================================
-- 2. Recurring Weekly Specials Table
-- ============================================================================
create table if not exists public.specials (
  id uuid primary key default gen_random_uuid(),
  day_of_week text not null check (
    day_of_week in (
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Everyday',
      'Weekdays',
      'Weekends'
    )
  ),
  title text not null,
  description text not null default '',
  price text,
  details text,
  category text not null default 'Food & Drink' check (category in ('Food', 'Drink', 'Food & Drink')),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  is_placeholder boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_specials_active_order
  on public.specials (is_active, display_order asc);

-- ============================================================================
-- 3. Upcoming & Archived Events Table
-- ============================================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  start_time text not null,
  end_time text,
  description text not null default '',
  category text not null default 'Watch Party',
  image_url text,
  external_link text,
  additional_details text,
  is_published boolean not null default true,
  is_featured boolean not null default false,
  is_placeholder boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_events_published_date
  on public.events (is_published, event_date asc);

-- ============================================================================
-- 4. Automatic updated_at Timestamp Trigger
-- ============================================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_specials_updated_at on public.specials;
create trigger set_specials_updated_at
  before update on public.specials
  for each row execute function public.handle_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
  before update on public.events
  for each row execute function public.handle_updated_at();

-- ============================================================================
-- 5. Row Level Security (RLS) Policies
-- ============================================================================
alter table public.specials enable row level security;
alter table public.events enable row level security;

-- SPECIALS POLICIES
-- Public visitors can read only active specials; admins can read all specials
drop policy if exists "Public visitors can read active specials" on public.specials;
create policy "Public visitors can read active specials"
  on public.specials
  for select
  using (is_active = true or public.is_authorized_admin());

drop policy if exists "Authorized admins can insert specials" on public.specials;
create policy "Authorized admins can insert specials"
  on public.specials
  for insert
  to authenticated
  with check (public.is_authorized_admin());

drop policy if exists "Authorized admins can update specials" on public.specials;
create policy "Authorized admins can update specials"
  on public.specials
  for update
  to authenticated
  using (public.is_authorized_admin())
  with check (public.is_authorized_admin());

drop policy if exists "Authorized admins can delete specials" on public.specials;
create policy "Authorized admins can delete specials"
  on public.specials
  for delete
  to authenticated
  using (public.is_authorized_admin());

-- EVENTS POLICIES
-- Public visitors can read only published events; admins can read all events
drop policy if exists "Public visitors can read published events" on public.events;
create policy "Public visitors can read published events"
  on public.events
  for select
  using (is_published = true or public.is_authorized_admin());

drop policy if exists "Authorized admins can insert events" on public.events;
create policy "Authorized admins can insert events"
  on public.events
  for insert
  to authenticated
  with check (public.is_authorized_admin());

drop policy if exists "Authorized admins can update events" on public.events;
create policy "Authorized admins can update events"
  on public.events
  for update
  to authenticated
  using (public.is_authorized_admin())
  with check (public.is_authorized_admin());

drop policy if exists "Authorized admins can delete events" on public.events;
create policy "Authorized admins can delete events"
  on public.events
  for delete
  to authenticated
  using (public.is_authorized_admin());

-- ============================================================================
-- 6. Supabase Storage Bucket for Event Images (Optional Image Uploads)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view site-media images" on storage.objects;
create policy "Public can view site-media images"
  on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "Authorized admins can upload site-media images" on storage.objects;
create policy "Authorized admins can upload site-media images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-media' and public.is_authorized_admin());

drop policy if exists "Authorized admins can update site-media images" on storage.objects;
create policy "Authorized admins can update site-media images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-media' and public.is_authorized_admin());

drop policy if exists "Authorized admins can delete site-media images" on storage.objects;
create policy "Authorized admins can delete site-media images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-media' and public.is_authorized_admin());

-- ============================================================================
-- 7. Clearly Labeled Placeholder Seed Data (Until Owner Updates via /admin)
-- ============================================================================
insert into public.specials (day_of_week, title, description, price, details, category, is_active, is_featured, is_placeholder, display_order)
values
  ('Monday', '[Placeholder] Monday Burger & Pint Feature', 'Sample placeholder entry for Monday recurring food/drink special. Owner can edit or replace this directly inside the /admin dashboard.', 'TBD by Owner', 'Dine-in only • Sample placeholder for owner review', 'Food & Drink', true, true, true, 1),
  ('Tuesday', '[Placeholder] Tuesday Wing & Bucket Night', 'Sample placeholder entry for Tuesday recurring special. Update title, description, and pricing anytime in Admin.', 'TBD by Owner', 'Sample placeholder for owner review', 'Food & Drink', true, true, true, 2),
  ('Wednesday', '[Placeholder] Midweek Melt & Draft Feature', 'Sample placeholder entry for Wednesday special. Replace with your actual mid-week kitchen or bar special.', 'TBD by Owner', 'Sample placeholder for owner review', 'Food', true, false, true, 3),
  ('Thursday', '[Placeholder] Thirsty Thursday Domestic Buckets', 'Sample placeholder entry for Thursday drink special. Customize or toggle off in one click from /admin.', 'TBD by Owner', 'Sample placeholder for owner review', 'Drink', true, true, true, 4),
  ('Friday', '[Placeholder] Friday Fish Platter & Cold Drafts', 'Sample placeholder entry for Friday neighborhood special.', 'TBD by Owner', 'Sample placeholder for owner review', 'Food & Drink', true, false, true, 5),
  ('Saturday', '[Placeholder] Game Day Patio & Pitcher Feature', 'Sample placeholder entry for Saturday game day special.', 'TBD by Owner', 'Sample placeholder for owner review', 'Food & Drink', true, false, true, 6),
  ('Sunday', '[Placeholder] Sunday Chili, Gumbo & Cold Pint Feature', 'Sample placeholder entry for Sunday relaxed neighborhood special.', 'TBD by Owner', 'Sample placeholder for owner review', 'Food & Drink', true, false, true, 7);
