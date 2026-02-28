import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getMoto3Races, getMoto3Standings, getLastMoto3Race } from '@/data/api';
import { NewsItem, Race } from '@/types';

export const revalidate = 60;

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'David Alonso dominates opening race of 2026 season',
    excerpt: 'The Colombian rider starts 2026 with a commanding victory.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'CFMOTO Aspar Team shows strong form in Qatar',
    excerpt: 'Chinese manufacturer makes impressive debut in lightweight class.',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'New Honda NSF250R engine upgrade for 2026',
    excerpt: 'Factory team to debut evolution power unit.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Rookie from Red Bull Rookies Cup makes waves',
    excerpt: 'Young prospect shows promise ahead of debut season.',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'Crash',
    sourceUrl: 'https://www.crash.net',
    category: 'motogp',
  },
];

export default async function Moto3Page() {
  const [races, standings, lastRace] = await Promise.all([
    getMoto3Races(),
    getMoto3Standings(),
    getLastMoto3Race(),
  ]);

  const nextRace = races.find((r: Race) => r.status === 'upcoming') || races[0] || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero with ASCII Art */}
        <HeroSection
          title="Moto3"
          subtitle="FIM Moto3 World Championship — The lightweight entry class with 250cc single-cylinder engines."
          nextRaceDate={nextRace?.date}
          raceName={nextRace?.name}
          raceLocation={`${nextRace?.circuit} · ${nextRace?.location}`}
          accentColor="#00CC00"
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — Moto3 Live Data</h1>

          {/* Next Race Section */}
          {nextRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-[#00CC00] inline-block"></span>
                  Next Race
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3 md:items-stretch">
                <NextRaceCard race={nextRace} />
              </div>
            </div>
          )}

          {/* Last Race Section */}
          {lastRace && standings.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-[#00CC00] inline-block"></span>
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
              <StandingsCard standings={standings} type="moto3" />
            )}
            <NewsCard news={mockNews} type="moto3" />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. Live Moto3 Data.
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
