'use client';

import { useState, useRef } from 'react';
import './FaqSection.css'


import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useScreenSize from '@/lib/hooks/useWindowSize';
import faqData from '../../utils/faq';
gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRightRef = useRef<HTMLDivElement>(null);
  const { width } = useScreenSize();

  const toggle = (i: number): void => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useGSAP(() => {
    // ✅ Stop immediately on mobile — but do NOT kill or unregister ScrollTrigger globally.
    if (width < 768) return;

    if (!faqRightRef.current) return;

    gsap.fromTo(
      faqRightRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: faqRightRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, [width]); // ✅ re-run only when screen width changes


  return (
    <section className="faq-block" id='faq'>
      <div className="faq-inner">
        <div className="faq-left">
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>
        <div ref={faqRightRef} className="faq-list faq-right">
          <ul>
            {faqData.map((item, i) => (
              <li key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggle(i)}>
                  <span>{item.question}</span>
                  <span className={`icon ${openIndex === i ? 'rotate' : ''}`}>+</span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
         
        </div>
      </div>
    </section>
  );
}
