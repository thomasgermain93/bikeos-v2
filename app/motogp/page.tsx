import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { CalendarCard } from '@/components/CalendarCard';
import { getNextMotoGPRaces, getLastMotoGPRace, getMotoGPStandings, getMotoGPSprintResults, getMotoGPCalendar, getQualifyingGrid, getMotoGPNews } from '@/data/api-compat';

export const revalidate = 60;

export default async function MotoGPPage() {
  const [nextRaces, lastRace, standings, calendar, news] = await Promise.all([
    getNextMotoGPRaces(),
    getLastMotoGPRace(),
    getMotoGPStandings(),
    getMotoGPCalendar(),
    getMotoGPNews(),
  ]);

  const nextRace = nextRaces[0] || null;
  
  // Récupérer les résultats de la sprint et la grille de départ (peuvent être vides selon TheSportsDB)
  const sprintResults = await getMotoGPSprintResults();
  const qualifyingGrid = await getQualifyingGrid();

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero */}
        <HeroSection
          title="MotoGP"
          subtitle="FIM Road Racing World Championship Grand Prix — The premier class of motorcycle racing."
          nextRaceDate={nextRace?.date}
          raceName={nextRace?.name}
          raceLocation={`${nextRace?.circuit} · ${nextRace?.location}`}
          accentColor="#ef4444"
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — MotoGP Live Data</h1>

          {/* Résultats récents - Sprint et Grille (si dispo) */}
          {(sprintResults.length > 0 || qualifyingGrid.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
              {/* Résultats Sprint */}
              {sprintResults.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3 rounded-full bg-orange-500 inline-block"></span>
                      Last Sprint Results
                    </h2>
                  </div>
                  <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
                    <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)] flex justify-between items-center">
                      <span className="text-xs font-mono text-orange-500 uppercase tracking-widest">Sprint Session</span>
                      <span className="text-xs text-zinc-500">Top 5</span>
                    </div>
                    <div className="divide-y divide-[var(--border-row)]">
                      {sprintResults.slice(0, 5).map((result, index: number) => (
                        <div key={index} className={`flex items-center px-4 py-3 gap-4 ${index < 3 ? 'bg-gradient-to-r from-orange-500/5 to-transparent' : ''}`}>
                          <span className={`w-6 text-xs font-mono tabular-nums flex-shrink-0 ${
                            index === 0 ? 'text-yellow-500' : index === 1 ? 'text-zinc-300' : index === 2 ? 'text-amber-500' : 'text-zinc-500'
                          }`}>{result.position}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {result.rider.firstName} {result.rider.lastName}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                                {typeof result.team === 'string' ? result.team : result.team?.name || 'Independent'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-mono text-zinc-400">{result.time}</p>
                            {result.gap && result.gap !== '-' && <p className="text-xs text-zinc-600">{result.gap}</p>}
                          </div>
                          <div className="w-10 text-right">
                            <span className="text-xs font-mono text-orange-400">+{result.points}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Grille de départ */}
              {qualifyingGrid.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3 rounded-full bg-violet-500 inline-block"></span>
                      Starting Grid
                    </h2>
                  </div>
                  <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
                    <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)] flex justify-between items-center">
                      <span className="text-xs font-mono text-violet-500 uppercase tracking-widest">Qualifying Session</span>
                      <span className="text-xs text-zinc-500">Front 2 rows</span>
                    </div>
                    <div className="divide-y divide-[var(--border-row)]">
                      {qualifyingGrid.slice(0, 6).map((grid, index: number) => (
                        <div key={index} className={`flex items-center px-4 py-3 gap-4 ${index === 0 ? 'bg-gradient-to-r from-violet-500/5 to-transparent' : ''}`}>
                          <span className={`w-8 text-xs font-mono tabular-nums flex-shrink-0 ${index === 0 ? 'text-violet-400' : 'text-zinc-500'}`}>P{grid.position}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {grid.rider.firstName} {grid.rider.lastName}
                            </p>
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
                </div>
              )}
            </div>
          )}

          {/* Next Race Section */}
          {nextRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                  Next Race
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <NextRaceCard race={nextRace} />
              </div>
            </div>
          )}

          {/* Last Race Section */}
          {lastRace ? (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                  Last Race
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <LastRaceCard race={lastRace} standings={standings} />
              </div>
            </div>
          ) : (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                  Last Race
                </h2>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <p className="text-zinc-500 text-sm">No completed races found for current period.</p>
              </div>
            </div>
          )}

          {/* Calendar Section */}
          {calendar.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  {calendar[0].date.substring(0, 4)} Calendar
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <CalendarCard races={calendar} type="motogp" />
              </div>
            </div>
          )}

          {/* Standings & News Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {standings.length > 0 && (
              <StandingsCard standings={standings} type="motogp" />
            )}
            <NewsCard news={news} type="motogp" />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © {currentYear} BikeOS. Live MotoGP Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data provided by TheSportsDB API
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
