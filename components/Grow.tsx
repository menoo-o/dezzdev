'use client'

// components/AnimatedHeadline.tsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; // Ensure you have @gsap/react installed

const redColors = ['#FF5733', '#C70039', '#900C3F']; // Different shades of red

const AnimatedHeadline: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const componentRef = useRef<HTMLDivElement>(null); // Ref for the component's container

  useGSAP(() => {
    // Headline color animation
    gsap.to(headlineRef.current, {
      color: gsap.utils.wrap(redColors), // Cycles through the redColors array
      duration: 3,
      repeat: -1, // Infinite repeat
      ease: 'power1.inOut',
      yoyo: true, // Go back and forth
    });

    // Background gradient animation
    gsap.to(componentRef.current, {
      backgroundPosition: '100% 0%', // Animate to the right
      duration: 5,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
    });
  }, { scope: componentRef }); // Associate GSAP animations with the componentRef scope

  return (
    <div
      ref={componentRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Take full viewport height
        width: '100vw',    // Take full viewport width
        background: 'linear-gradient(to right, #e0e0e0, #f0f0f0)', // Initial gradient
        backgroundSize: '200% 100%', // Larger than container to allow movement
      }}
    >
      <h1 ref={headlineRef} style={{ fontSize: '5rem', fontWeight: 'bold' }}>
        GROW
      </h1>
    </div>
  );
};

export default AnimatedHeadline;