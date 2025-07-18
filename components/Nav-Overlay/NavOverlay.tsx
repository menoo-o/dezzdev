'use client';


import Link from 'next/link';
import Image from 'next/image';
import './overlay.css'

import { useEffect } from 'react';
import { useContactOverlay } from '@/stores/useContactOverlay';


export default function NavOverlay() {
  const { isOpen, closeOverlay } = useContactOverlay();

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add('lock-scroll');
    } else {
      body.classList.remove('lock-scroll');
    }

    // Cleanup when component unmounts (just in case)
    return () => body.classList.remove('lock-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  

  return (
    <>
    <section className='overlay-container'>
      <div className='overlay-header'>
         {/* Left: Logo */}
          <Link href='/' className='overlay-logo'>
            <Image 
              src='/logodezzdevlight.svg'
              alt='overlay-logo'
              width={110}
              height={50}
            />
          </Link>

          {/* Right: Contact + Close Icon */}
        <div className='overlay-actions'>
          <Link
            className="contact-btn btn"
            href='/contact'
          >
            Contact Me
          </Link>
          <button
            className="nav-toggle "
            onClick={closeOverlay}
            aria-label="Toggle navigation"
          >
            <Image 
              src='/icons/cross.svg'
              alt='close menu'
              width={24}
              height={24}
            />
          </button>
        </div>
       
      </div>
    </section>
    </>
  );
}