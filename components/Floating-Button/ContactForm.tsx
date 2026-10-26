"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOverlay } from "@/stores/useOverlay";
import "./cf.css";

gsap.registerPlugin(useGSAP);

const SERVICES = [
  "UGC",
  "Brand Photography",
  "Short-Form Video",
  "Content Strategy",
  "Identity",
  "Account Management",
  "Other",
];

const BUDGETS = ["Under $500", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k+"];

export default function ContactOverlay() {
  const { isContactOpen, closeContact } = useOverlay();

  const overlayRootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Interactive pill states (Multi-select for services, Single-select for budget)
  const [selectedServices, setSelectedServices] = useState<string[]>(["Other"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  // Build the reversible GSAP timeline once
  useGSAP(
    () => {
      const root = overlayRootRef.current;
      const backdrop = backdropRef.current;
      const sheet = sheetRef.current;
      if (!root || !backdrop || !sheet) return;

      // Initial hidden state
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(sheet, { yPercent: 105 });

      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
          document.body.style.overflow = "";
        },
      });

      // Step 1: Enable container & dim/blur the background FIRST
      tl.set(root, { autoAlpha: 1, pointerEvents: "auto" })
        .to(backdrop, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        })
        // Step 2: Slowly slide the form sheet up from the bottom
        .to(
          sheet,
          {
            yPercent: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.1" // Slight overlap after dim begins
        );

      tlRef.current = tl;
    },
    { scope: overlayRootRef }
  );

  // Play or reverse when `isContactOpen` changes
  useGSAP(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isContactOpen) {
      document.body.style.overflow = "hidden"; // Lock page scroll behind modal
      tl.play();
    } else {
      tl.reverse(); // Reverses: Form slides down -> Backdrop unblurs/undims
    }
  }, [isContactOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Intentionally does nothing for now!
  };

  return (
    <div ref={overlayRootRef} className="contact-overlay-root" aria-hidden={!isContactOpen}>
      {/* Dim & Blur Backdrop */}
      <div
        ref={backdropRef}
        className="contact-backdrop"
        onClick={closeContact}
      />

      {/* Sliding Form Sheet */}
      <div ref={sheetRef} className="contact-sheet no-scrollbar">
        {/* Top-Right Close Button */}
        <button
          type="button"
          className="contact-close-btn"
          onClick={closeContact}
          aria-label="Close contact form"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="contact-heading">
          <span className="heading-muted">Get in</span>{" "}
          <span className="heading-bold">touch</span>
        </h2>

        {/* Form Body */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-bento-grid">
            {/* Row 1, Col 1: Full Name */}
            <label className="bento-card bento-input-card">
              <span className="bento-label">Full name</span>
              <input
                type="text"
                placeholder="Fiona Wong"
                className="bento-input"
              />
            </label>

            {/* Row 1, Col 2: Email */}
            <label className="bento-card bento-input-card">
              <span className="bento-label">Email</span>
              <input
                type="email"
                placeholder="fionawong@gmail.com"
                className="bento-input"
              />
            </label>

            {/* Row 1, Col 3: Company */}
            <label className="bento-card bento-input-card">
              <span className="bento-label">Company</span>
              <input
                type="text"
                placeholder="Fifi Vintage"
                className="bento-input"
              />
            </label>

            {/* Row 2, Col 1: Project Details */}
            <label className="bento-card bento-textarea-card">
              <span className="bento-label">Project details</span>
              <textarea
                placeholder="Tell me your goals"
                className="bento-textarea no-scrollbar"
              />
            </label>

            {/* Row 2, Col 2: Services Pill Selector */}
            <div className="bento-card bento-pills-card">
              <span className="bento-label">What can I do for you?</span>
              <div className="pills-container">
                {SERVICES.map((service) => {
                  const isActive = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`choice-pill ${isActive ? "is-active" : ""}`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2, Col 3: Budget Pill Selector */}
            <div className="bento-card bento-pills-card">
              <span className="bento-label">Do you have a budget range?</span>
              <div className="pills-container">
                {BUDGETS.map((budget) => {
                  const isActive = selectedBudget === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setSelectedBudget(budget)}
                      className={`choice-pill ${isActive ? "is-active" : ""}`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating Bottom-Center Submit Pill */}
          {/* <div className="contact-submit-wrapper">
            <button type="submit" className="contact-submit-btn">
              <span className="submit-icon-circle">
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
              <span className="submit-text">Submit</span>
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}