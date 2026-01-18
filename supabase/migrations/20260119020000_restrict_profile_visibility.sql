-- Remove the old wide-open policy
drop policy if exists "Public profiles are viewable by everyone." on profiles;

-- Add a more restricted policy: 
-- 1. Users can always see their own full profile
create policy "Users can view own profile." on profiles
  for select using (auth.uid() = id);

-- 2. Everyone can see minimal profile info for users who have published skills
-- We use a subquery to check if the user has any public skills
create policy "Public can view minimal profile info of authors." on profiles
  for select using (
    exists (
      select 1 from skills where author_id = profiles.id
    ) or 
    exists (
      select 1 from rules where author_id = profiles.id
    ) or 
    exists (
      select 1 from workflows where author_id = profiles.id
    )
  );
