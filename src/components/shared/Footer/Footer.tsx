import React from 'react';
import styles from './Footer.module.sass';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSocial}>
          <h3>Síguenos</h3>
          <p>Facebook Twitter Instagram LinkedIn TikTok YouTube</p>
        </div>
        <div className={styles.footerContact}>
          <p>Cra 9 a # 19-03</p>
          <p>Manizales, Caldas, Colombia</p>
          <p>+57 606887 96 80</p>
          <p>contacto@umanizales.edu.co</p>
        </div>
      </div>
      <div className={styles.footerLogo}>
        <img src="/logo/Logo-UManizales-blanco.svg" alt="Universidad de Manizales" />
      </div>
    </footer>
  );
};
