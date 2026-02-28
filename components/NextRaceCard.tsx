import Link from 'next/link';
import { format } from 'date-fns';
import { Countdown } from './Countdown';
import { Race } from '@/types';

interface NextRaceCardProps {
  race: Race;
}

const SERIES_COLORS: Record<string, { accent: string; bg: string; label: string }> = {
  motogp: { accent: '#ef4444', bg: '#ef444418', label: 'MotoGP' },
  wsbk: { accent: '#3b82f6', bg: '#3b82f618', label: 'WSBK' },
  mxgp: { accent: '#8B4513', bg: '#8B451318', label: 'MXGP' },
  mx2: { accent: '#228B22', bg: '#228B2218', label: 'MX2' },
};

export function NextRaceCard({ race }: NextRaceCardProps) {
  const raceDate = new Date(race.date);
  const seriesColors = SERIES_COLORS[race.type] || SERIES_COLORS.motogp;
  const accentColor = seriesColors.accent;
  const bgColor = seriesColors.bg;

  return (
    <Link
      href={`/${race.type}/race/${race.id}/`}
      className="flex flex-col h-full border border-[var(--border-card)] rounded-xl bg-zinc-900 p-6 hover:bg-zinc-800/40 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-mono font-medium uppercase tracking-widest px-1.5 py-0.5 rounded"
          style={{ color: accentColor, backgroundColor: bgColor }}
        >
          {seriesColors.label}
        </span>
        <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
          Rd {race.round} · 2026
        </span>
      </div>
      <h2 className="text-2xl font-semibold text-white tracking-tight leading-tight mb-1">
        {race.name}
      </h2>
      <p className="text-sm text-zinc-500 mb-5">
        {race.circuit} · {race.location}
      </p>
      <Countdown targetDate={race.date} />
      <div className="flex-1"></div>
      <p className="text-xs font-mono tabular-nums text-zinc-600 mt-3">
        {format(raceDate, 'EEE, d MMM yyyy')}
      </p>
    </Link>
  );
}
