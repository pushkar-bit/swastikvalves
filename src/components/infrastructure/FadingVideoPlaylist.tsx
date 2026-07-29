"use client";

import { useEffect, useRef } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before the clip ends to start fading out

interface FadingVideoPlaylistProps {
  /** Clips played in this exact order, looping back to the first once the last ends. */
  sources: string[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Plays a sequence of clips back to back with a JS-driven opacity crossfade —
 * no CSS transition — so a fade-out and the next clip's fade-in never fight
 * over the same property. `loop` is intentionally left off the <video>; the
 * "ended" handler advances the playlist manually.
 */
export default function FadingVideoPlaylist({
  sources,
  className,
  style,
}: FadingVideoPlaylistProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || sources.length === 0) return;

    const fadeTo = (target: number, duration: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      const start = parseFloat(video.style.opacity || "0");
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        video.style.opacity = String(start + (target - start) * t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => {
        // Autoplay can be blocked before the first user gesture; the poster
        // frame stays visible and playback resumes on the next load event.
      });
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % sources.length;
        video.src = sources[indexRef.current];
        fadingOutRef.current = false;
        video.load();
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    video.src = sources[indexRef.current];
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // sources is treated as a stable playlist for the life of this instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
