const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { writeFile, mkdir, unlink } = require('fs').promises;
const { join, resolve } = require('path');
const { existsSync } = require('fs');
const path = require('path');
const crypto = require('crypto');

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

// Gestion des erreurs 404
app.use('*', (req, res) => {
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
