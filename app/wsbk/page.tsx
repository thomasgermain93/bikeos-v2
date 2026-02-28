import { Header } from '@/components/Header';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { NewsCard } from '@/components/NewsCard';
import { getWSBKEvents, getLastWSBKRace } from '@/data/api';
import { NewsItem, Standing } from '@/types';

export const revalidate = 60;

const mockStandings: Standing[] = [
  {
    position: 1,
    rider: {
      id: '1',
      number: 54,
      firstName: 'Toprak',
      lastName: 'Razgatlioglu',
      code: 'RAZ',
      nationality: 'TUR',
      team: { id: '1', name: 'Pata Yamaha', shortName: 'Yamaha', color: '#003399' },
      color: '#003399',
    },
    points: 120,
    wins: 4,
  },
  {
    position: 2,
    rider: {
      id: '2',
      number: 1,
      firstName: 'Alvaro',
      lastName: 'Bautista',
      code: 'BAU',
      nationality: 'ESP',
      team: { id: '2', name: 'Aruba Ducati', shortName: 'Ducati', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 108,
    wins: 2,
  },
  {
    position: 3,
    rider: {
      id: '3',
      number: 65,
      firstName: 'Jonathan',
      lastName: 'Rea',
      code: 'REA',
      nationality: 'GBR',
      team: { id: '3', name: 'Kawasaki Racing', shortName: 'Kawasaki', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 95,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: '4',
      number: 55,
      firstName: 'Andrea',
      lastName: 'Locatelli',
      code: 'LOC',
      nationality: 'ITA',
      team: { id: '1', name: 'Pata Yamaha', shortName: 'Yamaha', color: '#003399' },
      color: '#003399',
    },
    points: 82,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: '5',
      number: 76,
      firstName: 'Loris',
      lastName: 'Baz',
      code: 'BAZ',
      nationality: 'FRA',
      team: { id: '2', name: 'Aruba Ducati', shortName: 'Ducati', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 76,
    wins: 0,
  },
];

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Razgatlioglu dominates Portimão opener',
    excerpt: 'Turkish rider takes commanding victory in race one.',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'WorldSBK',
    sourceUrl: 'https://www.worldsbk.com',
    category: 'wsbk',
  },
  {
    id: '2',
    title: 'Bautista: "Toprak is very strong this year"',
    excerpt: 'Reigning champion acknowledges rival\'s pace.',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'wsbk',
  },
  {
    id: '3',
    title: 'New BMW M 1000 RR shows promise in testing',
    excerpt: 'German manufacturer closes gap to leaders.',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'wsbk',
  },
];

export default async function WSBKPage() {
  const [wsbkEvents, lastRace] = await Promise.all([
    getWSBKEvents(),
    getLastWSBKRace(),
  ]);

  const nextRace = wsbkEvents.find(r => new Date(r.date) > new Date()) || wsbkEvents[0] || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — WSBK Live Data</h1>

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
              </div>
            </div>
          )}

          {/* Last Race Section */}
          {lastRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                  Last Race
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LastRaceCard race={lastRace} standings={mockStandings} />
              </div>
            </div>
          )}

          {/* Standings & News Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Placeholder for WSBK Standings */}
            <NewsCard news={mockNews} type="wsbk" />
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
                Data provided by TheSportsDB
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
