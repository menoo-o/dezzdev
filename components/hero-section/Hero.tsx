'use client';



import React from 'react';

import Head from 'next/head';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rain Delay</title>
        <meta name="description" content="Award-winning sports content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heroText}>GROW</h1>
          <p className={styles.description}>
           We build easy-to-manage websites that help small businesses grow, look professional, and get found online.
          </p>
        </div>
        <hr className={styles.divider} />
        {/* <div className={styles.underDivider}> */}
         <span>Custom Designs, Custom Coded</span>
        <h1 className={styles.delayText}>ONLINE</h1>
        {/* </div> */}

      </main>
    </div>
  );
}
