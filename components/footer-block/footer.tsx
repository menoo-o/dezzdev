"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./ParallaxFooter.css"

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxFooter() {
  const footerRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!footerRef.current || !tickerRef.current) return

    // 🔹 Parallax pinning effect
    gsap.to(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        pin: false,
      },
      y: 0,
      ease: "none",
    })

    // 🔹 Infinite scrolling ticker animation
    const ticker = tickerRef.current
    const tickerContent = ticker.querySelector(".ticker-content")
    if (tickerContent) {
      const tickerWidth = tickerContent.scrollWidth / 2
      gsap.to(tickerContent, {
        x: -tickerWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    }
  }, [])

  const services = ["RESEARCH", "DESIGN SYSTEMS", "VISUAL DESIGN", "WEB PRESENCE", "UI/UX", "BRANDING"]

  return (
    <div ref={footerRef} className="parallax-footer">
      {/* 🔹 Scrolling ticker */}
      <div ref={tickerRef} className="ticker">
        <div className="ticker-content">
          {[...services, ...services].map((service, index) => (
            <div key={index} className="ticker-item">
              <span className="service">{service}</span>
              <span className="arrow">←</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Main footer content */}
      <div className="footer-main">
        <div className="footer-inner">
          <h2 className="footer-heading">
            What happens next usually
            <br />
            starts with a conversation.
          </h2>

          <div className="footer-contact">
            <a href="mailto:hello@dezzdev.com" className="footer-email">
              hello@dezzdev.com
            </a>
            <button className="footer-btn">
              <span className="dot"></span>
              Contact us
            </button>
          </div>

          <div className="footer-divider"></div>
        </div>

        {/* 🔹 Bottom section */}
        <div className="footer-bottom">
          <div className="footer-grid">
            <div className="footer-logo">
              <span className="arrow">→</span>
              <div className="logo-dot"></div>
              <span className="logo-text">DezzDev</span>
            </div>

            <div className="footer-section">
              <h3>Email</h3>
              <a href="mailto:hello@dezzdev.com">hello@dezzdev.com</a>
            </div>

            <div className="footer-section">
              <h3>Socials</h3>
              <a href="#">→ Instagram</a>
              <a href="#">→ X</a>
              <a href="#">→ LinkedIn</a>
            </div>
          </div>

          <div className="footer-meta">
            <p>© 2025 dezzdev. All rights reserved.</p>
            <a href="#">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
