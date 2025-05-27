"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Component() {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Animate progress bar width
    tl.to(progressBarRef.current, {
      width: "45%",
      duration: 3,
      ease: "power2.out",
    })

      // Animate percentage counter
      .to(
        percentageRef.current,
        {
          innerHTML: 45,
          duration: 3,
          ease: "power2.out",
          snap: { innerHTML: 1 },
        },
        "<",
      ) // Start at the same time as progress bar

      // Add a subtle pulse effect that repeats
      .to(progressBarRef.current, {
        opacity: 0.7,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Logo top left */}
      <div className="absolute top-6 left-6 z-10">
        <div className="w-12 h-12 border-2 border-green-400 flex items-center justify-center">
          <span className="text-green-400 font-bold text-lg">DD</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* ASCII art style construction */}
        <div className="text-yellow-400 text-xs mb-8 text-center font-mono leading-tight">
          <pre>{`
    ___________________
   |  UNDER CONSTRUCTION  |
   |_____________________|
          |       |
          |   🚧  |
          |_______|
             | |
             |_|
          `}</pre>
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-green-400 mb-4 tracking-wider">DEZZDEV</h1>
          <div className="text-yellow-400 text-xl md:text-2xl mb-2">[ SYSTEM INITIALIZING... ]</div>
          <div className="text-green-300 text-lg">Website Under Construction</div>
        </div>

        {/* Loading bar animation */}
        <div className="w-full max-w-md mb-8">
          <div className="text-green-400 text-sm mb-2">Building Progress:</div>
          <div className="w-full bg-gray-800 h-4 border border-green-400">
            <div ref={progressBarRef} className="bg-green-400 h-full" style={{ width: "0%" }}>
              <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400" />
            </div>
          </div>
          <div className="text-green-300 text-xs mt-1">
            <span ref={percentageRef}>0</span>% Complete
          </div>
        </div>

        {/* Status messages */}
        <div className="text-center space-y-2 mb-8">
          <div className="text-green-300">{">"} Compiling awesome features...</div>
          <div className="text-green-300">{">"} Optimizing user experience...</div>
          <div className="text-green-300">{">"} Deploying creativity...</div>
        </div>

        {/* Retro terminal style message */}
        <div className="bg-gray-900 border border-green-400 p-6 max-w-2xl w-full">
          <div className="text-green-400 text-sm mb-2">SYSTEM MESSAGE:</div>
          <div className="text-green-300 text-sm leading-relaxed">
            Welcome to DezzDev! Our digital workshop is currently under construction. We are crafting something
            extraordinary that will blow your mind. Stay tuned for an epic launch!
          </div>
          <div className="text-yellow-400 text-xs mt-4">Expected completion: Soon™</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-8 text-green-400 text-2xl animate-pulse">_</div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-green-600 text-xs">
        © 2025 DezzDev - Powered by DezzDev
      </div>

      {/* Animated scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-5 animate-pulse"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px)",
            animation: "scanlines 2s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  )
}
