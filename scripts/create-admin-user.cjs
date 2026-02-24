// Create admin user in Supabase Auth
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
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function createAdminUser() {
    const email = 'admin@fernanden.com';
    const password = 'admin123';
    
    console.log(`🔍 Checking if user exists: ${email}...`);
    
    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
        console.error('❌ Error listing users:', listError);
        process.exit(1);
    }
    
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
        console.log(`✅ User already exists: ${existingUser.id}`);
        console.log(`🔑 Updating password...`);
        
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: password }
        );
        
        if (updateError) {
            console.error('❌ Error updating password:', updateError);
            process.exit(1);
        }
        
        console.log('✅ Password updated!');
        
        // Ensure profile exists with admin role
        await ensureProfile(existingUser.id, email);
        
    } else {
        console.log(`📝 Creating new admin user...`);
        
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: { full_name: 'Admin' }
        });
        
        if (createError) {
            console.error('❌ Error creating user:', createError);
            process.exit(1);
        }
        
        console.log(`✅ User created: ${newUser.user.id}`);
        
        // Create profile with admin role
        await ensureProfile(newUser.user.id, email);
    }
    
    console.log('\n🎉 Admin user ready!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔒 Password: ${password}`);
    console.log('\n👉 You can now log in at /admin/login');
}

async function ensureProfile(userId, email) {
    console.log('📝 Checking profile...');
    
    const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
        console.error('❌ Error checking profile:', profileError);
        return;
    }
    
    if (!existingProfile) {
        console.log('📝 Creating profile with admin role...');
        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                email: email,
                role: 'admin',
                full_name: 'Admin',
                updated_at: new Date().toISOString()
            });
        
        if (insertError) {
            console.error('❌ Error creating profile:', insertError);
        } else {
            console.log('✅ Profile created with admin role!');
        }
    } else {
        console.log(`📝 Updating profile role to admin (current: ${existingProfile.role})...`);
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin', updated_at: new Date().toISOString() })
            .eq('id', userId);
        
        if (updateError) {
            console.error('❌ Error updating profile:', updateError);
        } else {
            console.log('✅ Profile updated to admin!');
        }
    }
}

createAdminUser().catch(console.error);
