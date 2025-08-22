'use client';
import Image from 'next/image';
import { Character } from '../types';
import styles from './imageDetail.module.css';
import { useState } from 'react';

export default function ImageWithFallback({
  character,
  fallbackImage,
}: {
  character: Character;
  fallbackImage: string;
}) {
 
    const [image, setImage ] = useState(character.image);

  return (
    <Image
      src={character.image}
      alt={character.name}
      width="400"
      height="600"
      className={styles.imageDetail}
      onError={() => setImage(fallbackImage)}
    ></Image>
  );
}
