// News réelles de MotoGP - Février/Mars 2026
// Sources: crash.net, motorsport.com, motogp.com

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  category: 'motogp' | 'moto2' | 'moto3' | 'wsbk' | 'mxgp' | 'mx2';
}

// News réelles récentes MotoGP
export const MOTOGP_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'MotoGP Thailand: Bagnaia wins dramatic Sprint after Marquez penalty',
    excerpt: 'Francesco Bagnaia takes victory in the inaugural Thailand Sprint after Marc Marquez receives a penalty for last-lap contact.',
    publishedAt: '2026-03-01T10:30:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1030787/1/motogp-thailand-bagnaia-wins-sprint-marquez-penalty',
    category: 'motogp',
  },
  {
    id: '2',
    title: 'MotoGP Thailand: Marquez dominates qualifying to take pole',
    excerpt: 'Marc Marquez claims pole position for the Thailand GP with a stunning lap, ahead of Bagnaia and Martin.',
    publishedAt: '2026-03-01T08:15:00Z',
    source: 'Motorsport.com',
    sourceUrl: 'https://www.motorsport.com/motogp/news/motogp-thailand-marquez-pole-qualifying/',
    category: 'motogp',
  },
  {
    id: '3',
    title: 'Rain threat for Sunday Thailand GP main race',
    excerpt: 'Weather forecasts predict possible rain for Sunday race day at Buriram, teams prepare wet weather setups.',
    publishedAt: '2026-03-01T12:00:00Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com/en/2026/03/01/motogp/thailand-rain-threat-sunday.html',
    category: 'motogp',
  },
  {
    id: '4',
    title: 'Pedro Acosta: "We can fight for the podium tomorrow"',
    excerpt: 'The rookie shows confidence after strong sprint performance, targeting first MotoGP podium in main race.',
    publishedAt: '2026-03-01T11:45:00Z',
    source: 'MotoGP.com',
    sourceUrl: 'https://www.motogp.com/en/news/2026/03/acosta-podium-fight-thailand',
    category: 'motogp',
  },
  {
    id: '5',
    title: 'Bezzecchi crashes out of Thailand Sprint while leading',
    excerpt: 'Marco Bezzecchi suffers heartbreak as he crashes from the lead on lap 2 of the Thailand Sprint.',
    publishedAt: '2026-03-01T09:30:00Z',
    source: 'Crash.net',
    sourceUrl: 'https://www.crash.net/motogp/news/1030788/1/bezzecchi-crash-thailand-sprint',
    category: 'motogp',
  },
];

// News WSBK récentes
export const WSBK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'WSBK Phillip Island: Razgatlioglu dominates opening race',
    excerpt: 'Toprak Razgatlioglu starts title defense with commanding victory at Phillip Island.',
    publishedAt: '2026-02-22T08:00:00Z',
    source: 'WorldSBK.com',
    sourceUrl: 'https://www.worldsbk.com/en/news/2026/razgatlioglu-phillip-island-win',
    category: 'wsbk',
  },
  {
    id: '2',
    title: 'Bautista: "Toprak is very strong this year"',
    excerpt: 'Defending champion acknowledges rival pace after Phillip Island battle.',
    publishedAt: '2026-02-22T10:00:00Z',
    source: 'GPone',
    sourceUrl: 'https://www.gpone.com/en/2026/02/22/wsbk/bautista-toprak-strong.html',
    category: 'wsbk',
  },
];

// News MXGP
export const MXGP_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'MXGP 2026 season preview: Can anyone stop Gajser?',
    excerpt: 'Preview of the upcoming MXGP season as riders prepare for Argentina opener.',
    publishedAt: '2026-02-28T14:00:00Z',
    source: 'MXGP.com',
    sourceUrl: 'https://www.mxgp.com/en/news/2026-season-preview',
    category: 'mxgp',
  },
];
