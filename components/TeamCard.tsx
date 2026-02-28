'use client';

import Link from 'next/link';
import { Team, Driver } from '@/data/api';
import { Bike, Trophy, Users, Star } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  drivers: Driver[];
  constructorPoints?: number;
  rank?: number;
}

export function TeamCard({ team, drivers, constructorPoints, rank }: TeamCardProps) {
  const teamDrivers = drivers.filter(d => team.riders.includes(d.id));

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
    <Link href={`/motogp/teams/${team.id}`}>
      <div className={`group border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/20 ${getRankStyle(rank)}`}>
        {/* Header avec couleur équipe */}
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, ${team.colors.primary}, ${team.colors.secondary})` }}
        />

        <div className="p-4">
          {/* Rang et infos */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {rank && (
                <span className={`text-3xl font-mono font-bold ${getRankColor(rank)}`}>
                  #{rank}
                </span>
              )}
              <div>
                <h3 className="text-lg font-medium text-zinc-100 leading-tight group-hover:text-white transition-colors">
                  {team.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={`https://flagcdn.com/w40/${team.countryCode.toLowerCase()}.png`}
                    alt={team.nationality}
                    className="w-4 h-3 rounded object-cover opacity-70"
                  />
                  <span className="text-xs text-zinc-500">{team.nationality}</span>
                </div>
              </div>
            </div>

            {/* Logo placeholder */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center border"
              style={{ borderColor: team.colors.primary + '40', backgroundColor: team.colors.primary + '10' }}
            >
              <Bike className="w-6 h-6" style={{ color: team.colors.primary }} />
            </div>
          </div>

          {/* Moto */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 border border-[var(--border-row)] mb-4">
            <Bike className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">{team.bike}</span>
          </div>

          {/* Pilotes */}
          <div className="space-y-2 mb-4">
            <div className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1 mb-2">
              <Users className="w-3 h-3" />
              Riders
            </div>
            {teamDrivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
              >
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-700/50"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-zinc-300 font-medium truncate">{driver.name}</div>
                  <div className="text-xs text-zinc-500">#{driver.number}</div>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                  style={{ backgroundColor: team.colors.primary + '30', color: team.colors.primary }}
                >
                  {driver.number}
                </div>
              </div>
            ))}
          </div>

          {/* Points constructeur */}
          {constructorPoints !== undefined && (
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-row)]">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Trophy className="w-3 h-3" />
                <span>Constructor Points</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-mono font-bold text-zinc-200">
                  {constructorPoints}
                </span>
                <span className="text-xs text-zinc-500">pts</span>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[var(--border-row)]">
            <div className="flex items-center gap-2 text-xs">
              <Star className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-400">Constructor:</span>
              <span className="text-zinc-300 font-medium">{team.constructor}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Bike className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-400">Bike:</span>
              <span className="text-zinc-300 font-medium">{team.bike.split(' ').pop()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
