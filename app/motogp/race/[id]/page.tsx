import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { getMotoGPRaceById, getMotoGPStandings, getMotoGPRaces } from '@/data/api';
import { format } from 'date-fns';

export const revalidate = 60;

// Generate static params for all races
export async function generateStaticParams() {
  const races = await getMotoGPRaces();
  return races.map((race) => ({
    id: race.id,
  }));
}

interface RacePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RaceDetailPage({ params }: RacePageProps) {
  const { id } = await params;
  const [race, standings, allRaces] = await Promise.all([
    getMotoGPRaceById(id),
    getMotoGPStandings(),
    getMotoGPRaces(),
  ]);

  if (!race) {
    notFound();
  }

  const raceDate = new Date(race.date);
  const isUpcoming = race.status === 'upcoming';
  const isFinished = race.status === 'finished';
  const isLive = race.status === 'live';
  
  // Trouver la course précédente et suivante
  const currentIndex = allRaces.findIndex(r => r.id === id);
  const prevRace = currentIndex > 0 ? allRaces[currentIndex - 1] : null;
  const nextRace = currentIndex < allRaces.length - 1 ? allRaces[currentIndex + 1] : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Race Header */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/motogp" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                MotoGP
              </Link>
              <span className="text-zinc-600">/</span>
              <Link href="/motogp/calendar" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                Calendar
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">Round {race.round}</span>
            </nav>

            {/* Race Info */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Round {race.round} · 2026
                  </span>
                  {isLive && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium animate-pulse">
                      LIVE
                    </span>
                  )}
                  {isFinished && (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400 text-xs font-medium">
                      Finished
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {race.name}
                </h1>
                <p className="text-zinc-400 mt-2">
                  {race.circuit} · {race.location}, {race.country}
                </p>
              </div>

              {/* Date & Time */}
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-white">
                  {format(raceDate, 'd MMM yyyy')}
                </p>
                <p className="text-zinc-500">
                  {format(raceDate, 'HH:mm')} Local Time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Race Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Circuit Info */}
              <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Circuit Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Circuit</p>
                    <p className="text-sm text-zinc-300 mt-1">{race.circuit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-zinc-300 mt-1">{race.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Country</p>
                    <p className="text-sm text-zinc-300 mt-1">{race.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Round</p>
                    <p className="text-sm text-zinc-300 mt-1">{race.round} of 22</p>
                  </div>
                </div>
              </div>

              {/* Session Schedule */}
              <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Weekend Schedule</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                      <span className="text-zinc-300">Practice 1</span>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono">
                      {format(new Date(raceDate.getTime() - 2 * 24 * 60 * 60 * 1000), 'EEE HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                      <span className="text-zinc-300">Practice 2</span>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono">
                      {format(new Date(raceDate.getTime() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), 'EEE HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      <span className="text-zinc-300">Qualifying</span>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono">
                      {format(new Date(raceDate.getTime() - 1 * 24 * 60 * 60 * 1000), 'EEE HH:mm')}
                    </span>
                  </div>
                  {race.raceType === 'sprint' ? (
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-zinc-300 font-medium">Sprint Race</span>
                      </div>
                      <span className="text-sm text-white font-mono">
                        {format(raceDate, 'EEE HH:mm')}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          <span className="text-zinc-300">Sprint Race</span>
                        </div>
                        <span className="text-sm text-zinc-500 font-mono">
                          {format(new Date(raceDate.getTime() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), 'EEE HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          <span className="text-zinc-300 font-medium">Main Race</span>
                        </div>
                        <span className="text-sm text-white font-mono">
                          {format(raceDate, 'EEE HH:mm')}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {prevRace ? (
                  <Link
                    href={`/motogp/race/${prevRace.id}`}
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <span>←</span>
                    <span>Previous Race</span>
                  </Link>
                ) : (
                  <div></div>
                )}
                {nextRace ? (
                  <Link
                    href={`/motogp/race/${nextRace.id}`}
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <span>Next Race</span>
                    <span>→</span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* Right Column - Championship Standings */}
            <div>
              <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <h3 className="text-sm font-medium text-zinc-300">Championship Standings</h3>
                </div>
                <div>
                  {standings.slice(0, 10).map((standing) => {
                    const teamColor = standing.rider.team.color;
                    let rowBgClass = '';
                    if (standing.position === 1) rowBgClass = 'bg-yellow-500/5';
                    else if (standing.position === 2) rowBgClass = 'bg-zinc-400/5';
                    else if (standing.position === 3) rowBgClass = 'bg-amber-600/5';

                    return (
                      <div
                        key={standing.rider.id}
                        className={`flex items-center px-4 py-3 gap-3 border-b border-zinc-800/50 ${rowBgClass}`}
                      >
                        <span
                          className={`text-xs font-mono w-5 ${
                            standing.position === 1
                              ? 'text-yellow-500'
                              : standing.position === 2
                              ? 'text-zinc-400'
                              : standing.position === 3
                              ? 'text-amber-500'
                              : 'text-zinc-500'
                          }`}
                        >
                          {standing.position}
                        </span>
                        <div
                          className="w-0.5 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: teamColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-zinc-200 truncate">
                            {standing.rider.firstName.charAt(0)}. {standing.rider.lastName}
                          </div>
                          <div className="text-xs text-zinc-500 truncate">
                            {standing.rider.team.shortName}
                          </div>
                        </div>
                        <span className="text-sm font-mono text-zinc-400">
                          {standing.points}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-3 border-t border-zinc-800">
                  <Link
                    href="/motogp/standings"
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    View full standings →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-800 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. Live MotoGP Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: Dorna Sports, PulseLive
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
