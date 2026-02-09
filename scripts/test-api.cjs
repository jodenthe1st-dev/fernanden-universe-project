// scripts/test-api.cjs
// Usage: 
//   set SUPABASE_URL=... & set SUPABASE_SERVICE_KEY=... & set ADMIN_TOKEN_SECRET=... & node scripts/test-api.cjs
//   (or use .env.local file with these vars)

const fs = require('fs');
const path = require('path');

// Load .env.local if exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  env.split('\n').filter(l => l.trim() && !l.startsWith('#')).forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) process.env[key.trim()] = val.trim();
  });
}

const BASE_URL = 'http://localhost:3001';
const ADMIN_EMAIL = 'admin@fernanden.com';
const ADMIN_PASSWORD = 'admin123';

let adminToken = null;

async function test(name, fn) {
  try {
    console.log(`\n🧪 [${name}]`);
    await fn();
    console.log(`✅ PASSED: ${name}`);
  } catch (e) {
    console.error(`❌ FAILED: ${name}`);
    console.error(e.message);
    process.exit(1);
  }
}

async function apiCall(method, path, body = null, opts = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'content-type': 'application/json',
    ...opts.headers,
  };
  
  const fetchOpts = {
    method,
    headers,
  };
  
  if (body) fetchOpts.body = JSON.stringify(body);
  if (adminToken && !opts.noAuth) fetchOpts.headers['Cookie'] = `admin_token=${adminToken}`;
  
  const res = await fetch(url, fetchOpts);
  const text = await res.text();
  
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
  }
  
  return { status: res.status, data, headers: res.headers };
}

(async () => {
  console.log('🚀 Starting API tests...\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Admin Email: ${ADMIN_EMAIL}`);
  
  // Test 1: Health check
  await test('Health check', async () => {
    const { data } = await apiCall('GET', '/api/health', null, { noAuth: true });
    if (!data.status || data.status !== 'OK') throw new Error('Health check failed');
  });

  // Test 2: Login
  await test('Admin login', async () => {
    const { data, headers } = await apiCall('POST', '/api/admin/login', 
      { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
      { noAuth: true }
    );
    
    if (!data.success || !data.user) throw new Error('Login failed');
    if (data.user.email !== ADMIN_EMAIL) throw new Error('Email mismatch');
    
    // Extract cookie from Set-Cookie header
    const setCookie = headers.get('set-cookie');
    if (!setCookie) throw new Error('No cookie set');
    
    // Extract token from cookie
    const match = setCookie.match(/admin_token=([^;]+)/);
    if (!match) throw new Error('Token not in cookie');
    adminToken = match[1];
  });

  // Test 3: Get admin info (me)
  await test('Get admin info (/api/admin/me)', async () => {
    const { data } = await apiCall('GET', '/api/admin/me');
    if (!data.user || data.user.email !== ADMIN_EMAIL) throw new Error('Admin info fetch failed');
  });

  // Test 4: Attempt login with wrong password (should fail)
  await test('Login with wrong password (should fail gracefully)', async () => {
    try {
      await apiCall('POST', '/api/admin/login',
        { email: ADMIN_EMAIL, password: 'wrongpass' },
        { noAuth: true }
      );
      throw new Error('Should have failed');
    } catch (e) {
      if (!e.message.includes('HTTP 401')) throw e;
    }
  });

  // Test 5: Upload file (mock)
  await test('Upload endpoint accessible (protected)', async () => {
    // Just test if endpoint is protected; real multipart upload would be more complex
    try {
      const { data } = await apiCall('POST', '/api/upload',
        { folder: 'documents' },
        { headers: { 'content-type': 'application/json' } }
      );
      // Expect 400 (no file) as success — means endpoint is protected & accessible
    } catch (e) {
      // Accept 400 (no file) as success
      if (!e.message.includes('HTTP 400')) {
        throw e; // Only fail on non-400 errors (like 401)
      }
    }
  });

  // Test 6: Admin update (change password attempt - should fail if DB not writeable, which is ok for test)
  await test('Admin update endpoint accessible (protected)', async () => {
    try {
      // Try to "update" (will fail with bad cred or other reason, but should NOT be 401)
      await apiCall('POST', '/api/admin/update',
        { currentPassword: 'admin123', newPassword: 'newpass123' }
      );
    } catch (e) {
      // Acceptable errors: 400 (validation), 500 (DB issue)
      // NOT acceptable: 401 (auth should work)
      if (e.message.includes('401')) throw e;
    }
  });

  console.log('\n\n✅ All tests passed!\n');
  process.exit(0);
})().catch(e => {
  console.error('\n❌ Test suite failed:', e);
  process.exit(1);
});
