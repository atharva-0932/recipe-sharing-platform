import Link from "next/link";
import Image from "next/image";
import LikeButton from "./LikeButton";
import type { RecipeLikeCounts } from "../types/database";

type RecipeCardProps = {
  recipe: {
    id: string;
    title: string;
    description: string;
    prep_time: number;
    cook_time: number;
    difficulty: "easy" | "medium" | "hard";
    category: string;
    image_url?: string;
    like_counts?: RecipeLikeCounts;
  };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/recipes/${recipe.id}`}>
        {recipe.image_url ? (
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gray-200" />
        )}
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[recipe.difficulty]}`}
            >
              {recipe.difficulty}
            </span>
            <span className="text-sm text-gray-500">{recipe.category}</span>
          </div>
          {recipe.like_counts && (
            <LikeButton
              recipeId={recipe.id}
              initialLikeCounts={recipe.like_counts}
            />
          )}
        </div>
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 hover:text-orange-600">
            {recipe.title}
          </h3>
        </Link>
        {recipe.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
            {recipe.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {recipe.prep_time > 0 && <span>Prep: {recipe.prep_time} min</span>}
          <span>Cook: {recipe.cook_time} min</span>
        </div>
      </div>
    </div>
  );
}

