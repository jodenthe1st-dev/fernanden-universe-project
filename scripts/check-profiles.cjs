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

async function check() {
  console.log('Checking profiles table...\n');
  
  // List all profiles
  const { data: profiles, error } = await supabase.from('profiles').select('*');
  
  if (error) {
    console.log('❌ Error fetching profiles:', error);
    return;
  }
  
  console.log(`✅ Found ${profiles.length} profile(s):`);
  profiles.forEach(p => {
    console.log(`  - ${p.email} (role: ${p.role}, id: ${p.id})`);
  });
  
  // Check admin user
  console.log('\nChecking admin user...');
  const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
  
  if (userError) {
    console.log('❌ Error listing users:', userError);
    return;
  }
  
  const adminUser = users.find(u => u.email === 'admin@fernanden.com');
  
  if (!adminUser) {
    console.log('❌ Admin user not found in auth!');
    return;
  }
  
  console.log(`✅ Admin user found: ${adminUser.id}`);
  
  // Check if profile exists for admin
  const adminProfile = profiles.find(p => p.id === adminUser.id);
  
  if (!adminProfile) {
    console.log('❌ No profile found for admin user!');
    console.log('Creating profile...');
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: adminUser.id,
        email: adminUser.email,
        role: 'admin',
        full_name: 'Admin',
        updated_at: new Date().toISOString()
      });
    
    if (insertError) {
      console.log('❌ Error creating profile:', insertError);
    } else {
      console.log('✅ Admin profile created!');
    }
  } else {
    console.log(`✅ Admin profile exists with role: ${adminProfile.role}`);
  }
}

check().catch(console.error);
