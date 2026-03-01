// API de compatibilité pour MotoGP utilisant TheSportsDB

import {
    getNextMotoGPRaces,
    getLastMotoGPRace,
    getMotoGPStandings,
    getMotoGPSprintResults,
    getMotoGPCalendar,
    getQualifyingGrid,
    getMotoGPNews,
    getEventResults,
    getSportsDBEvents
} from './api-compat';

// Ces exports sont attendus par d'autres fichiers
export {
    getNextMotoGPRaces,
    getLastMotoGPRace,
    getMotoGPStandings,
    getMotoGPSprintResults,
    getMotoGPCalendar,
    getQualifyingGrid,
    getMotoGPNews
};

export async function getCalendar() {
    const calendar = await getMotoGPCalendar();
    return calendar.map(r => ({
        ...r,
        dates: {
            race: r.date,
            sprint: r.raceType === 'sprint' ? r.date : null
        }
    }));
}

export async function getRaceResults(id: string) {
    // On essaie de récupérer les résultats pour l'ID donné
    const results = await getEventResults(id);

    // Comme TheSportsDB semble ne lister que les courses principales dans eventsseason,
    // on renvoie les résultats dans le bloc 'race'.
    return {
        race: results.map(r => ({
            position: r.position,
            driverId: r.rider.id,
            driverName: `${r.rider.firstName} ${r.rider.lastName}`,
            time: r.time || '',
            gap: '',
            points: r.points,
            status: 'finished'
        })),
        sprint: [],
        qualifying: [],
        fastestLap: null
    };
}

export async function getRoundById(id: string) {
    const events = await getSportsDBEvents();
    const event = events.find(e => e.idEvent === id);

    if (!event) {
        // Fallback: chercher dans le calendrier transformé au cas où
        const calendar = await getMotoGPCalendar();
        const round = calendar.find(r => r.id === id);
        if (!round) return null;

        return {
            ...round,
            dates: {
                race: round.date,
                sprint: null,
                practice1: round.date,
                practice2: round.date,
                practice3: round.date,
                qualifying: round.date
            },
            circuit: {
                name: round.circuit,
                location: round.location,
                country: round.country,
                length: 0,
                turns: 0,
                lapRecord: { rider: '', year: 0, time: '' }
            }
        };
    }

    const dateEvent = event.dateEvent || '2024-01-01';
    const strTime = event.strTime || '12:00:00';
    const raceDate = new Date(`${dateEvent}T${strTime.includes('Z') ? strTime : strTime + 'Z'}`);

    return {
        id: event.idEvent,
        round: parseInt(event.intRound),
        name: event.strEvent,
        status: event.strStatus === 'Match Finished' ? 'finished' : 'upcoming',
        dates: {
            race: raceDate.toISOString(),
            sprint: null, // On pourrait estimer le samedi
            practice1: raceDate.toISOString(),
            practice2: raceDate.toISOString(),
            practice3: raceDate.toISOString(),
            qualifying: raceDate.toISOString()
        },
        circuit: {
            name: event.strVenue || 'TBC',
            location: event.strCity || 'TBC',
            country: event.strCountry || 'TBC',
            length: 0,
            turns: 0,
            lapRecord: { rider: '', year: 0, time: '' }
        }
    };
}

export function getAllDrivers() {
    return [];
}

export function getAllTeams() {
    return [];
}

export function getConstructorStandings() {
    return [];
}

export interface Driver {
    id: string;
    name: string;
    number: number;
    team: string;
    teamId: string;
    photo: string;
}

export interface Team {
    id: string;
    name: string;
}

export interface RaceResults {
    race: any[];
    sprint: any[];
    qualifying: any[];
}
