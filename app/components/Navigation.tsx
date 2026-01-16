import Link from "next/link";
import { getUser, getUserProfile } from "../lib/auth";
import { signOut } from "../actions/auth";
import LogoutButton from "./LogoutButton";

export default async function Navigation() {
  const user = await getUser();
  const profile = user ? await getUserProfile() : null;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              RecipeShare
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/recipes"
              className="text-gray-700 hover:text-gray-900"
            >
              Browse Recipes
            </Link>
            {user ? (
              <>
                <Link
                  href="/recipes/new"
                  className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                >
                  Create Recipe
                </Link>
                {profile && (
                  <span className="text-sm text-gray-600">
                    {profile.fullname}
                  </span>
                )}
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
