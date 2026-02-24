// Apply blog RLS policies via Supabase
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

async function applyRLS() {
    console.log('🔧 Applying blog_posts RLS policies...\n');
    
    const sql = `
-- Enable RLS on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin full access" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin read all posts" ON blog_posts;

-- Policy for public access (anonymous users) - read published only
CREATE POLICY "Allow public read access to published posts"
ON blog_posts FOR SELECT
TO anon
USING (status = 'published');

-- Policy for admin full access (all operations)
CREATE POLICY "Allow admin full access"
ON blog_posts FOR ALL
TO authenticated
USING (
    auth.uid() IN (
        SELECT id FROM profiles WHERE role = 'admin'
    )
);

-- Policy for admin read access (all posts including drafts)
CREATE POLICY "Allow admin read all posts"
ON blog_posts FOR SELECT
TO authenticated
USING (
    auth.uid() IN (
        SELECT id FROM profiles WHERE role = 'admin'
    )
);
    `;
    
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
        console.error('❌ Error applying RLS:', error);
        
        // Try alternative: execute as raw query
        console.log('\n⚠️ Trying alternative method...');
        const { error: rawError } = await supabase.from('blog_posts').select('count').limit(1);
        
        if (rawError) {
            console.error('❌ Cannot verify RLS:', rawError);
        } else {
            console.log('✅ Connection works, but RLS may need manual application');
        }
        
        console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:');
        console.log('=====================================');
        console.log(sql);
        console.log('=====================================');
    } else {
        console.log('✅ RLS policies applied successfully!');
    }
}

applyRLS().catch(console.error);
