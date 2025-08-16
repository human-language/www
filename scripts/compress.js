#!/usr/bin/env node

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';
import { gzipSync } from 'zlib';
import { compress as brotliCompress } from 'brotli';

const DIST_DIR = './dist';
const COMPRESSIBLE_EXTENSIONS = ['.html', '.css', '.js', '.json', '.xml', '.svg', '.txt'];

async function compressFile(filePath) {
  try {
    const content = await readFile(filePath);
    const stats = await stat(filePath);
    
    // Skip if file is too small (< 1KB)
    if (stats.size < 1024) return;
    
    // Gzip compression
    const gzipped = gzipSync(content, { level: 9 });
    await writeFile(`${filePath}.gz`, gzipped);
    
    // Brotli compression
    const brotlied = Buffer.from(brotliCompress(content, {
      mode: 1, // BROTLI_MODE_TEXT
      quality: 11, // Maximum compression
      lgwin: 22
    }));
    await writeFile(`${filePath}.br`, brotlied);
    
    const gzipRatio = ((1 - gzipped.length / stats.size) * 100).toFixed(1);
    const brotliRatio = ((1 - brotlied.length / stats.size) * 100).toFixed(1);
    
    console.log(`✓ ${filePath}`);
    console.log(`  Gzip: ${gzipRatio}% reduction (${stats.size} → ${gzipped.length} bytes)`);
    console.log(`  Brotli: ${brotliRatio}% reduction (${stats.size} → ${brotlied.length} bytes)`);
  } catch (error) {
    console.error(`✗ Error compressing ${filePath}:`, error.message);
  }
}

async function* walkDir(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = join(dir, file.name);
    
    if (file.isDirectory()) {
      yield* walkDir(filePath);
    } else if (COMPRESSIBLE_EXTENSIONS.some(ext => file.name.endsWith(ext))) {
      yield filePath;
    }
  }
}

async function main() {
  console.log('🗜️  Compressing build output...\n');
  
  let fileCount = 0;
  for await (const filePath of walkDir(DIST_DIR)) {
    await compressFile(filePath);
    fileCount++;
  }
  
  console.log(`\n✅ Compressed ${fileCount} files`);
}

main().catch(console.error);
