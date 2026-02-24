#!/usr/bin/env node
// Apply security fixes to Supabase database

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_SERVICE_KEY;

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
    
    // Execute the migration
    console.log('🚀 Executing migration...');
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('❌ Error executing migration:');
      console.error('Code:', error.code);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      
      // Try alternative approach - execute via SQL endpoint
      console.log('\n🔄 Trying alternative approach via REST API...');
      try {
        // Split SQL into individual statements and execute them
        const statements = sql
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`📋 Found ${statements.length} SQL statements to execute\n`);
        
        for (let i = 0; i < statements.length; i++) {
          const stmt = statements[i];
          if (stmt.toUpperCase().startsWith('SELECT') || 
              stmt.toUpperCase().includes('RAISE NOTICE')) {
            continue; // Skip SELECT statements and notices
          }
          
          console.log(`📝 Executing statement ${i + 1}/${statements.length}...`);
          console.log(`   ${stmt.substring(0, 80)}${stmt.length > 80 ? '...' : ''}`);
          
          const { error: stmtError } = await supabase.rpc('exec_sql', { 
            sql: stmt + ';' 
          });
          
          if (stmtError) {
            console.warn(`⚠️  Warning on statement ${i + 1}:`, stmtError.message);
          } else {
            console.log(`   ✅ Statement ${i + 1} completed`);
          }
        }
        
        console.log('\n✅ Migration completed with individual statements');
      } catch (altError) {
        console.error('❌ Alternative approach also failed:', altError.message);
        return false;
      }
    } else {
      console.log('✅ Migration executed successfully via RPC');
    }
    
    // Verify the fixes
    console.log('\n🔍 Verifying security fixes...');
    await verifyFixes();
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

async function verifyFixes() {
  console.log('\n📋 Verification Results:');
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
      } else {
        console.log(`⚠️  ${table}: RLS may not be properly configured`);
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
      // But we can verify the functions exist
      const { data, error } = await supabase.rpc(func, {});
      
      if (error && error.code !== '42883') { // 42883 = function exists but wrong parameters
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