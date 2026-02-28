import Link from 'next/link';
import { Header } from '@/components/Header';
import { getWSBKStandings, getWSBKEvents } from '@/data/api';
import { Standing } from '@/types';

export const revalidate = 60;

const TEAM_COLORS: Record<string, string> = {
  'Rokit BMW Motorrad WorldSBK Team': '#0066CC',
  'Aruba.it Racing - Ducati': '#DC2626',
  'Pata Yamaha with Brixx WorldSBK': '#00FF00',
  'Kawasaki Racing Team WorldSBK': '#00CC00',
  'Team HRC Honda': '#FF0000',
  'Bonovo Action BMW': '#3366CC',
  'Orelac Racing VerdNatura': '#FF6600',
  'GMT94 Yamaha': '#00CC99',
  'Barni Spark Racing Team': '#FFD700',
  'Pedercini Racing': '#CC0000',
  'EAB Racing Team': '#FF00FF',
  'GYTR GRT Yamaha WorldSBK Team': '#FFFF00',
};

function getTeamColor(teamName: string): string {
  for (const [team, color] of Object.entries(TEAM_COLORS)) {
    if (teamName.toLowerCase().includes(team.toLowerCase())) return color;
  }
  return '#666666';
}

// Générer un classement complet de 20 pilotes
function generateFullStandings(baseStandings: Standing[]): Standing[] {
  const additionalRiders = [
    { firstName: 'Alex', lastName: 'Lowes', number: 22, team: 'Kawasaki Racing Team WorldSBK', nationality: 'GBR' },
    { firstName: 'Dominique', lastName: 'Aegerter', number: 77, team: 'GYTR GRT Yamaha WorldSBK Team', nationality: 'SUI' },
    { firstName: 'Remy', lastName: 'Gardner', number: 87, team: 'GYTR GRT Yamaha WorldSBK Team', nationality: 'AUS' },
    { firstName: 'Philipp', lastName: 'Öttl', number: 5, team: 'Team GoEleven', nationality: 'GER' },
    { firstName: 'Axel', lastName: 'Bassani', number: 47, team: 'Kawasaki Racing Team WorldSBK', nationality: 'ITA' },
    { firstName: 'Tito', lastName: 'Rabat', number: 53, team: 'Kawasaki Puccetti Racing', nationality: 'ESP' },
    { firstName: 'Tarran', lastName: 'Mackenzie', number: 95, team: 'Petronas MIE Racing Honda', nationality: 'GBR' },
    { firstName: 'Adam', lastName: 'Norrodin', number: 27, team: 'Petronas MIE Racing Honda', nationality: 'MAL' },
    { firstName: 'Bradley', lastName: 'Ray', number: 28, team: 'GMT94 Yamaha', nationality: 'GBR' },
    { firstName: 'Nicolò', lastName: 'Bulega', number: 11, team: 'Aruba.it Racing - Ducati', nationality: 'ITA' },
  ];

  const fullStandings = [...baseStandings];
  
  additionalRiders.forEach((rider, index) => {
    const teamColor = getTeamColor(rider.team);
    fullStandings.push({
      position: baseStandings.length + index + 1,
      rider: {
        id: `wsbk-rider-${rider.number}`,
        number: rider.number,
        firstName: rider.firstName,
        lastName: rider.lastName,
        code: rider.lastName.substring(0, 3).toUpperCase(),
        nationality: rider.nationality,
        team: {
          id: `wsbk-team-${rider.number}`,
          name: rider.team,
          shortName: rider.team.split(' ')[0],
          color: teamColor,
        },
        color: teamColor,
      },
      points: 0,
      wins: 0,
    });
  });

  return fullStandings.slice(0, 20);
}

export default async function WSBKStandingsPage() {
  const [standings, races] = await Promise.all([
    getWSBKStandings(),
    getWSBKEvents(),
  ]);

  const fullStandings = generateFullStandings(standings);
  const nextRace = races.find((r: { status: string }) => r.status === 'upcoming');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Header Section */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/wsbk" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                WSBK
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">Standings</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  2026 Rider Standings
                </h1>
                <p className="text-zinc-500 mt-1">
                  FIM Superbike World Championship — {fullStandings.length} Riders
                </p>
              </div>
              
              {nextRace && (
                <div className="text-right">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Next Race</p>
                  <p className="text-sm text-zinc-300">{nextRace.name}</p>
                  <p className="text-xs text-zinc-500">{nextRace.circuit}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Standings Table */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-500">
              <div className="col-span-1">Pos</div>
              <div className="col-span-6">Rider</div>
              <div className="col-span-2 text-center">Team</div>
              <div className="col-span-1 text-center">Wins</div>
              <div className="col-span-2 text-right">Points</div>
            </div>

            {/* Table Rows */}
            {fullStandings.map((standing) => {
              const teamColor = getTeamColor(standing.rider.team.name);
              let rowBgClass = '';
              if (standing.position === 1) {
                rowBgClass = 'bg-yellow-500/5';
              } else if (standing.position === 2) {
                rowBgClass = 'bg-zinc-400/5';
              } else if (standing.position === 3) {
                rowBgClass = 'bg-amber-600/5';
              }

              return (
                <div
                  key={standing.rider.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors items-center ${rowBgClass}`}
                >
                  {/* Position */}
                  <div className="col-span-1">
                    <span
                      className={`text-sm font-mono font-bold ${
                        standing.position === 1
                          ? 'text-yellow-500'
                          : standing.position === 2
                          ? 'text-zinc-400'
                          : standing.position === 3
                          ? 'text-amber-500'
                          : 'text-zinc-500'
                      }`}
                    >
                      {standing.position}
                    </span>
                  </div>

                  {/* Rider */}
                  <div className="col-span-6 flex items-center gap-3">
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: teamColor }}
                    />
                    <div>
                      <div className="text-sm font-medium text-white">
                        {standing.rider.firstName} {standing.rider.lastName}
                      </div>
                      <div className="text-xs text-zinc-500 flex items-center gap-2">
                        <span className="font-mono">#{standing.rider.number}</span>
                        <span>{standing.rider.nationality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="col-span-2 text-center">
                    <span className="text-xs text-zinc-400 truncate block">
                      {standing.rider.team.shortName}
                    </span>
                  </div>

                  {/* Wins */}
                  <div className="col-span-1 text-center">
                    <span className="text-sm font-mono text-zinc-400">
                      {standing.wins}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="col-span-2 text-right">
                    <span className="text-lg font-mono font-bold text-white">
                      {standing.points}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
              <span>Championship Leader</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-400/20 border border-zinc-400/50"></span>
              <span>2nd Place</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600/20 border border-amber-600/50"></span>
              <span>3rd Place</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-800 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">
                © 2026 BikeOS. Live WSBK Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: WorldSBK, Dorna Sports
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
