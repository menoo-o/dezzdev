"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import { useRef } from "react"
import "./rolling.css"

export default function RollingText() {
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(SplitText)

    const repeatCount = 8
    const heading = stageRef.current?.querySelector("h1")

    if (!heading) return

    const tl = gsap.timeline({ paused: true })
    const split = new SplitText(heading, { type: "chars" })

    split.chars.forEach((obj: any, i: number) => {
      const txt = obj.innerText
      const cloneHTML = `<div class="cloneText">${txt}</div>`
      const newHTML = `<div class="originalText">${txt}</div>${cloneHTML}`
      obj.innerHTML = newHTML

      // Move clone upward or downward depending on even/odd index
      gsap.set(obj.childNodes[1], { yPercent: i % 2 === 0 ? -100 : 100 })

      // Animate both (original + clone)
      const tween = gsap.to(obj.childNodes, {
        repeat: repeatCount,
        ease: "none",
        yPercent: i % 2 === 0 ? "+=100" : "-=100",
      })
      tl.add(tween, 0)
    })

    gsap.to(tl, { progress: 1, duration: 4, ease: "power4.inOut" })
  }, [])

  return (
    <div className="stage" ref={stageRef}>
      <h1>dezzdev</h1>
    </div>
  )
}
