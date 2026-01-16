import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Recipe Not Found</h1>
        <p className="mt-4 text-gray-600">
          The recipe you're looking for doesn't exist.
        </p>
        <Link
          href="/recipes"
          className="mt-6 inline-block rounded-md bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-700"
        >
          Browse All Recipes
        </Link>
      </div>
    </div>
  );
}

