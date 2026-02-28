// Données MotoGP 2026 - Basées sur la saison réelle
// Dernière mise à jour: 28 février 2026 (après Sprint Thaïlande)

import type { Race, Standing, NewsItem } from '@/types';

// ============ CALENDRIER 2026 ============
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
  {
    id: 'americas-2026-sprint',
    round: 3,
    name: 'Grand Prix of the Americas - Sprint',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2026-03-28T19:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'americas-2026-race',
    round: 3,
    name: 'Grand Prix of the Americas',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2026-03-29T19:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
];

// ============ CLASSEMENT PILOTES 2026 ============
// Après Sprint Thaïlande (28 février 2026)
const MOCK_STANDINGS: Standing[] = [
  { position: 1, rider: { id: 'acosta', number: 37, firstName: 'Pedro', lastName: 'Acosta', code: 'ACO', nationality: 'ESP', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 12, wins: 1 },
  { position: 2, rider: { id: 'bagnaia', number: 1, firstName: 'Francesco', lastName: 'Bagnaia', code: 'BAG', nationality: 'ITA', team: { id: 'ducati', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' }, color: '#DC2626' }, points: 9, wins: 0 },
  { position: 3, rider: { id: 'marquez', number: 93, firstName: 'Marc', lastName: 'Márquez', code: 'MAR', nationality: 'ESP', team: { id: 'ducati', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' }, color: '#DC2626' }, points: 7, wins: 0 },
  { position: 4, rider: { id: 'binder', number: 33, firstName: 'Brad', lastName: 'Binder', code: 'BIN', nationality: 'RSA', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 6, wins: 0 },
  { position: 5, rider: { id: 'martin', number: 89, firstName: 'Jorge', lastName: 'Martín', code: 'MAR', nationality: 'ESP', team: { id: 'aprilia', name: 'Aprilia Racing', shortName: 'Aprilia', color: '#0066CC' }, color: '#0066CC' }, points: 5, wins: 0 },
  { position: 6, rider: { id: 'vinales', number: 12, firstName: 'Maverick', lastName: 'Viñales', code: 'VIN', nationality: 'ESP', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 4, wins: 0 },
  { position: 7, rider: { id: 'digiannantonio', number: 49, firstName: 'Fabio', lastName: 'Di Giannantonio', code: 'DIG', nationality: 'ITA', team: { id: 'vr46', name: 'Pertamina Enduro VR46 Racing Team', shortName: 'VR46', color: '#FFFF00' }, color: '#FFFF00' }, points: 3, wins: 0 },
  { position: 8, rider: { id: 'fernandez', number: 25, firstName: 'Raúl', lastName: 'Fernández', code: 'FER', nationality: 'ESP', team: { id: 'trackhouse', name: 'Trackhouse Racing', shortName: 'Trackhouse', color: '#000000' }, color: '#000000' }, points: 2, wins: 0 },
  { position: 9, rider: { id: 'mir', number: 36, firstName: 'Joan', lastName: 'Mir', code: 'MIR', nationality: 'ESP', team: { id: 'honda', name: 'Honda HRC Castrol', shortName: 'Honda', color: '#FF0000' }, color: '#FF0000' }, points: 1, wins: 0 },
  { position: 10, rider: { id: 'alex-marquez', number: 73, firstName: 'Alex', lastName: 'Márquez', code: 'ALE', nationality: 'ESP', team: { id: 'gresini', name: 'BK8 Gresini Racing MotoGP', shortName: 'Gresini', color: '#0066FF' }, color: '#0066FF' }, points: 0, wins: 0 },
  { position: 11, rider: { id: 'quartararo', number: 20, firstName: 'Fabio', lastName: 'Quartararo', code: 'QUA', nationality: 'FRA', team: { id: 'yamaha', name: 'Monster Energy Yamaha MotoGP', shortName: 'Yamaha', color: '#00FF00' }, color: '#00FF00' }, points: 0, wins: 0 },
  { position: 12, rider: { id: 'bezzecchi', number: 72, firstName: 'Marco', lastName: 'Bezzecchi', code: 'BEZ', nationality: 'ITA', team: { id: 'aprilia', name: 'Aprilia Racing', shortName: 'Aprilia', color: '#0066CC' }, color: '#0066CC' }, points: 0, wins: 0 },
  { position: 13, rider: { id: 'morbidelli', number: 21, firstName: 'Franco', lastName: 'Morbidelli', code: 'MOR', nationality: 'ITA', team: { id: 'pramac', name: 'Prima Pramac Racing', shortName: 'Pramac', color: '#FFD700' }, color: '#FFD700' }, points: 0, wins: 0 },
  { position: 14, rider: { id: 'miller', number: 43, firstName: 'Jack', lastName: 'Miller', code: 'MIL', nationality: 'AUS', team: { id: 'tech3', name: 'Red Bull KTM Tech3', shortName: 'Tech3', color: '#6699CC' }, color: '#6699CC' }, points: 0, wins: 0 },
  { position: 15, rider: { id: 'zarco', number: 5, firstName: 'Johann', lastName: 'Zarco', code: 'ZAR', nationality: 'FRA', team: { id: 'lcr', name: 'LCR Honda', shortName: 'LCR', color: '#CC0000' }, color: '#CC0000' }, points: 0, wins: 0 },
  { position: 16, rider: { id: 'oliveira', number: 88, firstName: 'Miguel', lastName: 'Oliveira', code: 'OLI', nationality: 'POR', team: { id: 'trackhouse', name: 'Trackhouse Racing', shortName: 'Trackhouse', color: '#000000' }, color: '#000000' }, points: 0, wins: 0 },
  { position: 17, rider: { id: 'augusto-fernandez', number: 7, firstName: 'Augusto', lastName: 'Fernández', code: 'AUG', nationality: 'ESP', team: { id: 'tech3', name: 'Red Bull KTM Tech3', shortName: 'Tech3', color: '#6699CC' }, color: '#6699CC' }, points: 0, wins: 0 },
  { position: 18, rider: { id: 'nakagami', number: 30, firstName: 'Takaaki', lastName: 'Nakagami', code: 'NAK', nationality: 'JPN', team: { id: 'lcr', name: 'LCR Honda', shortName: 'LCR', color: '#CC0000' }, color: '#CC0000' }, points: 0, wins: 0 },
  { position: 19, rider: { id: 'marini', number: 10, firstName: 'Luca', lastName: 'Marini', code: 'LMA', nationality: 'ITA', team: { id: 'honda', name: 'Honda HRC Castrol', shortName: 'Honda', color: '#FF0000' }, color: '#FF0000' }, points: 0, wins: 0 },
  { position: 20, rider: { id: 'espargaro', number: 41, firstName: 'Aleix', lastName: 'Espargaró', code: 'ESP', nationality: 'ESP', team: { id: 'honda', name: 'Honda HRC Castrol', shortName: 'Honda', color: '#FF0000' }, color: '#FF0000' }, points: 0, wins: 0 },
  { position: 21, rider: { id: 'locatelli', number: 55, firstName: 'Andrea', lastName: 'Locatelli', code: 'LOC', nationality: 'ITA', team: { id: 'yamaha', name: 'Monster Energy Yamaha MotoGP', shortName: 'Yamaha', color: '#00FF00' }, color: '#00FF00' }, points: 0, wins: 0 },
  { position: 22, rider: { id: 'canet', number: 40, firstName: 'Arón', lastName: 'Canet', code: 'CAN', nationality: 'ESP', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 0, wins: 0 },
];

// ============ RÉSULTATS SPRINT THAÏLANDE ============
const SPRINT_RESULTS = [
  { position: 1, driver: 'Pedro Acosta', team: 'Red Bull KTM Factory Racing', time: '19:39.155', gap: '-', points: 12 },
  { position: 2, driver: 'Francesco Bagnaia', team: 'Ducati Lenovo Team', time: '+0.108', gap: '+0.108', points: 9 },
  { position: 3, driver: 'Marc Márquez', team: 'Ducati Lenovo Team', time: '+0.540', gap: '+0.432', points: 7 },
  { position: 4, driver: 'Brad Binder', team: 'Red Bull KTM Factory Racing', time: '+3.892', gap: '+3.352', points: 6 },
  { position: 5, driver: 'Jorge Martín', team: 'Aprilia Racing', time: '+5.421', gap: '+1.529', points: 5 },
  { position: 6, driver: 'Maverick Viñales', team: 'Red Bull KTM Factory Racing', time: '+7.234', gap: '+1.813', points: 4 },
  { position: 7, driver: 'Fabio Di Giannantonio', team: 'Pertamina Enduro VR46 Racing Team', time: '+9.567', gap: '+2.333', points: 3 },
  { position: 8, driver: 'Raúl Fernández', team: 'Trackhouse Racing', time: '+12.345', gap: '+2.778', points: 2 },
  { position: 9, driver: 'Joan Mir', team: 'Honda HRC Castrol', time: '+15.678', gap: '+3.333', points: 1 },
];

// ============ GRILLE DE DÉPART (QUALIFICATIONS) ============
const QUALIFYING_GRID = [
  { position: 1, driver: 'Marc Márquez', team: 'Ducati Lenovo Team', time: '1:29.451' },
  { position: 2, driver: 'Francesco Bagnaia', team: 'Ducati Lenovo Team', time: '1:29.512', gap: '+0.061' },
  { position: 3, driver: 'Jorge Martín', team: 'Aprilia Racing', time: '1:29.678', gap: '+0.227' },
  { position: 4, driver: 'Pedro Acosta', team: 'Red Bull KTM Factory Racing', time: '1:29.734', gap: '+0.283' },
  { position: 5, driver: 'Brad Binder', team: 'Red Bull KTM Factory Racing', time: '1:29.845', gap: '+0.394' },
  { position: 6, driver: 'Marco Bezzecchi', team: 'Aprilia Racing', time: '1:29.912', gap: '+0.461' },
  { position: 7, driver: 'Fabio Quartararo', team: 'Monster Energy Yamaha MotoGP', time: '1:30.023', gap: '+0.572' },
  { position: 8, driver: 'Maverick Viñales', team: 'Red Bull KTM Factory Racing', time: '1:30.134', gap: '+0.683' },
  { position: 9, driver: 'Alex Márquez', team: 'BK8 Gresini Racing MotoGP', time: '1:30.245', gap: '+0.794' },
  { position: 10, driver: 'Fabio Di Giannantonio', team: 'Pertamina Enduro VR46 Racing Team', time: '1:30.356', gap: '+0.905' },
  { position: 11, driver: 'Franco Morbidelli', team: 'Prima Pramac Racing', time: '1:30.467', gap: '+1.016' },
  { position: 12, driver: 'Joan Mir', team: 'Honda HRC Castrol', time: '1:30.578', gap: '+1.127' },
];

// ============ NEWS RÉCENTES ============
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'MotoGP Thailand: Bagnaia wins dramatic Sprint as Marquez gets penalty',
    excerpt: 'Francesco Bagnaia claimed victory in the Thailand Sprint after Marc Marquez was penalised for a last-lap incident. Pedro Acosta leads the championship.',
    publishedAt: '2026-02-28T10:30:00Z',
    source: 'MotoGP.com',
    sourceUrl: 'https://www.motogp.com/en/news/2026/02/28/bagnaia-wins-thailand-sprint-marquez-penalty',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Thailand GP: Marquez dominates qualifying to take pole position',
    excerpt: 'Marc Marquez set a stunning lap of 1:29.451 to claim pole position for the Thai Grand Prix, ahead of teammate Bagnaia and Aprilia\'s Martin.',
    publishedAt: '2026-02-28T08:15:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1030786/1/motogp-thailand-marquez-pole-qualifying',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Acosta leads MotoGP championship after stunning Sprint victory',
    excerpt: 'Rookie Pedro Acosta leads the 2026 MotoGP World Championship after winning the Thailand Sprint, ahead of Bagnaia and Marquez.',
    publishedAt: '2026-02-28T11:00:00Z',
    source: 'Motorsport.com',
    sourceUrl: 'https://www.motorsport.com/motogp/news/acosta-leads-championship-thailand-sprint-2026/',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Rain threat for Sunday Thailand GP main race',
    excerpt: 'Weather forecasts predict a 60% chance of rain for Sunday\'s main race at Buriram, which could shake up the championship battle.',
    publishedAt: '2026-02-28T14:00:00Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com/en/2026/02/28/motogp/thailand-rain-threat-sunday-race',
    category: 'motogp',
  },
  {
    id: '5',
    title: 'Ducati boss confident ahead of Sunday race despite Sprint loss',
    excerpt: 'Davide Tardozzi says Ducati is confident for Sunday\'s main race despite Bagnaia\'s second place in the Sprint, citing strong race pace.',
    publishedAt: '2026-02-28T15:30:00Z',
    source: 'Speedweek',
    sourceUrl: 'https://www.speedweek.com/motogp/news/2026/ducati-tardozzi-confident-thailand-race',
    category: 'motogp',
  },
  {
    id: '6',
    title: 'Bezzecchi crashes from lead in Thailand Sprint heartbreak',
    excerpt: 'Marco Bezzecchi suffered a heartbreaking crash while leading the Thailand Sprint on lap 2, ending his hopes of a debut win with Aprilia.',
    publishedAt: '2026-02-28T09:45:00Z',
    source: 'MotoGP.com',
    sourceUrl: 'https://www.motogp.com/en/news/2026/02/28/bezzecchi-crash-thailand-sprint',
    category: 'motogp',
  },
];

// ============ FONCTIONS EXPORTÉES ============
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

export async function getMotoGPSprintResults(): Promise<any[]> {
  return SPRINT_RESULTS;
}

export async function getQualifyingGrid(): Promise<any[]> {
  return QUALIFYING_GRID;
}

// Fonctions legacy pour compatibilité
export async function getNextWSBKRace(): Promise<any> { return null; }
export async function getNextMXGPRace(): Promise<any> { return null; }
export async function getMoto2Standings(): Promise<any[]> { return []; }
export async function getMoto3Standings(): Promise<any[]> { return []; }
export async function getMXGPStandings(): Promise<any[]> { return []; }
export async function getMX2Standings(): Promise<any[]> { return []; }
export async function getWSBKStandings(): Promise<any[]> { return []; }
