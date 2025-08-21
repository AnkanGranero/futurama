import ImageDetail from '@/app/components/imageDetail';
import { getCharacter } from '@/app/lib/graphQL';
import { notFound } from 'next/navigation';

export default async function fullScreen({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const res = await getCharacter(id);
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`fetch failed ${res.status}`);
  }
  const json = await res.json();
  const { character } = json?.data;
  if (!character) notFound();
  return (
    <div>
      <ImageDetail character={character}></ImageDetail>
    </div>
  );
}
