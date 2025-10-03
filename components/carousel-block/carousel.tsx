'use client'

// components/ServicesCarousel.tsx

import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import './carousel.css'
import Image from 'next/image'

gsap.registerPlugin(SplitText, useGSAP)

const CarouselText = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const track = trackRef.current!
    const text = textRef.current!

    // SplitText entrance animation
    const split = new SplitText(text, { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 100,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      duration: 1.2,
    })

    // Seamless scroll
    const width = track.scrollWidth / 2 // since we duplicated the track content

    gsap.to(track, {
      x: `-=${width}`,
      duration: 15,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % width), // keeps motion seamless
      },
    })

    return () => split.revert()
  }, { scope: containerRef })

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-track" ref={trackRef}>
        {/* repeat the content twice for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="carousel-slide">
            <h2 className="carousel-text contrast-trigger" data-contrast="true">TRANSFORM YOUR DIGITAL PRESENCE</h2>
            <Image
              src="/services.webp"
              alt="services"
              className="carousel-image"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default CarouselText