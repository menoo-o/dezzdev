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


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 


function NavbarNew() {
    //   const [isOpen, setIsOpen] = useState(false);
      const navRef = useRef<HTMLElement | null>(null);
      const lastScrollY = useRef(0);
      const isHidden = useRef(false);
      const openContact = useOverlayStore((s) => s.openContact);
    
      useGSAP(()=>{
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

        // Watch how the user scrolls — and decide what animations to trigger
        const handleScroll = () => {
        // if (isOpen) return;

        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollY.current;

        if (goingDown && currentY > window.innerHeight * 0.5) {
            hideNavbar();
        } else if (!goingDown) {
            showNavbar();
        }

        lastScrollY.current = currentY;
        };
      

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        }, []);

    return (
        <>
        <nav className='nav-body' ref={navRef}>
        
        {/* Left: Logo */}
        <div className="nav-header">
            <Link href="/" className="nav-logo">
              <Image src="/logodezzdev.svg" alt="Logo" width={110} height={50} />
            </Link>
        </div>


        {/* Right: Contact + Hamburger */}
        <div className="nav-actions">
            {/* contact-page link */}
        <button
            className="contact-btn btn"
            onClick={openContact}
            >
                Contact Me
            </button>

        {/* Nav-toggle btn */}
         <NavToggle />
        </div>

        
        </nav>
        </>
    )
    }

    export default NavbarNew
