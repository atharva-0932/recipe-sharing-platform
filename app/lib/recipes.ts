import { createClient } from "./supabase/server";
import { getUser } from "./auth";
import { getRecipeLikeCounts, getRecipesLikeCounts } from "./likes";
import type { Recipe, RecipeWithProfile } from "../types/database";

/**
 * Get all recipes with user profiles
 */
export async function getAllRecipes(): Promise<RecipeWithProfile[]> {
  const supabase = await createClient();
  
  // Try the standard Supabase join syntax
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles (
        id,
        username,
        fullname,
        created_at,
        updated_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    
    // Fallback: fetch recipes and profiles separately
    console.log("Attempting fallback: fetching recipes without join...");
    const { data: recipesData, error: recipesError } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (recipesError) {
      console.error("Error fetching recipes (fallback):", recipesError);
      return [];
    }
    
    if (!recipesData || recipesData.length === 0) {
      return [];
    }
    
    // Fetch profiles separately and join in code
    const userIds = [...new Set(recipesData.map((r) => r.user_id))];
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .in("id", userIds);
    
    const profilesMap = new Map(
      (profilesData || []).map((p) => [p.id, p])
    );
    
    const recipesWithProfiles = recipesData.map((recipe) => ({
      ...recipe,
      profiles: profilesMap.get(recipe.user_id) || null,
    })) as RecipeWithProfile[];

    // Get like counts for all recipes
    const user = await getUser();
    const recipeIds = recipesWithProfiles.map((r) => r.id);
    const likeCountsMap = await getRecipesLikeCounts(recipeIds, user?.id);

    // Attach like counts to each recipe
    return recipesWithProfiles.map((recipe) => ({
      ...recipe,
      like_counts: likeCountsMap.get(recipe.id) || {
        likes: 0,
        user_liked: false,
      },
    })) as RecipeWithProfile[];
  }

  if (!data) {
    return [];
  }

  // Get like counts for all recipes
  const user = await getUser();
  const recipeIds = data.map((r) => r.id);
  const likeCountsMap = await getRecipesLikeCounts(recipeIds, user?.id);

  // Attach like counts to each recipe
  return data.map((recipe) => ({
    ...recipe,
    like_counts: likeCountsMap.get(recipe.id) || {
      likes: 0,
      user_liked: false,
    },
  })) as RecipeWithProfile[];
}

/**
 * Get a single recipe by ID with user profile
 */
export async function getRecipeById(
  id: string
): Promise<RecipeWithProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles (
        id,
        username,
        fullname,
        created_at,
        updated_at
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching recipe:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    
    // Fallback: fetch recipe and profile separately
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single();
    
    if (recipeError || !recipeData) {
      return null;
    }
    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", recipeData.user_id)
      .single();
    
    return {
      ...recipeData,
      profiles: profileData || null,
    } as RecipeWithProfile;
  }

  if (!data) {
    return null;
  }

  // Get like counts for this recipe
  const user = await getUser();
  const likeCounts = await getRecipeLikeCounts(id, user?.id);

  return {
    ...data,
    like_counts: likeCounts,
  } as RecipeWithProfile;
}

/**
 * Get recipes by category
 */
export async function getRecipesByCategory(
  category: string
): Promise<RecipeWithProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles (
        id,
        username,
        fullname,
        created_at,
        updated_at
      )
    `)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes by category:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    
    // Fallback: fetch separately
    const { data: recipesData, error: recipesError } = await supabase
      .from("recipes")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });
    
    if (recipesError || !recipesData) {
      return [];
    }
    
    const userIds = [...new Set(recipesData.map((r) => r.user_id))];
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .in("id", userIds);
    
    const profilesMap = new Map(
      (profilesData || []).map((p) => [p.id, p])
    );
    
    const recipesWithProfiles = recipesData.map((recipe) => ({
      ...recipe,
      profiles: profilesMap.get(recipe.user_id) || null,
    })) as RecipeWithProfile[];

    // Get like counts for all recipes
    const user = await getUser();
    const recipeIds = recipesWithProfiles.map((r) => r.id);
    const likeCountsMap = await getRecipesLikeCounts(recipeIds, user?.id);

    // Attach like counts to each recipe
    return recipesWithProfiles.map((recipe) => ({
      ...recipe,
      like_counts: likeCountsMap.get(recipe.id) || {
        likes: 0,
        user_liked: false,
      },
    })) as RecipeWithProfile[];
  }

  if (!data) {
    return [];
  }

  // Get like counts for all recipes
  const user = await getUser();
  const recipeIds = data.map((r) => r.id);
  const likeCountsMap = await getRecipesLikeCounts(recipeIds, user?.id);

  // Attach like counts to each recipe
  return data.map((recipe) => ({
    ...recipe,
    like_counts: likeCountsMap.get(recipe.id) || {
      likes: 0,
      user_liked: false,
    },
  })) as RecipeWithProfile[];
}

/**
 * Get recipes by user ID
 */
export async function getRecipesByUserId(
  userId: string
): Promise<Recipe[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user recipes:", error);
    return [];
  }

  return data as Recipe[];
}



