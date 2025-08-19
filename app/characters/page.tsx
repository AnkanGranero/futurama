import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { Character } from '../types';

export default async function Characters() {
  const endPoint = 'https://futuramaapi.com/graphql';
  const query = `
    query {
      characters(limit: 20, offset: 0) {
        total
        offset

        edges {
          id
          name
          species
          image
        }
      }
    }
  `;

  const res = await fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  const characters = result?.data?.characters?.edges;

  if (!characters) return <p>no characters found</p>;

  return (
    <div>
      <h1>Characters</h1>
      <ul className={styles.characterUl}>
        {characters.map((char:Character) => (
          <li key={char.id} className={styles.char}>
          <Link href={`/characters/${char.id}`}>
         
            <Image
              src={char.image}
              alt={char.name}
              width="400"
              height="600"
              className={styles.charImg}
            ></Image>
             </Link>
            <p className={styles.charName}>{char.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
