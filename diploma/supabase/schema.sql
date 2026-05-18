-- MediaHire Supabase schema
-- Run this in Supabase SQL Editor after enabling Auth email confirmation and Google OAuth.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('jobseeker', 'employer');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.auth_provider as enum ('email', 'google');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null,
  first_name text,
  last_name text,
  full_name text,
  email text,
  avatar_url text,
  location text,
  postal_code text,
  minimum_salary numeric,
  payment_period text,
  provider public.auth_provider not null default 'email',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.jobseeker_resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  about text,
  professional_skill text,
  work_experience text,
  education text,
  links text,
  languages text,
  job_preferences text,
  preferred_job_benefits text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.employer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text,
  company_field text,
  company_description text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid references auth.users(id) on delete cascade,
  title text not null,
  company_name text,
  description text,
  location text,
  salary_amount numeric,
  salary_period text,
  job_type text,
  work_mode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  jobseeker_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'applied',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, jobseeker_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  body text,
  attachment_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists jobseeker_resumes_set_updated_at on public.jobseeker_resumes;
create trigger jobseeker_resumes_set_updated_at
before update on public.jobseeker_resumes
for each row execute function public.set_updated_at();

drop trigger if exists employer_profiles_set_updated_at on public.employer_profiles;
create trigger employer_profiles_set_updated_at
before update on public.employer_profiles
for each row execute function public.set_updated_at();

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    role,
    first_name,
    last_name,
    full_name,
    email,
    avatar_url,
    provider
  )
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'jobseeker'),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    coalesce((new.raw_user_meta_data->>'provider')::public.auth_provider, 'email')
  )
  on conflict (user_id) do update set
    role = excluded.role,
    first_name = coalesce(excluded.first_name, public.profiles.first_name),
    last_name = coalesce(excluded.last_name, public.profiles.last_name),
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = coalesce(excluded.email, public.profiles.email),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    provider = excluded.provider,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.jobseeker_resumes enable row level security;
alter table public.employer_profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Profiles are readable" on public.profiles;
create policy "Profiles are readable"
on public.profiles for select
using (true);

drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile"
on public.profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Resumes are readable" on public.jobseeker_resumes;
create policy "Resumes are readable"
on public.jobseeker_resumes for select
using (true);

drop policy if exists "Users manage own resume" on public.jobseeker_resumes;
create policy "Users manage own resume"
on public.jobseeker_resumes for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Employers manage own company profile" on public.employer_profiles;
create policy "Employers manage own company profile"
on public.employer_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Jobs are readable" on public.jobs;
create policy "Jobs are readable"
on public.jobs for select
using (true);

drop policy if exists "Employers manage own jobs" on public.jobs;
create policy "Employers manage own jobs"
on public.jobs for all
using (auth.uid() = employer_id)
with check (auth.uid() = employer_id);

drop policy if exists "Users read own applications" on public.applications;
create policy "Users read own applications"
on public.applications for select
using (auth.uid() = jobseeker_id);

drop policy if exists "Users create own applications" on public.applications;
create policy "Users create own applications"
on public.applications for insert
with check (auth.uid() = jobseeker_id);

drop policy if exists "Users read own messages" on public.messages;
create policy "Users read own messages"
on public.messages for select
using (auth.uid() = sender_id or auth.uid() = receiver_id);

drop policy if exists "Users send own messages" on public.messages;
create policy "Users send own messages"
on public.messages for insert
with check (auth.uid() = sender_id);
