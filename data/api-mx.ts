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

// Données MXGP 2025 - Pilotes
const MXGP_DRIVERS_2025: Standing[] = [
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
    points: 92,
    wins: 2,
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
      team: { id: 'gasgas', name: 'Red Bull GasGas Factory Racing', shortName: 'GasGas', color: '#CC0000' },
      color: '#CC0000',
    },
    points: 88,
    wins: 1,
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
    points: 76,
    wins: 1,
  },
  {
    position: 4,
    rider: {
      id: 'mxgp-4',
      number: 259,
      firstName: 'Glenn',
      lastName: 'Coldenhoff',
      code: 'COL',
      nationality: 'NED',
      team: { id: 'fantic', name: 'Fantic Factory Racing', shortName: 'Fantic', color: '#00CED1' },
      color: '#00CED1',
    },
    points: 68,
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
    points: 64,
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
      team: { id: 'ktm', name: 'KMP Honda Racing', shortName: 'Honda', color: '#FF4444' },
      color: '#FF4444',
    },
    points: 58,
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
    points: 54,
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
    points: 48,
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
    points: 44,
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
    points: 40,
    wins: 0,
  },
];

// Données MX2 2025 - Pilotes
const MX2_DRIVERS_2025: Standing[] = [
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
    points: 98,
    wins: 3,
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
    points: 86,
    wins: 1,
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
    points: 72,
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
    points: 66,
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
    points: 62,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'mx2-6',
      number: 11,
      firstName: 'Jan',
      lastName: 'Wagenknecht',
      code: 'WAG',
      nationality: 'CZE',
      team: { id: 'ktm', name: 'MJC Yamaha Official EMX2T Team', shortName: 'Yamaha', color: '#0000FF' },
      color: '#0000FF',
    },
    points: 54,
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
    points: 50,
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
      team: { id: 'gasgas', name: 'Red Bull GasGas Factory Racing', shortName: 'GasGas', color: '#CC0000' },
      color: '#CC0000',
    },
    points: 46,
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
    points: 42,
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
    points: 38,
    wins: 0,
  },
];

// Calendrier MXGP 2025
const MXGP_CALENDAR_2025: Race[] = [
  {
    id: 'mxgp-r1',
    round: 1,
    name: 'FIM MXGP of Argentina',
    circuit: 'Circuito Villa La Angostura',
    location: 'Villa La Angostura',
    country: 'Argentina',
    date: '2025-03-02T14:00:00',
    status: 'finished',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r2',
    round: 2,
    name: 'FIM MXGP of Spain',
    circuit: 'Intu Xanadú - Arroyomolinos',
    location: 'Madrid',
    country: 'Spain',
    date: '2025-03-16T14:00:00',
    status: 'finished',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r3',
    round: 3,
    name: 'FIM MXGP of Switzerland',
    circuit: 'Frauenfeld',
    location: 'Frauenfeld',
    country: 'Switzerland',
    date: '2025-03-23T14:00:00',
    status: 'finished',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r4',
    round: 4,
    name: 'FIM MXGP of Italy',
    circuit: 'Maggiora Park',
    location: 'Maggiora',
    country: 'Italy',
    date: '2025-04-06T14:00:00',
    status: 'finished',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r5',
    round: 5,
    name: 'FIM MXGP of Portugal',
    circuit: 'Águeda',
    location: 'Águeda',
    country: 'Portugal',
    date: '2025-05-04T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r6',
    round: 6,
    name: 'FIM MXGP of France',
    circuit: 'St Jean d\'Angely',
    location: 'St Jean d\'Angely',
    country: 'France',
    date: '2025-05-18T14:00:00',
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
    date: '2025-05-25T14:00:00',
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
    date: '2025-06-08T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r9',
    round: 9,
    name: 'FIM MXGP of Great Britain',
    circuit: 'Matterley Basin',
    location: 'Winchester',
    country: 'Great Britain',
    date: '2025-06-22T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r10',
    round: 10,
    name: 'FIM MXGP of Italy - Lombardia',
    circuit: 'Mantova',
    location: 'Mantova',
    country: 'Italy',
    date: '2025-06-29T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r11',
    round: 11,
    name: 'FIM MXGP of Czech Republic',
    circuit: 'Loket',
    location: 'Loket',
    country: 'Czech Republic',
    date: '2025-07-06T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r12',
    round: 12,
    name: 'FIM MXGP of Belgium',
    circuit: 'Lommel',
    location: 'Lommel',
    country: 'Belgium',
    date: '2025-07-20T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r13',
    round: 13,
    name: 'FIM MXGP of Sweden',
    circuit: 'Uddevalla',
    location: 'Uddevalla',
    country: 'Sweden',
    date: '2025-07-27T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r14',
    round: 14,
    name: 'FIM MXGP of The Netherlands',
    circuit: 'Arnhem',
    location: 'Arnhem',
    country: 'Netherlands',
    date: '2025-08-10T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r15',
    round: 15,
    name: 'FIM MXGP of Finland',
    circuit: 'Vantaa',
    location: 'Vantaa',
    country: 'Finland',
    date: '2025-08-17T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r16',
    round: 16,
    name: 'FIM MXGP of Turkiye',
    circuit: 'Afyonkarahisar',
    location: 'Afyonkarahisar',
    country: 'Turkey',
    date: '2025-09-07T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r17',
    round: 17,
    name: 'FIM MXGP of China',
    circuit: 'Shanghai',
    location: 'Shanghai',
    country: 'China',
    date: '2025-09-14T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
  {
    id: 'mxgp-r18',
    round: 18,
    name: 'FIM MXGP of Australia',
    circuit: 'Wonthaggi',
    location: 'Wonthaggi',
    country: 'Australia',
    date: '2025-09-28T14:00:00',
    status: 'upcoming',
    type: 'mxgp',
  },
];

// Calendrier MX2 2025 (même dates que MXGP)
const MX2_CALENDAR_2025: Race[] = MXGP_CALENDAR_2025.map(race => ({
  ...race,
  id: race.id.replace('mxgp', 'mx2'),
  type: 'mx2' as const,
}));

// Dernière course MXGP (dernier round terminé)
const MXGP_LAST_RACE_2025: Race = {
  id: 'mxgp-r4',
  round: 4,
  name: 'FIM MXGP of Italy',
  circuit: 'Maggiora Park',
  location: 'Maggiora',
  country: 'Italy',
  date: '2025-04-06T14:00:00',
  status: 'finished',
  type: 'mxgp',
};

// Dernière course MX2
const MX2_LAST_RACE_2025: Race = {
  id: 'mx2-r4',
  round: 4,
  name: 'FIM MXGP of Italy',
  circuit: 'Maggiora Park',
  location: 'Maggiora',
  country: 'Italy',
  date: '2025-04-06T14:00:00',
  status: 'finished',
  type: 'mx2',
};

// News MXGP
const MXGP_NEWS: NewsItem[] = [
  {
    id: 'mxgp-news-1',
    title: 'Tim Gajser takes red plate after Maggiora victory',
    excerpt: 'The Honda rider dominates in Italy to take the championship lead.',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-2',
    title: 'Jeffrey Herlings confirms injury recovery on schedule',
    excerpt: 'The Dutchman expects to be at 100% for the Portuguese GP.',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-3',
    title: 'Jorge Prado frustrated after double DNF at home',
    excerpt: 'Spanish rider suffers tough weekend at Maggiora.',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'MX Vice',
    sourceUrl: 'https://www.mxvice.com',
    category: 'mxgp',
  },
  {
    id: 'mxgp-news-4',
    title: 'Glenn Coldenhoff joins Fantic Factory Racing',
    excerpt: 'Dutch rider switches teams mid-season in shock move.',
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
    title: 'Kay de Wolf extends championship lead with Maggiora sweep',
    excerpt: 'Husqvarna rider unstoppable in Italy, now 12 points clear.',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'MXGP',
    sourceUrl: 'https://www.mxgp.com',
    category: 'mx2',
  },
  {
    id: 'mx2-news-2',
    title: 'Lucas Coenen signs factory Husqvarna extension',
    excerpt: 'Belgian prospect commits to long-term deal with Nestaan.',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'Motorsport',
    sourceUrl: 'https://www.motorsport.com',
    category: 'mx2',
  },
  {
    id: 'mx2-news-3',
    title: 'Andrea Adamo back on podium after injury comeback',
    excerpt: 'Italian shows resilience with third place at Maggiora.',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'MX Vice',
    sourceUrl: 'https://www.mxvice.com',
    category: 'mx2',
  },
];

// API Functions
export async function getMXGPStandings(): Promise<Standing[]> {
  return MXGP_DRIVERS_2025;
}

export async function getMX2Standings(): Promise<Standing[]> {
  return MX2_DRIVERS_2025;
}

export async function getMXGPNextRace(): Promise<Race | null> {
  const nextRace = MXGP_CALENDAR_2025.find(r => r.status === 'upcoming');
  return nextRace || null;
}

export async function getMX2NextRace(): Promise<Race | null> {
  const nextRace = MX2_CALENDAR_2025.find(r => r.status === 'upcoming');
  return nextRace || null;
}

export async function getMXGPLastRace(): Promise<Race | null> {
  return MXGP_LAST_RACE_2025;
}

export async function getMX2LastRace(): Promise<Race | null> {
  return MX2_LAST_RACE_2025;
}

export async function getMXGPNews(): Promise<NewsItem[]> {
  return MXGP_NEWS;
}

export async function getMX2News(): Promise<NewsItem[]> {
  return MX2_NEWS;
}

export async function getMXGPRaces(): Promise<Race[]> {
  return MXGP_CALENDAR_2025;
}

export async function getMX2Races(): Promise<Race[]> {
  return MX2_CALENDAR_2025;
}
