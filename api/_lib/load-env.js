import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

let loaded = false;

function isHostedVercelRuntime() {
  // In local `vercel dev`, VERCEL can be set with VERCEL_ENV=development.
  // We only skip local file loading for hosted preview/production runtimes.
  return process.env.VERCEL === '1' && ['preview', 'production'].includes(process.env.VERCEL_ENV || '');
}

export function ensureEnvLoaded() {
  if (loaded) return;
  loaded = true;

  if (isHostedVercelRuntime()) return;

  const currentFile = fileURLToPath(import.meta.url);
  const libDir = path.dirname(currentFile);
  const projectRoot = path.resolve(libDir, '..', '..');

  const candidates = [
    path.join(projectRoot, '.env.local'),
    path.join(projectRoot, '.env'),
    path.join(projectRoot, 'api', '.env.local'),
    path.join(projectRoot, 'api', '.env'),
  ];

  for (const envPath of candidates) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: true });
    }
  }
}
