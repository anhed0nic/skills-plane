-- Ensure marketplace browsing works for all visitors (not just the author).
-- These policies keep skills and profiles publicly readable while leaving existing
-- insert/update restrictions intact.

-- Skills: allow anyone (including anon) to read
alter table public.skills enable row level security;
do $$
begin
  create policy "Public skills are viewable by everyone" on public.skills
    for select using (true);
exception
  when duplicate_object then null;
end $$;

-- Profiles: allow anyone to read author details used on skill cards
alter table public.profiles enable row level security;
do $$
begin
  create policy "Public profiles are viewable by everyone" on public.profiles
    for select using (true);
exception
  when duplicate_object then null;
end $$;
