import React, { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoFiles: string[];
  isActive: boolean;
  baseImage?: string;
  targetOpacity?: number;
  playbackRate?: number;
  crossfadeSeconds?: number;
  muted?: boolean;
  pauseBetweenVideos?: number;
  brightness?: number;
}

export function VideoBackground({
  videoFiles,
  isActive,
  baseImage,
  targetOpacity = 0.35,
  playbackRate = 0.9,
  crossfadeSeconds = 1.2,
  muted = true,
  pauseBetweenVideos = 3,
  brightness = 0.7,
}: VideoBackgroundProps) {
  const videoRefs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)];
  const front = useRef(0);
  const fadeTimeoutRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  const playVideo = (currentIndex: number) => {
    if (!videoFiles.length) return;
    const frontIdx = front.current;
    const backIdx = 1 - frontIdx;
    const frontEl = videoRefs[frontIdx].current;
    const backEl = videoRefs[backIdx].current;

    if (!frontEl || !backEl) return;

    // load front
    frontEl.src = videoFiles[currentIndex];
    frontEl.currentTime = 0;
    frontEl.playbackRate = playbackRate;
    frontEl.muted = muted;
    frontEl.loop = false;
    frontEl.style.transition = `opacity ${crossfadeSeconds}s ease`;
    frontEl.style.opacity = String(targetOpacity);

    // preload next in back
    const nextIndex = (currentIndex + 1) % videoFiles.length;
    backEl.src = videoFiles[nextIndex];
    backEl.load();
    backEl.style.transition = `opacity ${crossfadeSeconds}s ease`;
    backEl.style.opacity = "0";

    const startFront = async () => {
      try { await frontEl.play(); } catch {}
    };
    startFront();

    const handleEnded = () => {
      const duration = frontEl.duration || 0;
      const fadeTime = Math.min(crossfadeSeconds, Math.max(0.8, duration * 0.12));

      // fade out front
      frontEl.style.transition = `opacity ${fadeTime}s ease`;
      frontEl.style.opacity = "0";

      // after fade
      fadeTimeoutRef.current = window.setTimeout(async () => {
        frontEl.pause();
        frontEl.currentTime = 0;

        // pause between videos
        pauseTimeoutRef.current = window.setTimeout(async () => {
          try { await backEl.play(); } catch {}
          backEl.style.opacity = String(targetOpacity);

          // swap front/back
          front.current = backIdx;

          // recursively play next
          playVideo(nextIndex);
        }, pauseBetweenVideos * 1000);
      }, fadeTime * 1000);
    };

    frontEl.onended = handleEnded;
  };

  useEffect(() => {
    if (isActive) {
      // reset both videos
      videoRefs.forEach(v => {
        if (!v.current) return;
        v.current.pause();
        v.current.style.opacity = "0";
      });
      front.current = 0;
      playVideo(0);
    } else {
      // pause everything
      videoRefs.forEach(v => {
        if (!v.current) return;
        v.current.pause();
        v.current.style.opacity = "0";
      });
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
      if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    }
  }, [isActive, videoFiles, playbackRate, targetOpacity, crossfadeSeconds, pauseBetweenVideos, muted]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {baseImage && (
        <img
          src={baseImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="background"
          style={{ filter: `brightness(1)` }}
        />
      )}
      <video
        ref={videoRefs[0]}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, filter: `brightness(${brightness}) saturate(1.05)`, transition: `opacity ${crossfadeSeconds}s ease` }}
        playsInline
        muted={muted}
        preload="metadata"
      />
      <video
        ref={videoRefs[1]}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, filter: `brightness(${brightness}) saturate(1.05)`, transition: `opacity ${crossfadeSeconds}s ease` }}
        playsInline
        muted={muted}
        preload="metadata"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,12,20,0.18), rgba(6,8,18,0.45))", pointerEvents: "none" }} />
    </div>
  );
}
