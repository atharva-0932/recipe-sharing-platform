"use server";

import { createClient } from "../lib/supabase/server";
import { requireAuth } from "../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(formData: FormData) {
  const user = await requireAuth();
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const ingredients = JSON.parse(formData.get("ingredients") as string) as string[];
  const instructions = JSON.parse(formData.get("instructions") as string) as string[];
  const cookingTime = parseInt(formData.get("cooking_time") as string, 10);
  const difficulty = formData.get("difficulty") as "easy" | "medium" | "hard";
  const category = formData.get("category") as string;

  // Validation
  if (!title || !category || ingredients.length === 0 || instructions.length === 0) {
    return { error: "All required fields must be filled" };
  }

  if (cookingTime < 0) {
    return { error: "Cooking time must be non-negative" };
  }

  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return { error: "Invalid difficulty level" };
  }

  const { data, error } = await supabase
    .from("recipes")
    .insert({
      user_id: user.id,
      title,
      ingredient: ingredients,
      instructions,
      cooking_time: cookingTime,
      difficulty,
      category,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/recipes");
  redirect(`/recipes/${data.id}`);
}

export async function updateRecipe(recipeId: string, formData: FormData) {
  const user = await requireAuth();
  const supabase = await createClient();

  // First, verify the user owns this recipe
  const { data: existingRecipe, error: fetchError } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  if (fetchError || !existingRecipe) {
    return { error: "Recipe not found" };
  }

  if (existingRecipe.user_id !== user.id) {
    return { error: "You can only edit your own recipes" };
  }

  const title = formData.get("title") as string;
  const ingredients = JSON.parse(formData.get("ingredients") as string) as string[];
  const instructions = JSON.parse(formData.get("instructions") as string) as string[];
  const cookingTime = parseInt(formData.get("cooking_time") as string, 10);
  const difficulty = formData.get("difficulty") as "easy" | "medium" | "hard";
  const category = formData.get("category") as string;

  // Validation
  if (!title || !category || ingredients.length === 0 || instructions.length === 0) {
    return { error: "All required fields must be filled" };
  }

  if (cookingTime < 0) {
    return { error: "Cooking time must be non-negative" };
  }

  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return { error: "Invalid difficulty level" };
  }

  const { data, error } = await supabase
    .from("recipes")
    .update({
      title,
      ingredient: ingredients,
      instructions,
      cooking_time: cookingTime,
      difficulty,
      category,
    })
    .eq("id", recipeId)
    .eq("user_id", user.id) // Double-check ownership
    .select()
    .single();

  if (error) {
    console.error("Error updating recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/recipes");
  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${data.id}`);
}

export async function deleteRecipe(recipeId: string) {
  const user = await requireAuth();
  const supabase = await createClient();

  // First, verify the user owns this recipe
  const { data: existingRecipe, error: fetchError } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  if (fetchError || !existingRecipe) {
    return { error: "Recipe not found" };
  }

  if (existingRecipe.user_id !== user.id) {
    return { error: "You can only delete your own recipes" };
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId)
    .eq("user_id", user.id); // Double-check ownership

  if (error) {
    console.error("Error deleting recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/recipes");
  redirect("/recipes");
}
