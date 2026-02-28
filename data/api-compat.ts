// Fonctions de compatibilité - Retournent des mocks pour éviter les problèmes de types
import type { Race, Standing, NewsItem } from '@/types';

// Mock races pour la saison 2026
const MOCK_RACES: Race[] = [
  {
    id: 'thailand-2026-sprint',
    round: 1,
    name: 'Thai Grand Prix - Sprint',
    circuit: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thailand',
    date: '2026-02-28T08:00:00.000Z',
    status: 'finished',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'thailand-2026-race',
    round: 1,
    name: 'Thai Grand Prix',
    circuit: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thailand',
    date: '2026-03-01T07:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'argentina-2026-sprint',
    round: 2,
    name: 'Argentine Grand Prix - Sprint',
    circuit: 'Autódromo Termas de Río Hondo',
    location: 'Termas de Río Hondo',
    country: 'Argentina',
    date: '2026-03-14T18:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'argentina-2026-race',
    round: 2,
    name: 'Argentine Grand Prix',
    circuit: 'Autódromo Termas de Río Hondo',
    location: 'Termas de Río Hondo',
    country: 'Argentina',
    date: '2026-03-15T18:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
];

// Mock standings après sprint Thaïlande
const MOCK_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'pedro-acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'ESP',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 12,
    wins: 1,
  },
  {
    position: 2,
    rider: {
      id: 'francesco-bagnaia',
      number: 1,
      firstName: 'Francesco',
      lastName: 'Bagnaia',
      code: 'BAG',
      nationality: 'ITA',
      team: { id: 'ducati', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 9,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'marc-marquez',
      number: 93,
      firstName: 'Marc',
      lastName: 'Márquez',
      code: 'MAR',
      nationality: 'ESP',
      team: { id: 'ducati2', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 7,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'brad-binder',
      number: 33,
      firstName: 'Brad',
      lastName: 'Binder',
      code: 'BIN',
      nationality: 'RSA',
      team: { id: 'ktm2', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 6,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'jorge-martin',
      number: 89,
      firstName: 'Jorge',
      lastName: 'Martín',
      code: 'MAR',
      nationality: 'ESP',
      team: { id: 'aprilia', name: 'Aprilia Racing', shortName: 'Aprilia', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 5,
    wins: 0,
  },
];

// Mock news
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'MotoGP Thailand: Bagnaia wins dramatic Sprint after Marquez penalty',
    excerpt: 'Francesco Bagnaia takes victory in the inaugural Thailand Sprint after Marc Marquez receives a penalty.',
    publishedAt: '2026-02-28T10:30:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1030787/1/',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Rain threat for Sunday Thailand GP main race',
    excerpt: 'Weather forecasts predict possible rain for Sunday race day at Buriram.',
    publishedAt: '2026-02-28T12:00:00Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com/en/2026/02/28/motogp/',
    category: 'motogp',
  },
];

export async function getNextMotoGPRaces(): Promise<Race[]> {
  const now = new Date();
  return MOCK_RACES.filter(r => new Date(r.date) > now);
}

export async function getMotoGPStandings(): Promise<Standing[]> {
  return MOCK_STANDINGS;
}

export async function getMotoGPCalendar(): Promise<Race[]> {
  return MOCK_RACES;
}

export async function getMotoGPNews(): Promise<NewsItem[]> {
  return MOCK_NEWS;
}

export async function getMotoGPRaces(): Promise<Race[]> {
  return MOCK_RACES;
}

export async function getLastMotoGPRace(): Promise<Race | null> {
  return MOCK_RACES.find(r => r.status === 'finished' && r.raceType === 'race') || null;
}

export async function getLastMotoGPSprint(): Promise<Race | null> {
  return MOCK_RACES.find(r => r.status === 'finished' && r.raceType === 'sprint') || null;
}

export async function getMotoGPSprintResults(raceId: string): Promise<any[]> {
  return [];
}

export async function getNextWSBKRace(): Promise<any> {
  return null;
}

export async function getNextMXGPRace(): Promise<any> {
  return null;
}

export async function getMoto2Standings(): Promise<any[]> {
  return [];
}

export async function getMoto3Standings(): Promise<any[]> {
  return [];
}

export async function getMXGPStandings(): Promise<any[]> {
  return [];
}

export async function getMX2Standings(): Promise<any[]> {
  return [];
}

export async function getWSBKStandings(): Promise<any[]> {
  return [];
}
