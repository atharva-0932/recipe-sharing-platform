# Database Schema Reference

## Tables

### `profiles`

Stores user profile information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, REFERENCES auth.users(id) | User ID (matches auth.users) |
| `username` | TEXT | UNIQUE, NOT NULL | Unique username |
| `fullname` | TEXT | NOT NULL | User's full name |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp (auto-updated) |

**Indexes:**
- `idx_profiles_username` on `username`

**Triggers:**
- `update_profiles_updated_at` - Automatically updates `updated_at` on row update

### `recipes`

Stores recipe information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique recipe identifier |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `user_id` | UUID | NOT NULL, REFERENCES auth.users(id) ON DELETE CASCADE | Owner of the recipe |
| `title` | TEXT | NOT NULL | Recipe title |
| `ingredient` | JSONB | NOT NULL, DEFAULT '[]' | Array of ingredient strings |
| `instructions` | JSONB | NOT NULL, DEFAULT '[]' | Array of instruction strings (ordered) |
| `cooking_time` | INTEGER | NOT NULL, CHECK >= 0 | Total cooking time in minutes |
| `difficulty` | TEXT | NOT NULL, CHECK IN ('easy', 'medium', 'hard') | Difficulty level |
| `category` | TEXT | NOT NULL | Recipe category (e.g., "Dessert", "Main Course") |

**Indexes:**
- `idx_recipes_user_id` on `user_id`
- `idx_recipes_created_at` on `created_at DESC`
- `idx_recipes_category` on `category`

## Row Level Security (RLS)

### Profiles Table

- ✅ **SELECT**: Public (anyone can read)
- ✅ **INSERT**: Users can create their own profile (must set `id = auth.uid()`)
- ✅ **UPDATE**: Users can only update their own profile
- ❌ **DELETE**: Not allowed (handled by CASCADE from auth.users)

### Recipes Table

- ✅ **SELECT**: Public (anyone can read)
- ✅ **INSERT**: Authenticated users can create recipes (must set `user_id = auth.uid()`)
- ✅ **UPDATE**: Users can only update their own recipes
- ✅ **DELETE**: Users can only delete their own recipes

## Example Queries

### Get all recipes with user profiles

```sql
SELECT 
  r.*,
  p.username,
  p.fullname
FROM recipes r
JOIN profiles p ON r.user_id = p.id
ORDER BY r.created_at DESC;
```

### Get a single recipe with user profile

```sql
SELECT 
  r.*,
  p.username,
  p.fullname
FROM recipes r
JOIN profiles p ON r.user_id = p.id
WHERE r.id = $1;
```

### Get recipes by category

```sql
SELECT * FROM recipes
WHERE category = $1
ORDER BY created_at DESC;
```

### Get user's recipes

```sql
SELECT * FROM recipes
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

## Notes

1. **JSONB Fields**: `ingredient` and `instructions` are stored as JSONB arrays. In your application, you'll convert them to/from TypeScript arrays.

2. **Profile Creation**: When a user signs up, you'll need to create a corresponding profile record. Consider using a database trigger or handling it in your application code.

3. **Cascading Deletes**: Deleting a user from `auth.users` automatically deletes their profile and recipes.

4. **Timestamps**: All timestamps use `TIMESTAMPTZ` (timezone-aware). The `updated_at` field in profiles is automatically maintained by a trigger.
