'use client';

/**
 * Last-resort error boundary. It replaces the root layout, so global CSS may
 * not be loaded. Styles are inline on purpose.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '24px',
          background: '#eaf2ff',
          color: '#0A1F44',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.6 }}>
            Something broke
          </p>
          <h1 style={{ margin: '20px 0 0', fontSize: 'clamp(2rem, 7vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.05em', fontWeight: 800 }}>
            The site hit an error.
          </h1>
          <p style={{ margin: '28px 0 0', fontSize: 15, lineHeight: 1.55, color: '#52627a' }}>
            Reload the page to try again. If it keeps happening, please email us.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 36,
              height: 56,
              padding: '0 28px',
              border: 0,
              borderRadius: 3,
              background: '#0A1F44',
              color: '#eaf2ff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
