import Modal from '@/app/components/modal';
import ImageDetail from '@/app/components/imageDetail';
import { notFound } from 'next/navigation';

export default async function GalleryImageModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const endPoint = 'https://futuramaapi.com/graphql';
  const query = `
    query ($id: Int!){
      character(characterId: $id) {
        name
        id
        image
      }
    }
  `;
  const res = await fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: Number(id) } }),
  });

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
