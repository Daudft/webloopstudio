import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="text-center space-y-6 max-w-lg mx-auto">
        <div className="h-20 w-20 rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
          <Compass className="h-10 w-10 animate-pulse" />
        </div>
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-muted-foreground text-sm">
          The page or digital case study you are looking for might have been relocated, redesigned, or does not exist.
        </p>
        <div className="pt-4">
          <Link href="/" className={buttonClasses()}>
            <ArrowLeft className="h-4 w-4" />
            Return to Studio Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
