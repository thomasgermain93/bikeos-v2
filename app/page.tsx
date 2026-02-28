import Link from 'next/link';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { CalendarCard } from '@/components/CalendarCard';
import { getNextMotoGPRaces, getMotoGPStandings, getMotoGPCalendar } from '@/data/api-compat';
import { NewsItem } from '@/types';

export const revalidate = 60;

// News récentes MotoGP
const mockNewsMotoGP: NewsItem[] = [
  {
    id: '1',
    title: 'MotoGP Thailand: Bagnaia wins dramatic Sprint after Marquez penalty',
    excerpt: 'Francesco Bagnaia takes victory in the inaugural Thailand Sprint after Marc Marquez receives a penalty for last-lap contact.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1030787/1/motogp-thailand-bagnaia-wins-sprint-marquez-penalty',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'MotoGP Thailand: Marquez dominates qualifying to take pole',
    excerpt: 'Marc Marquez claims pole position for the Thailand GP with a stunning lap, ahead of Bagnaia and Martin.',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport.com',
    sourceUrl: 'https://www.motorsport.com/motogp/news/motogp-thailand-marquez-pole-qualifying/',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Rain threat for Sunday Thailand GP main race',
    excerpt: 'Weather forecasts predict possible rain for Sunday race day at Buriram, teams prepare wet weather setups.',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com/en/2026/02/28/motogp/thailand-rain-threat-sunday.html',
    category: 'motogp',
  },
];

export default async function HomePage() {
  const [nextMotoGPRaces, motogpStandings, calendar] = await Promise.all([
    getNextMotoGPRaces(),
    getMotoGPStandings(),
    getMotoGPCalendar(),
  ]);

  const nextMotoGP = nextMotoGPRaces[0] || null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero */}
        <HeroSection
          title="MotoGP Live Data"
          subtitle="FIM Road Racing World Championship — Schedules, results, standings, and race timing."
          nextRaceDate={nextMotoGP?.date}
          raceName={nextMotoGP?.name}
          raceLocation={`${nextMotoGP?.circuit} · ${nextMotoGP?.location}`}
          accentColor="#ef4444"
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — MotoGP Live Data</h1>

          {/* Next Race */}
          {nextMotoGP && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                  Next Race
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <NextRaceCard race={nextMotoGP} />
              </div>
            </div>
          )}

          {/* Calendar & Standings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-14">
            {calendar.length > 0 && (
              <CalendarCard races={calendar} type="motogp" />
            )}
            {motogpStandings.length > 0 && (
              <StandingsCard standings={motogpStandings} type="motogp" />
            )}
          </div>

          {/* News */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                Latest News
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <NewsCard news={mockNewsMotoGP} type="motogp" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-14">
            <div className="flex items-center mb-6">
              <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-white/70 inline-block"></span>
                Quick Links
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: '/motogp/', label: 'Dashboard', desc: 'Overview' },
                { href: '/motogp/standings/', label: 'Standings', desc: 'Full classification' },
                { href: '/motogp/calendar/', label: 'Calendar', desc: '2026 Schedule' },
                { href: 'https://www.motogp.com', label: 'Official Site', desc: 'motogp.com', external: true },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center p-4 border border-[var(--border-card)] rounded-xl bg-zinc-900 hover:bg-zinc-800/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <span className="text-xs text-zinc-500">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. MotoGP Live Data.
              </p>
              <p className="text-sm text-zinc-600">
                Unofficial fan site. Data from various sources.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
