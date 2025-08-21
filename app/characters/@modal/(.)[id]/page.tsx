import Modal from '@/app/components/modal';
import ImageDetail from '@/app/components/imageDetail';
import { notFound } from 'next/navigation';
import { getCharacter } from '@/app/lib/graphQL';

export default async function GalleryImageModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await getCharacter(Number(id));

  if (!res.ok) notFound();

  const result = await res.json();
  const { character } = await result?.data;
  if (!character) {
    return notFound();
  }
  return (
    <Modal>
      <ImageDetail character={character}></ImageDetail>
    </Modal>
  );
}
