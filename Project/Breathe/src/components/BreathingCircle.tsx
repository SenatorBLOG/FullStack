import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Types ---

interface BreathingCircleProps {
  /** Указывает, активна ли сессия дыхания */
  isActive: boolean;
  /** Общая длительность одного полного цикла (Вдох/Задержка/Выдох/Пауза) в секундах. */
  duration: number;
  /** Callback, вызываемый по завершении каждого полного цикла дыхания. */
  onCycleComplete?: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

// --- Component ---

export function BreathingCircle({ isActive, duration, onCycleComplete }: BreathingCircleProps) {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);

  /** * Эффект для управления таймером и сменой фаз дыхания.
   * Зависит от isActive, duration и onCycleComplete.
   */
  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      return;
    }

    // Длительность каждой фазы (Вдох, Задержка, Выдох, Пауза) в миллисекундах.
    // Предполагаем, что duration - это общая длительность цикла.
    const phaseDuration = (duration * 1000) / 4; 

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
            // Завершение цикла
            setCycleCount(prev => prev + 1);
            onCycleComplete?.(); // Вызов callback
            return 'inhale';
          default:
            return 'inhale';
        }
      });
    }, phaseDuration);

    // Функция очистки: останавливает интервал при деактивации или размонтировании
    return () => clearInterval(interval);
  }, [isActive, duration, onCycleComplete]);

  /** Возвращает текст для текущей фазы */
  const getPhaseText = (): string => {
    switch (phase) {
      case 'inhale':
        return 'Вдох';
      case 'hold':
        return 'Задержка';
      case 'exhale':
        return 'Выдох';
      case 'pause':
        return 'Пауза';
      default:
        return 'Дышите';
    }
  };

  /** Определяет масштаб круга для анимации (расширение при вдохе/задержке) */
  const getCircleScale = (): number => {
    // Круг увеличивается на вдохе и удерживается
    if (phase === 'inhale' || phase === 'hold') {
      return 1.5; 
    }
    // Круг уменьшается на выдохе и паузе
    return 1;
  };

  const animationDuration = duration / 4;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8">
        
        {/* Анимированное свечение (Outer glow) */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            // Используем CSS-переменные для легкой смены темы
            background: 'radial-gradient(circle, var(--ocean-glow-inner) 0%, var(--ocean-glow-outer) 50%, transparent 70%)',
          }}
          animate={{
            scale: isActive ? getCircleScale() * 1.2 : 1, // Свечение немного больше круга
            opacity: isActive ? 0.8 : 0.3,
          }}
          transition={{
            duration: animationDuration,
            ease: "easeInOut",
          }}
        />

        {/* Основной дыхательный круг (Main breathing circle) */}
        <motion.div
          className="relative w-64 h-64 rounded-full flex items-center justify-center overflow-hidden transition-colors"
          style={{
            background: 'radial-gradient(circle, var(--ocean-glow-background) 0%, transparent 70%)',
            boxShadow: '0 0 30px var(--ocean-glow-outer), inset 0 0 30px var(--ocean-glow-inner)',
            border: '2px solid var(--ocean-title)',
          }}
          animate={{
            scale: isActive ? getCircleScale() : 1, // Анимация масштабирования
          }}
          transition={{
            duration: animationDuration,
            ease: "easeInOut",
          }}
        >
          <p className="text-2xl font-medium z-10 select-none" style={{ color: 'var(--ocean-subtitle)' }}>
            {isActive ? getPhaseText() : 'Start'}
          </p>
        </motion.div>
      </div>


      {/* Cycle Indicator */}
      <p className="text-center text-lg" style={{ color: 'var(--ocean-subtitle)' }}>
        {isActive ? `Cycle ${cycleCount + 1}` : 'Ready to start'}
      </p>
    </div>
  );
}

// Изменение экспорта для использования в других файлах (если это не дефолтный экспорт)
// export default BreathingCircle;