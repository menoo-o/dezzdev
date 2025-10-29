'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useGSAP } from "@gsap/react"
import './servicecard.css'
import services from "../../utils/service"
import Image from "next/image"



gsap.registerPlugin(ScrollTrigger)

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])



  return (
    <section ref={containerRef} className="services-section">
      {/* Cards */}
      <div className="services-cards">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              cardsRef.current[index] = el
            }}
            className={`service-card`}
          >
            <div className="service-card-content">
              {/* Left */}
              <div className="service-info">
                <h3>{service.title}</h3>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="service-desc">{service.description}</p>
                
              </div>

              {/* Right visual */}
             <div className="service-visual">
                <div className={`bento-grid ${service.customClass || ""}`}>
                    {service.images.map((image, i) => (
                    <div key={i} className={`bento-item ${image.size || "small"}`}>
                        <Image src={image.src} alt={image.alt} width={200} height={200}/>
                    </div>
                    ))}
                </div>
             </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
