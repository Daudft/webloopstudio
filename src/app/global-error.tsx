'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl font-black text-white">Critical Application Error</h1>
          <p className="text-sm text-slate-400">
            A fatal error occurred. Please refresh the page or try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
