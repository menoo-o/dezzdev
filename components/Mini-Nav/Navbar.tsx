'use client'

import React, {useState, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './nav.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);  // or HTMLElement if you prefer
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const hasGlassified = useRef(false);

    // Turn the navbar into a rounded, glassy UI pill
  const morphToGlass = () => {
    const nav = navRef.current;
    if (hasGlassified.current || isOpen) return; // ✅ skip if menu is open
    hasGlassified.current = true;
    // the problem occurs here, it modifies the whole nav ! scrolling down works fine, but when nav is opened midway screen, it still applies this css which overrides my css written in another file
    gsap.to(nav, {
      width: 'clamp(330px, 70%, 700px)',
      borderRadius: '16px',
      backdropFilter: 'blur(35px)',
      backgroundColor: 'rgba(188, 230, 154, 0.35)',
      border: '2px solid rgba(188, 230, 154, 0.45)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      ease: 'power2.out',
      duration: 0.6,
      
    });
  };


  //Turn the navbar back into a regular rectangle (no glass effect)
  const revertGlass = () => {
    const nav = navRef.current;
    if (!nav || !hasGlassified.current) return;

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

  const expandNavForOpenMenu = () => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, {
      width: '100%',
      backgroundColor: '#EAF4F1',
      borderRadius: '10px',
      backdropFilter: 'none',
      border: 'none',
      boxShadow: 'none',
      padding: '0.5rem',
    });
  };

const toggleMenu = () => {
  const willOpen = !isOpen;
  setIsOpen(willOpen);

  if (willOpen) {
    // Nav is opening
    revertGlass(); // ⛔ remove morph effect
    expandNavForOpenMenu(); // 🧩 custom styles for menu open
    document.body.classList.add('lock-scroll'); // 🔒 disable scroll
  } else {
    // Nav is closing
    // collapseNavMenu(); // optional cleanup
    document.body.classList.remove('lock-scroll'); // ✅ re-enable scroll
    morphToGlass(); // ✅ restore glassmorphism effect
  }
};




  // 🟩 GSAP animation logic
 useGSAP(() => {
  const nav = navRef.current;

  // Slide the navbar back down into view (if it was hidden).
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

  // Slide the navbar up and out of sight.
  const hideNavbar = () => {
    if (isHidden.current) return;
    isHidden.current = true;
    gsap.to(nav, {
      opacity: 0,
      y: -60,
      duration: 0.4,
      ease: 'power2.in',
    });
  };

  // Turn the navbar into a rounded, glassy UI pill
  // const morphToGlass = () => {
  //   if (hasGlassified.current || isOpen) return; // ✅ skip if menu is open
  //   hasGlassified.current = true;
  //   // the problem occurs here, it modifies the whole nav ! scrolling down works fine, but when nav is opened midway screen, it still applies this css which overrides my css written in another file
  //   gsap.to(nav, {
  //     width: 'clamp(330px, 70%, 700px)',
  //     borderRadius: '16px',
  //     backdropFilter: 'blur(35px)',
  //     backgroundColor: 'rgba(188, 230, 154, 0.35)',
  //     border: '2px solid rgba(188, 230, 154, 0.45)',
  //     boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  //     ease: 'power2.out',
  //     duration: 0.6,
      
  //   });
  // };

  

// Watch how the user scrolls — and decide what animations to trigger
 const handleScroll = () => {
  if (isOpen) return;

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



// If the user clicks outside the navbar, close the menu.
const handleClickOutside = (event: MouseEvent) => {
  if (nav && !nav.contains(event.target as Node)) {
    setIsOpen(false);
    document.body.classList.remove('lock-scroll'); // ✅ make sure scroll comes back
  }
};

  window.addEventListener('scroll', handleScroll);
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  return (
    <>
     <nav className={`nav-body ${isOpen ? 'nav-open' : ''}`} ref={navRef}>
   
      <div className="nav-header">
        <Link href="/" className="nav-logo">
          <Image src="/logo9.svg" alt="Logo" width={110} height={50} />
        </Link>

        <button
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? 
            <Image src="/icons/cross.svg" alt="Close menu" width={20} height={20}  />
           : 
           // Using SVG for the hamburger icon 
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: '100%',
                height: '100%',
                transform: 'translate3d(0px, 0px, 0px)',
                contentVisibility: 'visible',
              }}
              className="lottie-svg">
            <defs>
              <clipPath id="__lottie_element_48">
                <rect width="24" height="24" x="0" y="0" />
              </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_48)">
              <g transform="matrix(1,0,0,1,0,0)" opacity="1">
                <g opacity="1" transform="matrix(1,0,0,1,12,12)">
                  <g opacity="1" transform="matrix(1,0,0,1,0,2.5)">
                    <path
                      fill="#072e23"
                      fillOpacity="1"
                      d="M7,-0.75 C7,-0.75 7,0.75 7,0.75 C7,0.75 -7,0.75 -7,0.75 C-7,0.75 -7,-0.75 -7,-0.75 C-7,-0.75 7,-0.75 7,-0.75z"
                    />
                  </g>
                  <g opacity="1" transform="matrix(1,0,0,1,0,-2.5)">
                    <path
                      fill="#072e23"
                      fillOpacity="1"
                      d="M7,-0.75 C7,-0.75 7,0.75 7,0.75 C7,0.75 -7,0.75 -7,0.75 C-7,0.75 -7,-0.75 -7,-0.75 C-7,-0.75 7,-0.75 7,-0.75z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
            
  }
        </button>
      </div>

      <div className="nav-links-wrapper">
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}> 
          <li><Link href="/">Services</Link></li>
          <li><Link href="/about">Work</Link></li>
          <li><Link href="/services">About</Link></li>
          <li><Link href="/contact">Blog</Link></li>
        </ul>
      </div>
      

    
    </nav>

  
    </>
   
  );
}