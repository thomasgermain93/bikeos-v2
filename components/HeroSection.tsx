'use client';

import { ReactNode } from 'react';
import { Countdown } from './Countdown';
import { Bike, Trophy, Timer, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  nextRaceDate?: string;
  raceName?: string;
  raceLocation?: string;
  accentColor: string;
  icon?: ReactNode;
}

export function HeroSection({ 
  title, 
  subtitle, 
  nextRaceDate, 
  raceName, 
  raceLocation,
  accentColor,
  icon
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden border-b border-[var(--border-section)]">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-10 animate-pulse"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${accentColor}, transparent 60%)`,
          animationDuration: '4s'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${accentColor}20`,
                }}
              >
                {icon || <Bike className="w-6 h-6" style={{ color: accentColor }} />}
              </div>
              <span 
                className="text-xs font-mono uppercase tracking-widest px-2 py-1 rounded"
                style={{ 
                  backgroundColor: `${accentColor}15`,
                  color: accentColor 
                }}
              >
                2026 Championship
              </span>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* Next Race Card */}
            {nextRaceDate && (
              <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900/80 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Timer className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Next Race</span>
                  {raceName && (
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
                
                {raceName && (
                  <h3 className="text-lg font-semibold text-white mb-2">{raceName}</h3>
                )}
                
                <Countdown targetDate={nextRaceDate} />
                
                {raceLocation && (
                  <p className="text-sm text-zinc-500 mt-4">{raceLocation}</p>
                )}
              </div>
            )}
          </div>

          {/* Right: Animated visual */}
          <div className="hidden lg:flex justify-center items-center relative h-80">
            {/* Animated circles */}
            <div 
              className="absolute w-64 h-64 rounded-full"
              style={{ 
                border: `2px dashed ${accentColor}30`,
                animation: 'spin 20s linear infinite'
              }}
            />
            <div 
              className="absolute w-48 h-48 rounded-full"
              style={{ 
                border: `2px dotted ${accentColor}20`,
                animation: 'spin 15s linear infinite reverse'
              }}
            />
            
            {/* Central icon */}
            <div 
              className="relative w-32 h-32 rounded-2xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}30, transparent)`,
                boxShadow: `0 0 60px ${accentColor}20`,
                animation: 'pulse 3s ease-in-out infinite'
              }}
            >
              {icon || <Trophy className="w-16 h-16" style={{ color: accentColor }} />}
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  opacity: 0.4,
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 12)}%`,
                  animation: `ping ${2 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// Helper components for icons
export function MotoGPIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M5 17h14M5 17l3-8h8l3 8" />
      <path d="M8 9l-2-3h4l2 3" />
    </svg>
  );
}

export function WSBKIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M5 17h14M5 17l2-6h10l2 6" />
      <rect x="9" y="8" width="6" height="3" rx="1" />
    </svg>
  );
}

export function MXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M5 17h14M5 17l4-10h6l4 10" />
      <path d="M9 7l-1-3h8l-1 3" />
    </svg>
  );
}
