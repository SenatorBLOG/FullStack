import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';

interface SessionControlsProps {
  isActive: boolean;
  duration: number;
  onToggle: () => void;
  onReset: () => void;
  onDurationChange: (value: number) => void;
}

export function SessionControls({ 
  isActive, 
  duration, 
  onToggle, 
  onReset, 
  onDurationChange 
}: SessionControlsProps) {
  return (
    <Card className="p-6 space-y-6" style={{ 
      background: 'var(--card)',
      borderColor: 'var(--border)',
    }}>
      <div className="space-y-4">
        <div>
          <label className="block mb-3" style={{ color: 'var(--ocean-title)' }}>
            Breath Duration
          </label>
          <div className="space-y-2">
            <Slider
              value={[duration]}
              onValueChange={(value: number[]) => onDurationChange(value[0])}
              min={3}
              max={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between">
              <span style={{ color: 'var(--ocean-subtitle)' }}>3s</span>
              <span style={{ color: 'var(--ocean-subtitle)' }}>
                {duration}s per phase
              </span>
              <span style={{ color: 'var(--ocean-subtitle)' }}>12s</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onToggle}
            size="lg"
            className="flex-1 gap-2"
            style={{
              backgroundColor: isActive ? 'var(--destructive)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
            }}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </Button>

          <Button
            onClick={onReset}
            size="lg"
            variant="outline"
            className="gap-2"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--ocean-subtitle)',
              backgroundColor: 'transparent',
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <h3 className="mb-2" style={{ color: 'var(--ocean-title)' }}>
          Breathing Pattern
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Inhale', duration: duration },
            { label: 'Hold', duration: duration },
            { label: 'Exhale', duration: duration },
            { label: 'Pause', duration: duration },
          ].map((phase, index) => (
            <div
              key={index}
              className="text-center p-2 rounded"
              style={{ backgroundColor: 'var(--ocean-glow-background)' }}
            >
              <div style={{ color: 'var(--ocean-subtitle)' }}>
                {phase.label}
              </div>
              <div style={{ color: 'var(--ocean-title)' }}>
                {phase.duration}s
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}