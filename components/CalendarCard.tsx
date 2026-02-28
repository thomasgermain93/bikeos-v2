import Link from 'next/link';
import { format } from 'date-fns';
import { Race } from '@/types';

interface CalendarCardProps {
  races: Race[];
  type: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
}

const SERIES_COLORS: Record<string, { accent: string; bg: string; label: string }> = {
  motogp: { accent: '#ef4444', bg: '#ef444418', label: 'MotoGP' },
  moto2: { accent: '#FF6600', bg: '#FF660018', label: 'Moto2' },
  moto3: { accent: '#00CC00', bg: '#00CC0018', label: 'Moto3' },
  wsbk: { accent: '#3b82f6', bg: '#3b82f618', label: 'WSBK' },
  mxgp: { accent: '#8B4513', bg: '#8B451318', label: 'MXGP' },
  mx2: { accent: '#228B22', bg: '#228B2218', label: 'MX2' },
};

function getNextRaceIndex(races: Race[]): number {
  const now = new Date();
  for (let i = 0; i < races.length; i++) {
    const raceDate = new Date(races[i].date);
    if (raceDate > now) {
      return i;
    }
  }
  return -1;
}

export function CalendarCard({ races, type }: CalendarCardProps) {
  const seriesColors = SERIES_COLORS[type] || SERIES_COLORS.motogp;
  const accentColor = seriesColors.accent;
  const bgColor = seriesColors.bg;

  // Filtrer les courses principales (pas les sprints) et prendre les 5 prochaines
  const mainRaces = races.filter(r => r.raceType !== 'sprint');
  const nextRaceIndex = getNextRaceIndex(mainRaces);
  const upcomingRaces = mainRaces.slice(0, 5);

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-0.5 h-3.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="text-xs font-mono font-medium uppercase tracking-widest px-1.5 py-0.5 rounded"
              style={{ color: accentColor, backgroundColor: bgColor }}
            >
              {seriesColors.label}
            </span>
          </div>
          <Link
            href={`/${type}/calendar/`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center -mr-2 px-2 py-3 -my-3 flex-shrink-0"
          >
            View calendar →
          </Link>
        </div>
        <div className="mt-1.5">
          <span className="text-sm font-medium text-zinc-400">2026 Calendar</span>
          <span className="text-zinc-600 text-xs ml-2">· Next 5 Rounds</span>
        </div>
      </div>
      <div>
        {upcomingRaces.map((race, index) => {
          const raceDate = new Date(race.date);
          const isUpcoming = race.status === 'upcoming';
          const isFinished = race.status === 'finished';
          const isLive = race.status === 'live';
          const isNextRace = index === nextRaceIndex;

          return (
            <Link
              key={race.id}
              href={`/${type}/race/${race.id}/`}
              className={`flex items-center px-4 py-3 gap-4 min-h-[52px] border-b border-[var(--border-row)] hover:bg-zinc-800/40 transition-colors group ${
                isNextRace ? 'bg-zinc-800/30 border-l-2 border-l-zinc-500' : ''
              }`}
              style={isNextRace ? { borderLeftColor: accentColor } : {}}
            >
              {/* Round Number */}
              <span className={`w-8 text-xs font-mono tabular-nums flex-shrink-0 ${
                isNextRace ? 'text-white font-bold' : 'text-zinc-500'
              }`}>
                {String(race.round).padStart(2, '0')}
              </span>

              {/* Race Info */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm group-hover:text-white transition-colors truncate ${
                  isNextRace ? 'text-white font-medium' : 'text-zinc-100'
                }`}>
                  {race.name}
                  {isNextRace && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/50 text-zinc-400 font-mono">
                      NEXT
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 truncate">
                  {race.circuit} · {race.location}
                </div>
              </div>

              {/* Date */}
              <div className="text-right flex-shrink-0">
                <p className={`text-xs font-mono ${
                  isNextRace ? 'text-white font-medium' : 'text-zinc-300'
                }`}>
                  {format(raceDate, 'd MMM')}
                </p>
              </div>

              {/* Status */}
              <div className="w-16 flex-shrink-0 flex justify-end">
                {isLive && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-medium animate-pulse">
                    LIVE
                  </span>
                )}
                {isFinished && (
                  <span className="px-1.5 py-0.5 rounded-full bg-zinc-700 text-zinc-400 text-[10px] font-medium">
                    Done
                  </span>
                )}
                {isUpcoming && isNextRace && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                    Next
                  </span>
                )}
                {isUpcoming && !isNextRace && (
                  <span className="px-1.5 py-0.5 rounded-full bg-zinc-700/50 text-zinc-500 text-[10px] font-medium">
                    Soon
                  </span>
                )}
              </div>

              {/* Arrow */}
              <svg
                className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4.5 2.5L7.5 6l-3 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
