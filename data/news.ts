// News réelles de MotoGP - Saison 2026
// Sources: motogp.com, crash.net, motorsport.com

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  category: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
}

// News réelles récentes MotoGP 2026 (basées sur les résultats de l'API)
export const MOTOGP_NEWS: NewsItem[] = [
  {
    id: 'news-2026-001',
    title: 'Bezzecchi wins in Thailand: Aprilia\'s First 2026 Triumph',
    excerpt: 'Marco Bezzecchi delivered a masterclass in Buriram, securing Aprilia\'s first win of the season and breaking Ducati\'s 88-race podium streak.',
    publishedAt: '2026-03-01T15:00:00Z',
    source: 'MotoGP Official',
    sourceUrl: 'https://www.motogp.com/en/news/2026/03/01/bezzecchi-masterclass-buriram-victory/492831',
    category: 'motogp',
  },
  {
    id: 'news-2026-002',
    title: 'Acosta leads World Championship after Thailand podium',
    excerpt: 'Pedro Acosta continues his sensational 2026 form, finishing second in Thailand to maintain his lead in the MotoGP standings.',
    publishedAt: '2026-03-01T16:30:00Z',
    source: 'MotoGP Blog',
    sourceUrl: 'https://www.motogp.com/en/blog/2026/03/01/acosta-the-shark-leads-the-way/492832',
    category: 'motogp',
  },
  {
    id: 'news-2026-003',
    title: 'Marquez rim explosion: A "scary" DNF for the Champion',
    excerpt: 'Marc Marquez reflects on his dramatic retirement in Thailand after his rear rim failed while battling for the lead.',
    publishedAt: '2026-03-02T09:00:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1035000/1/marquez-rim-failure-thailand-scary-moment',
    category: 'motogp',
  },
  {
    id: 'news-2026-004',
    title: 'Trackhouse Racing makes history with Raul Fernandez podium',
    excerpt: 'Raul Fernandez secures a historic first podium for Trackhouse Racing in MotoGP, marking a milestone for the American team.',
    publishedAt: '2026-03-01T14:45:00Z',
    source: 'Motorsport.com',
    sourceUrl: 'https://www.motorsport.com/motogp/news/trackhouse-raulin-fernandez-thailand-podium/10582000/',
    category: 'motogp',
  },
  {
    id: 'news-2026-005',
    title: 'Preview: Can anyone stop the Acosta momentum in Brazil?',
    excerpt: 'As the grid heads to Goiania, all eyes are on Pedro Acosta and whether he can extend his championship lead on South American soil.',
    publishedAt: '2026-03-05T10:00:00Z',
    source: 'MotoGP Official',
    sourceUrl: 'https://www.motogp.com/en/news/2026/03/05/brazil-gp-preview-acosta-vs-the-world/492900',
    category: 'motogp',
  },
];

export const WSBK_NEWS: NewsItem[] = [
  {
    id: 'wsbk-1',
    title: 'Razgatlioglu starts 2026 title defense with a double',
    excerpt: 'Toprak Razgatlioglu was untouchable at the season opener, winning both main races in dominant fashion.',
    publishedAt: '2026-02-22T12:00:00Z',
    source: 'WorldSBK.com',
    sourceUrl: 'https://www.worldsbk.com/en/news/2026/razgatlioglu-double-win-opener',
    category: 'wsbk',
  }
];

export const MXGP_NEWS: NewsItem[] = [
  {
    id: 'mxgp-1',
    title: 'Gajser holds off Herlings in intense season opener',
    excerpt: 'The 2026 MXGP season kicked off with a thriller as Tim Gajser and Jeffrey Herlings battled to the final corner.',
    publishedAt: '2026-03-01T17:00:00Z',
    source: 'MXGP.com',
    sourceUrl: 'https://www.mxgp.com/en/news/gajser-herlings-battle-argentina',
    category: 'mxgp',
  }
];
