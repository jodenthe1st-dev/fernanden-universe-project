// scripts/dump-admin.cjs
// Debug script: reads admins table for admin@fernanden.com and prints password_hash (do NOT share this publicly)
const fs = require('fs');
const path = require('path');
(async () => {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...rest] = trimmed.split('=');
        if (key) process.env[key.trim()] = rest.join('=').trim();
      }
    });
  }
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('admins').select('*').eq('email', 'admin@fernanden.com').limit(1).single();
  if (error) {
    console.error('Supabase error:', error);
    process.exit(2);
  }
  console.log('Admin row:', data);
})();
