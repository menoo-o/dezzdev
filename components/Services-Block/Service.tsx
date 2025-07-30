'use client'

// components/ServicesCarousel.tsx

import { useRef } from 'react'
import ServicesCarousel from './carousel'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import './services.css'


gsap.registerPlugin(SplitText, useGSAP)

const Services = () => {
  const serviceContainerRef = useRef<HTMLDivElement>(null)
  // const trackRef = useRef<HTMLDivElement>(null)
  // const textRef = useRef<HTMLHeadingElement>(null)
  return (
    <div className="services-container" ref={serviceContainerRef}>
      <ServicesCarousel />
      <div className="services-content">
      
      </div>
    </div>
  )
}

export default Services