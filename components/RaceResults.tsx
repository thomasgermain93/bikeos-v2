'use client';

import { Driver } from '@/data/api';
import { Trophy, Clock, Zap, Flag } from 'lucide-react';

interface RaceResultsProps {
  results: Array<{
    position: number;
    driverId: string;
    driverName?: string;
    time: string;
    gap: string;
    points: number;
    fastestLap?: boolean;
    status: 'finished' | 'dnf' | 'dns';
  }>;
  drivers: Driver[];
  fastestLap?: { driverId: string; time: string } | null;
}

export function RaceResults({ results, drivers, fastestLap }: RaceResultsProps) {
  const sortedResults = [...results].sort((a, b) => a.position - b.position);
  const winner = sortedResults[0];

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-3.5 rounded-full bg-red-500"></span>
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-red-400">
              Race Results
            </span>
          </div>
        </div>
      </div>

      {/* Tableau complet */}
      <div className="divide-y divide-[var(--border-row)]">
        {/* En-têtes */}
        <div className="hidden sm:flex items-center px-4 py-2 text-xs text-zinc-500 font-mono uppercase bg-zinc-900/50">
          <span className="w-10">Pos</span>
          <span className="flex-1">Rider</span>
          <span className="w-24 text-right">Time</span>
          <span className="w-16 text-right">Points</span>
        </div>

        {/* Lignes */}
        {sortedResults.map((result) => {
          const isFastestLap = fastestLap?.driverId === result.driverId || result.fastestLap;

          return (
            <div
              key={result.driverId}
              className="flex items-center px-4 py-3 gap-3 hover:bg-zinc-800/40 transition-colors sm:gap-4"
            >
              <span className="w-8 sm:w-10 text-sm font-mono tabular-nums text-zinc-500">
                {result.position}
              </span>

              <div className="flex-1 min-w-0 flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: '#666666' }}
                />
                <div>
                  <div className="text-sm text-zinc-100 font-medium">{result.driverName || result.driverId}</div>
                </div>
              </div>

              <div className="hidden sm:block w-24 text-right">
                <span className="text-sm font-mono tabular-nums text-zinc-300">{result.time}</span>
              </div>

              <div className="flex items-center justify-end gap-2 w-20">
                <span className="text-sm font-mono font-medium text-red-400">
                  {result.points}
                </span>
                <span className="text-xs text-zinc-500 hidden sm:inline">pts</span>
                {isFastestLap && (
                  <Zap className="w-4 h-4 text-violet-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
