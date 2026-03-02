// API TheSportsDB - Données réelles MotoGP avec fallback
// TheSportsDB: https://www.thesportsdb.com/api.php

import type { Race, Standing, NewsItem, RaceResult, Rider } from '@/types';
import { fetchMotoGPNews } from './news-service';

const API_KEY = process.env.THE_SPORTS_DB_API_KEY || '3';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
const MOTOGP_LEAGUE_ID = '4407';

// ============ FONCTIONS API SPORTSDB ============

async function fetchFromSportsDB(endpoint: string) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 } // Revalidate toutes les heures
    });

    if (!response.ok) {
        if (response.status === 429) {
            console.warn('[SportsDB] Rate limited (429)');
        }
        return null;
    }

    const text = await response.text();
    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch (e) {
        return null;
    }
  } catch (error) {
    console.error('[SportsDB] Fetch Error:', error);
    return null;
  }
}

// Récupérer les événements depuis SportsDB
export async function getSportsDBEvents(): Promise<any[]> {
  const currentYear = new Date().getFullYear();
  let data = await fetchFromSportsDB(`/eventsseason.php?id=${MOTOGP_LEAGUE_ID}&s=${currentYear}`);
  if (!data?.events || data.events.length === 0) {
    data = await fetchFromSportsDB(`/eventsseason.php?id=${MOTOGP_LEAGUE_ID}&s=${currentYear - 1}`);
  }
  return data?.events || [];
}

// Récupérer les résultats d'un événement
export async function getEventResults(eventId: string): Promise<RaceResult[]> {
  const data = await fetchFromSportsDB(`/eventresults.php?id=${eventId}`);
  if (!data?.results) return [];

  return data.results.map((r: any, i: number): RaceResult => ({
    position: parseInt(r.intPosition) || i + 1,
    rider: {
      id: r.idPlayer || r.strPlayer,
      firstName: r.strPlayer.split(' ')[0],
      lastName: r.strPlayer.split(' ').slice(1).join(' '),
      number: 0,
      code: r.strPlayer.substring(0, 3).toUpperCase(),
      nationality: '',
      team: { id: '', name: '', shortName: '', color: '#666' },
      color: '#666'
    },
    team: { id: '', name: '', shortName: '', color: '#666' },
    points: 0, // Sera calculé selon le type de session
    time: r.strResult
  }));
}

// Transformer un événement SportsDB en Race
function transformEvent(event: any): Race {
  const dateEvent = event.dateEvent || '2025-01-01';
  let strTime = event.strTime || '12:00:00';

  // Normaliser le format de l'heure
  if (strTime.length === 5) strTime += ':00';

  const dateStr = `${dateEvent}T${strTime.includes('Z') ? strTime : strTime + 'Z'}`;
  const date = new Date(dateStr);
  const now = new Date();
  
  const eventName = (event.strEvent || '').toLowerCase();
  let raceType: 'race' | 'sprint' | 'qualifying' = 'race';

  if (eventName.includes('sprint')) raceType = 'sprint';
  else if (eventName.includes('qualifying') || eventName.includes('qualification')) raceType = 'qualifying';

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
    raceType: raceType as any,
  };
}

// ============ FONCTIONS PRINCIPALES ============

export async function getMotoGPRoundById(id: string): Promise<Race | null> {
    const data = await fetchFromSportsDB(`/lookupevent.php?id=${id}`);
    if (!data?.events?.[0]) return null;
    return transformEvent(data.events[0]);
}

export async function getMotoGPRaceResults(id: string): Promise<{ qualifying: RaceResult[], sprint: RaceResult[], race: RaceResult[], fastestLap?: any }> {
    const race = await getMotoGPRoundById(id);
    if (!race) return { qualifying: [], sprint: [], race: [] };

    const results = await getEventResults(id);

    // Points mapping
    const pointsMapSprint = [12, 9, 7, 6, 5, 4, 3, 2, 1];
    const pointsMapRace = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const mappedResults = results.map((r, i) => ({
        ...r,
        points: race.raceType === 'sprint' ? (pointsMapSprint[i] || 0) : (race.raceType === 'race' ? (pointsMapRace[i] || 0) : 0)
    }));

    return {
        qualifying: race.raceType === 'qualifying' ? mappedResults : [],
        sprint: race.raceType === 'sprint' ? mappedResults : [],
        race: race.raceType === 'race' ? mappedResults : [],
        fastestLap: undefined // Non fourni directement de façon simple par SportsDB
    };
}

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
  const events = await getSportsDBEvents();
  if (events.length === 0) return null;
  
  const finished = events
    .map(transformEvent)
    .filter(r => r.status === 'finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (finished.length === 0) return null;

  const race = finished[0];
  const results = await getEventResults(race.id);

  if (results.length > 0) {
    const pointsMap = race.raceType === 'sprint'
        ? [12, 9, 7, 6, 5, 4, 3, 2, 1]
        : [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    race.results = results.map((r, i) => ({
        ...r,
        points: pointsMap[i] || 0
    }));
  }

  return race;
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

export async function getMotoGPTeams(): Promise<any[]> {
  const data = await fetchFromSportsDB(`/search_all_teams.php?l=MotoGP`);
  return data?.teams || [];
}

export async function getMotoGPStandings(): Promise<Standing[]> {
  const currentYear = new Date().getFullYear();
  let data = await fetchFromSportsDB(`/lookuptable.php?l=${MOTOGP_LEAGUE_ID}&s=${currentYear}`);

  if (!data?.table || data.table.length === 0) {
    const events = await getSportsDBEvents();
    const finishedEvents = events
      .filter((e: any) => e.strStatus === 'Match Finished' && e.strResult)
      .sort((a: any, b: any) => new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime());

    if (finishedEvents.length > 0) {
      const lastEvent = finishedEvents[0];
      const resultText = lastEvent.strResult || '';

      const standingsSection = resultText.split(/Championship standings|Rider Standing/i)[1];
      if (standingsSection) {
        const lines = standingsSection.split('\n').filter((l: string) => /^\d+/.test(l.trim()));
        if (lines.length > 0) {
          return lines.map((line: string): Standing => {
            const parts = line.split('/').map(p => p.trim());
            const pos = parseInt(parts[0]);
            const name = parts[1] || 'Unknown';
            const team = parts[2] || 'Independent';
            const pts = parseInt(parts[3]) || 0;

            const nameParts = name.split(' ');
            return {
              position: pos,
              rider: {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' '),
                number: 0,
                code: name.substring(0, 3).toUpperCase(),
                nationality: '',
                team: {
                  id: team.toLowerCase().replace(/\s+/g, '-'),
                  name: team,
                  shortName: team.substring(0, 3).toUpperCase(),
                  color: '#ef4444'
                },
                color: '#ef4444'
              },
              points: pts,
              wins: 0
            };
          });
        }
      }
    }

    data = await fetchFromSportsDB(`/lookuptable.php?l=${MOTOGP_LEAGUE_ID}&s=${currentYear - 1}`);
  }

  if (data?.table?.length > 0) {
    return data.table.map((s: any): Standing => {
      const name = s.strTeam || s.strPlayer || 'Unknown Rider';
      const parts = name.split(' ');
      return {
        position: parseInt(s.intRank) || 0,
        rider: {
          id: s.idPlayer || s.idTeam || name,
          firstName: parts[0],
          lastName: parts.slice(1).join(' '),
          number: 0,
          code: name.substring(0, 3).toUpperCase(),
          nationality: '',
          team: {
            id: s.idTeam || '',
            name: s.strTeam || 'Independent',
            shortName: (s.strTeam || '').substring(0, 3).toUpperCase(),
            color: '#ef4444'
          },
          color: '#ef4444'
        },
        points: parseInt(s.intPoints) || 0,
        wins: parseInt(s.intWin) || 0
      };
    }).sort((a, b) => a.position - b.position);
  }

  return MOCK_STANDINGS;
}

export async function getMotoGPNews(): Promise<NewsItem[]> {
  try {
    const news = await fetchMotoGPNews();
    if (news && news.length > 0) return news;
  } catch (err) {
    console.error('[API-Compat] Error loading news:', err);
  }

  const { MOTOGP_NEWS } = require('./news');
  return MOTOGP_NEWS;
}

export async function getMotoGPSprintResults(): Promise<RaceResult[]> {
  const events = await getSportsDBEvents();
  const lastSprint = events
    .map(transformEvent)
    .filter(r => r.raceType === 'sprint' && r.status === 'finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!lastSprint) return [];
  const results = await getEventResults(lastSprint.id);
  const pointsMap = [12, 9, 7, 6, 5, 4, 3, 2, 1];
  return results.map((r, i) => ({ ...r, points: pointsMap[i] || 0 }));
}

export async function getQualifyingGrid(): Promise<RaceResult[]> {
  const events = await getSportsDBEvents();
  const lastQualy = events
    .map(transformEvent)
    .filter(r => (r as any).raceType === 'qualifying' && r.status === 'finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!lastQualy) return [];
  return getEventResults(lastQualy.id);
}

const MOCK_STANDINGS: Standing[] = [
  { position: 1, rider: { id: 'martin', number: 89, firstName: 'Jorge', lastName: 'Martín', code: 'MAR', nationality: 'ESP', team: { id: 'p1', name: 'Prima Pramac Racing', shortName: 'Pramac', color: '#DC2626' }, color: '#DC2626' }, points: 508, wins: 3 },
  { position: 2, rider: { id: 'bagnaia', number: 1, firstName: 'Francesco', lastName: 'Bagnaia', code: 'BAG', nationality: 'ITA', team: { id: 'd1', name: 'Ducati Lenovo Team', shortName: 'Ducati', color: '#DC2626' }, color: '#DC2626' }, points: 498, wins: 11 },
  { position: 3, rider: { id: 'marquez', number: 93, firstName: 'Marc', lastName: 'Márquez', code: 'MAR', nationality: 'ESP', team: { id: 'g1', name: 'Gresini Racing MotoGP', shortName: 'Gresini', color: '#DC2626' }, color: '#DC2626' }, points: 392, wins: 3 },
];

export async function getLastMotoGPSprint(): Promise<Race | null> { return null; }
export async function getNextWSBKRace(): Promise<any> { return null; }
export async function getNextWSBKRaces(): Promise<any[]> { return []; }
export async function getNextMXGPRace(): Promise<any> { return null; }
export async function getMoto2Standings(): Promise<any[]> { return []; }
export async function getMoto3Standings(): Promise<any[]> { return []; }
export async function getMXGPStandings(): Promise<any[]> { return []; }
export async function getMX2Standings(): Promise<any[]> { return []; }
export async function getWSBKStandings(): Promise<any[]> { return []; }
export async function getWSBKNews(): Promise<NewsItem[]> { return []; }
export async function getWSBKCalendar(): Promise<Race[]> { return []; }
