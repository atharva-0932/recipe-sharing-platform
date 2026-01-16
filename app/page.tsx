import Link from "next/link";
import { getUser } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // If user is already logged in, redirect to recipes
  const user = await getUser();
  if (user) {
    redirect("/recipes");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            RecipeShare
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Share and discover delicious recipes from our community
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/signup"
            className="block w-full rounded-md bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link
              href="/login"
              className="text-sm font-medium text-orange-600 hover:text-orange-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
