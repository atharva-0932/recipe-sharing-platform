// Database types matching Supabase schema

export type Difficulty = "easy" | "medium" | "hard";

export type Profile = {
  id: string;
  username: string;
  fullname: string;
  created_at: string;
  updated_at: string;
};

export type Recipe = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  ingredient: string[]; // JSONB array
  instructions: string[]; // JSONB array
  cooking_time: number;
  difficulty: Difficulty;
  category: string;
};

// Like type
export type Like = {
  id: string;
  created_at: string;
  user_id: string;
  recipe_id: string;
};

// Recipe like counts
export type RecipeLikeCounts = {
  likes: number;
  user_liked: boolean; // Whether current user has liked this recipe
};

// Recipe with joined profile data and like counts
export type RecipeWithProfile = Recipe & {
  profiles: Profile;
  like_counts?: RecipeLikeCounts;
};



