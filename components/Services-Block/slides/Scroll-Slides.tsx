'use client'

import './Scroll.css'; // Ensure you have the necessary styles for the cards
import {serviceSlides} from '@/data/cardData';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function StackCardsObserver() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Select all card-wrapper and card elements inside this section
    const cardWrappers = gsap.utils.toArray<HTMLDivElement>(
      containerRef.current.querySelectorAll(".card-wrapper")
    );
    const cards = gsap.utils.toArray<HTMLDivElement>(
      containerRef.current.querySelectorAll(".card")
    );

  // Get the .wrapper element safely
    const wrapperElement = containerRef.current.querySelector(".wrapper");

    cardWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      if (!card || !wrapper) return;

      let scale = 1;
      let rotation = 0;

      if (i !== cards.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotation = 0;
      }

      gsap.to(card, {
        scale: scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${70 + 60 * i}`,
          end: "bottom 550",
          endTrigger: wrapperElement || ".wrapper", // Fallback to selector string if null
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
          id: (i + 1).toString(),
        },
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="section">
    
    <div className="wrapper">
      {serviceSlides.map(({ id, title, headline, description, tags }) => (
        <div key={id} className="card-wrapper">
          <div className="card">
            <h2 className="title">{title}</h2>
            <h3 className="headline">{headline}</h3>
            <p className="description">{description}</p>
            <ul className="tags">
              {tags.map((tag, i) => (
                <li key={i} className="tag">{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    <div className="spacer"></div>
  </section>

  );
}