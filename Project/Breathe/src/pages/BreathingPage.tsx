import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BreathingCircle } from '../components/BreathingCircle';
import { SessionControls } from '../components/SessionControls';
import { SessionStats } from '../components/SessionStats';
import { Wind } from 'lucide-react';

interface Session {
  _id?: string;
  date: string;
  time: number;
  cycles: number;
  duration: number;
}

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
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get<Session[]>('http://localhost:5000/api/sessions');
      const sessions = res.data;
      setTotalStats({
        totalSessions: sessions.length,
        totalMinutes: sessions.reduce((acc: number, sess: Session) => acc + Math.floor(sess.time / 60), 0),
        streak: calculateStreak(sessions),
      });
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

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
        fetchSessions(); // Обновляем stats
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

  const calculateStreak = (sessions: Session[]) => {
    if (sessions.length === 0) return 0;
    const sorted = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 1;
    let currentDate = new Date(sorted[0].date).setHours(0,0,0,0);
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i].date).setHours(0,0,0,0);
      if ((currentDate - prevDate) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ 
        background: `radial-gradient(ellipse at center, var(--ocean-glow-background) 0%, var(--background) 50%)`,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
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