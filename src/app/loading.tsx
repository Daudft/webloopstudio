import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ice text-navy" role="status" aria-label="Loading">
      <div className="flex w-[min(420px,calc(100vw-48px))] flex-col items-center">
        <Image
          src="/WEBLOOP.png"
          alt="WEBLOOP"
          width={3731}
          height={623}
          sizes="420px"
          className="h-auto w-full animate-[loader-mark_1.8s_ease-in-out_infinite]"
        />
        <div className="mt-8 h-[2px] w-40 overflow-hidden bg-navy/10">
          <div className="h-full w-1/3 bg-navy animate-[loader-line_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
