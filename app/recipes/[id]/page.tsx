import { getRecipeById } from "../../lib/recipes";
import { getUser } from "../../lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteRecipeButton from "../../components/DeleteRecipeButton";
import LikeButton from "../../components/LikeButton";

type RecipeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  const user = await getUser();

  if (!recipe) {
    notFound();
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  const totalTime = recipe.cooking_time;
  const isOwner = user?.id === recipe.user_id;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-lg bg-white shadow-sm">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${difficultyColors[recipe.difficulty]}`}
                  >
                    {recipe.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {recipe.category}
                  </span>
                  {recipe.profiles && (
                    <span className="text-sm text-gray-500">
                      by {recipe.profiles.fullname}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {recipe.like_counts && (
                    <LikeButton
                      recipeId={id}
                      initialLikeCounts={recipe.like_counts}
                    />
                  )}
                  {isOwner && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/recipes/${id}/edit`}
                        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Edit Recipe
                      </Link>
                      <DeleteRecipeButton recipeId={id} />
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                {recipe.title}
              </h1>
            </div>

            {/* Time Info */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-500">Cooking Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalTime} min
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredient.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

