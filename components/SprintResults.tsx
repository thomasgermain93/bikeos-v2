'use client';

import { SprintResult, Driver } from '@/data/api';
import { Trophy, Clock, Zap } from 'lucide-react';

interface SprintResultsProps {
  results: SprintResult[];
  drivers: Driver[];
}

const SPRINT_POINTS = [12, 9, 7, 6, 5, 4, 3, 2, 1];

export function SprintResults({ results, drivers }: SprintResultsProps) {
  const getDriver = (driverId: string) => drivers.find(d => d.id === driverId);

  const sortedResults = [...results].sort((a, b) => a.position - b.position);

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-3.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-orange-400">
              Sprint Race
            </span>
          </div>
          <span className="text-xs text-zinc-500">Top 9 points</span>
        </div>
        <p className="text-sm text-zinc-400 mt-1">12-9-7-6-5-4-3-2-1 points distribution</p>
      </div>

      {/* Podium spécial pour Top 3 */}
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
                  <Trophy className="w-6 h-6 text-yellow-400" />
                ) : position === 2 ? (
                  <span className="text-lg font-mono font-bold text-zinc-300">2nd</span>
                ) : (
                  <span className="text-lg font-mono font-bold text-amber-400">3rd</span>
                )}
              </div>

              <img
                src={driver.photo}
                alt={driver.name}
                className={`w-12 h-12 rounded-full object-cover border-2 mb-2 ${
                  isWinner ? 'border-yellow-400/50' : 'border-zinc-600/50'
                }`}
              />

              <span className="text-xs text-zinc-500 font-mono">#{driver.number}</span>
              <span className="text-sm font-medium text-zinc-100 text-center leading-tight mt-0.5">
                {driver.name.split(' ').pop()}
              </span>

              <div
                className="w-6 h-0.5 rounded-full mt-2"
                style={{ backgroundColor: driver.teamId === 'ducati-lenovo' ? '#DC0000' :
                  driver.teamId === 'aprilia-racing' ? '#9D0012' :
                  driver.teamId === 'ktm-factory' ? '#FF6600' :
                  driver.teamId === 'yamaha-factory' ? '#0000CC' :
                  driver.teamId === 'honda-hrc' ? '#CC0000' :
                  '#666666' }}
              />

              <div className="flex items-center gap-1 mt-2">
                <span className={`text-lg font-mono font-bold ${
                  isWinner ? 'text-yellow-400' :
                  position === 2 ? 'text-zinc-300' :
                  'text-amber-400'
                }`}>
                  {result.points}
                </span>
                <span className="text-xs text-zinc-500">pts</span>
              </div>

              {result.fastestLap && (
                <div className="absolute top-2 right-2">
                  <Zap className="w-4 h-4 text-violet-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reste du classement */}
      <div className="divide-y divide-[var(--border-row)]">
        {sortedResults.slice(3).map((result) => {
          const driver = getDriver(result.driverId);
          if (!driver) return null;

          return (
            <div
              key={result.driverId}
              className="flex items-center px-4 py-3 gap-3 hover:bg-zinc-800/40 transition-colors"
            >
              <span className="w-8 text-sm font-mono tabular-nums text-zinc-500">
                {result.position}
              </span>

              <img
                src={driver.photo}
                alt={driver.name}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700/50"
              />

              <div
                className="w-0.5 h-6 rounded-full"
                style={{ backgroundColor: driver.teamId === 'ducati-lenovo' ? '#DC0000' :
                  driver.teamId === 'aprilia-racing' ? '#9D0012' :
                  driver.teamId === 'ktm-factory' ? '#FF6600' :
                  driver.teamId === 'yamaha-factory' ? '#0000CC' :
                  driver.teamId === 'honda-hrc' ? '#CC0000' :
                  '#666666' }}
              />

              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-100 font-medium">{driver.name}</div>
                <div className="text-xs text-zinc-500">#{driver.number} · {driver.team}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono">{result.time}</span>
                  <span className="text-zinc-600 ml-1">({result.gap})</span>
                </div>

                <div className="flex items-center gap-1 w-16 justify-end">
                  <span className="text-sm font-mono font-medium text-orange-400">
                    {result.points}
                  </span>
                  <span className="text-xs text-zinc-500">pts</span>
                </div>

                {result.fastestLap && (
                  <Zap className="w-4 h-4 text-violet-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-px bg-[var(--border-row)] border-t border-[var(--border-row)]">
        <div className="bg-zinc-900/50 px-4 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Winner</div>
          <div className="text-sm font-medium text-zinc-300">
            {getDriver(sortedResults[0]?.driverId)?.name.split(' ').pop()}
          </div>
        </div>
        <div className="bg-zinc-900/50 px-4 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Best Lap</div>
          <div className="text-sm font-mono text-violet-400">
            {sortedResults.find(r => r.fastestLap)?.time || sortedResults[0]?.time}
          </div>
        </div>
        <div className="bg-zinc-900/50 px-4 py-3 text-center">
          <div className="text-xs text-zinc-500 mb-1">Distance</div>
          <div className="text-sm font-medium text-zinc-300">~100 km</div>
        </div>
      </div>
    </div>
  );
}
