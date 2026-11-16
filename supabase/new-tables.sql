-- Run this in Supabase > SQL Editor if you already ran the older schema.sql.
-- It only adds the 3 new tables: meetings (calendar bookings), chat_leads and owner_alerts (Neo chat).

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
