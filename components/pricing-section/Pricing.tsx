"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./pricing.css";

gsap.registerPlugin(ScrollTrigger);

export default function PricingTakeover() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Takeover timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Slide up takeover
    tl.fromTo(
      section,
      { y: "100vh", borderRadius: "3rem 3rem 0 0" },
      { y: 0, borderRadius: "0 0 0 0", ease: "none" },
      0
    );

    // Fade in content
    tl.fromTo(
      content,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: "power2.out" },
      0.2
    );

    // Rounded bottom as section exits
    gsap.to(section, {
      borderRadius: "0 0 3rem 3rem",
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Fade out + scale previous section
    const previousSection = section.previousElementSibling;
    if (previousSection) {
      gsap.to(previousSection, {
        opacity: 0.3,
        scale: 0.95,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pricing-takeover">
      <div ref={contentRef} className="pricing-content">
        <h2 className="pricing-title">Simple and affordable price.</h2>
        <p className="pricing-subtitle">No funny hidden fees.</p>
      </div>
    </section>
  );
}
