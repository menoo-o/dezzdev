'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ContactButton from '@/components/Contact-Btn/ContactButton';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-2 py-3 bg-white">
      {/* Logo on the left */}
      <Link href="/" className="ml-2">
        <Image src="/logo.svg" alt="Logo" width={90} height={60} />
      </Link>

      {/* Hamburger Menu (Sheet Trigger) on the right */}
       <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="focus:outline-none mr-4 flex items-center justify-between "
        >
          {open ? (
            // SVG for closing nav (X)
            <Image
              src="/icons/cross.svg"
              alt="Close Menu"
              width={26}
              height={26}
              style={{
                width: '100%',
                height: '100%',
                transform: 'translate3d(0px, 0px, 0px)',
                contentVisibility: 'visible',
                
              }} />
          ) : (
            // SVG for opening nav (hamburger)
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
            >
              <defs>
                <clipPath id="__lottie_element_48">
                  <rect width="24" height="24" x="0" y="0" />
                </clipPath>
              </defs>
              <g clipPath="url(#__lottie_element_48)">
                <g
                  transform="matrix(1,0,0,1,0,0)"
                  opacity="1"
                  style={{ display: 'block' }}
                >
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
          )}
        </SheetTrigger>


        {/* Slide-in menu */}
        <SheetContent side="left" className="h-screen bg-white">
        <div className="flex items-center justify-between px-4 pt-4 pb-6 border-b">
          {/* Logo inside Sheet */}
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={90} height={60} priority />
          </Link>

   
        </div>

        <div className="flex flex-col gap-6 px-4 mt-8 text-lg">
          <Link href="/" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/cakes" onClick={() => setOpen(false)}>Work</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Blog</Link>
        </div>

        <div>
          <ContactButton />
        </div>
      </SheetContent>
    </Sheet>
  </nav>
  );
}