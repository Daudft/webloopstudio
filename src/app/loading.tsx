import Image from 'next/image';

/** Route-transition loading state, in the site's ink-and-white look. */
export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ink text-white" role="status" aria-label="Loading">
      <div className="flex w-[min(420px,calc(100vw-48px))] flex-col items-center">
        <Image
          src="/WEBLOOP.png"
          alt="Webloop Studio"
          width={3731}
          height={623}
          sizes="420px"
          // The wordmark PNG is navy; render it white on the dark background.
          className="h-auto w-full brightness-0 invert animate-[loader-mark_1.8s_ease-in-out_infinite]"
        />
        <div className="mt-8 h-[2px] w-40 overflow-hidden bg-white/10">
          <div className="h-full w-1/3 bg-white animate-[loader-line_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
