import { Header } from '@/components/Header';
import { NextRaceCard } from '@/components/NextRaceCard';
import { LastRaceCard } from '@/components/LastRaceCard';
import { StandingsCard } from '@/components/StandingsCard';
import { NewsCard } from '@/components/NewsCard';
import { getMXGPStandings, getMXGPNextRace, getMXGPLastRace, getMXGPNews } from '@/data/api-mx';

export const revalidate = 60;

export default async function MXGPPage() {
  const [standings, nextRace, lastRace, news] = await Promise.all([
    getMXGPStandings(),
    getMXGPNextRace(),
    getMXGPLastRace(),
    getMXGPNews(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="sr-only">BikeOS — MXGP Live Data</h1>

          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-8 rounded-full" style={{ backgroundColor: '#8B4513' }}></span>
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">MXGP</h2>
              <p className="text-xs text-zinc-500">FIM Motocross World Championship</p>
            </div>
          </div>

          {nextRace && (
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full inline-block" style={{ backgroundColor: '#8B4513' }}></span>
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
                  <span className="w-1 h-3 rounded-full inline-block" style={{ backgroundColor: '#8B4513' }}></span>
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
              <StandingsCard standings={standings} type="mxgp" />
            )}
            <NewsCard news={news} type="mxgp" />
          </div>
        </div>

        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2025 BikeOS. Live MXGP & MX2 data.
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
