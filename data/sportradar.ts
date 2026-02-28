// API Sportradar MotoGP
// Documentation: https://developer.sportradar.com/racing/reference/motogp-overview

const SPORTRADAR_API_KEY = process.env.SPORTRADAR_API_KEY || 'demo-key';
const SPORTRADAR_BASE_URL = 'https://api.sportradar.us/motogp/trial/v2/en';

// Endpoints disponibles:
// - /seasons.json : Liste des saisons
// - /seasons/{id}/stages.json : Calendrier de la saison
// - /stages/{id}.json : Détails d'une course
// - /competitors.json : Liste des pilotes
// - /competitor_profiles/{id}.json : Profil d'un pilote
// - /team_profiles/{id}.json : Profil d'une équipe

export async function getMotoGPSeasons() {
  try {
    const response = await fetch(`${SPORTRADAR_BASE_URL}/seasons.json?api_key=${SPORTRADAR_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch seasons');
    return await response.json();
  } catch (error) {
    console.error('[Sportradar] Error fetching seasons:', error);
    return null;
  }
}

export async function getMotoGPStages(seasonId: string) {
  try {
    const response = await fetch(`${SPORTRADAR_BASE_URL}/seasons/${seasonId}/stages.json?api_key=${SPORTRADAR_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch stages');
    return await response.json();
  } catch (error) {
    console.error('[Sportradar] Error fetching stages:', error);
    return null;
  }
}

export async function getMotoGPStage(stageId: string) {
  try {
    const response = await fetch(`${SPORTRADAR_BASE_URL}/stages/${stageId}.json?api_key=${SPORTRADAR_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch stage');
    return await response.json();
  } catch (error) {
    console.error('[Sportradar] Error fetching stage:', error);
    return null;
  }
}

// Pour l'instant, on utilise les mocks car il faut une clé API
// Quand tu auras une clé, remplace les appels dans api.ts par ceux-ci
