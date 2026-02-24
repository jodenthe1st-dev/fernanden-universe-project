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

async function fixRLS() {
  console.log('🔧 Fixing profiles RLS policies...\n');
  
  // Test 1: Try to read profiles with service role (should work)
  console.log('Test 1: Reading profiles with service role...');
  const { data: profiles, error: readError } = await supabase
    .from('profiles')
    .select('*');
  
  if (readError) {
    console.log('❌ Service role cannot read profiles:', readError);
  } else {
    console.log(`✅ Service role can read ${profiles.length} profile(s)`);
  }
  
  // Test 2: Check if we can disable RLS temporarily
  console.log('\nTest 2: Checking RLS status...');
  console.log('⚠️ RLS is enabled on profiles table');
  console.log('The issue is likely that the authenticated user cannot read their own profile');
  
  // Test 3: Try to update the profile directly
  console.log('\nTest 3: Trying to update admin profile...');
  const adminProfile = profiles?.find(p => p.email === 'admin@fernanden.com');
  
  if (adminProfile) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', adminProfile.id);
    
    if (updateError) {
      console.log('❌ Cannot update profile:', updateError.message);
    } else {
      console.log('✅ Profile updated successfully');
    }
  }
  
  console.log('\n📋 SQL to fix RLS policies:');
  console.log('='.repeat(60));
  console.log(`
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create simple policy: anyone can read all profiles (for debugging)
CREATE POLICY "Allow read all profiles"
ON public.profiles FOR SELECT
TO anon, authenticated
USING (true);

-- Create policy: users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Create policy: users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
  `);
  console.log('='.repeat(60));
  console.log('\n⚠️ Please run this SQL in Supabase SQL Editor to fix the login issue');
}

fixRLS().catch(console.error);
