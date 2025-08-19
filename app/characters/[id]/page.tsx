import Image from 'next/image';

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
  const { image, name } = await result?.data?.character;

  return (
    <div>
      <Image src={image} alt={name} height="600" width="400"></Image>
    </div>
  );
}
