export interface Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  type: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
  distance?: string;
  results?: RaceResult[];
  fastestLap?: {
    rider: Rider;
    time: string;
  };
}

export interface RaceResult {
  position: number;
  rider: Rider;
  team: Team;
  time?: string;
  gap?: string;
  points: number;
}

export interface Rider {
  id: string;
  number: number;
  firstName: string;
  lastName: string;
  code: string;
  nationality: string;
  team: Team;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export interface Standing {
  position: number;
  rider: Rider;
  points: number;
  wins: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  category: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
}

export type Series = 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
