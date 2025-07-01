'use client'

import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './nav.css'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
     <nav className={`nav-body ${isOpen ? 'nav-open' : ''}`}>
   

      <div className="nav-header">
        <Link href="/" className="nav-logo">
          <Image src="/logo8.svg" alt="Logo" width={110} height={50} />
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
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

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        
        <li><Link href="/">Services</Link></li>
        <li><Link href="/about">Work</Link></li>
        <li><Link href="/services">About</Link></li>
        <li><Link href="/contact">Blog</Link></li>
      </ul>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </nav>

  
    </>
   
  );
}