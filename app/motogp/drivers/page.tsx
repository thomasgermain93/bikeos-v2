import { Header } from '@/components/Header';
import { DriverCard } from '@/components/DriverCard';
import { getAllDrivers, getAllTeams } from '@/data/api';
import Link from 'next/link';

export const revalidate = 60;

export default async function DriversPage() {
  const drivers = getAllDrivers();
  const teams = getAllTeams();

  // Calculer le classement des pilotes basé sur les points
  const driverStandings = drivers.map((driver, index) => ({
    ...driver,
    rank: index + 1,
    points: 150 - index * 6, // Simulation de points
  })).sort((a, b) => b.points - a.points);

  // Grouper par équipe
  const driversByTeam = teams.map(team => ({
    team,
    drivers: driverStandings.filter(d => d.teamId === team.id),
  })).filter(g => g.drivers.length > 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero */}
        <div className="border-b border-[var(--border-section)]">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 rounded-full bg-red-500"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">MotoGP 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-3">
              Riders Championship
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              All 22 riders competing in the 2026 MotoGP World Championship.
              Filter by team or view individual rider profiles.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Filtres par équipe */}
          <div className="mb-8">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-4">Filter by Team</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/motogp/drivers"
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                All Teams
              </Link>
              {teams.map(team => (
                <Link
                  key={team.id}
                  href={`/motogp/drivers?team=${team.id}`}
                  className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-400 text-sm border border-[var(--border-card)] hover:border-zinc-700 hover:text-zinc-200 transition-colors"
                >
                  {team.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats globales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-zinc-100">22</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Riders</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-zinc-100">11</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Teams</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-yellow-400">14</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Nationalities</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-violet-400">6</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Champions</div>
            </div>
          </div>

          {/* Grille des pilotes */}
          <div className="mb-6">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-zinc-500"></span>
              All Riders
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {driverStandings.map((driver, index) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Section par équipe */}
          <div className="mt-16">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
              By Team
            </h2>

            <div className="space-y-8">
              {driversByTeam.map(({ team, drivers }) => (
                <div key={team.id} className="border border-[var(--border-card)] rounded-xl bg-zinc-900/50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--border-row)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: team.colors.primary }}
                      />
                      <div>
                        <h3 className="text-sm font-medium text-zinc-200">{team.name}</h3>
                        <p className="text-xs text-zinc-500">{team.bike}</p>
                      </div>
                    </div>
                    <Link
                      href={`/motogp/teams/${team.id}`}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      View Team →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-row)]">
                    {drivers.map(driver => (
                      <div key={driver.id} className="bg-zinc-900 p-4 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors">
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="w-12 h-12 rounded-full object-cover border border-zinc-700/50"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-zinc-200">{driver.name}</div>
                          <div className="text-xs text-zinc-500">#{driver.number} · {driver.nationality}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-zinc-300">{driver.points}</div>
                          <div className="text-xs text-zinc-500">pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border-section)] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. MotoGP Rider Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: Dorna Sports
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
