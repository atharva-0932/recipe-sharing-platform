-- RLS Policies for likes table

-- Public read access: Anyone can view likes (for like counts)
CREATE POLICY "Public likes are viewable by everyone"
  ON likes
  FOR SELECT
  USING (true);

-- Authenticated users can insert their own likes
CREATE POLICY "Users can insert their own likes"
  ON likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes (to unlike)
CREATE POLICY "Users can delete their own likes"
  ON likes
  FOR DELETE
  USING (auth.uid() = user_id);
