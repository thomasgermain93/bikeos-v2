import Link from 'next/link';
import { format } from 'date-fns';
import { Countdown } from './Countdown';
import { Race } from '@/types';

interface NextRaceCardProps {
  race: Race;
}

export function NextRaceCard({ race }: NextRaceCardProps) {
  const raceDate = new Date(race.date);
  const isMotoGP = race.type === 'motogp';
  const accentColor = isMotoGP ? '#ef4444' : '#3b82f6';
  const bgColor = isMotoGP ? '#ef444418' : '#3b82f618';

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
          {isMotoGP ? 'MotoGP' : 'WSBK'}
        </span>
        <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
          Rd {race.round} · 2025
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
