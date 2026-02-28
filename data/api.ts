import { Race, RaceResult, Standing, NewsItem } from '@/types';

const MOTOGP_API_BASE = 'https://api.motogp.pulselive.com/motogp/v1';
const SPORTSDB_API_BASE = 'https://www.thesportsdb.com/api/v1/json/123';

// Timeout par défaut pour les requêtes (10 secondes)
const DEFAULT_TIMEOUT = 10000;

// IDs TheSportsDB
const MOTOGP_LEAGUE_ID = '4407';
const WSBK_LEAGUE_ID = '4454';

// UUIDs MotoGP PulseLive 2026
// Note: Ces UUIDs doivent être mis à jour via l'endpoint /seasons si obsolètes
const MOTOGP_2026_SEASON_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';
const MOTOGP_CATEGORY_ID = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';

// Couleurs équipes MotoGP 2026
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

// ===== SPRINT RACE RESULTS =====
// Système de points Sprint: 12-9-7-6-5-4-3-2-1 (Top 9)

// Résultats Sprint Thaïlande 2026 (1er mars 2026)
const THAILAND_2026_SPRINT_RESULTS: RaceResult[] = [
  {
    position: 1,
    rider: {
      id: 'rider-acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'Spain',
      team: {
        id: 'team-ktm3',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    team: {
      id: 'team-ktm3',
      name: 'Red Bull KTM Factory Racing',
      shortName: 'KTM',
      color: '#FF6600',
    },
    time: '19:39.155',
    points: 12,
  },
  {
    position: 2,
    rider: {
      id: 'rider-bagnaia',
      number: 1,
      firstName: 'Francesco',
      lastName: 'Bagnaia',
      code: 'BAG',
      nationality: 'Italy',
      team: {
        id: 'team-ducati',
        name: 'Ducati Lenovo Team',
        shortName: 'Ducati',
        color: '#DC2626',
      },
      color: '#DC2626',
    },
    team: {
      id: 'team-ducati',
      name: 'Ducati Lenovo Team',
      shortName: 'Ducati',
      color: '#DC2626',
    },
    time: '+0.108',
    points: 9,
  },
  {
    position: 3,
    rider: {
      id: 'rider-marquez',
      number: 93,
      firstName: 'Marc',
      lastName: 'Márquez',
      code: 'MAR',
      nationality: 'Spain',
      team: {
        id: 'team-ducati2',
        name: 'Ducati Lenovo Team',
        shortName: 'Ducati',
        color: '#DC2626',
      },
      color: '#DC2626',
    },
    team: {
      id: 'team-ducati2',
      name: 'Ducati Lenovo Team',
      shortName: 'Ducati',
      color: '#DC2626',
    },
    time: '+0.540',
    points: 7,
  },
  {
    position: 4,
    rider: {
      id: 'rider-binder',
      number: 33,
      firstName: 'Brad',
      lastName: 'Binder',
      code: 'BIN',
      nationality: 'South Africa',
      team: {
        id: 'team-ktm',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    team: {
      id: 'team-ktm',
      name: 'Red Bull KTM Factory Racing',
      shortName: 'KTM',
      color: '#FF6600',
    },
    time: '+3.892',
    points: 6,
  },
  {
    position: 5,
    rider: {
      id: 'rider-vinales',
      number: 12,
      firstName: 'Maverick',
      lastName: 'Viñales',
      code: 'VIN',
      nationality: 'Spain',
      team: {
        id: 'team-ktm2',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    team: {
      id: 'team-ktm2',
      name: 'Red Bull KTM Factory Racing',
      shortName: 'KTM',
      color: '#FF6600',
    },
    time: '+5.421',
    points: 5,
  },
  {
    position: 6,
    rider: {
      id: 'rider-acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'Spain',
      team: {
        id: 'team-ktm3',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    team: {
      id: 'team-ktm3',
      name: 'Red Bull KTM Factory Racing',
      shortName: 'KTM',
      color: '#FF6600',
    },
    time: '+6.854',
    points: 4,
  },
  {
    position: 7,
    rider: {
      id: 'rider-digiannantonio',
      number: 49,
      firstName: 'Fabio',
      lastName: 'Di Giannantonio',
      code: 'DIG',
      nationality: 'Italy',
      team: {
        id: 'team-vr46',
        name: 'Pertamina Enduro VR46 Racing Team',
        shortName: 'VR46',
        color: '#FFFF00',
      },
      color: '#FFFF00',
    },
    team: {
      id: 'team-vr46',
      name: 'Pertamina Enduro VR46 Racing Team',
      shortName: 'VR46',
      color: '#FFFF00',
    },
    time: '+8.123',
    points: 3,
  },
  {
    position: 8,
    rider: {
      id: 'rider-fernandez',
      number: 25,
      firstName: 'Raúl',
      lastName: 'Fernández',
      code: 'FER',
      nationality: 'Spain',
      team: {
        id: 'team-trackhouse',
        name: 'Trackhouse Racing',
        shortName: 'Trackhouse',
        color: '#000000',
      },
      color: '#000000',
    },
    team: {
      id: 'team-trackhouse',
      name: 'Trackhouse Racing',
      shortName: 'Trackhouse',
      color: '#000000',
    },
    time: '+9.567',
    points: 2,
  },
  {
    position: 9,
    rider: {
      id: 'rider-mir',
      number: 36,
      firstName: 'Joan',
      lastName: 'Mir',
      code: 'MIR',
      nationality: 'Spain',
      team: {
        id: 'team-honda',
        name: 'Honda HRC Castrol',
        shortName: 'Honda',
        color: '#FF0000',
      },
      color: '#FF0000',
    },
    team: {
      id: 'team-honda',
      name: 'Honda HRC Castrol',
      shortName: 'Honda',
      color: '#FF0000',
    },
    time: '+11.234',
    points: 1,
  },
];

// Données mock pour fallback - Saison 2026 (calendrier réel avec sprints)
const MOCK_RACES: Race[] = [
  // Round 1: Thaïlande - Sprint (samedi 1er mars) + Course (dimanche 2 mars)
  {
    id: 'motogp-2026-1-sprint',
    round: 1,
    name: 'Thai Grand Prix - Sprint',
    circuit: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thailand',
    date: '2026-03-01T08:00:00.000Z', // Samedi 1er mars - Sprint
    status: 'finished',
    type: 'motogp',
    raceType: 'sprint',
    sprintResults: THAILAND_2026_SPRINT_RESULTS,
  },
  {
    id: 'motogp-2026-1-race',
    round: 1,
    name: 'Thai Grand Prix',
    circuit: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thailand',
    date: '2026-03-02T07:00:00.000Z', // Dimanche 2 mars - Course longue (AUJOURD'HUI)
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 2: Argentine - Sprint (samedi 14 mars) + Course (dimanche 15 mars)
  {
    id: 'motogp-2026-2-sprint',
    round: 2,
    name: 'Argentine Grand Prix - Sprint',
    circuit: 'Autódromo Termas de Río Hondo',
    location: 'Termas de Río Hondo',
    country: 'Argentina',
    date: '2026-03-14T18:00:00.000Z', // Samedi 14 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-2-race',
    round: 2,
    name: 'Argentine Grand Prix',
    circuit: 'Autódromo Termas de Río Hondo',
    location: 'Termas de Río Hondo',
    country: 'Argentina',
    date: '2026-03-15T18:00:00.000Z', // Dimanche 15 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 3: Americas - Sprint (samedi 28 mars) + Course (dimanche 29 mars)
  {
    id: 'motogp-2026-3-sprint',
    round: 3,
    name: 'Grand Prix of the Americas - Sprint',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2026-03-28T19:00:00.000Z', // Samedi 28 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-3-race',
    round: 3,
    name: 'Grand Prix of the Americas',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2026-03-29T19:00:00.000Z', // Dimanche 29 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 4: Qatar - Sprint (samedi 11 avril) + Course (dimanche 12 avril)
  {
    id: 'motogp-2026-4-sprint',
    round: 4,
    name: 'Grand Prix of Qatar - Sprint',
    circuit: 'Lusail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2026-04-11T17:00:00.000Z', // Samedi 11 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-4-race',
    round: 4,
    name: 'Grand Prix of Qatar',
    circuit: 'Lusail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2026-04-12T17:00:00.000Z', // Dimanche 12 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 5: Espagne - Sprint (samedi 25 avril) + Course (dimanche 26 avril)
  {
    id: 'motogp-2026-5-sprint',
    round: 5,
    name: 'Gran Premio de España - Sprint',
    circuit: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2026-04-25T13:00:00.000Z', // Samedi 25 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-5-race',
    round: 5,
    name: 'Gran Premio de España',
    circuit: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2026-04-26T13:00:00.000Z', // Dimanche 26 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 6: France - Sprint (samedi 9 mai) + Course (dimanche 10 mai)
  {
    id: 'motogp-2026-6-sprint',
    round: 6,
    name: 'Grand Prix de France - Sprint',
    circuit: 'Circuit Bugatti',
    location: 'Le Mans',
    country: 'France',
    date: '2026-05-09T13:00:00.000Z', // Samedi 9 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-6-race',
    round: 6,
    name: 'Grand Prix de France',
    circuit: 'Circuit Bugatti',
    location: 'Le Mans',
    country: 'France',
    date: '2026-05-10T13:00:00.000Z', // Dimanche 10 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 7: Catalogne - Sprint (samedi 23 mai) + Course (dimanche 24 mai)
  {
    id: 'motogp-2026-7-sprint',
    round: 7,
    name: 'Gran Premi de Catalunya - Sprint',
    circuit: 'Circuit de Barcelona-Catalunya',
    location: 'Barcelona',
    country: 'Spain',
    date: '2026-05-23T13:00:00.000Z', // Samedi 23 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-7-race',
    round: 7,
    name: 'Gran Premi de Catalunya',
    circuit: 'Circuit de Barcelona-Catalunya',
    location: 'Barcelona',
    country: 'Spain',
    date: '2026-05-24T13:00:00.000Z', // Dimanche 24 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 8: Italie - Sprint (samedi 6 juin) + Course (dimanche 7 juin)
  {
    id: 'motogp-2026-8-sprint',
    round: 8,
    name: "Gran Premio d'Italia - Sprint",
    circuit: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italy',
    date: '2026-06-06T13:00:00.000Z', // Samedi 6 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-8-race',
    round: 8,
    name: "Gran Premio d'Italia",
    circuit: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italy',
    date: '2026-06-07T13:00:00.000Z', // Dimanche 7 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 9: Hongrie - Sprint (samedi 20 juin) + Course (dimanche 21 juin)
  {
    id: 'motogp-2026-9-sprint',
    round: 9,
    name: 'Grand Prix of Hungary - Sprint',
    circuit: 'Balaton Park Circuit',
    location: 'Balatonfőkajár',
    country: 'Hungary',
    date: '2026-06-20T13:00:00.000Z', // Samedi 20 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-9-race',
    round: 9,
    name: 'Grand Prix of Hungary',
    circuit: 'Balaton Park Circuit',
    location: 'Balatonfőkajár',
    country: 'Hungary',
    date: '2026-06-21T13:00:00.000Z', // Dimanche 21 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  // Round 10: Tchéquie - Sprint (samedi 4 juillet) + Course (dimanche 5 juillet)
  {
    id: 'motogp-2026-10-sprint',
    round: 10,
    name: 'Grand Prix of Czechia - Sprint',
    circuit: 'Brno Circuit',
    location: 'Brno',
    country: 'Czech Republic',
    date: '2026-07-04T13:00:00.000Z', // Samedi 4 juillet
    status: 'upcoming',
    type: 'motogp',
    raceType: 'sprint',
  },
  {
    id: 'motogp-2026-10-race',
    round: 10,
    name: 'Grand Prix of Czechia',
    circuit: 'Brno Circuit',
    location: 'Brno',
    country: 'Czech Republic',
    date: '2026-07-05T13:00:00.000Z', // Dimanche 5 juillet
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
];

// Classement MotoGP 2026 après Sprint Thaïlande uniquement
// Système de points Sprint: 12-9-7-6-5-4-3-2-1 (Top 9 marquent)
// La course longue du 2 mars n'est pas encore terminée (AUJOURD'HUI)
const MOCK_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'rider-acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'Spain',
      team: {
        id: 'team-ktm3',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    points: 12, // Vainqueur sprint
    wins: 1,
  },
  {
    position: 2,
    rider: {
      id: 'rider-bagnaia',
      number: 1,
      firstName: 'Francesco',
      lastName: 'Bagnaia',
      code: 'BAG',
      nationality: 'Italy',
      team: {
        id: 'team-ducati',
        name: 'Ducati Lenovo Team',
        shortName: 'Ducati',
        color: '#DC2626',
      },
      color: '#DC2626',
    },
    points: 9, // 2ème sprint
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'rider-marquez',
      number: 93,
      firstName: 'Marc',
      lastName: 'Márquez',
      code: 'MAR',
      nationality: 'Spain',
      team: {
        id: 'team-ducati2',
        name: 'Ducati Lenovo Team',
        shortName: 'Ducati',
        color: '#DC2626',
      },
      color: '#DC2626',
    },
    points: 7, // 3ème sprint
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'rider-binder',
      number: 33,
      firstName: 'Brad',
      lastName: 'Binder',
      code: 'BIN',
      nationality: 'South Africa',
      team: {
        id: 'team-ktm',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    points: 6, // 4ème sprint
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'rider-vinales',
      number: 12,
      firstName: 'Maverick',
      lastName: 'Viñales',
      code: 'VIN',
      nationality: 'Spain',
      team: {
        id: 'team-ktm2',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    points: 5, // 5ème sprint
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'rider-acosta',
      number: 37,
      firstName: 'Pedro',
      lastName: 'Acosta',
      code: 'ACO',
      nationality: 'Spain',
      team: {
        id: 'team-ktm3',
        name: 'Red Bull KTM Factory Racing',
        shortName: 'KTM',
        color: '#FF6600',
      },
      color: '#FF6600',
    },
    points: 4, // 6ème sprint
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'rider-digiannantonio',
      number: 49,
      firstName: 'Fabio',
      lastName: 'Di Giannantonio',
      code: 'DIG',
      nationality: 'Italy',
      team: {
        id: 'team-vr46',
        name: 'Pertamina Enduro VR46 Racing Team',
        shortName: 'VR46',
        color: '#FFFF00',
      },
      color: '#FFFF00',
    },
    points: 3, // 7ème sprint
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'rider-fernandez',
      number: 25,
      firstName: 'Raúl',
      lastName: 'Fernández',
      code: 'FER',
      nationality: 'Spain',
      team: {
        id: 'team-trackhouse',
        name: 'Trackhouse Racing',
        shortName: 'Trackhouse',
        color: '#000000',
      },
      color: '#000000',
    },
    points: 2, // 8ème sprint
    wins: 0,
  },
  {
    position: 9,
    rider: {
      id: 'rider-mir',
      number: 36,
      firstName: 'Joan',
      lastName: 'Mir',
      code: 'MIR',
      nationality: 'Spain',
      team: {
        id: 'team-honda',
        name: 'Honda HRC Castrol',
        shortName: 'Honda',
        color: '#FF0000',
      },
      color: '#FF0000',
    },
    points: 1, // 9ème sprint
    wins: 0,
  },
];

// ===== DONNÉES WSBK 2026 =====

// Couleurs équipes WSBK 2026
const WSBK_TEAM_COLORS: Record<string, string> = {
  'Rokit BMW Motorrad WorldSBK Team': '#0066CC',
  'Aruba.it Racing - Ducati': '#DC2626',
  'Pata Yamaha with Brixx WorldSBK': '#00FF00',
  'Kawasaki Racing Team WorldSBK': '#00CC00',
  'Team HRC Honda': '#FF0000',
  'Bonovo Action BMW': '#3366CC',
  'Orelac Racing VerdNatura': '#FF6600',
  'GMT94 Yamaha': '#00CC99',
  'Barni Spark Racing Team': '#FFD700',
  'Pedercini Racing': '#CC0000',
  'EAB Racing Team': '#FF00FF',
  'GYTR GRT Yamaha WorldSBK Team': '#FFFF00',
};

// Calendrier WSBK 2026 (12 rounds)
const WSBK_2026_CALENDAR: Race[] = [
  {
    id: 'wsbk-2026-01',
    round: 1,
    name: 'Australian Round',
    circuit: 'Phillip Island Grand Prix Circuit',
    location: 'Phillip Island',
    country: 'Australia',
    date: '2026-02-21T09:00:00.000Z',
    status: 'finished',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-02',
    round: 2,
    name: 'Australian Round',
    circuit: 'Phillip Island Grand Prix Circuit',
    location: 'Phillip Island',
    country: 'Australia',
    date: '2026-02-22T09:00:00.000Z',
    status: 'finished',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-03',
    round: 3,
    name: 'Pirelli Portuguese Round',
    circuit: 'Autódromo Internacional do Algarve',
    location: 'Portimão',
    country: 'Portugal',
    date: '2026-03-28T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-04',
    round: 4,
    name: 'Pirelli Portuguese Round',
    circuit: 'Autódromo Internacional do Algarve',
    location: 'Portimão',
    country: 'Portugal',
    date: '2026-03-29T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-05',
    round: 5,
    name: 'OR Dutch Round',
    circuit: 'TT Circuit Assen',
    location: 'Assen',
    country: 'Netherlands',
    date: '2026-04-18T12:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-06',
    round: 6,
    name: 'OR Dutch Round',
    circuit: 'TT Circuit Assen',
    location: 'Assen',
    country: 'Netherlands',
    date: '2026-04-19T12:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-07',
    round: 7,
    name: 'Pirelli Italian Round',
    circuit: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italy',
    date: '2026-05-09T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-08',
    round: 8,
    name: 'Pirelli Italian Round',
    circuit: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italy',
    date: '2026-05-10T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-09',
    round: 9,
    name: 'British Round',
    circuit: 'Donington Park',
    location: 'Derby',
    country: 'United Kingdom',
    date: '2026-06-13T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-10',
    round: 10,
    name: 'British Round',
    circuit: 'Donington Park',
    location: 'Derby',
    country: 'United Kingdom',
    date: '2026-06-14T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-11',
    round: 11,
    name: 'Czech Round',
    circuit: 'Autodrom Most',
    location: 'Most',
    country: 'Czech Republic',
    date: '2026-07-25T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-12',
    round: 12,
    name: 'Czech Round',
    circuit: 'Autodrom Most',
    location: 'Most',
    country: 'Czech Republic',
    date: '2026-07-26T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-13',
    round: 13,
    name: 'Prosecco DOC German Round',
    circuit: 'Lausitzring',
    location: 'Klettwitz',
    country: 'Germany',
    date: '2026-08-08T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-14',
    round: 14,
    name: 'Prosecco DOC German Round',
    circuit: 'Lausitzring',
    location: 'Klettwitz',
    country: 'Germany',
    date: '2026-08-09T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-15',
    round: 15,
    name: 'Hungarian Round',
    circuit: 'Balaton Park Circuit',
    location: 'Balatonfőkajár',
    country: 'Hungary',
    date: '2026-08-22T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-16',
    round: 16,
    name: 'Hungarian Round',
    circuit: 'Balaton Park Circuit',
    location: 'Balatonfőkajár',
    country: 'Hungary',
    date: '2026-08-23T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-17',
    round: 17,
    name: 'French Round',
    circuit: 'Circuit de Nevers Magny-Cours',
    location: 'Magny-Cours',
    country: 'France',
    date: '2026-09-05T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-18',
    round: 18,
    name: 'French Round',
    circuit: 'Circuit de Nevers Magny-Cours',
    location: 'Magny-Cours',
    country: 'France',
    date: '2026-09-06T13:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-19',
    round: 19,
    name: 'Aragon Round',
    circuit: 'MotorLand Aragón',
    location: 'Alcañiz',
    country: 'Spain',
    date: '2026-09-19T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-20',
    round: 20,
    name: 'Aragon Round',
    circuit: 'MotorLand Aragón',
    location: 'Alcañiz',
    country: 'Spain',
    date: '2026-09-20T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-21',
    round: 21,
    name: 'Pirelli Spanish Round',
    circuit: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2026-10-03T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-22',
    round: 22,
    name: 'Pirelli Spanish Round',
    circuit: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2026-10-04T14:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-23',
    round: 23,
    name: 'Qatar Round',
    circuit: 'Losail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2026-10-24T17:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-24',
    round: 24,
    name: 'Qatar Round',
    circuit: 'Losail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2026-10-25T17:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-25',
    round: 25,
    name: 'Grand Ridge Brewery Australian Round',
    circuit: 'Phillip Island Grand Prix Circuit',
    location: 'Phillip Island',
    country: 'Australia',
    date: '2026-11-21T09:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
  {
    id: 'wsbk-2026-26',
    round: 26,
    name: 'Grand Ridge Brewery Australian Round',
    circuit: 'Phillip Island Grand Prix Circuit',
    location: 'Phillip Island',
    country: 'Australia',
    date: '2026-11-22T09:00:00.000Z',
    status: 'upcoming',
    type: 'wsbk',
  },
];

// Classement WSBK 2026 (données réalistes en cours de saison)
const WSBK_2026_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'toprak-2026',
      number: 54,
      firstName: 'Toprak',
      lastName: 'Razgatlıoğlu',
      code: 'RAZ',
      nationality: 'TUR',
      team: { id: 'bmw-2026', name: 'Rokit BMW Motorrad WorldSBK Team', shortName: 'BMW', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 62,
    wins: 2,
  },
  {
    position: 2,
    rider: {
      id: 'bautista-2026',
      number: 19,
      firstName: 'Álvaro',
      lastName: 'Bautista',
      code: 'BAU',
      nationality: 'ESP',
      team: { id: 'ducati-2026', name: 'Aruba.it Racing - Ducati', shortName: 'Ducati', color: '#DC2626' },
      color: '#DC2626',
    },
    points: 58,
    wins: 1,
  },
  {
    position: 3,
    rider: {
      id: 'rea-2026',
      number: 65,
      firstName: 'Jonathan',
      lastName: 'Rea',
      code: 'REA',
      nationality: 'GBR',
      team: { id: 'yamaha-2026', name: 'Pata Yamaha with Brixx WorldSBK', shortName: 'Yamaha', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 47,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'locatelli-2026',
      number: 55,
      firstName: 'Andrea',
      lastName: 'Locatelli',
      code: 'LOC',
      nationality: 'ITA',
      team: { id: 'yamaha2-2026', name: 'Pata Yamaha with Brixx WorldSBK', shortName: 'Yamaha', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 42,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'petrucci-2026',
      number: 9,
      firstName: 'Danilo',
      lastName: 'Petrucci',
      code: 'PET',
      nationality: 'ITA',
      team: { id: 'kawasaki-2026', name: 'Kawasaki Racing Team WorldSBK', shortName: 'Kawasaki', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 38,
    wins: 0,
  },
  {
    position: 6,
    rider: {
      id: 'vandermark-2026',
      number: 60,
      firstName: 'Michael',
      lastName: 'van der Mark',
      code: 'VDM',
      nationality: 'NED',
      team: { id: 'bmwb-2026', name: 'Rokit BMW Motorrad WorldSBK Team', shortName: 'BMW', color: '#0066CC' },
      color: '#0066CC',
    },
    points: 35,
    wins: 0,
  },
  {
    position: 7,
    rider: {
      id: 'redding-2026',
      number: 45,
      firstName: 'Scott',
      lastName: 'Redding',
      code: 'RED',
      nationality: 'GBR',
      team: { id: 'bmwc-2026', name: 'Bonovo Action BMW', shortName: 'BMW', color: '#3366CC' },
      color: '#3366CC',
    },
    points: 32,
    wins: 0,
  },
  {
    position: 8,
    rider: {
      id: 'gerloff-2026',
      number: 31,
      firstName: 'Garrett',
      lastName: 'Gerloff',
      code: 'GER',
      nationality: 'USA',
      team: { id: 'bmwd-2026', name: 'Bonovo Action BMW', shortName: 'BMW', color: '#3366CC' },
      color: '#3366CC',
    },
    points: 28,
    wins: 0,
  },
  {
    position: 9,
    rider: {
      id: 'lecuona-2026',
      number: 7,
      firstName: 'Iker',
      lastName: 'Lecuona',
      code: 'LEC',
      nationality: 'ESP',
      team: { id: 'honda-2026', name: 'Team HRC Honda', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 25,
    wins: 0,
  },
  {
    position: 10,
    rider: {
      id: 'vierge-2026',
      number: 97,
      firstName: 'Xavi',
      lastName: 'Vierge',
      code: 'VIE',
      nationality: 'ESP',
      team: { id: 'honda2-2026', name: 'Team HRC Honda', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 22,
    wins: 0,
  },
];

// Résultats des courses WSBK 2026 passées
const WSBK_2026_RESULTS: Record<string, { position: number; rider: string; team: string; time: string; points: number }[]> = {
  'wsbk-2026-01': [
    { position: 1, rider: 'Toprak Razgatlıoğlu', team: 'Rokit BMW Motorrad', time: '33:45.872', points: 25 },
    { position: 2, rider: 'Álvaro Bautista', team: 'Aruba.it Racing Ducati', time: '+2.341', points: 20 },
    { position: 3, rider: 'Andrea Locatelli', team: 'Pata Yamaha', time: '+5.128', points: 16 },
    { position: 4, rider: 'Jonathan Rea', team: 'Pata Yamaha', time: '+7.654', points: 13 },
    { position: 5, rider: 'Scott Redding', team: 'Bonovo Action BMW', time: '+10.987', points: 11 },
  ],
  'wsbk-2026-02': [
    { position: 1, rider: 'Toprak Razgatlıoğlu', team: 'Rokit BMW Motorrad', time: '34:12.456', points: 25 },
    { position: 2, rider: 'Jonathan Rea', team: 'Pata Yamaha', time: '+1.892', points: 20 },
    { position: 3, rider: 'Álvaro Bautista', team: 'Aruba.it Racing Ducati', time: '+4.567', points: 16 },
    { position: 4, rider: 'Danilo Petrucci', team: 'Kawasaki Racing', time: '+8.234', points: 13 },
    { position: 5, rider: 'Alex Lowes', team: 'Kawasaki Racing', time: '+12.456', points: 11 },
  ],
  'wsbk-2026-03': [
    { position: 1, rider: 'Álvaro Bautista', team: 'Aruba.it Racing Ducati', time: '36:28.765', points: 25 },
    { position: 2, rider: 'Toprak Razgatlıoğlu', team: 'Rokit BMW Motorrad', time: '+0.987', points: 20 },
    { position: 3, rider: 'Andrea Locatelli', team: 'Pata Yamaha', time: '+3.456', points: 16 },
    { position: 4, rider: 'Scott Redding', team: 'Bonovo Action BMW', time: '+6.789', points: 13 },
    { position: 5, rider: 'Xavi Vierge', team: 'Team HRC Honda', time: '+9.123', points: 11 },
  ],
};

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

// Calendrier MotoGP 2026 - Courses longues uniquement (10 premiers rounds)
const MOTOGP_2026_CALENDAR: Race[] = [
  {
    id: 'motogp-2026-r1',
    round: 1,
    name: 'Thai Grand Prix',
    circuit: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thailand',
    date: '2026-03-02T07:00:00.000Z', // Dimanche 2 mars (AUJOURD'HUI)
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r2',
    round: 2,
    name: 'Argentine Grand Prix',
    circuit: 'Autódromo Termas de Río Hondo',
    location: 'Termas de Río Hondo',
    country: 'Argentina',
    date: '2026-03-15T18:00:00.000Z', // Dimanche 15 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r3',
    round: 3,
    name: 'Grand Prix of the Americas',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    date: '2026-03-29T19:00:00.000Z', // Dimanche 29 mars
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r4',
    round: 4,
    name: 'Grand Prix of Qatar',
    circuit: 'Lusail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    date: '2026-04-12T17:00:00.000Z', // Dimanche 12 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r5',
    round: 5,
    name: 'Gran Premio de España',
    circuit: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Spain',
    date: '2026-04-26T13:00:00.000Z', // Dimanche 26 avril
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r6',
    round: 6,
    name: 'Grand Prix de France',
    circuit: 'Circuit Bugatti',
    location: 'Le Mans',
    country: 'France',
    date: '2026-05-10T13:00:00.000Z', // Dimanche 10 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r7',
    round: 7,
    name: 'Gran Premi de Catalunya',
    circuit: 'Circuit de Barcelona-Catalunya',
    location: 'Barcelona',
    country: 'Spain',
    date: '2026-05-24T13:00:00.000Z', // Dimanche 24 mai
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r8',
    round: 8,
    name: "Gran Premio d'Italia",
    circuit: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italy',
    date: '2026-06-07T13:00:00.000Z', // Dimanche 7 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r9',
    round: 9,
    name: 'Grand Prix of Hungary',
    circuit: 'Balaton Park Circuit',
    location: 'Balatonfőkajár',
    country: 'Hungary',
    date: '2026-06-21T13:00:00.000Z', // Dimanche 21 juin
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
  {
    id: 'motogp-2026-r10',
    round: 10,
    name: 'Grand Prix of Czechia',
    circuit: 'Brno Circuit',
    location: 'Brno',
    country: 'Czech Republic',
    date: '2026-07-05T13:00:00.000Z', // Dimanche 5 juillet
    status: 'upcoming',
    type: 'motogp',
    raceType: 'race',
  },
];

// Récupérer le calendrier MotoGP 2026
export async function getMotoGPCalendar(): Promise<Race[]> {
  console.log('[API] Fetching MotoGP 2026 calendar');
  return MOTOGP_2026_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

// Récupérer les événements MotoGP 2026 depuis PulseLive
export async function getMotoGPEvents(): Promise<Race[]> {
  const endpoint = `${MOTOGP_API_BASE}/results/events?seasonUuid=${MOTOGP_2026_SEASON_ID}`;

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

// Récupérer le classement MotoGP 2026
export async function getMotoGPStandings(): Promise<Standing[]> {
  const endpoint = `${MOTOGP_API_BASE}/results/standings?seasonUuid=${MOTOGP_2026_SEASON_ID}&categoryUuid=${MOTOGP_CATEGORY_ID}`;

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
    const upcomingRaces = races.length > 0 ? races : MOCK_RACES.filter(r => r.status === 'upcoming');
    // Filtrer pour ne garder que les courses principales (pas les sprints)
    return upcomingRaces.filter(r => r.raceType !== 'sprint');

  } catch (error) {
    logApiError('getNextMotoGPRaces', error, { endpoint });
    console.log('[API] Returning mock upcoming races as fallback');
    // Retourner uniquement les courses principales (pas les sprints)
    return MOCK_RACES.filter(r => r.status === 'upcoming' && r.raceType !== 'sprint');
  }
}

// Récupérer les courses WSBK 2026
export async function getWSBKEvents(): Promise<Race[]> {
  console.log('[API] Fetching WSBK 2026 events from local data');
  return WSBK_2026_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

// Récupérer le classement WSBK 2026
export async function getWSBKStandings(): Promise<Standing[]> {
  console.log('[API] Fetching WSBK 2026 standings from local data');
  return WSBK_2026_STANDINGS;
}

// Récupérer les résultats d'une course WSBK
export function getWSBKRaceResults(raceId: string): { position: number; rider: string; team: string; time: string; points: number }[] {
  return WSBK_2026_RESULTS[raceId] || [];
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

// Récupérer la dernière course WSBK 2026
export async function getLastWSBKRace(): Promise<Race | null> {
  console.log('[API] Fetching last WSBK 2026 race from local data');
  const finishedRaces = WSBK_2026_CALENDAR.filter(r => determineRaceStatus(r.date) === 'finished');
  return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : null;
}

// Récupérer la prochaine course WSBK 2026
export async function getNextWSBKRace(): Promise<Race | null> {
  console.log('[API] Fetching next WSBK 2026 race from local data');
  const upcomingRaces = WSBK_2026_CALENDAR.filter(r => determineRaceStatus(r.date) === 'upcoming');
  return upcomingRaces.length > 0 ? upcomingRaces[0] : null;
}

// Vérifier la santé des APIs
export async function checkApiHealth(): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};

  // Test PulseLive
  try {
    const response = await fetchWithTimeout(
      `${MOTOGP_API_BASE}/results/events?seasonUuid=${MOTOGP_2026_SEASON_ID}`,
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

// Couleurs équipes Moto2 2026
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

// Couleurs équipes Moto3 2026
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

// Calendrier 2026 Moto2/Moto3 (pas de sprint, courses le dimanche)
const MOTO2_2026_CALENDAR: Race[] = [
  { id: 'm2-2026-01', round: 1, name: 'Thai Grand Prix', circuit: 'Chang International Circuit', location: 'Buriram', country: 'Thailand', date: '2026-03-02T07:00:00', status: 'upcoming', type: 'moto2' }, // Dimanche 2 mars
  { id: 'm2-2026-02', round: 2, name: 'Argentine Grand Prix', circuit: 'Autódromo Termas de Río Hondo', location: 'Termas de Río Hondo', country: 'Argentina', date: '2026-03-15T17:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-03', round: 3, name: 'Grand Prix of the Americas', circuit: 'Circuit of the Americas', location: 'Austin', country: 'USA', date: '2026-03-29T17:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-04', round: 4, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2026-04-12T17:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-05', round: 5, name: 'Gran Premio de España', circuit: 'Circuito de Jerez', location: 'Jerez', country: 'Spain', date: '2026-04-26T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-06', round: 6, name: 'Grand Prix de France', circuit: 'Bugatti Circuit', location: 'Le Mans', country: 'France', date: '2026-05-10T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-07', round: 7, name: 'Gran Premi de Catalunya', circuit: 'Circuit de Barcelona-Catalunya', location: 'Barcelone', country: 'Spain', date: '2026-05-24T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-08', round: 8, name: "Gran Premio d'Italia", circuit: 'Autodromo Internazionale del Mugello', location: 'Scarperia', country: 'Italy', date: '2026-06-07T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-09', round: 9, name: 'Grand Prix of Hungary', circuit: 'Balaton Park Circuit', location: 'Balatonfőkajár', country: 'Hungary', date: '2026-06-21T13:00:00', status: 'upcoming', type: 'moto2' },
  { id: 'm2-2026-10', round: 10, name: 'Grand Prix of Czechia', circuit: 'Brno Circuit', location: 'Brno', country: 'Czech Republic', date: '2026-07-05T13:00:00', status: 'upcoming', type: 'moto2' },
];

const MOTO3_2026_CALENDAR: Race[] = [
  { id: 'm3-2026-01', round: 1, name: 'Thai Grand Prix', circuit: 'Chang International Circuit', location: 'Buriram', country: 'Thailand', date: '2026-03-02T07:00:00', status: 'upcoming', type: 'moto3' }, // Dimanche 2 mars
  { id: 'm3-2026-02', round: 2, name: 'Argentine Grand Prix', circuit: 'Autódromo Termas de Río Hondo', location: 'Termas de Río Hondo', country: 'Argentina', date: '2026-03-15T16:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-03', round: 3, name: 'Grand Prix of the Americas', circuit: 'Circuit of the Americas', location: 'Austin', country: 'USA', date: '2026-03-29T16:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-04', round: 4, name: 'Grand Prix of Qatar', circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', date: '2026-04-12T16:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-05', round: 5, name: 'Gran Premio de España', circuit: 'Circuito de Jerez', location: 'Jerez', country: 'Spain', date: '2026-04-26T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-06', round: 6, name: 'Grand Prix de France', circuit: 'Bugatti Circuit', location: 'Le Mans', country: 'France', date: '2026-05-10T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-07', round: 7, name: 'Gran Premi de Catalunya', circuit: 'Circuit de Barcelona-Catalunya', location: 'Barcelone', country: 'Spain', date: '2026-05-24T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-08', round: 8, name: "Gran Premio d'Italia", circuit: 'Autodromo Internazionale del Mugello', location: 'Scarperia', country: 'Italy', date: '2026-06-07T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-09', round: 9, name: 'Grand Prix of Hungary', circuit: 'Balaton Park Circuit', location: 'Balatonfőkajár', country: 'Hungary', date: '2026-06-21T12:00:00', status: 'upcoming', type: 'moto3' },
  { id: 'm3-2026-10', round: 10, name: 'Grand Prix of Czechia', circuit: 'Brno Circuit', location: 'Brno', country: 'Czech Republic', date: '2026-07-05T12:00:00', status: 'upcoming', type: 'moto3' },
];

// Classement Moto2 2026 - Saison non commencée (course aujourd'hui 2 mars)
const MOTO2_2026_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'arbolino-2026',
      number: 14,
      firstName: 'Tony',
      lastName: 'Arbolino',
      code: 'ARB',
      nationality: 'ITA',
      team: { id: 'fantic-2026', name: 'Fantic Racing', shortName: 'Fantic', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 2,
    rider: {
      id: 'aldeguer-2026',
      number: 54,
      firstName: 'Fermín',
      lastName: 'Aldeguer',
      code: 'ALD',
      nationality: 'ESP',
      team: { id: 'speedup-2026', name: 'SpeedUp Racing', shortName: 'SpeedUp', color: '#FFD700' },
      color: '#FFD700',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'dixon-2026',
      number: 96,
      firstName: 'Jake',
      lastName: 'Dixon',
      code: 'DIX',
      nationality: 'GBR',
      team: { id: 'aspar-2026', name: 'CFMOTO Aspar Team', shortName: 'Aspar', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'lopez-2026',
      number: 21,
      firstName: 'Alonso',
      lastName: 'López',
      code: 'LOP',
      nationality: 'ESP',
      team: { id: 'gresini-2026', name: 'QJmotor Gresini Moto2', shortName: 'Gresini', color: '#0066FF' },
      color: '#0066FF',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'salac-2026',
      number: 12,
      firstName: 'Filip',
      lastName: 'Salac',
      code: 'SAL',
      nationality: 'CZE',
      team: { id: 'intact-2026', name: 'Liqui Moly Husqvarna Intact GP', shortName: 'Intact', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 0,
    wins: 0,
  },
];

// Classement Moto3 2026 - Saison non commencée (course aujourd'hui 2 mars)
const MOTO3_2026_STANDINGS: Standing[] = [
  {
    position: 1,
    rider: {
      id: 'alonso-2026',
      number: 80,
      firstName: 'David',
      lastName: 'Alonso',
      code: 'ALO',
      nationality: 'COL',
      team: { id: 'aspar-2026', name: 'CFMOTO Aspar Team', shortName: 'Aspar', color: '#00CC00' },
      color: '#00CC00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 2,
    rider: {
      id: 'yamanaka-2026',
      number: 6,
      firstName: 'Ryusei',
      lastName: 'Yamanaka',
      code: 'YAM',
      nationality: 'JPN',
      team: { id: 'intact-2026', name: 'Liqui Moly Husqvarna Intact GP', shortName: 'Intact', color: '#00FF00' },
      color: '#00FF00',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 3,
    rider: {
      id: 'ogden-2026',
      number: 19,
      firstName: 'Scott',
      lastName: 'Ogden',
      code: 'OGD',
      nationality: 'GBR',
      team: { id: 'mt-2026', name: 'MT Helmets - MSI', shortName: 'MT', color: '#9933CC' },
      color: '#9933CC',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 4,
    rider: {
      id: 'dallaporta-2026',
      number: 48,
      firstName: 'Lorenzo',
      lastName: 'Dalla Porta',
      code: 'DAL',
      nationality: 'ITA',
      team: { id: 'ktmajo-2026', name: 'Red Bull KTM Ajo', shortName: 'KTM Ajo', color: '#FF6600' },
      color: '#FF6600',
    },
    points: 0,
    wins: 0,
  },
  {
    position: 5,
    rider: {
      id: 'furusato-2026',
      number: 72,
      firstName: 'Taiyo',
      lastName: 'Furusato',
      code: 'FUR',
      nationality: 'JPN',
      team: { id: 'honda-2026', name: 'Honda Team Asia', shortName: 'Honda', color: '#FF0000' },
      color: '#FF0000',
    },
    points: 0,
    wins: 0,
  },
];

// ===== FONCTIONS MOTO2 =====

export async function getMoto2Races(): Promise<Race[]> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventsseason.php?id=${MOTO2_LEAGUE_ID}&s=2026`,
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
  return MOTO2_2026_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

export async function getMoto2Standings(): Promise<Standing[]> {
  console.log('[API] Fetching Moto2 standings');
  return MOTO2_2026_STANDINGS;
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
  const finishedRaces = MOTO2_2026_CALENDAR.filter(r => determineRaceStatus(r.date) === 'finished');
  return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : MOTO2_2026_CALENDAR[0] || null;
}

// ===== FONCTIONS MOTO3 =====

export async function getMoto3Races(): Promise<Race[]> {
  try {
    const response = await fetchWithTimeout(
      `${SPORTSDB_API_BASE}/eventsseason.php?id=${MOTO3_LEAGUE_ID}&s=2026`,
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
  return MOTO3_2026_CALENDAR.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

export async function getMoto3Standings(): Promise<Standing[]> {
  console.log('[API] Fetching Moto3 standings');
  return MOTO3_2026_STANDINGS;
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
  const finishedRaces = MOTO3_2026_CALENDAR.filter(r => determineRaceStatus(r.date) === 'finished');
  return finishedRaces.length > 0 ? finishedRaces[finishedRaces.length - 1] : MOTO3_2026_CALENDAR[0] || null;
}

// ===== SPRINT RACE FUNCTIONS =====

// Récupérer les résultats de la sprint pour une course MotoGP
export async function getMotoGPSprintResults(raceId: string): Promise<RaceResult[]> {
  console.log(`[API] Fetching sprint results for race: ${raceId}`);

  // Retourner les résultats Sprint Thaïlande 2026
  if (raceId.includes('thailand') || raceId.includes('motogp-2026-1-sprint')) {
    return THAILAND_2026_SPRINT_RESULTS;
  }

  return [];
}

// Récupérer la dernière sprint MotoGP terminée
export async function getLastMotoGPSprint(): Promise<Race | null> {
  console.log('[API] Fetching last MotoGP sprint');

  // Sprint Thaïlande 2026 - terminé le 1er mars
  const thailandSprintDate = '2026-03-01T08:00:00.000Z';
  const sprintStatus = determineRaceStatus(thailandSprintDate);

  if (sprintStatus === 'finished') {
    return {
      id: 'motogp-2026-1-sprint',
      round: 1,
      name: 'Thai Grand Prix - Sprint',
      circuit: 'Chang International Circuit',
      location: 'Buriram',
      country: 'Thailand',
      date: thailandSprintDate,
      status: 'finished',
      type: 'motogp',
      raceType: 'sprint',
      sprintResults: THAILAND_2026_SPRINT_RESULTS,
    };
  }

  return null;
}

// Récupérer toutes les courses MotoGP 2026
export async function getMotoGPRaces(): Promise<Race[]> {
  console.log('[API] Fetching all MotoGP 2026 races');
  return MOCK_RACES.map(race => ({
    ...race,
    status: determineRaceStatus(race.date),
  }));
}

// Récupérer une course MotoGP spécifique par ID
export async function getMotoGPRaceById(id: string): Promise<Race | null> {
  console.log(`[API] Fetching MotoGP race by ID: ${id}`);
  const race = MOCK_RACES.find(r => r.id === id);
  if (!race) return null;
  
  return {
    ...race,
    status: determineRaceStatus(race.date),
  };
}
