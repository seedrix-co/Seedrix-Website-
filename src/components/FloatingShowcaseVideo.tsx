import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const THUMB_AT_SEC = 1;

/** Paused frame at 1s as thumbnail; hover plays from start with sound. */
export default function FloatingShowcaseVideo({
  src,
  title,
  className,
  videoClassName,
  /** Lets parent wrappers (e.g. draggable tiles) receive pointer events. Default true. */
  pointerEventsNoneOnVideo = true,
}: {
  src: string;
  title: string;
  className?: string;
  videoClassName?: string;
  pointerEventsNoneOnVideo?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setHover(false);
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;

    const seekToThumbnail = () => {
      if (cancelled) return;
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      const t = dur > THUMB_AT_SEC ? THUMB_AT_SEC : Math.max(0, dur * 0.25);
      const capped = Math.min(t, Math.max(0, dur - 0.04));

      const finish = () => {
        if (!cancelled) v.pause();
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
    };

    const apply = () => {
      if (cancelled) return;
      if (hover) {
        v.muted = false;
        v.volume = 1;
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        void v.play().catch(() => {});
      } else {
        v.muted = true;
        v.pause();
        seekToThumbnail();
      }
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
  }, [src, hover]);

  return (
    <div
      role="group"
      aria-label={title}
      className={cn("relative min-h-0 overflow-hidden", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        className={cn(
          "h-full w-full object-contain transition-transform duration-500 ease-out",
          pointerEventsNoneOnVideo && "pointer-events-none",
          hover && "scale-[1.02]",
          videoClassName,
        )}
        loop
        playsInline
        preload="auto"
        muted={!hover}
      >
        <source src={src} type="video/webm" />
      </video>
    </div>
  );
}
