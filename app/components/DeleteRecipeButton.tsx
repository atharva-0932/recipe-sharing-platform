"use client";

import { useState } from "react";
import { deleteRecipe } from "../actions/recipes";
import { useRouter } from "next/navigation";

type DeleteRecipeButtonProps = {
  recipeId: string;
};

export default function DeleteRecipeButton({ recipeId }: DeleteRecipeButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteRecipe(recipeId);
    if (result?.error) {
      alert(result.error);
      setIsDeleting(false);
      setShowConfirm(false);
    }
    // If successful, redirect happens in the server action
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 p-2">
        <span className="text-sm text-red-800">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Yes, Delete"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Delete Recipe
    </button>
  );
}
