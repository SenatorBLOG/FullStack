// BreathingPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BreathingCircle } from '../components/BreathingCircle';
import { SessionControls } from '../components/SessionControls';
import { SessionStats } from '../components/SessionStats';
import ActivityChart from '../components/charts/AnnualProgressChart';
import { Wind } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function BreathingPage() {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(4);
  const [sessionTime, setSessionTime] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [totalStats, setTotalStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
  });

  useEffect(() => {
    fetchTotalStats();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const fetchTotalStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stats/overview');
      setTotalStats(res.data);
    } catch (err) {
      console.error('Error fetching total stats:', err);
    }
  };

  const handleToggle = () => {
    setIsActive(prev => !prev);
  };

  const handleReset = async () => {
    if (sessionTime > 0) {
      const newSession = {
        time: sessionTime,
        cycles,
        duration,
      };
      try {
        await axios.post('http://localhost:5000/api/sessions', newSession);
        fetchTotalStats(); // Update stats after save
      } catch (err) {
        console.error('Error saving session:', err);
      }
    }

    setIsActive(false);
    setSessionTime(0);
    setCycles(0);
  };

  const handleCycleComplete = () => {
    setCycles(prev => prev + 1);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `radial-gradient(ellipse at center, var(--ocean-glow-background) 0%, var(--background) 50%)`,
      }}
    >
      <NavBar />
      <div className="max-w-4xl mx-auto space-y-8 mt-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div 
              className="p-3 rounded-full"
              style={{ 
                backgroundColor: 'var(--ocean-glow-background)',
                boxShadow: `0 0 20px var(--ocean-glow-outer)`,
              }}
            >
              <Wind className="w-8 h-8" style={{ color: 'var(--ocean-title)' }} />
            </div>
            <h1 
              className="text-4xl"
              style={{ color: 'var(--ocean-title)' }}
            >
              Breathe
            </h1>
          </div>
          <p style={{ color: 'var(--ocean-subtitle)' }}>
            Find your calm with guided breathing exercises
          </p>
        </div>

        {/* Stats */}
        <SessionStats 
          currentSession={{ duration: sessionTime, cycles }}
          totalStats={totalStats}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Breathing Circle */}
          <div className="flex justify-center">
            <BreathingCircle
              isActive={isActive}
              duration={duration}
              onCycleComplete={handleCycleComplete}
            />
          </div>

          {/* Controls */}
          <div>
            <SessionControls
              isActive={isActive}
              duration={duration}
              onToggle={handleToggle}
              onReset={handleReset}
              onDurationChange={handleDurationChange}
            />
          </div>
        </div>

        {/* Tips */}
        <div className="text-center space-y-2 pt-8">
          <p style={{ color: 'var(--ocean-subtitle)' }}>
            💡 Tip: Find a comfortable position and focus on the rhythm of your breath
          </p>
          <p style={{ color: 'var(--ocean-subtitle)' }}>
            Start with 4-second cycles and adjust as needed
          </p>
        </div>
      </div>
    </div>
  );
}