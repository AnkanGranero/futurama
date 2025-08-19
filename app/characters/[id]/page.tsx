import Image from 'next/image';
import ImageDetail from '@/app/components/imageDetail';

export default async function fullScreen({ params }: { params: Promise<{ id: number }> }) {

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
  const { character } = await result?.data

  return (
    <div>
      <ImageDetail character={character}></ImageDetail>
    </div>
  );
}
