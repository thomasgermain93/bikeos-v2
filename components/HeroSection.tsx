import { ReactNode } from 'react';
import { Countdown } from './Countdown';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  nextRaceDate?: string;
  raceName?: string;
  raceLocation?: string;
  asciiArt: ReactNode;
  accentColor: string;
}

export function HeroSection({ 
  title, 
  subtitle, 
  nextRaceDate, 
  raceName, 
  raceLocation,
  asciiArt, 
  accentColor 
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden border-b border-[var(--border-section)]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>
                  2026 Season
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* Next Race Countdown */}
            {nextRaceDate && (
              <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Next Race</span>
                  {raceName && (
                    <span className="text-xs text-zinc-400">• {raceName}</span>
                  )}
                </div>
                <Countdown targetDate={nextRaceDate} />
                {raceLocation && (
                  <p className="text-sm text-zinc-500 mt-4">{raceLocation}</p>
                )}
              </div>
            )}
          </div>

          {/* Right: ASCII Art */}
          <div className="hidden lg:flex justify-center items-center">
            <pre className="text-xs md:text-sm font-mono text-zinc-500 leading-none select-none">
              {asciiArt}
            </pre>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${accentColor}, transparent 50%)`
        }}
      />
    </div>
  );
}

// ASCII Art Components for each series
export function MotoGPASCII() {
  return (
    <>
{`      _____       _____
     /    /|     /    /|
    /____/ |    /____/ |
   |     | |   |     | |
   | DUC | |   | 93  | |
   |_____|/    |_____|/
    \\\\    /      \\\\    /
     \\\\__/        \\\\__/
      \\\\            /
       \\__________/
        |  MOTO  |
        |   GP   |
        |________|`}
    </>
  );
}

export function Moto2ASCII() {
  return (
    <>
{`       ___
      /   \\\\___
     /    /    \\\\___
    |    / 250cc    \\\\___
    |   /    ____________|
    |  /    /
    |_/____/
     /    /
    /____/
   | M2 |
   |____|`}
    </>
  );
}

export function Moto3ASCII() {
  return (
    <>
{`         __
        /  \\\\__
       /    \\  \\\\__
      |  125 |     \\\\__
      |______|_________|
        \\\\    /
         \\\\__/
          ||
         /||\\
        / || \\\
       | M3 |
       |____|`}
    </>
  );
}

export function WSBKASCII() {
  return (
    <>
{`    _______________
   /   _________   \\\\___
  /   /         \\       \\\
 |   |  SBK    |        |
 |   |_________|        |
 |______________|       |
    \\\\    /      \\\\____/
     \\\\__/        \\\\__/
      ||            ||
     /||\\\\          /||\\\\
    /_||_\\\\________/_||_\\\\
      SUPERBIKE WORLD`}
    </>
  );
}

export function MXGPASCII() {
  return (
    <>
{`         __
        /__\\
       |  MX|
       |__GP|
        ||||
       /||||\\\\
      / |||| \\\
     /  ||||  \\\
    |___||||___|
        ||||
       _||||_
      /      \\\
     / DIRT   \\\
    /__________\\\\
     MOTOCROSS GP`}
    </>
  );
}

export function MX2ASCII() {
  return (
    <>
{`       ___
      /   \\\
     | MX2 |
     |_____|
      |   |
      |   |
      |   |
     /     \\\
    /   __   \\\
   /___/  \\___\\\\
      |    |
      |____|
       MX2
   WORLD CHAMP`}
    </>
  );
}

// Home page ASCII - Combined
export function HomeASCII() {
  return (
    <>
{`    _____  _____  _____  _____  _____  _____
   |     ||     ||     ||     ||     ||     |
   | MGP || M2  || M3  || WSB || MXG || MX2 |
   |_____||_____||_____||_____||_____||_____|
     | |    | |    | |    | |    | |    | |
     | |    | |    | |    | |    | |    | |
    _|_|_  _|_|_  _|_|_  _|_|_  _|_|_  _|_|_
   |_____||_____||_____||_____||_____||_____|
   
   LIVE MOTORSPORT DATA`}
    </>
  );
}
