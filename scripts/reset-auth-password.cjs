// Reset password for Supabase Auth user
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

async function resetPassword() {
    const email = 'admin@fernanden.com';
    const newPassword = 'admin123';
    
    console.log(`🔍 Finding user: ${email}...`);
    
    // Find user
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
        console.error('❌ Error listing users:', listError);
        process.exit(1);
    }
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
        console.error(`❌ User ${email} not found`);
        process.exit(1);
    }
    
    console.log(`✅ User found: ${user.id}`);
    console.log(`🔑 Updating password...`);
    
    // Update password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
    );
    
    if (updateError) {
        console.error('❌ Error updating password:', updateError);
        process.exit(1);
    }
    
    console.log('✅ Password updated successfully!');
    console.log(`\n📧 Email: ${email}`);
    console.log(`🔒 Password: ${newPassword}`);
    console.log('\n🎉 You can now log in at /admin/login');
}

resetPassword().catch(console.error);
