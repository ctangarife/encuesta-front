import Link from 'next/link';
import styles from './Header.module.sass';

export const Header = () => (
  <header className={styles.header}>
    <nav>
      <Link href="/">Encuestas</Link>
    </nav>
  </header>
);