import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname, '..', 'public', 'screenshots');

const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const inp = path.join(dir, f);
  const out = path.join(dir, f.replace(/\.(jpe?g|png)$/i, '.webp'));
  if (fs.existsSync(out)) continue;
  await sharp(inp).webp({ quality: 82, effort: 4 }).toFile(out);
  console.log('wrote', path.basename(out), fs.statSync(out).size, 'bytes');
}
console.log('DONE: generated webp variants for', files.length, 'screenshots');
