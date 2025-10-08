import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

    const totalCycleDuration = duration * 1000; // Convert to milliseconds
    const phaseDuration = totalCycleDuration / 4;

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
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'pause':
        return 'Pause';
      default:
        return 'Breathe';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 1;
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
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, var(--ocean-glow-inner) 0%, var(--ocean-glow-outer) 50%, transparent 70%)`,
            filter: 'blur(20px)',
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
          className="relative w-64 h-64 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: 'var(--ocean-title)',
            background: `radial-gradient(circle, var(--ocean-glow-background) 0%, transparent 70%)`,
            boxShadow: `0 0 30px var(--ocean-glow-outer), inset 0 0 30px var(--ocean-glow-inner)`,
          }}
          animate={{
            scale: isActive ? getCircleScale() : 1,
          }}
          transition={{
            duration: duration / 4,
            ease: "easeInOut",
          }}
        >
          {/* Inner circle */}
          <motion.div
            className="w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, var(--ocean-glow-inner) 0%, var(--ocean-title) 50%, transparent 100%)`,
            }}
            animate={{
              scale: isActive ? (phase === 'inhale' || phase === 'hold' ? 1.2 : 0.8) : 1,
              opacity: isActive ? 0.9 : 0.5,
            }}
            transition={{
              duration: duration / 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      <div className="text-center">
        <h2 
          className="mb-2"
          style={{ color: 'var(--ocean-title)' }}
        >
          {getPhaseText()}
        </h2>
        <p style={{ color: 'var(--ocean-subtitle)' }}>
          {isActive ? `Cycle ${cycleCount + 1}` : 'Ready to begin'}
        </p>
      </div>
    </div>
  );
}