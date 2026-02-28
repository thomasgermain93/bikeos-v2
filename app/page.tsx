import { Header } from '@/components/Header';
import { NextRaceCard } from '@/components/NextRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getNextMotoGPRaces, getMotoGPStandings, getMoto2Standings, getMoto3Standings } from '@/data/api';
import { getWSBKEvents } from '@/data/api';
import { getMXGPRaces, getMXGPStandings, getMX2Standings } from '@/data/api-mx';
import { NewsItem } from '@/types';

export const revalidate = 60;

// Mock news data
const mockNewsMotoGP: NewsItem[] = [
  {
    id: '1',
    title: 'Marc Márquez wins Qatar GP on Ducati debut',
    excerpt: 'A stunning victory in his first race with the factory Ducati team.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Bagnaia: "We need to improve race pace"',
    excerpt: 'The defending champion comments on Qatar performance.',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'MotoGP',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'New aerodynamics package tested in Portugal',
    excerpt: 'Several teams bring updates to Portimão.',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
];

const mockNewsWSBK: NewsItem[] = [
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
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'wsbk',
  },
];

const mockNewsMX: NewsItem[] = [
  {
    id: '1',
    title: 'Tim Gajser wins opening round in Argentina',
    excerpt: 'The Slovenian starts his title defense with victory.',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mxgp',
  },
  {
    id: '2',
    title: 'Kay de Wolf dominates MX2 season opener',
    excerpt: 'Dutch rider shows championship intent.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mx2',
  },
];

export default async function HomePage() {
  const [
    nextMotoGPRaces,
    motogpStandings,
    moto2Standings,
    moto3Standings,
    wsbkEvents,
    mxgpRaces,
    mxgpStandings,
    mx2Standings,
  ] = await Promise.all([
    getNextMotoGPRaces(),
    getMotoGPStandings(),
    getMoto2Standings(),
    getMoto3Standings(),
    getWSBKEvents(),
    getMXGPRaces(),
    getMXGPStandings(),
    getMX2Standings(),
  ]);

  const nextMotoGP = nextMotoGPRaces[0] || null;
  const nextWSBK = wsbkEvents.find((r: { date: string }) => new Date(r.date) > new Date()) || wsbkEvents[0] || null;
  const nextMXGP = mxgpRaces.find((r: { date: string }) => new Date(r.date) > new Date()) || mxgpRaces[0] || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — Live Motorsport Data</h1>

          {/* Hero Section */}
          <div className="mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Live Motorsport Data
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              MotoGP, Moto2, Moto3, WorldSBK, MXGP & MX2 — Results, schedules, standings, and race timing data.
            </p>
          </div>

          {/* Next Races Section */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                Next Races
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {nextMotoGP && <NextRaceCard race={nextMotoGP} />}
              {nextWSBK && <NextRaceCard race={nextWSBK} />}
              {nextMXGP && <NextRaceCard race={nextMXGP} />}
            </div>
          </div>

          {/* Standings Section */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                Championships Standings
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {motogpStandings.length > 0 && (
                <StandingsCard standings={motogpStandings} type="motogp" />
              )}
              {moto2Standings.length > 0 && (
                <StandingsCard standings={moto2Standings} type="moto2" />
              )}
              {moto3Standings.length > 0 && (
                <StandingsCard standings={moto3Standings} type="moto3" />
              )}
              {mxgpStandings.length > 0 && (
                <StandingsCard standings={mxgpStandings} type="mxgp" />
              )}
              {mx2Standings.length > 0 && (
                <StandingsCard standings={mx2Standings} type="mx2" />
              )}
            </div>
          </div>

          {/* News Section */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                Latest News
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <NewsCard news={mockNewsMotoGP} type="motogp" />
              <NewsCard news={mockNewsWSBK} type="wsbk" />
              <NewsCard news={mockNewsMX} type="mxgp" />
            </div>
          </div>

          {/* Series Quick Links */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                All Series
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { href: '/motogp/', label: 'MotoGP', color: '#ef4444', desc: 'Premier Class' },
                { href: '/moto2/', label: 'Moto2', color: '#FF6600', desc: 'Intermediate' },
                { href: '/moto3/', label: 'Moto3', color: '#00CC00', desc: 'Junior Class' },
                { href: '/wsbk/', label: 'WSBK', color: '#3b82f6', desc: 'Superbike' },
                { href: '/mxgp/', label: 'MXGP', color: '#8B4513', desc: 'Motocross' },
                { href: '/mx2/', label: 'MX2', color: '#228B22', desc: 'MX2 Class' },
              ].map((series) => (
                <a
                  key={series.href}
                  href={series.href}
                  className="flex flex-col items-center p-4 border border-[var(--border-card)] rounded-xl bg-zinc-900 hover:bg-zinc-800/40 transition-colors"
                >
                  <span
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: series.color }}
                  />
                  <span className="text-sm font-semibold text-white">{series.label}</span>
                  <span className="text-xs text-zinc-500">{series.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2025 BikeOS. Live Motorsport Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: PulseLive, TheSportsDB, MXGP
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
