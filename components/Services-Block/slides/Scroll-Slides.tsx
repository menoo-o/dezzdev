'use client'

import './Scroll.css'; // Ensure you have the necessary styles for the cards

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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