'use client'

import React, { useRef} from 'react';
// zustand store for contact page overlay
import { useContactOverlay } from '@/stores/useContactOverlay';
import Link from 'next/link';
import Image from 'next/image';
import './newNav.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 


function NavbarNew() {
    //   const [isOpen, setIsOpen] = useState(false);
      const navRef = useRef<HTMLElement | null>(null);
      const lastScrollY = useRef(0);
      const isHidden = useRef(false);
      const openOverlay = useContactOverlay((state) => state.openOverlay);
    
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
            <Image src="/logo9.svg" alt="Logo" width={110} height={50} />
            </Link>
        </div>


        {/* Right: Contact + Hamburger */}
        <div className="nav-actions">
            {/* contact-page link */}
        <Link
            className="contact-btn btn"
            href='/contact'
            >
                Contact Me
            </Link>

        {/* svg icon hamburger btn */}
            <button
            className="nav-toggle "
            onClick={openOverlay}
            aria-label="Toggle navigation"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
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
                    <rect width="28" height="28" x="0" y="0" />
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

            </button>
        </div>

        
        </nav>
        </>
    )
    }

    export default NavbarNew
