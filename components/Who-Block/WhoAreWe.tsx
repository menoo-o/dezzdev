'use client'

import React from 'react'
import './who.css'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from "gsap"

function WhoAreWe() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",          // when section enters viewport
        toggleActions: "play none none none", // run once
      },
    });

    tl.fromTo(".left-slash",
      { x: 0 },
      { x: -40, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".right-slash",
      { x: 0 },
      { x: 40, duration: 0.6, ease: "power3.out" },
      "<" // sync with left slash
    )
    .fromTo(".who-text",
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3" // slight overlap
    );
  }, { scope: containerRef }); // keeps selectors scoped

  return (
    <section className="who-container">
      {/* left content */}
      <div className='left-content'>
        <span className='who-question vertical-label contrast-trigger' data-contrast="true">
          /WHAT WE DO?/
          </span>
          <p className='who-intro who-title contrast-trigger' data-contrast="true">
          Design and code, perfectly in sync.
         </p>  
      </div>
      {/* right content */}
      <div className="right-content">
        <p className='who-text contrast-trigger' data-contrast="true">
         A web design & development studio, combining our passion for design and code. We help our clients succeed by transforming their digital presence through a personalized approach to innovative development. 
        </p>
      </div>
      
    </section>
  )
}

export default WhoAreWe
