'use client';

import { Driver } from '@/data/api';
import { Trophy, Clock, Zap, Flag } from 'lucide-react';

interface RaceResultsProps {
  results: Array<{
    position: number;
    driverId: string;
    time: string;
    gap: string;
    points: number;
    fastestLap?: boolean;
    status: 'finished' | 'dnf' | 'dns';
  }>;
  drivers: Driver[];
  fastestLap?: { driverId: string; time: string };
}

const RACE_POINTS = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export function RaceResults({ results, drivers, fastestLap }: RaceResultsProps) {
  const getDriver = (driverId: string) => drivers.find(d => d.id === driverId);

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
          <span className="text-xs text-zinc-500">Top 15 points</span>
        </div>
        <p className="text-sm text-zinc-400 mt-1">25-20-16-13-11-10-9-8-7-6-5-4-3-2-1 points</p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-[var(--border-row)] bg-gradient-to-b from-zinc-800/30 to-transparent">
        {sortedResults.slice(0, 3).map((result, index) => {
          const driver = getDriver(result.driverId);
          if (!driver) return null;

          const isWinner = index === 0;
          const position = index + 1;

          return (
            <div
              key={result.driverId}
              className={`relative flex flex-col items-center p-4 rounded-xl border ${
                isWinner
                  ? 'bg-yellow-500/10 border-yellow-500/30 order-2'
                  : position === 2
                  ? 'bg-zinc-400/10 border-zinc-400/30 order-1'
                  : 'bg-amber-600/10 border-amber-600/30 order-3'
              }`}
            >
              <div className={`mb-2 ${isWinner ? 'scale-125' : ''}`}>
                {isWinner ? (
                  <Trophy className="w-8 h-8 text-yellow-400" />
                ) : position === 2 ? (
                  <span className="text-lg font-mono font-bold text-zinc-300">2nd</span>
                ) : (
                  <span className="text-lg font-mono font-bold text-amber-400">3rd</span>
                )}
              </div>

              <img
                src={driver.photo}
                alt={driver.name}
                className={`w-14 h-14 rounded-full object-cover border-2 mb-2 ${
                  isWinner ? 'border-yellow-400/50' : 'border-zinc-600/50'
                }`}
              />

              <span className="text-xs text-zinc-500 font-mono">#{driver.number}</span>
              <span className="text-sm font-medium text-zinc-100 text-center leading-tight mt-0.5">
                {driver.name}
              </span>

              <div
                className="w-8 h-0.5 rounded-full mt-2"
                style={{ backgroundColor: driver.teamId === 'ducati-lenovo' ? '#DC0000' :
                  driver.teamId === 'aprilia-racing' ? '#9D0012' :
                  driver.teamId === 'ktm-factory' ? '#FF6600' :
                  driver.teamId === 'yamaha-factory' ? '#0000CC' :
                  driver.teamId === 'honda-hrc' ? '#CC0000' :
                  '#666666' }}
              />

              <div className="flex items-center gap-2 mt-3">
                <span className={`text-2xl font-mono font-bold ${
                  isWinner ? 'text-yellow-400' :
                  position === 2 ? 'text-zinc-300' :
                  'text-amber-400'
                }`}>
                  {result.points}
                </span>
                <span className="text-xs text-zinc-500">pts</span>
              </div>

              {result.fastestLap && (
                <div className="absolute top-2 right-2 bg-violet-500/20 rounded-full p-1">
                  <Zap className="w-3 h-3 text-violet-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tableau complet */}
      <div className="divide-y divide-[var(--border-row)]">
        {/* En-têtes */}
        <div className="hidden sm:flex items-center px-4 py-2 text-xs text-zinc-500 font-mono uppercase bg-zinc-900/50">
          <span className="w-10">Pos</span>
          <span className="flex-1">Rider</span>
          <span className="w-24 text-right">Time</span>
          <span className="w-16 text-right">Gap</span>
          <span className="w-16 text-right">Points</span>
        </div>

        {/* Lignes */}
        {sortedResults.slice(3).map((result) => {
          const driver = getDriver(result.driverId);
          if (!driver) return null;

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
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-700/50 hidden sm:block"
                />
                <div
                  className="w-0.5 h-8 rounded-full"
                  style={{ backgroundColor: driver.teamId === 'ducati-lenovo' ? '#DC0000' :
                    driver.teamId === 'aprilia-racing' ? '#9D0012' :
                    driver.teamId === 'ktm-factory' ? '#FF6600' :
                    driver.teamId === 'yamaha-factory' ? '#0000CC' :
                    driver.teamId === 'honda-hrc' ? '#CC0000' :
                    '#666666' }}
                />
                <div>
                  <div className="text-sm text-zinc-100 font-medium">{driver.name}</div>
                  <div className="text-xs text-zinc-500">#{driver.number} · {driver.team}</div>
                </div>
              </div>

              <div className="hidden sm:block w-24 text-right">
                <span className="text-sm font-mono tabular-nums text-zinc-300">{result.time}</span>
              </div>

              <div className="hidden sm:block w-16 text-right">
                <span className="text-xs font-mono tabular-nums text-zinc-500">{result.gap}</span>
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

      {/* Meilleur tour en course */}
      {fastestLap && (
        <div className="px-4 py-4 border-t border-[var(--border-row)] bg-violet-500/5">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-violet-500/20">
              <Zap className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-violet-400 font-mono uppercase tracking-wider">Fastest Lap</div>
              <div className="text-sm text-zinc-200">
                {getDriver(fastestLap.driverId)?.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono font-bold text-violet-400">
                {fastestLap.time}
              </div>
              <div className="text-xs text-zinc-500">
                {getDriver(fastestLap.driverId)?.team}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résumé course */}
      <div className="grid grid-cols-4 gap-px bg-[var(--border-row)] border-t border-[var(--border-row)]">
        <div className="bg-zinc-900/50 px-3 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Winner</div>
          <div className="text-sm font-medium text-zinc-300 truncate">
            {winner && getDriver(winner.driverId)?.name.split(' ').pop()}
          </div>
        </div>
        <div className="bg-zinc-900/50 px-3 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Race Time</div>
          <div className="text-sm font-mono text-zinc-300">{winner?.time}</div>
        </div>
        <div className="bg-zinc-900/50 px-3 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Margin</div>
          <div className="text-sm font-mono text-zinc-300">{sortedResults[1]?.gap || '—'}</div>
        </div>
        <div className="bg-zinc-900/50 px-3 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Laps</div>
          <div className="text-sm font-mono text-zinc-300">~25</div>
        </div>
      </div>
    </div>
  );
}
