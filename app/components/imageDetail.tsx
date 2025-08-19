import Image from 'next/image';
import styles from './imageDetail.module.css';
import { Character } from '@/app/types/index';
import { notFound } from 'next/navigation';

export default async function ImageDetail({ character }: { character: Character }) {
  if (!character) {
    return notFound();
  }
  return (
    <div className="space-y-3">
      <Image
        src={character.image}
        alt={character.name}
        className={styles.imageDetail}
        width="400"
        height="600"
        priority
      />
    </div>
  );
}
