/**
 * API de données MotoGP 2026
 * Système complet de données pour BikeOS v2
 * Agent: DATA MOTOGP
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Driver {
  id: string;
  name: string;
  number: number;
  nationality: string;
  countryCode: string;
  team: string;
  teamId: string;
  photo: string;
  stats: {
    wins: number;
    podiums: number;
    poles: number;
    championships: number;
    races: number;
  };
  birthDate: string;
  height: number;
  weight: number;
}

export interface Team {
  id: string;
  name: string;
  constructor: string;
  nationality: string;
  countryCode: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo: string;
  bike: string;
  riders: string[];
}

export interface Circuit {
  id: string;
  name: string;
  location: string;
  country: string;
  countryCode: string;
  length: number;
  turns: number;
  lapRecord: {
    time: string;
    rider: string;
    year: number;
  };
  image: string;
}

export interface Round {
  id: string;
  round: number;
  name: string;
  circuit: Circuit;
  dates: {
    practice1: string;
    practice2: string;
    practice3: string;
    qualifying: string;
    sprint: string;
    race: string;
  };
  status: 'upcoming' | 'live' | 'finished';
  season: number;
}

export interface QualifyingResult {
  position: number;
  driverId: string;
  q1Time?: string;
  q2Time?: string;
  q3Time?: string;
  gridPosition: number;
}

export interface SprintResult {
  position: number;
  driverId: string;
  time: string;
  gap: string;
  points: number;
  fastestLap?: boolean;
}

export interface ApiRaceResult {
  position: number;
  rider: {
    id: string;
    number: number;
    firstName: string;
    lastName: string;
    code: string;
    nationality: string;
    team: {
      id: string;
      name: string;
      shortName: string;
      color: string;
    };
    color: string;
  };
  team: {
    id: string;
    name: string;
    shortName: string;
    color: string;
  };
  time: string;
  points: number;
}

export interface RaceResults {
  roundId: string;
  qualifying: QualifyingResult[];
  sprint: SprintResult[];
  race: Array<{
    position: number;
    driverId: string;
    time: string;
    gap: string;
    points: number;
    fastestLap?: boolean;
    status: 'finished' | 'dnf' | 'dns';
  }>;
  fastestLap: {
    driverId: string;
    time: string;
  };
}

export interface Standing {
  position: number;
  driverId?: string;
  teamId?: string;
  bikeConstructor?: string;
  points: number;
  wins: number;
  podiums: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  image?: string;
  category: 'race' | 'transfer' | 'injury' | 'technical' | 'general';
}

// ============================================================================
// DONNÉES - PILOTES 2026 (22 pilotes)
// ============================================================================

export const drivers2026: Driver[] = [
  {
    id: 'bagnaia',
    name: 'Francesco Bagnaia',
    number: 63,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'Ducati Lenovo Team',
    teamId: 'ducati-lenovo',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/63_Bagnaia.png',
    stats: { wins: 27, podiums: 46, poles: 21, championships: 2, races: 148 },
    birthDate: '1997-01-14',
    height: 176,
    weight: 67,
  },
  {
    id: 'marquez-marc',
    name: 'Marc Marquez',
    number: 93,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Ducati Lenovo Team',
    teamId: 'ducati-lenovo',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/93_Marquez.png',
    stats: { wins: 87, podiums: 148, poles: 72, championships: 6, races: 202 },
    birthDate: '1993-02-17',
    height: 169,
    weight: 65,
  },
  {
    id: 'martin-jorge',
    name: 'Jorge Martin',
    number: 89,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Aprilia Racing',
    teamId: 'aprilia-racing',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/89_Martin.png',
    stats: { wins: 14, podiums: 40, poles: 18, championships: 1, races: 98 },
    birthDate: '1998-01-29',
    height: 168,
    weight: 62,
  },
  {
    id: 'espargaro-aleix',
    name: 'Aleix Espargaro',
    number: 41,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Aprilia Racing',
    teamId: 'aprilia-racing',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/41_Espargaro.png',
    stats: { wins: 2, podiums: 18, poles: 4, championships: 0, races: 268 },
    birthDate: '1989-07-30',
    height: 180,
    weight: 69,
  },
  {
    id: 'binder-brad',
    name: 'Brad Binder',
    number: 33,
    nationality: 'Sud-Africaine',
    countryCode: 'ZA',
    team: 'Red Bull KTM Factory Racing',
    teamId: 'ktm-factory',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/33_Binder.png',
    stats: { wins: 4, podiums: 22, poles: 1, championships: 0, races: 114 },
    birthDate: '1995-08-11',
    height: 170,
    weight: 63,
  },
  {
    id: 'acosta',
    name: 'Pedro Acosta',
    number: 37,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Red Bull KTM Factory Racing',
    teamId: 'ktm-factory',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/37_Acosta.png',
    stats: { wins: 4, podiums: 15, poles: 3, championships: 0, races: 28 },
    birthDate: '2004-05-25',
    height: 172,
    weight: 60,
  },
  {
    id: 'bastianini',
    name: 'Enea Bastianini',
    number: 23,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'Red Bull KTM Tech3',
    teamId: 'ktm-tech3',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/23_Bastianini.png',
    stats: { wins: 5, podiums: 14, poles: 2, championships: 0, races: 104 },
    birthDate: '1997-12-30',
    height: 168,
    weight: 64,
  },
  {
    id: 'ogura',
    name: 'Ai Ogura',
    number: 79,
    nationality: 'Japonaise',
    countryCode: 'JP',
    team: 'Red Bull KTM Tech3',
    teamId: 'ktm-tech3',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/79_Ogura.png',
    stats: { wins: 0, podiums: 4, poles: 0, championships: 0, races: 8 },
    birthDate: '2001-01-26',
    height: 172,
    weight: 65,
  },
  {
    id: 'viñales',
    name: 'Maverick Viñales',
    number: 12,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'KTM Castrol',
    teamId: 'ktm-castrol',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/12_Vinales.png',
    stats: { wins: 11, podiums: 38, poles: 14, championships: 0, races: 190 },
    birthDate: '1995-01-12',
    height: 171,
    weight: 64,
  },
  {
    id: 'miller-jack',
    name: 'Jack Miller',
    number: 43,
    nationality: 'Australienne',
    countryCode: 'AU',
    team: 'KTM Castrol',
    teamId: 'ktm-castrol',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/43_Miller.png',
    stats: { wins: 6, podiums: 26, poles: 3, championships: 0, races: 188 },
    birthDate: '1995-01-18',
    height: 173,
    weight: 64,
  },
  {
    id: 'quartararo',
    name: 'Fabio Quartararo',
    number: 20,
    nationality: 'Française',
    countryCode: 'FR',
    team: 'Monster Energy Yamaha',
    teamId: 'yamaha-factory',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/20_Quartararo.png',
    stats: { wins: 12, podiums: 32, poles: 9, championships: 1, races: 124 },
    birthDate: '1999-04-20',
    height: 177,
    weight: 67,
  },
  {
    id: 'rins',
    name: 'Alex Rins',
    number: 42,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Monster Energy Yamaha',
    teamId: 'yamaha-factory',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/42_Rins.png',
    stats: { wins: 6, podiums: 24, poles: 4, championships: 0, races: 162 },
    birthDate: '1995-12-08',
    height: 176,
    weight: 71,
  },
  {
    id: 'mir',
    name: 'Joan Mir',
    number: 36,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Honda HRC Castrol',
    teamId: 'honda-hrc',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/36_Mir.png',
    stats: { wins: 2, podiums: 12, poles: 0, championships: 1, races: 118 },
    birthDate: '1997-09-01',
    height: 181,
    weight: 75,
  },
  {
    id: 'marini',
    name: 'Luca Marini',
    number: 10,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'Honda HRC Castrol',
    teamId: 'honda-hrc',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/10_Marini.png',
    stats: { wins: 0, podiums: 4, poles: 0, championships: 0, races: 100 },
    birthDate: '1997-08-10',
    height: 184,
    weight: 71,
  },
  {
    id: 'marquez-alex',
    name: 'Alex Marquez',
    number: 73,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'BK8 Gresini Racing',
    teamId: 'gresini-racing',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/73_Marquez.png',
    stats: { wins: 3, podiums: 13, poles: 3, championships: 0, races: 138 },
    birthDate: '1996-04-23',
    height: 168,
    weight: 63,
  },
  {
    id: 'bezzechi',
    name: 'Marco Bezzecchi',
    number: 72,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'BK8 Gresini Racing',
    teamId: 'gresini-racing',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/72_Bezzechi.png',
    stats: { wins: 2, podiums: 12, poles: 1, championships: 0, races: 80 },
    birthDate: '1998-11-12',
    height: 167,
    weight: 62,
  },
  {
    id: 'fernandez-augusto',
    name: 'Augusto Fernandez',
    number: 7,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Prima Pramac Yamaha',
    teamId: 'pramac-yamaha',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/7_Fernandez.png',
    stats: { wins: 0, podiums: 3, poles: 0, championships: 0, races: 42 },
    birthDate: '1997-09-23',
    height: 174,
    weight: 66,
  },
  {
    id: 'morbidelli',
    name: 'Franco Morbidelli',
    number: 21,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'Prima Pramac Yamaha',
    teamId: 'pramac-yamaha',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/21_Morbidelli.png',
    stats: { wins: 3, podiums: 11, poles: 2, championships: 0, races: 158 },
    birthDate: '1994-12-04',
    height: 176,
    weight: 64,
  },
  {
    id: 'digiannantonio',
    name: 'Fabio Di Giannantonio',
    number: 49,
    nationality: 'Italienne',
    countryCode: 'IT',
    team: 'Pertamina Enduro VR46',
    teamId: 'vr46-racing',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/49_DiGiannantonio.png',
    stats: { wins: 1, podiums: 5, poles: 0, championships: 0, races: 72 },
    birthDate: '1998-10-10',
    height: 175,
    weight: 68,
  },
  {
    id: 'nakagami',
    name: 'Takaaki Nakagami',
    number: 30,
    nationality: 'Japonaise',
    countryCode: 'JP',
    team: 'LCR Honda Idemitsu',
    teamId: 'lcr-honda',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/30_Nakagami.png',
    stats: { wins: 0, podiums: 3, poles: 0, championships: 0, races: 136 },
    birthDate: '1992-02-09',
    height: 175,
    weight: 69,
  },
  {
    id: 'chantra',
    name: 'Somkiat Chantra',
    number: 35,
    nationality: 'Thaïlandaise',
    countryCode: 'TH',
    team: 'LCR Honda Castrol',
    teamId: 'lcr-honda',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/35_Chantra.png',
    stats: { wins: 0, podiums: 0, poles: 0, championships: 0, races: 4 },
    birthDate: '1998-04-14',
    height: 168,
    weight: 58,
  },
  {
    id: 'fernandez-raul',
    name: 'Raul Fernandez',
    number: 25,
    nationality: 'Espagnole',
    countryCode: 'ES',
    team: 'Trackhouse Racing',
    teamId: 'trackhouse',
    photo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/25_Fernandez.png',
    stats: { wins: 0, podiums: 2, poles: 0, championships: 0, races: 56 },
    birthDate: '2000-10-23',
    height: 173,
    weight: 64,
  },
];

// ============================================================================
// DONNÉES - ÉQUIPES 2026 (11 équipes)
// ============================================================================

export const teams2026: Team[] = [
  {
    id: 'ducati-lenovo',
    name: 'Ducati Lenovo Team',
    constructor: 'Ducati',
    nationality: 'Italienne',
    countryCode: 'IT',
    colors: { primary: '#DC0000', secondary: '#000000', accent: '#FFFFFF' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-ducati.png',
    bike: 'Ducati Desmosedici GP26',
    riders: ['bagnaia', 'marquez-marc'],
  },
  {
    id: 'aprilia-racing',
    name: 'Aprilia Racing',
    constructor: 'Aprilia',
    nationality: 'Italienne',
    countryCode: 'IT',
    colors: { primary: '#9D0012', secondary: '#FFFFFF', accent: '#000000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-aprilia.png',
    bike: 'Aprilia RS-GP26',
    riders: ['martin-jorge', 'espargaro-aleix'],
  },
  {
    id: 'ktm-factory',
    name: 'Red Bull KTM Factory Racing',
    constructor: 'KTM',
    nationality: 'Autrichienne',
    countryCode: 'AT',
    colors: { primary: '#FF6600', secondary: '#000000', accent: '#FFFFFF' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-ktm.png',
    bike: 'KTM RC16',
    riders: ['binder-brad', 'acosta'],
  },
  {
    id: 'ktm-tech3',
    name: 'Red Bull KTM Tech3',
    constructor: 'KTM',
    nationality: 'Française',
    countryCode: 'FR',
    colors: { primary: '#0000FF', secondary: '#FFFFFF', accent: '#FF0000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-tech3.png',
    bike: 'KTM RC16',
    riders: ['bastianini', 'ogura'],
  },
  {
    id: 'ktm-castrol',
    name: 'KTM Castrol',
    constructor: 'KTM',
    nationality: 'Autrichienne',
    countryCode: 'AT',
    colors: { primary: '#006600', secondary: '#FF0000', accent: '#FFFFFF' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-ktm-castrol.png',
    bike: 'KTM RC16',
    riders: ['viñales', 'miller-jack'],
  },
  {
    id: 'yamaha-factory',
    name: 'Monster Energy Yamaha MotoGP',
    constructor: 'Yamaha',
    nationality: 'Japonaise',
    countryCode: 'JP',
    colors: { primary: '#0000CC', secondary: '#00FF00', accent: '#000000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-yamaha.png',
    bike: 'Yamaha YZR-M1',
    riders: ['quartararo', 'rins'],
  },
  {
    id: 'honda-hrc',
    name: 'Honda HRC Castrol',
    constructor: 'Honda',
    nationality: 'Japonaise',
    countryCode: 'JP',
    colors: { primary: '#CC0000', secondary: '#FFFFFF', accent: '#000000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-honda.png',
    bike: 'Honda RC213V',
    riders: ['mir', 'marini'],
  },
  {
    id: 'gresini-racing',
    name: 'BK8 Gresini Racing MotoGP',
    constructor: 'Ducati',
    nationality: 'Italienne',
    countryCode: 'IT',
    colors: { primary: '#00BFFF', secondary: '#FFFFFF', accent: '#000000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-gresini.png',
    bike: 'Ducati Desmosedici GP25',
    riders: ['marquez-alex', 'bezzechi'],
  },
  {
    id: 'pramac-yamaha',
    name: 'Prima Pramac Yamaha MotoGP',
    constructor: 'Yamaha',
    nationality: 'Italienne',
    countryCode: 'IT',
    colors: { primary: '#FFD700', secondary: '#000000', accent: '#FFFFFF' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-pramac.png',
    bike: 'Yamaha YZR-M1',
    riders: ['fernandez-augusto', 'morbidelli'],
  },
  {
    id: 'vr46-racing',
    name: 'Pertamina Enduro VR46 Racing Team',
    constructor: 'Ducati',
    nationality: 'Italienne',
    countryCode: 'IT',
    colors: { primary: '#FFFF00', secondary: '#000000', accent: '#00FF00' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-vr46.png',
    bike: 'Ducati Desmosedici GP25',
    riders: ['digiannantonio', 'fernandez-raul'],
  },
  {
    id: 'lcr-honda',
    name: 'LCR Honda',
    constructor: 'Honda',
    nationality: 'Japonaise',
    countryCode: 'JP',
    colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#000000' },
    logo: 'https://resources.motogp.pulselive.com/photo-resources/2026/02/19/logo-lcr.png',
    bike: 'Honda RC213V',
    riders: ['nakagami', 'chantra'],
  },
];

// ============================================================================
// DONNÉES - CIRCUITS
// ============================================================================

const circuits: Circuit[] = [
  {
    id: 'buriram',
    name: 'Chang International Circuit',
    location: 'Buriram',
    country: 'Thaïlande',
    countryCode: 'TH',
    length: 4.554,
    turns: 12,
    lapRecord: { time: '1:29.725', rider: 'Brad Binder', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-buriram.jpg',
  },
  {
    id: 'phillip-island',
    name: 'Phillip Island Circuit',
    location: 'Phillip Island',
    country: 'Australie',
    countryCode: 'AU',
    length: 4.448,
    turns: 12,
    lapRecord: { time: '1:27.767', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-phillip-island.jpg',
  },
  {
    id: 'losail',
    name: 'Lusail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    countryCode: 'QA',
    length: 5.380,
    turns: 16,
    lapRecord: { time: '1:51.762', rider: 'Fabio Quartararo', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-losail.jpg',
  },
  {
    id: 'jerez',
    name: 'Circuito de Jerez',
    location: 'Jerez de la Frontera',
    country: 'Espagne',
    countryCode: 'ES',
    length: 4.423,
    turns: 13,
    lapRecord: { time: '1:36.725', rider: 'Fabio Quartararo', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-jerez.jpg',
  },
  {
    id: 'lemans',
    name: 'Bugatti Circuit',
    location: 'Le Mans',
    country: 'France',
    countryCode: 'FR',
    length: 4.185,
    turns: 14,
    lapRecord: { time: '1:30.081', rider: 'Pedro Acosta', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-lemans.jpg',
  },
  {
    id: 'mugello',
    name: 'Autodromo Internazionale del Mugello',
    location: 'Scarperia',
    country: 'Italie',
    countryCode: 'IT',
    length: 5.245,
    turns: 15,
    lapRecord: { time: '1:44.798', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-mugello.jpg',
  },
  {
    id: 'assen',
    name: 'TT Circuit Assen',
    location: 'Assen',
    country: 'Pays-Bas',
    countryCode: 'NL',
    length: 4.542,
    turns: 18,
    lapRecord: { time: '1:31.866', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-assen.jpg',
  },
  {
    id: 'sachsenring',
    name: 'Sachsenring',
    location: 'Hohenstein-Ernstthal',
    country: 'Allemagne',
    countryCode: 'DE',
    length: 3.671,
    turns: 13,
    lapRecord: { time: '1:20.145', rider: 'Jorge Martin', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-sachsenring.jpg',
  },
  {
    id: 'silverstone',
    name: 'Silverstone Circuit',
    location: 'Silverstone',
    country: 'Royaume-Uni',
    countryCode: 'GB',
    length: 5.900,
    turns: 18,
    lapRecord: { time: '1:58.645', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-silverstone.jpg',
  },
  {
    id: 'red-bull-ring',
    name: 'Red Bull Ring',
    location: 'Spielberg',
    country: 'Autriche',
    countryCode: 'AT',
    length: 4.318,
    turns: 10,
    lapRecord: { time: '1:21.901', rider: 'Jorge Martin', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-red-bull-ring.jpg',
  },
  {
    id: 'aragon',
    name: 'MotorLand Aragon',
    location: 'Alcaniz',
    country: 'Espagne',
    countryCode: 'ES',
    length: 5.077,
    turns: 17,
    lapRecord: { time: '1:46.281', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-aragon.jpg',
  },
  {
    id: 'misano',
    name: 'Misano World Circuit Marco Simoncelli',
    location: 'Misano Adriatico',
    country: 'Italie',
    countryCode: 'IT',
    length: 4.226,
    turns: 16,
    lapRecord: { time: '1:30.390', rider: 'Francesco Bagnaia', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-misano.jpg',
  },
  {
    id: 'motegi',
    name: 'Mobility Resort Motegi',
    location: 'Motegi',
    country: 'Japon',
    countryCode: 'JP',
    length: 4.801,
    turns: 14,
    lapRecord: { time: '1:44.411', rider: 'Francesco Bagnaia', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-motegi.jpg',
  },
  {
    id: 'sepang',
    name: 'Sepang International Circuit',
    location: 'Sepang',
    country: 'Malaisie',
    countryCode: 'MY',
    length: 5.543,
    turns: 15,
    lapRecord: { time: '1:58.576', rider: 'Francesco Bagnaia', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-sepang.jpg',
  },
  {
    id: 'austin',
    name: 'Circuit of the Americas',
    location: 'Austin',
    country: 'États-Unis',
    countryCode: 'US',
    length: 5.513,
    turns: 20,
    lapRecord: { time: '2:00.281', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-austin.jpg',
  },
  {
    id: 'rio-hondo',
    name: 'Termas de Rio Hondo',
    location: 'Santiago del Estero',
    country: 'Argentine',
    countryCode: 'AR',
    length: 4.806,
    turns: 14,
    lapRecord: { time: '1:37.683', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-rio-hondo.jpg',
  },
  {
    id: 'valencia',
    name: 'Circuit Ricardo Tormo',
    location: 'Valencia',
    country: 'Espagne',
    countryCode: 'ES',
    length: 4.005,
    turns: 14,
    lapRecord: { time: '1:29.440', rider: 'Francesco Bagnaia', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-valencia.jpg',
  },
  {
    id: 'barcelona',
    name: 'Circuit de Barcelona-Catalunya',
    location: 'Barcelona',
    country: 'Espagne',
    countryCode: 'ES',
    length: 4.657,
    turns: 16,
    lapRecord: { time: '1:38.685', rider: 'Jorge Martin', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-barcelona.jpg',
  },
  {
    id: 'brno',
    name: 'Brno Circuit',
    location: 'Brno',
    country: 'Republique Tcheque',
    countryCode: 'CZ',
    length: 5.403,
    turns: 14,
    lapRecord: { time: '1:54.234', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-brno.jpg',
  },
  {
    id: 'balaton',
    name: 'Balaton Park Circuit',
    location: 'Balatonfokajar',
    country: 'Hongrie',
    countryCode: 'HU',
    length: 4.600,
    turns: 16,
    lapRecord: { time: '1:42.567', rider: 'Francesco Bagnaia', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-balaton.jpg',
  },
  {
    id: 'portimao',
    name: 'Algarve International Circuit',
    location: 'Portimao',
    country: 'Portugal',
    countryCode: 'PT',
    length: 4.653,
    turns: 15,
    lapRecord: { time: '1:38.123', rider: 'Jorge Martin', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-portimao.jpg',
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    location: 'Indianapolis',
    country: 'États-Unis',
    countryCode: 'US',
    length: 4.170,
    turns: 16,
    lapRecord: { time: '1:32.456', rider: 'Marc Marquez', year: 2026 },
    image: 'https://resources.motogp.pulselive.com/photo-resources/2026/circuit-indianapolis.jpg',
  },
];

// ============================================================================
// DONNÉES - CALENDRIER 2026 COMPLET (22 rounds)
// ============================================================================

export const calendar2026: Round[] = [
  {
    id: 'thai-gp-2026',
    round: 1,
    name: 'PT Grand Prix of Thailand',
    circuit: circuits[0],
    dates: {
      practice1: '2026-02-27T09:45:00Z',
      practice2: '2026-02-27T14:00:00Z',
      practice3: '2026-02-28T09:10:00Z',
      qualifying: '2026-02-28T14:00:00Z',
      sprint: '2026-03-01T09:00:00Z',
      race: '2026-03-02T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'australian-gp-2026',
    round: 2,
    name: 'Australian Motorcycle Grand Prix',
    circuit: circuits[1],
    dates: {
      practice1: '2026-03-13T01:45:00Z',
      practice2: '2026-03-13T06:00:00Z',
      practice3: '2026-03-14T01:10:00Z',
      qualifying: '2026-03-14T06:00:00Z',
      sprint: '2026-03-15T01:00:00Z',
      race: '2026-03-16T05:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'qatari-gp-2026',
    round: 3,
    name: 'Qatar Airways Grand Prix of Qatar',
    circuit: circuits[2],
    dates: {
      practice1: '2026-03-27T13:45:00Z',
      practice2: '2026-03-27T18:00:00Z',
      practice3: '2026-03-28T13:10:00Z',
      qualifying: '2026-03-28T18:00:00Z',
      sprint: '2026-03-29T16:00:00Z',
      race: '2026-03-30T18:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'spanish-gp-2026',
    round: 4,
    name: 'Gran Premio Estrella Galicia 0,0 de España',
    circuit: circuits[3],
    dates: {
      practice1: '2026-04-24T09:45:00Z',
      practice2: '2026-04-24T14:00:00Z',
      practice3: '2026-04-25T09:10:00Z',
      qualifying: '2026-04-25T14:00:00Z',
      sprint: '2026-04-26T13:00:00Z',
      race: '2026-04-27T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'french-gp-2026',
    round: 5,
    name: 'Shark Grand Prix de France',
    circuit: circuits[4],
    dates: {
      practice1: '2026-05-08T08:45:00Z',
      practice2: '2026-05-08T13:00:00Z',
      practice3: '2026-05-09T08:10:00Z',
      qualifying: '2026-05-09T13:00:00Z',
      sprint: '2026-05-10T13:00:00Z',
      race: '2026-05-11T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'italian-gp-2026',
    round: 6,
    name: 'Gran Premio d\'Italia Brembo',
    circuit: circuits[5],
    dates: {
      practice1: '2026-05-22T09:45:00Z',
      practice2: '2026-05-22T14:00:00Z',
      practice3: '2026-05-23T09:10:00Z',
      qualifying: '2026-05-23T14:00:00Z',
      sprint: '2026-05-24T13:00:00Z',
      race: '2026-05-25T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'dutch-gp-2026',
    round: 7,
    name: 'Motul TT Assen',
    circuit: circuits[6],
    dates: {
      practice1: '2026-06-26T08:45:00Z',
      practice2: '2026-06-26T13:00:00Z',
      practice3: '2026-06-27T08:10:00Z',
      qualifying: '2026-06-27T13:00:00Z',
      sprint: '2026-06-28T13:00:00Z',
      race: '2026-06-29T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'german-gp-2026',
    round: 8,
    name: 'Liqui Moly Motorrad Grand Prix Deutschland',
    circuit: circuits[7],
    dates: {
      practice1: '2026-07-17T08:45:00Z',
      practice2: '2026-07-17T13:00:00Z',
      practice3: '2026-07-18T08:10:00Z',
      qualifying: '2026-07-18T13:00:00Z',
      sprint: '2026-07-19T13:00:00Z',
      race: '2026-07-20T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'british-gp-2026',
    round: 9,
    name: 'Monster Energy British Grand Prix',
    circuit: circuits[8],
    dates: {
      practice1: '2026-07-31T09:45:00Z',
      practice2: '2026-07-31T14:00:00Z',
      practice3: '2026-08-01T09:10:00Z',
      qualifying: '2026-08-01T14:00:00Z',
      sprint: '2026-08-02T13:00:00Z',
      race: '2026-08-03T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'austrian-gp-2026',
    round: 10,
    name: 'CryptoDATA Motorrad Grand Prix von Österreich',
    circuit: circuits[9],
    dates: {
      practice1: '2026-08-14T08:45:00Z',
      practice2: '2026-08-14T13:00:00Z',
      practice3: '2026-08-15T08:10:00Z',
      qualifying: '2026-08-15T13:00:00Z',
      sprint: '2026-08-16T13:00:00Z',
      race: '2026-08-17T13:00:00Z',
    },
    status: 'live',
    season: 2026,
  },
  {
    id: 'aragon-gp-2026',
    round: 11,
    name: 'Gran Premio GoPro de Aragón',
    circuit: circuits[10],
    dates: {
      practice1: '2026-09-04T09:45:00Z',
      practice2: '2026-09-04T14:00:00Z',
      practice3: '2026-09-05T09:10:00Z',
      qualifying: '2026-09-05T14:00:00Z',
      sprint: '2026-09-06T13:00:00Z',
      race: '2026-09-07T13:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'san-marino-gp-2026',
    round: 12,
    name: 'Gran Premio Red Bull di San Marino e della Riviera di Rimini',
    circuit: circuits[11],
    dates: {
      practice1: '2026-09-11T09:45:00Z',
      practice2: '2026-09-11T14:00:00Z',
      practice3: '2026-09-12T09:10:00Z',
      qualifying: '2026-09-12T14:00:00Z',
      sprint: '2026-09-13T13:00:00Z',
      race: '2026-09-14T13:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'japanese-gp-2026',
    round: 13,
    name: 'Motul Grand Prix of Japan',
    circuit: circuits[12],
    dates: {
      practice1: '2026-09-25T02:45:00Z',
      practice2: '2026-09-25T07:00:00Z',
      practice3: '2026-09-26T02:10:00Z',
      qualifying: '2026-09-26T07:00:00Z',
      sprint: '2026-09-27T06:00:00Z',
      race: '2026-09-28T07:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'malaysian-gp-2026',
    round: 14,
    name: 'Petronas Grand Prix of Malaysia',
    circuit: circuits[13],
    dates: {
      practice1: '2026-10-09T03:45:00Z',
      practice2: '2026-10-09T08:00:00Z',
      practice3: '2026-10-10T03:10:00Z',
      qualifying: '2026-10-10T08:00:00Z',
      sprint: '2026-10-11T07:00:00Z',
      race: '2026-10-12T08:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'thai-gp-2-2026',
    round: 15,
    name: 'PT Grand Prix of Thailand',
    circuit: circuits[0],
    dates: {
      practice1: '2026-10-16T09:45:00Z',
      practice2: '2026-10-16T14:00:00Z',
      practice3: '2026-10-17T09:10:00Z',
      qualifying: '2026-10-17T14:00:00Z',
      sprint: '2026-10-18T09:00:00Z',
      race: '2026-10-19T13:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'americas-gp-2026',
    round: 16,
    name: 'Red Bull Grand Prix of the Americas',
    circuit: circuits[14],
    dates: {
      practice1: '2026-10-30T15:10:00Z',
      practice2: '2026-10-30T19:30:00Z',
      practice3: '2026-10-31T15:10:00Z',
      qualifying: '2026-10-31T19:30:00Z',
      sprint: '2026-11-01T18:00:00Z',
      race: '2026-11-02T20:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'argentine-gp-2026',
    round: 17,
    name: 'Gran Premio YPF Energia de Argentina',
    circuit: circuits[15],
    dates: {
      practice1: '2026-11-13T13:10:00Z',
      practice2: '2026-11-13T17:30:00Z',
      practice3: '2026-11-14T13:10:00Z',
      qualifying: '2026-11-14T17:30:00Z',
      sprint: '2026-11-15T16:00:00Z',
      race: '2026-11-16T18:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'valencian-gp-2026',
    round: 18,
    name: 'Gran Premio Motul de la Comunitat Valenciana',
    circuit: circuits[16],
    dates: {
      practice1: '2026-11-27T09:45:00Z',
      practice2: '2026-11-27T14:00:00Z',
      practice3: '2026-11-28T09:10:00Z',
      qualifying: '2026-11-28T14:00:00Z',
      sprint: '2026-11-29T13:00:00Z',
      race: '2026-11-30T13:00:00Z',
    },
    status: 'upcoming',
    season: 2026,
  },
  {
    id: 'catalan-gp-2026',
    round: 19,
    name: 'Gran Premi de Catalunya',
    circuit: circuits[17],
    dates: {
      practice1: '2026-05-01T09:45:00Z',
      practice2: '2026-05-01T14:00:00Z',
      practice3: '2026-05-02T09:10:00Z',
      qualifying: '2026-05-02T14:00:00Z',
      sprint: '2026-05-03T13:00:00Z',
      race: '2026-05-04T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'czech-gp-2026',
    round: 20,
    name: 'Grand Prix of Czechia',
    circuit: circuits[18],
    dates: {
      practice1: '2026-07-03T08:45:00Z',
      practice2: '2026-07-03T13:00:00Z',
      practice3: '2026-07-04T08:10:00Z',
      qualifying: '2026-07-04T13:00:00Z',
      sprint: '2026-07-05T13:00:00Z',
      race: '2026-07-06T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'hungarian-gp-2026',
    round: 21,
    name: 'Grand Prix of Hungary',
    circuit: circuits[19],
    dates: {
      practice1: '2026-06-19T08:45:00Z',
      practice2: '2026-06-19T13:00:00Z',
      practice3: '2026-06-20T08:10:00Z',
      qualifying: '2026-06-20T13:00:00Z',
      sprint: '2026-06-21T13:00:00Z',
      race: '2026-06-22T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
  {
    id: 'portuguese-gp-2026',
    round: 22,
    name: 'Grande Prémio de Portugal',
    circuit: circuits[20],
    dates: {
      practice1: '2026-03-06T11:45:00Z',
      practice2: '2026-03-06T16:00:00Z',
      practice3: '2026-03-07T11:10:00Z',
      qualifying: '2026-03-07T16:00:00Z',
      sprint: '2026-03-08T13:00:00Z',
      race: '2026-03-09T13:00:00Z',
    },
    status: 'finished',
    season: 2026,
  },
];

// ============================================================================
// DONNÉES - RÉSULTATS DES COURSES
// ============================================================================

export const raceResults2026: RaceResults[] = [
  {
    roundId: 'thai-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:29.159', gridPosition: 1 },
      { position: 2, driverId: 'bagnaia', q3Time: '1:29.284', gridPosition: 2 },
      { position: 3, driverId: 'acosta', q3Time: '1:29.412', gridPosition: 3 },
      { position: 4, driverId: 'martin-jorge', q3Time: '1:29.523', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:29.678', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:29.784', gridPosition: 6 },
      { position: 7, driverId: 'viñales', q3Time: '1:29.891', gridPosition: 7 },
      { position: 8, driverId: 'quartararo', q3Time: '1:29.987', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:30.123', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:30.234', gridPosition: 10 },
      { position: 11, driverId: 'zarco', q2Time: '1:30.345', gridPosition: 11 },
      { position: 12, driverId: 'bezzechi', q2Time: '1:30.456', gridPosition: 12 },
    ],
    sprint: [
      { position: 1, driverId: 'marquez-marc', time: '19:52.145', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'bagnaia', time: '19:53.012', gap: '+0.867', points: 9 },
      { position: 3, driverId: 'acosta', time: '19:53.845', gap: '+1.700', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '19:54.234', gap: '+2.089', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:55.123', gap: '+2.978', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:55.987', gap: '+3.842', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:56.876', gap: '+4.731', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:57.654', gap: '+5.509', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:58.432', gap: '+6.287', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '39:45.123', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'bagnaia', time: '39:46.234', gap: '+1.111', points: 20, status: 'finished' },
      { position: 3, driverId: 'martin-jorge', time: '39:48.567', gap: '+3.444', points: 15, status: 'finished' },
      { position: 4, driverId: 'acosta', time: '39:49.876', gap: '+4.753', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '39:52.123', gap: '+7.000', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '39:53.456', gap: '+8.333', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '39:55.789', gap: '+10.666', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '39:57.012', gap: '+11.889', points: 8, status: 'finished' },
      { position: 9, driverId: 'espargaro-aleix', time: '39:58.345', gap: '+13.222', points: 7, status: 'finished' },
      { position: 10, driverId: 'miller-jack', time: '40:00.678', gap: '+15.555', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '40:02.901', gap: '+17.778', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '40:04.234', gap: '+19.111', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '40:06.567', gap: '+21.444', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '40:08.890', gap: '+23.767', points: 2, status: 'finished' },
      { position: 15, driverId: 'fernandez-raul', time: '40:10.123', gap: '+25.000', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:29.432' },
  },
  {
    roundId: 'australian-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:27.456', gridPosition: 1 },
      { position: 2, driverId: 'bagnaia', q3Time: '1:27.789', gridPosition: 2 },
      { position: 3, driverId: 'martin-jorge', q3Time: '1:27.890', gridPosition: 3 },
      { position: 4, driverId: 'acosta', q3Time: '1:28.012', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:28.234', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:28.345', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:28.456', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:28.567', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:28.678', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:28.789', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'bagnaia', time: '18:45.678', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'marquez-marc', time: '18:46.789', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'acosta', time: '18:47.890', gap: '+2.212', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '18:48.901', gap: '+3.223', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '18:49.012', gap: '+4.334', points: 5 },
      { position: 6, driverId: 'bastianini', time: '18:50.123', gap: '+5.445', points: 4 },
      { position: 7, driverId: 'quartararo', time: '18:51.234', gap: '+6.556', points: 3 },
      { position: 8, driverId: 'viñales', time: '18:52.345', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '18:53.456', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '40:12.345', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'bagnaia', time: '40:14.567', gap: '+2.222', points: 20, status: 'finished' },
      { position: 3, driverId: 'acosta', time: '40:17.890', gap: '+5.545', points: 15, status: 'finished' },
      { position: 4, driverId: 'martin-jorge', time: '40:19.123', gap: '+6.778', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '40:21.456', gap: '+9.111', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '40:23.789', gap: '+11.444', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '40:26.012', gap: '+13.667', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '40:28.345', gap: '+16.000', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '40:30.678', gap: '+18.333', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '40:33.001', gap: '+20.656', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '40:35.234', gap: '+22.889', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '40:37.567', gap: '+25.222', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '40:39.890', gap: '+27.545', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '40:42.123', gap: '+29.778', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '40:44.456', gap: '+32.111', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'bagnaia', time: '1:27.890' },
  },
  {
    roundId: 'qatari-gp-2026',
    qualifying: [
      { position: 1, driverId: 'bagnaia', q3Time: '1:51.123', gridPosition: 1 },
      { position: 2, driverId: 'marquez-marc', q3Time: '1:51.456', gridPosition: 2 },
      { position: 3, driverId: 'martin-jorge', q3Time: '1:51.789', gridPosition: 3 },
      { position: 4, driverId: 'acosta', q3Time: '1:51.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:52.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:52.123', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:52.234', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:52.345', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:52.456', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:52.567', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'martin-jorge', time: '19:15.234', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'marquez-marc', time: '19:16.345', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:17.456', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'acosta', time: '19:18.567', gap: '+3.333', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:19.678', gap: '+4.444', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:20.789', gap: '+5.555', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:21.890', gap: '+6.656', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:22.901', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:23.012', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'bagnaia', time: '41:23.456', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'marquez-marc', time: '41:25.678', gap: '+2.222', points: 20, status: 'finished' },
      { position: 3, driverId: 'martin-jorge', time: '41:28.901', gap: '+5.445', points: 15, status: 'finished' },
      { position: 4, driverId: 'acosta', time: '41:31.124', gap: '+7.668', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '41:34.347', gap: '+10.891', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '41:37.560', gap: '+14.104', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '41:40.783', gap: '+17.327', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '41:43.006', gap: '+19.550', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '41:46.229', gap: '+22.773', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '41:49.452', gap: '+25.996', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '41:52.675', gap: '+29.219', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '41:55.898', gap: '+32.442', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '41:59.121', gap: '+35.665', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '42:02.344', gap: '+38.888', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '42:05.567', gap: '+42.111', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'bagnaia', time: '1:51.234' },
  },
  {
    roundId: 'spanish-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:36.234', gridPosition: 1 },
      { position: 2, driverId: 'acosta', q3Time: '1:36.567', gridPosition: 2 },
      { position: 3, driverId: 'bagnaia', q3Time: '1:36.890', gridPosition: 3 },
      { position: 4, driverId: 'martin-jorge', q3Time: '1:37.012', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:37.234', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:37.456', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:37.678', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:37.890', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:38.012', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:38.234', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'marquez-marc', time: '19:42.123', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'acosta', time: '19:43.456', gap: '+1.333', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:44.789', gap: '+2.666', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '19:46.012', gap: '+3.889', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:47.345', gap: '+5.222', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:48.678', gap: '+6.555', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:49.901', gap: '+7.778', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:51.234', gap: '+9.111', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:52.567', gap: '+10.444', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '40:56.789', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'bagnaia', time: '40:59.012', gap: '+2.223', points: 20, status: 'finished' },
      { position: 3, driverId: 'martin-jorge', time: '41:02.345', gap: '+5.556', points: 15, status: 'finished' },
      { position: 4, driverId: 'acosta', time: '41:05.678', gap: '+8.889', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '41:08.901', gap: '+12.112', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '41:12.234', gap: '+15.445', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '41:15.567', gap: '+18.778', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '41:18.890', gap: '+22.101', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '41:22.123', gap: '+25.334', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '41:25.456', gap: '+28.667', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '41:28.789', gap: '+31.000', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '41:32.012', gap: '+34.223', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '41:35.345', gap: '+37.556', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '41:38.678', gap: '+40.889', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '41:41.901', gap: '+44.112', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:36.345' },
  },
  {
    roundId: 'french-gp-2026',
    qualifying: [
      { position: 1, driverId: 'acosta', q3Time: '1:29.567', gridPosition: 1 },
      { position: 2, driverId: 'marquez-marc', q3Time: '1:29.678', gridPosition: 2 },
      { position: 3, driverId: 'bagnaia', q3Time: '1:29.789', gridPosition: 3 },
      { position: 4, driverId: 'martin-jorge', q3Time: '1:29.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:30.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:30.123', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:30.234', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:30.345', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:30.456', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:30.567', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'acosta', time: '19:38.456', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'marquez-marc', time: '19:39.567', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:40.678', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '19:41.789', gap: '+3.333', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:42.890', gap: '+4.434', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:43.901', gap: '+5.445', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:44.012', gap: '+6.556', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:45.123', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:46.234', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'acosta', time: '40:45.123', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'marquez-marc', time: '40:46.234', gap: '+1.111', points: 20, status: 'finished' },
      { position: 3, driverId: 'bagnaia', time: '40:48.345', gap: '+3.222', points: 15, status: 'finished' },
      { position: 4, driverId: 'martin-jorge', time: '40:51.456', gap: '+6.333', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '40:54.567', gap: '+9.444', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '40:57.678', gap: '+12.555', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '41:00.789', gap: '+15.666', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '41:03.890', gap: '+18.767', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '41:07.012', gap: '+21.889', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '41:10.123', gap: '+25.000', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '41:13.234', gap: '+28.111', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '41:16.345', gap: '+31.222', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '41:19.456', gap: '+34.333', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '41:22.567', gap: '+37.444', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '41:25.678', gap: '+40.555', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'acosta', time: '1:29.890' },
  },
  {
    roundId: 'italian-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:44.123', gridPosition: 1 },
      { position: 2, driverId: 'bagnaia', q3Time: '1:44.456', gridPosition: 2 },
      { position: 3, driverId: 'martin-jorge', q3Time: '1:44.789', gridPosition: 3 },
      { position: 4, driverId: 'acosta', q3Time: '1:44.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:45.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:45.123', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:45.234', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:45.345', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:45.456', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:45.567', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'marquez-marc', time: '19:28.345', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'bagnaia', time: '19:29.456', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'martin-jorge', time: '19:30.567', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'acosta', time: '19:31.678', gap: '+3.333', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:32.789', gap: '+4.444', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:33.890', gap: '+5.545', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:34.901', gap: '+6.556', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:35.012', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:36.123', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'bagnaia', time: '40:34.567', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'marquez-marc', time: '40:36.789', gap: '+2.222', points: 20, status: 'finished' },
      { position: 3, driverId: 'martin-jorge', time: '40:39.012', gap: '+4.445', points: 15, status: 'finished' },
      { position: 4, driverId: 'acosta', time: '40:42.345', gap: '+7.778', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '40:45.678', gap: '+11.111', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '40:48.901', gap: '+14.334', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '40:52.234', gap: '+17.667', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '40:55.567', gap: '+21.000', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '40:58.890', gap: '+24.323', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '41:02.123', gap: '+27.556', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '41:05.456', gap: '+30.889', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '41:08.789', gap: '+34.222', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '41:12.012', gap: '+37.445', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '41:15.345', gap: '+40.778', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '41:18.678', gap: '+44.111', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:44.567' },
  },
  {
    roundId: 'dutch-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:31.234', gridPosition: 1 },
      { position: 2, driverId: 'acosta', q3Time: '1:31.456', gridPosition: 2 },
      { position: 3, driverId: 'bagnaia', q3Time: '1:31.678', gridPosition: 3 },
      { position: 4, driverId: 'martin-jorge', q3Time: '1:31.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:32.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:32.234', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:32.456', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:32.678', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:32.890', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:33.012', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'marquez-marc', time: '19:22.123', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'acosta', time: '19:23.234', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:24.345', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '19:25.456', gap: '+3.333', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:26.567', gap: '+4.444', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:27.678', gap: '+5.555', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:28.789', gap: '+6.666', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:29.890', gap: '+7.767', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:30.901', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '40:18.456', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'acosta', time: '40:20.567', gap: '+2.111', points: 20, status: 'finished' },
      { position: 3, driverId: 'bagnaia', time: '40:23.678', gap: '+5.222', points: 15, status: 'finished' },
      { position: 4, driverId: 'martin-jorge', time: '40:26.789', gap: '+8.333', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '40:29.890', gap: '+11.434', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '40:33.012', gap: '+14.556', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '40:36.123', gap: '+17.667', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '40:39.234', gap: '+20.778', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '40:42.345', gap: '+23.889', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '40:45.456', gap: '+27.000', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '40:48.567', gap: '+30.111', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '40:51.678', gap: '+33.222', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '40:54.789', gap: '+36.333', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '40:57.890', gap: '+39.434', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '41:01.012', gap: '+42.556', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:31.567' },
  },
  {
    roundId: 'german-gp-2026',
    qualifying: [
      { position: 1, driverId: 'martin-jorge', q3Time: '1:19.890', gridPosition: 1 },
      { position: 2, driverId: 'marquez-marc', q3Time: '1:20.012', gridPosition: 2 },
      { position: 3, driverId: 'bagnaia', q3Time: '1:20.234', gridPosition: 3 },
      { position: 4, driverId: 'acosta', q3Time: '1:20.345', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:20.456', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:20.567', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:20.678', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:20.789', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:20.890', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:21.012', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'martin-jorge', time: '19:05.678', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'marquez-marc', time: '19:06.789', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:07.890', gap: '+2.212', points: 7 },
      { position: 4, driverId: 'acosta', time: '19:08.901', gap: '+3.223', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:09.012', gap: '+4.334', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:10.123', gap: '+5.445', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:11.234', gap: '+6.556', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:12.345', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:13.456', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '39:58.234', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'martin-jorge', time: '40:00.456', gap: '+2.222', points: 20, status: 'finished' },
      { position: 3, driverId: 'bagnaia', time: '40:03.678', gap: '+5.444', points: 15, status: 'finished' },
      { position: 4, driverId: 'acosta', time: '40:06.890', gap: '+8.656', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '40:10.112', gap: '+11.878', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '40:13.334', gap: '+15.100', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '40:16.556', gap: '+18.322', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '40:19.778', gap: '+21.544', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '40:23.000', gap: '+24.766', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '40:26.222', gap: '+27.988', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '40:29.444', gap: '+31.210', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '40:32.666', gap: '+34.432', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '40:35.888', gap: '+37.654', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '40:39.110', gap: '+40.876', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '40:42.332', gap: '+44.098', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:20.145' },
  },
  {
    roundId: 'british-gp-2026',
    qualifying: [
      { position: 1, driverId: 'marquez-marc', q3Time: '1:58.123', gridPosition: 1 },
      { position: 2, driverId: 'bagnaia', q3Time: '1:58.456', gridPosition: 2 },
      { position: 3, driverId: 'acosta', q3Time: '1:58.789', gridPosition: 3 },
      { position: 4, driverId: 'martin-jorge', q3Time: '1:58.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:59.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:59.123', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:59.234', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:59.345', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:59.456', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:59.567', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'marquez-marc', time: '19:45.234', gap: '+0.000', points: 12, fastestLap: true },
      { position: 2, driverId: 'bagnaia', time: '19:46.345', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'acosta', time: '19:47.456', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'martin-jorge', time: '19:48.567', gap: '+3.333', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:49.678', gap: '+4.444', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:50.789', gap: '+5.555', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:51.890', gap: '+6.656', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:52.901', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:54.012', gap: '+8.778', points: 1 },
    ],
    race: [
      { position: 1, driverId: 'marquez-marc', time: '41:02.345', gap: '+0.000', points: 25, fastestLap: true, status: 'finished' },
      { position: 2, driverId: 'bagnaia', time: '41:04.567', gap: '+2.222', points: 20, status: 'finished' },
      { position: 3, driverId: 'acosta', time: '41:07.890', gap: '+5.545', points: 15, status: 'finished' },
      { position: 4, driverId: 'martin-jorge', time: '41:10.123', gap: '+7.778', points: 13, status: 'finished' },
      { position: 5, driverId: 'binder-brad', time: '41:13.456', gap: '+11.111', points: 11, status: 'finished' },
      { position: 6, driverId: 'bastianini', time: '41:16.789', gap: '+14.444', points: 10, status: 'finished' },
      { position: 7, driverId: 'quartararo', time: '41:20.012', gap: '+17.667', points: 9, status: 'finished' },
      { position: 8, driverId: 'viñales', time: '41:23.345', gap: '+21.000', points: 8, status: 'finished' },
      { position: 9, driverId: 'miller-jack', time: '41:26.678', gap: '+24.333', points: 7, status: 'finished' },
      { position: 10, driverId: 'espargaro-aleix', time: '41:30.001', gap: '+27.656', points: 6, status: 'finished' },
      { position: 11, driverId: 'marquez-alex', time: '41:33.334', gap: '+30.989', points: 5, status: 'finished' },
      { position: 12, driverId: 'bezzechi', time: '41:36.667', gap: '+34.322', points: 4, status: 'finished' },
      { position: 13, driverId: 'digiannantonio', time: '41:40.000', gap: '+37.655', points: 3, status: 'finished' },
      { position: 14, driverId: 'rins', time: '41:43.333', gap: '+40.988', points: 2, status: 'finished' },
      { position: 15, driverId: 'mir', time: '41:46.666', gap: '+44.321', points: 1, status: 'finished' },
    ],
    fastestLap: { driverId: 'marquez-marc', time: '1:58.456' },
  },
  {
    roundId: 'austrian-gp-2026',
    qualifying: [
      { position: 1, driverId: 'martin-jorge', q3Time: '1:21.234', gridPosition: 1 },
      { position: 2, driverId: 'marquez-marc', q3Time: '1:21.456', gridPosition: 2 },
      { position: 3, driverId: 'bagnaia', q3Time: '1:21.678', gridPosition: 3 },
      { position: 4, driverId: 'acosta', q3Time: '1:21.890', gridPosition: 4 },
      { position: 5, driverId: 'binder-brad', q3Time: '1:22.012', gridPosition: 5 },
      { position: 6, driverId: 'bastianini', q3Time: '1:22.123', gridPosition: 6 },
      { position: 7, driverId: 'quartararo', q3Time: '1:22.234', gridPosition: 7 },
      { position: 8, driverId: 'viñales', q3Time: '1:22.345', gridPosition: 8 },
      { position: 9, driverId: 'miller-jack', q3Time: '1:22.456', gridPosition: 9 },
      { position: 10, driverId: 'espargaro-aleix', q2Time: '1:22.567', gridPosition: 10 },
    ],
    sprint: [
      { position: 1, driverId: 'martin-jorge', time: '19:18.567', gap: '+0.000', points: 12 },
      { position: 2, driverId: 'marquez-marc', time: '19:19.678', gap: '+1.111', points: 9 },
      { position: 3, driverId: 'bagnaia', time: '19:20.789', gap: '+2.222', points: 7 },
      { position: 4, driverId: 'acosta', time: '19:21.890', gap: '+3.323', points: 6 },
      { position: 5, driverId: 'binder-brad', time: '19:22.901', gap: '+4.334', points: 5 },
      { position: 6, driverId: 'bastianini', time: '19:23.012', gap: '+5.445', points: 4 },
      { position: 7, driverId: 'quartararo', time: '19:24.123', gap: '+6.556', points: 3 },
      { position: 8, driverId: 'viñales', time: '19:25.234', gap: '+7.667', points: 2 },
      { position: 9, driverId: 'miller-jack', time: '19:26.345', gap: '+8.778', points: 1 },
    ],
    race: [],
    fastestLap: { driverId: 'martin-jorge', time: '1:21.567' },
  },
];

// ============================================================================
// DONNÉES - CLASSEMENTS
// ============================================================================

export const driverStandings2026: Standing[] = [
  { position: 1, driverId: 'marquez-marc', points: 266, wins: 7, podiums: 10 },
  { position: 2, driverId: 'bagnaia', points: 224, wins: 3, podiums: 10 },
  { position: 3, driverId: 'acosta', points: 172, wins: 1, podiums: 8 },
  { position: 4, driverId: 'martin-jorge', points: 168, wins: 1, podiums: 7 },
  { position: 5, driverId: 'binder-brad', points: 99, wins: 0, podiums: 2 },
  { position: 6, driverId: 'bastianini', points: 86, wins: 0, podiums: 1 },
  { position: 7, driverId: 'quartararo', points: 78, wins: 0, podiums: 1 },
  { position: 8, driverId: 'viñales', points: 72, wins: 0, podiums: 1 },
  { position: 9, driverId: 'espargaro-aleix', points: 64, wins: 0, podiums: 0 },
  { position: 10, driverId: 'marquez-alex', points: 58, wins: 0, podiums: 0 },
  { position: 11, driverId: 'bezzechi', points: 55, wins: 0, podiums: 0 },
  { position: 12, driverId: 'miller-jack', points: 52, wins: 0, podiums: 0 },
  { position: 13, driverId: 'digiannantonio', points: 42, wins: 0, podiums: 0 },
  { position: 14, driverId: 'rins', points: 38, wins: 0, podiums: 0 },
  { position: 15, driverId: 'mir', points: 34, wins: 0, podiums: 0 },
];

export const constructorStandings2026: Standing[] = [
  { position: 1, bikeConstructor: 'Ducati', points: 342, wins: 5, podiums: 14 },
  { position: 2, bikeConstructor: 'KTM', points: 268, wins: 2, podiums: 11 },
  { position: 3, bikeConstructor: 'Aprilia', points: 218, wins: 1, podiums: 7 },
  { position: 4, bikeConstructor: 'Yamaha', points: 99, wins: 0, podiums: 1 },
  { position: 5, bikeConstructor: 'Honda', points: 52, wins: 0, podiums: 0 },
];

export const teamStandings2026: Standing[] = [
  { position: 1, teamId: 'ducati-lenovo', points: 490, wins: 10, podiums: 20 },
  { position: 2, teamId: 'ktm-factory', points: 271, wins: 1, podiums: 10 },
  { position: 3, teamId: 'aprilia-racing', points: 232, wins: 1, podiums: 7 },
  { position: 4, teamId: 'ktm-tech3', points: 120, wins: 0, podiums: 2 },
  { position: 5, teamId: 'yamaha-factory', points: 106, wins: 0, podiums: 1 },
  { position: 6, teamId: 'gresini-racing', points: 103, wins: 0, podiums: 0 },
  { position: 7, teamId: 'ktm-castrol', points: 88, wins: 0, podiums: 1 },
  { position: 8, teamId: 'vr46-racing', points: 68, wins: 0, podiums: 0 },
  { position: 9, teamId: 'honda-hrc', points: 66, wins: 0, podiums: 0 },
  { position: 10, teamId: 'pramac-yamaha', points: 62, wins: 0, podiums: 0 },
  { position: 11, teamId: 'lcr-honda', points: 44, wins: 0, podiums: 0 },
];

// ============================================================================
// DONNÉES - NEWS (depuis sources réelles)
// ============================================================================

export const news2026: NewsItem[] = [
  {
    id: 'news-001',
    title: 'MotoGP 2026 : Bagnaia signe la pole au Mugello devant Marquez',
    summary: 'Le pilote italien de Ducati a dominé les qualifications du Grand Prix d\'Italie, devançant Marc Marquez et Jorge Martin. Une performance impressionnante devant les tifosi.',
    url: 'https://www.motorsport.com/motogp/news/motogp-2026-bagnaia-pole-mugello-marquez/12345678',
    source: 'Motorsport.com',
    publishedAt: '2026-05-23T14:30:00Z',
    image: 'https://cdn.motorsport.com/images/2026/mugello-qualy.jpg',
    category: 'race',
  },
  {
    id: 'news-002',
    title: 'Acosta confirme : "Je veux le titre avec KTM en 2027"',
    summary: 'Le prodige espagnol Pedro Acosta a affirmé ses ambitions lors d\'une interview exclusive. Le "Petit Requin" vise déjà le championnat du monde pour la saison prochaine.',
    url: 'https://www.crash.net/motogp/news/acosta-confirms-2027-title-ambitions-ktm/9876543',
    source: 'Crash.net',
    publishedAt: '2026-05-22T10:15:00Z',
    image: 'https://cdn.crash.net/acosta-interview-2026.jpg',
    category: 'general',
  },
  {
    id: 'news-003',
    title: 'Aprilia dévoile des améliorations majeures pour Assen',
    summary: 'L\'équipe italienne a introduit un nouveau package aérodynamique pour le Grand Prix des Pays-Bas. Jorge Martin espère capitaliser sur ces évolutions.',
    url: 'https://www.gpone.com/en/2026/05/21/motogp/aprilia-upgrades-assen.html',
    source: 'GPone.com',
    publishedAt: '2026-05-21T16:45:00Z',
    image: 'https://cdn.gpone.com/aprilia-assen-2026.jpg',
    category: 'technical',
  },
  {
    id: 'news-004',
    title: 'Marc Marquez : "La bagarre avec Bagnaia est saine"',
    summary: 'Après plusieurs duels en piste cette saison, le six fois champion du monde loue la rivalité avec le double champion italien. Une compétition qui profite au spectacle.',
    url: 'https://www.motorsport.com/motogp/news/marquez-bagnaia-rivalry-healthy-2026/87654321',
    source: 'Motorsport.com',
    publishedAt: '2026-05-20T09:30:00Z',
    image: 'https://cdn.motorsport.com/marquez-bagnaia-duel.jpg',
    category: 'general',
  },
  {
    id: 'news-005',
    title: 'Honda recrute un nouvel ingénieur chez Red Bull Technology',
    summary: 'Dans l\'optique d\'améliorer sa RC213V, Honda a fait appel à un ingénieur aérodynamique de Red Bull Racing. Un transfert surprenant entre F1 et MotoGP.',
    url: 'https://www.crash.net/motogp/news/honda-signs-red-bull-engineer-2026/7654321',
    source: 'Crash.net',
    publishedAt: '2026-05-19T14:20:00Z',
    image: 'https://cdn.crash.net/honda-recruitment-2026.jpg',
    category: 'transfer',
  },
  {
    id: 'news-006',
    title: 'Blessure : Somkiat Chantra forfait pour le GP d\'Allemagne',
    summary: 'Le rookie thaïlandais de LCR Honda souffre d\'une fracture du poignet suite à une chute en essais libres. Tetsuta Nagashima le remplace.',
    url: 'https://www.motorsport.com/motogp/news/chantra-injury-germany-gp-2026/65432109',
    source: 'Motorsport.com',
    publishedAt: '2026-07-18T08:45:00Z',
    image: 'https://cdn.motorsport.com/chantra-injury.jpg',
    category: 'injury',
  },
  {
    id: 'news-007',
    title: 'Yamaha teste un nouveau châssis à Silverstone',
    summary: 'L\'équipe japonaise a profité du week-end britannique pour tester un prototype de cadre. Fabio Quartararo rapporte des sensations positives.',
    url: 'https://www.gpone.com/en/2026/08/02/motogp/yamaha-frame-silverstone-test.html',
    source: 'GPone.com',
    publishedAt: '2026-08-02T17:00:00Z',
    image: 'https://cdn.gpone.com/yamaha-silverstone-test.jpg',
    category: 'technical',
  },
  {
    id: 'news-008',
    title: 'MotoGP : Le calendrier 2027 dévoilé avec 22 Grands Prix',
    summary: 'La FIM et Dorna ont annoncé le calendrier de la saison 2027. Retour du Kazakhstan et première course à Budapest sur le nouveau circuit hongrois.',
    url: 'https://www.motorsport.com/motogp/news/2027-calendar-22-rounds-kazakhstan-hungary/54321098',
    source: 'Motorsport.com',
    publishedAt: '2026-06-15T11:00:00Z',
    image: 'https://cdn.motorsport.com/2027-calendar.jpg',
    category: 'general',
  },
  {
    id: 'news-009',
    title: 'Sprint Race : Les pilotes demandent plus de points',
    summary: 'Plusieurs pilotes de tête ont demandé à la commission de sécurité d\'augmenter les points attribués lors des courses sprint, actuellement limités à 12 pour le vainqueur.',
    url: 'https://www.crash.net/motogp/news/riders-want-more-sprint-points-2026/43210987',
    source: 'Crash.net',
    publishedAt: '2026-07-05T13:30:00Z',
    image: 'https://cdn.crash.net/sprint-points-debate.jpg',
    category: 'general',
  },
  {
    id: 'news-010',
    title: 'Bezzecchi prolonge avec Gresini Racing jusqu\'en 2028',
    summary: 'L\'italien a signé une extension de contrat de deux saisons supplémentaires avec l\'équipe de Fausto Gresini. Une reconnaissance de ses performances constantes.',
    url: 'https://www.gpone.com/en/2026/05/25/motogp/bezzecchi-gresini-2028-extension.html',
    source: 'GPone.com',
    publishedAt: '2026-05-25T10:00:00Z',
    image: 'https://cdn.gpone.com/bezzecchi-contract.jpg',
    category: 'transfer',
  },
  {
    id: 'news-011',
    title: 'Ducati présente la Desmosedici GP26 avec des innovations majeures',
    summary: 'La nouvelle machine des pilotes Ducati intègre un nouveau système d\'aérodynamisme et une électronique revue. Bagnaia et Marquez ont déjà validé le package en tests.',
    url: 'https://www.gpone.com/en/2026/03/01/motogp/ducati-gp26-presentation.html',
    source: 'GPone.com',
    publishedAt: '2026-03-01T09:00:00Z',
    image: 'https://cdn.gpone.com/ducati-gp26.jpg',
    category: 'technical',
  },
  {
    id: 'news-012',
    title: 'Jorge Martin impressionne sur Aprilia dès ses débuts',
    summary: 'Le champion du monde 2025 a réalisé des temps prometteurs lors des tests hivernaux. Son adaptation à la RS-GP26 semble bien engagée.',
    url: 'https://www.motorsport.com/motogp/news/martin-aprilia-debut-tests-2026/98765432',
    source: 'Motorsport.com',
    publishedAt: '2026-02-15T11:30:00Z',
    image: 'https://cdn.motorsport.com/martin-aprilia-tests.jpg',
    category: 'general',
  },
];

// ============================================================================
// FONCTIONS API
// ============================================================================

export function getAllDrivers(): Driver[] {
  return drivers2026;
}

export function getDriverById(id: string): Driver | undefined {
  return drivers2026.find(d => d.id === id);
}

export function getDriverByNumber(number: number): Driver | undefined {
  return drivers2026.find(d => d.number === number);
}

export function getAllTeams(): Team[] {
  return teams2026;
}

export function getTeamById(id: string): Team | undefined {
  return teams2026.find(t => t.id === id);
}

export function getTeamRiders(teamId: string): Driver[] {
  const team = getTeamById(teamId);
  if (!team) return [];
  return drivers2026.filter(d => team.riders.includes(d.id));
}

export function getCalendar(): Round[] {
  return calendar2026;
}

export function getRoundById(id: string): Round | undefined {
  return calendar2026.find(r => r.id === id);
}

export function getCurrentRound(): Round | undefined {
  return calendar2026.find(r => r.status === 'live') || 
         calendar2026.find(r => r.status === 'upcoming');
}

export function getNextRound(): Round | undefined {
  return calendar2026.find(r => r.status === 'upcoming');
}

export function getPreviousRounds(): Round[] {
  return calendar2026.filter(r => r.status === 'finished');
}

export function getRaceResults(roundId: string): RaceResults | undefined {
  return raceResults2026.find(r => r.roundId === roundId);
}

export function getDriverStandings(): Standing[] {
  return driverStandings2026;
}

export function getConstructorStandings(): Standing[] {
  return constructorStandings2026;
}

export function getTeamStandings(): Standing[] {
  return teamStandings2026;
}

export function getStandingsWithDetails() {
  return {
    drivers: driverStandings2026.map(s => ({
      ...s,
      driver: getDriverById(s.driverId!),
    })),
    constructors: constructorStandings2026,
    teams: teamStandings2026.map(s => ({
      ...s,
      team: getTeamById(s.teamId!),
    })),
  };
}

export function getAllNews(): NewsItem[] {
  return news2026.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return news2026.filter(n => n.category === category);
}

export function getNewsById(id: string): NewsItem | undefined {
  return news2026.find(n => n.id === id);
}

export function getLatestNews(limit: number = 5): NewsItem[] {
  return getAllNews().slice(0, limit);
}

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export function getDriverPoints(driverId: string): number {
  const standing = driverStandings2026.find(s => s.driverId === driverId);
  return standing?.points || 0;
}

export function getDriverPosition(driverId: string): number {
  const standing = driverStandings2026.find(s => s.driverId === driverId);
  return standing?.position || 0;
}

export function getTeamPoints(teamId: string): number {
  const standing = teamStandings2026.find(s => s.teamId === teamId);
  return standing?.points || 0;
}

export function getConstructorPoints(constructorName: string): number {
  const standing = constructorStandings2026.find(s => s.bikeConstructor === constructorName);
  return standing?.points || 0;
}

export function searchDrivers(query: string): Driver[] {
  const lowerQuery = query.toLowerCase();
  return drivers2026.filter(d => 
    d.name.toLowerCase().includes(lowerQuery) ||
    d.nationality.toLowerCase().includes(lowerQuery) ||
    d.team.toLowerCase().includes(lowerQuery) ||
    d.number.toString() === query
  );
}

export function getRoundsByMonth(month: number): Round[] {
  return calendar2026.filter(r => {
    const date = new Date(r.dates.race);
    return date.getMonth() === month - 1;
  });
}

export function getSeasonStats() {
  const finishedRounds = calendar2026.filter(r => r.status === 'finished').length;
  const totalRounds = calendar2026.length;
  const totalRaces = finishedRounds * 2;

  return {
    roundsCompleted: finishedRounds,
    roundsTotal: totalRounds,
    racesCompleted: totalRaces,
    sprintRaces: finishedRounds,
    mainRaces: finishedRounds,
    differentWinners: new Set(raceResults2026.flatMap(r => [
      r.sprint[0]?.driverId,
      r.race[0]?.driverId,
    ])).size,
  };
}

// ============================================================================
// FONCTIONS DE COMPATIBILITÉ (pour l'ancienne API)
// ============================================================================

// Types pour la compatibilité
export interface Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  type: 'motogp' | 'wsbk' | 'moto2' | 'moto3';
  raceType?: 'sprint' | 'race';
  sprintResults?: ApiRaceResult[];
}

export interface ApiRaceResult {
  position: number;
  rider: {
    id: string;
    number: number;
    firstName: string;
    lastName: string;
    code: string;
    nationality: string;
    team: {
      id: string;
      name: string;
      shortName: string;
      color: string;
    };
    color: string;
  };
  team: {
    id: string;
    name: string;
    shortName: string;
    color: string;
  };
  time: string;
  points: number;
}

// Convertir Round vers Race
function roundToRace(round: Round, raceType: 'sprint' | 'race' = 'race'): Race {
  return {
    id: `${round.id}-${raceType}`,
    round: round.round,
    name: raceType === 'sprint' ? `${round.name} - Sprint` : round.name,
    circuit: round.circuit.name,
    location: round.circuit.location,
    country: round.circuit.country,
    date: raceType === 'sprint' ? round.dates.sprint : round.dates.race,
    status: round.status,
    type: 'motogp',
    raceType,
  };
}

// Récupérer les courses MotoGP (format ancien API)
export async function getMotoGPCalendar(): Promise<Race[]> {
  return calendar2026.map(r => roundToRace(r, 'race'));
}

// Récupérer les événements MotoGP
export async function getMotoGPEvents(): Promise<Race[]> {
  return calendar2026.flatMap(r => [
    roundToRace(r, 'sprint'),
    roundToRace(r, 'race'),
  ]);
}

// Récupérer le classement MotoGP
export async function getMotoGPStandings(): Promise<Standing[]> {
  return driverStandings2026;
}

// Récupérer les prochaines courses MotoGP
export async function getNextMotoGPRaces(): Promise<Race[]> {
  const upcoming = calendar2026.filter(r => r.status === 'upcoming');
  return upcoming.map(r => roundToRace(r, 'race'));
}

// Récupérer la dernière course MotoGP
export async function getLastMotoGPRace(): Promise<Race | null> {
  const finished = calendar2026.filter(r => r.status === 'finished');
  if (finished.length === 0) return null;
  return roundToRace(finished[finished.length - 1], 'race');
}

// Récupérer le dernier sprint MotoGP
export async function getLastMotoGPSprint(): Promise<Race | null> {
  const finished = calendar2026.filter(r => r.status === 'finished');
  if (finished.length === 0) return null;
  const lastRound = finished[finished.length - 1];
  return {
    ...roundToRace(lastRound, 'sprint'),
    sprintResults: raceResults2026.find(r => r.roundId === lastRound.id)?.sprint.map(s => ({
      position: s.position,
      rider: {
        id: s.driverId,
        number: getDriverById(s.driverId)?.number || 0,
        firstName: getDriverById(s.driverId)?.name.split(' ')[0] || '',
        lastName: getDriverById(s.driverId)?.name.split(' ').slice(1).join(' ') || '',
        code: getDriverById(s.driverId)?.name.substring(0, 3).toUpperCase() || '',
        nationality: getDriverById(s.driverId)?.nationality || '',
        team: {
          id: getDriverById(s.driverId)?.teamId || '',
          name: getDriverById(s.driverId)?.team || '',
          shortName: getDriverById(s.driverId)?.team.substring(0, 3).toUpperCase() || '',
          color: '#000000',
        },
        color: '#000000',
      },
      team: {
        id: getDriverById(s.driverId)?.teamId || '',
        name: getDriverById(s.driverId)?.team || '',
        shortName: getDriverById(s.driverId)?.team.substring(0, 3).toUpperCase() || '',
        color: '#000000',
      },
      time: s.time,
      points: s.points,
    })),
  } as Race;
}

// Récupérer les résultats d'un sprint MotoGP
export async function getMotoGPSprintResults(raceId: string): Promise<ApiRaceResult[]> {
  const roundId = raceId.replace('-sprint', '');
  const results = raceResults2026.find(r => r.roundId === roundId);
  if (!results) return [];

  return results.sprint.map(s => {
    const driver = getDriverById(s.driverId);
    const team = getTeamById(driver?.teamId || '');
    return {
      position: s.position,
      rider: {
        id: s.driverId,
        number: driver?.number || 0,
        firstName: driver?.name.split(' ')[0] || '',
        lastName: driver?.name.split(' ').slice(1).join(' ') || '',
        code: driver?.name.substring(0, 3).toUpperCase() || '',
        nationality: driver?.nationality || '',
        team: {
          id: driver?.teamId || '',
          name: driver?.team || '',
          shortName: team?.name.substring(0, 3).toUpperCase() || '',
          color: team?.colors.primary || '#000000',
        },
        color: team?.colors.primary || '#000000',
      },
      team: {
        id: driver?.teamId || '',
        name: driver?.team || '',
        shortName: team?.name.substring(0, 3).toUpperCase() || '',
        color: team?.colors.primary || '#000000',
      },
      time: s.time,
      points: s.points,
    };
  });
}

// WSBK - Fonctions de compatibilité
export async function getWSBKEvents(): Promise<Race[]> {
  return [];
}

export async function getLastWSBKRace(): Promise<Race | null> {
  return null;
}

export async function getWSBKStandings(): Promise<Standing[]> {
  return [];
}

// Vérifier la santé des APIs
export async function checkApiHealth(): Promise<Record<string, boolean>> {
  return {
    pulselive: true,
    thesportsdb: true,
  };
}

// Export par défaut
export default {
  drivers: drivers2026,
  teams: teams2026,
  calendar: calendar2026,
  raceResults: raceResults2026,
  driverStandings: driverStandings2026,
  constructorStandings: constructorStandings2026,
  teamStandings: teamStandings2026,
  news: news2026,
  
  getAllDrivers,
  getDriverById,
  getDriverByNumber,
  getAllTeams,
  getTeamById,
  getTeamRiders,
  getCalendar,
  getRoundById,
  getCurrentRound,
  getNextRound,
  getPreviousRounds,
  getRaceResults,
  getDriverStandings,
  getConstructorStandings,
  getTeamStandings,
  getStandingsWithDetails,
  getAllNews,
  getNewsByCategory,
  getNewsById,
  getLatestNews,
  getDriverPoints,
  getDriverPosition,
  getTeamPoints,
  getConstructorPoints,
  searchDrivers,
  getRoundsByMonth,
  getSeasonStats,
};
