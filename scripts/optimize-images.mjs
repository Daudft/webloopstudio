/**
 * One-off asset pipeline. Run with `node scripts/optimize-images.mjs`.
 *
 * - Re-encodes oversized source photos into sensible web sizes.
 * - Rasterises src/app/icon.svg into the PNG icons the manifest and
 *   Apple devices expect, plus a multi-size src/app/favicon.ico (16/32/48)
 *   for browsers and tools that only look for /favicon.ico.
 *
 * Add new source photos to `photos` and re-run. Safe to run repeatedly.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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

/**
 * Images already in public/ that are recompressed in place: capped width, EXIF stripped,
 * mozjpeg. A file is only overwritten when the result is smaller. next/image then serves
 * AVIF/WebP at the right size per device, so these are just the high-quality sources.
 */
const inPlace = [
  { file: 'public/images/work-01.jpg', width: 1600 },
  { file: 'public/images/work-02.jpg', width: 1600 },
  { file: 'public/services/ai-automation.jpg', width: 1200 },
  { file: 'public/services/branding-identity.jpg', width: 1200 },
  { file: 'public/services/cloud-devops.jpg', width: 1200 },
  { file: 'public/services/mobile-apps.jpg', width: 1200 },
  { file: 'public/services/ui-ux-design.jpg', width: 1200 },
  { file: 'public/services/web-development.jpg', width: 1200 },
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

for (const image of inPlace) {
  const path = join(root, image.file);
  if (!existsSync(path)) {
    console.warn(`skip (missing): ${image.file}`);
    continue;
  }

  // Read into memory first: sharp can't write to the file it is reading from.
  const original = await readFile(path);
  const output = await sharp(original)
    .rotate()
    .resize({ width: image.width, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer({ resolveWithObject: true });

  const before = (original.length / 1024).toFixed(0);
  if (output.data.length < original.length) {
    await writeFile(path, output.data);
    const after = (output.data.length / 1024).toFixed(0);
    console.log(`${image.file}  ${output.info.width}x${output.info.height}  ${before} KB -> ${after} KB`);
  } else {
    console.log(`${image.file}  already optimal (${before} KB), kept`);
  }
}

const svg = await readFile(join(root, 'src/app/icon.svg'));
for (const icon of icons) {
  const info = await sharp(svg, { density: 512 }).resize(icon.size, icon.size).png().toFile(join(root, icon.out));
  console.log(`${icon.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// favicon.ico: an ICO container holding PNG-encoded 16, 32 and 48px images
// (PNG entries inside ICO are supported by every current browser and Windows).
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((size) => sharp(svg, { density: 512 }).resize(size, size).png().toBuffer())
);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4); // image count
const entries = [];
let offset = 6 + 16 * pngs.length;
pngs.forEach((png, index) => {
  const size = icoSizes[index];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0); // width
  entry.writeUInt8(size, 1); // height
  entry.writeUInt8(0, 2); // palette colours (0 = none)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image data size
  entry.writeUInt32LE(offset, 12); // image data offset
  offset += png.length;
  entries.push(entry);
});
const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(join(root, 'src/app/favicon.ico'), ico);
console.log(`src/app/favicon.ico  ${icoSizes.join('/')}px  ${(ico.length / 1024).toFixed(1)} KB`);
