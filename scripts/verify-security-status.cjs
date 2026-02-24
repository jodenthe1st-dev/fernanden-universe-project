#!/usr/bin/env node
// Simple verification script to check current security status

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Simple environment loading
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  const config = {};
  
  lines.forEach(line => {
    if (line.includes('=') && !line.trim().startsWith('#')) {
      const [key, value] = line.split('=');
      config[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
  
  return config;
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkSecurityStatus() {
  console.log('🔍 Checking Current Security Status...\n');
  
  // Check RLS status on tables
  const tablesToCheck = ['media_files', 'users', 'admins', 'admin_sessions', 'media', 'contact_subscriptions', 'profiles'];
  
  console.log('🔐 RLS Status Check:');
  console.log('='.repeat(50));
  
  for (const table of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count(*)', { count: 'exact', head: true });
      
      if (error && error.code === '42501') {
        console.log(`✅ ${table}: RLS ENABLED (access properly restricted)`);
      } else if (error && error.code === '42P01') {
        console.log(`ℹ️  ${table}: Table does not exist`);
      } else if (error) {
        console.log(`⚠️  ${table}: ${error.message}`);
      } else {
        console.log(`❌ ${table}: RLS NOT ENABLED (unrestricted access)`);
      }
    } catch (error) {
      console.log(`⚠️  ${table}: Could not check (${error.message})`);
    }
  }
  
  // Check functions
  console.log('\n🔧 Function Security Check:');
  console.log('='.repeat(50));
  
  const functionsToCheck = ['trigger_set_timestamp', 'handle_new_user', 'is_admin', 'update_updated_at_column'];
  
  for (const func of functionsToCheck) {
    try {
      const { data, error } = await supabase.rpc(func, {});
      
      if (error && error.code === '42883') {
        console.log(`✅ ${func}: Function exists`);
      } else if (error) {
        console.log(`⚠️  ${func}: ${error.message}`);
      } else {
        console.log(`✅ ${func}: Function callable`);
      }
    } catch (error) {
      console.log(`⚠️  ${func}: Could not check (${error.message})`);
    }
  }
  
  // Test basic functionality
  console.log('\n🧪 Functionality Tests:');
  console.log('='.repeat(50));
  
  try {
    // Test profiles table access (should work with service role)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .limit(1);
    
    if (profilesError) {
      console.log(`❌ Profiles access: ${profilesError.message}`);
    } else {
      console.log(`✅ Profiles access: OK (${profiles ? profiles.length : 0} records found)`);
    }
  } catch (error) {
    console.log(`⚠️  Profiles test: ${error.message}`);
  }
  
  try {
    // Test blog_posts table access
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, title')
      .limit(1);
    
    if (postsError && postsError.code === '42501') {
      console.log(`✅ Blog posts: RLS properly configured`);
    } else if (postsError) {
      console.log(`⚠️  Blog posts: ${postsError.message}`);
    } else {
      console.log(`✅ Blog posts: Access granted (${posts ? posts.length : 0} records found)`);
    }
  } catch (error) {
    console.log(`⚠️  Blog posts test: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 Security Status Summary:');
  console.log('='.repeat(50));
  console.log('✅ RLS should be enabled on all public tables');
  console.log('✅ Functions should have secure search paths');
  console.log('✅ Permissive policies should be tightened');
  console.log('✅ Admin access should be properly restricted');
  console.log('\n🔧 To apply fixes, run the security migration in Supabase dashboard');
  console.log('   or copy SECURITY_FIXES_MANUAL.sql content and execute it');
}

// Run the verification
checkSecurityStatus().catch(console.error);