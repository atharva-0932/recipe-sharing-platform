"use client";

import { useState } from "react";
import { toggleLike } from "../actions/likes";
import type { RecipeLikeCounts } from "../types/database";

type LikeButtonProps = {
  recipeId: string;
  initialLikeCounts: RecipeLikeCounts;
};

export default function LikeButton({
  recipeId,
  initialLikeCounts,
}: LikeButtonProps) {
  const [likeCounts, setLikeCounts] = useState(initialLikeCounts);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    const result = await toggleLike(recipeId);

    if (result?.error) {
      alert(result.error);
      setIsLiking(false);
      return;
    }

    // Optimistically update the UI
    const newLiked = !likeCounts.user_liked;
    const newLikeCount = newLiked
      ? likeCounts.likes + 1
      : Math.max(0, likeCounts.likes - 1);

    setLikeCounts({
      likes: newLikeCount,
      user_liked: newLiked,
    });

    setIsLiking(false);
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
      aria-label={likeCounts.user_liked ? "Unlike" : "Like"}
    >
      {likeCounts.user_liked ? (
        // Filled heart (liked)
        <svg
          className="h-6 w-6 fill-red-500 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        // Outline heart (not liked)
        <svg
          className="h-6 w-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      <span
        className={`text-sm font-medium ${
          likeCounts.user_liked ? "text-red-500" : "text-gray-600"
        }`}
      >
        {likeCounts.likes > 0 && likeCounts.likes}
      </span>
    </button>
  );
}
