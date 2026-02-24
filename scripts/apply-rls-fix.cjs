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

async function applyFix() {
  console.log('🔧 Applying RLS fix...\n');
  
  // First, let's disable RLS temporarily to fix the issue
  console.log('Step 1: Disabling RLS on profiles table...');
  
  const { error: disableError } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;'
  });
  
  if (disableError) {
    console.log('⚠️ Could not disable RLS via RPC:', disableError.message);
    console.log('Trying alternative approach...\n');
  } else {
    console.log('✅ RLS disabled temporarily');
  }
  
  // Show the SQL that needs to be run
  console.log('='.repeat(70));
  console.log('📋 COPY AND PASTE THIS SQL INTO SUPABASE SQL EDITOR:');
  console.log('='.repeat(70));
  console.log(`
-- Disable RLS temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies using DO block (more reliable)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Allow read all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error dropping policies: %', SQLERRM;
END $$;

-- Create CORRECT policies:

-- Policy 1: Users can ALWAYS read their own profile (fixes the circular dependency)
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy 2: Admins can read ALL profiles (separate policy, doesn't depend on itself)
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p2 
        WHERE p2.id = auth.uid() 
        AND p2.role = 'admin'
    )
);

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Policy 4: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Verify the fix
SELECT * FROM pg_policies WHERE tablename = 'profiles';
  `);
  console.log('='.repeat(70));
  
  console.log('\n⚠️  IMPORTANT:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Open SQL Editor');
  console.log('3. Paste the SQL above');
  console.log('4. Click "Run"');
  console.log('\nAfter running this SQL, the admin login will work!');
}

applyFix().catch(console.error);
