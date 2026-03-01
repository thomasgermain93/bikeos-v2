'use client';

import { Trophy, Clock } from 'lucide-react';
import { getMotoGPSprintResults, getQualifyingGrid } from '@/data/api-compat';
import { useState, useEffect } from 'react';
import { RaceResult } from '@/types';

interface LastResultsProps {
  showSprint?: boolean;
  showGrid?: boolean;
}

export function LastResults({ showSprint = true, showGrid = true }: LastResultsProps) {
  const [sprintResults, setSprintResults] = useState<RaceResult[]>([]);
  const [qualifyingGrid, setQualifyingGrid] = useState<RaceResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sprint = await getMotoGPSprintResults();
      const grid = await getQualifyingGrid();
      setSprintResults(sprint);
      setQualifyingGrid(grid);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Résultats Sprint */}
      {showSprint && sprintResults.length > 0 && (
        <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
          <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-mono font-medium uppercase tracking-widest text-orange-500">
                  Sprint Results
                </span>
              </div>
              <span className="text-xs text-zinc-500">Last Session</span>
            </div>
          </div>
          <div className="divide-y divide-[var(--border-row)]">
            {sprintResults.slice(0, 5).map((result, index: number) => (
              <div
                key={index}
                className={`flex items-center px-4 py-3 gap-4 ${
                  index === 0 ? 'bg-yellow-500/5' : 
                  index === 1 ? 'bg-zinc-400/5' : 
                  index === 2 ? 'bg-amber-600/5' : ''
                }`}
              >
                <span className={`w-6 text-xs font-mono tabular-nums flex-shrink-0 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-zinc-400' :
                  index === 2 ? 'text-amber-500' :
                  'text-zinc-500'
                }`}>
                  {result.position}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{result.rider.firstName} {result.rider.lastName}</p>
                  <p className="text-xs text-zinc-500 truncate">
                    {typeof result.team === 'string' ? result.team : result.team?.name || 'Independent'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-zinc-400">{result.time}</p>
                </div>
                <div className="w-8 text-right">
                  <span className="text-xs font-mono text-orange-400">+{result.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grille de départ */}
      {showGrid && qualifyingGrid.length > 0 && (
        <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
          <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-500" />
                <span className="text-xs font-mono font-medium uppercase tracking-widest text-violet-500">
                  Starting Grid
                </span>
              </div>
              <span className="text-xs text-zinc-500">Qualifying</span>
            </div>
          </div>
          <div className="divide-y divide-[var(--border-row)]">
            {qualifyingGrid.slice(0, 6).map((grid, index: number) => (
              <div
                key={index}
                className={`flex items-center px-4 py-3 gap-4 ${
                  index === 0 ? 'bg-violet-500/5' : ''
                }`}
              >
                <span className={`w-6 text-xs font-mono tabular-nums flex-shrink-0 ${
                  index === 0 ? 'text-violet-400' : 'text-zinc-500'
                }`}>
                  P{grid.position}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{grid.rider.firstName} {grid.rider.lastName}</p>
                  <p className="text-xs text-zinc-500 truncate">
                    {typeof grid.team === 'string' ? grid.team : grid.team?.name || 'Independent'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-zinc-400">{grid.time}</p>
                  {grid.gap && <p className="text-xs text-zinc-600">{grid.gap}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
