'use client';

import { Trophy, Clock, Zap } from 'lucide-react';

interface SprintResult {
  position: number;
  driverId: string;
  driverName?: string;
  time: string;
  gap: string;
  points: number;
  fastestLap?: boolean;
}

interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  teamId: string;
  photo: string;
}

interface SprintResultsProps {
  results: SprintResult[];
  drivers?: Driver[];
}

export function SprintResults({ results, drivers = [] }: SprintResultsProps) {
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

      {/* Reste du classement */}
      <div className="divide-y divide-[var(--border-row)]">
        {/* En-têtes */}
        <div className="hidden sm:flex items-center px-4 py-2 text-xs text-zinc-500 font-mono uppercase bg-zinc-900/50">
          <span className="w-10">Pos</span>
          <span className="flex-1">Rider</span>
          <span className="w-24 text-right">Time</span>
          <span className="w-16 text-right">Points</span>
        </div>

        {sortedResults.map((result) => {
          const driver = getDriver(result.driverId);
          const name = driver?.name || result.driverName || result.driverId;

          return (
            <div
              key={result.driverId}
              className="flex items-center px-4 py-3 gap-3 hover:bg-zinc-800/40 transition-colors"
            >
              <span className="w-8 text-sm font-mono tabular-nums text-zinc-500">
                {result.position}
              </span>

              {driver?.photo ? (
                <img
                    src={driver.photo}
                    alt={name}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-700/50"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 border border-zinc-700/50">
                    {name.substring(0, 2).toUpperCase()}
                </div>
              )}

              <div
                className="w-0.5 h-6 rounded-full"
                style={{ backgroundColor: driver?.teamId === 'ducati-lenovo' ? '#DC0000' : '#666666' }}
              />

              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-100 font-medium">{name}</div>
                {driver && (
                    <div className="text-xs text-zinc-500">#{driver.number} · {driver.team}</div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono">{result.time}</span>
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
    </div>
  );
}
