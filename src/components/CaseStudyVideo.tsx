import type { CaseStudyVideoSource } from "@/data/caseStudies";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";

type Props = {
  sources: CaseStudyVideoSource[];
  poster?: string;
  ariaLabel?: string;
};

export default function CaseStudyVideo({
  sources,
  poster,
  ariaLabel = "Project video",
}: Props) {
  const { videoRef, isPlaying, syncPlaying, playWithSound, togglePlayback } =
    useVideoPlayback();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] ring-1 ring-white/[0.04]">
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          loop
          playsInline
          preload="metadata"
          muted={false}
          poster={poster}
          onPlay={syncPlaying}
          onPause={syncPlaying}
          onClick={togglePlayback}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              void togglePlayback();
            }
          }}
          tabIndex={0}
          aria-label={ariaLabel}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 z-[21] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void playWithSound();
              }}
              className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/18 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36f2b0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:h-[88px] md:w-[88px]"
              aria-label="Play video with sound"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-1 text-white drop-shadow-sm md:h-[34px] md:w-[34px]"
                aria-hidden
              >
                <path
                  d="M8 5.14v13.72c0 .89 1.08 1.34 1.71.71l8.49-6.86a1 1 0 0 0 0-1.56L9.71 4.43C9.08 3.8 8 4.25 8 5.14Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-black/15"
          aria-hidden
        />
      </div>
    </div>
  );
}
