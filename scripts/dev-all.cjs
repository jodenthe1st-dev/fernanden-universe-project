#!/usr/bin/env node

const { spawn } = require('child_process');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

const procs = [];

const isLan = process.argv.includes('--lan');
const frontendArgs = isLan
  ? ['run', 'dev:lan']
  : ['run', 'dev'];

function run(name, cmd, args) {
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    shell: isWindows,
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`[${name}] exited with signal ${signal}`);
    } else {
      console.log(`[${name}] exited with code ${code}`);
    }
    shutdown(code || 0);
  });

  child.on('error', (err) => {
    console.error(`[${name}] failed to start:`, err.message);
    shutdown(1);
  });

  procs.push(child);
}

function shutdown(code) {
  while (procs.length) {
    const p = procs.pop();
    if (p && !p.killed) {
      try {
        p.kill('SIGTERM');
      } catch (_) {}
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('frontend', npmCmd, frontendArgs);
run('api', 'node', ['start-server.cjs']);
