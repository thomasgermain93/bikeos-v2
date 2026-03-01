// API TheSportsDB - Données réelles MotoGP
// Docs: https://www.thesportsdb.com/api.php

const API_KEY = '3'; // Clé publique gratuite
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const MOTOGP_LEAGUE_ID = '4407';

// Récupérer le calendrier 2026
export async function getSportsDBSchedule() {
  try {
    const response = await fetch(`${BASE_URL}/eventsseason.php?id=${MOTOGP_LEAGUE_ID}&s=2026`);
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('[SportsDB] Error fetching schedule:', error);
    return [];
  }
}

// Récupérer les résultats passés
export async function getSportsDBLastResults() {
  try {
    const response = await fetch(`${BASE_URL}/eventspastleague.php?id=${MOTOGP_LEAGUE_ID}`);
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('[SportsDB] Error fetching results:', error);
    return [];
  }
}

// Récupérer les prochains événements
export async function getSportsDBNextEvents() {
  try {
    const response = await fetch(`${BASE_URL}/eventsnextleague.php?id=${MOTOGP_LEAGUE_ID}`);
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('[SportsDB] Error fetching next events:', error);
    return [];
  }
}

// Récupérer les détails d'un événement
export async function getSportsDBEventDetails(eventId: string) {
  try {
    const response = await fetch(`${BASE_URL}/lookupevent.php?id=${eventId}`);
    const data = await response.json();
    return data.events?.[0] || null;
  } catch (error) {
    console.error('[SportsDB] Error fetching event details:', error);
    return null;
  }
}

// Récupérer les équipes/pilotes
export async function getSportsDBTeams() {
  try {
    const response = await fetch(`${BASE_URL}/lookup_all_teams.php?id=${MOTOGP_LEAGUE_ID}`);
    const data = await response.json();
    return data.teams || [];
  } catch (error) {
    console.error('[SportsDB] Error fetching teams:', error);
    return [];
  }
}

// Transformer les données SportsDB en format Race
export function transformSportsDBEventToRace(event: any): any {
  return {
    id: event.idEvent,
    round: parseInt(event.intRound) || 0,
    name: event.strEvent,
    circuit: event.strVenue || 'TBC',
    location: event.strCity || 'TBC',
    country: event.strCountry || 'TBC',
    date: `${event.dateEvent}T${event.strTime || '12:00:00'}`,
    status: event.strStatus === 'Match Finished' ? 'finished' : 'upcoming',
    type: 'motogp',
    raceType: event.strEvent?.toLowerCase().includes('sprint') ? 'sprint' : 'race',
    poster: event.strThumb,
    season: event.strSeason,
  };
}
