const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (!match) continue;
    env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function inferCategory(key) {
  if (key.startsWith('social_')) return 'social';
  if (key.startsWith('seo_')) return 'seo';
  if (key.startsWith('theme_')) return 'appearance';
  if (key.startsWith('contact_')) return 'contact';
  if (key.includes('maintenance') || key.includes('notification') || key.includes('registration')) return 'security';
  return 'general';
}

async function run() {
  const env = loadEnv();
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_KEY in .env.local');
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const defaults = {
    site_name: 'Fernanden',
    site_description: 'Design 3-en-1 aux multiples facettes.',
    site_url: 'https://fernanden.com',
    contact_email: 'fernandenentreprises@gmail.com',
    contact_phone: '+229 01 97 51 26 36',
    contact_address: 'Cotonou, Benin',
    maintenance_mode: false,
    email_notifications: true,
    theme_primary_color: '#D4AF37',
    theme_secondary_color: '#111111',
    seo_title: 'Fernanden',
    seo_description: 'Design 3-en-1: SHE, DENSE, CaFEE',
    social_facebook: 'https://www.facebook.com/share/1A4ToZPFmk/',
    social_twitter: '',
    social_instagram: 'https://www.instagram.com/fernanden_design',
    social_linkedin: 'https://www.linkedin.com/company/fernanden-entreprises/',
    social_tiktok: 'https://www.tiktok.com/@fernanden_design',
  };

  const { data: existingRows, error: readError } = await supabase
    .from('site_settings')
    .select('id,key,value,category');
  if (readError) throw readError;

  const existingByKey = new Map((existingRows || []).map((row) => [row.key, row]));
  const now = new Date().toISOString();

  let created = 0;
  let updated = 0;
  for (const [keyName, value] of Object.entries(defaults)) {
    const existing = existingByKey.get(keyName);
    if (!existing) {
      const { error } = await supabase.from('site_settings').insert({
        key: keyName,
        value,
        category: inferCategory(keyName),
        updated_at: now,
      });
      if (error) throw error;
      created += 1;
      continue;
    }

    const shouldFillEmpty =
      existing.value === null ||
      existing.value === '' ||
      (typeof existing.value === 'string' && existing.value.trim() === '');
    const shouldFixCategory = !existing.category;

    if (shouldFillEmpty || shouldFixCategory) {
      const patch = {
        updated_at: now,
      };
      if (shouldFillEmpty) patch.value = value;
      if (shouldFixCategory) patch.category = inferCategory(keyName);

      const { error } = await supabase
        .from('site_settings')
        .update(patch)
        .eq('id', existing.id);
      if (error) throw error;
      updated += 1;
    }
  }

  console.log(`site_settings synced: created=${created}, updated=${updated}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
