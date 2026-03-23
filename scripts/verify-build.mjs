import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('dist/myAgentWebview');
const bundleFile = path.join(outputDir, 'index.js');

if (!fs.existsSync(outputDir)) {
  console.error(`Missing output directory: ${outputDir}`);
  process.exit(1);
}

if (!fs.existsSync(bundleFile)) {
  console.error(`Missing bundle file: ${bundleFile}`);
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(outputDir)
  .filter((file) => file.endsWith('.html'));

if (htmlFiles.length > 0) {
  console.error(`Unexpected HTML output found: ${htmlFiles.join(', ')}`);
  process.exit(1);
}

const stats = fs.statSync(bundleFile);
if (stats.size <= 0) {
  console.error('Bundle file is empty.');
  process.exit(1);
}

console.log('Verification passed: component bundle exists and no HTML was emitted.');
