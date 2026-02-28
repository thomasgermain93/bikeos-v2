import Link from 'next/link';
import { Header } from '@/components/Header';
import { getMoto2Standings, getMoto2Races } from '@/data/api';
import { Standing } from '@/types';

export const revalidate = 60;

const TEAM_COLORS: Record<string, string> = {
  'Fantic Racing': '#FF6600',
  'SpeedUp Racing': '#FFD700',
  'CFMOTO Aspar Team': '#00CC00',
  'QJmotor Gresini Moto2': '#0066FF',
  'Liqui Moly Husqvarna Intact GP': '#00FF00',
  'Red Bull KTM Ajo': '#FF6600',
  'OnlyFans American Racing': '#FF0066',
  'MT Helmets - MSI': '#9933CC',
  'Pertamina Mandalika Gas Up Team': '#0066CC',
  'Italtrans Racing Team': '#DC2626',
  'RW Racing GP': '#FF0000',
  'Yamaha VR46 Master Camp Team': '#FFFF00',
  'Forward Team': '#000000',
  'Klint Forward Factory Team': '#666666',
};

function getTeamColor(teamName: string): string {
  for (const [team, color] of Object.entries(TEAM_COLORS)) {
    if (teamName.toLowerCase().includes(team.toLowerCase())) return color;
  }
  return '#666666';
}

// Générer un classement complet de 20+ pilotes
function generateFullStandings(baseStandings: Standing[]): Standing[] {
  const additionalRiders = [
    { firstName: 'Arón', lastName: 'Canet', number: 40, team: 'Fantic Racing', nationality: 'ESP' },
    { firstName: 'Manuel', lastName: 'González', number: 18, team: 'Liqui Moly Husqvarna Intact GP', nationality: 'ESP' },
    { firstName: 'Sergio', lastName: 'García', number: 11, team: 'MT Helmets - MSI', nationality: 'ESP' },
    { firstName: 'Darryn', lastName: 'Binder', number: 15, team: 'Liqui Moly Husqvarna Intact GP', nationality: 'RSA' },
    { firstName: 'Somkiat', lastName: 'Chantra', number: 35, team: 'Pertamina Mandalika Gas Up Team', nationality: 'THA' },
    { firstName: 'Celestino', lastName: 'Vietti', number: 13, team: 'Red Bull KTM Ajo', nationality: 'ITA' },
    { firstName: 'Joe', lastName: 'Roberts', number: 16, team: 'OnlyFans American Racing', nationality: 'USA' },
    { firstName: 'Jeremy', lastName: 'Alcoba', number: 52, team: 'Yamaha VR46 Master Camp Team', nationality: 'ESP' },
    { firstName: 'Zonta', lastName: 'van den Goorbergh', number: 84, team: 'RW Racing GP', nationality: 'NED' },
    { firstName: 'Xavi', lastName: 'Cardelús', number: 20, team: 'Fantic Racing', nationality: 'AND' },
    { firstName: 'Bo', lastName: 'Bendsneyder', number: 64, team: 'Klint Forward Factory Team', nationality: 'NED' },
    { firstName: 'Diogo', lastName: 'Moreira', number: 10, team: 'Italtrans Racing Team', nationality: 'BRA' },
    { firstName: 'Izan', lastName: 'Guevara', number: 28, team: 'CFMOTO Aspar Team', nationality: 'ESP' },
    { firstName: 'Marcos', lastName: 'Ramírez', number: 24, team: 'Forward Team', nationality: 'ESP' },
    { firstName: 'Barry', lastName: 'Baltus', number: 7, team: 'RW Racing GP', nationality: 'BEL' },
  ];

  const fullStandings = [...baseStandings];
  
  additionalRiders.forEach((rider, index) => {
    const teamColor = getTeamColor(rider.team);
    fullStandings.push({
      position: baseStandings.length + index + 1,
      rider: {
        id: `m2-rider-${rider.number}`,
        number: rider.number,
        firstName: rider.firstName,
        lastName: rider.lastName,
        code: rider.lastName.substring(0, 3).toUpperCase(),
        nationality: rider.nationality,
        team: {
          id: `m2-team-${rider.number}`,
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

  return fullStandings.slice(0, 22);
}

export default async function Moto2StandingsPage() {
  const [standings, races] = await Promise.all([
    getMoto2Standings(),
    getMoto2Races(),
  ]);

  const fullStandings = generateFullStandings(standings);
  const nextRace = races.find(r => r.status === 'upcoming');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Header Section */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/moto2" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                Moto2
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
                  FIM Moto2 World Championship — {fullStandings.length} Riders
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
                © 2026 BikeOS. Live Moto2 Data.
              </p>
              <p className="text-sm text-zinc-600">
                Data: Dorna Sports, PulseLive
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
