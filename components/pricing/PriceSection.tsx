
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./price.css";

gsap.registerPlugin(ScrollTrigger);

export default function LayeredPinning() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
  const panels = gsap.utils.toArray<HTMLElement>(".panel");

  panels.forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
      scroller: containerRef.current, // 👈 local scroll context
    });
  });

  // Page snapping — only inside this wrapper
  ScrollTrigger.create({
    scroller: containerRef.current, // 👈 local scroller
    snap: 1 / panels.length,
  });
}, { scope: containerRef });


  return (
    <div ref={containerRef} className="wrapper">
      <div className="description panel blue">
        <div>
          <h1>Layered pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down
            <div className="arrow"></div>
          </div>
        </div>
      </div>

      <section className="panel red">ONE</section>
      <section className="panel orange">TWO</section>
      <section className="panel purple">THREE</section>
      <section className="panel green">FOUR</section>

    
    </div>
  );
}
