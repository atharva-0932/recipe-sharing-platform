-- Convert votes table to likes table (Instagram-style)
-- Drop the old votes table and create a simpler likes table

-- Drop existing votes table if it exists
DROP TABLE IF EXISTS votes CASCADE;

-- Create likes table (simpler - just tracks if user liked a recipe)
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  UNIQUE(user_id, recipe_id) -- One like per user per recipe
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_likes_recipe_id ON likes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_recipe_user ON likes(recipe_id, user_id);

-- Enable Row Level Security
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
