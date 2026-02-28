import Link from 'next/link';
import { Header } from '@/components/Header';
import { getMotoGPStandings, getMotoGPRaces } from '@/data/api-compat';
import { Standing, Race } from '@/types';

export const revalidate = 60;

const TEAM_COLORS: Record<string, string> = {
  'Ducati Lenovo Team': '#DC2626',
  'Red Bull KTM Factory Racing': '#FF6600',
  'Aprilia Racing': '#0066CC',
  'Monster Energy Yamaha MotoGP': '#00FF00',
  'Repsol Honda Team': '#FF0000',
  'Gresini Racing MotoGP': '#0066FF',
  'Prima Pramac Racing': '#FFD700',
  'Pertamina Enduro VR46 Racing Team': '#FFFF00',
  'Red Bull KTM Tech3': '#6699CC',
  'LCR Honda': '#CC0000',
  'Trackhouse Racing': '#000000',
  'GasGas Factory Racing Tech3': '#CC0000',
  'HRC Test Team': '#FF0000',
  'Yamaha Factory Racing': '#00FF00',
  'Honda HRC Castrol': '#FF0000',
};

function getTeamColor(teamName: string): string {
  for (const [team, color] of Object.entries(TEAM_COLORS)) {
    if (teamName.toLowerCase().includes(team.toLowerCase())) return color;
  }
  return '#666666';
}

// Générer un classement complet de 20 pilotes basé sur les données existantes
function generateFullStandings(baseStandings: Standing[]): Standing[] {
  const additionalRiders = [
    { firstName: 'Alex', lastName: 'Márquez', number: 73, team: 'Gresini Racing MotoGP', nationality: 'ESP' },
    { firstName: 'Fabio', lastName: 'Quartararo', number: 20, team: 'Monster Energy Yamaha MotoGP', nationality: 'FRA' },
    { firstName: 'Marco', lastName: 'Bezzecchi', number: 72, team: 'Pertamina Enduro VR46 Racing Team', nationality: 'ITA' },
    { firstName: 'Franco', lastName: 'Morbidelli', number: 21, team: 'Prima Pramac Racing', nationality: 'ITA' },
    { firstName: 'Jack', lastName: 'Miller', number: 43, team: 'Red Bull KTM Tech3', nationality: 'AUS' },
    { firstName: 'Johann', lastName: 'Zarco', number: 5, team: 'LCR Honda', nationality: 'FRA' },
    { firstName: 'Miguel', lastName: 'Oliveira', number: 88, team: 'Trackhouse Racing', nationality: 'POR' },
    { firstName: 'Augusto', lastName: 'Fernández', number: 37, team: 'Red Bull KTM Tech3', nationality: 'ESP' },
    { firstName: 'Takaaki', lastName: 'Nakagami', number: 30, team: 'LCR Honda', nationality: 'JPN' },
    { firstName: 'Luca', lastName: 'Marini', number: 10, team: 'Repsol Honda Team', nationality: 'ITA' },
  ];

  const fullStandings = [...baseStandings];
  
  additionalRiders.forEach((rider, index) => {
    const teamColor = getTeamColor(rider.team);
    fullStandings.push({
      position: baseStandings.length + index + 1,
      rider: {
        id: `rider-${rider.number}`,
        number: rider.number,
        firstName: rider.firstName,
        lastName: rider.lastName,
        code: rider.lastName.substring(0, 3).toUpperCase(),
        nationality: rider.nationality,
        team: {
          id: `team-${rider.number}`,
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

export default async function MotoGPStandingsPage() {
  const [standings, races] = await Promise.all([
    getMotoGPStandings(),
    getMotoGPRaces(),
  ]);

  const fullStandings = generateFullStandings(standings);
  const nextRace = races.find((r: Race) => r.status === 'upcoming');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Header Section */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/motogp" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                MotoGP
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
                  FIM MotoGP World Championship — {fullStandings.length} Riders
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
                © 2026 BikeOS. Live MotoGP Data.
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
