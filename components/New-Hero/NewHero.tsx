'use client';

import Head from 'next/head';
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

// Register the plugin
gsap.registerPlugin(SplitText, useGSAP)

import styles from './page.module.css';

export default function NewHeroPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current || !growRef.current) return;

      const [designEl, buildEl] = Array.from(headlineRef.current.children);

      if (!(designEl instanceof HTMLElement) || !(buildEl instanceof HTMLElement)) return;

      // Split text
      const designSplit = new SplitText(designEl, { type: 'chars,words' });
      const buildSplit = new SplitText(buildEl, { type: 'chars,words' });
      const growSplit = new SplitText(growRef.current, { type: 'chars,words' });

      // Initial styles - set elements off-screen or scaled down for a more dramatic entrance
      gsap.set([designSplit.chars, buildSplit.chars, growSplit.chars], {
        opacity: 0,
        yPercent: 100, // Start from below
        rotationX: 90,
        transformOrigin: 'top center',
      });

      // Prepare the container for a slight scale effect
      gsap.set(containerRef.current, { scale: 1.05, autoAlpha: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(containerRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          designSplit.chars,
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.7,
            stagger: { each: 0.03, from: 'random' }, // Stagger from random characters
            ease: 'back.out(1.7)',
          },
          '<0.2' // Start slightly after the container animation begins
        )
        .to(
          buildSplit.chars,
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.7,
            stagger: { each: 0.03, from: 'random' },
            ease: 'back.out(1.7)',
          },
          '-=0.3' // Overlap with the previous animation
        )

        // Animate "Grow." text in with bounce and center stagger
        .to(
          growSplit.chars,
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.9,
            stagger: { each: 0.04, from: 'center' },
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.4'
        )

        // Animate background gradient on "Grow." headline
        gsap.to(growRef.current, {
          backgroundPositionX: '200%',
          duration: 3,
          ease: 'linear',
          repeat: -1,
          yoyo: true,
          immediateRender: false,
        })

      // Enhanced subtle floating effect with more complex movement
      gsap.to(containerRef.current, {
        y: -15, // Slightly more pronounced vertical movement
        x: 5, // Introduce a slight horizontal sway
        rotationZ: 0.5, // Subtle rotation
        duration: 4,
        ease: 'sine.inOut', // Smoother, more natural wave
        yoyo: true,
        repeat: -1,
      });

      // Cleanup for SplitText
      return () => {
        designSplit.revert();
        buildSplit.revert();
        growSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>DezzDev</title>
        <meta name="description" content="A web dev agency for small businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} ref={containerRef}>
        <section className={styles.heroSection}>
          <div className={styles.headlineRow} ref={headlineRef}>
            <h1 className={styles.word}>Design.</h1>
            <h1 className={styles.word}>Build.</h1>
          </div>
          <h1 className={`${styles.word} ${styles.highlight}`} ref={growRef}>
            Grow.
          </h1>
        </section>
      </main>
    </div>
  );
}