"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./loader.css"; // App Router: fine. Pages Router: import in _app.tsx.

gsap.registerPlugin(useGSAP);

/* ──────────────────────────────────────────────────────────────────────────
   PageLoader — [ | ] → [ meeno | ] → site reveals

   TIMELINE (≈ 2.4s on a fast connection)
   0.0s  brackets "breathe" around a blinking cursor (while the page loads)
   1.0s  brackets settle · cursor goes solid · "m-e-e-n-o" types in; the
         brackets are pushed outward to make room
   ~1.8s cursor blinks once, then folds away
   ~2.3s brackets fly outward, word fades, the screen slides up → site

   The reveal waits for TWO things:
     1) a minimum "breath" time (so it never flashes by), and
     2) the page `load` event + fonts ready (so the site is really there),
        but never longer than MAX_WAIT_MS (so a slow asset can't trap users).
   ────────────────────────────────────────────────────────────────────────── */

const WORD = "meeno";
const BREATH_MS = 1000; // minimum time brackets breathe before the word types
const MAX_WAIT_MS = 6000; // hard cap: never keep the loader up longer than this
const STORAGE_KEY = "meeno-loader"; // sessionStorage flag → show once per tab session

type Props = {
  /** Show only on the first visit of a session. Set false to show on every full load. */
  once?: boolean;
};

/* Left / right bracket. The 12×100 drawing is stretched by CSS
   (preserveAspectRatio="none") so one path fits any size. */
function Bracket({ side }: { side: "l" | "r" }) {
  return (
    <svg
      className={`loader__bracket loader__bracket--${side}`}
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path d={side === "l" ? "M12 1.5H1.5V98.5H12" : "M0 1.5H10.5V98.5H0"} />
    </svg>
  );
}

export default function PageLoader({ once = true }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false); // when true the overlay is removed from the DOM

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;

      // Already seen this session → skip everything.
      if (once) {
        try {
          if (sessionStorage.getItem(STORAGE_KEY)) {
            setDone(true);
            return;
          }
        } catch {
          /* storage blocked (private mode etc.) → just show the loader */
        }
      }

      html.classList.add("is-loading"); // locks page scroll (see CSS)

      // Grab the pieces we animate (selector is scoped to this component).
      const q = gsap.utils.selector(el);
      const brackets = q(".loader__bracket");
      const letters = q(".loader__letter") as HTMLElement[];
      const glyphs = q(".loader__glyph");
      const cursor = q(".loader__cursor")[0] as HTMLElement;
      const word = q(".loader__word")[0];

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) el.classList.add("is-static"); // show final [meeno], no motion

      /* ── Housekeeping ─────────────────────────────────────────────────── */
      let cancelled = false; // set on unmount / React strict-mode re-run
      const timers: number[] = [];
      const wait = (ms: number) =>
        new Promise<void>((resolve) => {
          timers.push(window.setTimeout(resolve, ms));
        });

      // Runs once the loader is fully finished: unlock scroll, remember, remove.
      const finish = () => {
        html.classList.remove("is-loading");
        try {
          if (once) sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setDone(true);
      };

      /* ── PHASE 1: breathing (starts immediately) ──────────────────────── */
      // Brackets drift apart and back (xPercent = % of their own width, so it
      // scales with the loader) while shrinking slightly — like a breath.
      const breath = reduce
        ? null
        : gsap.to(brackets, {
            xPercent: (i: number) => (i === 0 ? -60 : 60),
            scaleY: 0.9,
            duration: 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

      /* ── READY GATE: page loaded + fonts ready (capped) ──────────────── */
      const pageLoaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") return resolve();
        window.addEventListener("load", () => resolve(), { once: true });
      });
      const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
      const siteReady = Promise.race([Promise.all([pageLoaded, fontsReady]), wait(MAX_WAIT_MS)]);

      /* ── PHASE 2 + 3: type the word, then exit ─────────────────────────── */
      Promise.all([siteReady, wait(reduce ? 300 : BREATH_MS)]).then(() => {
        if (cancelled) return;

        // Reduced motion: [meeno] is already on screen — just fade out.
        if (reduce) {
          gsap.to(el, { opacity: 0, duration: 0.25, delay: 0.4, onComplete: finish });
          return;
        }

        breath?.kill();

        // Measure each letter's natural width NOW (fonts are ready, so the
        // numbers are right), then hide the glyphs below their clip boxes.
        const widths = letters.map((l) => l.scrollWidth);
        gsap.set(glyphs, { yPercent: 100 });

        const tl = gsap.timeline({ onComplete: finish });

        tl
          // settle the brackets back to rest
          .to(brackets, { xPercent: 0, scaleY: 1, duration: 0.25, ease: "power2.out" })

          // cursor stays solid while typing
          .add(() => cursor.classList.add("is-solid"))

          // each letter's box grows to its width (pushes the right bracket out)…
          .to(letters, {
            width: (i: number) => widths[i],
            duration: 0.2,
            ease: "power2.out",
            stagger: 0.09,
          })
          // …while its glyph slides up into view, in step ("<" = same start)
          .to(
            glyphs,
            { yPercent: 0, duration: 0.2, ease: "power2.out", stagger: 0.09 },
            "<",
          )

          // typing done → cursor blinks again for a beat
          .add(() => cursor.classList.remove("is-solid"))
          .to({}, { duration: 0.5 }) // hold

          // cursor folds away so [meeno] ends up perfectly centred
          .add(() => cursor.classList.add("is-solid"))
          .to(cursor, { width: 0, marginLeft: 0, opacity: 0, duration: 0.2 })

          /* ── EXIT ─────────────────────────────────────────────────────── */
          .addLabel("exit")
          .to(
            brackets,
            {
              xPercent: (i: number) => (i === 0 ? -120 : 120),
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
            },
            "exit",
          )
          .to(word, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, "exit")
          // the whole overlay slides up, revealing the site
          .to(el, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "exit+=0.15");
      });

      /* ── CLEANUP (unmount / strict-mode re-run) ───────────────────────── */
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
        html.classList.remove("is-loading");
      };
    },
    { scope: root, dependencies: [once] },
  );

  if (done) return null;

  return (
    <div ref={root} className="loader" role="status" aria-live="polite">
      <span className="loader__sr">Loading meeno</span>

      {/* Decorative visual — hidden from screen readers (the line above speaks for it) */}
      <div className="loader__stage" aria-hidden="true">
        <Bracket side="l" />
        <span className="loader__word">
          {WORD.split("").map((ch, i) => (
            <span className="loader__letter" key={i}>
              <span className="loader__glyph">{ch}</span>
            </span>
          ))}
          <span className="loader__cursor" />
        </span>
        <Bracket side="r" />
      </div>

      {/* No JS = no animation to wait for → never trap visitors behind the overlay. */}
      <noscript>
        <style>{`.loader{display:none}`}</style>
      </noscript>
    </div>
  );
}
