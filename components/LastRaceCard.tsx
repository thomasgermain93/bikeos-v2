import Link from 'next/link';
import { format } from 'date-fns';
import { Race, Standing } from '@/types';

interface LastRaceCardProps {
  race: Race;
  standings: Standing[];
}

const TEAM_COLORS: Record<string, string> = {
  'Red Bull': '#3671C6',
  'McLaren': '#FF8000',
  'Ferrari': '#FF2800',
  'Mercedes': '#27F4D2',
  'Alpine': '#0093CC',
  'Aston Martin': '#229971',
  'Haas': '#B6BABD',
  'Racing Bulls': '#6692FF',
  'Williams': '#64C4FF',
  'Kick Sauber': '#52E252',
  'Ducati': '#DC2626',
  'KTM': '#FF6600',
  'Aprilia': '#0066CC',
  'Yamaha': '#00FF00',
  'Honda': '#FF0000',
};

const SERIES_COLORS: Record<string, string> = {
  motogp: '#ef4444',
  wsbk: '#3b82f6',
  mxgp: '#8B4513',
  mx2: '#228B22',
};

function getTeamColor(teamName: string): string {
  if (!teamName) return '#666666';
  for (const [team, color] of Object.entries(TEAM_COLORS)) {
    if (teamName.toLowerCase().includes(team.toLowerCase())) return color;
  }
  return '#666666';
}

function getBarOpacity(position: number): number {
  if (position === 1) return 1;
  if (position === 2) return 0.85;
  if (position === 3) return 0.85;
  if (position === 4) return 0.65;
  return 0.65;
}

export function LastRaceCard({ race, standings }: LastRaceCardProps) {
  const raceDate = new Date(race.date);
  const accentColor = SERIES_COLORS[race.type] || '#ef4444';

  // Use results from race if available, otherwise fallback to standings
  const displayResults = race.results && race.results.length > 0
    ? race.results.slice(0, 5).map(r => ({
        position: r.position,
        rider: r.rider,
        points: r.points || 0,
        time: r.time
      }))
    : standings.slice(0, 5).map((s, i) => ({
        position: i + 1,
        rider: s.rider,
        points: [25, 20, 16, 13, 11][i] || 0,
        time: ''
      }));

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
            <span className="text-xs font-mono font-medium uppercase tracking-widest" style={{ color: accentColor }}>
              {race.type.toUpperCase()}
            </span>
          </div>
          <Link
            href={`/${race.type}/race/${race.id}/`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center -mr-2 px-2 py-3 -my-3 flex-shrink-0"
          >
            Full results →
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-zinc-400 truncate">
            {race.name}
            <span className="text-zinc-600 font-normal text-xs ml-2">Rd {race.round}</span>
          </span>
          <span className="text-xs font-mono text-zinc-600 flex-shrink-0">
            {format(raceDate, 'd MMM yyyy')}
          </span>
        </div>
      </div>
      <div>
        {displayResults.map((result) => {
          const teamName = typeof result.rider.team === 'string'
            ? result.rider.team
            : result.rider.team?.name || '';
          const teamColor = getTeamColor(teamName);
          const opacity = getBarOpacity(result.position);

          return (
            <div
              key={result.rider.id}
              aria-label={`P${result.position} ${result.rider.firstName} ${result.rider.lastName}, ${result.points} points`}
              className="flex items-center px-4 py-3 gap-4 min-h-[52px] border-b border-[var(--border-row)] hover:bg-zinc-800/40 transition-colors"
            >
              <span className="w-5 text-xs font-mono tabular-nums flex-shrink-0 text-zinc-500">
                P{result.position}
              </span>
              <div
                className="w-0.5 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: teamColor, opacity }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-100 font-medium">
                  <span className="hidden sm:inline">{result.rider.firstName} {result.rider.lastName}</span>
                  <span className="sm:hidden">{result.rider.firstName.charAt(0)}. {result.rider.lastName}</span>
                </div>
                <div className="text-xs text-zinc-500 truncate">{teamName || 'Independent'}</div>
              </div>
              <div className="text-right flex flex-col justify-center">
                <span className="text-sm font-mono tabular-nums text-zinc-400">
                    {result.points > 0 ? result.points : ''}
                </span>
                {result.time && <span className="text-[10px] font-mono text-zinc-600 leading-none">{result.time}</span>}
              </div>
              <svg
                className="md:hidden w-3 h-3 text-zinc-500 flex-shrink-0"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4.5 2.5L7.5 6l-3 3.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          );
        })}

        {/* Fastest Lap info from race if available */}
        {race.fastestLap && (
          <div className="flex items-center px-4 py-3 gap-4 min-h-[52px] bg-zinc-800/20">
            <span className="w-5 text-xs font-mono text-zinc-500 flex-shrink-0">FL</span>
            <div className="w-0.5 h-8 rounded-full flex-shrink-0 bg-violet-500/60"></div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-zinc-300">
                <span className="hidden sm:inline">{race.fastestLap.rider.firstName} {race.fastestLap.rider.lastName}</span>
                <span className="sm:hidden">{race.fastestLap.rider.firstName.charAt(0)}. {race.fastestLap.rider.lastName}</span>
              </span>
            </div>
            <span className="text-sm font-mono tabular-nums text-violet-400 text-right w-20 flex-shrink-0">
              {race.fastestLap.time}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
