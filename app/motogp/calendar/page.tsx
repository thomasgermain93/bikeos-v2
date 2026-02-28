import Link from 'next/link';
import { Header } from '@/components/Header';
import { getMotoGPRaces } from '@/data/api-compat';
import { format } from 'date-fns';

export const revalidate = 60;

export default async function MotoGPCalendarPage() {
  const races = await getMotoGPRaces();

  // Filtrer les courses principales (pas les sprints)
  const mainRaces = races.filter(r => r.raceType !== 'sprint');

  // Grouper par mois
  const racesByMonth: Record<string, typeof mainRaces> = {};
  mainRaces.forEach(race => {
    const date = new Date(race.date);
    const monthKey = format(date, 'MMMM yyyy');
    if (!racesByMonth[monthKey]) {
      racesByMonth[monthKey] = [];
    }
    racesByMonth[monthKey].push(race);
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Header Section */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/motogp" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                MotoGP
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">2026 Calendar</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  2026 Race Calendar
                </h1>
                <p className="text-zinc-500 mt-1">
                  FIM MotoGP World Championship — {mainRaces.length} Rounds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="space-y-12">
            {Object.entries(racesByMonth).map(([month, monthRaces]) => (
              <div key={month}>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-red-500"></span>
                  {month}
                </h2>
                <div className="space-y-3">
                  {monthRaces.map((race) => {
                    const raceDate = new Date(race.date);
                    const isUpcoming = race.status === 'upcoming';
                    const isFinished = race.status === 'finished';
                    const isLive = race.status === 'live';

                    return (
                      <Link
                        key={race.id}
                        href={`/motogp/race/${race.id}/`}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors group"
                      >
                        {/* Round Number */}
                        <div className="flex items-center gap-4 md:w-32 flex-shrink-0">
                          <span className="text-2xl font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">
                            {String(race.round).padStart(2, '0')}
                          </span>
                          <span className="text-xs text-zinc-500 uppercase tracking-wider md:hidden">
                            Round
                          </span>
                        </div>

                        {/* Race Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">
                            {race.name}
                          </h3>
                          <p className="text-sm text-zinc-500">
                            {race.circuit} · {race.location}, {race.country}
                          </p>
                        </div>

                        {/* Date */}
                        <div className="md:text-right md:w-40 flex-shrink-0">
                          <p className="text-sm font-mono text-zinc-300">
                            {format(raceDate, 'd MMM yyyy')}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {format(raceDate, 'HH:mm')} Local Time
                          </p>
                        </div>

                        {/* Status */}
                        <div className="md:w-24 flex-shrink-0 flex md:justify-end">
                          {isLive && (
                            <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium animate-pulse">
                              LIVE
                            </span>
                          )}
                          {isFinished && (
                            <span className="px-2 py-1 rounded-full bg-zinc-700 text-zinc-400 text-xs font-medium">
                              Finished
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                              Upcoming
                            </span>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="hidden md:block text-zinc-600 group-hover:text-zinc-400 transition-colors">
                          →
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 flex flex-wrap gap-6 text-xs text-zinc-500 border-t border-zinc-800 pt-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                Upcoming
              </span>
              <span>Race not yet started</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                LIVE
              </span>
              <span>Race in progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-zinc-700 text-zinc-400 text-xs">
                Finished
              </span>
              <span>Race completed</span>
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
