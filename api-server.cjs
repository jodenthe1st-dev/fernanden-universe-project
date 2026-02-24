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
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://localhost:8080';
app.use(cors({
  origin: corsOrigin.split(',').map(s => s.trim()),
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Reduced from 50mb; use CloudinaryService for large media uploads
app.use(express.static('public'));

if (helmet) app.use(helmet());
if (rateLimit) {
  // Global rate limiter (lenient)
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  // Export loginLimiter for use on /api/admin/login route
  global.loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, skipSuccessfulRequests: false });
} else {
  console.warn('express-rate-limit not installed — skipping rate limiter');
  global.loginLimiter = (req, res, next) => next(); // noop
}

// Logs des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Configuration Multer améliorée
// Whitelist folders para path traversal prevention
const ALLOWED_FOLDERS = ['documents', 'images', 'general', 'dense', 'she', 'cafee'];

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let folder = String(req.body.folder || 'documents').replace(/[^a-zA-Z0-9-_]/g, '_');
    // Strict whitelist validation
    if (!ALLOWED_FOLDERS.includes(folder)) {
      folder = 'documents';
      console.warn(`[Multer] Invalid folder requested, defaulting to 'documents'`);
    }
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
  general: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'],
  dense: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  she: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  cafee: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  default: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf']
};

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype) return cb(null, false);
  const rawFolder = String((req.body && req.body.folder) || 'default').replace(/[^a-zA-Z0-9-_]/g, '_');
  // Strict whitelist: only allow folders in ALLOWED_FOLDERS
  if (!ALLOWED_FOLDERS.includes(rawFolder)) return cb(null, false);
  const allowed = folderMimeMap[rawFolder] || folderMimeMap.default;
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

// Route de santé (minimal info)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// --- Admin auth endpoints (simple HMAC-signed token stored in httpOnly cookie)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@fernanden.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'dev_admin_secret_change_me';

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  // Ensure an expiration is present (default 24h)
  const bodyPayload = Object.assign({}, payload);
  if (!bodyPayload.exp) bodyPayload.exp = now + 24 * 60 * 60;
  const body = Buffer.from(JSON.stringify(bodyPayload)).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(`${header}.${body}`).digest('base64url');
  try {
    const sigBuf = Buffer.from(String(signature));
    const expBuf = Buffer.from(String(expected));
    if (sigBuf.length !== expBuf.length) return null; // avoid timingSafeEqual throwing
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  } catch (e) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload && payload.exp && Math.floor(Date.now() / 1000) > Number(payload.exp)) return null; // expired
    return payload;
  } catch (e) {
    return null;
  }
}

// Middleware pour vérifier si l'utilisateur est admin via Token Bearer (Supabase)
async function checkAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header', code: 'UNAUTHORIZED' });
    }

    const token = authHeader.replace('Bearer ', '');

    // 1. Vérifier le token via Supabase Auth
    if (!supabase) {
      console.error('Supabase client not initialized on server');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token', code: 'UNAUTHORIZED' });
    }

    // 2. Vérifier le rôle dans la table profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      console.warn(`⛔ [Auth] Access denied for user ${user.email} (role: ${profile?.role})`);
      return res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' });
    }

    req.admin = { sub: user.id, email: user.email, role: profile.role };
    return next();

  } catch (e) {
    console.error('Auth error:', e);
    return res.status(401).json({ error: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
}

// --- LEGACY AUTH ROUTES REMOVED ---
// The frontend now uses Supabase Auth directly.
// The following routes are deprecated and removed to prevent confusion/security risks.
// POST /api/admin/login -> Use Supabase SDK
// POST /api/admin/logout -> Use Supabase SDK
// GET /api/admin/me -> Use Supabase SDK
// POST /api/admin/update -> Use Supabase SDK

/**
 * POST /api/cloudinary/sign - Generate signature for client-side upload
 * Only allow ALREADY AUTHENTICATED admins to get a signature.
 */
app.post('/api/cloudinary/sign', checkAdmin, (req, res) => {
  try {
    const CLOUDINARY_CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_API_KEY = process.env.VITE_CLOUDINARY_API_KEY;
    const CLOUDINARY_API_SECRET = process.env.VITE_CLOUDINARY_API_SECRET;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: 'Cloudinary not configured on server' });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    // Parameters to sign (must match what is sent to Cloudinary)
    // We can enforce specific folders or transform options here if we want stricter security
    const paramsToSign = {
      timestamp: timestamp,
      // upload_preset: 'ml_default' // If using signed preset, include it here
    };

    // Construct signature string: key=value&key=value... + secret
    // Note: Cloudinary requires parameters to be sorted alphabetically by key
    const signatureString = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    res.json({
      signature,
      timestamp,
      api_key: CLOUDINARY_API_KEY,
      cloud_name: CLOUDINARY_CLOUD_NAME
    });

  } catch (error) {
    console.error('Signature generation error:', error);
    res.status(500).json({ error: 'Internal signature error' });
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
