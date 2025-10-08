"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./stack.css";
import Image from "next/image";
import services from "../../../utils/service";

gsap.registerPlugin(ScrollTrigger);



export default function StackService() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      services.forEach((_, i) => {
        const section = `.service-block-${i}`;
        const col1 = `${section} .service-col1`;
        const col2 = `${section} .service-col2`;

        ScrollTrigger.create({
          trigger: section,
         start: "top top+=30%",
          end: "80% top+=30%",
          pin: col1,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Reveal animations for col2
        gsap.from(`${col2} p, ${col2} ul li`, {
          scrollTrigger: {
            trigger: col2,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-container" ref={containerRef}>
      {services.map((service, i) => (
        <div className={`service-block service-block-${i}`} key={i}>
          {/* Left Column */}
          <div className="service-col1">
            <span className="service-number">{service.number}</span>
            <h2 className="service-title">{service.title}</h2>
          </div>
          {/* Right Column */}
          <div className="service-col2">
            {/* 4 Images with curved borders-flexbox */}
            <div className="image-bloc">
              {service.images && service.images.map((imgSrc, idx) => (
                <div className="image-wrapper" key={idx}>
                  <Image
                    src={imgSrc}
                    height={200}
                    alt={`Service Image ${idx + 1}`}
                    width={300} 
                    />
              </div>
              ))}
            </div>
            <p className="service-text">{service.content}</p>
            <ul>
              {service.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
