#!/usr/bin/env node

// Load .env.local file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
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

// Start server
require('./api-server.cjs');
