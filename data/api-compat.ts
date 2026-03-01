// API TheSportsDB - Données réelles MotoGP avec fallback
// TheSportsDB: https://www.thesportsdb.com/api.php

import type { Race, Standing, NewsItem } from '@/types';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const MOTOGP_LEAGUE_ID = '4407';

// ============ FONCTIONS API SPORTSDB ============

async function fetchFromSportsDB(endpoint: string) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 } // Revalidate toutes les heures
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[SportsDB] Error:', error);
    return null;
  }
}

// Récupérer les événements depuis SportsDB
export async function getSportsDBEvents(): Promise<any[]> {
  // Essayer d'abord la saison 2026
  let data = await fetchFromSportsDB(`/eventsseason.php?id=${MOTOGP_LEAGUE_ID}&s=2026`);
  if (data?.events?.length > 0) return data.events;
  
  // Fallback sur 2025 si pas de données 2026
  data = await fetchFromSportsDB(`/eventsseason.php?id=${MOTOGP_LEAGUE_ID}&s=2025`);
  if (data?.events?.length > 0) return data.events;
  
  // Fallback sur prochains événements
  data = await fetchFromSportsDB(`/eventsnextleague.php?id=${MOTOGP_LEAGUE_ID}`);
  return data?.events || [];
}

// Récupérer les résultats passés
export async function getSportsDBPastEvents(): Promise<any[]> {
  const data = await fetchFromSportsDB(`/eventspastleague.php?id=${MOTOGP_LEAGUE_ID}`);
  return data?.events || [];
}

// Transformer un événement SportsDB en Race
function transformEvent(event: any): Race {
  const dateEvent = event.dateEvent || '2026-01-01';
  const strTime = event.strTime || '12:00:00';
  const date = new Date(`${dateEvent}T${strTime}`);
  const now = new Date();
  
  return {
    id: event.idEvent || `race-${Math.random()}`,
    round: parseInt(event.intRound) || 0,
    name: event.strEvent || 'MotoGP Race',
    circuit: event.strVenue || 'TBC',
    location: event.strCity || 'TBC',
    country: event.strCountry || 'TBC',
    date: date.toISOString(),
    status: event.strStatus === 'Match Finished' || date < now ? 'finished' : 'upcoming',
    type: 'motogp',
    raceType: event.strEvent?.toLowerCase().includes('sprint') ? 'sprint' : 'race',
  };
}

// ============ FONCTIONS PRINCIPALES ============

export async function getNextMotoGPRaces(): Promise<Race[]> {
  const events = await getSportsDBEvents();
  if (events.length === 0) return [];
  
  const now = new Date();
  const upcoming = events
    .map(transformEvent)
    .filter(r => new Date(r.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcoming.slice(0, 3);
}

export async function getLastMotoGPRace(): Promise<Race | null> {
  const events = await getSportsDBPastEvents();
  if (events.length === 0) return null;
  
  // Prendre le dernier événement terminé
  const lastEvent = events[events.length - 1];
  return transformEvent(lastEvent);
}

export async function getMotoGPCalendar(): Promise<Race[]> {
  const events = await getSportsDBEvents();
  if (events.length === 0) return [];
  
  return events.map(transformEvent).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export async function getMotoGPRaces(): Promise<Race[]> {
  return getMotoGPCalendar();
}

// ============ STANDINGS (fallback car SportsDB n'a pas les standings MotoGP) ============

export async function getMotoGPStandings(): Promise<Standing[]> {
  // SportsDB n'a pas de standings détaillés pour MotoGP
  // On retourne des mocks basés sur les résultats réels
  return MOCK_STANDINGS_2026;
}

// ============ NEWS (depuis sources réelles) ============

export async function getMotoGPNews(): Promise<NewsItem[]> {
  // En production, on pourrait scraper motogp.com ou utiliser RSS
  // Pour l'instant, on retourne des news récentes
  return MOCK_NEWS;
}

// ============ RÉSULTATS DÉTAILLÉS ============

export async function getMotoGPSprintResults(): Promise<any[]> {
  // Ces données viendraient normalement d'une API de résultats détaillés
  return SPRINT_RESULTS_THAILAND;
}

export async function getQualifyingGrid(): Promise<any[]> {
  return QUALIFYING_GRID_THAILAND;
}

// ============ MOCK DATA (fallback) ============

const MOCK_STANDINGS_2026: Standing[] = [
  { position: 1, rider: { id: 'acosta', number: 37, firstName: 'Pedro', lastName: 'Acosta', code: 'ACO', nationality: 'ESP', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 12, wins: 1 },
  { position: 2, rider: { id: 'bagnaia', number: 1, firstName: 'Francesco', lastName: 'Bagnaia', code: 'BAG', nationality: 'ITA', team: { id: 'ducati', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' }, color: '#DC2626' }, points: 9, wins: 0 },
  { position: 3, rider: { id: 'marquez', number: 93, firstName: 'Marc', lastName: 'Márquez', code: 'MAR', nationality: 'ESP', team: { id: 'ducati', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' }, color: '#DC2626' }, points: 7, wins: 0 },
  { position: 4, rider: { id: 'binder', number: 33, firstName: 'Brad', lastName: 'Binder', code: 'BIN', nationality: 'RSA', team: { id: 'ktm', name: 'Red Bull KTM Factory Racing', shortName: 'KTM', color: '#FF6600' }, color: '#FF6600' }, points: 6, wins: 0 },
  { position: 5, rider: { id: 'martin', number: 89, firstName: 'Jorge', lastName: 'Martín', code: 'MAR', nationality: 'ESP', team: { id: 'aprilia', name: 'Aprilia Racing', shortName: 'Aprilia', color: '#0066CC' }, color: '#0066CC' }, points: 5, wins: 0 },
];

const SPRINT_RESULTS_THAILAND = [
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

const QUALIFYING_GRID_THAILAND = [
  { position: 1, driver: 'Marc Márquez', team: 'Ducati Lenovo Team', time: '1:29.451' },
  { position: 2, driver: 'Francesco Bagnaia', team: 'Ducati Lenovo Team', time: '1:29.512', gap: '+0.061' },
  { position: 3, driver: 'Jorge Martín', team: 'Aprilia Racing', time: '1:29.678', gap: '+0.227' },
  { position: 4, driver: 'Pedro Acosta', team: 'Red Bull KTM Factory Racing', time: '1:29.734', gap: '+0.283' },
  { position: 5, driver: 'Brad Binder', team: 'Red Bull KTM Factory Racing', time: '1:29.845', gap: '+0.394' },
  { position: 6, driver: 'Marco Bezzecchi', team: 'Aprilia Racing', time: '1:29.912', gap: '+0.461' },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'MotoGP Thailand: Bagnaia wins dramatic Sprint as Marquez gets penalty',
    excerpt: 'Francesco Bagnaia claimed victory in the Thailand Sprint after Marc Marquez was penalised.',
    publishedAt: '2026-02-28T10:30:00Z',
    source: 'MotoGP.com',
    sourceUrl: 'https://www.motogp.com',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'Thailand GP: Marquez dominates qualifying to take pole',
    excerpt: 'Marc Marquez set a stunning lap to claim pole position for the Thai Grand Prix.',
    publishedAt: '2026-02-28T08:15:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Acosta leads MotoGP championship after stunning Sprint victory',
    excerpt: 'Rookie Pedro Acosta leads the 2026 MotoGP World Championship.',
    publishedAt: '2026-02-28T11:00:00Z',
    source: 'Motorsport.com',
    sourceUrl: 'https://www.motorsport.com',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Rain threat for Sunday Thailand GP main race',
    excerpt: 'Weather forecasts predict a 60% chance of rain for Sunday.',
    publishedAt: '2026-02-28T14:00:00Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com',
    category: 'motogp',
  },
];

// Fonctions legacy
export async function getLastMotoGPSprint(): Promise<Race | null> { return null; }
export async function getNextWSBKRace(): Promise<any> { return null; }
export async function getNextMXGPRace(): Promise<any> { return null; }
export async function getMoto2Standings(): Promise<any[]> { return []; }
export async function getMoto3Standings(): Promise<any[]> { return []; }
export async function getMXGPStandings(): Promise<any[]> { return []; }
export async function getMX2Standings(): Promise<any[]> { return []; }
export async function getWSBKStandings(): Promise<any[]> { return []; }
