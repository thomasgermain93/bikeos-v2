import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { SprintCard } from '@/components/SprintCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { CalendarCard } from '@/components/CalendarCard';
import { getNextMotoGPRaces, getLastMotoGPRace, getMotoGPStandings, getLastMotoGPSprint, getMotoGPSprintResults, getMotoGPCalendar } from '@/data/api-compat';
import { NewsItem } from '@/types';

export const revalidate = 60;

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Thailand GP: Bagnaia takes pole in qualifying',
    excerpt: 'The reigning world champion secures pole position ahead of Sunday\'s main race.',
    publishedAt: '2026-02-28T15:30:00.000Z',
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Márquez confident ahead of first sprint race',
    excerpt: 'The #93 shows immediate pace on his new machine and eyes victory.',
    publishedAt: '2026-02-28T12:00:00.000Z',
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Rain expected for Sunday\'s main race',
    excerpt: 'Weather forecast predicts challenging conditions at Chang International Circuit.',
    publishedAt: '2026-02-28T10:00:00.000Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Ducati brings aero upgrades for Argentina opener',
    excerpt: 'Factory team continues development program for Termas de Río Hondo.',
    publishedAt: '2026-02-27T08:00:00.000Z',
    source: 'Speedweek',
    sourceUrl: 'https://www.speedweek.com',
    category: 'motogp',
  },
];

export default async function MotoGPPage() {
  const [nextRaces, lastRace, standings, lastSprint, calendar] = await Promise.all([
    getNextMotoGPRaces(),
    getLastMotoGPRace(),
    getMotoGPStandings(),
    getLastMotoGPSprint(),
    getMotoGPCalendar(),
  ]);

  const nextRace = nextRaces[0] || null;
  
  // Récupérer les résultats de la sprint si disponible
  let sprintResults = null;
  if (lastSprint) {
    sprintResults = await getMotoGPSprintResults(lastSprint.id);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero with ASCII Art */}
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

          {/* Last Sprint Section - Résultats d'hier (28 fév) */}
          {lastSprint && sprintResults && sprintResults.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-orange-500 inline-block"></span>
                  Last Sprint
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <SprintCard race={lastSprint} sprintResults={sprintResults} />
              </div>
            </div>
          )}

          {/* Next Race Section - Course de demain (1er mars) avec countdown */}
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

          {/* Last Race Section - Vide pour l'instant (course pas encore faite) */}
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
                <p className="text-zinc-500 text-sm">No completed races yet. First race of 2026 season starts March 1st.</p>
              </div>
            </div>
          )}

          {/* Calendar Section */}
          {calendar.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  2026 Calendar
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
            <NewsCard news={mockNews} type="motogp" />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
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
