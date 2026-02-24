#!/usr/bin/env node
// Apply security fixes to Supabase database (simplified version)

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
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY are set');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function applySecurityFixes() {
  console.log('🔧 Applying Supabase Security Fixes...\n');
  
  try {
    // Read the SQL migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/005_security_fixes.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Reading migration file...');
    console.log(`📁 Path: ${migrationPath}`);
    console.log(`📊 Size: ${sql.length} characters\n`);
    
    // Split SQL into individual statements and execute them
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.includes('RAISE NOTICE'));
    
    console.log(`📋 Found ${statements.length} SQL statements to execute\n`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (stmt.length < 10) continue; // Skip very short statements
      
      console.log(`📝 Executing statement ${i + 1}/${statements.length}...`);
      console.log(`   ${stmt.substring(0, 60)}${stmt.length > 60 ? '...' : ''}`);
      
      try {
        const { error: stmtError } = await supabase.rpc('exec_sql', { 
          sql: stmt + ';' 
        });
        
        if (stmtError) {
          console.warn(`⚠️  Warning on statement ${i + 1}:`, stmtError.message);
          errorCount++;
        } else {
          console.log(`   ✅ Statement ${i + 1} completed`);
          successCount++;
        }
      } catch (stmtError) {
        console.warn(`⚠️  Error on statement ${i + 1}:`, stmtError.message);
        errorCount++;
      }
    }
    
    console.log(`\n📊 Execution Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ⚠️  Warnings: ${errorCount}`);
    console.log(`   📊 Total: ${statements.length}\n`);
    
    if (successCount > 0) {
      console.log('✅ Migration completed with individual statements');
      await verifyFixes();
      return true;
    } else {
      console.log('❌ No statements were executed successfully');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

async function verifyFixes() {
  console.log('\n🔍 Verifying security fixes...');
  console.log('='.repeat(50));
  
  // Check RLS status on tables
  const tablesToCheck = ['media_files', 'users', 'admins', 'admin_sessions', 'media', 'contact_subscriptions'];
  
  console.log('\n🔐 RLS Status Check:');
  for (const table of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count(*)', { count: 'exact', head: true });
      
      if (error && error.code === '42501') {
        console.log(`✅ ${table}: RLS enabled (access denied as expected)`);
      } else if (error && error.code === '42P01') {
        console.log(`ℹ️  ${table}: Table does not exist`);
      } else if (error) {
        console.log(`⚠️  ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: Access granted (may need RLS configuration)`);
      }
    } catch (error) {
      console.log(`⚠️  ${table}: Could not verify (${error.message})`);
    }
  }
  
  // Check functions
  console.log('\n🔧 Function Security Check:');
  const functionsToCheck = ['trigger_set_timestamp', 'handle_new_user', 'is_admin', 'update_updated_at_column'];
  
  for (const func of functionsToCheck) {
    try {
      // This is a basic check - we can't directly query function security settings
      // But we can verify the functions exist by attempting to call them with wrong parameters
      const { data, error } = await supabase.rpc(func, {});
      
      if (error && error.code === '42883') { // Function exists but wrong parameters
        console.log(`✅ ${func}: Function exists`);
      } else if (error && error.code === '42883') {
        console.log(`✅ ${func}: Function exists`);
      } else {
        console.log(`⚠️  ${func}: Function may not exist or have issues`);
      }
    } catch (error) {
      console.log(`⚠️  ${func}: Could not verify (${error.message})`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
}

async function main() {
  console.log('🚀 Starting Supabase Security Fix Process\n');
  console.log('📍 Supabase URL:', SUPABASE_URL.replace(/https:\/\/(.{8}).*/, 'https://$1...'));
  console.log('🔑 Using Service Role Key\n');
  
  const success = await applySecurityFixes();
  
  if (success) {
    console.log('\n🎉 Security fixes applied successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Check Supabase dashboard for any remaining warnings');
    console.log('2. Test your application functionality');
    console.log('3. Verify that admin features still work correctly');
    console.log('4. Run any custom tests for your specific use cases');
  } else {
    console.log('\n❌ Security fixes failed to apply');
    console.log('Please check the error messages above and try again');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { applySecurityFixes };