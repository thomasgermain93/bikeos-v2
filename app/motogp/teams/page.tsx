import { Header } from '@/components/Header';
import { getMotoGPTeams, getMotoGPStandings } from '@/data/api-compat';
import Link from 'next/link';
import { Trophy, Bike, Users, Star } from 'lucide-react';

export const revalidate = 60;

export default async function TeamsPage() {
  const [teamsData, standings] = await Promise.all([
    getMotoGPTeams(),
    getMotoGPStandings()
  ]);

  const currentYear = new Date().getFullYear();

  // Calculer les points constructeur
  const teams = teamsData.map(team => {
    const teamDrivers = standings.filter(s =>
        s.rider.team.name.toLowerCase().includes(team.strTeam.toLowerCase()) ||
        team.strTeam.toLowerCase().includes(s.rider.team.name.toLowerCase())
    );

    return {
        id: team.idTeam,
        name: team.strTeam,
        constructor: team.strKeywords || 'MotoGP',
        bike: team.strKeywords || 'MotoGP Bike',
        nationality: team.strCountry,
        countryCode: team.strCountry?.substring(0, 2).toUpperCase() || 'ES',
        points: teamDrivers.reduce((acc, d) => acc + d.points, 0),
        wins: teamDrivers.reduce((acc, d) => acc + d.wins, 0),
        colors: { primary: '#ef4444' },
        riders: teamDrivers.map(d => d.rider.id)
    };
  }).sort((a, b) => b.points - a.points);

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
              Constructor Standings
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              Teams competing in the {currentYear} MotoGP World Championship.
              Constructor points calculated from rider results.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Stats globales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Teams</span>
              </div>
              <div className="text-3xl font-mono font-bold text-zinc-100">{teams.length}</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Bike className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Constructors</span>
              </div>
              <div className="text-3xl font-mono font-bold text-zinc-100">5</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Star className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Riders</span>
              </div>
              <div className="text-3xl font-mono font-bold text-zinc-100">22</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-[var(--border-card)]">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Trophy className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Rounds</span>
              </div>
              <div className="text-3xl font-mono font-bold text-zinc-100">22</div>
            </div>
          </div>

          {/* Classement Constructeurs */}
          <div className="mb-10">
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-yellow-500"></span>
              Constructor Championship
            </h2>

            <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
              {/* Header */}
              <div className="hidden sm:flex items-center px-4 py-3 border-b border-[var(--border-row)] text-xs text-zinc-500 font-mono uppercase bg-zinc-900/50">
                <span className="w-12">Pos</span>
                <span className="flex-1">Constructor</span>
                <span className="w-24 text-center">Bike</span>
                <span className="w-20 text-right">Wins</span>
                <span className="w-20 text-right">Points</span>
              </div>

              {/* Lignes */}
              {teams.map((team, index) => {
                return (
                  <div
                    key={team.id}
                    className={`flex flex-col sm:flex-row sm:items-center px-4 py-4 border-b border-[var(--border-row)] hover:bg-zinc-800/30 transition-colors ${
                      index < 3 ? 'bg-zinc-800/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:w-12 mb-2 sm:mb-0">
                      <span className={`text-lg font-mono font-bold ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-zinc-300' :
                        index === 2 ? 'text-amber-400' :
                        'text-zinc-500'
                      }`}>
                        #{index + 1}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className="w-1 h-10 rounded-full hidden sm:block"
                        style={{ backgroundColor: team.colors.primary }}
                      />
                      <div>
                        <Link href={`/motogp/teams/${team.id}`} className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                          {team.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={`https://flagcdn.com/w40/${team.countryCode.toLowerCase()}.png`}
                            alt={team.nationality}
                            className="w-4 h-3 rounded object-cover opacity-70"
                          />
                          <span className="text-xs text-zinc-500">{team.constructor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:w-24 text-center mb-2 sm:mb-0">
                      <span className="text-xs text-zinc-400 px-2 py-1 rounded bg-zinc-800/50">
                        {team.bike.split(' ').pop()}
                      </span>
                    </div>

                    <div className="sm:w-20 text-right flex items-center justify-between sm:block">
                      <span className="text-xs text-zinc-500 sm:hidden">Wins:</span>
                      <span className="text-sm font-mono text-zinc-400">{team.wins}</span>
                    </div>

                    <div className="sm:w-20 text-right flex items-center justify-between sm:block">
                      <span className="text-xs text-zinc-500 sm:hidden">Points:</span>
                      <span className="text-lg font-mono font-bold text-zinc-200">{team.points}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grille des équipes */}
          <div>
            <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
              All Teams
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {teams.map((team, index) => (
                <div key={team.id} className="p-6 border border-[var(--border-card)] rounded-xl bg-zinc-900 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-1 h-12 rounded-full bg-red-500" />
                        <div>
                            <h3 className="text-sm font-bold text-zinc-100">{team.name}</h3>
                            <p className="text-xs text-zinc-500">{team.bike}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] text-zinc-600 uppercase font-mono mb-1">Rank</div>
                            <div className="text-xl font-bold text-zinc-300">#{index + 1}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-zinc-600 uppercase font-mono mb-1">Points</div>
                            <div className="text-xl font-bold text-red-500">{team.points}</div>
                        </div>
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
                © {currentYear} BikeOS. MotoGP Team Data.
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
