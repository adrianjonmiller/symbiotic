#!/usr/bin/env node

import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const sourceFile = join(projectRoot, 'dist', 'symbiote.iife.js');
const targetFile = join(projectRoot, 'test', 'symbiote.iife.js');

try {
    copyFileSync(sourceFile, targetFile);
    console.log('✅ Updated test/symbiote.iife.js with latest build');
} catch (error) {
    console.error('❌ Failed to update test file:', error.message);
    console.log('💡 Make sure you have run "npm run build" first');
    process.exit(1);
}
