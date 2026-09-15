import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const wordmark = await readFile(join(process.cwd(), 'public', 'WEBLOOP.png'));
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString('base64')}`;

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
          background: '#eaf2ff',
          color: '#0A1F44',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6 }}>
          Studio
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmarkSrc} width={1056} height={176} alt="" />
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, opacity: 0.85 }}>{siteConfig.tagline}</div>
      </div>
    ),
    size
  );
}
