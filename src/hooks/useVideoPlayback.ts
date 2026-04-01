import { useCallback, useRef, useState } from "react";

/** Play / pause with sound after user gesture (browser autoplay rules). */
export function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const syncPlaying = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsPlaying(!v.paused);
  }, []);

  const playWithSound = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      try {
        await v.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  return {
    videoRef,
    isPlaying,
    syncPlaying,
    playWithSound,
    togglePlayback,
  };
}
