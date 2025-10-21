"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import phases from "../../utils/phasesdata"
gsap.registerPlugin(ScrollTrigger)
import "./phase.css"
import Image from "next/image"
import { Phase } from "../../types"



export default function ApproachStackCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activePhase, setActivePhase] = useState(1)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const localTriggers: ScrollTrigger[] = [] // 🧩 local tracker for cleanup

      mm.add(
        {
          small: "(max-width: 768px)",
          large: "(min-width: 769px)",
        },
        (ctx) => {
          const { small, large } = ctx.conditions ?? {}

          // 🖥️ Desktop / Large Screens
          if (large) {
            const cards = cardsRef.current.filter(Boolean)

            cards.forEach((card, index) => {
              if (!card) return
              const isLast = index === cards.length - 1

              const triggerA = ScrollTrigger.create({
                trigger: card,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActivePhase(index + 1),
                onEnterBack: () => setActivePhase(index + 1),
              })
              localTriggers.push(triggerA)

              const triggerB = ScrollTrigger.create({
                trigger: card,
                start: "top top",
                end: isLast ? "bottom top" : "+=100%",
                pin: !isLast,
                pinSpacing: false,
                scrub: true,
              })
              localTriggers.push(triggerB)

              if (!isLast) {
                const tween = gsap.to(card, {
                  scale: 0.8,
                  opacity: 0.02,
                  scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: "+=100%",
                    scrub: true,
                  },
                })
                localTriggers.push(tween.scrollTrigger!)
              }
            })
          }

          // 📱 Mobile — only disable *this component’s* triggers
          if (small) {
            localTriggers.forEach((t) => t.kill())
            document
              .querySelectorAll(".phase-card")
              .forEach((el) => el.removeAttribute("style"))
          }

          // 🧹 Return cleanup to run automatically when conditions change/unmount
          return () => {
            localTriggers.forEach((t) => t.kill())
          }
        }
      )
    },
    { scope: containerRef }
  )


  return (
   <div className="process-stack" ref={containerRef}>
    <div className="process-container">
      <div className="process-grid">
        {/* Left Column */}
        <aside className="phase-nav">
          <p className="phase-label">Process Phases</p>
          {phases.map((phase:Phase) => (
            <div
              key={phase.id}
              className={`phase-item ${activePhase === phase.id ? "active" : ""}`}
            >
              {activePhase === phase.id && <div className="phase-indicator" />}
              <p className="phase-title">{phase.title}</p>
              <p className="phase-subtitle">{phase.subtitle}</p>
            </div>
          ))}
        </aside>

        {/* Right Column */}
        <section className="phase-cards">
          {phases.map((phase:Phase, index:number) => (
            <div
              key={phase.id}
              ref={(el) => {
                    cardsRef.current[index] = el
                  }}
              className="phase-card-wrapper"
            >
              <div className="phase-card">
                <div className="phase-card-inner">
                  {/* Phase Info */}
                  <div className="phase-info">
                    <p className="phase-info-title">{phase.title}</p>
                    <h3 className="phase-info-subtitle">{phase.subtitle}</h3>
                    <p className="phase-info-desc">{phase.description}</p>
                  </div>

                  {/* Project Cards */}
                  <div className="project-list">
                    {phase.projects.map((project, idx:number) => (
                      <div key={idx} className="project-card">
                        <div className={`project-overlay ${project.color}`} />
                        <Image 
                          src={project.image || "/placeholder.svg"} 
                          alt={project.title} 
                          className="project-image" 
                          width={100}
                          height={100}
                        />
                        <div className="project-content">
                          <p className="project-subtitle">{project.subtitle}</p>
                          <h4 className="project-title">{project.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
</div>

  )
}
