const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Read .env.local manually
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('❌ .env.local not found!');
            return {};
        }
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // params quotes
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        console.error('Error reading .env.local:', e);
        return {};
    }
}

const env = loadEnv();
// Prefer server-only env vars; allow legacy VITE_* fallback for backward compatibility.
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (env.VITE_SUPABASE_SERVICE_ROLE_KEY && !env.SUPABASE_SERVICE_KEY) {
    console.warn('WARNING: Using legacy VITE_SUPABASE_SERVICE_ROLE_KEY. Migrate to SUPABASE_SERVICE_KEY (server-only).');
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials in .env.local');
    console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_KEY (server-only).');
    console.error('Legacy fallback: VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY (NOT recommended).');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Fernanden Admin Fixer');
console.log('-------------------------');

rl.question('📧 Enter the email of the user to promote to ADMIN: ', async (email) => {
    if (!email) {
        console.error('❌ Email is required');
        process.exit(1);
    }

    try {
        // 1. Find the user in auth.users (requires service role)
        // Supabase JS client doesn't expose listUsers easily without paginaton, 
        // but we can try to find the profile directly if it exists, or update if we know the ID.
        // Actually admin.listUsers is available.

        console.log(`🔍 Searching for user: ${email}...`);

        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

        if (listError) throw listError;

        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            console.error(`❌ User not found in Auth. Please sign up first on the website.`);
            process.exit(1);
        }

        console.log(`✅ User found: ${user.id}`);

        // 2. Check/Update Public Profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "one row expected" (found 0)
            throw profileError;
        }

        if (!profile) {
            console.log('📝 Creating missing profile...');
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    email: user.email,
                    role: 'admin',
                    full_name: user.user_metadata.full_name || 'Admin',
                    updated_at: new Date()
                });

            if (insertError) throw insertError;
            console.log('✅ Profile created with ADMIN role.');
        } else {
            console.log(`📝 Updating existing profile (current role: ${profile.role})...`);
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', user.id);

            if (updateError) throw updateError;
            console.log('✅ Profile updated to ADMIN role.');
        }

        // 3. Confirm Email if not confirmed
        if (!user.email_confirmed_at) {
            console.log('📧 Confirming email...');
            const { error: confirmError } = await supabase.auth.admin.updateUserById(
                user.id,
                { email_confirm: true }
            );
            if (confirmError) console.warn('Warning: could not confirm email', confirmError);
            else console.log('✅ Email confirmed.');
        }

        console.log('\n🎉 SUCCESS! You can now log in at /admin/login');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        rl.close();
        process.exit(0);
    }
});
