import { createClient } from "./supabase/server";
import type { RecipeLikeCounts } from "../types/database";

/**
 * Get like counts for a single recipe
 */
export async function getRecipeLikeCounts(
  recipeId: string,
  userId?: string | null
): Promise<RecipeLikeCounts> {
  const supabase = await createClient();

  // Get all likes for this recipe
  const { data: likes, error } = await supabase
    .from("likes")
    .select("user_id")
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error fetching likes:", error);
    return {
      likes: 0,
      user_liked: false,
    };
  }

  const likeCount = likes?.length || 0;

  // Check if current user has liked this recipe
  const user_liked = userId
    ? likes?.some((like) => like.user_id === userId) || false
    : false;

  return {
    likes: likeCount,
    user_liked,
  };
}

/**
 * Get like counts for multiple recipes
 */
export async function getRecipesLikeCounts(
  recipeIds: string[],
  userId?: string | null
): Promise<Map<string, RecipeLikeCounts>> {
  const supabase = await createClient();

  if (recipeIds.length === 0) {
    return new Map();
  }

  // Get all likes for these recipes
  const { data: likes, error } = await supabase
    .from("likes")
    .select("recipe_id, user_id")
    .in("recipe_id", recipeIds);

  if (error) {
    console.error("Error fetching likes:", error);
    return new Map();
  }

  // Group likes by recipe_id
  const likesByRecipe = new Map<string, typeof likes>();
  likes?.forEach((like) => {
    const existing = likesByRecipe.get(like.recipe_id) || [];
    existing.push(like);
    likesByRecipe.set(like.recipe_id, existing);
  });

  // Calculate like counts for each recipe
  const result = new Map<string, RecipeLikeCounts>();

  recipeIds.forEach((recipeId) => {
    const recipeLikes = likesByRecipe.get(recipeId) || [];
    const likeCount = recipeLikes.length;
    const user_liked = userId
      ? recipeLikes.some((like) => like.user_id === userId)
      : false;

    result.set(recipeId, {
      likes: likeCount,
      user_liked,
    });
  });

  return result;
}
