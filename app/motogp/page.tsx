import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { SprintCard } from '@/components/SprintCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getNextMotoGPRaces, getLastMotoGPRace, getMotoGPStandings, getLastMotoGPSprint, getMotoGPSprintResults } from '@/data/api';
import { NewsItem } from '@/types';

export const revalidate = 60;

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Bagnaia dominates Qatar opening with commanding victory',
    excerpt: 'The reigning champion starts 2026 season with maximum points.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Márquez: "Ducati feels incredible, we can fight for wins"',
    excerpt: 'The #93 shows immediate pace on his new machine.',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Martín adapting well to Aprilia after first race',
    excerpt: 'Former champion shows promise on new machinery.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Ducati brings aero upgrades to Portimão',
    excerpt: 'Factory team continues development program.',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'Speedweek',
    sourceUrl: 'https://www.speedweek.com',
    category: 'motogp',
  },
];

export default async function MotoGPPage() {
  const [nextRaces, lastRace, standings, lastSprint] = await Promise.all([
    getNextMotoGPRaces(),
    getLastMotoGPRace(),
    getMotoGPStandings(),
    getLastMotoGPSprint(),
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

          {/* Last Sprint Section */}
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

          {/* Last Race Section */}
          {lastRace && standings.length > 0 && (
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
