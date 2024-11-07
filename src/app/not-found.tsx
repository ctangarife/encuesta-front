import Image from "next/image";
import Link from "next/link";
import styles from 'app/sass/not-found.module.sass'

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <h1 className={styles.NotFound__title}>404</h1>
      <h2 className={styles.NotFound__subtitle}>
        ¡Uy, parece que el enlace se escondió!
      </h2>
      <p className={styles.NotFound__description}>No encontramos esta encuesta</p>
      <Link className={styles.NotFound__link} href="/">
        ¡Encuestas!
      </Link>
    </main>
  );
}