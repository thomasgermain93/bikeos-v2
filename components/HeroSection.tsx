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
{`                              ___
                    ________  /   \\___
                   /  ____  \\/        \\
                  /  /    \\__|         |
     ____________/  /        |    93    |___
    /             _/    ___  |           __/|
   /     ________/    _/   \\_|_____    /   ||
  |    _/            /              \\/    _||
  |   /_____________/    _______     \\   /_/
  |  /              |   /  ___  \\     \\_/|
  | /               |  /  /   \\  \\      ||
  |/    RC213V      | |  | RCV |  |      ||
  /    REPSOL       | |  |_____|  |      ||
 /    HONDA        /  |___________|      ||
/_________________/                     ||
                \\        _____        ||
                 \\______/  __\\______||
                          /_/         \\
                         /_/           \\
                        /_/  MOTOGP     \\
                       /_/______________|

           PURE RACING MACHINERY`}
    </>
  );
}

export function Moto2ASCII() {
  return (
    <>
{`                          ___
                 ________ /   \\
                /  ___   /     \\
               /  /   \\/       |
              /  /    |   73    |____
    _________/  /    _|         ____/|
   /          _/    /  _____   /    ||
  /   _______/     /  /     \\/    _||
 |   /             | | 765cc  \\   /_/
 |  /___________   | |_______  \\_/|
 | /            |  |_________|   ||
 |/             |                ||
 /    KALEX     |    TRIUMPH     ||
/               |   765 ENGINE   ||
______________/                 ||
             \\     _____        ||
              \\___/  __\\_______||
                     /_\\        \\
                    /_||_\\  MOTO2 \\
                   /__||__\\_______|

         THE ROAD TO GLORY`}
    </>
  );
}

export function Moto3ASCII() {
  return (
    <>
{`                      ___
                _____/   \\
               /    /     \\
              /    /       |
             /    /   71   |___
    ________/    /          __/|
   /            /___       /   ||
  /    ________/    |     /   _||
 |    /              \\___/   /_/
 |   /    ___                  |
 |  /    /   \\  250cc SINGLE  |
 | /    /  O  \\    HONDA      |
 |/    /_______\\               |
 /    |    71    |              |
/_____|_________|             ||
           \\       ___        ||
            \\_____/ _ \\_______||
                   / \\ \\       \\
                  /   \\ \\ MOTO3 \\
                 /_____\\_\\______|

        FUTURE CHAMPIONS`}
    </>
  );
}

export function WSBKASCII() {
  return (
    <>
{`                      ___________
                 ____/  ______   \\___
                /     / /      \\      \\
               /     / /        \\      |
              /     / /    19    \\     |____
    _________/     / /            \\    ____/|
   /              / /________      \\  /    ||
  /      ________/   O    O  \\      \\/   _||
 |      /                    \\      /    /_/
 |     /    _____      _____   \\___/    /
 |    /    /     \\    /     \\          /
 |   /    | SBK   |  | SBK   |        /
 |  /      \\_____/    \\_____/        /
 | /                                  /
 |/      1000cc     PRODUCTION        /
 /      SUPERBIKE    BASED           ||
/          RACING                  ||
        \\         _____          ||
         \\_______/  _  \\_________||
                   / | \\          \\
                  /  |  \\  WSBK    \\
                 /___|___\\_________|

         RACE ON SUNDAY`}
    </>
  );
}

export function MXGPASCII() {
  return (
    <>
{`                      _______
                _____/       \\_____
               /   ___   222   ___   \\
              /   /   \\       /   \\   \\
             /   /     \\_____/     \\   |
            /   /                     \\  |___
           /   /     ___________       \\ ____/|
          /   /     /  _     _  \\       \\/   ||
         /   /_____/  / \\   / \\  \\       \\ _||
        /           | |   O   |  |        \\/_/
       /    ________| | 450cc |  |_________/
      /    /         |  FACTORY|  |
     /    /          | |_____|  |
    /    /           |___________|
   /    /                    |||
  /____/         SHOWA       |||
      /          KAYABA    _____|||
     /          SUSPENSION|__    __|
    /                      /  |  |
   /______________________/   |  |
  /   \\        \\/        \\  |  |
 /     \\      /  \\        \\ |  |
/  MXGP  \\____/    \\________\\|  |
                                |
          DIRT DESTROYER`}
    </>
  );
}

export function MX2ASCII() {
  return (
    <>
{`                    ______
              _____/      \\____
             /  ___   96   ___  \\
            /  /   \\       /   \\  \\
           /  /     \\_____/     \\  |
          /  /                     \\ |___
         /  /     ___________       \\___/|
        /  /     /  _     _  \\        / ||
       /  /_____/  / \\   / \\  \\      / _||
      /          | |   O   |  |      / /_/
     /   ________| | 250cc |  |_____/
    /   /         |  FACTORY|  |
   /   /          | |_____|  |
  /   /           |___________|
 /   /                    ||
/___/             WP     ||
    /           SUSPENSION||___
   /                  _____   __|
  /                  |__  |  |
 /______________________| |  |
/    \\        \\/      \\ |  |
/      \\      /  \\     \\|  |
/  MX2   \\____/    \\____|   |
                          |
         NEXT GENERATION`}
    </>
  );
}

// Home page ASCII - Combined
export function HomeASCII() {
  return (
    <>
{`        MOTO GP 2026 SEASON
    ________________________________
   /     ___       ___       ___    \\
  /     / M \\     / M \\     / M \\    \\
 |     | GP  |   |  2  |   |  3  |     |
 |      \\___/     \\___/     \\___/      |
 |       |||       |||       |||        |
 |      /|||\\     /|||\\     /|||\\       |
 |     / ||| \\   / ||| \\   / ||| \\      |
 |    |__|||__| |__|||__| |__|||__|     |
 |      93 73 71                         |
 |                                       |
 |   ___       ___       ___       ___   |
  \\ / W \\     / M \\     / M \\     /    /
   | SBK  |   | XGP |   | X2  |   /
    \\___/     \\___/     \\___/   /
     |||       |||       |||    /
    /|||\\     /|||\\     /|||\\ /
   / ||| \\   / ||| \\   / ||| \\____
  |__|||__| |__|||__| |__|||__|____|
    19 222 96
   ____________________________________
  |                                    |
  |      BIKEOS - LIVE MOTORSPORT      |
  |____________________________________|`}
    </>
  );
}
