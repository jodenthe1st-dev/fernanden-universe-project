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

// Test with ANON key (like the frontend)
const supabaseAnon = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Test with SERVICE key (admin)
const supabaseService = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function testAuthFlow() {
  console.log('🔧 Testing Auth Flow\n');
  
  // Test 1: Login with anon client
  console.log('Test 1: Login with anon client...');
  const { data: authData, error: authError } = await supabaseAnon.auth.signInWithPassword({
    email: 'admin@fernanden.com',
    password: 'admin123'
  });
  
  if (authError) {
    console.log('❌ Login failed:', authError.message);
    return;
  }
  
  console.log('✅ Login successful!');
  console.log(`   User ID: ${authData.user.id}`);
  console.log(`   Email: ${authData.user.email}`);
  
  // Test 2: Try to fetch profile with the authenticated session
  console.log('\nTest 2: Fetch profile with authenticated session...');
  
  // Create a new client with the session
  const supabaseWithSession = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${authData.session.access_token}`
      }
    }
  });
  
  const { data: profile, error: profileError } = await supabaseWithSession
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();
  
  if (profileError) {
    console.log('❌ Profile fetch failed:', profileError.message);
    console.log('   Error code:', profileError.code);
    console.log('   Error details:', profileError.details);
    console.log('   Error hint:', profileError.hint);
  } else {
    console.log('✅ Profile fetched successfully!');
    console.log(`   Role: ${profile.role}`);
    console.log(`   Email: ${profile.email}`);
  }
  
  // Test 3: Fetch with service role (should always work)
  console.log('\nTest 3: Fetch profile with service role...');
  const { data: serviceProfile, error: serviceError } = await supabaseService
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();
  
  if (serviceError) {
    console.log('❌ Service role fetch failed:', serviceError.message);
  } else {
    console.log('✅ Service role fetch successful!');
    console.log(`   Role: ${serviceProfile.role}`);
  }
  
  // Sign out
  await supabaseAnon.auth.signOut();
  console.log('\n✅ Test complete!');
}

testAuthFlow().catch(console.error);
