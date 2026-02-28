'use client';

import Link from 'next/link';
import { Driver } from '@/data/api';
import { Trophy, Award, Flag, Timer, Calendar } from 'lucide-react';

interface DriverCardProps {
  driver: Driver;
  rank?: number;
}

export function DriverCard({ driver, rank }: DriverCardProps) {
  const getTeamColor = (teamId: string) => {
    const colors: Record<string, string> = {
      'ducati-lenovo': '#DC0000',
      'aprilia-racing': '#9D0012',
      'ktm-factory': '#FF6600',
      'ktm-tech3': '#0000FF',
      'ktm-castrol': '#006600',
      'yamaha-factory': '#0000CC',
      'honda-hrc': '#CC0000',
      'gresini-racing': '#00BFFF',
      'pramac-yamaha': '#FFD700',
      'vr46-racing': '#FFFF00',
      'lcr-honda': '#FF0000',
      'trackhouse': '#666666',
    };
    return colors[teamId] || '#666666';
  };

  const getRankStyle = (rank?: number) => {
    if (!rank) return '';
    if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
    if (rank === 2) return 'bg-zinc-400/10 border-zinc-400/30';
    if (rank === 3) return 'bg-amber-600/10 border-amber-600/30';
    return '';
  };

  const getRankColor = (rank?: number) => {
    if (!rank) return 'text-zinc-500';
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-zinc-300';
    if (rank === 3) return 'text-amber-400';
    return 'text-zinc-500';
  };

  return (
    <Link href={`/motogp/drivers/${driver.id}`}>
      <div className={`group relative border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/20 ${getRankStyle(rank)}`}>
        {/* Bandeau équipe */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: getTeamColor(driver.teamId) }}
        />

        {/* Header avec classement */}
        <div className="px-4 pt-3 pb-2 flex items-start justify-between">
          {rank && (
            <span className={`text-2xl font-mono font-bold ${getRankColor(rank)}`}>
              #{rank}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {driver.countryCode}
            </span>
            <img
              src={`https://flagcdn.com/w40/${driver.countryCode.toLowerCase()}.png`}
              alt={driver.nationality}
              className="w-5 h-3.5 rounded object-cover opacity-80"
            />
          </div>
        </div>

        {/* Photo et infos principales */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700/50 group-hover:border-zinc-600 transition-colors"
              />
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold text-white shadow-lg"
                style={{ backgroundColor: getTeamColor(driver.teamId) }}
              >
                {driver.number}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-zinc-100 leading-tight group-hover:text-white transition-colors">
                {driver.name}
              </h3>
              <p className="text-sm text-zinc-500 mt-0.5">{driver.team}</p>
              <p className="text-xs text-zinc-600 mt-1">{driver.nationality}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[var(--border-row)]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                <Trophy className="w-3 h-3" />
              </div>
              <div className="text-lg font-mono font-bold text-zinc-300">
                {driver.stats.wins}
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Wins</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                <Award className="w-3 h-3" />
              </div>
              <div className="text-lg font-mono font-bold text-zinc-300">
                {driver.stats.podiums}
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Podiums</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                <Flag className="w-3 h-3" />
              </div>
              <div className="text-lg font-mono font-bold text-zinc-300">
                {driver.stats.poles}
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Poles</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                <Timer className="w-3 h-3" />
              </div>
              <div className="text-lg font-mono font-bold text-zinc-300">
                {driver.stats.championships}
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Titles</div>
            </div>
          </div>

          {/* Info supplémentaire */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-row)] text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{driver.stats.races} races</span>
            </div>
            <span className="text-zinc-600">{driver.height}cm · {driver.weight}kg</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
