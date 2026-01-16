# Supabase Database Setup

This directory contains SQL migration files for setting up the Recipe Sharing Platform database.

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended for MVP)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `setup.sql` and run it
   - OR run each migration file in order:
   - `001_create_tables.sql` - Creates tables and indexes
   - `002_create_rls_policies.sql` - Sets up Row Level Security policies
   - `003_create_triggers.sql` - Creates trigger for updated_at

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Migration Files

### 001_create_tables.sql
- Creates `profiles` table for user information
- Creates `recipes` table with all required fields
- Creates indexes for performance
- Enables Row Level Security on both tables

### 002_create_rls_policies.sql
- **Profiles**: Public read, users can create/update their own
- **Recipes**: Public read, authenticated users can create/update/delete their own

### 003_create_triggers.sql
- Creates trigger function to auto-update `updated_at` timestamp on profiles

## Database Schema

### Tables
- **profiles**: id, username, fullname, created_at, updated_at
- **recipes**: id, created_at, user_id, title, ingredient, instructions, cooking_time, difficulty, category

See `SCHEMA.md` for detailed schema documentation.

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Public users can read recipes and profiles
- ✅ Only authenticated users can create recipes
- ✅ Users can only modify their own recipes and profiles

## Verification

After running migrations, verify:

1. **Tables exist**: Check `Table Editor` in Supabase dashboard
   - You should see `profiles` and `recipes` tables
2. **RLS is enabled**: Check table settings show "RLS Enabled"
3. **Policies are active**: Check `Authentication` > `Policies` for each table

## Next Steps

After database setup:
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Create environment variables file (`.env.local`)
3. Set up Supabase client configuration
4. Create profile when user signs up
5. Replace mock data with real queries

