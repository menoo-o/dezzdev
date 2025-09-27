"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./stack.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "/01/",
    title: "Web Design",
    content: `
     In today's digital-first world, a website's design is crucial for making impactful first impressions. Through strategic visual communication and user-centered design principles, transform ideas into engaging digital experiences that resonate with target audiences.
    `,
    bullets: ["User Interface Design", "Brand Integration", "User Experience Strategy", "Interactive Prototyping", "Visual Communication"],
    images: [ "/placeholder.png", "/placeholder.png", "/placeholder.png" , "/placeholder.png" ],
  },
  {
    number: "/02/",
    title: "Web Development",
    content: `
      Transform design concepts into high-performing digital realities. Using cutting-edge technologies like the Astro framework and modern development practices to build lightning-fast, partially hydrated websites that excel in both functionality and technical performance.
    `,
    bullets: ["Custom Development", "Single Page Applications", "Responsive Implementation", "Performance Optimization", "Technical SEO"],
    images: [ "/placeholder.png", "/placeholder.png", "/placeholder.png" , "/placeholder.png" ],
  },
  {
    number: "/03/",
    title: "SEO Profiling",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Pellentesque euismod ligula nec tortor hendrerit, at faucibus nisl ultrices.
    `,
    bullets: ["SEO Audits", "Keyword Strategy", "Performance Reports"],
    images: [ "/placeholder.png", "/placeholder.png", "/placeholder.png" , "/placeholder.png" ],
  },
];

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
          start: "top 15%",
          end: "bottom 60%",
          pin: col1,
          pinSpacing: false,
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
