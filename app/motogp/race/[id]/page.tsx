import { getMotoGPCalendar, getMotoGPRoundById, getMotoGPRaceResults } from '@/data/api-compat';
import RacePageClient from './RacePageClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  try {
    const calendar = await getMotoGPCalendar();
    return calendar.map((round) => ({
      id: round.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function RacePage({ params }: PageProps) {
  const round = await getMotoGPRoundById(params.id);

  if (!round) {
    notFound();
  }

  const raceData = await getMotoGPRaceResults(params.id);

  return <RacePageClient params={params} initialRound={round} initialRaceData={raceData} />;
}
