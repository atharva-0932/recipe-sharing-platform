"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRecipe } from "../../actions/recipes";
import { useState } from "react";

const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z
    .array(z.object({ value: z.string().min(1, "Ingredient cannot be empty") }))
    .min(1, "At least one ingredient is required"),
  steps: z
    .array(z.object({ value: z.string().min(1, "Step cannot be empty") }))
    .min(1, "At least one step is required"),
  cooking_time: z.number().min(1, "Cooking time must be at least 1 minute"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.string().min(1, "Category is required"),
});

type RecipeForm = z.infer<typeof recipeSchema>;

export default function NewRecipePage() {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeForm>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
      difficulty: "easy",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = async (data: RecipeForm) => {
    setError(null);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("ingredients", JSON.stringify(data.ingredients.map((i) => i.value)));
    formData.append("instructions", JSON.stringify(data.steps.map((s) => s.value)));
    formData.append("cooking_time", data.cooking_time.toString());
    formData.append("difficulty", data.difficulty);
    formData.append("category", data.category);

    const result = await createRecipe(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Recipe</h1>
          <p className="mt-2 text-gray-600">
            Share your favorite recipe with the community
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg bg-white p-8 shadow-sm"
        >
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Title
            </label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              placeholder="e.g., Classic Chocolate Chip Cookies"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Time and Difficulty */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cooking_time"
                className="block text-sm font-medium text-gray-700"
              >
                Cooking Time (minutes)
              </label>
              <input
                {...register("cooking_time", { valueAsNumber: true })}
                type="number"
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              {errors.cooking_time && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cooking_time.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700"
              >
                Difficulty
              </label>
              <select
                {...register("difficulty")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              {...register("category")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              placeholder="e.g., Dessert, Main Course, Salad"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <button
                type="button"
                onClick={() => appendIngredient({ value: "" })}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                + Add Ingredient
              </button>
            </div>
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="mb-2 flex gap-2">
                <input
                  {...register(`ingredients.${index}.value`)}
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                  placeholder={`Ingredient ${index + 1}`}
                />
                {ingredientFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Steps */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <button
                type="button"
                onClick={() => appendStep({ value: "" })}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                + Add Step
              </button>
            </div>
            {stepFields.map((field, index) => (
              <div key={field.id} className="mb-2 flex gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  {index + 1}
                </span>
                <textarea
                  {...register(`steps.${index}.value`)}
                  rows={2}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                  placeholder={`Step ${index + 1}`}
                />
                {stepFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.steps && (
              <p className="mt-1 text-sm text-red-600">{errors.steps.message}</p>
            )}
          </div>


          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-orange-600 px-6 py-2 font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Recipe"}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

