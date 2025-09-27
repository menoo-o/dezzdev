'use client'

import React, { useRef} from 'react';
// zustand store for contact page overlay
import { NavToggle } from '../Buttons/NavToggle';
import Link from 'next/link';
import Image from 'next/image';
import './newNav.css'
import { useOverlayStore } from '@/stores/useOverlay';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 


function NavbarNew() {
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const openContact = useOverlayStore((s) => s.openContact);

  useGSAP(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    // 🔹 Detect elements that require contrast blur
    const triggers = document.querySelectorAll<HTMLElement>(".contrast-trigger");

    triggers.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top", // when element hits top (navbar zone)
        end: "bottom top", // until it passes above
        onEnter: () => nav.classList.add("blurred"),
        onLeaveBack: () => nav.classList.remove("blurred"),
        onLeave: () => nav.classList.remove("blurred"),
      });
    });

    // ---- Existing Scroll Hide/Show Logic ----
    const showNavbar = () => {
      if (!isHidden.current) return;
      isHidden.current = false;
      gsap.to(nav, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const hideNavbar = () => {
      if (isHidden.current) return;
      isHidden.current = true;
      gsap.to(nav, {
        opacity: 0,
        y: -60,
        duration: 0.4,
        ease: "power2.in",
      });
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;

      if (goingDown && currentY > window.innerHeight * 0.5) {
        hideNavbar();
      } else if (!goingDown) {
        showNavbar();
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="nav-body" ref={navRef}>
      {/* Left: Logo */}
      <div className="nav-header">
        <Link href="/" className="nav-logo">
          <Image src="/logodezzdev.svg" alt="Logo" width={110} height={50} />
        </Link>
      </div>

      {/* Right: Contact + Hamburger */}
      <div className="nav-actions">
        <button className="contact-btn btn" onClick={openContact}>
          Contact Me
        </button>
        <NavToggle />
      </div>
    </nav>
  );
}

export default NavbarNew;