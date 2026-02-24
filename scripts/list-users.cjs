const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
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
// Prefer server-only env vars; allow legacy VITE_* fallback for backward compatibility.
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (env.VITE_SUPABASE_SERVICE_ROLE_KEY && !env.SUPABASE_SERVICE_KEY) {
    console.warn('WARNING: Using legacy VITE_SUPABASE_SERVICE_ROLE_KEY. Migrate to SUPABASE_SERVICE_KEY (server-only).');
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('Credentials missing in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function listUsers() {
    console.log('Fetching users...');
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    console.log('Found ' + users.length + ' users:');
    for (const u of users) {
        // Get profile
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', u.id).single();
        console.log(`- ${u.email} (Role: ${profile ? profile.role : 'none'})`);
    }
}

listUsers();
