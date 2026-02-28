'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);
    setTimeLeft(calculateTimeLeft(target));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-start gap-3 mt-3" aria-live="off" aria-label="Race countdown" aria-atomic="true">
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">00</span>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">D</span>
        </div>
        <span className="w-2"></span>
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">00</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">H</span>
          </div>
          <span className="font-mono text-[2rem] md:text-[2.5rem] font-thin text-zinc-700 leading-none select-none">:</span>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">00</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">M</span>
          </div>
          <span className="font-mono text-[2rem] md:text-[2.5rem] font-thin text-zinc-700 leading-none select-none">:</span>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">00</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">S</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mt-3" aria-live="off" aria-label="Race countdown" aria-atomic="true">
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">
          {timeLeft.days.toString().padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">D</span>
      </div>
      <span className="w-2"></span>
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">H</span>
        </div>
        <span className="font-mono text-[2rem] md:text-[2.5rem] font-thin text-zinc-700 leading-none select-none">:</span>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">M</span>
        </div>
        <span className="font-mono text-[2rem] md:text-[2.5rem] font-thin text-zinc-700 leading-none select-none">:</span>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-4xl sm:text-5xl font-light tabular-nums text-white leading-none">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">S</span>
        </div>
      </div>
    </div>
  );
}
