// Fichier pour générer les paramètres statiques
import { getCalendar } from '@/data/api';

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
