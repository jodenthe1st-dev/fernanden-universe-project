const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { writeFile, mkdir, unlink } = require('fs').promises;
const { join, resolve } = require('path');
const { existsSync } = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Supabase client for server-side admin lookup (requires SUPABASE_URL and SUPABASE_SERVICE_KEY env vars)
let createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (e) {
  createClient = null;
}

// Optional security middleware (use if installed)
let helmet;
let rateLimit;
try { helmet = require('helmet'); } catch (e) { helmet = null; }
try { rateLimit = require('express-rate-limit'); } catch (e) { rateLimit = null; }

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware amélioré
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080', 'https://ton-domaine.com'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

if (helmet) app.use(helmet());
if (rateLimit) {
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
} else {
  console.warn('express-rate-limit not installed — skipping rate limiter');
}

// Logs des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Configuration Multer améliorée
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const folder = String(req.body.folder || 'documents').replace(/[^a-zA-Z0-9-_]/g, '_');
    const uploadDir = join(__dirname, '..', 'public', 'uploads', folder);

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const random = crypto.randomBytes(8).toString('hex');
    const safeName = `${Date.now()}-${random}${safeExt}`;
    cb(null, safeName);
  }
});

// Whitelist MIME types per folder (adjust as needed)
const folderMimeMap = {
  images: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'],
  documents: ['application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  default: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf', 'application/zip']
};

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype) return cb(null, false);
  const rawFolder = String((req.body && req.body.folder) || '').replace(/[^a-zA-Z0-9-_]/g, '_');
  const folderKey = rawFolder || 'default';
  const allowed = folderMimeMap[folderKey] || folderMimeMap.default;
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10 // Max 10 fichiers
  }
});

// Initialize Supabase client if available
let supabase = null;
if (createClient && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
} else if (!createClient) {
  console.warn('@supabase/supabase-js not installed — admin DB auth disabled');
} else {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_KEY not set — admin DB auth disabled');
}

// Helpful debug logging for login attempts (do not log passwords)
function logLoginAttempt(req, result, extra) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const email = (req.body && req.body.email) ? String(req.body.email) : 'unknown';
    console.log(`🔐 [${new Date().toISOString()}] Login attempt for ${email} from ${ip}: ${result}${extra ? ' - ' + extra : ''}`);
  } catch (e) {
    // ignore logging errors
  }
}

// Route upload améliorée - ACCEPTE PLUSIEURS FICHIERS
app.post('/api/upload', checkAdmin, upload.array('uploads', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'Aucun fichier fourni',
        code: 'NO_FILE'
      });
    }

    const { folder, category } = req.body;
    const uploadedFiles = [];
    
    // Traiter chaque fichier
    for (const file of req.files) {
      const safeFolder = String(folder || 'documents').replace(/[^a-zA-Z0-9-_]/g, '_');
      const publicUrl = `/uploads/${safeFolder}/${file.filename}`;
      uploadedFiles.push({
        publicUrl,
        filename: file.filename,
        size: file.size,
        type: file.mimetype
      });
      
      console.log(`✅ [${new Date().toISOString()}] Fichier uploadé: ${file.path} (${file.size} bytes)`);
    }

    res.json({ 
      success: true, 
      files: uploadedFiles,
      folder,
      category,
      count: uploadedFiles.length
    });

  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Erreur upload:`, error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'upload',
      code: 'UPLOAD_ERROR',
      details: error.message
    });
  }
});

// Route delete améliorée
app.post('/api/delete', checkAdmin, async (req, res) => {
  try {
    const { publicUrl, filename } = req.body;

    if (!publicUrl && !filename) {
      return res.status(400).json({ 
        error: 'publicUrl ou filename requis',
        code: 'NO_URL'
      });
    }

    const uploadsRoot = resolve(__dirname, '..', 'public', 'uploads');
    let targetPath;

    if (filename) {
      // If folder provided, remove from that folder; otherwise attempt direct filename under uploads root
      const safeFilename = path.basename(String(filename));
      const rawFolder = String((req.body && req.body.folder) || '').replace(/[^a-zA-Z0-9-_]/g, '_');
      if (rawFolder) {
        targetPath = resolve(uploadsRoot, rawFolder, safeFilename);
      } else {
        targetPath = resolve(uploadsRoot, safeFilename);
      }
    } else {
      const relativePath = publicUrl.startsWith('/') ? publicUrl.slice(1) : publicUrl;
      targetPath = resolve(__dirname, '..', relativePath);
    }

    if (!targetPath.startsWith(uploadsRoot)) {
      return res.status(400).json({ error: 'Invalid path', code: 'INVALID_PATH' });
    }

    if (existsSync(targetPath)) {
      await unlink(targetPath);
      console.log(`✅ [${new Date().toISOString()}] Fichier supprimé: ${targetPath}`);
    }

    res.json({ 
      success: true, 
      message: 'Fichier supprimé',
      code: 'DELETED'
    });

  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Erreur suppression:`, error);
    res.status(500).json({ 
      error: 'Erreur lors de la suppression',
      code: 'DELETE_ERROR',
      details: error.message
    });
  }
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// --- Admin auth endpoints (simple HMAC-signed token stored in httpOnly cookie)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@fernanden.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'dev_admin_secret_change_me';

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(`${header}.${body}`).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch (e) {
    return null;
  }
}

function parseCookies(req) {
  const header = req.headers?.cookie;
  if (!header) return {};
  return Object.fromEntries(header.split(';').map(c => c.trim().split('=').map(decodeURIComponent)));
}

// Middleware pour vérifier si l'utilisateur est admin via cookie
function checkAdmin(req, res, next) {
  try {
    const cookies = parseCookies(req);
    const token = cookies['admin_token'];
    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized', code: 'UNAUTHORIZED' });
    }
    req.admin = payload; // attach payload for later use
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
}

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    // If Supabase client is available, authenticate against the `admins` table
    if (supabase) {
      const { data, error } = await supabase.from('admins').select('id, email, password_hash, role, disabled').eq('email', email).limit(1).single();
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error during admin lookup', error);
        logLoginAttempt(req, 'error', 'supabase lookup failed');
        return res.status(500).json({ error: 'internal' });
      }
      if (!data) {
        logLoginAttempt(req, 'rejected', 'no admin record');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      if (data.disabled) {
        logLoginAttempt(req, 'rejected', 'admin disabled');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const matches = await bcrypt.compare(String(password), String(data.password_hash));
      if (!matches) {
        logLoginAttempt(req, 'rejected', 'wrong password');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = { id: data.id, email: data.email, role: data.role };
      const token = signToken({ sub: user.id, email: user.email, role: user.role, iat: Date.now() });
      res.cookie('admin_token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 });
      logLoginAttempt(req, 'accepted');
      return res.json({ success: true, user });
    }

    // Fallback to env-based auth if Supabase not configured
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = { id: '1', email: ADMIN_EMAIL, name: 'Administrateur', role: 'admin' };
      const token = signToken({ sub: user.id, email: user.email, role: user.role, iat: Date.now() });
      res.cookie('admin_token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 });
      return res.json({ success: true, user });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

// Endpoint to update admin email/password (protected)
app.post('/api/admin/update', checkAdmin, async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body || {};
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
    if (!currentPassword) return res.status(400).json({ error: 'currentPassword required' });

    // Load admin record by id from token payload
    const adminId = req.admin && req.admin.sub;
    if (!adminId) return res.status(401).json({ error: 'Unauthorized' });

    const { data } = await supabase.from('admins').select('id,email,password_hash').eq('id', adminId).limit(1).single();
    if (!data) return res.status(404).json({ error: 'Admin not found' });

    const ok = await bcrypt.compare(String(currentPassword), String(data.password_hash));
    if (!ok) return res.status(403).json({ error: 'Current password incorrect' });

    const updates = {};
    if (email) updates.email = email;
    if (newPassword) updates.password_hash = await bcrypt.hash(String(newPassword), 10);

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'Nothing to update' });

    await supabase.from('admins').update(updates).eq('id', adminId);
    return res.json({ success: true });
  } catch (e) {
    console.error('Admin update error', e);
    return res.status(500).json({ error: 'Internal' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

app.get('/api/admin/me', (req, res) => {
  try {
    const cookies = parseCookies(req);
    const token = cookies['admin_token'];
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: 'Not authenticated' });
    return res.json({ user: { id: payload.sub, email: payload.email, role: payload.role } });
  } catch (err) {
    console.error('Me error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

/**
 * POST /api/cloudinary/destroy - Delete file from Cloudinary (server-side with secrets)
 * Never expose API_KEY or API_SECRET to frontend
 */
app.post('/api/cloudinary/destroy', checkAdmin, async (req, res) => {
  try {
    const { public_id, resource_type = 'image' } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'public_id is required' });
    }

    const CLOUDINARY_CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_API_KEY = process.env.VITE_CLOUDINARY_API_KEY;
    const CLOUDINARY_API_SECRET = process.env.VITE_CLOUDINARY_API_SECRET;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      console.warn('Cloudinary credentials not configured');
      return res.status(500).json({ error: 'Cloudinary not configured' });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    
    // Build signature for Cloudinary API (server-side only)
    const signatureString = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const crypto = require('crypto');
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    // Call Cloudinary API from server (secrets never leave backend)
    const formData = new URLSearchParams();
    formData.append('public_id', public_id);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', CLOUDINARY_API_KEY);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resource_type}/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      console.error(`Cloudinary delete failed: ${response.statusText}`);
      return res.status(response.status).json({ error: 'Cloudinary deletion failed' });
    }

    const result = await response.json();
    return res.json({ success: true, result });
  } catch (error) {
    console.error('[Cloudinary Delete] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    code: 'NOT_FOUND',
    path: req.originalUrl
  });
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
  console.error(`❌ [${new Date().toISOString()}] Erreur serveur:`, error);
  res.status(500).json({ 
    error: 'Erreur serveur interne',
    code: 'INTERNAL_ERROR'
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 [${new Date().toISOString()}] Serveur API lancé sur http://localhost:${PORT}`);
  console.log(`📁 Dossier uploads: ${join(__dirname, '..', 'public', 'uploads')}`);
  console.log(`🏥 Santé: http://localhost:${PORT}/api/health`);
});
