'use client';

import { useState } from 'react';

interface QualifyingResult {
  position: number;
  driverId: string;
  driverName?: string;
  gridPosition: number;
  q1Time?: string;
  q2Time?: string;
  q3Time?: string;
}

interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  teamId: string;
  photo: string;
}

interface QualifyingResultsProps {
  qualifying: QualifyingResult[];
  drivers?: Driver[];
}

type SessionType = 'Q1' | 'Q2' | 'Q3';

export function QualifyingResults({ qualifying, drivers = [] }: QualifyingResultsProps) {
  const [activeSession, setActiveSession] = useState<SessionType>('Q2');

  const getDriver = (driverId: string) => drivers.find(d => d.id === driverId);

  const sortedResults = [...qualifying].sort((a, b) => {
    if (activeSession === 'Q3') {
      const timeA = a.q3Time || '9:99.999';
      const timeB = b.q3Time || '9:99.999';
      return timeA.localeCompare(timeB);
    }
    if (activeSession === 'Q2') {
      const timeA = a.q2Time || '9:99.999';
      const timeB = b.q2Time || '9:99.999';
      return timeA.localeCompare(timeB);
    }
    const timeA = a.q1Time || '9:99.999';
    const timeB = b.q1Time || '9:99.999';
    return timeA.localeCompare(timeB);
  });

  const getSessionTime = (result: QualifyingResult) => {
    switch (activeSession) {
      case 'Q3': return result.q3Time || '—';
      case 'Q2': return result.q2Time || '—';
      case 'Q1': return result.q1Time || '—';
      default: return '—';
    }
  };

  const getGridBadgeColor = (position: number) => {
    if (position === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (position === 2) return 'bg-zinc-400/20 text-zinc-300 border-zinc-400/30';
    if (position === 3) return 'bg-amber-600/20 text-amber-400 border-amber-600/30';
    return 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50';
  };

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      {/* Header avec onglets */}
      <div className="px-4 pt-4 pb-0 border-b border-[var(--border-row)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-3.5 rounded-full bg-violet-500"></span>
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-violet-400">
              Qualifying
            </span>
          </div>
          <span className="text-xs text-zinc-500">Grid Positions</span>
        </div>

        {/* Onglets de session */}
        <div className="flex gap-1">
          {(['Q1', 'Q2'] as SessionType[]).map((session) => (
            <button
              key={session}
              onClick={() => setActiveSession(session)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all rounded-t-lg ${
                activeSession === session
                  ? 'bg-zinc-800 text-zinc-100 border-t border-x border-[var(--border-card)]'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
              }`}
            >
              {session}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des résultats */}
      <div className="divide-y divide-[var(--border-row)]">
        {/* En-têtes */}
        <div className="flex items-center px-4 py-2 text-xs text-zinc-500 font-mono uppercase bg-zinc-900/50">
          <span className="w-10">Pos</span>
          <span className="w-8">Grid</span>
          <span className="flex-1">Rider</span>
          <span className="w-20 text-right">Time</span>
        </div>

        {/* Lignes */}
        {sortedResults.map((result, index) => {
          const driver = getDriver(result.driverId);
          const name = driver?.name || result.driverName || result.driverId;
          const position = index + 1;
          const time = getSessionTime(result);
          const isEliminated = activeSession === 'Q1' && position > 12;

          return (
            <div
              key={result.driverId}
              className={`flex items-center px-4 py-3 gap-2 hover:bg-zinc-800/40 transition-colors ${
                isEliminated ? 'opacity-60' : ''
              }`}
            >
              <span className={`w-10 text-sm font-mono tabular-nums ${
                position === 1 ? 'text-yellow-400' :
                position === 2 ? 'text-zinc-300' :
                position === 3 ? 'text-amber-400' :
                'text-zinc-500'
              }`}>
                {position}
              </span>

              <span className={`w-8 px-1.5 py-0.5 rounded text-xs font-mono text-center border ${getGridBadgeColor(result.gridPosition)}`}>
                {result.gridPosition}
              </span>

              <div className="flex-1 min-w-0 flex items-center gap-3">
                <div
                  className="w-0.5 h-8 rounded-full"
                  style={{ backgroundColor: driver?.teamId === 'ducati-lenovo' ? '#DC0000' : '#666666' }}
                />
                <div>
                  <div className="text-sm text-zinc-100 font-medium">
                    {name}
                  </div>
                  {driver && <div className="text-xs text-zinc-500">#{driver.number} · {driver.team}</div>}
                </div>
              </div>

              <span className={`w-20 text-right text-sm font-mono tabular-nums ${
                position === 1 ? 'text-violet-400 font-medium' : 'text-zinc-300'
              }`}>
                {time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="px-4 py-3 border-t border-[var(--border-row)] bg-zinc-900/30">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
            Pole Position
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500/50"></span>
            Meilleur tour
          </span>
        </div>
      </div>
    </div>
  );
}
