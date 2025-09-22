"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import "./stack.css"; // import vanilla CSS

gsap.registerPlugin(ScrollTrigger);

export default function WebDev() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".service");

    sections.forEach((section, index) => {
      const desc = section.querySelector<HTMLElement>(".service-row2");

      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            stagger: 0.1 * index,
            ease: "power2.out",
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="services">
        {/* Service 1 */}
        <div className="service">
          <div className="service-row1">
            <div className="service-number">/01/</div>
            <div className="service-title">Web Development</div>
            <div className="service-title sub-heading">
              Smooth, animated, responsive and SEO optimized
            </div>
          </div>
          <div className="service-row2">
            <p>
              Your website’s first impression is crucial. People leave when it is
              slow, plain, or has bad UX. We make websites according to your
              preferences and business goals and supercharge them with stunning
              visuals, smooth animations, and a user-friendly design. Of course,
              we make sure it is responsive and looks great across devices.
              Depending on complexity, we can deliver a finished website in as
              little as 2 weeks.
            </p>
            <ul>
              <li>Static and Dynamic Websites</li>
              <li>Animations with GSAP</li>
              <li>Dashboards for management</li>
              <li>Rapid Prototyping</li>
            </ul>
          </div>
        </div>

        {/* Service 2 */}
        <div className="service">
          <div className="service-row1">
            <div className="service-number">/02/</div>
            <div className="service-title">App Development</div>
            <div className="service-title sub-heading">
              Mobile-first, modern and intuitive
            </div>
          </div>
          <div className="service-row2">
            <p>
              We design and build mobile applications that are fast, modern, and
              provide smooth user experiences. From MVPs to full-scale apps, we
              cover both iOS and Android.
            </p>
            <ul>
              <li>Cross-platform apps</li>
              <li>React Native & Expo</li>
              <li>App store optimization</li>
            </ul>
          </div>
        </div>

        {/* Service 3 */}
        <div className="service">
          <div className="service-row1">
            <div className="service-number">/03/</div>
            <div className="service-title">Website Maintenance</div>
            <div className="service-title sub-heading">
              Keep your site secure, fast, and updated
            </div>
          </div>
          <div className="service-row2">
            <p>
              We handle bug fixes, updates, and performance optimization to keep
              your business website running smoothly.
            </p>
            <ul>
              <li>Security patches</li>
              <li>Speed optimization</li>
              <li>Content updates</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
