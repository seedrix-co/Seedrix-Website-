import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import {
  LATEST_PROJECT,
  LATEST_PROJECT_VIDEO_SRC,
  SHOWREEL_VIDEO_SRC,
} from "@/data/featuredVideo";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import { fadeUpVariant, viewportRevealEarly } from "@/lib/motion";

/** Paused preview frame (seconds); avoids a black or junk first frame at t=0. */
const PREVIEW_TIME = 0.12;

type LatestProjectVideoProps = {
  /** Omit outer section chrome when nested inside Work showcase tabs. */
  embedded?: boolean;
};

export default function LatestProjectVideo({ embedded = false }: LatestProjectVideoProps = {}) {
  const { videoRef, isPlaying, syncPlaying, playWithSound, togglePlayback } =
    useVideoPlayback();
  const hasStartedPlayback = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      const d = v.duration;
      const t = Number.isFinite(d)
        ? Math.min(PREVIEW_TIME, Math.max(0, d - 0.05))
        : PREVIEW_TIME;
      v.currentTime = t;
    };
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [videoRef]);

  const ensurePlayFromStart = useCallback(() => {
    const v = videoRef.current;
    if (!v || hasStartedPlayback.current) return;
    hasStartedPlayback.current = true;
    v.currentTime = 0;
  }, [videoRef]);

  const playWithSoundFromStart = useCallback(async () => {
    ensurePlayFromStart();
    await playWithSound();
  }, [ensurePlayFromStart, playWithSound]);

  const togglePlaybackFromStart = useCallback(async () => {
    const v = videoRef.current;
    if (v?.paused) ensurePlayFromStart();
    await togglePlayback();
  }, [ensurePlayFromStart, togglePlayback, videoRef]);

  const content = (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRevealEarly}
        variants={fadeUpVariant}
        className="mb-10 md:mb-12"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#36f2b0]">
          {LATEST_PROJECT.eyebrow}
        </p>
        <h2 className="mb-4 font-display text-3xl uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
          {LATEST_PROJECT.title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {LATEST_PROJECT.description}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRevealEarly}
        variants={fadeUpVariant}
        className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_64px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.04]"
      >
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            loop
            playsInline
            preload="metadata"
            muted={false}
            onPlay={syncPlaying}
            onPause={syncPlaying}
            onClick={togglePlaybackFromStart}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                void togglePlaybackFromStart();
              }
            }}
            tabIndex={0}
          >
            <source src={LATEST_PROJECT_VIDEO_SRC} type="video/webm" />
            <source src={SHOWREEL_VIDEO_SRC} type="video/mp4" />
          </video>

          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 z-[21] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void playWithSoundFromStart();
                }}
                className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/18 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36f2b0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:h-[88px] md:w-[88px]"
                aria-label="Play latest project video with sound"
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
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/20"
            aria-hidden
          />
        </div>
      </motion.div>
    </>
  );

  if (embedded) {
    return <div className="w-full max-w-[1400px]">{content}</div>;
  }

  const shellClass = "container mx-auto max-w-[1400px] px-6";

  return (
    <section className="border-t border-white/5 bg-black py-16 md:py-24">
      <div className={shellClass}>{content}</div>
    </section>
  );
}
