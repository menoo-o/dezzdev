'use client';

import Head from 'next/head';
import styles from './page.module.css';

export default function NewHeroPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DezzDev</title>
        <meta name="description" content="A web dev agency for small businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.headlineRow}>
            <h1 className={styles.word}>Design.</h1>
            <h1 className={styles.word}>Build.</h1>
          </div>
          <h1 className={`${styles.word} ${styles.highlight}`}>Grow.</h1>

          <p className={styles.description}>
            We build easy-to-manage websites that help small businesses grow, look professional,
            and get found online.
          </p>
        </section>
      </main>
    </div>
  );
}
