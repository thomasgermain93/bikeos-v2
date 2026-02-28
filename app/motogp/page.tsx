import { Header } from '@/components/Header';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getNextMotoGPRaces, getLastMotoGPRace, getMotoGPStandings } from '@/data/api';
import { NewsItem } from '@/types';

export const revalidate = 60; // Revalidate every 60 seconds

// Mock news data for now
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Bagnaia dominates opening race of the season',
    excerpt: 'The reigning champion starts 2025 with a commanding victory.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Marquez: "We need to improve race pace"',
    excerpt: 'The Honda rider acknowledges challenges after testing.',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Ducati confirms new engine upgrade for Qatar',
    excerpt: 'Factory team to debut evolution Desmosedici.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Moto2 rookie sets record lap in practice',
    excerpt: 'Young prospect shows promise ahead of debut season.',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'Crash',
    sourceUrl: 'https://www.crash.net',
    category: 'motogp',
  },
];

export default async function MotoGPPage() {
  const [nextRaces, lastRace, standings] = await Promise.all([
    getNextMotoGPRaces(),
    getLastMotoGPRace(),
    getMotoGPStandings(),
  ]);

  const nextRace = nextRaces[0] || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
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
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3 md:items-stretch">
                <NextRaceCard race={nextRace} />
                {/* Placeholder for potential secondary card */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                © 2025 BikeOS. Live MotoGP & WSBK data.
              </p>
              <p className="text-sm text-zinc-600">
                Data provided by PulseLive & TheSportsDB
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
