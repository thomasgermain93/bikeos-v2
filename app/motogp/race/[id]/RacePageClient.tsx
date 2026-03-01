'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { QualifyingResults } from '@/components/QualifyingResults';
import { SprintResults } from '@/components/SprintResults';
import { RaceResults } from '@/components/RaceResults';
import {
  getRoundById,
  getRaceResults,
} from '@/data/api';
import { format, subDays, addHours } from 'date-fns';
import { Trophy, Clock, MapPin, Calendar, ChevronLeft, ChevronRight, Info, Timer, Navigation2 } from 'lucide-react';
import Link from 'next/link';

interface RacePageProps {
  params: { id: string };
}

export default function RacePage({ params }: RacePageProps) {
  const [activeTab, setActiveTab] = useState<'qualifying' | 'sprint' | 'race'>('race');
  const [round, setRound] = useState<any>(null);
  const [raceData, setRaceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await getRoundById(params.id);
        const rd = await getRaceResults(params.id);
        setRound(r);
        setRaceData(rd);
        // Default to race tab, but if only sprint exists (unlikely here), switch
        if (rd?.race?.length > 0) setActiveTab('race');
        else if (rd?.sprint?.length > 0) setActiveTab('sprint');
        else if (rd?.qualifying?.length > 0) setActiveTab('qualifying');
      } catch (error) {
        console.error("Error fetching race data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
        <>
          <Header />
          <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Loading session data...</div>
            </div>
          </main>
        </>
      );
  }

  if (!round) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">Race not found</h1>
            <p className="text-zinc-500 mb-4">The race you are looking for does not exist or data is temporarily unavailable.</p>
            <Link href="/motogp" className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back to MotoGP
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

  // Calculer le programme du weekend si non fourni
  const schedule = [
    { name: 'Free Practice 1', date: subDays(raceDate, 2), time: '10:45' },
    { name: 'Practice', date: subDays(raceDate, 2), time: '15:00' },
    { name: 'Free Practice 2', date: subDays(raceDate, 1), time: '10:10' },
    { name: 'Qualifying', date: subDays(raceDate, 1), time: '10:50' },
    { name: 'Sprint Race', date: subDays(raceDate, 1), time: '15:00' },
    { name: 'Grand Prix', date: raceDate, time: '14:00' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero de la course */}
        <div className="border-b border-[var(--border-section)] bg-gradient-to-b from-zinc-900/50 to-transparent">
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
            </div>

            {/* Info course */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 rounded-full bg-red-500"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                Round {round.round}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                round.status === 'finished' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                round.status === 'live' ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/20' :
                'bg-zinc-700/50 text-zinc-400 border border-zinc-600/20'
              }`}>
                {round.status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-zinc-100 mb-6 tracking-tight">
              {round.name}
            </h1>

            {/* Détails circuit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div>
                    <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Location</div>
                    <div className="text-zinc-200">{round.circuit.location}, {round.circuit.country}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <Calendar className="w-4 h-4 text-red-500" />
                </div>
                <div>
                    <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Race Date</div>
                    <div className="text-zinc-200">{format(raceDate, 'MMMM d, yyyy')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <Timer className="w-4 h-4 text-red-500" />
                </div>
                <div>
                    <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Track</div>
                    <div className="text-zinc-200 truncate max-w-[150px]">{round.circuit.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <Navigation2 className="w-4 h-4 text-red-500" />
                </div>
                <div>
                    <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Sessions</div>
                    <div className="text-zinc-200">Full Weekend</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Colonne de gauche: Résultats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Onglets de résultats */}
              <div>
                <div className="flex items-center gap-1 mb-6 border-b border-[var(--border-row)]">
                    <button
                        onClick={() => setActiveTab('race')}
                        disabled={!hasRace}
                        className={`px-6 py-3 text-sm font-medium transition-all relative ${
                        activeTab === 'race'
                            ? 'text-zinc-100'
                            : 'text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed'
                        }`}
                    >
                        Main Race
                        {activeTab === 'race' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('sprint')}
                        disabled={!hasSprint}
                        className={`px-6 py-3 text-sm font-medium transition-all relative ${
                        activeTab === 'sprint'
                            ? 'text-zinc-100'
                            : 'text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed'
                        }`}
                    >
                        Sprint
                        {activeTab === 'sprint' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('qualifying')}
                        disabled={!hasQualifying}
                        className={`px-6 py-3 text-sm font-medium transition-all relative ${
                        activeTab === 'qualifying'
                            ? 'text-zinc-100'
                            : 'text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed'
                        }`}
                    >
                        Qualifying
                        {activeTab === 'qualifying' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"></span>
                        )}
                    </button>
                </div>

                <div className="space-y-6">
                    {activeTab === 'race' && hasRace && (
                        <RaceResults
                            results={raceData.race}
                            drivers={[]}
                            fastestLap={raceData.fastestLap}
                        />
                    )}
                    {activeTab === 'sprint' && hasSprint && (
                        <SprintResults
                            results={raceData.sprint}
                            drivers={[]}
                        />
                    )}
                    {activeTab === 'qualifying' && hasQualifying && (
                        <QualifyingResults
                            qualifying={raceData.qualifying}
                            drivers={[]}
                        />
                    )}

                    {!hasRace && !hasSprint && !hasQualifying && (
                        <div className="p-12 border border-dashed border-zinc-800 rounded-2xl text-center">
                            <Info className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-zinc-300 font-medium mb-1">No results yet</h3>
                            <p className="text-zinc-500 text-sm">Results will be available after the session finishes.</p>
                        </div>
                    )}
                </div>
              </div>

              {/* Circuit Info Section */}
              <div className="pt-10 border-t border-zinc-800/50">
                 <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                    <Navigation2 className="w-5 h-5 text-red-500" />
                    Circuit Information
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
                        <div className="text-zinc-500 text-xs uppercase font-mono tracking-widest mb-4">Track Stats</div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                                <span className="text-zinc-400 text-sm">Track Name</span>
                                <span className="text-zinc-100 font-medium">{round.circuit.name}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                                <span className="text-zinc-400 text-sm">Location</span>
                                <span className="text-zinc-100">{round.circuit.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 text-sm">Country</span>
                                <span className="text-zinc-100">{round.circuit.country}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/10">
                        <div className="text-red-400 text-xs uppercase font-mono tracking-widest mb-4">Event Status</div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                            This event is currently <span className="text-zinc-100 font-medium">{round.status}</span>.
                            Official results are provided by TheSportsDB and updated dynamically.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 text-zinc-300 text-[10px] uppercase font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Data Feed Active
                        </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Colonne de droite: Schedule & Info */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
                <h3 className="text-sm font-bold text-zinc-100 mb-6 flex items-center gap-2 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-red-500" />
                  Weekend Schedule
                </h3>
                <div className="space-y-4">
                  {schedule.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${item.date > new Date() ? 'bg-zinc-700' : 'bg-red-500'}`}></div>
                        {i < schedule.length - 1 && <div className="w-0.5 h-10 bg-zinc-800/50 my-1"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <span className={`text-sm font-medium ${item.date > new Date() ? 'text-zinc-400' : 'text-zinc-100'}`}>
                            {item.name}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">{item.time}</span>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">
                          {format(item.date, 'EEEE, MMM d')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-800/50">
                    <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                        * All times are local to the circuit. Schedule is subject to change based on track conditions.
                    </p>
                </div>
              </div>

              {/* Promo / Info additionnelle */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="text-sm font-bold text-zinc-100 mb-2">Championship Impact</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                      Every point counts. The winner of the Grand Prix receives 25 points, while the Sprint winner takes 12 points.
                  </p>
                  <Link href="/motogp" className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1">
                      View full standings <ChevronRight className="w-3 h-3" />
                  </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-12 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white font-bold text-xs italic">B</div>
                  <div>
                    <p className="text-sm text-zinc-200 font-medium">BikeOS MotoGP Tracker</p>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Precision Motorsport Data</p>
                  </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs text-zinc-600 mb-1">
                    © {new Date().getFullYear()} BikeOS. All rights reserved.
                </p>
                <p className="text-[10px] text-zinc-600">
                    MotoGP data provided by <a href="https://www.thesportsdb.com" target="_blank" className="hover:text-zinc-400 transition-colors underline">TheSportsDB</a>.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
