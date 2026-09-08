export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eaf2ff] text-[#0b234e]">
      <div className="flex w-[min(420px,calc(100vw-48px))] flex-col items-center">
        <img
          src="/WEBLOOP.png"
          alt="WEBLOOP"
          className="h-auto w-full animate-[loader-mark_1.8s_ease-in-out_infinite]"
        />
        <div className="mt-8 h-[2px] w-40 overflow-hidden bg-[#0b234e]/10">
          <div className="h-full w-1/3 bg-[#0b234e] animate-[loader-line_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
