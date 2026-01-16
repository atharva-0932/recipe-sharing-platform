"use server";

import { createClient } from "../lib/supabase/server";
import { requireAuth } from "../lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Toggle like on a recipe (Instagram-style)
 * If user already liked, removes the like (unlike)
 * If user hasn't liked, creates a new like
 */
export async function toggleLike(recipeId: string) {
  const user = await requireAuth();
  const supabase = await createClient();

  // Check if user already liked this recipe
  const { data: existingLike, error: fetchError } = await supabase
    .from("likes")
    .select("*")
    .eq("recipe_id", recipeId)
    .eq("user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is "not found" error, which is expected if no like exists
    console.error("Error fetching existing like:", fetchError);
    return { error: "Failed to check existing like" };
  }

  // If user already liked, remove the like (unlike)
  if (existingLike) {
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error removing like:", deleteError);
      return { error: "Failed to remove like" };
    }

    revalidatePath("/recipes");
    revalidatePath(`/recipes/${recipeId}`);
    return { success: true, action: "unliked" };
  }

  // If no existing like, create a new one
  const { error: insertError } = await supabase
    .from("likes")
    .insert({
      user_id: user.id,
      recipe_id: recipeId,
    });

  if (insertError) {
    console.error("Error creating like:", insertError);
    return { error: "Failed to create like" };
  }

  revalidatePath("/recipes");
  revalidatePath(`/recipes/${recipeId}`);
  return { success: true, action: "liked" };
}
