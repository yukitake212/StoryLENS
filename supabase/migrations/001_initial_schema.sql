-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Supabase Auth handles authentication, this extends it)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'author' CHECK (role IN ('author', 'creator', 'admin')),
  handle TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Works (小説作品)
CREATE TABLE IF NOT EXISTS public.works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  genre TEXT,
  external_url TEXT,
  sample_text TEXT,
  ai_outline_json JSONB,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Creator profiles
CREATE TABLE IF NOT EXISTS public.creator_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialties TEXT[],
  tools TEXT[],
  price_min INTEGER,
  price_max INTEGER,
  portfolio_url TEXT,
  skill_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects (依頼案件)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  purpose TEXT,
  duration_seconds INTEGER,
  budget_min INTEGER,
  budget_max INTEGER,
  deadline TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_negotiation', 'contracted', 'in_progress', 'delivered', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proposals (クリエイターからの提案)
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT,
  price INTEGER,
  estimated_days INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (チャット)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery items
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_works_author_id ON public.works(author_id);
CREATE INDEX IF NOT EXISTS idx_projects_work_id ON public.projects(work_id);
CREATE INDEX IF NOT EXISTS idx_projects_author_id ON public.projects(author_id);
CREATE INDEX IF NOT EXISTS idx_projects_creator_id ON public.projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_proposals_project_id ON public.proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_creator_id ON public.proposals(creator_id);
CREATE INDEX IF NOT EXISTS idx_messages_project_id ON public.messages(project_id);
CREATE INDEX IF NOT EXISTS idx_gallery_items_project_id ON public.gallery_items(project_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Works policies
CREATE POLICY "Authors can view their own works"
  ON public.works FOR SELECT
  USING (auth.uid() = author_id OR is_public = true);

CREATE POLICY "Authors can create their own works"
  ON public.works FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own works"
  ON public.works FOR UPDATE
  USING (auth.uid() = author_id);

-- Projects policies
CREATE POLICY "Users can view projects they're involved in"
  ON public.projects FOR SELECT
  USING (
    auth.uid() = author_id OR 
    auth.uid() = creator_id OR
    status = 'open'
  );

CREATE POLICY "Authors can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Proposals policies
CREATE POLICY "Users can view proposals for their projects"
  ON public.proposals FOR SELECT
  USING (
    auth.uid() IN (
      SELECT author_id FROM public.projects WHERE id = project_id
    ) OR
    auth.uid() = creator_id
  );

CREATE POLICY "Creators can create proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Messages policies
CREATE POLICY "Users can view messages in their projects"
  ON public.messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT author_id FROM public.projects WHERE id = project_id
    ) OR
    auth.uid() IN (
      SELECT creator_id FROM public.projects WHERE id = project_id
    )
  );

CREATE POLICY "Users can send messages in their projects"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT author_id FROM public.projects WHERE id = project_id
    ) OR
    auth.uid() IN (
      SELECT creator_id FROM public.projects WHERE id = project_id
    )
  );

-- Gallery policies
CREATE POLICY "Anyone can view published gallery items"
  ON public.gallery_items FOR SELECT
  USING (is_published = true);








