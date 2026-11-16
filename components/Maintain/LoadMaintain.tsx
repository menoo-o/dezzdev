"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   ComingSoon — ONE file: markup (Tailwind) + keyframes (inline <style>) +
   the small typing / counting hooks. No other files needed.

   Use:   // app/page.tsx
          import ComingSoon from "@/components/ComingSoon";
          export default function Home() { return <ComingSoon />; }

   It is `fixed inset-0` with a very high z-index, so it covers whatever the
   layout renders around it (navbar, etc.).
   ────────────────────────────────────────────────────────────────────────── */

/* ═══ EDIT ME ═══════════════════════════════════════════════════════════ */
const OLD_NAME = "DezzDev";
const NEW_NAME = ""; // "" keeps the teaser [ ??? ] — type the new name here on reveal day
const CONTACT_EMAIL = ""; // e.g. "hello@yourdomain.com" ("" hides the line)

const HEADLINE = "Something new is";
const HEADLINE_ACCENT = "cooking."; // shown in the accent colour
const SUB = `${OLD_NAME} has left the building. The new thing is still in the oven — please don’t open the door.`;

// The typed lines inside the brackets. Add / remove / rewrite freely.
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

const PROGRESS = 97; // it never reaches 100%. That's the joke.
/* ═══════════════════════════════════════════════════════════════════════ */

/* Keyframes and the SVG bracket styling (Tailwind can't express these). */
const CSS = `
.cook-bracket{flex:none;overflow:visible}
.cook-bracket path{fill:none;stroke:currentColor;stroke-width:.075em;vector-effect:non-scaling-stroke}
.cook-bracket--l{animation:cook-breathe-l 1.8s ease-in-out infinite}
.cook-bracket--r{animation:cook-breathe-r 1.8s ease-in-out infinite}
@keyframes cook-breathe-l{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(-120%) scaleY(.9)}}
@keyframes cook-breathe-r{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(120%) scaleY(.9)}}
.cook-cursor{animation:cook-blink 1s steps(1) infinite}
@keyframes cook-blink{50%{opacity:0}}
.cook-dot{animation:cook-pulse 1.8s ease-in-out infinite}
@keyframes cook-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
.cook-bounce{display:inline-block;animation:cook-bounce 1.2s ease-in-out infinite}
@keyframes cook-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-.35em)}}
.cook-wiggle{display:inline-block;animation:cook-wiggle 2.4s ease-in-out infinite}
@keyframes cook-wiggle{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.cook-fill{position:relative;overflow:hidden}
.cook-fill::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,250,250,.55),transparent);animation:cook-sheen 1.6s ease-in-out infinite}
@keyframes cook-sheen{from{transform:translateX(-100%)}to{transform:translateX(260%)}}
@media (prefers-reduced-motion:reduce){
  .cook-bracket--l,.cook-bracket--r,.cook-cursor,.cook-dot,.cook-bounce,.cook-wiggle,.cook-fill::after{animation:none}
}
`;

/* ── Small hooks ──────────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

/* Types a line, holds it, deletes it, moves to the next — forever. */
function useTyped(lines: string[], reduce: boolean) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const text = lines[line];
    let delay = deleting ? 35 : 70; // per character
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

/* Counts 0 → target with an ease-out. */
function useCountTo(target: number, ms: number, reduce: boolean) {
  const [value, setValue] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduce]);
  return value;
}

/* Same bracket drawing as the logo: a 12×100 box stretched by CSS. */
function Bracket({ side }: { side: "l" | "r" }) {
  return (
    <svg
      className={`cook-bracket cook-bracket--${side} h-[1.2em] w-[0.34em] text-[color:var(--color-pop,#00ca85)]`}
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={side === "l" ? "M12 1.5H1.5V98.5H12" : "M0 1.5H10.5V98.5H0"} />
    </svg>
  );
}

export default function ComingSoon() {
  const reduce = usePrefersReducedMotion();
  const typed = useTyped(STATUS_LINES, reduce);
  const pct = useCountTo(PROGRESS, 3200, reduce);
  const longest = Math.max(...STATUS_LINES.map((l) => l.length));

  return (
    <>
      <style>{CSS}</style>

      <main
        role="status"
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-between overflow-y-auto bg-[color:var(--color-ink,#192420)] px-6 py-8 text-[color:var(--color-paper,#fffafa)]"
      >
        {/* Screen readers get one calm sentence instead of the typing show. */}
        <span className="sr-only">
          {OLD_NAME} is cooking something new. Check back soon.
        </span>

        {/* top: status chip */}
        <p
          aria-hidden="true"
          className="flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--color-pop,#00ca85)] sm:text-xs"
        >
          <span className="cook-dot h-2 w-2 rounded-full bg-current" />
          Status: cooking
        </p>

        {/* middle */}
        <div
          aria-hidden="true"
          className="flex w-full max-w-3xl flex-col items-center gap-8 text-center sm:gap-10"
        >
          {/* the hook */}
          <h1 className="text-balance text-[clamp(2.25rem,7vw+0.5rem,5.5rem)] font-extrabold leading-[0.95] tracking-tight min-[1920px]:text-[7rem] min-[2560px]:text-[9rem]">
            {HEADLINE}{" "}
            <span className="text-[color:var(--color-pop,#00ca85)]">{HEADLINE_ACCENT}</span>
          </h1>

          {/* old name crossed out → the new one is a secret */}
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-sm sm:text-base min-[1920px]:text-xl">
            <span className="line-through opacity-50">{OLD_NAME}</span>
            <span className="opacity-60">→</span>
            <span className="cook-wiggle text-[color:var(--color-pop,#00ca85)]">
              [ {NEW_NAME || "???"} ]
            </span>
          </p>

          {/* typed status inside the brackets */}
          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] opacity-55 sm:text-xs">
              currently
            </p>
            <div className="flex max-w-full items-center gap-[0.28em] text-[clamp(1.1rem,4.2vw+0.4rem,2.75rem)] font-bold leading-none min-[1920px]:text-5xl min-[2560px]:text-6xl">
              <Bracket side="l" />
              <span
                className="inline-flex items-center whitespace-nowrap text-left"
                style={{ minWidth: `min(${longest}ch, 100%)` }}
              >
                {typed}
                {!reduce && (
                  <span className="cook-cursor ml-[0.06em] inline-block h-[0.78em] w-[0.1em] bg-current" />
                )}
              </span>
              <Bracket side="r" />
            </div>
          </div>

          <p className="mx-auto max-w-md text-[clamp(1rem,0.4vw+0.9rem,1.25rem)] leading-relaxed opacity-75 min-[1920px]:max-w-xl min-[1920px]:text-2xl">
            {SUB}
          </p>

          {/* fake progress that stalls on purpose */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <div className="mb-2 flex justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-70 sm:text-xs">
              <span>progress</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1 w-full bg-white/15">
              <div
                className="cook-fill h-full bg-[color:var(--color-pop,#00ca85)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs opacity-55 sm:text-sm">
              (stuck at {PROGRESS}%, as is tradition)
            </p>
          </div>

          {CONTACT_EMAIL && (
            <p className="text-sm opacity-80 sm:text-base">
              Impatient?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[color:var(--color-pop,#00ca85)] underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-pop,#00ca85)]"
              >
                Email me
              </a>{" "}
              and I’ll tell you first.
            </p>
          )}
        </div>

        {/* bottom: "wait for it..." with bouncing dots */}
        <p
          aria-hidden="true"
          className="font-mono text-xs uppercase tracking-[0.18em] opacity-70 sm:text-sm"
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