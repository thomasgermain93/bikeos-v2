import { getMotoGPCalendar } from '@/data/api-compat';
import RacePageClient from './RacePageClient';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const calendar = await getMotoGPCalendar();
  const params = [];
  
  for (const round of calendar) {
    params.push({ id: round.id });
  }
  
  return params;
}

export default function RacePage({ params }: PageProps) {
  return <RacePageClient params={params} />;
}
