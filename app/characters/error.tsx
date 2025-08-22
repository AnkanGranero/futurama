'use client';

import styles from './error.module.css';
import { useRouter } from 'next/navigation';
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className={styles.errorPage}>
      <h1> Ooops, something went wrong! </h1>
      <p>{error.message}</p>
      <nav className={styles.nav}>
        <button className={styles.reset} onClick={() => reset()}>
          try again
        </button>
        <button className={styles.back} onClick={() => router.back()}>
          BACK
        </button>
      </nav>
    </div>
  );
}
