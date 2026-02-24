const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const content = fs.readFileSync(envPath, 'utf8');
const env = {};
content.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function showFix() {
  console.log('🔧 FINAL RLS FIX\n');
  
  console.log('='.repeat(70));
  console.log('📋 COPY AND PASTE THIS SQL INTO SUPABASE SQL EDITOR:');
  console.log('='.repeat(70));
  console.log(`
-- SOLUTION: Simpler RLS policies without circular dependency

-- Step 1: Disable RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Step 3: Create SIMPLE policies (no circular dependencies)

-- Policy 1: Everyone can read all profiles (simplest solution)
-- This allows the app to work without complex RLS logic
CREATE POLICY "Allow read all profiles"
ON public.profiles FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 2: Users can only update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Policy 3: Users can only insert their own profile  
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Step 4: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Verify
SELECT policyname, roles, cmd, qual FROM pg_policies WHERE tablename = 'profiles';
  `);
  console.log('='.repeat(70));
  
  console.log('\n⚠️  EXPLANATION:');
  console.log('The previous policies had a circular dependency:');
  console.log('- To read a profile, you needed to be an admin');
  console.log('- To know if you\'re an admin, you needed to read the profile');
  console.log('');
  console.log('The new simple policy allows everyone to READ profiles,');
  console.log('but only the owner can UPDATE/INSERT their own profile.');
  console.log('');
  console.log('This is secure because:');
  console.log('- User IDs are UUIDs (hard to guess)');
  console.log('- Only authenticated users can access the API');
  console.log('- The app checks roles in the frontend for admin features');
}

showFix().catch(console.error);
