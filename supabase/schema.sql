-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  business_type text not null,
  message text,
  created_at timestamptz not null default now()
);

-- Only the server (service role key) writes here. No public access.
alter table public.inquiries enable row level security;

-- UPI "I have paid" notes from the Book now flow. Verify each one in your UPI app before confirming.
create table if not exists public.payment_claims (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  project text,
  amount integer,
  utr text,
  created_at timestamptz not null default now()
);
alter table public.payment_claims enable row level security;

-- LocalRank audit leads (public audit page -> unlock report).
create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  business text,
  area text,
  score integer,
  name text not null,
  whatsapp text not null,
  email text,
  status text not null default 'new' check (status in ('new','contacted','proposal','won')),
  notes text,
  created_at timestamptz not null default now()
);
alter table public.audit_leads enable row level security;

-- CarePlus demo bookings (public booking form -> /careplus/admin).
create table if not exists public.careplus_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  date date not null,
  slot text,
  home boolean not null default false,
  address text,
  status text not null default 'new' check (status in ('new','confirmed','done','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.careplus_bookings enable row level security;

-- Meeting bookings from the /book-meeting calendar. One booking per date + time.
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  name text not null,
  phone text not null,
  email text,
  topic text not null,
  mode text not null,
  notes text,
  status text not null default 'new' check (status in ('new','confirmed','done','cancelled')),
  created_at timestamptz not null default now(),
  unique (date, time)
);
alter table public.meetings enable row level security;

-- Leads collected by Neo, the website chat assistant.
create table if not exists public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  conversation_id text,
  name text not null,
  business_name text,
  business_type text,
  city text,
  whatsapp text not null,
  service text,
  plan text,
  budget text,
  start_when text,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.chat_leads enable row level security;

-- Alerts Neo raised for Aastha (urgent issues, hot leads, questions it could not answer).
create table if not exists public.owner_alerts (
  id uuid primary key default gen_random_uuid(),
  conversation_id text,
  priority text not null check (priority in ('urgent','high','normal')),
  type text not null,
  summary text not null,
  customer_name text,
  customer_whatsapp text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.owner_alerts enable row level security;
