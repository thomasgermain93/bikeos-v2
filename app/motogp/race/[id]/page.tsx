import { getCalendar } from '@/data/api';
import RacePageClient from './RacePageClient';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const calendar = await getCalendar();
  const params = [];
  
  for (const round of calendar) {
    params.push({ id: round.id + '-race' });
    if (round.dates.sprint) {
      params.push({ id: round.id + '-sprint' });
    }
  }
  
  return params;
}

export default function RacePage({ params }: PageProps) {
  return <RacePageClient params={params} />;
}
