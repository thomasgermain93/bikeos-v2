
import type { NewsItem } from '@/types';

/**
 * Service autonome de récupération des news MotoGP
 * Utilise le flux RSS de Crash.net pour des mises à jour en temps réel
 */

export async function fetchMotoGPNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch('https://www.crash.net/rss/motogp', {
      next: { revalidate: 3600 } // Revalidate news every hour
    });

    if (!response.ok) return [];

    const xml = await response.text();

    // Parser XML simple (sans librairie externe comme rss-parser)
    // Extraction des <item> du flux RSS
    const items = xml.split('<item>').slice(1);

    return items.map((item, index) => {
      const title = extractTagContent(item, 'title');
      const description = extractTagContent(item, 'description');
      const link = extractTagContent(item, 'link');
      const pubDate = extractTagContent(item, 'pubDate');

      // Extraction de l'image de l'enclosure
      const imageMatch = item.match(/<enclosure[^>]+url="([^"]+)"/);
      const image = imageMatch ? imageMatch[1] : undefined;

      return {
        id: `news-${index}`,
        title: title || 'MotoGP News Update',
        excerpt: description?.replace(/<!\[CDATA\[|\]\]>/g, '').trim() || 'Check out the latest update from the MotoGP paddock.',
        publishedAt: pubDate || new Date().toISOString(),
        source: 'Crash.net',
        sourceUrl: link || 'https://www.crash.net/motogp',
        category: 'motogp' as const,
        image
      };
    });
  } catch (error) {
    console.error('[NewsService] Error fetching news:', error);
    return [];
  }
}

function extractTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 's'));
  if (!match) return '';

  let content = match[1];
  // Nettoyer CDATA
  content = content.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
  return content;
}
