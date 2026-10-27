"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./float.css";
import { useOverlay } from "@/stores/useOverlay";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---- Tuning knobs ------------------------------------------------------ */
const DOCK_ENTER = 80;      // px scrolled before the button may dock right
const CENTER_EXIT = 12;     // px from top before it may return to center
const DOCK_DELAY = 140;     // ms the "dock" intent must hold before acting
const CENTER_DELAY = 280;   // ms the "return" intent must hold (slower on purpose)
const MAX_VELOCITY = 900;   // px/s - while scrolling faster than this, wait
const UNLOCK_DELAY = 150;   // ms after scrolling stops before clicks work again
const MIN_DURATION = 0.5;   // s - shortest slide (partial / reversed moves)
const MAX_DURATION = 0.95;  // s - full slide

export default function FloatingBtn() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isActionLockedRef = useRef<boolean>(false);

  const { isContactOpen, openContact } = useOverlay();
  const isOpenRef = useRef(isContactOpen);
  isOpenRef.current = isContactOpen;

  const calcCenterOffset = (wrapper: HTMLDivElement) => {
    const currentX = (gsap.getProperty(wrapper, "x") as number) || 0;
    const rect = wrapper.getBoundingClientRect();
    const naturalRightEdge = rect.right - currentX;
    const rightGutter = window.innerWidth - naturalRightEdge;
    return -(window.innerWidth / 2 - rect.width / 2 - rightGutter);
  };

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const btn = btnRef.current;
      if (!wrapper || !btn) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let isDockedRight = window.scrollY > DOCK_ENTER;
      let intentTimer: ReturnType<typeof setTimeout> | undefined;
      let intent: boolean | null = null;
      let unlockTimer: ReturnType<typeof setTimeout> | undefined;

      const setLocked = (locked: boolean) => {
        if (isActionLockedRef.current === locked) return;
        isActionLockedRef.current = locked;
        btn.classList.toggle("is-scrolling", locked);
      };

      const scheduleUnlock = () => {
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(() => {
          if (!gsap.isTweening(wrapper)) setLocked(false);
        }, UNLOCK_DELAY);
      };

      gsap.set(wrapper, { x: isDockedRight ? 0 : calcCenterOffset(wrapper) });

      const slideTo = (dockRight: boolean) => {
        if (isDockedRight === dockRight) return;
        isDockedRight = dockRight;

        const targetX = dockRight ? 0 : calcCenterOffset(wrapper);

        if (reduceMotion) {
          gsap.set(wrapper, { x: targetX });
          return;
        }

        const currentX = gsap.getProperty(wrapper, "x") as number;
        const full = Math.abs(calcCenterOffset(wrapper)) || 1;
        const remaining = Math.abs(targetX - currentX);
        const duration = gsap.utils.clamp(
          MIN_DURATION,
          MAX_DURATION,
          MAX_DURATION * (remaining / full)
        );

        setLocked(true);
        gsap.to(wrapper, {
          x: targetX,
          duration,
          ease: "power2.inOut",
          overwrite: "auto",
          onComplete: scheduleUnlock,
        });
      };

      const clearIntent = () => {
        clearTimeout(intentTimer);
        intent = null;
      };

      const desiredState = (scroll: number) => {
        if (isDockedRight) return scroll > CENTER_EXIT;
        return scroll >= DOCK_ENTER;
      };

      const commitWhenCalm = (trigger: ScrollTrigger, target: boolean) => {
        if (desiredState(trigger.scroll()) !== target) {
          clearIntent();
          return;
        }
        if (Math.abs(trigger.getVelocity()) > MAX_VELOCITY) {
          intentTimer = setTimeout(() => commitWhenCalm(trigger, target), 100);
          return;
        }
        clearIntent();
        slideTo(target);
      };

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          // Pause all scroll-docking while modal overlay is open
          if (isOpenRef.current) return;

          if (Math.abs(self.getVelocity()) > 0) setLocked(true);
          scheduleUnlock();

          const target = desiredState(self.scroll());

          if (target === isDockedRight) {
            if (intent !== null) clearIntent();
            return;
          }

          if (intent === target) return;

          clearTimeout(intentTimer);
          intent = target;
          intentTimer = setTimeout(
            () => commitWhenCalm(self, target),
            target ? DOCK_DELAY : CENTER_DELAY
          );
        },
      });

      const handleResize = () => {
        gsap.killTweensOf(wrapper);
        if (isOpenRef.current) {
          gsap.set(wrapper, { x: calcCenterOffset(wrapper) });
        } else {
          gsap.set(wrapper, { x: isDockedRight ? 0 : calcCenterOffset(wrapper) });
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(intentTimer);
        clearTimeout(unlockTimer);
        window.removeEventListener("resize", handleResize);
        trigger.kill();
        gsap.killTweensOf(wrapper);
      };
    },
    { scope: wrapperRef }
  );

  // Transition button to center when Contact Overlay opens, return when closed
  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    requestAnimationFrame(() => {
      if (isContactOpen) {
        gsap.to(wrapper, {
          x: calcCenterOffset(wrapper),
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        const shouldDockRight = window.scrollY > DOCK_ENTER;
        gsap.to(wrapper, {
          x: shouldDockRight ? 0 : calcCenterOffset(wrapper),
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
  }, [isContactOpen]);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isActionLockedRef.current || ScrollTrigger.isScrolling()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!isContactOpen) {
      e.preventDefault();
      openContact();
    }
    // When open, the native form="dezz-contact-form" handles form submission
  };

  return (
    <div ref={wrapperRef} className="floating-btn-wrapper">
      <button
        ref={btnRef}
        className={`floating-btn ${isContactOpen ? "is-submit-mode" : ""}`}
        type={isContactOpen ? "submit" : "button"}
        form={isContactOpen ? "dezz-contact-form" : undefined}
        onClick={handleBtnClick}
      >
        <span className="floating-btn-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </span>
        <span className="floating-btn-text">
          {isContactOpen ? "Submit H" : "Contact"}
        </span>
      </button>
    </div>
  );
}