// scripts/set-admin-hash-test.cjs
// Generates a bcrypt hash for admin123, updates the admin record, then reads it back and verifies compare
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
  const bcrypt = require('bcryptjs');
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const email = 'admin@fernanden.com';
  const pw = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pw, salt);
  console.log('Generated hash:', hash);

  const { data: existing, error: e1 } = await supabase.from('admins').select('id').eq('email', email).limit(1).single();
  if (e1) { console.error('Lookup error:', e1); process.exit(2); }
  if (!existing) { console.error('Admin not found'); process.exit(3); }
  await supabase.from('admins').update({ password_hash: hash, updated_at: new Date().toISOString() }).eq('id', existing.id);
  console.log('Updated DB with new hash.');
  const { data, error } = await supabase.from('admins').select('password_hash').eq('email', email).limit(1).single();
  if (error) { console.error('Readback error:', error); process.exit(4); }
  console.log('DB hash:', data.password_hash);
  const ok = await bcrypt.compare(pw, data.password_hash);
  console.log('bcrypt.compare result:', ok);
})();