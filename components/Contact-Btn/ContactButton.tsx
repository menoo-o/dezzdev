'use client'

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image"; // Next.js Image
import "./styles.css"; // Import external CSS

gsap.registerPlugin(useGSAP); 

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

function ContactButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    alert('Contact Us button clicked!');
  };

  useGSAP(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const profile = btn.querySelector('.icon-profile');
    const email = btn.querySelector('.icon-email');
    const spanText = btn.querySelector('.span-text');

    if (!profile || !email || !spanText) return;

    // Initial state for email icon
    gsap.set(email, { y: 50, opacity: 0 });

    // On hover animation (slot machine effect)
    btn.addEventListener('mouseenter', () => {
      // Profile icon moves up and fades out
      gsap.to(profile, { y: -50, opacity: 0, duration: 0.3, ease: 'power2.out' });
      // Email icon slides up from bottom
      gsap.to(email, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.1 });
      // Span text moves up and back down to simulate slot machine
      gsap.to(spanText, {
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        yoyo: true,
        repeat: 1,
      });
    });

    // On mouse leave revert
    btn.addEventListener('mouseleave', () => {
      // Profile icon slides back from top
      gsap.to(profile, { 
        y: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: 'power2.out', 
        delay: 0.1 
      });
      // Email icon slides down and fades out
      gsap.to(email, { 
        y: 50, 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
      // Span text moves down and back up
      gsap.to(spanText, {
         y: 10,
        duration: 0.2,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    });
  }, { scope: buttonRef });

  return (
    <div className="contact-btn relative inline-block" ref={buttonRef}>
      <button
        className="btn-body"
        onClick={handleClick}
        aria-label="Contact Us"
      >
        <div className="icons-bg">
          {/* Profile icon */}
          <Image
            src="/profile.jpeg"
            alt="Contact Icon"
            width={24}
            height={24}
            className="icon-profile absolute rounded-full"
          />
          {/* Email icon (hidden by default, shown on hover) */}
          <Image
            src="/email.png"
            alt="Email Icon"
            width={24}
            height={24}
            className="icon-email absolute"
          />
        </div>
        <span className="span-text text-lg">Contact Us</span>
      </button>
    </div>
  );
}

export default ContactButton;