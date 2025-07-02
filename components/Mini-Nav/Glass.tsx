'use client'

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './glass.css'

export default function Glass() {
  const navRef = useRef(null);
  const hasGlassified = useRef(false);
  const isHidden = useRef(false);
  const lastScrollY = useRef(0);

  useGSAP(() => {
    const nav = navRef.current;

    const showNavbar = () => {
      if (!isHidden.current) return;
      isHidden.current = false;
      gsap.to(nav, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const hideNavbar = () => {
      if (isHidden.current) return;
      isHidden.current = true;
      gsap.to(nav, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      });
    };

    const morphToGlass = () => {
      if (hasGlassified.current) return;
      hasGlassified.current = true;
      gsap.to(nav, {
        width: 'clamp(240px, 70%, 500px)',
        borderRadius: '16px',
        backdropFilter: 'blur(6.7px)',
        backgroundColor: 'rgba(188, 230, 154, 0)',
        border: '2px solid rgba(188, 230, 154, 0.22)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        ease: 'power2.out',
        duration: 0.6,
      });
    };

    const revertGlass = () => {
      if (!hasGlassified.current) return;
      hasGlassified.current = false;
      gsap.to(nav, {
        width: '100%',
        borderRadius: '0px',
        backdropFilter: 'blur(0px)',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;

      if (currentY > 20) {
        morphToGlass();
      } else {
        revertGlass();
      }

      if (goingDown && currentY > window.innerHeight * 0.5) {
        hideNavbar();
      } else if (!goingDown) {
        showNavbar();
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);

    // ⛔ Clean-up automatically using GSAP context
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // no dependencies, runs once

  return (
    <div ref={navRef} className="navbar">
      <nav className="navbar-content">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  );
}
