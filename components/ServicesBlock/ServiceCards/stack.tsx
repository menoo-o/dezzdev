"use client"
import Image from "next/image"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import './stack.css'
import services from "@/utils/service"
gsap.registerPlugin(ScrollTrigger, useGSAP)
// Anticipate on both ends to avoid pin "jumps"
ScrollTrigger.defaults({ anticipatePin: 2 })


export default function StackService() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const localTriggers: ScrollTrigger[] = [] // 🧩 Track triggers created here

      const root = rootRef.current!
      const sections = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".svc"))
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      mm.add(
        {
          small: "(max-width: 767px)",
          large: "(min-width: 768px)",
        },
        (ctx) => {
          const { small, large } = ctx.conditions ?? {}

          // 🖥️ Desktop / Large Screen
          if (large) {
            sections.forEach((section) => {
              const left = section.querySelector<HTMLElement>(".svc-left")!
              const titleWrap = section.querySelector<HTMLElement>(".svc-title")!
              const right = section.querySelector<HTMLElement>(".svc-right")!

              const endDistance = () => {
                const base = Math.max(360, right.scrollHeight * 0.8)
                return "+=" + base
              }

              // Pin left column
              const pinTrigger = ScrollTrigger.create({
                trigger: section,
                start: "top 40%",
                end: endDistance,
                pin: left,
                pinSpacing: false,
                pinReparent: true,
                anticipatePin: 2,
                invalidateOnRefresh: true,
              })
              localTriggers.push(pinTrigger)

              // Title reveal
              if (!prefersReduced) {
                const titleTween = gsap.fromTo(
                  titleWrap,
                  { y: 48, opacity: 0.85 },
                  {
                    y: 0,
                    opacity: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: section,
                      start: "top 56%",
                      end: "top 40%",
                      scrub: 0.25,
                    },
                  },
                )
                localTriggers.push(titleTween.scrollTrigger!)
              }

              // Subtle fade handoff
              const fadeTrigger = ScrollTrigger.create({
                trigger: section,
                start: "bottom 45%",
                end: "bottom 30%",
                onLeave: () =>
                  gsap.to(section, { opacity: 0.98, y: -10, duration: 0.32, ease: "power2.out" }),
                onEnterBack: () =>
                  gsap.to(section, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }),
              })
              localTriggers.push(fadeTrigger)
            })
          }

          // 📱 Mobile: Disable local animations
          if (small) {
            localTriggers.forEach((t) => t.kill())
            gsap.set(".svc", { clearProps: "all" }) // Remove inline gsap styles
          }

          // ♻️ Cleanup on context revert (when breakpoint changes)
          return () => {
            localTriggers.forEach((t) => t.kill())
          }
        },
      )
    },
    { scope: rootRef, dependencies: [] },
  )

  return (
    <section ref={rootRef} className="stackservice">
      {/* display none for now- will fix the gsap animation later */}
      <div className="stackservice-header">
        <span className="stackservice-line" aria-hidden />
        <span className="stackservice-subtitle">SERVICES</span>
      </div>

      <div className="stackservice-content">
        {services.map((svc) => (
          <article key={svc.id} className="svc">
            <div className="svc-left">
              <div className="svc-title">
                <span className="svc-number">{"/ " + svc.num + " /"}</span>
                <h3 className="svc-heading">{svc.title}</h3>
              </div>
            </div>

            <div className="svc-right">
              <div className="svc-grid">
                {svc.images.map((img, i) => {
                  const tall = i % 3 === 1
                  return (
                    <figure
                      key={i}
                      className={`reveal svc-figure ${tall ? "tall" : ""}`}
                    >
                      <Image src={img.src || "/placeholder.svg"} alt={img.alt} width={100} height={100} />
                    </figure>
                  )
                })}
              </div>

            {/* <p className="reveal svc-body">{svc.body}</p> */}
            
             <section className="features-section reveal">
                 <div className="features-container">
                {svc.featureGroups?.map((group, rowIdx) => (
                  <div
                    key={group.label}
                    className={`feature-row ${rowIdx !== 0 ? "feature-row-border" : ""}`}
                  >
                    <div className="feature-grid">
                      {/* Left Label */}
                      <div className="feature-label">
                        <span className="feature-label-text">{group.label}</span>
                      </div>

                      {/* Right Pills */}
                      <ul
                        role="list"
                        aria-label={`${svc.title} ${group.label} features`}
                        className="feature-items"
                      >
                        {group.items.map((item) => (
                          <li key={item}>
                            <button type="button" className="feature-pill">
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
                    <p className="sr-only">
                      {svc.title} features grouped under build, maintain and grow
                    </p>
            </section>   


            </div>
          </article>
        ))}
      </div>
    </section>
  )
}