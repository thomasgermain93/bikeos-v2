'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { QualifyingResults } from '@/components/QualifyingResults';
import { SprintResults } from '@/components/SprintResults';
import { RaceResults } from '@/components/RaceResults';
import {
  getRoundById,
  getRaceResults,
  getAllDrivers,
  getCalendar,
} from '@/data/api';
import { format } from 'date-fns';
import { Trophy, Clock, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RacePageProps {
  params: { id: string };
}

export default function RacePage({ params }: RacePageProps) {
  const [activeTab, setActiveTab] = useState<'qualifying' | 'sprint' | 'race'>('race');

  // Récupérer les données
  const round = getRoundById(params.id);
  const raceData = getRaceResults(params.id);
  const drivers = getAllDrivers();

  if (!round) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">Race not found</h1>
            <p className="text-zinc-500 mb-4">The race you are looking for does not exist.</p>
            <Link href="/motogp" className="text-red-400 hover:text-red-300 transition-colors">
              ← Back to MotoGP
            </Link>
          </div>
        </main>
      </>
    );
  }

  const raceDate = new Date(round.dates.race);
  const hasSprint = raceData?.sprint && raceData.sprint.length > 0;
  const hasQualifying = raceData?.qualifying && raceData.qualifying.length > 0;
  const hasRace = raceData?.race && raceData.race.length > 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero de la course */}
        <div className="border-b border-[var(--border-section)]">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/motogp"
                className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to MotoGP
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href={`/motogp/race/round-${round.round - 1}`}
                  className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link
                  href={`/motogp/race/round-${round.round + 1}`}
                  className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Info course */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 rounded-full bg-red-500"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                Round {round.round} · 2026 Season
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                round.status === 'finished' ? 'bg-emerald-500/20 text-emerald-400' :
                round.status === 'live' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                'bg-zinc-700/50 text-zinc-400'
              }`}>
                {round.status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              {round.name}
            </h1>

            {/* Détails circuit */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{round.circuit.location}, {round.circuit.country}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span>{format(raceDate, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Trophy className="w-4 h-4 text-zinc-500" />
                <span>{round.circuit.length} km</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>{round.circuit.turns} turns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Onglets */}
          <div className="flex items-center gap-1 mb-6 border-b border-[var(--border-row)]">
            {hasQualifying && (
              <button
                onClick={() => setActiveTab('qualifying')}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === 'qualifying'
                    ? 'text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Qualifying
                {activeTab === 'qualifying' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"></span>
                )}
              </button>
            )}
            {hasSprint && (
              <button
                onClick={() => setActiveTab('sprint')}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === 'sprint'
                    ? 'text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Sprint Race
                {activeTab === 'sprint' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></span>
                )}
              </button>
            )}
            {hasRace && (
              <button
                onClick={() => setActiveTab('race')}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === 'race'
                    ? 'text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Race
                {activeTab === 'race' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></span>
                )}
              </button>
            )}
          </div>

          {/* Contenu des onglets */}
          <div className="space-y-6">
            {activeTab === 'qualifying' && hasQualifying && raceData && (
              <QualifyingResults
                qualifying={raceData.qualifying}
                drivers={drivers}
              />
            )}

            {activeTab === 'sprint' && hasSprint && raceData && (
              <SprintResults
                results={raceData.sprint}
                drivers={drivers}
              />
            )}

            {activeTab === 'race' && hasRace && raceData && (
              <RaceResults
                results={raceData.race}
                drivers={drivers}
                fastestLap={raceData.fastestLap}
              />
            )}
          </div>

          {/* Résumé de la course */}
          {hasRace && raceData && (
            <div className="mt-10">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-zinc-500"></span>
                Race Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Winner */}
                <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 p-4">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Winner</div>
                  {(() => {
                    const winner = raceData.race[0];
                    const winnerDriver = drivers.find(d => d.id === winner.driverId);
                    return winnerDriver ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={winnerDriver.photo}
                          alt={winnerDriver.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/50"
                        />
                        <div>
                          <div className="text-lg font-medium text-zinc-100">{winnerDriver.name}</div>
                          <div className="text-sm text-zinc-500">{winnerDriver.team}</div>
                          <div className="text-sm font-mono text-yellow-400 mt-1">{winner.points} points</div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Fastest Lap */}
                {raceData.fastestLap && (
                  <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 p-4">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Fastest Lap</div>
                    {(() => {
                      const flDriver = drivers.find(d => d.id === raceData.fastestLap?.driverId);
                      return flDriver ? (
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-violet-400" />
                          </div>
                          <div>
                            <div className="text-lg font-medium text-zinc-100">{flDriver.name}</div>
                            <div className="text-sm text-zinc-500">{flDriver.team}</div>
                            <div className="text-lg font-mono text-violet-400 mt-1">{raceData.fastestLap.time}</div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                {/* Circuit Record */}
                <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 p-4">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Circuit Record</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div>
                      <div className="text-lg font-medium text-zinc-100">{round.circuit.lapRecord.rider}</div>
                      <div className="text-sm text-zinc-500">{round.circuit.lapRecord.year}</div>
                      <div className="text-lg font-mono text-zinc-300 mt-1">{round.circuit.lapRecord.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Programme du weekend */}
          <div className="mt-10">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
              Weekend Schedule
            </h2>

            <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
              {[
                { label: 'Practice 1', date: round.dates.practice1 },
                { label: 'Practice 2', date: round.dates.practice2 },
                { label: 'Practice 3', date: round.dates.practice3 },
                { label: 'Qualifying', date: round.dates.qualifying, highlight: true },
                { label: 'Sprint Race', date: round.dates.sprint, highlight: true },
                { label: 'Race', date: round.dates.race, highlight: true },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-row)] last:border-0"
                >
                  <span className={`text-sm ${item.highlight ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                    {item.label}
                  </span>
                  <span className="text-sm font-mono text-zinc-500">
                    {format(new Date(item.date), 'EEE, MMM d · HH:mm')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. MotoGP Race Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: Dorna Sports
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
