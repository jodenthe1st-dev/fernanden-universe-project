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

const env = loadEnv();
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const checks = [
  {
    table: 'products',
    requiredColumns: ['id', 'name', 'description', 'category', 'price', 'images', 'featured', 'status', 'created_at'],
    optionalColumns: ['order_index', 'featured_image'],
  },
  {
    table: 'services',
    requiredColumns: ['id', 'title', 'description', 'category', 'featured', 'status', 'created_at'],
    optionalColumns: ['order_index', 'images', 'featured_image', 'price', 'price_range', 'icon_name'],
  },
  {
    table: 'podcasts',
    requiredColumns: ['id', 'title', 'description', 'category', 'status', 'created_at'],
    optionalColumns: ['episode_number', 'published_at', 'audio_url', 'thumbnail_url', 'tags'],
  },
  {
    table: 'profiles',
    requiredColumns: ['id', 'email', 'role'],
    optionalColumns: ['full_name', 'avatar_url', 'updated_at'],
  },
  {
    table: 'site_settings',
    requiredColumns: ['id', 'key', 'value'],
    optionalColumns: ['category', 'updated_at'],
  },
  {
    table: 'blog_posts',
    requiredColumns: ['id', 'title', 'slug', 'content', 'status'],
    optionalColumns: ['published_at', 'featured', 'category', 'created_at'],
  },
];

async function columnExists(table, column) {
  const { error } = await supabase.from(table).select(column).limit(1);
  return !error;
}

async function tableExists(table) {
  const { error } = await supabase.from(table).select('id').limit(1);
  if (!error) return true;
  if (error.code === 'PGRST204' || error.code === '42P01') return false;
  // id can be missing, fallback to wildcard select
  const fallback = await supabase.from(table).select('*').limit(1);
  return !fallback.error;
}

async function checkOrderColumn(table, orderColumn) {
  const { error } = await supabase.from(table).select('*').order(orderColumn, { ascending: true }).limit(1);
  return !error;
}

async function checkSiteSettingsKeys() {
  const expectedKeys = [
    'site_name',
    'site_description',
    'site_url',
    'contact_email',
    'contact_phone',
    'contact_address',
    'maintenance_mode',
    'email_notifications',
    'theme_primary_color',
    'theme_secondary_color',
    'seo_title',
    'seo_description',
    'social_facebook',
    'social_twitter',
    'social_instagram',
    'social_linkedin',
    'social_tiktok',
  ];

  const { data, error } = await supabase.from('site_settings').select('key');
  if (error) return { error };

  const present = new Set((data || []).map((r) => r.key));
  const missing = expectedKeys.filter((k) => !present.has(k));
  return { missing, presentCount: present.size };
}

async function run() {
  console.log('=== DB Concordance Audit ===\n');

  for (const check of checks) {
    process.stdout.write(`Table ${check.table}: `);
    const exists = await tableExists(check.table);
    if (!exists) {
      console.log('MISSING');
      continue;
    }
    console.log('OK');

    const missingRequired = [];
    for (const col of check.requiredColumns) {
      // eslint-disable-next-line no-await-in-loop
      const ok = await columnExists(check.table, col);
      if (!ok) missingRequired.push(col);
    }

    const presentOptional = [];
    for (const col of check.optionalColumns) {
      // eslint-disable-next-line no-await-in-loop
      const ok = await columnExists(check.table, col);
      if (ok) presentOptional.push(col);
    }

    if (missingRequired.length) {
      console.log(`  - Missing required columns: ${missingRequired.join(', ')}`);
    } else {
      console.log('  - Required columns: OK');
    }
    if (presentOptional.length) {
      console.log(`  - Optional columns present: ${presentOptional.join(', ')}`);
    }

    if (check.table === 'products') {
      const hasOrder = await checkOrderColumn('products', 'order_index');
      console.log(`  - order(products.order_index): ${hasOrder ? 'OK' : 'MISSING/INVALID'}`);
    }
    if (check.table === 'services') {
      const hasOrder = await checkOrderColumn('services', 'order_index');
      console.log(`  - order(services.order_index): ${hasOrder ? 'OK' : 'MISSING/INVALID'}`);
    }
    if (check.table === 'podcasts') {
      const hasEpisodeOrder = await checkOrderColumn('podcasts', 'episode_number');
      console.log(`  - order(podcasts.episode_number): ${hasEpisodeOrder ? 'OK' : 'MISSING/INVALID'}`);
    }
  }

  console.log('\nSite settings keys check:');
  const siteKeys = await checkSiteSettingsKeys();
  if (siteKeys.error) {
    console.log(`  - ERROR: ${siteKeys.error.message}`);
  } else {
    console.log(`  - Present keys: ${siteKeys.presentCount}`);
    if (siteKeys.missing.length) {
      console.log(`  - Missing keys: ${siteKeys.missing.join(', ')}`);
    } else {
      console.log('  - Missing keys: none');
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

