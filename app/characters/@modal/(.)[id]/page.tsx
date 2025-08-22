import Modal from '@/app/components/modal';
import ImageDetail from '@/app/components/imageDetail';
import { notFound } from 'next/navigation';
import { getCharacterOrThrow } from '@/app/lib/graphQL';

export default async function GalleryImageModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const character = await getCharacterOrThrow(Number(id));

  if (!character) {
    return notFound();
  }
  return (
    <Modal>
      <ImageDetail character={character}></ImageDetail>
    </Modal>
  );
}
