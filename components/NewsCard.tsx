
import { formatDistanceToNow } from 'date-fns';
import { NewsItem } from '@/types';

interface NewsCardProps {
  news: NewsItem[];
  type: 'motogp' | 'wsbk' | 'mxgp' | 'mx2';
}

const SERIES_COLORS: Record<string, string> = {
  motogp: '#ef4444',
  wsbk: '#3b82f6',
  mxgp: '#8B4513',
  mx2: '#228B22',
};

const SERIES_LABELS: Record<string, string> = {
  motogp: 'MotoGP',
  wsbk: 'WSBK',
  mxgp: 'MXGP',
  mx2: 'MX2',
};

export function NewsCard({ news, type }: NewsCardProps) {
  const accentColor = SERIES_COLORS[type] || '#ef4444';

  return (
    <div className="border border-[var(--border-card)] rounded-xl bg-zinc-900 overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b border-[var(--border-row)]">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
          <span className="text-xs font-mono font-medium uppercase tracking-widest" style={{ color: accentColor }}>
            {SERIES_LABELS[type] || type.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {news.slice(0, 4).map((item) => (
          <a
            key={item.id}
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-zinc-600 flex-shrink-0">
                {item.source.substring(0, 2)}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-zinc-300 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                </p>
              </div>
              <svg
                className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4.5 2.5L7.5 6l-3 3.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
