import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CONTENT_SOCIAL_VIDEOS,
  contentSocialSrc,
  type ShowcaseVideoItem,
} from "@/data/showcaseVideos";
import { cn } from "@/lib/utils";

const AUTO_MS = 6000;
const CARD_WIDTH_FRAC = 0.78;
const GAP_PX = 20;
const THUMB_AT_SEC = 1;

const SLIDE_TRANSITION = { duration: 0.72, ease: [0.25, 0.1, 0.25, 1] as const };
/** Velocity (px/s) past which we advance slides on release. */
const DRAG_VELOCITY_THRESHOLD = 520;

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" aria-hidden fill="currentColor">
      <path d="m21.7334 36.67h2.5342c1.1483 0 1.7324-.5796 1.7324-1.7193v-13.9015c0-1.12-.5841-1.6898-1.7324-1.7193h-2.5342c-1.1483 0-1.7324.5698-1.7324 1.7193v13.9015c-.0297 1.1396.5544 1.7193 1.7324 1.7193zm9.9992 0h2.5347c1.1485 0 1.7327-.5796 1.7327-1.7193v-13.9015c0-1.12-.5842-1.7193-1.7327-1.7193h-2.5347c-1.1485 0-1.7327.5698-1.7327 1.7193v13.9015c0 1.1396.5545 1.7193 1.7327 1.7193z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" aria-hidden fill="currentColor">
      <path d="m23.7555 36.6237c.4478 0 .8598-.1343 1.4241-.4568l10.9178-6.3322c.8598-.5016 1.3614-1.021 1.3614-1.8361 0-.8061-.5016-1.3255-1.3614-1.8271l-10.9178-6.3322c-.5643-.3314-.9762-.4657-1.4241-.4657-.9315 0-1.7555.7165-1.7555 1.9435v13.3629c0 1.227.824 1.9435 1.7555 1.9435z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 6l6 6-6 6" />
    </svg>
  );
}

/** Bold lead + body, similar to apple.com/vision-pro feature captions. */
function captionParts(title: string): { lead: string; rest: string } {
  const comma = title.indexOf(",");
  if (comma > 0 && comma < title.length - 2) {
    return { lead: title.slice(0, comma + 1).trim(), rest: title.slice(comma + 1).trim() };
  }
  const words = title.trim().split(/\s+/);
  if (words.length > 5) {
    return { lead: words.slice(0, 4).join(" "), rest: words.slice(4).join(" ") };
  }
  return { lead: title, rest: "" };
}

/**
 * Landscape video: thumbnail at 1s when paused; play/pause on the media.
 * While playing: unmuted audio for the full mix (no hover required).
 */
function VisionCarouselMedia({
  src,
  title,
  onUserPlayingChange,
}: {
  src: string;
  title: string;
  onUserPlayingChange?: (playing: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPlaying, setUserPlaying] = useState(false);

  useEffect(() => {
    setUserPlaying((was) => {
      if (was) onUserPlayingChange?.(false);
      return false;
    });
  }, [src, onUserPlayingChange]);

  const seekToThumbnail = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const dur = v.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    const t = dur > THUMB_AT_SEC ? THUMB_AT_SEC : Math.max(0, dur * 0.25);
    const capped = Math.min(t, Math.max(0, dur - 0.04));

    const finish = () => {
      v.pause();
    };

    if (Math.abs(v.currentTime - capped) < 0.06) {
      finish();
      return;
    }

    const onSeeked = () => {
      finish();
      v.removeEventListener("seeked", onSeeked);
    };
    v.addEventListener("seeked", onSeeked, { once: true });
    try {
      v.currentTime = capped;
    } catch {
      finish();
      v.removeEventListener("seeked", onSeeked);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;

    const apply = () => {
      if (cancelled) return;
      if (!userPlaying) {
        v.muted = true;
        v.pause();
        seekToThumbnail();
        return;
      }
      v.muted = false;
      v.volume = 1;
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
      void v.play().catch(() => {});
    };

    if (v.readyState >= HTMLMediaElement.HAVE_METADATA) {
      apply();
    } else {
      v.addEventListener("loadedmetadata", apply, { once: true });
    }

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", apply);
    };
  }, [src, userPlaying, seekToThumbnail]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-black md:rounded-[24px]">
      <video
        ref={videoRef}
        className={cn(
          "h-full w-full object-contain transition-transform duration-500 ease-out",
          userPlaying && "scale-[1.01]",
        )}
        loop
        playsInline
        preload="auto"
        muted={!userPlaying}
      >
        <source src={src} type="video/webm" />
      </video>

      <button
        type="button"
        className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#45d9a3]/60 md:bottom-5 md:right-5"
        aria-label={userPlaying ? `Pause ${title}` : `Play ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          setUserPlaying((p) => {
            const next = !p;
            onUserPlayingChange?.(next);
            return next;
          });
        }}
      >
        {userPlaying ? (
          <PauseIcon className="h-[22px] w-[22px]" />
        ) : (
          <PlayIcon className="h-[22px] w-[22px] translate-x-px" />
        )}
      </button>
    </div>
  );
}

function VisionCarouselCard({
  item,
  cardWidthPx,
  isActive,
  onUserPlayingChange,
}: {
  item: ShowcaseVideoItem;
  cardWidthPx: number;
  isActive: boolean;
  onUserPlayingChange?: (playing: boolean) => void;
}) {
  const src = contentSocialSrc(item);
  const { lead: fallbackLead, rest: fallbackRest } = captionParts(item.title);
  const displayLead = item.captionLead ?? fallbackLead;
  const paragraphs = item.captionBody
    ? item.captionBody
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : null;

  return (
    <article
      className="shrink-0"
      style={cardWidthPx > 0 ? { width: cardWidthPx } : { width: "min(78vw, 880px)" }}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="flex w-full flex-col gap-5 md:gap-6">
        <VisionCarouselMedia
          src={src}
          title={item.title}
          onUserPlayingChange={onUserPlayingChange}
        />
        <div className="case-studies-font max-w-full px-0.5 text-left">
          {paragraphs && paragraphs.length > 0 ? (
            <div className="flex max-w-[min(100%,52rem)] flex-col gap-3 md:gap-4">
              <p className="text-[15px] font-semibold leading-snug tracking-tight text-white md:text-[17px] md:leading-snug">
                {displayLead}
              </p>
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] font-normal leading-relaxed tracking-tight text-[#A1A1A1] md:text-[17px]"
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[15px] font-normal leading-snug tracking-tight text-[#A1A1A1] md:text-[17px] md:leading-relaxed">
              <span className="font-semibold text-white">{displayLead}</span>
              {fallbackRest ? <> {fallbackRest}</> : null}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ContentSocialGallery() {
  const items = CONTENT_SOCIAL_VIDEOS;
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [anyClipPlaying, setAnyClipPlaying] = useState(false);
  const clipPlayingCountRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(0);
  const reduceMotion = useReducedMotion();

  const onClipPlayingChange = useCallback((playing: boolean) => {
    clipPlayingCountRef.current += playing ? 1 : -1;
    if (clipPlayingCountRef.current < 0) clipPlayingCountRef.current = 0;
    setAnyClipPlaying(clipPlayingCountRef.current > 0);
  }, []);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardW = viewportW > 0 ? Math.round(viewportW * CARD_WIDTH_FRAC) : 0;
  const trackX =
    viewportW > 0 && cardW > 0
      ? viewportW / 2 - index * (cardW + GAP_PX) - cardW / 2
      : 0;

  const safeIndex = Math.min(index, Math.max(0, n - 1));

  useEffect(() => {
    setProgressEpoch((e) => e + 1);
  }, [safeIndex]);

  useEffect(() => {
    if (!autoPlaying || n <= 1) return;
    const id = window.setInterval(() => {
      if (clipPlayingCountRef.current > 0) return;
      setIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [autoPlaying, n]);

  const prevAnyClip = useRef(false);
  useEffect(() => {
    if (prevAnyClip.current && !anyClipPlaying) {
      setProgressEpoch((e) => e + 1);
    }
    prevAnyClip.current = anyClipPlaying;
  }, [anyClipPlaying]);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragActiveRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragPointerIdRef = useRef<number | null>(null);
  const lastSampleRef = useRef({ x: 0, t: 0 });
  const velocityRef = useRef(0);
  const cardWRef = useRef(0);
  cardWRef.current = cardW;

  const onDragPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (n <= 1 || e.button !== 0) return;
      if (dragPointerIdRef.current !== null) return;
      if ((e.target as HTMLElement).closest("button")) return;
      dragActiveRef.current = true;
      setIsDragging(true);
      dragPointerIdRef.current = e.pointerId;
      dragStartXRef.current = e.clientX;
      setDragOffset(0);
      lastSampleRef.current = { x: e.clientX, t: performance.now() };
      velocityRef.current = 0;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    },
    [n],
  );

  const onDragPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current || e.pointerId !== dragPointerIdRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    setDragOffset(dx);
    const now = performance.now();
    const dt = now - lastSampleRef.current.t;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastSampleRef.current.x) / dt) * 1000;
    }
    lastSampleRef.current = { x: e.clientX, t: now };
    if (e.pointerType === "touch") e.preventDefault();
  }, []);

  const onDragPointerEnd = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerId !== dragPointerIdRef.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      dragPointerIdRef.current = null;
      if (!dragActiveRef.current) return;
      dragActiveRef.current = false;

      const dx = e.clientX - dragStartXRef.current;
      const v = velocityRef.current;
      const cw = cardWRef.current || 200;
      const threshold = Math.min(80, Math.max(44, cw * 0.14));

      setIsDragging(false);
      setDragOffset(0);

      let delta = 0;
      if (dx < -threshold || v < -DRAG_VELOCITY_THRESHOLD) delta = 1;
      else if (dx > threshold || v > DRAG_VELOCITY_THRESHOLD) delta = -1;
      if (delta !== 0) {
        setIndex((i) => Math.max(0, Math.min(n - 1, i + delta)));
      }
    },
    [n],
  );

  if (n === 0) return null;

  return (
    <div className="relative w-full">
      {/* Global auto-advance control, top right of gallery block */}
      <div className="relative mx-auto mb-6 flex max-w-[1400px] justify-end px-1 md:mb-8">
        <button
          type="button"
          className="case-studies-font flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.12] text-white backdrop-blur-md ring-1 ring-white/[0.14] transition hover:bg-white/[0.18] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#45d9a3]/50"
          aria-label={autoPlaying ? "Pause slideshow" : "Play slideshow"}
          onClick={() => {
            setAutoPlaying((p) => {
              const next = !p;
              if (next) setProgressEpoch((e) => e + 1);
              return next;
            });
          }}
        >
          {autoPlaying ? (
            <PauseIcon className="h-[22px] w-[22px]" />
          ) : (
            <PlayIcon className="h-[22px] w-[22px] translate-x-px" />
          )}
        </button>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "relative w-full overflow-hidden select-none",
          n > 1 && "cursor-grab touch-none active:cursor-grabbing",
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label="Content and social video gallery"
        onPointerDown={onDragPointerDown}
        onPointerMove={onDragPointerMove}
        onPointerUp={onDragPointerEnd}
        onPointerCancel={onDragPointerEnd}
      >
        <motion.div
          className="flex"
          style={{ gap: GAP_PX }}
          animate={{ x: trackX + dragOffset }}
          transition={isDragging || reduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
        >
          {items.map((item, i) => (
            <VisionCarouselCard
              key={item.file}
              item={item}
              cardWidthPx={cardW}
              isActive={i === safeIndex}
              onUserPlayingChange={onClipPlayingChange}
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-8 grid max-w-[1400px] grid-cols-1 items-center gap-4 px-1 sm:grid-cols-[1fr_auto_1fr] md:mt-10">
        <div className="hidden sm:block" aria-hidden />

        <div
          className="flex flex-wrap justify-center gap-2 sm:justify-center md:gap-2.5"
          role="tablist"
          aria-label="Slide indicators"
        >
          {items.map((_, i) => {
            const active = i === safeIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                className={cn(
                  "relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300",
                  active ? "w-8 bg-white/25" : "w-2 bg-white/18 hover:bg-white/28",
                )}
                onClick={() => setIndex(i)}
              >
                {active && autoPlaying && !anyClipPlaying && (
                  <span
                    key={`${safeIndex}-${progressEpoch}`}
                    className="cs-dot-progress-fill absolute inset-0 origin-left rounded-full bg-white/90"
                    style={{ "--cs-dot-duration": `${AUTO_MS}ms` } as CSSProperties}
                  />
                )}
              </button>
            );
          })}
        </div>

        {n > 1 ? (
          <div className="flex justify-center gap-2 sm:justify-end">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-white/12 transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#45d9a3]/50"
              aria-label="Previous video"
              onClick={() => setIndex((i) => (i - 1 + n) % n)}
            >
              <ChevronLeftIcon className="h-5 w-5 -translate-x-px opacity-90" />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-white/12 transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#45d9a3]/50"
              aria-label="Next video"
              onClick={() => setIndex((i) => (i + 1) % n)}
            >
              <ChevronRightIcon className="h-5 w-5 translate-x-px opacity-90" />
            </button>
          </div>
        ) : (
          <div className="hidden sm:block" aria-hidden />
        )}
      </div>
    </div>
  );
}
