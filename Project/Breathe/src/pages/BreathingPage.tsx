// src/pages/BreathingPage.tsx
import React, { useCallback, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import { BreathingCircle, Phase } from "../components/BreathingCircle";
import { SettingsModal } from "../components/SettingsModal";
import { VideoBackground } from "../components/VideoBackground";
import api from '../api';
import { toast } from 'sonner';
import { useRef, useEffect } from 'react';

export default function BreathingPage() {
  const [isActive, setIsActive] = useState(false);
  const [phaseDurations, setPhaseDurations] = useState({ inhale: 4, hold: 2, exhale: 5, pause: 3 });
  const [videoOpacity, setVideoOpacity] = useState(0.55);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [videoSpeed] = useState(1); // base playbackRate is 1; we let VideoBackground tweak up to maxSpeed
  const [videoBrightness, setVideoBrightness] = useState(1.05);
  const [pauseBetween, setPauseBetween] = useState(1.8);
  const startTimeRef = useRef<number | null>(null);
  const wasActiveRef = useRef(isActive);

  const videos = [
    "/videos/med-01.mp4",
    "/videos/med-02.mp4",
    "/videos/med-03.mp4",
    "/videos/med-04.mp4",
    "/videos/med-05.mp4",
    "/videos/med-06.mp4",
    "/videos/med-07.mp4",
  ];

  // visual intensity (for brightness/opacity) optionally driven by BreathingCircle earlier (not required here)
  const [visualIntensity, setVisualIntensity] = useState(0.6);
  const [phase, setPhase] = useState<Phase | null>(null);

  const handlePhaseChange = useCallback((p: Phase, intensity: number) => {
    // remember current phase for VideoBackground
    setPhase(p);
    // smooth intensity
    setVisualIntensity(prev => prev * 0.7 + intensity * 0.3);
  }, []);

  // compute desired play seconds: half of full cycle (as you wanted)
  const desiredPlaySeconds = useMemo(() => {
    const total = phaseDurations.inhale + phaseDurations.hold + phaseDurations.exhale + phaseDurations.pause;
    return total / 2;
  }, [phaseDurations]);

  // choose circle size relative to viewport
  const circleSize = useMemo(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return Math.round(Math.min(w, h) * 0.62);
  }, []);

  // при старте сессии запомним время
useEffect(() => {
  if (isActive) {
    startTimeRef.current = Date.now();
  } else {
    // если раньше был активен, а сейчас stop — сохранить сессию
    if (wasActiveRef.current && startTimeRef.current) {
      const now = Date.now();
      const durationMs = now - startTimeRef.current;
      // сохраняем в минутах с одной десятой точностью
      const sessionLength = Math.round((durationMs / 60000) * 10) / 10 || 0.1;
      const payload = {
        sessionDate: new Date().toISOString(),
        moodBefore: 5,         // дефолт, т.к. UI не собирает
        moodAfter: 5,          // можно заменить реальными значениями если соберёшь
        focusLevel: 5,
        stressLevel: 5,
        breathingDepth: 5,
        calmnessScore: 5,
        distractionCount: 0,
        timeOfDay: (new Date()).toLocaleTimeString([], { hour12: false }), // или 'Morning'
        noiseLevel: 'Quiet',
        sessionLength,         // минуты (float)
        cycles,                // из состояния cycles
        notes: ''
      };

      (async () => {
        try {
          await api.post('/sessions', payload);
          toast.success('Session saved');
          // можно обновить локальный стейт/статистику тут если нужно
        } catch (err:any) {
          console.error('Failed saving session:', err?.response?.data || err);
          toast.error('Failed to save session');
        }
      })();
    }
    startTimeRef.current = null;
  }
  wasActiveRef.current = isActive;
}, [isActive, cycles]); // запускается при смене isActive

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/public/Background_img_Meditation.jpg')`
        }}
      />
      <VideoBackground
        videoFiles={videos}
        isActive={isActive}
        baseImage="/images/background.jpg"
        targetOpacity={videoOpacity}
        playbackRate={videoSpeed}
        crossfadeSeconds={2.0}
        pauseBetweenVideos={pauseBetween}
        brightness={videoBrightness}
        phase={phase}
        desiredPlaySeconds={desiredPlaySeconds}
        maxSpeed={1.2}
      />

      <NavBar />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
        <BreathingCircle
          isActive={isActive}
          phaseDurations={phaseDurations}
          onCycleComplete={() => setCycles((c) => c + 1)}
          onPhaseChange={handlePhaseChange}
          size={circleSize}
          glowIntensity={1.0}
        />
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3" style={{ pointerEvents: "auto" }}>
        <button onClick={() => setIsActive(a => !a)} className="px-5 py-2.5 rounded-full bg-[#2e6fbf] text-white shadow-lg hover:shadow-xl transition-shadow">
          {isActive ? "Pause" : "Start"}
        </button>

        <button onClick={() => setSettingsOpen(true)} className="p-3 rounded-full bg-[#0F2A45] border border-[#23364a] text-[#AEE6FF] shadow-md hover:shadow-lg transition-shadow">
          ⚙
        </button>
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        phaseDurations={phaseDurations}
        onChangeDurations={setPhaseDurations}
        videoOpacity={videoOpacity}
        onVideoOpacityChange={setVideoOpacity}
        videoSpeed={videoSpeed}
        onVideoSpeedChange={() => {}}
      />
    </div>
  );
}
