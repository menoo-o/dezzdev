'use client'

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 


const SpinnerLoader = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(".circle", {
      y: -6, // smaller bounce
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      stagger: 0.1,
      ease: "sine.inOut",
    });
  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '1rem',
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="circle"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--neutral-800)', // customize for your theme
          }}
        />
      ))}
    </div>
  );
};


export default SpinnerLoader;
