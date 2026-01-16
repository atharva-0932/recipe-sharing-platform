# Authentication Testing Guide

## Server Status
Your dev server should be running at: **http://localhost:3000**

## Testing Steps

### 1. Test Signup Flow

1. **Navigate to Signup Page**
   - Go to http://localhost:3000/signup
   - Or click "Sign Up" button in navigation

2. **Fill out the form:**
   - **Full Name**: Your full name (e.g., "John Doe")
   - **Username**: A unique username (e.g., "johndoe")
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as password

3. **Submit the form**
   - Click "Create account"
   - You should be redirected to `/recipes` page
   - Check navigation bar - you should see your full name displayed

### 2. Test Login Flow

1. **Logout first** (if logged in)
   - Click "Logout" button in navigation
   - You should be redirected to home page

2. **Navigate to Login Page**
   - Go to http://localhost:3000/login
   - Or click "Login" button in navigation

3. **Enter credentials:**
   - **Email**: The email you used for signup
   - **Password**: Your password

4. **Submit the form**
   - Click "Sign in"
   - You should be redirected to `/recipes` page
   - Check navigation bar - you should see your full name

### 3. Test Protected Routes

1. **While logged in:**
   - Click "Create Recipe" button
   - You should be able to access `/recipes/new`

2. **While logged out:**
   - Try to access http://localhost:3000/recipes/new directly
   - You should be redirected to `/login` page

### 4. Test Error Handling

1. **Invalid Login:**
   - Try logging in with wrong password
   - Should see error message: "Invalid login credentials"

2. **Duplicate Username:**
   - Try signing up with an existing username
   - Should see error message about username already existing

3. **Password Mismatch:**
   - Try signing up with mismatched passwords
   - Should see validation error before submission

## Expected Behavior

✅ **Signup Success:**
- Account created in Supabase Auth
- Profile created in `profiles` table
- Redirected to `/recipes`
- Navigation shows your name

✅ **Login Success:**
- Session created
- Redirected to `/recipes`
- Navigation shows your name
- Can access protected routes

✅ **Logout Success:**
- Session cleared
- Redirected to home page
- Navigation shows Login/Signup buttons
- Cannot access protected routes

## Troubleshooting

**Issue: "Failed to create user account"**
- Check Supabase project is active
- Verify email confirmation is disabled (for testing) in Supabase Dashboard > Authentication > Settings

**Issue: "Profile creation failed"**
- Check `profiles` table exists
- Verify RLS policies allow INSERT for authenticated users
- Check browser console for detailed errors

**Issue: Redirect not working**
- Check browser console for errors
- Verify middleware is running (check terminal output)

**Issue: Session not persisting**
- Check `.env.local` has correct Supabase credentials
- Verify cookies are enabled in browser
- Check middleware is properly configured

## Check Database

After signup, verify in Supabase Dashboard:
1. **Authentication > Users**: Should see new user
2. **Table Editor > profiles**: Should see new profile with matching user_id

## Next Steps After Testing

Once authentication works:
- Test recipe creation (requires auth)
- Test viewing recipes (public access)
- Test user-specific features



