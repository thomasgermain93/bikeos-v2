import { Race, Standing, NewsItem } from '@/types';

const MOTOGP_API_BASE = 'https://api.motogp.pulselive.com/motogp/v1';
const SPORTSDB_API_BASE = 'https://www.thesportsdb.com/api/v1/json/123';

// IDs TheSportsDB
const MOTOGP_LEAGUE_ID = '4407';
const WSBK_LEAGUE_ID = '4454';

// UUIDs MotoGP PulseLive 2025
const MOTOGP_2025_SEASON_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';
const MOTOGP_CATEGORY_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';

// Couleurs équipes MotoGP
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
};

// Récupérer les événements MotoGP 2025 depuis PulseLive
export async function getMotoGPEvents(): Promise<Race[]> {
  try {
    const response = await fetch(
      `${MOTOGP_API_BASE}/results/events?seasonUuid=${MOTOGP_2025_SEASON_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch MotoGP events');
    }
    
    const data = await response.json();
    
    return data.map((event: any) => ({
      id: event.id,
      round: event.round_number || 0,
      name: event.name,
      circuit: event.circuit?.name || '',
      location: event.circuit?.city || '',
      country: event.circuit?.country?.name || '',
      date: event.date_start,
      status: new Date(event.date_start) > new Date() ? 'upcoming' : 'finished',
      type: 'motogp' as const,
    }));
  } catch (error) {
    console.error('Error fetching MotoGP events:', error);
    return [];
  }
}

// Récupérer le classement MotoGP 2025
export async function getMotoGPStandings(): Promise<Standing[]> {
  try {
    const response = await fetch(
      `${MOTOGP_API_BASE}/results/standings?seasonUuid=${MOTOGP_2025_SEASON_ID}&categoryUuid=${MOTOGP_CATEGORY_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch MotoGP standings');
    }
    
    const data = await response.json();
    
    return data.map((item: any, index: number) => ({
      position: index + 1,
      rider: {
        id: item.rider?.id || '',
        number: item.rider?.number || 0,
        firstName: item.rider?.first_name || '',
        lastName: item.rider?.last_name || '',
        code: item.rider?.short_name || '',
        nationality: item.rider?.country?.name || '',
        team: {
          id: item.team?.id || '',
          name: item.team?.name || '',
          shortName: item.team?.short_name || '',
          color: TEAM_COLORS[item.team?.name] || '#666666',
        },
        color: TEAM_COLORS[item.team?.name] || '#666666',
      },
      points: item.points || 0,
      wins: item.wins || 0,
    }));
  } catch (error) {
    console.error('Error fetching MotoGP standings:', error);
    return [];
  }
}

// Récupérer les prochaines courses MotoGP depuis TheSportsDB
export async function getNextMotoGPRaces(): Promise<Race[]> {
  try {
    const response = await fetch(
      `${SPORTSDB_API_BASE}/eventsnextleague.php?id=${MOTOGP_LEAGUE_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch next MotoGP races');
    }
    
    const data = await response.json();
    
    if (!data.events) {
      return [];
    }
    
    return data.events.map((event: any) => ({
      id: event.idEvent,
      round: parseInt(event.intRound) || 0,
      name: event.strEvent,
      circuit: event.strVenue || '',
      location: event.strCity || '',
      country: event.strCountry || '',
      date: `${event.dateEvent}T${event.strTime || '00:00:00'}`,
      status: 'upcoming' as const,
      type: 'motogp' as const,
    }));
  } catch (error) {
    console.error('Error fetching next MotoGP races:', error);
    return [];
  }
}

// Récupérer les courses WSBK depuis TheSportsDB
export async function getWSBKEvents(): Promise<Race[]> {
  try {
    const response = await fetch(
      `${SPORTSDB_API_BASE}/eventsseason.php?id=${WSBK_LEAGUE_ID}&s=2025`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch WSBK events');
    }
    
    const data = await response.json();
    
    if (!data.events) {
      return [];
    }
    
    return data.events.map((event: any) => ({
      id: event.idEvent,
      round: parseInt(event.intRound) || 0,
      name: event.strEvent,
      circuit: event.strVenue || '',
      location: event.strCity || '',
      country: event.strCountry || '',
      date: `${event.dateEvent}T${event.strTime || '00:00:00'}`,
      status: new Date(event.dateEvent) > new Date() ? 'upcoming' : 'finished',
      type: 'wsbk' as const,
    }));
  } catch (error) {
    console.error('Error fetching WSBK events:', error);
    return [];
  }
}

// Récupérer les dernières courses MotoGP
export async function getLastMotoGPRace(): Promise<Race | null> {
  try {
    const response = await fetch(
      `${SPORTSDB_API_BASE}/eventspastleague.php?id=${MOTOGP_LEAGUE_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch past MotoGP races');
    }
    
    const data = await response.json();
    
    if (!data.events || data.events.length === 0) {
      return null;
    }
    
    const lastEvent = data.events[0];
    
    return {
      id: lastEvent.idEvent,
      round: parseInt(lastEvent.intRound) || 0,
      name: lastEvent.strEvent,
      circuit: lastEvent.strVenue || '',
      location: lastEvent.strCity || '',
      country: lastEvent.strCountry || '',
      date: `${lastEvent.dateEvent}T${lastEvent.strTime || '00:00:00'}`,
      status: 'finished' as const,
      type: 'motogp' as const,
    };
  } catch (error) {
    console.error('Error fetching last MotoGP race:', error);
    return null;
  }
}

// Récupérer les dernières courses WSBK
export async function getLastWSBKRace(): Promise<Race | null> {
  try {
    const response = await fetch(
      `${SPORTSDB_API_BASE}/eventspastleague.php?id=${WSBK_LEAGUE_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch past WSBK races');
    }
    
    const data = await response.json();
    
    if (!data.events || data.events.length === 0) {
      return null;
    }
    
    const lastEvent = data.events[0];
    
    return {
      id: lastEvent.idEvent,
      round: parseInt(lastEvent.intRound) || 0,
      name: lastEvent.strEvent,
      circuit: lastEvent.strVenue || '',
      location: lastEvent.strCity || '',
      country: lastEvent.strCountry || '',
      date: `${lastEvent.dateEvent}T${lastEvent.strTime || '00:00:00'}`,
      status: 'finished' as const,
      type: 'wsbk' as const,
    };
  } catch (error) {
    console.error('Error fetching last WSBK race:', error);
    return null;
  }
}
