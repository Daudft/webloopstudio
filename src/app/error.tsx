'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Error Caught]:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="text-center space-y-6 max-w-md mx-auto glass-panel p-8 rounded-3xl border border-red-500/30">
        <div className="h-16 w-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred while rendering this view. Our engineering team has been notified.
        </p>
        <Button
          variant="glow"
          onClick={() => reset()}
          className="rounded-full gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
