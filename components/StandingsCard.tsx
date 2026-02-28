import Link from 'next/link';
import { Standing } from '@/types';

interface StandingsCardProps {
  standings: Standing[];
  type: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
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
  'Husqvarna': '#0066CC',
  'GasGas': '#CC0000',
  'Fantic': '#00CED1',
  'Beta': '#DC2626',
  'Kawasaki': '#00CC00',
};

const SERIES_COLORS: Record<string, string> = {
  motogp: '#ef4444',
  moto2: '#FF6600',
  moto3: '#00CC00',
  wsbk: '#3b82f6',
  mxgp: '#8B4513',
  mx2: '#228B22',
};

const SERIES_LABELS: Record<string, string> = {
  motogp: 'MotoGP',
  moto2: 'Moto2',
  moto3: 'Moto3',
  wsbk: 'WSBK',
  mxgp: 'MXGP',
  mx2: 'MX2',
};

function getTeamColor(teamName: string): string {
  for (const [team, color] of Object.entries(TEAM_COLORS)) {
    if (teamName.toLowerCase().includes(team.toLowerCase())) return color;
  }
  return '#666666';
}

export function StandingsCard({ standings, type }: StandingsCardProps) {
  const accentColor = SERIES_COLORS[type] || '#ef4444';

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
            <span className="text-xs font-mono font-medium uppercase tracking-widest" style={{ color: accentColor }}>
              {SERIES_LABELS[type] || type.toUpperCase()}
            </span>
          </div>
          <Link
            href={`/${type}/standings/`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center -mr-2 px-2 py-3 -my-3 flex-shrink-0"
          >
            View all →
          </Link>
        </div>
        <div className="mt-1.5">
          <span className="text-sm font-medium text-zinc-400">Driver Standings</span>
          <span className="text-zinc-600 text-xs ml-2">· 2026</span>
        </div>
      </div>
      <div>
        {standings.slice(0, 5).map((standing) => {
          const teamColor = getTeamColor(standing.rider.team.name);
          let rowBgClass = '';
          if (standing.position === 1) {
            rowBgClass = 'bg-yellow-500/5';
          } else if (standing.position === 2) {
            rowBgClass = 'bg-zinc-400/5';
          } else if (standing.position === 3) {
            rowBgClass = 'bg-amber-600/5';
          }

          return (
            <div
              key={standing.rider.id}
              className={`flex items-center px-4 py-3 gap-4 min-h-[52px] border-b border-[var(--border-row)] hover:bg-zinc-800/40 transition-colors ${rowBgClass}`}
            >
              <span
                className={`w-5 text-xs font-mono tabular-nums flex-shrink-0 ${
                  standing.position === 1
                    ? 'text-yellow-500'
                    : standing.position === 2
                    ? 'text-zinc-400'
                    : standing.position === 3
                    ? 'text-amber-500'
                    : 'text-zinc-500'
                }`}
              >
                {standing.position}
              </span>
              <div
                className="w-0.5 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: teamColor, opacity: 0.8 }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-100">
                  <span className="hidden sm:inline">
                    {standing.rider.firstName} {standing.rider.lastName}
                  </span>
                  <span className="sm:hidden">
                    {standing.rider.firstName.charAt(0)}. {standing.rider.lastName}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 truncate">{standing.rider.team.name}</div>
              </div>
              <span className="text-sm font-mono tabular-nums text-right w-10 flex-shrink-0 text-zinc-400">
                {standing.points}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
