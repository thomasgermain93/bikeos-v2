import { Race, Standing, NewsItem } from '@/types';

const SPORTSDB_API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

// Couleurs équipes MXGP
const MXGP_TEAM_COLORS: Record<string, string> = {
  'Red Bull GasGas Factory Racing': '#CC0000',
  'HRC Honda': '#FF0000',
  'Monster Energy Yamaha Factory MXGP Team': '#0000FF',
  'Red Bull KTM Factory Racing': '#FF6600',
  'Monster Energy Kawasaki Racing Team': '#00CC00',
  'Nestaan Husqvarna Factory Racing': '#0066CC',
  'Beta Factory Racing': '#DC2626',
  'MRT Racing Team': '#FFD700',
  'KMP Honda Racing': '#FF4444',
  'F&H Kawasaki Racing Team': '#00AA00',
};

// Couleurs équipes MX2
const MX2_TEAM_COLORS: Record<string, string> = {
  'Nestaan Husqvarna Factory Racing': '#0066CC',
  'Red Bull GasGas Factory Racing': '#CC0000',
  'Monster Energy Yamaha Factory MX2 Team': '#0000FF',
  'Red Bull KTM Factory Racing': '#FF6600',
  'F&H Kawasaki Racing Team': '#00AA00',
  'KTM SB Racing': '#FF8800',
  'Fantic Factory Racing MX2': '#00CED1',
  'Standing Construct Honda MX2': '#FF0000',
  'Hitachi KTM Fuelled by Milwaukee': '#FF6600',
};

// Données MXGP 2026 - Pilotes
const MXGP_DRIVERS_2026: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'mxgp-1',
      number: 222,
      firstName: 'Tim',
      lastName: 'Gajser',
      code: 'GAJ',
      nationality: 'SLO',
      team: { id: 'hrc', name: 'HRC Honda', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 2,
    rider: {
      id: 'mxgp-2',
      number: 61,
      firstName: 'Jorge',
      lastName: 'Prado',
      code: 'PRA',
      nationality: 'ESP',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'mxgp-3',
      number: 84,
      firstName: 'Jeffrey',
      lastName: 'Herlings',
      code: 'HER',
      nationality: 'NED',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'mxgp-4',
      number: 3,
      firstName: 'Romain',
      lastName: 'Febvre',
      code: 'FEB',
      nationality: 'FRA',
      team: { id: 'kawasaki', name: 'Monster Energy Kawasaki Racing Team', shortName: 'Kawasaki', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'mxgp-5',
      number: 28,
      firstName: 'Tom',
      lastName: 'Vialle',
      code: 'VIA',
      nationality: 'FRA',
      team: { id: 'kawasaki', name: 'Monster Energy Kawasaki Racing Team', shortName: 'Kawasaki', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'mxgp-6',
      number: 14,
      firstName: 'Jeremy',
      lastName: 'Seewer',
      code: 'SEE',
      nationality: 'SUI',
      team: { id: 'honda', name: 'KMP Honda Racing', shortName: 'Honda', color: '#FF4444' },
      color: '#FF4444',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'mxgp-7',
      number: 41,
      firstName: 'Pauls',
      lastName: 'Jonass',
      code: 'JON',
      nationality: 'LAT',
      team: { id: 'husqvarna', name: 'Nestaan Husqvarna Factory Racing', shortName: 'Husqvarna', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'mxgp-8',
      number: 10,
      firstName: 'Calvin',
      lastName: 'Vlaanderen',
      code: 'VLA',
      nationality: 'NED',
      team: { id: 'yamaha', name: 'Monster Energy Yamaha Factory MXGP Team', shortName: 'Yamaha', color: '#0000FF' },
      color: '#0000FF',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 9,
    rider: {
      id: 'mxgp-9',
      number: 132,
      firstName: 'Andrea',
      lastName: 'Bonacorsi',
      code: 'BON',
      nationality: 'ITA',
      team: { id: 'yamaha', name: 'Monster Energy Yamaha Factory MXGP Team', shortName: 'Yamaha', color: '#0000FF' },
      color: '#0000FF',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 10,
    rider: {
      id: 'mxgp-10',
      number: 919,
      firstName: 'Benoit',
      lastName: 'Paturel',
      code: 'PAT',
      nationality: 'FRA',
      team: { id: 'beta', name: 'Beta Factory Racing', shortName: 'Beta', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 0,
    wins: 0,
  },
];

// Données MX2 2026 - Pilotes
const MX2_DRIVERS_2026: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'mx2-1',
      number: 74,
      firstName: 'Kay',
      lastName: 'de Wolf',
      code: 'WOL',
      nationality: 'NED',
      team: { id: 'husqvarna', name: 'Nestaan Husqvarna Factory Racing', shortName: 'Husqvarna', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 2,
    rider: {
      id: 'mx2-2',
      number: 39,
      firstName: 'Lucas',
      lastName: 'Coenen',
      code: 'COE',
      nationality: 'BEL',
      team: { id: 'husqvarna', name: 'Nestaan Husqvarna Factory Racing', shortName: 'Husqvarna', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'mx2-3',
      number: 44,
      firstName: 'Mikkel',
      lastName: 'Haarup',
      code: 'HAA',
      nationality: 'DEN',
      team: { id: 'fantic', name: 'Fantic Factory Racing MX2', shortName: 'Fantic', color: '#00CED1' },
      color: '#00CED1',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'mx2-4',
      number: 80,
      firstName: 'Andrea',
      lastName: 'Adamo',
      code: 'ADA',
      nationality: 'ITA',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'mx2-5',
      number: 195,
      firstName: 'Thibault',
      lastName: 'Benistant',
      code: 'BEN',
      nationality: 'FRA',
      team: { id: 'yamaha', name: 'Monster Energy Yamaha Factory MX2 Team', shortName: 'Yamaha', color: '#0000FF' },
      color: '#0000FF',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'mx2-6',
      number: 26,
      firstName: 'Liam',
      lastName: 'Everts',
      code: 'EVE',
      nationality: 'BEL',
      team: { id: 'husqvarna', name: 'Nestaan Husqvarna Factory Racing', shortName: 'Husqvarna', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'mx2-7',
      number: 24,
      firstName: 'Kevin',
      lastName: 'Horgmo',
      code: 'HOR',
      nationality: 'NOR',
      team: { id: 'kawasaki', name: 'F&H Kawasaki Racing Team', shortName: 'Kawasaki', color: '#00AA00' },
      color: '#00AA00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'mx2-8',
      number: 516,
      firstName: 'Simon',
      lastName: 'Laengenfelder',
      code: 'LAE',
      nationality: 'GER',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 9,
    rider: {
      id: 'mx2-9',
      number: 6,
      firstName: 'Sacha',
      lastName: 'Coenen',
      code: 'COE',
      nationality: 'BEL',
      team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 10,
    rider: {
      id: 'mx2-10',
      number: 427,
      firstName: 'Hakon',
      lastName: 'Osterhagen',
      code: 'OST',
      nationality: 'NOR',
      team: { id: 'honda', name: 'Standing Construct Honda MX2', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 0,
    wins: 0,
  },
];

// Calendrier MXGP 2026 - 19 rounds
const MXGP_CALENDAR_2026: Race[] = [
  {
    id: 'mxgp-r1',
    round: 1,
    name: 'FIM MXGP of Argentina',
    circuit: 'Bariloche',
    location: 'Bariloche',
    country: 'Argentina',
    date: '2026-03-08T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r2',
    round: 2,
    name: 'FIM MXGP of Spain',
    circuit: 'Almonte',
    location: 'Almonte',
    country: 'Spain',
    date: '2026-03-22T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r3',
    round: 3,
    name: 'FIM MXGP of Switzerland',
    circuit: 'Frauenfeld',
    location: 'Frauenfeld',
    country: 'Switzerland',
    date: '2026-03-29T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r4',
    round: 4,
    name: 'FIM MXGP of Italy - Sardegna',
    circuit: 'Riola Sardo',
    location: 'Riola Sardo',
    country: 'Italy',
    date: '2026-04-12T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r5',
    round: 5,
    name: 'FIM MXGP of Italy - Trentino',
    circuit: 'Pietramurata',
    location: 'Pietramurata',
    country: 'Italy',
    date: '2026-04-19T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r6',
    round: 6,
    name: 'FIM MXGP of France',
    circuit: 'Lacapelle Marival',
    location: 'Lacapelle Marival',
    country: 'France',
    date: '2026-05-24T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r7',
    round: 7,
    name: 'FIM MXGP of Germany',
    circuit: 'Teutschenthal',
    location: 'Teutschenthal',
    country: 'Germany',
    date: '2026-05-31T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r8',
    round: 8,
    name: 'FIM MXGP of Latvia',
    circuit: 'Ķegums',
    location: 'Ķegums',
    country: 'Latvia',
    date: '2026-06-07T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r9',
    round: 9,
    name: 'FIM MXGP of Italy',
    circuit: 'Montevarchi',
    location: 'Montevarchi',
    country: 'Italy',
    date: '2026-06-21T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r10',
    round: 10,
    name: 'FIM MXGP of Portugal',
    circuit: 'Águeda',
    location: 'Águeda',
    country: 'Portugal',
    date: '2026-06-28T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r11',
    round: 11,
    name: 'FIM MXGP of South Africa',
    circuit: 'Johannesburg',
    location: 'Johannesburg',
    country: 'South Africa',
    date: '2026-07-05T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r12',
    round: 12,
    name: 'FIM MXGP of Great Britain',
    circuit: 'Foxhill',
    location: 'Foxhill',
    country: 'Great Britain',
    date: '2026-07-19T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r13',
    round: 13,
    name: 'FIM MXGP of Czech Republic',
    circuit: 'Loket',
    location: 'Loket',
    country: 'Czech Republic',
    date: '2026-07-26T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r14',
    round: 14,
    name: 'FIM MXGP of Belgium',
    circuit: 'Lommel',
    location: 'Lommel',
    country: 'Belgium',
    date: '2026-08-02T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r15',
    round: 15,
    name: 'FIM MXGP of Sweden',
    circuit: 'Uddevalla',
    location: 'Uddevalla',
    country: 'Sweden',
    date: '2026-08-16T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r16',
    round: 16,
    name: 'FIM MXGP of The Netherlands',
    circuit: 'Arnhem',
    location: 'Arnhem',
    country: 'Netherlands',
    date: '2026-08-23T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r17',
    round: 17,
    name: 'FIM MXGP of Turkiye',
    circuit: 'Afyonkarahisar',
    location: 'Afyonkarahisar',
    country: 'Turkey',
    date: '2026-09-06T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r18',
    round: 18,
    name: 'FIM MXGP of China',
    circuit: 'Shanghai',
    location: 'Shanghai',
    country: 'China',
    date: '2026-09-13T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r19',
    round: 19,
    name: 'FIM MXGP of Australia',
    circuit: 'Darwin',
    location: 'Darwin',
    country: 'Australia',
    date: '2026-09-20T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
];

// Calendrier MX2 2026 (même dates que MXGP)
const MX2_CALENDAR_2026: Race[] = MXGP_CALENDAR_2026.map(race => ({
  ...race,
  id: race.id.replace('mxgp', 'mx2'),
  type: 'mx2' as const,
}));

// Dernière course MXGP 2026 (saison non commencée)
const MXGP_LAST_RACE_2026: Race | null = null;

// Dernière course MX2 2026 (saison non commencée)
const MX2_LAST_RACE_2026: Race | null = null;

// News MXGP
const MXGP_NEWS: NewsItem[] = [
  {
    id: 'mxgp-news-1',
    title: 'MXGP 2026 season preview: Gajser, Prado, Herlings ready for battle',
    excerpt: 'The 2026 FIM Motocross World Championship promises to be one of the most competitive seasons yet.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-2',
    title: 'Jeffrey Herlings confirms full fitness ahead of Argentina opener',
    excerpt: 'The Dutchman is ready to challenge for his sixth world title after injury struggles.',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-3',
    title: 'Jorge Prado switches to KTM for 2026 season',
    excerpt: 'Spanish rider joins Red Bull KTM Factory Racing in major team move.',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'MX Vice',
    sourceUrl: 'https://www.mxvice.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-4',
    title: 'MXGP returns to South Africa after 18 years',
    excerpt: 'Johannesburg to host round 11 of the 2026 championship.',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: 'Vital MX',
    sourceUrl: 'https://www.vitalmx.com',
    category: 'mxgp',
  },
];

// News MX2
const MX2_NEWS: NewsItem[] = [
  {
    id: 'mx2-news-1',
    title: 'Kay de Wolf favorite for 2026 MX2 title defense',
    excerpt: 'Husqvarna rider looks to repeat his dominant 2024 campaign.',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mx2',
  },
  {
    id: 'mx2-news-2',
    title: 'Lucas Coenen and Liam Everts form strong Husqvarna duo',
    excerpt: 'Nestaan Husqvarna Factory Racing boasts impressive line-up.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'mx2',
  },
  {
    id: 'mx2-news-3',
    title: 'Andrea Adamo aims for MX2 crown with KTM',
    excerpt: 'Italian rider enters third season in MX2 class.',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'MX Vice',
    sourceUrl: 'https://www.mxvice.com',
    category: 'mx2',
  },
];

// API Functions
export async function getMXGPStandings(): Promise<Standing[]> {
  return MXGP_DRIVERS_2026;
}

export async function getMX2Standings(): Promise<Standing[]> {
  return MX2_DRIVERS_2026;
}

export async function getMXGPNextRace(): Promise<Race | null> {
  const nextRace = MXGP_CALENDAR_2026.find(r => r.status === 'upcoming');
  return nextRace || null;
}

export async function getMX2NextRace(): Promise<Race | null> {
  const nextRace = MX2_CALENDAR_2026.find(r => r.status === 'upcoming');
  return nextRace || null;
}

export async function getMXGPLastRace(): Promise<Race | null> {
  return MXGP_LAST_RACE_2026;
}

export async function getMX2LastRace(): Promise<Race | null> {
  return MX2_LAST_RACE_2026;
}

export async function getMXGPNews(): Promise<NewsItem[]> {
  return MXGP_NEWS;
}

export async function getMX2News(): Promise<NewsItem[]> {
  return MX2_NEWS;
}

export async function getMXGPRaces(): Promise<Race[]> {
  return MXGP_CALENDAR_2026;
}

export async function getMX2Races(): Promise<Race[]> {
  return MX2_CALENDAR_2026;
}

export async function getNextMXGPRace(): Promise<Race | null> {
  const now = new Date();
  const nextRace = MXGP_CALENDAR_2026.find(r => new Date(r.date) > now);
  return nextRace || MXGP_CALENDAR_2026[0] || null;
}

export async function getNextMX2Race(): Promise<Race | null> {
  const now = new Date();
  const nextRace = MX2_CALENDAR_2026.find(r => new Date(r.date) > now);
  return nextRace || MX2_CALENDAR_2026[0] || null;
}
