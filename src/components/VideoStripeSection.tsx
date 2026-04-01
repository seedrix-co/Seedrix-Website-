import { SHOWREEL_VIDEO_SRC } from "@/data/featuredVideo";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";

export default function VideoStripeSection() {
  const { videoRef, isPlaying, syncPlaying, playWithSound, togglePlayback } =
    useVideoPlayback();

  return (
    <section className="relative w-full bg-black" aria-label="Featured video">
      <div className="relative flex h-[100svh] w-full flex-col">
        <div className="h-[17.5svh] shrink-0 bg-black" aria-hidden />
        <div className="relative h-[65svh] w-full shrink-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            loop
            playsInline
            preload="metadata"
            muted={false}
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
          >
            <source src={SHOWREEL_VIDEO_SRC} type="video/mp4" />
          </video>

          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 z-[21] flex items-center justify-center bg-black/25 backdrop-blur-[1px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void playWithSound();
                }}
                className="pointer-events-auto flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/25 bg-white/18 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Play video with sound"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1 text-white drop-shadow-sm"
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
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-transparent to-black/35"
            aria-hidden
          />
        </div>
        <div className="h-[17.5svh] shrink-0 bg-black" aria-hidden />
      </div>
    </section>
  );
}
