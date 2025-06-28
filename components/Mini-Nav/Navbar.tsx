'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ContactButton from '@/components/Contact-Btn/ContactButton';

export default function Navbar() {
return (
  <nav className="flex items-center justify-between px-2 py-3 border-b bg-white">
    {/* Logo on the left */}
    <Link href="/" className="ml-2">
      <Image src="/logo.svg" alt="Logo" width={90} height={60} />
    </Link>

    {/* Hamburger Menu (Sheet Trigger) on the right */}
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="focus:outline-none mr-4 flex items-center justify-between"
      >
        
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            width="26"
            height="26"
            className="text-black"
          >
            <g transform="translate(12,12)">
              <g transform="translate(0,2.5)">
                <path
                  fill="#1f2937" // slate-800
                  d="M7,-0.75 C7,-0.75 7,0.75 7,0.75 C7,0.75 -7,0.75 -7,0.75 C-7,0.75 -7,-0.75 -7,-0.75 C-7,-0.75 7,-0.75 7,-0.75z"
                />
              </g>
              <g transform="translate(0,-2.5)">
                <path
                  fill="#1f2937"
                  d="M7,-0.75 C7,-0.75 7,0.75 7,0.75 C7,0.75 -7,0.75 -7,0.75 C-7,0.75 -7,-0.75 -7,-0.75 C-7,-0.75 7,-0.75 7,-0.75z"
                />
              </g>
            </g>
        </svg>
        </div>
        

  
      </SheetTrigger>

      {/* Slide-in menu */}
      <SheetContent side="left" className="w-64 bg-white">
        <div className="flex flex-col mt-8 space-y-6 text-lg px-4">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <Link href="/cakes" className="hover:text-pink-500">Cakes</Link>
          <Link href="/about" className="hover:text-pink-500">About</Link>
          <Link href="/contact" className="hover:text-pink-500">Contact</Link>
        </div>
        
        <ContactButton />
      </SheetContent>
    </Sheet>
  </nav>
);
}