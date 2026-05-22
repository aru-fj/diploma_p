create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'jobseeker' check (role in ('jobseeker', 'employer')),
  first_name text,
  last_name text,
  full_name text,
  avatar_url text,
  email text,
  city text,
  country text,
  location text,
  profession text,
  job_title text,
  bio text,
  skills text[] default '{}',
  software text[] default '{}',
  available_status text,
  expected_salary numeric,
  minimum_salary numeric,
  payment_period text,
  postal_code text,
  resume_url text,
  provider text default 'email',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  cover_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  type text not null check (type in ('image', 'video', 'text', 'photo_grid', 'pdf')),
  url text,
  text_content text,
  file_name text,
  order_index integer not null default 0,
  created_at timestamptz default now()
);

alter table public.profiles add column if not exists role text default 'jobseeker';
alter table public.profiles add column if not exists first_name text;
alter table public.profiles add column if not exists last_name text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists profession text;
alter table public.profiles add column if not exists job_title text;
alter table public.profiles add column if not exists expected_salary numeric;
alter table public.profiles add column if not exists minimum_salary numeric;
alter table public.profiles add column if not exists payment_period text;
alter table public.profiles add column if not exists postal_code text;
alter table public.profiles add column if not exists resume_url text;
alter table public.profiles add column if not exists provider text default 'email';

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;

drop policy if exists "profiles readable by authenticated users" on public.profiles;
create policy "profiles readable by authenticated users"
on public.profiles for select
to authenticated
using (true);

drop policy if exists "profiles editable by owner" on public.profiles;
create policy "profiles editable by owner"
on public.profiles for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "published projects readable by authenticated users" on public.projects;
create policy "published projects readable by authenticated users"
on public.projects for select
to authenticated
using (status = 'published' or author_id = auth.uid());

drop policy if exists "projects editable by owner" on public.projects;
create policy "projects editable by owner"
on public.projects for all
to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid());

drop policy if exists "project media readable by project access" on public.project_media;
create policy "project media readable by project access"
on public.project_media for select
to authenticated
using (
  exists (
    select 1 from public.projects
    where projects.id = project_media.project_id
      and (projects.status = 'published' or projects.author_id = auth.uid())
  )
);

drop policy if exists "project media editable by project owner" on public.project_media;
create policy "project media editable by project owner"
on public.project_media for all
to authenticated
using (
  exists (
    select 1 from public.projects
    where projects.id = project_media.project_id
      and projects.author_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.projects
    where projects.id = project_media.project_id
      and projects.author_id = auth.uid()
  )
);

drop policy if exists "project media storage readable" on storage.objects;
create policy "project media storage readable"
on storage.objects for select
to authenticated
using (bucket_id = 'project-media');

drop policy if exists "project media storage writable by owner folder" on storage.objects;
create policy "project media storage writable by owner folder"
on storage.objects for all
to authenticated
using (bucket_id = 'project-media' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'project-media' and (storage.foldername(name))[1] = auth.uid()::text);
