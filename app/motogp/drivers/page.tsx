import { Header } from '@/components/Header';
import { getMotoGPStandings, getMotoGPTeams } from '@/data/api-compat';
import Link from 'next/link';

export const revalidate = 60;

export default async function DriversPage() {
  const [standings, teams] = await Promise.all([
    getMotoGPStandings(),
    getMotoGPTeams()
  ]);

  const currentYear = new Date().getFullYear();

  // Grouper par équipe
  const driversByTeam = teams.map(team => ({
    team: {
        id: team.idTeam,
        name: team.strTeam,
        bike: team.strKeywords || 'MotoGP Bike',
        colors: { primary: '#ef4444' }
    },
    drivers: standings.filter(s =>
        s.rider.team.name.toLowerCase().includes(team.strTeam.toLowerCase()) ||
        team.strTeam.toLowerCase().includes(s.rider.team.name.toLowerCase())
    ),
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
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">MotoGP {currentYear}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-3">
              Riders Championship
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              Riders competing in the {currentYear} MotoGP World Championship.
              Data updated dynamically from TheSportsDB.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Stats globales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-zinc-100">{standings.length}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Active Riders</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-zinc-100">{teams.length}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Registered Teams</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-yellow-400">
                {new Set(standings.map(s => s.rider.nationality)).size}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Nationalities</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="text-3xl font-mono font-bold text-violet-400">
                {standings.reduce((acc, s) => acc + s.wins, 0)}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Total Wins</div>
            </div>
          </div>

          {/* Grille des pilotes (Standings) */}
          <div className="mb-6">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-zinc-500"></span>
              Current Standings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {standings.map((standing) => (
              <div key={standing.rider.id} className="group relative border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-all">
                <div className="h-1.5 w-full bg-red-500" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl font-mono font-bold text-zinc-500">#{standing.position}</span>
                    <span className="text-xs font-mono text-zinc-600 uppercase">{standing.rider.code}</span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100 truncate">{standing.rider.firstName} {standing.rider.lastName}</h3>
                  <p className="text-sm text-zinc-500 truncate mb-4">{standing.rider.team.name}</p>
                  <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs text-zinc-600 uppercase font-mono">Wins</div>
                        <div className="text-xl font-bold text-zinc-300">{standing.wins}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-zinc-600 uppercase font-mono">Points</div>
                        <div className="text-2xl font-bold text-red-500">{standing.points}</div>
                    </div>
                  </div>
                </div>
              </div>
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
                    {drivers.map(standing => (
                      <div key={standing.rider.id} className="bg-zinc-900 p-4 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                            {standing.rider.code}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-zinc-200">{standing.rider.firstName} {standing.rider.lastName}</div>
                          <div className="text-xs text-zinc-500">Pos. {standing.position}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-zinc-300">{standing.points}</div>
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
                © {currentYear} BikeOS. MotoGP Rider Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data provided by <a href="https://www.thesportsdb.com" target="_blank" className="hover:text-zinc-400 transition-colors underline">TheSportsDB API</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
