import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get the current authenticated user's session
 * Returns null if not authenticated
 */
export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Require authentication - redirects to login if not authenticated
 * Returns the authenticated user
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Get the current user's profile
 * Returns null if profile doesn't exist
 */
export async function getUserProfile() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;
  return data;
}



