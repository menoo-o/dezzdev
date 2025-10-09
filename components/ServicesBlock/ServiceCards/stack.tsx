"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import './stack.css'
import services from "@/utils/service"
gsap.registerPlugin(ScrollTrigger, useGSAP)
// Anticipate on both ends to avoid pin "jumps"
ScrollTrigger.defaults({ anticipatePin: 2 })

// export default function StackService() {
//   const rootRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const root = rootRef.current!;
//       const sections = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".svc"));
//       const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//       const mm = gsap.matchMedia(); 

//       mm.add( {
//         // desktop
//         "(min-width: 768px)": () => {
//           sections.forEach((section) => {
//             const left = section.querySelector<HTMLElement>(".svc-left")!;
//             const titleWrap = section.querySelector<HTMLElement>(".svc-title")!;
//             const right = section.querySelector<HTMLElement>(".svc-right")!;

//             const endDistance = () => "+=" + Math.max(360, right.scrollHeight * 0.8);

//             // Pin left
//             ScrollTrigger.create({
//               trigger: section,
//               start: "top 40%",
//               end: endDistance,
//               pin: left,
//               pinSpacing: false,
//               pinReparent: true,
//               anticipatePin: 2,
//               invalidateOnRefresh: true,
//             });

//             // Title reveal
//             if (!prefersReduced) {
//               gsap.fromTo(
//                 titleWrap,
//                 { y: 48, opacity: 0.85 },
//                 {
//                   y: 0,
//                   opacity: 1,
//                   ease: "power3.out",
//                   scrollTrigger: {
//                     trigger: section,
//                     start: "top 56%",
//                     end: "top 40%",
//                     scrub: 0.25,
//                   },
//                 },
//               );
//             }

//             // Image reveal
//             const reveals = right.querySelectorAll<HTMLElement>(".reveal");

//             if (!prefersReduced) {
//               gsap.from(reveals, {
//                 opacity: 0,
//                 y: 26,
//                 duration: 0.6,
//                 ease: "power2.out",
//                 stagger: 0.12,
//                 scrollTrigger: {
//                   trigger: right,
//                   start: "top 80%",
//                   end: "bottom 35%",
//                   toggleActions: "play none none reverse",
//                 },
//               });
//             }

//             // Fade handoff
//             ScrollTrigger.create({
//               trigger: section,
//               start: "bottom 45%",
//               end: "bottom 30%",
//               onLeave: () =>
//                 gsap.to(section, { opacity: 0.98, y: -10, duration: 0.32, ease: "power2.out" }),
//               onEnterBack: () =>
//                 gsap.to(section, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }),
//             });

//           });
//         },

//         // Mobile
//         "(max-width: 767px)": () => {
//           if (prefersReduced) return;

//           sections.forEach((section) => {
//             const right = section.querySelector<HTMLElement>(".svc-right")!;
//             const reveals = right.querySelectorAll<HTMLElement>(".reveal");

//             gsap.from(reveals, {
//               opacity: 0,
//               y: 18,
//               duration: 0.5,
//               ease: "power2.out",
//               stagger: 0.08,
//               scrollTrigger: {
//                 trigger: section,
//                 start: "top 85%",
//                 toggleActions: "play none none reverse",
//               },
//             });
//           });
//         },
//       },
//     ); 
//     },
//     { scope: rootRef, dependencies: [] },
//   );

//   return (
//     <section ref={rootRef} className="stackservice">
//       <div className="stackservice-header">
//         <span className="stackservice-line" aria-hidden />
//         <span className="stackservice-subtitle">SERVICES</span>
//       </div>

//       <div className="stackservice-content">
//         {services.map((svc) => (
//           <article key={svc.id} className="svc">
//             <div className="svc-left">
//               <div className="svc-title">
//                 <span className="svc-number">{"/ " + svc.num + " /"}</span>
//                 <h3 className="svc-heading">{svc.title}</h3>
//               </div>
//             </div>

//             <div className="svc-right">
//               <div className="svc-grid">
//                 {svc.images.map((img, i) => {
//                   const tall = i % 3 === 1
//                   return (
//                     <figure
//                       key={i}
//                       className={`reveal svc-figure ${tall ? "tall" : ""}`}
//                     >
//                       <img src={img.src || "/placeholder.png"} alt={img.alt} />
//                     </figure>
//                   )
//                 })}
//               </div>

//               <p className="reveal svc-body">{svc.body}</p>

//               <ul className="reveal svc-features">
//                 {svc.features.map((f, idx) => (
//                   <li key={idx}>{f}</li>
//                 ))}
//               </ul>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   )
// }


export default function StackService() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current!
      const sections = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".svc"))

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          sections.forEach((section) => {
            const left = section.querySelector<HTMLElement>(".svc-left")!
            const titleWrap = section.querySelector<HTMLElement>(".svc-title")!
            const right = section.querySelector<HTMLElement>(".svc-right")!

            const endDistance = () => {
              const base = Math.max(360, right.scrollHeight * 0.8)
              return "+=" + base
            }

            // Pin left column
            ScrollTrigger.create({
              trigger: section,
              start: "top 40%",
              end: endDistance,
              pin: left,
              pinSpacing: false,
              pinReparent: true,
              anticipatePin: 2,
              invalidateOnRefresh: true,
            })

            // Title reveal
            if (!prefersReduced) {
              gsap.fromTo(
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
            }

            // Image reveal
            const reveals = right.querySelectorAll<HTMLElement>(".reveal")
            if (!prefersReduced) {
              gsap.from(reveals, {
                opacity: 0,
                y: 26,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: {
                  trigger: right,
                  start: "top 80%",
                  end: "bottom 35%",
                  toggleActions: "play none none reverse",
                },
              })
            }

            // Subtle fade handoff
            ScrollTrigger.create({
              trigger: section,
              start: "bottom 45%",
              end: "bottom 30%",
              onLeave: () => gsap.to(section, { opacity: 0.98, y: -10, duration: 0.32, ease: "power2.out" }),
              onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }),
            })
          })
        },

        // Mobile fallback
        "(max-width: 767px)": () => {
          if (prefersReduced) return
          sections.forEach((section) => {
            const right = section.querySelector<HTMLElement>(".svc-right")!
            const reveals = right.querySelectorAll<HTMLElement>(".reveal")
            gsap.from(reveals, {
              opacity: 0,
              y: 18,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            })
          })
        },
      })
    },
    { scope: rootRef, dependencies: [] },
  )

  return (
    <section ref={rootRef} className="stackservice">
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
                      <img src={img.src || "/placeholder.svg"} alt={img.alt} />
                    </figure>
                  )
                })}
              </div>

              <p className="reveal svc-body">{svc.body}</p>

              <ul className="reveal svc-features">
                {svc.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}