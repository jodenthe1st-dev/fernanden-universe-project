// scripts/set-admin-password.cjs
// Usage: node scripts/set-admin-password.cjs admin@domain.com newPassword
const fs = require('fs');
const path = require('path');
(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node scripts/set-admin-password.cjs <email> <newPassword>');
    process.exit(1);
  }
  const [email, newPassword] = args;
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
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(String(newPassword), salt);
  const { data, error } = await supabase.from('admins').select('id,email').eq('email', email).limit(1).single();
  if (error) {
    console.error('Lookup error:', error);
    process.exit(2);
  }
  if (!data) {
    console.error('Admin not found');
    process.exit(3);
  }
  const { error: upd } = await supabase.from('admins').update({ password_hash: hash, updated_at: new Date().toISOString() }).eq('id', data.id);
  if (upd) {
    console.error('Update error:', upd);
    process.exit(4);
  }
  console.log('Password updated for', email);
})();
