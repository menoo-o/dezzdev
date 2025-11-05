'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef} from 'react';
import { useOverlayStore } from '../../stores/useOverlay';
import { NavToggle } from '../Buttons/NavToggle';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./nav-overlay.css";
import useLockScroll from '../../lib/hooks/useLockScroll';
import useEscapeKey from '../../lib/hooks/useEscapeKey';

export default function NavOverlay() {
  const isOpen = useOverlayStore((s) => s.isNavOpen);
  const toClose = useOverlayStore((s)=> s.closeNav);
  const openContact = useOverlayStore((s)=> s.openContact);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll on open
  useLockScroll(isOpen);

 useGSAP(() => {
  if (!isOpen) return; // ← this is safe!
  
  const navItems = navListRef.current?.querySelectorAll('li') ?? [];
  const socialLinks = socialRef.current;

  gsap.set(navItems, { opacity: 0, x: -30 });
  gsap.set(socialLinks, { opacity: 0, y: 20 });

  tl.current = gsap.timeline()
    .fromTo(overlayRef.current,
      { left: '100%' },
      { left: '0%', duration: 0.5, ease: 'power3.out' }
    )
    .to(navItems, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.3')
    .to(socialLinks, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)',
    }, '-=0.2');
}, [isOpen]);

  // 🔹 Escape key to close
  useEscapeKey(isOpen, toClose);



  return (
    <section 
    className={`overlay-container ${isOpen ? 'active' : ''}`}
    ref={overlayRef}>
      {/* Header: Logo + CTA + Close */}
      <div className="overlay-header">
        <Link href="/" className="overlay-logo">
          <Image 
            src="/light.png"
            alt="overlay-logo"
            width={110}
            height={50}
          />
        </Link>

        <div className="overlay-actions">

          <button 
            className="contact-btn btn"
            onClick={openContact}
            >
            Contact Me
          </button>

          <NavToggle />

        </div>
      </div>

      {/* Content: Nav Left + Social Right */}
      <div className="overlay-content">
        <nav className="overlay-content__left">
          <ul className="overlay-content__list" ref={navListRef}>

           <li className="overlay-content__item">
            <Link href="#services" onClick={toClose}>Services</Link>
          </li>
          <li className="overlay-content__item">
            <Link href="#about" onClick={toClose}>About</Link>
          </li>
          <li className="overlay-content__item">
            <Link href="#faq" onClick={toClose}>FAQs</Link>
          </li>

          </ul>
        </nav>

        <div className="overlay-content__right" ref={socialRef}>
          <span>dezzdev</span>
        <a href="mailto:menosuper6@gmail.com">
              <p className="overlay-content__email">hello@dezzdev.com</p>
          </a>   
       
       

          <div className="overlay-content__social-links">
            <Link href="https://x.com/Thisismeeno" className="overlay-content__social-link" target='_blank'>Twitter</Link>
            <Link href="https://www.instagram.com/muhammadmobeen_/" className="overlay-content__social-link" target='_blank'>Instagram</Link>
            <Link href="https://github.com/menoo-o" className="overlay-content__social-link" target='_blank' >GitHub</ Link>
          </div>
        </div>
      </div>
    </section>
  );
}
