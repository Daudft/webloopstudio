/**
 * One-off asset pipeline. Run with `node scripts/optimize-images.mjs`.
 *
 * - Re-encodes oversized source photos into sensible web sizes.
 * - Rasterises src/app/icon.svg into the PNG icons the manifest and
 *   Apple devices expect.
 *
 * Add new source photos to `photos` and re-run. Safe to run repeatedly.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const photos = [
  {
    src: 'public/IMG_20230423_200749.jpg.jpeg',
    out: 'public/images/founder.jpg',
    width: 1200,
    height: 1600,
  },
  { src: 'public/ist.jpg', out: 'public/images/work-01.jpg', width: 1600 },
  { src: 'public/second.jpg', out: 'public/images/work-02.jpg', width: 1600 },
];

const icons = [
  { out: 'src/app/apple-icon.png', size: 180 },
  { out: 'public/icons/icon-192.png', size: 192 },
  { out: 'public/icons/icon-512.png', size: 512 },
];

await mkdir(join(root, 'public/images'), { recursive: true });
await mkdir(join(root, 'public/icons'), { recursive: true });

for (const photo of photos) {
  const src = join(root, photo.src);
  if (!existsSync(src)) {
    console.warn(`skip (missing): ${photo.src}`);
    continue;
  }

  const info = await sharp(src)
    .rotate() // honour EXIF orientation, then strip it
    .resize({ width: photo.width, height: photo.height, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(root, photo.out));

  console.log(`${photo.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

const svg = await readFile(join(root, 'src/app/icon.svg'));
for (const icon of icons) {
  const info = await sharp(svg, { density: 512 }).resize(icon.size, icon.size).png().toFile(join(root, icon.out));
  console.log(`${icon.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
