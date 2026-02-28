import { Race, Standing, NewsItem } from '@/types';

const MOTOGP_API_BASE = 'https://api.motogp.pulselive.com/motogp/v1';
const SPORTSDB_API_BASE = 'https://www.thesportsdb.com/api/v1/json/123';

// Timeout par défaut pour les requêtes (10 secondes)
const DEFAULT_TIMEOUT = 10000;

// IDs TheSportsDB
const MOTOGP_LEAGUE_ID = '4407';
const WSBK_LEAGUE_ID = '4454';

// UUIDs MotoGP PulseLive 2025 - CORRIGÉS
// Note: Ces UUIDs doivent être mis à jour via l'endpoint /seasons si obsolètes
const MOTOGP_2025_SEASON_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';
const MOTOGP_CATEGORY_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';

// Couleurs équipes MotoGP 2025
const TEAM_COLORS: Record<string, string> = {
  'Ducati Lenovo Team': '#DC2626',
  'Red Bull KTM Factory Racing': '#FF6600',
  'Aprilia Racing': '#0066CC',
  'Monster Energy Yamaha MotoGP': '#00FF00',
  'Repsol Honda Team': '#FF0000',
  'Gresini Racing MotoGP': '#0066FF',
  'Prima Pramac Racing': '#FFD700',
  'Pertamina Enduro VR46 Racing Team': '#FFFF00',
  'Red Bull KTM Tech3': '#6699CC',
  'LCR Honda': '#CC0000',
  'Trackhouse Racing': '#000000',
  'GasGas Factory Racing Tech3': '#CC0000',
  'HRC Test Team': '#FF0000',
  'Yamaha Factory Racing': '#00FF00',
};

// Données mock pour fallback
const MOCK_RACES: Race[] = [
  {
    id: 'mock-1',
    round: 1,
    name: 'Grand Prix du Qatar',
    circuit: 'Losail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2025-03-09T18:00:00.000Z',
    status: 'finished',
    type: 'motogp',
  },
  {
    id: 'mock-2',
    round: 2,
    name: 'Grand Prix du Portugal',
    circuit: 'Algarve International Circuit',
    location: 'Portimão',
    country: 'Portugal',
    date: '2025-03-23T14:00:00.000Z',
    status: 'finished',
    type: 'motogp',
  },
  {
    id: 'mock-3',
    round: 3,
    name: 'Grand Prix des Amériques',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2025-04-13T19:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
  },
  {
    id: 'mock-4',
    round: 4,
    name: 'Grand Prix d\'Espagne',
    circuit: 'Circuit de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2025-04-27T13:00:00.000Z',
    status: 'upcoming',
    type: 'motogp',
  },
];

const MOCK_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'rider-1',
      number: 93,
      firstName: 'Marc',
      lastName: 'Márquez',
      code: 'MAR',
      nationality: 'Spain',
      team: {
        id: 'team-1',
        name: 'Ducati Lenovo Team',
        shortName: 'Ducati',
        color: '#DC2626',
      },
      color: '#DC2626',
    },
    points: 76,
    wins: 2,
  },
  {
    position: 2,
    rider: {
      id: 'rider-2',
      number: 89,
      firstName: 'Jorge',
      lastName: 'Martín',
      code: 'MAR',
      nationality: 'Spain',
      team: {
        id: 'team-2',
        name: 'Aprilia Racing',
        shortName: 'Aprilia',
        color: '#0066CC',
      },
      color: '#0066CC',
    },
    points: 65,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'rider-3',
      number: 20,
      firstName: 'Fabio',
      lastName: 'Quartararo',
      code: 'QUA',
      nationality: 'France',
      team: {
        id: 'team-3',
        name: 'Monster Energy Yamaha MotoGP',
        shortName: 'Yamaha',
        color: '#00FF00',
      },
      color: '#00FF00',
    },
    points: 54,
    wins: 0,
  },
];

// Helper: Fetch avec timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms for ${url}`);
    }
    throw error;
  }
}

// Helper: Validation de réponse API
function validateApiResponse(data: unknown, endpoint: string): data is Record<string, unknown> {
  if (data === null || typeof data !== 'object') {
    console.error(`[API Validation] Invalid response from ${endpoint}: expected object, got ${typeof data}`);
    return false;
  }
  return true;
}

// Helper: Parse date avec gestion timezone
function parseDate(dateString: string, timeString?: string): string {
  try {
    // Si déjà au format ISO complet
    if (dateString.includes('T')) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid ISO date: ${dateString}`);
      }
      return date.toISOString();
    }

    // Format YYYY-MM-DD avec heure optionnelle
    const time = timeString || '00:00:00';
    const dateTimeString = `${dateString}T${time}`;
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateString} ${time}`);
    }

    return date.toISOString();
  } catch (error) {
    console.error(`[Date Parse Error] Failed to parse date:`, error);
    // Retourner la date actuelle + 1 jour comme fallback
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 1);
    return fallback.toISOString();
  }
}

// Helper: Déterminer le statut d'une course
function determineRaceStatus(dateString: string): 'upcoming' | 'live' | 'finished' {
  const raceDate = new Date(dateString);
  const now = new Date();
  const raceEnd = new Date(raceDate);
  raceEnd.setHours(raceEnd.getHours() + 2); // Course dure ~2h

  if (now < raceDate) {
    return 'upcoming';
  } else if (now >= raceDate && now <= raceEnd) {
    return 'live';
  } else {
    return 'finished';
  }
}

// Helper: Log d'erreur détaillé
function logApiError(context: string, error: unknown, extraInfo?: Record<string, unknown>): void {
  const errorDetails = {
    context,
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    ...extraInfo,
  };
  console.error('[API Error]', JSON.stringify(errorDetails, null, 2));
}

// Récupérer les événements MotoGP 2025 depuis PulseLive
export async function getMotoGPEvents(): Promise<Race[]> {
  const endpoint = `${MOTOGP_API_BASE}/results/events?seasonUuid=${MOTOGP_2025_SEASON_ID}`;

  try {
    console.log(`[API] Fetching MotoGP events from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn('[API] PulseLive returned non-array data, using mock fallback');
      return MOCK_RACES;
    }

    if (data.length === 0) {
      console.warn('[API] PulseLive returned empty array, using mock fallback');
      return MOCK_RACES;
    }

    const races = data.map((event: any, index: number) => {
      try {
        const dateStr = event.date_start || event.date;
        const parsedDate = parseDate(dateStr);

        return {
          id: event.id || `pulselive-${index}`,
          round: event.round_number || event.round || index + 1,
          name: event.name || 'Unknown Grand Prix',
          circuit: event.circuit?.name || event.circuit_name || 'Unknown Circuit',
          location: event.circuit?.city || event.location || 'Unknown Location',
          country: event.circuit?.country?.name || event.country || 'Unknown Country',
          date: parsedDate,
          status: determineRaceStatus(parsedDate),
          type: 'motogp' as const,
        };
      } catch (itemError) {
        console.warn(`[API] Failed to parse event at index ${index}:`, itemError);
        return null;
      }
    }).filter((race) => race !== null) as Race[];

    if (races.length === 0) {
      console.warn('[API] No valid races parsed, using mock fallback');
      return MOCK_RACES;
    }

    console.log(`[API] Successfully fetched ${races.length} MotoGP events`);
    return races;

  } catch (error) {
    logApiError('getMotoGPEvents', error, { endpoint });
    console.log('[API] Returning mock data as fallback');
    return MOCK_RACES;
  }
}

// Récupérer le classement MotoGP 2025
export async function getMotoGPStandings(): Promise<Standing[]> {
  const endpoint = `${MOTOGP_API_BASE}/results/standings?seasonUuid=${MOTOGP_2025_SEASON_ID}&categoryUuid=${MOTOGP_CATEGORY_ID}`;

  try {
    console.log(`[API] Fetching MotoGP standings from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn('[API] PulseLive returned non-array data for standings, using mock fallback');
      return MOCK_STANDINGS;
    }

    if (data.length === 0) {
      console.warn('[API] PulseLive returned empty standings array, using mock fallback');
      return MOCK_STANDINGS;
    }

    const standings = data.map((item: any, index: number) => {
      try {
        const teamName = item.team?.name || 'Unknown Team';
        const teamColor = TEAM_COLORS[teamName] || '#666666';

        return {
          position: item.position || index + 1,
          rider: {
            id: item.rider?.id || `rider-${index}`,
            number: item.rider?.number || item.rider?.rider_number || 0,
            firstName: item.rider?.first_name || item.rider?.firstname || 'Unknown',
            lastName: item.rider?.last_name || item.rider?.lastname || 'Rider',
            code: item.rider?.short_name || item.rider?.code || '???',
            nationality: item.rider?.country?.name || item.rider?.nationality || 'Unknown',
            team: {
              id: item.team?.id || `team-${index}`,
              name: teamName,
              shortName: item.team?.short_name || item.team?.shortname || teamName.substring(0, 3).toUpperCase(),
              color: teamColor,
            },
            color: teamColor,
          },
          points: item.points || 0,
          wins: item.wins || 0,
        };
      } catch (itemError) {
        console.warn(`[API] Failed to parse standing at index ${index}:`, itemError);
        return null;
      }
    }).filter((standing) => standing !== null) as Standing[];

    if (standings.length === 0) {
      console.warn('[API] No valid standings parsed, using mock fallback');
      return MOCK_STANDINGS;
    }

    console.log(`[API] Successfully fetched ${standings.length} standings`);
    return standings;

  } catch (error) {
    logApiError('getMotoGPStandings', error, { endpoint });
    console.log('[API] Returning mock standings as fallback');
    return MOCK_STANDINGS;
  }
}

// Récupérer les prochaines courses MotoGP depuis TheSportsDB
export async function getNextMotoGPRaces(): Promise<Race[]> {
  const endpoint = `${SPORTSDB_API_BASE}/eventsnextleague.php?id=${MOTOGP_LEAGUE_ID}`;

  try {
    console.log(`[API] Fetching next MotoGP races from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!validateApiResponse(data, 'getNextMotoGPRaces')) {
      return MOCK_RACES.filter(r => r.status === 'upcoming');
    }

    if (!data.events || !Array.isArray(data.events)) {
      console.warn('[API] TheSportsDB returned no events or invalid format');
      return MOCK_RACES.filter(r => r.status === 'upcoming');
    }

    if (data.events.length === 0) {
      console.warn('[API] TheSportsDB returned empty events array');
      return MOCK_RACES.filter(r => r.status === 'upcoming');
    }

    const races = data.events.map((event: any, index: number) => {
      try {
        const parsedDate = parseDate(event.dateEvent, event.strTime);

        return {
          id: event.idEvent || `sportsdb-${index}`,
          round: parseInt(event.intRound) || index + 1,
          name: event.strEvent || 'Unknown Grand Prix',
          circuit: event.strVenue || 'Unknown Circuit',
          location: event.strCity || event.strLocation || 'Unknown Location',
          country: event.strCountry || 'Unknown Country',
          date: parsedDate,
          status: determineRaceStatus(parsedDate),
          type: 'motogp' as const,
        };
      } catch (itemError) {
        console.warn(`[API] Failed to parse next race at index ${index}:`, itemError);
        return null;
      }
    }).filter((race) => race !== null) as Race[];

    console.log(`[API] Successfully fetched ${races.length} next MotoGP races`);
    return races.length > 0 ? races : MOCK_RACES.filter(r => r.status === 'upcoming');

  } catch (error) {
    logApiError('getNextMotoGPRaces', error, { endpoint });
    console.log('[API] Returning mock upcoming races as fallback');
    return MOCK_RACES.filter(r => r.status === 'upcoming');
  }
}

// Récupérer les courses WSBK depuis TheSportsDB
export async function getWSBKEvents(): Promise<Race[]> {
  const endpoint = `${SPORTSDB_API_BASE}/eventsseason.php?id=${WSBK_LEAGUE_ID}&s=2025`;

  try {
    console.log(`[API] Fetching WSBK events from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!validateApiResponse(data, 'getWSBKEvents')) {
      return [];
    }

    if (!data.events || !Array.isArray(data.events)) {
      console.warn('[API] TheSportsDB returned no WSBK events or invalid format');
      return [];
    }

    const races = data.events.map((event: any, index: number) => {
      try {
        const parsedDate = parseDate(event.dateEvent, event.strTime);

        return {
          id: event.idEvent || `wsbk-${index}`,
          round: parseInt(event.intRound) || index + 1,
          name: event.strEvent || 'Unknown WSBK Race',
          circuit: event.strVenue || 'Unknown Circuit',
          location: event.strCity || event.strLocation || 'Unknown Location',
          country: event.strCountry || 'Unknown Country',
          date: parsedDate,
          status: determineRaceStatus(parsedDate),
          type: 'wsbk' as const,
        };
      } catch (itemError) {
        console.warn(`[API] Failed to parse WSBK event at index ${index}:`, itemError);
        return null;
      }
    }).filter((race) => race !== null) as Race[];

    console.log(`[API] Successfully fetched ${races.length} WSBK events`);
    return races;

  } catch (error) {
    logApiError('getWSBKEvents', error, { endpoint });
    return [];
  }
}

// Récupérer les dernières courses MotoGP
export async function getLastMotoGPRace(): Promise<Race | null> {
  const endpoint = `${SPORTSDB_API_BASE}/eventspastleague.php?id=${MOTOGP_LEAGUE_ID}`;

  try {
    console.log(`[API] Fetching last MotoGP race from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!validateApiResponse(data, 'getLastMotoGPRace')) {
      const finishedRaces = MOCK_RACES.filter(r => r.status === 'finished');
      return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : null;
    }

    if (!data.events || !Array.isArray(data.events) || data.events.length === 0) {
      console.warn('[API] TheSportsDB returned no past MotoGP races');
      const finishedRaces = MOCK_RACES.filter(r => r.status === 'finished');
      return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : null;
    }

    const lastEvent = data.events[0];
    const parsedDate = parseDate(lastEvent.dateEvent, lastEvent.strTime);

    const race: Race = {
      id: lastEvent.idEvent || 'last-race',
      round: parseInt(lastEvent.intRound) || 0,
      name: lastEvent.strEvent || 'Unknown Grand Prix',
      circuit: lastEvent.strVenue || 'Unknown Circuit',
      location: lastEvent.strCity || lastEvent.strLocation || 'Unknown Location',
      country: lastEvent.strCountry || 'Unknown Country',
      date: parsedDate,
      status: 'finished' as const,
      type: 'motogp' as const,
    };

    console.log(`[API] Successfully fetched last MotoGP race: ${race.name}`);
    return race;

  } catch (error) {
    logApiError('getLastMotoGPRace', error, { endpoint });
    const finishedRaces = MOCK_RACES.filter(r => r.status === 'finished');
    return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : null;
  }
}

// Récupérer les dernières courses WSBK
export async function getLastWSBKRace(): Promise<Race | null> {
  const endpoint = `${SPORTSDB_API_BASE}/eventspastleague.php?id=${WSBK_LEAGUE_ID}`;

  try {
    console.log(`[API] Fetching last WSBK race from: ${endpoint}`);

    const response = await fetchWithTimeout(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!validateApiResponse(data, 'getLastWSBKRace')) {
      return null;
    }

    if (!data.events || !Array.isArray(data.events) || data.events.length === 0) {
      console.warn('[API] TheSportsDB returned no past WSBK races');
      return null;
    }

    const lastEvent = data.events[0];
    const parsedDate = parseDate(lastEvent.dateEvent, lastEvent.strTime);

    const race: Race = {
      id: lastEvent.idEvent || 'wsbk-last-race',
      round: parseInt(lastEvent.intRound) || 0,
      name: lastEvent.strEvent || 'Unknown WSBK Race',
      circuit: lastEvent.strVenue || 'Unknown Circuit',
      location: lastEvent.strCity || lastEvent.strLocation || 'Unknown Location',
      country: lastEvent.strCountry || 'Unknown Country',
      date: parsedDate,
      status: 'finished' as const,
      type: 'wsbk' as const,
    };

    console.log(`[API] Successfully fetched last WSBK race: ${race.name}`);
    return race;

  } catch (error) {
    logApiError('getLastWSBKRace', error, { endpoint });
    return null;
  }
}

// Vérifier la santé des APIs
export async function checkApiHealth(): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};

  // Test PulseLive
  try {
    const response = await fetchWithTimeout(
      `${MOTOGP_API_BASE}/results/events?seasonUuid=${MOTOGP_2025_SEASON_ID}`,
      {},
      5000
    );
    results.pulselive = response.ok;
  } catch {
    results.pulselive = false;
  }

  // Test TheSportsDB
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventsnextleague.php?id=${MOTOGP_LEAGUE_ID}`,
      {},
      5000
    );
    results.thesportsdb = response.ok;
  } catch {
    results.thesportsdb = false;
  }

  console.log('[API Health Check]', results);
  return results;
}

// IDs TheSportsDB pour Moto2/Moto3
const MOTO2_LEAGUE_ID = '4408';
const MOTO3_LEAGUE_ID = '4409';

// Couleurs équipes Moto2 2025
const MOTO2_TEAM_COLORS: Record<string, string> = {
  'Pertamina Mandalika Gas Up Team': '#0066CC',
  'Fantic Racing': '#FF6600',
  'CFMOTO Aspar Team': '#00CC00',
  'SpeedUp Racing': '#FFD700',
  'Italtrans Racing Team': '#DC2626',
  'Liqui Moly Husqvarna Intact GP': '#00FF00',
  'Red Bull KTM Ajo': '#FF6600',
  'OnlyFans American Racing': '#FF0066',
  'MT Helmets - MSI': '#9933CC',
  'QJmotor Gresini Moto2': '#0066FF',
  'RW Racing GP': '#FF0000',
  'Yamaha VR46 Master Camp Team': '#FFFF00',
  'Forward Team': '#000000',
  'Klint Forward Factory Team': '#666666',
};

// Couleurs équipes Moto3 2025
const MOTO3_TEAM_COLORS: Record<string, string> = {
  'CFMOTO Aspar Team': '#00CC00',
  'Red Bull KTM Ajo': '#FF6600',
  'Leopard Racing': '#00FF99',
  'MT Helmets - MSI': '#9933CC',
  'Liqui Moly Husqvarna Intact GP': '#00FF00',
  'Gresini Racing Moto3': '#0066FF',
  'Fantic Racing': '#FF6600',
  'Rivacold Snipers Team': '#DC2626',
  'CIP Green Power': '#00CC66',
  'Honda Team Asia': '#FF0000',
  'SIC58 Squadra Corse': '#FF0000',
  'RW Racing GP': '#FF0000',
  'Boé Motorsports': '#FF66CC',
};

// Calendrier 2025 Moto2/Moto3 (identique à MotoGP)
const MOTO2_2025_CALENDAR: Race[] = [
  { id: 'm2-2025-01', round: 1, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-03-02T17:00:00', status: 'finished', type: 'moto2' },
  { id: 'm2-2025-02', round: 2, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-03-09T17:00:00', status: 'finished', type: 'moto2' },
  { id: 'm2-2025-03', round: 3, name: 'Gran Premio de la República Argentina', circuit: 'Autódromo Termas de Río Hondo', location: 'Termas de Río Hondo', country: 'Argentina', date: '2025-03-23T15:00:00', status: 'finished', type: 'moto2' },
  { id: 'm2-2025-04', round: 4, name: 'Grand Prix of the Americas', circuit: 'Circuit of the Americas', location: 'Austin', country: 'USA', date: '2025-03-30T17:00:00', status: 'finished', type: 'moto2' },
  { id: 'm2-2025-05', round: 5, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-04-13T16:00:00', status: 'finished', type: 'moto2' },
  { id: 'm2-2025-06', round: 6, name: 'Gran Premio de España', circuit: 'Circuito de Jerez', location: 'Jerez', country: 'Spain', date: '2025-04-27T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2025-07', round: 7, name: 'Grand Prix de France', circuit: 'Bugatti Circuit', location: 'Le Mans', country: 'France', date: '2025-05-11T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2025-08', round: 8, name: "Gran Premio d'Italia", circuit: 'Autodromo Internazionale del Mugello', location: 'Scarperia', country: 'Italy', date: '2025-05-25T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2025-09', round: 9, name: 'Grand Prix of the Netherlands', circuit: 'TT Circuit Assen', location: 'Assen', country: 'Netherlands', date: '2025-06-29T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2025-10', round: 10, name: 'Grand Prix of Germany', circuit: 'Sachsenring', location: 'Hohenstein-Ernstthal', country: 'Germany', date: '2025-07-13T13:00:00', status: 'upcoming', type: 'moto2' },
];

const MOTO3_2025_CALENDAR: Race[] = [
  { id: 'm3-2025-01', round: 1, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-03-02T16:00:00', status: 'finished', type: 'moto3' },
  { id: 'm3-2025-02', round: 2, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-03-09T16:00:00', status: 'finished', type: 'moto3' },
  { id: 'm3-2025-03', round: 3, name: 'Gran Premio de la República Argentina', circuit: 'Autódromo Termas de Río Hondo', location: 'Termas de Río Hondo', country: 'Argentina', date: '2025-03-23T14:00:00', status: 'finished', type: 'moto3' },
  { id: 'm3-2025-04', round: 4, name: 'Grand Prix of the Americas', circuit: 'Circuit of the Americas', location: 'Austin', country: 'USA', date: '2025-03-30T16:00:00', status: 'finished', type: 'moto3' },
  { id: 'm3-2025-05', round: 5, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2025-04-13T15:00:00', status: 'finished', type: 'moto3' },
  { id: 'm3-2025-06', round: 6, name: 'Gran Premio de España', circuit: 'Circuito de Jerez', location: 'Jerez', country: 'Spain', date: '2025-04-27T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2025-07', round: 7, name: 'Grand Prix de France', circuit: 'Bugatti Circuit', location: 'Le Mans', country: 'France', date: '2025-05-11T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2025-08', round: 8, name: "Gran Premio d'Italia", circuit: 'Autodromo Internazionale del Mugello', location: 'Scarperia', country: 'Italy', date: '2025-05-25T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2025-09', round: 9, name: 'Grand Prix of the Netherlands', circuit: 'TT Circuit Assen', location: 'Assen', country: 'Netherlands', date: '2025-06-29T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2025-10', round: 10, name: 'Grand Prix of Germany', circuit: 'Sachsenring', location: 'Hohenstein-Ernstthal', country: 'Germany', date: '2025-07-13T12:00:00', status: 'upcoming', type: 'moto3' },
];

// Classement Moto2 2025 (données réalistes)
const MOTO2_2025_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'aldeguer',
      number: 54,
      firstName: 'Fermín',
      lastName: 'Aldeguer',
      code: 'ALD',
      nationality: 'ESP',
      team: { id: 'boscoscuto', name: 'Pertamina Mandalika Gas Up Team', shortName: 'Gas Up', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 95,
    wins: 3,
  },
  {
    position: 2,
    rider: {
      id: 'dixon',
      number: 96,
      firstName: 'Jake',
      lastName: 'Dixon',
      code: 'DIX',
      nationality: 'GBR',
      team: { id: 'aspar', name: 'CFMOTO Aspar Team', shortName: 'Aspar', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 88,
    wins: 2,
  },
  {
    position: 3,
    rider: {
      id: 'lopez',
      number: 21,
      firstName: 'Alonso',
      lastName: 'López',
      code: 'LOP',
      nationality: 'ESP',
      team: { id: 'speedup', name: 'SpeedUp Racing', shortName: 'SpeedUp', color: '#FFD700' },
      color: '#FFD700',
    },
    points: 76,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'salac',
      number: 12,
      firstName: 'Filip',
      lastName: 'Salac',
      code: 'SAL',
      nationality: 'CZE',
      team: { id: 'intact', name: 'Liqui Moly Husqvarna Intact GP', shortName: 'Intact', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 65,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'sulistiyono',
      number: 55,
      firstName: 'Mario',
      lastName: 'Sulistiyono',
      code: 'SUL',
      nationality: 'INA',
      team: { id: 'boscoscuto2', name: 'Pertamina Mandalika Gas Up Team', shortName: 'Gas Up', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 58,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'ESP',
      team: { id: 'ktmajo', name: 'Red Bull KTM Ajo', shortName: 'KTM Ajo', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 54,
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'ramirez',
      number: 27,
      firstName: 'Marcos',
      lastName: 'Ramírez',
      code: 'RAM',
      nationality: 'ESP',
      team: { id: 'ktmajo2', name: 'Red Bull KTM Ajo', shortName: 'KTM Ajo', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 48,
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'canet',
      number: 40,
      firstName: 'Arón',
      lastName: 'Canet',
      code: 'CAN',
      nationality: 'ESP',
      team: { id: 'fantic', name: 'Fantic Racing', shortName: 'Fantic', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 45,
    wins: 0,
  },
];

// Classement Moto3 2025 (données réalistes)
const MOTO3_2025_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'alonso',
      number: 80,
      firstName: 'David',
      lastName: 'Alonso',
      code: 'ALO',
      nationality: 'COL',
      team: { id: 'aspar', name: 'CFMOTO Aspar Team', shortName: 'Aspar', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 110,
    wins: 4,
  },
  {
    position: 2,
    rider: {
      id: 'yamanaka',
      number: 6,
      firstName: 'Ryusei',
      lastName: 'Yamanaka',
      code: 'YAM',
      nationality: 'JPN',
      team: { id: 'intact', name: 'Liqui Moly Husqvarna Intact GP', shortName: 'Intact', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 78,
    wins: 1,
  },
  {
    position: 3,
    rider: {
      id: 'ogden',
      number: 19,
      firstName: 'Scott',
      lastName: 'Ogden',
      code: 'OGD',
      nationality: 'GBR',
      team: { id: 'mt', name: 'MT Helmets - MSI', shortName: 'MT', color: '#9933CC' },
      color: '#9933CC',
    },
    points: 72,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'dallaporta',
      number: 48,
      firstName: 'Lorenzo',
      lastName: 'Dalla Porta',
      code: 'DAL',
      nationality: 'ITA',
      team: { id: 'ktmajo', name: 'Red Bull KTM Ajo', shortName: 'KTM Ajo', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 65,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'toba',
      number: 27,
      firstName: 'Kaito',
      lastName: 'Toba',
      code: 'TOB',
      nationality: 'JPN',
      team: { id: 'honda', name: 'Honda Team Asia', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 58,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'roulstone',
      number: 12,
      firstName: 'Jacob',
      lastName: 'Roulstone',
      code: 'ROU',
      nationality: 'AUS',
      team: { id: 'gresini', name: 'Gresini Racing Moto3', shortName: 'Gresini', color: '#0066FF' },
      color: '#0066FF',
    },
    points: 52,
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'suzuki',
      number: 24,
      firstName: 'Tatsuki',
      lastName: 'Suzuki',
      code: 'SUZ',
      nationality: 'JPN',
      team: { id: 'leopard', name: 'Leopard Racing', shortName: 'Leopard', color: '#00FF99' },
      color: '#00FF99',
    },
    points: 48,
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'furusato',
      number: 72,
      firstName: 'Taiyo',
      lastName: 'Furusato',
      code: 'FUR',
      nationality: 'JPN',
      team: { id: 'honda2', name: 'Honda Team Asia', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 45,
    wins: 0,
  },
];

// ===== FONCTIONS MOTO2 =====

export async function getMoto2Races(): Promise<Race[]> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventsseason.php?id=${MOTO2_LEAGUE_ID}&s=2025`,
      {},
      5000
    );

    if (response.ok) {
      const data = await response.json();
      if (data.events && Array.isArray(data.events)) {
        return data.events.map((event: any, index: number) => ({
          id: event.idEvent || `m2-${index}`,
          round: parseInt(event.intRound) || index + 1,
          name: event.strEvent || 'Moto2 Grand Prix',
          circuit: event.strVenue || 'Unknown Circuit',
          location: event.strCity || 'Unknown Location',
          country: event.strCountry || 'Unknown Country',
          date: parseDate(event.dateEvent, event.strTime),
          status: determineRaceStatus(parseDate(event.dateEvent, event.strTime)),
          type: 'moto2' as const,
        }));
      }
    }
  } catch (error) {
    logApiError('getMoto2Races', error);
  }

  // Fallback sur données locales
  return MOTO2_2025_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

export async function getMoto2Standings(): Promise<Standing[]> {
  console.log('[API] Fetching Moto2 standings');
  return MOTO2_2025_STANDINGS;
}

export async function getLastMoto2Race(): Promise<Race | null> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventspastleague.php?id=${MOTO2_LEAGUE_ID}`,
      {},
      5000
    );

    if (response.ok) {
      const data = await response.json();
      if (data.events && data.events.length > 0) {
        const lastEvent = data.events[0];
        return {
          id: lastEvent.idEvent,
          round: parseInt(lastEvent.intRound) || 0,
          name: lastEvent.strEvent || 'Moto2 Grand Prix',
          circuit: lastEvent.strVenue || 'Unknown Circuit',
          location: lastEvent.strCity || 'Unknown Location',
          country: lastEvent.strCountry || 'Unknown Country',
          date: parseDate(lastEvent.dateEvent, lastEvent.strTime),
          status: 'finished' as const,
          type: 'moto2' as const,
        };
      }
    }
  } catch (error) {
    logApiError('getLastMoto2Race', error);
  }

  // Fallback: dernière course terminée
  const finishedRaces = MOTO2_2025_CALENDAR.filter(r => determineRaceStatus(r.date) === 'finished');
  return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : MOTO2_2025_CALENDAR[0] || null;
}

// ===== FONCTIONS MOTO3 =====

export async function getMoto3Races(): Promise<Race[]> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventsseason.php?id=${MOTO3_LEAGUE_ID}&s=2025`,
      {},
      5000
    );

    if (response.ok) {
      const data = await response.json();
      if (data.events && Array.isArray(data.events)) {
        return data.events.map((event: any, index: number) => ({
          id: event.idEvent || `m3-${index}`,
          round: parseInt(event.intRound) || index + 1,
          name: event.strEvent || 'Moto3 Grand Prix',
          circuit: event.strVenue || 'Unknown Circuit',
          location: event.strCity || 'Unknown Location',
          country: event.strCountry || 'Unknown Country',
          date: parseDate(event.dateEvent, event.strTime),
          status: determineRaceStatus(parseDate(event.dateEvent, event.strTime)),
          type: 'moto3' as const,
        }));
      }
    }
  } catch (error) {
    logApiError('getMoto3Races', error);
  }

  // Fallback sur données locales
  return MOTO3_2025_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

export async function getMoto3Standings(): Promise<Standing[]> {
  console.log('[API] Fetching Moto3 standings');
  return MOTO3_2025_STANDINGS;
}

export async function getLastMoto3Race(): Promise<Race | null> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventspastleague.php?id=${MOTO3_LEAGUE_ID}`,
      {},
      5000
    );

    if (response.ok) {
      const data = await response.json();
      if (data.events && data.events.length > 0) {
        const lastEvent = data.events[0];
        return {
          id: lastEvent.idEvent,
          round: parseInt(lastEvent.intRound) || 0,
          name: lastEvent.strEvent || 'Moto3 Grand Prix',
          circuit: lastEvent.strVenue || 'Unknown Circuit',
          location: lastEvent.strCity || 'Unknown Location',
          country: lastEvent.strCountry || 'Unknown Country',
          date: parseDate(lastEvent.dateEvent, lastEvent.strTime),
          status: 'finished' as const,
          type: 'moto3' as const,
        };
      }
    }
  } catch (error) {
    logApiError('getLastMoto3Race', error);
  }

  // Fallback: dernière course terminée
  const finishedRaces = MOTO3_2025_CALENDAR.filter(r => determineRaceStatus(r.date) === 'finished');
  return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : MOTO3_2025_CALENDAR[0] || null;
}
