import { getAllRecipes } from "../lib/recipes";
import RecipeCard from "../components/RecipeCard";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
          <p className="mt-2 text-gray-600">
            Discover delicious recipes from our community
          </p>
        </div>
        {recipes.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">No recipes yet. Be the first to share one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={{
                  id: recipe.id,
                  title: recipe.title,
                  description: "", // Description not in DB schema, can be added later
                  prep_time: 0, // Not in DB schema, using cooking_time instead
                  cook_time: recipe.cooking_time,
                  difficulty: recipe.difficulty,
                  category: recipe.category,
                  image_url: undefined, // Not in DB schema, can be added later
                  like_counts: recipe.like_counts,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

