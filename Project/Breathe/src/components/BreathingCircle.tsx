// src/components/BreathingCircle.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// типы фаз дыхания
export type Phase = "inhale" | "hold" | "exhale" | "pause";

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
  onPhaseChange?: (phase: Phase, intensity: number) => void; // уведомление родителя о фазе
  size?: number; // размер круга в пикселях
  minScale?: number; // минимальный размер при сжатии
  maxScale?: number; // максимальный размер при расширении
  glowIntensity?: number; // сила свечения (0..1)
}

export function BreathingCircle({
  isActive,
  phaseDurations,
  onCycleComplete,
  onPhaseChange,
  size = 600,
  minScale = 0.7,
  maxScale = 1.12,
  glowIntensity = 1,
}: BreathingCircleProps) {
  const controls = useAnimation();
  const [phase, setPhase] = useState<Phase>("inhale");
  const timeoutRef = useRef<number | null>(null);
  const [cycleCount, setCycleCount] = useState(0);

  // карта интенсивности свечения по фазам
  const intensityByPhase: Record<Phase, number> = {
    inhale: 1.0,  // максимально ярко
    hold: 0.92,   // чуть тусклее
    exhale: 0.45, // гаснет
    pause: 0.36,  // почти потухло
  };

  // очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // основной цикл дыхания
  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // если не активно — остановка анимации и мягкий reset
    if (!isActive) {
      controls.start({
        scale: 1,
        boxShadow: `0 16px 80px rgba(20,40,80,0.12)`, // лёгкая подсветка в покое
        transition: { duration: 0.6, ease: "easeOut" },
      });
      setPhase("inhale");
      onPhaseChange?.("inhale", intensityByPhase["inhale"]);
      return;
    }

    const order: Phase[] = ["inhale", "hold", "exhale", "pause"];

    const runPhase = (p: Phase) => {
      setPhase(p);
      const intensity = intensityByPhase[p];
      onPhaseChange?.(p, intensity); // оповестить родительский компонент

      // логика "вдыхаем / выдыхаем"
      const expanding = p === "inhale" || p === "hold";
      const targetScale = expanding ? maxScale : minScale;

      // сила свечения (для glow)
      const glowFactor = expanding ? 1.0 * glowIntensity : 0.5 * glowIntensity;

      // --- НАИБОЛЕЕ ВАЖНЫЙ ЭФФЕКТ GLOW ---
      // наружное свечение (boxShadow) + внутренний мягкий свет (inset)
      const shadow = `
        0 40px 180px rgba(80,170,255,${0.12 * glowFactor}),   /* внешний glow */
        inset 0 0 80px rgba(255,255,255,${0.03 * glowFactor}) /* внутренний soft glow */
      `;

      controls.start({
        scale: targetScale, // изменение размера круга
        boxShadow: shadow,  // анимация свечения
        transition: { duration: phaseDurations[p], ease: "easeInOut" },
      });

      // переход к следующей фазе
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
  }, [isActive, phaseDurations, glowIntensity, minScale, maxScale]);

  // подписи для фаз
  const label = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    pause: "Pause",
  }[phase];

  const sizePx = `${size}px`;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: sizePx, height: sizePx, pointerEvents: "none" }}
    >
      {/* === ОСНОВНОЙ КРУГ === */}
      <motion.div
        animate={controls}
        initial={{ scale: 1 }}
        style={{
          width: sizePx,
          height: sizePx,
          borderRadius: "9999px", // делает форму круга
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          // 🔵 ФОН КРУГА
          // тут задаётся его цвет, глубина и блик
          background: `
            radial-gradient(
              rgba(112,184,255,0.35) 20%,     /* центр — белый свет */
              rgba(101,168,255,0.7) 80%,    /* мягкий голубой */
              rgba(112,184,255,1) 36%,    /* голубой ореол */
              rgba(255,255,255,1) 100%         /* край — почти чёрный, глубина */
            )
          `,

          border: "1px solid rgba(112,184,255,1)", // тонкий контур по краю
        }}
      >

        {/* === ТЕКСТ ВНУТРИ КРУГА === */}
        <div className="relative z-20 text-center select-none" style={{ pointerEvents: "auto" }}>
          <div
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 5.6vw, 72px)", // адаптивный размер
              fontWeight: 800,
              textShadow: "0 10px 36px rgba(90,170,255,0.3)", // сияние текста
              lineHeight: 1,
            }}
          >
            {isActive ? label : "Start"}
          </div>

          <div
            style={{
              color: "rgba(220,235,255,0.95)", // цвет таймера
              marginTop: 8,
              fontSize: "clamp(12px,1.6vw,20px)",
            }}
          >
            {isActive ? `${Math.round(phaseDurations[phase])}s` : "Ready"}
          </div>
        </div>
      </motion.div>

      {/* === СЧЁТЧИК ЦИКЛОВ === */}
      <div
        style={{
          position: "absolute",
          bottom: -48,
          color: "rgba(220,235,255,0.9)",
        }}
      >
        {isActive ? `Cycle ${cycleCount + 1}` : ""}
      </div>
    </div>
  );
}
