'use client';

import { useState, useRef } from 'react';
import './FaqSection.css'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import faqData from '../../utils/faq';
gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRightRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number): void => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useGSAP(() => {
    if (!faqRightRef.current) return;

    gsap.fromTo(
      faqRightRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqRightRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      }
    );
  }, []);

  return (
    <section className="faq-block">
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
          <div className="more-questions-box">
            <h3 className="mq-title">Still have questions?</h3>
            <p className="mq-text">
              Let’s connect and create something wonderful together. Reach out anytime!
            </p>
            <div className="mq-links">
              <a href="#" className="mq-link">
                💬 Chat on WhatsApp
              </a>
              <a href="#" className="mq-link">
                📸 Instagram
              </a>
              <a href="mailto:hello@dezzdev.com" className="mq-link">
                ✉️ Gmail
              </a>
             </div>
         </div>
        </div>
      </div>
    </section>
  );
}
