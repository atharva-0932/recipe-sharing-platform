# Supabase Setup Guide

Follow these steps to complete the Supabase integration:

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** (gear icon in the sidebar)
3. Click on **API** in the settings menu
4. You'll find:
   - **Project URL** - Copy this value
   - **anon public** key - Copy this value

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Verify Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any errors

3. Test authentication by visiting `/login` or `/signup`

## What's Been Set Up

✅ **Supabase Client Configuration**
- Browser client (`app/lib/supabase/client.ts`)
- Server client (`app/lib/supabase/server.ts`)
- Middleware for session management (`middleware.ts`)

✅ **TypeScript Types**
- Database types matching your schema (`app/types/database.ts`)
- Profile and Recipe types

✅ **Helper Functions**
- Auth helpers (`app/lib/auth.ts`)
  - `getUser()` - Get current user
  - `getSession()` - Get current session
  - `requireAuth()` - Require authentication (redirects if not)
  - `getUserProfile()` - Get user's profile

- Recipe helpers (`app/lib/recipes.ts`)
  - `getAllRecipes()` - Get all recipes with profiles
  - `getRecipeById()` - Get single recipe
  - `getRecipesByCategory()` - Filter by category
  - `getRecipesByUserId()` - Get user's recipes

## Next Steps

1. **Update your auth pages** (`/login`, `/signup`) to use Supabase auth
2. **Create profile on signup** - When a user signs up, create a profile record
3. **Replace mock data** - Update pages to use real Supabase queries
4. **Add protected routes** - Use `requireAuth()` for authenticated pages

## Database Schema Reference

### `profiles` table
- `id` (UUID, references auth.users)
- `username` (TEXT, unique)
- `fullname` (TEXT)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### `recipes` table
- `id` (UUID)
- `created_at` (TIMESTAMPTZ)
- `user_id` (UUID, references auth.users)
- `title` (TEXT)
- `ingredient` (JSONB array)
- `instructions` (JSONB array)
- `cooking_time` (INTEGER)
- `difficulty` (TEXT: 'easy', 'medium', 'hard')
- `category` (TEXT)

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure `.env.local` exists and has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after adding environment variables

**Error: "Invalid API key"**
- Double-check you copied the **anon public** key (not the service role key)
- Make sure there are no extra spaces or quotes in your `.env.local` file

**RLS Policy Errors**
- Verify RLS policies are set up correctly in Supabase
- Check that policies allow the operations you're trying to perform



