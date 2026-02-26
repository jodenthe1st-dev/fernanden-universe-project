// scripts/set-admin-password.cjs
// Usage: node scripts/set-admin-password.cjs admin@domain.com newPassword
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key) process.env[key.trim()] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
  }
}

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node scripts/set-admin-password.cjs <email> <newPassword>');
    process.exit(1);
  }

  const [emailRaw, newPassword] = args;
  const email = String(emailRaw).trim().toLowerCase();
  if (newPassword.length < 8) {
    console.error('Password too short. Use at least 8 characters.');
    process.exit(1);
  }

  loadEnv();
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Find auth user by email
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    console.error('List users error:', listError.message);
    process.exit(2);
  }

  const user = (usersData?.users || []).find((u) => (u.email || '').toLowerCase() === email);
  if (!user) {
    console.error('Auth user not found for email:', email);
    process.exit(3);
  }

  const { error: updError } = await supabase.auth.admin.updateUserById(user.id, {
    password: String(newPassword),
    email_confirm: true,
  });

  if (updError) {
    console.error('Update password error:', updError.message);
    process.exit(4);
  }

  // Ensure profile role admin for this account
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin', email })
    .eq('id', user.id);

  if (profileError) {
    console.error('Password updated, but profile role update failed:', profileError.message);
    process.exit(5);
  }

  console.log('Admin password updated for', email);
})().catch((err) => {
  console.error('Unexpected error:', err?.message || err);
  process.exit(9);
});
