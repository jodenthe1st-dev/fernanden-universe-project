// Create profiles table in Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) { return {}; }
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                env[key] = value;
            }
        });
        return env;
    } catch (e) { return {}; }
}

const env = loadEnv();
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function createProfilesTable() {
    console.log('🔧 Creating profiles table...\n');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '004_create_profiles_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute SQL (we'll do it step by step since we can't use exec_sql)
    console.log('Step 1: Creating table...');
    
    const { error: tableError } = await supabase.from('profiles').select('count').limit(1);
    
    if (!tableError || tableError.code !== 'PGRST116') {
        console.log('✅ Profiles table already exists!');
    } else {
        console.log('⚠️ Table does not exist. Please run this SQL manually in Supabase SQL Editor:');
        console.log('\n' + '='.repeat(60));
        console.log(sql);
        console.log('='.repeat(60) + '\n');
        
        console.log('📋 Instructions:');
        console.log('1. Go to https://supabase.com/dashboard');
        console.log('2. Select your project');
        console.log('3. Go to SQL Editor');
        console.log('4. Paste the SQL above');
        console.log('5. Click "Run"');
        console.log('\nAfter running the SQL, the admin login will work!');
        return;
    }
    
    // Check if admin user has profile
    console.log('\nStep 2: Checking admin profile...');
    
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
        console.error('❌ Error listing users:', userError);
        return;
    }
    
    const adminUser = users.users.find(u => u.email === 'admin@fernanden.com');
    
    if (!adminUser) {
        console.error('❌ Admin user not found!');
        return;
    }
    
    console.log(`✅ Found admin user: ${adminUser.id}`);
    
    // Check profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', adminUser.id)
        .single();
    
    if (profileError && profileError.code === 'PGRST116') {
        console.log('📝 Creating admin profile...');
        
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
            console.error('❌ Error creating profile:', insertError);
        } else {
            console.log('✅ Admin profile created!');
        }
    } else if (profile) {
        console.log(`✅ Admin profile exists (role: ${profile.role})`);
        
        if (profile.role !== 'admin') {
            console.log('📝 Updating role to admin...');
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', adminUser.id);
            
            if (updateError) {
                console.error('❌ Error updating role:', updateError);
            } else {
                console.log('✅ Role updated to admin!');
            }
        }
    }
    
    console.log('\n🎉 Setup complete! You can now log in at /admin/login');
}

createProfilesTable().catch(console.error);
