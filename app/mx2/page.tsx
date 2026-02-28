import { Header } from '@/components/Header';
import { HeroSection, MX2ASCII } from '@/components/HeroSection';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getMX2Standings, getMX2NextRace, getMX2LastRace, getMX2News } from '@/data/api-mx';

export const revalidate = 60;

export default async function MX2Page() {
  const [standings, nextRace, lastRace, news] = await Promise.all([
    getMX2Standings(),
    getMX2NextRace(),
    getMX2LastRace(),
    getMX2News(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero with ASCII Art */}
        <HeroSection
          title="MX2"
          subtitle="FIM Motocross World Championship — 250cc Class for emerging off-road talent."
          nextRaceDate={nextRace?.date}
          raceName={nextRace?.name}
          raceLocation={`${nextRace?.circuit} · ${nextRace?.location}`}
          asciiArt={<MX2ASCII />}
          accentColor="#228B22"
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — MX2 Live Data</h1>

          {nextRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full inline-block" style={{ backgroundColor: '#228B22' }}></span>
                  Next Race
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3 md:items-stretch">
                <NextRaceCard race={nextRace} />
              </div>
            </div>
          )}

          {lastRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full inline-block" style={{ backgroundColor: '#228B22' }}></span>
                  Last Race
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LastRaceCard race={lastRace} standings={standings} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {standings.length > 0 && (
              <StandingsCard standings={standings} type="mx2" />
            )}
            <NewsCard news={news} type="mx2" />
          </div>
        </div>

        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. Live MX2 data.
              </p>
              <p className="text-sm text-zinc-600">
                Data provided by MXGP & FIM
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
