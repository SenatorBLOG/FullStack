// src/pages/BreathingPage.tsx  (important parts)
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { BreathingCircle } from "../components/BreathingCircle";
import { SettingsModal } from "../components/SettingsModal";
import { VideoBackground } from "../components/VideoBackground";

export default function BreathingPage() {
  const [isActive, setIsActive] = useState(false);
  const [phaseDurations, setPhaseDurations] = useState({ inhale:4, hold:2, exhale:5, pause:3 });
  const [videoOpacity, setVideoOpacity] = useState(0.45);        // make video more present
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [videoSpeed, setVideoSpeed] = useState(0.6);             // slower by default
  const [videoBrightness, setVideoBrightness] = useState(0.95);  // make video brighter
  const [pauseBetween, setPauseBetween] = useState(2.2);         // seconds gap

  const videos = [
    "/videos/med-01.mp4",
    "/videos/med-02.mp4",
    "/videos/med-03.mp4",
    // ...
  ];

  return (
    <div className="relative min-h-screen">
      {/* base background image under video */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')", filter: "brightness(0.9)" }} />
      <VideoBackground
        videoFiles={videos}
        isActive={isActive}
        baseImage="/images/background.jpg"
        targetOpacity={videoOpacity}
        playbackRate={videoSpeed}
        crossfadeSeconds={1.6}
        pauseBetweenVideos={pauseBetween}
        brightness={videoBrightness}
      />

      <NavBar />

      <div className="relative z-10 min-h-[70vh] flex items-center justify-center">
        <BreathingCircle
          isActive={isActive}
          phaseDurations={phaseDurations}
          onCycleComplete={() => setCycles(c => c + 1)}
          size={360}               // bigger
          glowIntensity={1.0}
        />
      </div>

      {/* floating controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button onClick={() => setIsActive(a => !a)} className="px-4 py-2 rounded-full bg-[#2e6fbf] text-white shadow">
          {isActive ? "Pause" : "Start"}
        </button>

        <button onClick={() => setSettingsOpen(true)} className="p-3 rounded-full bg-[#0F2A45] border border-[#23364a] text-[#AEE6FF] shadow">
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
        onVideoSpeedChange={setVideoSpeed}
      />
    </div>
  );
}
