"use client"

import { useState, useRef } from "react"
import { Mail, MessageCircle, Instagram } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import "./more.css"

export function MinimalistContactBox() {
  const [isHovered, setIsHovered] = useState(false)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useGSAP(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  return (
    <div
      className="contact-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`contact-box ${isHovered ? "hovered" : ""}`}>
        {/* Header */}
        <div className="contact-header">
          <h3 ref={headingRef} className="contact-title">
            Still have questions?
          </h3>
          <p className="contact-subtext">
            Lets connect and create something wonderful together. Reach out anytime!
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="contact-buttons">
          {[
            { icon: MessageCircle, label: "Chat on WhatsApp" },
            { icon: Instagram, label: "Instagram" },
            { icon: Mail, label: "Gmail" },
          ].map((item, idx) => (
            <button key={idx} className="contact-btn">
              <item.icon size={18} className="contact-icon" />
              <span className="contact-label">{item.label}</span>
              <div className="contact-dot" />
            </button>
          ))}
        </div>

        {/* Footer accent */}
        <div className="contact-footer" />
      </div>
    </div>
  )
}
