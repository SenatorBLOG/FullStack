// src/components/BreathingCircle.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

type Phase = "inhale" | "hold" | "exhale" | "pause";

interface PhaseDurations {
  inhale: number;
  hold: number;
  exhale: number;
  pause: number;
}

interface BreathingCircleProps {
  isActive: boolean;
  phaseDurations: PhaseDurations;
  onCycleComplete?: () => void;
  size?: number; // pixels, default large
  minScale?: number;
  maxScale?: number;
  glowIntensity?: number; // 0..1
}

export function BreathingCircle({
  isActive,
  phaseDurations,
  onCycleComplete,
  size = 1320,
  minScale = 0.65,
  maxScale = 1.12,
  glowIntensity = 0.6,
}: BreathingCircleProps) {
  const controls = useAnimation();
  const [phase, setPhase] = useState<Phase>("inhale");
  const timeoutRef = useRef<number | null>(null);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // cleanup
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isActive) {
      // idle visuals
      controls.start({
        scale: 1,
        boxShadow: `0 10px 60px rgba(30,60,90,0.15)`,
        transition: { duration: 0.5, ease: "easeOut" },
      });
      setPhase("inhale");
      return;
    }

    const order: Phase[] = ["inhale", "hold", "exhale", "pause"];

    const runPhase = (p: Phase) => {
      setPhase(p);

      // map phase to visual targets
      const isExpand = p === "inhale" || p === "hold";
      const targetScale = isExpand ? maxScale : minScale;
      // glow and shadow intensity
      const glowFactor = isExpand ? 1.0 * glowIntensity : 0.5 * glowIntensity;
      const shadow = `0 40px 140px rgba(80,170,255,${0.12 * glowFactor}), inset 0 0 60px rgba(255,255,255,${0.02 * glowFactor})`;

      controls.start({
        scale: targetScale,
        boxShadow: shadow,
        transition: { duration: phaseDurations[p], ease: "easeInOut" },
      });

      timeoutRef.current = window.setTimeout(() => {
        if (p === "pause") {
          setCycleCount((c) => c + 1);
          onCycleComplete?.();
        }
        const next = order[(order.indexOf(p) + 1) % order.length];
        runPhase(next);
      }, Math.max(50, Math.round(phaseDurations[p] * 1000)));
    };

    runPhase(phase);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, phaseDurations.inhale, phaseDurations.hold, phaseDurations.exhale, phaseDurations.pause, glowIntensity, minScale, maxScale]);

  const label = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    pause: "Pause",
  }[phase];

  // px helpers
  const sizePx = `${size}px`;
  const outerHaloSize = `${Math.round(size * 1.6)}px`;
  const ringSize = `${Math.round(size * 1.06)}px`;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: sizePx, height: sizePx }}
    >
      {/* outer halo - large blurred glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.9 * glowIntensity : 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          width: outerHaloSize,
          height: outerHaloSize,
          borderRadius: "9999px",
          filter: "blur(120px)",
          background: "radial-gradient(circle at 50% 45%, rgba(140,220,255,0.9), rgba(20,36,60,0.0) 45%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* decorative ring (sharp border) */}
      <motion.div
        aria-hidden
        initial={{ rotate: 0, opacity: 0.9 }}
        animate={{ rotate: isActive ? 12 : 0, opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "9999px",
          zIndex: 3,
          pointerEvents: "none",
          border: "2px solid rgba(200,230,255,0.08)",
          boxShadow: "0 8px 40px rgba(40,80,120,0.06)",
          mixBlendMode: "screen",
        }}
      />

      {/* main solid circle with radial gradient (clearly visible) */}
      <motion.div
        animate={controls}
        initial={{ scale: 1 }}
        style={{
          width: sizePx,
          height: sizePx,
          borderRadius: "9999px",
          zIndex: 5,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // clear, visible circular shape:
          background:
            "radial-gradient(circle at 40% 35%, rgba(220,245,255,0.16) 0%, rgba(190,230,255,0.1) 12%, rgba(110,180,255,0.35) 35%, rgba(8,12,24,0.88) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* inner core flare - small bright disk to create 'eye' look */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0.95, scale: 0.85 }}
          animate={{
            opacity: isActive ? 1 : 0.7,
            scale: isActive ? 1 : 0.95,
          }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            width: `calc(${sizePx} * 0.46)`,
            height: `calc(${sizePx} * 0.46)`,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(220,240,255,0.9) 25%, rgba(160,210,255,0.6) 50%, transparent 70%)",
            filter: "blur(12px)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />

        {/* visible crisp edge ring inside the circle */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: `calc(${sizePx} * 0.9)`,
            height: `calc(${sizePx} * 0.9)`,
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 7,
            pointerEvents: "none",
            boxShadow: `0 40px 120px rgba(80,170,255,${0.06 * glowIntensity})`,
          }}
        />

        {/* center text */}
        <div className="relative z-20 text-center select-none px-4">
          <div
            style={{
              color: "#ffffff",
              fontSize: "clamp(28px, 6vw, 72px)",
              fontWeight: 800,
              textShadow: `0 8px 32px rgba(100,180,255,0.55)`,
              lineHeight: 1,
            }}
          >
            {isActive ? label : "Start"}
          </div>
          <div
            style={{
              color: "rgba(220,235,255,0.95)",
              fontSize: "clamp(12px, 1.6vw, 20px)",
              marginTop: 8,
              textShadow: `0 4px 16px rgba(80,160,220,0.28)`,
            }}
          >
            {isActive ? `${Math.round(phaseDurations[phase])}s` : "Ready"}
          </div>
        </div>
      </motion.div>

      {/* small cycle counter below */}
      <div
        className="absolute"
        style={{
          bottom: -48,
          color: "rgba(220,235,255,0.85)",
          fontSize: 15,
          zIndex: 8,
          textShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        {isActive ? `Cycle ${cycleCount + 1}` : ""}
      </div>
    </div>
  );
}
