"use client";

import React, { useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 
gsap.registerPlugin(ScrollTrigger);



    

import styles from "./StackCards.module.css";


export type ServiceSlide = {
  id: number;
  title: string;
  headline: string;
  description: string;
  tags: string[];
};

export const serviceSlides: ServiceSlide[] = [
  {
    id: 1,
    title: "Website Design",
    headline: "Design That Speaks Your Brand",
    description:
      "In today's digital-first world, your website is often the first interaction your customers have with your business. Our design approach blends strategy, creativity, and user-focused thinking to craft beautiful, intuitive experiences that leave a lasting impression.",
    tags: [
      "User Interface Design",
      "Brand Integration",
      "User Experience Strategy",
      "Interactive Prototyping",
      "Visual Storytelling",
    ],
  },
  {
    id: 2,
    title: "Website Development",
    headline: "Built to Perform. Powered to Scale.",
    description:
      "We bring your designs to life using modern technologies like Next.js and scalable, responsive architecture. Whether it's a one-page showcase or a multi-page platform, we ensure speed, flexibility, and a seamless experience across all devices.",
    tags: [
      "Custom Development",
      "Single-Page Applications",
      "Responsive Implementation",
      "Performance Optimization",
      "Technical SEO",
    ],
  },
  {
    id: 3,
    title: "Tech Maintenance",
    headline: "Ongoing Support That Grows With You",
    description:
      "A great website doesn’t stop at launch. We provide ongoing support to keep your site secure, up-to-date, and optimized. Whether it's updating content, improving search engine visibility, or rolling out new features, we’ve got your back.",
    tags: [
      "Content Updates & Feature Enhancements",
      "Hosting & Server Management",
      "Search Engine Optimization (SEO)",
      "Uptime Monitoring & Fast Recovery",
      "Monthly Maintenance & Reporting",
    ],
  },
];

const offset = 40;
const duration = 4;

export default function StackCards() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(`.${styles.card}`);
    const cardsArray = Array.from(cards).reverse();

    gsap.set(cardsArray, {
      y: (i) => offset * i,
      scale: (i) => gsap.utils.mapRange(0, cardsArray.length - 1, 1, 0.95)(i),
      zIndex: (i) => i,
      // opacity: 0,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        scrub: 0.5,
        pin: true,
      },
    });

    tl.to(cardsArray, {
      y: 0,
      scale: 1,
      // opacity: 1,
      ease: "power3.out",
      stagger: {
        each: duration / cardsArray.length,
      },
      duration,
    }).to(cardsArray, {
      y: (i) => -offset * i,
      rotation: () => gsap.utils.random(-2, 2),
      scale: (i) => gsap.utils.mapRange(0, cardsArray.length - 1, 1, 0.9)(i),
      ease: "power2.inOut",
      stagger: {
        each: 0.1,
      },
    });
  }, [containerRef.current]);

  return (
    <section ref={containerRef} className={styles.section}>
      <ul className={styles.cards}>
        {serviceSlides.map(({ id, title, headline, description, tags }) => (
          <li key={id} className={`${styles.card}`}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.headline}>{headline}</h3>
            <p className={styles.description}>{description}</p>
            <ul className={styles.tags}>
              {tags.map((tag, i) => (
                <li key={i} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

