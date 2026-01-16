import { getRecipeById } from "../../../lib/recipes";
import { getUser } from "../../../lib/auth";
import { notFound, redirect } from "next/navigation";
import EditRecipeForm from "./EditRecipeForm";

type EditRecipePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditRecipePage({
  params,
}: EditRecipePageProps) {
  const { id } = await params;
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }

  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  // Check if user owns the recipe
  if (recipe.user_id !== user.id) {
    redirect(`/recipes/${id}`);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Recipe</h1>
          <p className="mt-2 text-gray-600">
            Update your recipe details
          </p>
        </div>
        <EditRecipeForm recipe={recipe} />
      </div>
    </div>
  );
}
