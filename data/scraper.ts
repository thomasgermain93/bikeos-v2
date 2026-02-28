/**
 * Auto-scraper system for BikeOS
 * Updates race results and standings 1 hour after races end
 * 
 * This can be run via:
 * 1. Vercel Cron Jobs (recommended)
 * 2. GitHub Actions scheduled workflow
 * 3. External cron service calling API endpoints
 */

import { Race, Standing, RaceResult } from '@/types';

// Configuration
const SCRAPER_CONFIG = {
  // Scrape 1 hour after typical race end times
  motogpRaceEndHour: 16, // 16:00 UTC typical
  wsbkRaceEndHour: 15,
  mxgpRaceEndHour: 17,
  
  // API endpoints to update
  endpoints: {
    motogp: 'https://api.motogp.pulselive.com/motogp/v1',
    wsbk: 'https://www.worldsbk.com/api',
    mxgp: 'https://www.mxgp.com/api',
  },
};

// Scraping functions
export async function scrapeMotoGPResults(raceId: string): Promise<RaceResult[] | null> {
  try {
    // Attempt to fetch from PulseLive API
    const response = await fetch(
      `${SCRAPER_CONFIG.endpoints.motogp}/results/session/${raceId}/classification`,
      { next: { revalidate: 0 } }
    );
    
    if (!response.ok) {
      console.log(`[Scraper] No new MotoGP data for race ${raceId}`);
      return null;
    }
    
    const data = await response.json();
    
    // Transform to our format
    const results: RaceResult[] = data.map((item: any, index: number) => ({
      position: item.position || index + 1,
      rider: {
        id: item.rider?.id || `rider-${index}`,
        number: item.rider?.number || 0,
        firstName: item.rider?.first_name || 'Unknown',
        lastName: item.rider?.last_name || 'Rider',
        code: item.rider?.short_name || 'UNK',
        nationality: item.rider?.country?.name || 'Unknown',
        team: {
          id: item.team?.id || 'team-unknown',
          name: item.team?.name || 'Unknown Team',
          shortName: item.team?.short_name || 'Unknown',
          color: '#666666',
        },
        color: '#666666',
      },
      team: {
        id: item.team?.id || 'team-unknown',
        name: item.team?.name || 'Unknown Team',
        shortName: item.team?.short_name || 'Unknown',
        color: '#666666',
      },
      time: item.time || '',
      gap: item.gap || '',
      points: item.points || 0,
    }));
    
    console.log(`[Scraper] Successfully scraped MotoGP results for race ${raceId}`);
    return results;
  } catch (error) {
    console.error(`[Scraper] Error scraping MotoGP:`, error);
    return null;
  }
}

export async function scrapeMotoGPStandings(): Promise<Standing[] | null> {
  try {
    const response = await fetch(
      `${SCRAPER_CONFIG.endpoints.motogp}/results/standings?seasonUuid=e8c110ad-64aa-4e8e-8a86-f2f152f6a942&categoryUuid=e8c110ad-64aa-4e8e-8a86-f2f152f6a942`,
      { next: { revalidate: 0 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return data.map((item: any, index: number) => ({
      position: index + 1,
      rider: {
        id: item.rider?.id || `rider-${index}`,
        number: item.rider?.number || 0,
        firstName: item.rider?.first_name || 'Unknown',
        lastName: item.rider?.last_name || 'Rider',
        code: item.rider?.short_name || 'UNK',
        nationality: item.rider?.country?.name || 'Unknown',
        team: {
          id: item.team?.id || 'team-unknown',
          name: item.team?.name || 'Unknown Team',
          shortName: item.team?.short_name || 'Unknown',
          color: '#666666',
        },
        color: '#666666',
      },
      points: item.points || 0,
      wins: item.wins || 0,
    }));
  } catch (error) {
    console.error('[Scraper] Error scraping MotoGP standings:', error);
    return null;
  }
}

// Web scraping fallback for sites without APIs
export async function scrapeWorldSBK(): Promise<{ standings: Standing[] | null, results: any[] | null }> {
  try {
    // In production, this would use puppeteer or similar
    // For now, return null to use mock data
    console.log('[Scraper] WSBK scraping would run here with puppeteer');
    return { standings: null, results: null };
  } catch (error) {
    console.error('[Scraper] Error scraping WSBK:', error);
    return { standings: null, results: null };
  }
}

export async function scrapeMXGP(): Promise<{ standings: Standing[] | null, results: any[] | null }> {
  try {
    console.log('[Scraper] MXGP scraping would run here');
    return { standings: null, results: null };
  } catch (error) {
    console.error('[Scraper] Error scraping MXGP:', error);
    return { standings: null, results: null };
  }
}

// Main scraping orchestrator
export async function runAutoScraper(): Promise<void> {
  console.log('[Scraper] Starting auto-scrape at', new Date().toISOString());
  
  // Check if we should scrape (1 hour after race end)
  const now = new Date();
  const currentHour = now.getUTCHours();
  
  // Scrape MotoGP standings (always try)
  const motogpStandings = await scrapeMotoGPStandings();
  if (motogpStandings) {
    // In production, save to database or cache
    console.log('[Scraper] Updated MotoGP standings');
  }
  
  // Scrape WSBK
  const { standings: wsbkStandings } = await scrapeWorldSBK();
  if (wsbkStandings) {
    console.log('[Scraper] Updated WSBK standings');
  }
  
  // Scrape MXGP
  const { standings: mxgpStandings } = await scrapeMXGP();
  if (mxgpStandings) {
    console.log('[Scraper] Updated MXGP standings');
  }
  
  console.log('[Scraper] Auto-scrape complete');
}

// Check if it's time to scrape (1 hour after race)
export function shouldScrapeNow(raceDate: string, raceEndHour: number): boolean {
  const race = new Date(raceDate);
  const now = new Date();
  
  // Set race end time (race day + end hour + 1 hour buffer)
  const scrapeTime = new Date(race);
  scrapeTime.setUTCHours(raceEndHour + 1);
  
  // Should scrape if we're within 2 hours after the scrape time
  const timeDiff = now.getTime() - scrapeTime.getTime();
  const twoHours = 2 * 60 * 60 * 1000;
  
  return timeDiff > 0 && timeDiff < twoHours;
}

// API route handler for manual/automated triggers
export async function handleScrapeRequest(req: Request): Promise<Response> {
  try {
    await runAutoScraper();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
