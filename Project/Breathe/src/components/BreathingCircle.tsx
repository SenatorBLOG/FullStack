import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BreathingCircleProps {
  isActive: boolean;
  duration: number;
  onCycleComplete?: () => void;
}

export function BreathingCircle({ isActive, duration, onCycleComplete }: BreathingCircleProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      return;
    }

    const phaseDuration = (duration * 1000) / 4; // ms per phase

    const interval = setInterval(() => {
      setPhase(current => {
        switch (current) {
          case 'inhale':
            return 'hold';
          case 'hold':
            return 'exhale';
          case 'exhale':
            return 'pause';
          case 'pause':
            setCycleCount(prev => prev + 1);
            onCycleComplete?.();
            return 'inhale';
          default:
            return 'inhale';
        }
      });
    }, phaseDuration);

    return () => clearInterval(interval);
  }, [isActive, duration, onCycleComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Exhale';
      case 'pause':
        return 'Pause';
      default:
        return 'Breathe';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
      case 'hold':
        return 1.5;
      case 'exhale':
      case 'pause':
        return 1;
      default:
        return 1;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: 'radial-gradient(circle, var(--ocean-glow-inner) 0%, var(--ocean-glow-outer) 50%, transparent 70%)',
          }}
          animate={{
            scale: isActive ? getCircleScale() * 1.2 : 1,
            opacity: isActive ? 0.8 : 0.3,
          }}
          transition={{
            duration: duration / 4,
            ease: "easeInOut",
          }}
        />

        {/* Main breathing circle */}
        <motion.div
          className="relative w-64 h-64 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle, var(--ocean-glow-background) 0%, transparent 70%)',
            boxShadow: '0 0 30px var(--ocean-glow-outer), inset 0 0 30px var(--ocean-glow-inner)',
            border: '2px solid var(--ocean-title)',
          }}
          animate={{
            scale: isActive ? getCircleScale() : 1,
          }}
          transition={{
            duration: duration / 4,
            ease: "easeInOut",
          }}
        >
          <p className="text-2xl font-medium z-10" style={{ color: 'var(--ocean-subtitle)' }}>
            {getPhaseText()}
          </p>
        </motion.div>
      </div>

      <p className="text-center" style={{ color: 'var(--ocean-subtitle)' }}>
        {isActive ? `Cycle ${cycleCount + 1}` : 'Ready to begin'}
      </p>
    </div>
  );
}