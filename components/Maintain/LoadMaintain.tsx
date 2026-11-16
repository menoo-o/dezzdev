"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   ComingSoon (light version) — ONE file: Tailwind markup + inline keyframes
   + two tiny hooks. No logo; the giant ghost brackets are the brand mark.

   Use:   // app/page.tsx
          import ComingSoon from "@/components/ComingSoon";
          export default function Home() { return <ComingSoon />; }

   `fixed inset-0` + a very high z-index → it covers whatever the layout
   renders around it (navbar, etc.).
   ────────────────────────────────────────────────────────────────────────── */

/* ═══ EDIT ME ═══════════════════════════════════════════════════════════ */
const OLD_NAME = "DezzDev";
const NEW_NAME = ""; // "" keeps the teaser [ ??? ] — put the new name here on reveal day
const CONTACT_EMAIL = ""; // e.g. "hello@yourdomain.com" ("" hides the line)
const SHOW_TEASER = true; // the "DezzDev → [ ??? ]" line

const HEADLINE = "Something new is";
const HEADLINE_ACCENT = "cooking.";
// Funny default. To use the plainer line from your mockup instead:
// "We’re working on something awesome. Please check back soon!"
const SUB = `${OLD_NAME} has left the building. The new thing is still in the oven — please don’t open the door.`;

const STATUS_LINES = [
  "centering a div",
  "arguing with CSS",
  "naming the new thing",
  "deleting the old site",
  "adding more brackets",
  "hand-coding, no templates",
  "pretending to be done",
  "drinking coffee no. 4",
];

// Only for when this is shown on a NON-home route (e.g. /coming-soon).
const SHOW_HOME_LINK = false;
/* ═══════════════════════════════════════════════════════════════════════ */

const CSS = `
.cook-root{
  --c-paper:var(--color-paper,#fffafa);--c-ink:var(--color-ink,#192420);
  --c-smoke:var(--color-smoke,#586660);--c-pop:var(--color-pop,#00ca85);
  --c-popd:var(--color-pop-dark,#006b46);--c-line:var(--color-line,#1924202b);
}
/* soft mint blobs in two corners */
.cook-blob{position:absolute;border-radius:9999px;pointer-events:none;
  background:radial-gradient(circle at 35% 35%,rgba(0,202,133,.22),rgba(0,202,133,.07) 55%,transparent 72%)}
/* giant ghost brackets: thick pale stroke + a thin inner line for depth */
.cook-ghost{position:absolute;top:50%;transform:translateY(-50%);pointer-events:none;overflow:visible;
  width:clamp(3rem,9vw,9rem);height:min(55vh,34rem)}
.cook-ghost--l{left:2vw;animation:cook-drift-l 6s ease-in-out infinite}
.cook-ghost--r{right:2vw;animation:cook-drift-r 6s ease-in-out infinite}
.cook-ghost .outer{fill:none;stroke:rgba(0,202,133,.11);stroke-width:clamp(1.5rem,3.6vw,3.5rem);vector-effect:non-scaling-stroke}
.cook-ghost .inner{fill:none;stroke:rgba(0,202,133,.3);stroke-width:2px;vector-effect:non-scaling-stroke}
@keyframes cook-drift-l{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-50%) translateX(-1.2vw)}}
@keyframes cook-drift-r{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-50%) translateX(1.2vw)}}
/* chef hat */
.cook-float{animation:cook-float 3.2s ease-in-out infinite}
@keyframes cook-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.cook-spark{transform-box:fill-box;transform-origin:center;animation:cook-spark 1.8s ease-in-out infinite}
@keyframes cook-spark{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.7)}}
/* status dot, cursor, bouncing dots */
.cook-dot{animation:cook-pulse 1.8s ease-in-out infinite}
@keyframes cook-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
.cook-cursor{animation:cook-blink 1s steps(1) infinite}
@keyframes cook-blink{50%{opacity:0}}
.cook-bounce{display:inline-block;animation:cook-bounce 1.2s ease-in-out infinite}
@keyframes cook-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-.35em)}}
.cook-wiggle{display:inline-block;animation:cook-wiggle 2.4s ease-in-out infinite}
@keyframes cook-wiggle{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@media (prefers-reduced-motion:reduce){
  .cook-ghost--l,.cook-ghost--r,.cook-float,.cook-spark,.cook-dot,.cook-cursor,.cook-bounce,.cook-wiggle{animation:none}
}
`;

/* ── Hooks ────────────────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

/* Types a line, holds it, deletes it, next line — forever. */
function useTyped(lines: string[], reduce: boolean) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const text = lines[line];
    let delay = deleting ? 35 : 70;
    if (!deleting && chars === text.length) delay = 1300; // hold the full line
    if (deleting && chars === 0) delay = 250; // pause between lines

    const id = window.setTimeout(() => {
      if (!deleting && chars === text.length) setDeleting(true);
      else if (deleting && chars === 0) {
        setDeleting(false);
        setLine((l) => (l + 1) % lines.length);
      } else setChars((c) => c + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [chars, deleting, line, lines, reduce]);

  return reduce ? lines[0] : lines[line].slice(0, chars);
}

/* ── Chef hat (original SVG): puffy top, band, two fold lines, sparks ───── */
function ChefHat() {
  return (
    <svg
      viewBox="0 0 200 180"
      className="w-[clamp(4.5rem,8vw,7rem)] overflow-visible min-[1920px]:w-32 min-[2560px]:w-40"
      aria-hidden="true"
      focusable="false"
    >
      {/* soft glow + floor shadow */}
      <ellipse cx="100" cy="112" rx="82" ry="40" fill="rgba(0,202,133,.14)" />
      <ellipse cx="100" cy="168" rx="58" ry="6" fill="rgba(25,36,32,.08)" />

      <g className="cook-float">
        {/* mint offset layer (gives the flat "printed" look) */}
        <path
          d="M68 124C44 118 36 86 58 72C56 46 88 34 106 46C124 32 156 46 154 72C176 86 168 118 144 124Z"
          fill="rgba(0,202,133,.28)"
        />
        {/* puffy top */}
        <path
          d="M62 118C38 112 30 80 52 66C50 40 82 28 100 40C118 26 150 40 148 66C170 80 162 112 138 118Z"
          fill="#fffafa"
          stroke="#192420"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* band */}
        <path
          d="M62 118L66 150Q100 160 134 150L138 118"
          fill="#fffafa"
          stroke="#192420"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* fold lines */}
        <path d="M82 90L85 108M118 90L115 108" stroke="#192420" strokeWidth="5" strokeLinecap="round" />
        {/* sparks */}
        <g stroke="#00ca85" strokeWidth="4" strokeLinecap="round">
          <path className="cook-spark" d="M158 34L162 20" />
          <path className="cook-spark" style={{ animationDelay: ".3s" }} d="M172 48L186 38" />
          <path className="cook-spark" style={{ animationDelay: ".6s" }} d="M178 66L194 64" />
        </g>
      </g>
    </svg>
  );
}

/* Giant ghost bracket (the only "logo" on the page). */
function GhostBracket({ side }: { side: "l" | "r" }) {
  const outer = side === "l" ? "M120 8H12V392H120" : "M0 8H108V392H0";
  const inner = side === "l" ? "M120 36H40V364H120" : "M0 36H80V364H0";
  return (
    <svg
      className={`cook-ghost cook-ghost--${side}`}
      viewBox="0 0 120 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="outer" d={outer} />
      <path className="inner" d={inner} />
    </svg>
  );
}

export default function ComingSoon() {
  const reduce = usePrefersReducedMotion();
  const typed = useTyped(STATUS_LINES, reduce);
  const longest = Math.max(...STATUS_LINES.map((l) => l.length));

  return (
    <>
      <style>{CSS}</style>

      <main
        role="status"
        className="cook-root fixed inset-0 z-[10000] flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden bg-[color:var(--c-paper)] px-6 py-8 text-[color:var(--c-ink)]"
      >
        {/* Screen readers get one calm sentence instead of the typing show. */}
        <span className="sr-only">{OLD_NAME} is cooking something new. Check back soon.</span>

        {/* decorative background: blobs + giant brackets */}
        <span aria-hidden="true" className="cook-blob -right-24 -top-24 h-72 w-72 sm:h-96 sm:w-96" />
        <span aria-hidden="true" className="cook-blob -bottom-40 -left-32 h-80 w-80 sm:h-[30rem] sm:w-[30rem]" />
        <GhostBracket side="l" />
        <GhostBracket side="r" />

        {/* top: status chip (no logo) */}
        <p
          aria-hidden="true"
          className="relative flex items-center gap-2 rounded-full border border-[color:var(--c-line)] bg-white/60 px-4 py-1.5 text-xs font-medium sm:text-sm"
        >
          <span className="cook-dot h-2 w-2 rounded-full bg-[color:var(--c-pop)]" />
          Status: <span className="text-[color:var(--c-popd)]">Cooking</span>
        </p>

        {/* middle */}
        <div
          aria-hidden="true"
          className="relative flex w-full max-w-3xl flex-col items-center gap-5 py-8 text-center sm:gap-6"
        >
          <ChefHat />

          <h1 className="text-balance text-[clamp(2.25rem,6.5vw+0.5rem,5.25rem)] font-extrabold leading-[1] tracking-tight min-[1920px]:text-[6.5rem] min-[2560px]:text-[8.5rem]">
            {HEADLINE}{" "}
            <span className="text-[color:var(--c-popd)]">{HEADLINE_ACCENT}</span>
          </h1>

          <p className="mx-auto max-w-lg text-[clamp(1rem,0.5vw+0.9rem,1.375rem)] leading-relaxed text-[color:var(--c-smoke)] min-[1920px]:max-w-2xl min-[1920px]:text-2xl">
            {SUB}
          </p>

          {SHOW_TEASER && (
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-sm sm:text-base">
              <span className="line-through opacity-50">{OLD_NAME}</span>
              <span className="opacity-60">→</span>
              <span className="cook-wiggle text-[color:var(--c-popd)]">[ {NEW_NAME || "???"} ]</span>
            </p>
          )}

          {/* typed funny status */}
          <p className="flex items-center justify-center gap-2 font-mono text-sm text-[color:var(--c-smoke)] sm:text-base">
            <span className="opacity-70">currently ›</span>
            <span
              className="inline-flex items-center whitespace-nowrap text-left text-[color:var(--c-ink)]"
              style={{ minWidth: `min(${longest}ch, 60vw)` }}
            >
              {typed}
              {!reduce && (
                <span className="cook-cursor ml-[0.12em] inline-block h-[1em] w-[0.12em] bg-[color:var(--c-popd)]" />
              )}
            </span>
          </p>

          {CONTACT_EMAIL && (
            <p className="text-sm sm:text-base">
              Impatient?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[color:var(--c-popd)] underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--c-popd)]"
              >
                Email me
              </a>{" "}
              and I’ll tell you first.
            </p>
          )}

          {SHOW_HOME_LINK && (
            <a
              href="/"
              className="mt-2 inline-flex h-12 items-center gap-2 rounded-full border-2 border-[color:var(--c-pop)] px-6 text-sm font-medium transition-colors hover:bg-[color:var(--c-pop)]/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--c-popd)] sm:text-base"
            >
              Back to Home
            </a>
          )}
        </div>

        {/* bottom: wait for it... */}
        <p
          aria-hidden="true"
          className="relative font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--c-smoke)] sm:text-sm"
        >
          wait for it
          {[0, 1, 2].map((i) => (
            <span key={i} className="cook-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
              .
            </span>
          ))}
        </p>
      </main>
    </>
  );
}