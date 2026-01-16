import { Recipe } from "../types/database";

// Mock data for UI development (using old format for UI compatibility)
// This will be replaced with real Supabase data
export type MockRecipe = Recipe & {
  description?: string;
  prep_time?: number;
  cook_time?: number;
  image_url?: string;
};

export const mockRecipes: MockRecipe[] = [
  {
    id: "1",
    user_id: "user-1",
    title: "Classic Chocolate Chip Cookies",
    description:
      "Soft and chewy chocolate chip cookies that are perfect for any occasion. This recipe has been passed down through generations.",
    ingredient: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Mix flour, baking soda, and salt in a bowl.",
      "Beat butter and sugars until creamy. Add eggs and vanilla.",
      "Gradually blend in flour mixture. Stir in chocolate chips.",
      "Drop rounded tablespoons onto ungreased baking sheets.",
      "Bake 9-11 minutes or until golden brown.",
    ],
    cooking_time: 26,
    prep_time: 15,
    cook_time: 11,
    difficulty: "easy",
    category: "Dessert",
    created_at: "2024-01-15T10:00:00Z",
    image_url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
  },
  {
    id: "2",
    user_id: "user-2",
    title: "Homemade Pasta Carbonara",
    description:
      "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Simple ingredients, incredible flavor.",
    ingredient: [
      "400g spaghetti",
      "200g pancetta or bacon",
      "4 large eggs",
      "100g Parmesan cheese, grated",
      "Black pepper",
      "Salt",
    ],
    instructions: [
      "Cook pasta in salted boiling water until al dente.",
      "Meanwhile, fry pancetta until crispy.",
      "Beat eggs with grated Parmesan and black pepper.",
      "Drain pasta, reserving some pasta water.",
      "Mix hot pasta with pancetta, then quickly stir in egg mixture.",
      "Add pasta water if needed to create a creamy sauce.",
    ],
    cooking_time: 30,
    prep_time: 10,
    cook_time: 20,
    difficulty: "medium",
    category: "Main Course",
    created_at: "2024-01-14T14:30:00Z",
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
  },
  {
    id: "3",
    user_id: "user-3",
    title: "Beef Wellington",
    description:
      "An elegant dish featuring beef tenderloin wrapped in puff pastry. This recipe requires precision but delivers impressive results.",
    ingredient: [
      "1.5kg beef fillet",
      "500g puff pastry",
      "500g mushrooms",
      "200g pâté",
      "12 slices prosciutto",
      "2 egg yolks",
      "Salt and pepper",
    ],
    instructions: [
      "Season and sear the beef fillet on all sides.",
      "Blend mushrooms into a paste and cook until dry.",
      "Lay out prosciutto, spread with pâté, then mushroom paste.",
      "Place seared beef on top and wrap tightly.",
      "Wrap in puff pastry and seal edges.",
      "Brush with egg wash and bake at 200°C for 25-30 minutes.",
    ],
    cooking_time: 90,
    prep_time: 60,
    cook_time: 30,
    difficulty: "hard",
    category: "Main Course",
    created_at: "2024-01-13T09:15:00Z",
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
  },
  {
    id: "4",
    user_id: "user-1",
    title: "Fresh Garden Salad",
    description:
      "A light and refreshing salad with mixed greens, vegetables, and a simple vinaigrette dressing.",
    ingredient: [
      "Mixed salad greens",
      "Cherry tomatoes",
      "Cucumber",
      "Red onion",
      "Olive oil",
      "Lemon juice",
      "Salt and pepper",
    ],
    instructions: [
      "Wash and dry all vegetables.",
      "Slice tomatoes, cucumber, and red onion.",
      "Combine all vegetables in a large bowl.",
      "Whisk together olive oil, lemon juice, salt, and pepper.",
      "Drizzle dressing over salad and toss gently.",
      "Serve immediately.",
    ],
    cooking_time: 10,
    prep_time: 10,
    cook_time: 0,
    difficulty: "easy",
    category: "Salad",
    created_at: "2024-01-12T16:45:00Z",
  },
];

export function getRecipeById(id: string): MockRecipe | undefined {
  return mockRecipes.find((recipe) => recipe.id === id);
}

