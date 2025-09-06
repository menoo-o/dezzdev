
'use client'


import ServicesCarousel from './carousel-bloc/carousel'
import StackCardsObserver from './slides/Scroll-Slides'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'



gsap.registerPlugin(SplitText, useGSAP)

const Services = () => {
  const serviceContainerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div className="services-container" ref={serviceContainerRef}>
      <ServicesCarousel />
      <StackCardsObserver />
    </div>
  )
}

export default Services