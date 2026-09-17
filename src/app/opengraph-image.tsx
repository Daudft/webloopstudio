import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { siteConfig } from '@/config/site';

// Social preview (Facebook, LinkedIn, X, WhatsApp, Slack). Generated once at build time and served
// at /opengraph-image; Next adds og:image and twitter:image tags for every page automatically.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // The wordmark PNG is navy on transparent; recolour it white for the dark card
  // by filling white through the wordmark's alpha channel.
  const wordmark = await readFile(join(process.cwd(), 'public', 'WEBLOOP.png'));
  const { width, height } = await sharp(wordmark).metadata();
  const whiteWordmark = await sharp({
    create: { width: width ?? 3731, height: height ?? 623, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: wordmark, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const wordmarkSrc = `data:image/png;base64,${whiteWordmark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#131315',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: 'rgba(255,255,255,0.45)' }} />
          Studio
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmarkSrc} width={1056} height={176} alt="" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', maxWidth: 760, fontSize: 34, fontWeight: 600, lineHeight: 1.25, opacity: 0.85 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, opacity: 0.55 }}>
            {siteConfig.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    ),
    size
  );
}
