import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { Character } from '../types';
import { getCharacters } from '../lib/graphQL';

export default async function Characters({
  searchParams,
}: {
  searchParams: Promise<{ species: string; page: string }>;
}) {
  const fallback = '/fallback.jpg';
  const { species = 'human', page = 1 } = await searchParams;
  const limit = 20;
  const offset = (Number(page) - 1) * limit;
  const res = await getCharacters(species, offset);

  const result = await res.json();

  const characters = result?.data?.characters?.edges;

  if (!res.ok) {
    throw new Error(`fetch failed ${res.status}`);
  }

  return (
    <div>
      <h1>Characters</h1>
      <nav className={styles.nav}>
        <Link
          href={`/characters?page=${Number(page) - 1}${
            species ? `&species=${species}` : ''
          }`}
        >
          <button>previous</button>
        </Link>
        <p>{page}</p>
        <Link href={`/characters?page=${Number(page) + 1}&species=${species}`}>
          <button>next</button>
        </Link>
      </nav>
      <ul className={styles.characterUl}>
        {characters ? (
          characters.map((char: Character) => (
            <li key={char.id} className={styles.char}>
              <Link href={`/characters/${char.id}`}>
                <Image
                  src={char.image || fallback}
                  alt={char.name}
                  width="400"
                  height="600"
                  className={styles.charImg}
                ></Image>
              </Link>
              <p className={styles.charName}>{char.name}</p>
            </li>
          ))
        ) : (
          <p>no Characters found</p>
        )}
      </ul>
    </div>
  );
}
