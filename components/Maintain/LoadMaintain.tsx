"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   ComingSoon — ONE file, plain CSS (no Tailwind needed).
   Markup + CSS (inline <style>) + two tiny hooks. No logo: the giant ghost
   brackets are the brand mark.

   Use:   // app/page.tsx
          import ComingSoon from "@/components/ComingSoon";
          export default function Home() { return <ComingSoon />; }

   `position: fixed; inset: 0` + a very high z-index → it covers whatever the
   layout renders around it (navbar, etc.).
   ────────────────────────────────────────────────────────────────────────── */

/* ═══ EDIT ME ═══════════════════════════════════════════════════════════ */
const OLD_NAME = "DezzDev";
const NEW_NAME = ""; // "" keeps the teaser [ ??? ] — put the new name here on reveal day
const CONTACT_EMAIL = ""; // e.g. "hello@yourdomain.com" ("" hides the line)
const SHOW_TEASER = true; // the "DezzDev → [ ??? ]" line

const HEADLINE = "Something new is";
const HEADLINE_ACCENT = "cooking.";
// Funny default. Plainer alternative:
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
/* ── tokens (fall back to the brand hex if your globals aren't loaded) ── */
.cs{
  --c-paper:var(--color-paper,#fffafa);--c-ink:var(--color-ink,#192420);
  --c-smoke:var(--color-smoke,#586660);--c-pop:var(--color-pop,#00ca85);
  --c-popd:var(--color-pop-dark,#006b46);--c-line:var(--color-line,#1924202b);
  --mono:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);

  position:fixed;inset:0;z-index:10000;
  display:flex;flex-direction:column;align-items:center;justify-content:space-between;
  overflow-x:hidden;overflow-y:auto;
  padding:2rem 1.5rem;
  background:var(--c-paper);color:var(--c-ink);
}
.cs *{box-sizing:border-box}
.cs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}

/* ── background: mint blobs + giant ghost brackets ── */
.cs-blob{position:absolute;border-radius:9999px;pointer-events:none;
  background:radial-gradient(circle at 35% 35%,rgba(0,202,133,.22),rgba(0,202,133,.07) 55%,transparent 72%)}
.cs-blob--tr{top:-6rem;right:-6rem;width:18rem;height:18rem}
.cs-blob--bl{bottom:-10rem;left:-8rem;width:20rem;height:20rem}
.cs-ghost{position:absolute;top:50%;transform:translateY(-50%);pointer-events:none;overflow:visible;
  width:clamp(2.5rem,9vw,9rem);height:min(55vh,34rem)}
.cs-ghost--l{left:2vw;animation:cs-drift-l 6s ease-in-out infinite}
.cs-ghost--r{right:2vw;animation:cs-drift-r 6s ease-in-out infinite}
.cs-ghost .outer{fill:none;stroke:rgba(0,202,133,.11);stroke-width:clamp(1.5rem,3.6vw,3.5rem);vector-effect:non-scaling-stroke}
.cs-ghost .inner{fill:none;stroke:rgba(0,202,133,.3);stroke-width:2px;vector-effect:non-scaling-stroke}
@keyframes cs-drift-l{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-50%) translateX(-1.2vw)}}
@keyframes cs-drift-r{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-50%) translateX(1.2vw)}}

/* ── top status chip ── */
.cs-chip{position:relative;display:flex;align-items:center;gap:.5rem;margin:0;
  padding:.375rem 1rem;border:1px solid var(--c-line);border-radius:9999px;
  background:rgba(255,255,255,.6);font-size:.875rem;font-weight:500}
.cs-chip b{font-weight:500;color:var(--c-popd)}
.cs-dot{width:.5rem;height:.5rem;border-radius:9999px;background:var(--c-pop);animation:cs-pulse 1.8s ease-in-out infinite}
@keyframes cs-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}

/* ── centre stack ── */
.cs-main{position:relative;display:flex;flex-direction:column;align-items:center;gap:1.25rem;
  width:100%;max-width:48rem;padding:2rem 0;text-align:center}
.cs-hat{width:clamp(4.5rem,8vw,7rem);height:auto;overflow:visible} /* ← HAT SIZE */
.cs-float{animation:cs-float 3.2s ease-in-out infinite}
@keyframes cs-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.cs-spark{transform-box:fill-box;transform-origin:center;animation:cs-spark 1.8s ease-in-out infinite}
@keyframes cs-spark{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.7)}}

.cs-h1{margin:0;font-size:clamp(2.25rem,6.5vw + .5rem,5.25rem);font-weight:800;line-height:1;letter-spacing:-.03em;text-wrap:balance}
.cs-h1 span{color:var(--c-popd)}
.cs-sub{margin:0 auto;max-width:32rem;font-size:clamp(1rem,.5vw + .9rem,1.375rem);line-height:1.6;color:var(--c-smoke)}

.cs-teaser,.cs-now{display:flex;align-items:center;justify-content:center;margin:0;font-family:var(--mono);font-size:1rem}
.cs-teaser{flex-wrap:wrap;gap:.25rem .75rem}
.cs-old{text-decoration:line-through;opacity:.5}
.cs-arrow{opacity:.6}
.cs-new{display:inline-block;color:var(--c-popd);animation:cs-wiggle 2.4s ease-in-out infinite}
@keyframes cs-wiggle{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}

.cs-now{gap:.5rem;color:var(--c-smoke)}
.cs-now .lbl{opacity:.7}
.cs-typed{display:inline-flex;align-items:center;white-space:nowrap;text-align:left;color:var(--c-ink)}
.cs-cursor{display:inline-block;width:.12em;height:1em;margin-left:.12em;background:var(--c-popd);animation:cs-blink 1s steps(1) infinite}
@keyframes cs-blink{50%{opacity:0}}

.cs-mail{margin:0;font-size:1rem}
.cs-mail a{color:var(--c-popd);text-underline-offset:4px}
.cs-mail a:hover{text-decoration:none}
.cs-home{display:inline-flex;align-items:center;height:3rem;margin-top:.5rem;padding:0 1.5rem;
  border:2px solid var(--c-pop);border-radius:9999px;color:var(--c-ink);text-decoration:none;font-weight:500;transition:background .2s}
.cs-home:hover{background:rgba(0,202,133,.15)}
.cs a:focus-visible{outline:2px solid var(--c-popd);outline-offset:4px}

/* ── bottom: wait for it... ── */
.cs-wait{position:relative;margin:0;font-family:var(--mono);font-size:.875rem;text-transform:uppercase;letter-spacing:.18em;color:var(--c-smoke)}
.cs-bounce{display:inline-block;animation:cs-bounce 1.2s ease-in-out infinite}
@keyframes cs-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-.35em)}}

/* ── responsive steps: phones → laptops (fluid above) → big monitors ── */
@media (max-width:640px){
  .cs-chip{font-size:.75rem}
  .cs-teaser,.cs-now,.cs-wait{font-size:.8125rem}
}
@media (min-width:1920px){
  .cs-hat{width:8rem}
  .cs-h1{font-size:6.5rem}
  .cs-sub{max-width:42rem;font-size:1.5rem}
  .cs-teaser,.cs-now{font-size:1.25rem}
}
@media (min-width:2560px){
  .cs-hat{width:10rem}
  .cs-h1{font-size:8.5rem}
}

/* ── reduced motion ── */
@media (prefers-reduced-motion:reduce){
  .cs-ghost--l,.cs-ghost--r,.cs-float,.cs-spark,.cs-dot,.cs-cursor,.cs-bounce,.cs-new{animation:none}
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

/* ── Chef hat (original SVG): puffy top, band, fold lines, sparks ──────── */
function ChefHat() {
  return (
    <svg className="cs-hat" viewBox="0 0 200 180" aria-hidden="true" focusable="false">
      <ellipse cx="100" cy="112" rx="82" ry="40" fill="rgba(0,202,133,.14)" />
      <ellipse cx="100" cy="168" rx="58" ry="6" fill="rgba(25,36,32,.08)" />
      <g className="cs-float">
        <path
          d="M68 124C44 118 36 86 58 72C56 46 88 34 106 46C124 32 156 46 154 72C176 86 168 118 144 124Z"
          fill="rgba(0,202,133,.28)"
        />
        <path
          d="M62 118C38 112 30 80 52 66C50 40 82 28 100 40C118 26 150 40 148 66C170 80 162 112 138 118Z"
          fill="#fffafa"
          stroke="#192420"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M62 118L66 150Q100 160 134 150L138 118"
          fill="#fffafa"
          stroke="#192420"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M82 90L85 108M118 90L115 108" stroke="#192420" strokeWidth="5" strokeLinecap="round" />
        <g stroke="#00ca85" strokeWidth="4" strokeLinecap="round">
          <path className="cs-spark" d="M158 34L162 20" />
          <path className="cs-spark" style={{ animationDelay: ".3s" }} d="M172 48L186 38" />
          <path className="cs-spark" style={{ animationDelay: ".6s" }} d="M178 66L194 64" />
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
      className={`cs-ghost cs-ghost--${side}`}
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

      <main role="status" className="cs">
        {/* Screen readers get one calm sentence instead of the typing show. */}
        <span className="cs-sr">{OLD_NAME} is cooking something new. Check back soon.</span>

        {/* decorative background */}
        <span className="cs-blob cs-blob--tr" aria-hidden="true" />
        <span className="cs-blob cs-blob--bl" aria-hidden="true" />
        <GhostBracket side="l" />
        <GhostBracket side="r" />

        {/* top: status chip (no logo) */}
        <p className="cs-chip" aria-hidden="true">
          <span className="cs-dot" />
          Status: <b>Cooking</b>
        </p>

        {/* middle */}
        <div className="cs-main" aria-hidden="true">
          <ChefHat />

          <h1 className="cs-h1">
            {HEADLINE} <span>{HEADLINE_ACCENT}</span>
          </h1>

          <p className="cs-sub">{SUB}</p>

          {SHOW_TEASER && (
            <p className="cs-teaser">
              <span className="cs-old">{OLD_NAME}</span>
              <span className="cs-arrow">→</span>
              <span className="cs-new">[ {NEW_NAME || "???"} ]</span>
            </p>
          )}

          <p className="cs-now">
            <span className="lbl">currently ›</span>
            <span className="cs-typed" style={{ minWidth: `min(${longest}ch, 60vw)` }}>
              {typed}
              {!reduce && <span className="cs-cursor" />}
            </span>
          </p>

          {CONTACT_EMAIL && (
            <p className="cs-mail">
              Impatient? <a href={`mailto:${CONTACT_EMAIL}`}>Email me</a> and I’ll tell you first.
            </p>
          )}

          {SHOW_HOME_LINK && (
            <a className="cs-home" href="/">
              Back to Home
            </a>
          )}
        </div>

        {/* bottom: wait for it... */}
        <p className="cs-wait" aria-hidden="true">
          wait for it
          {[0, 1, 2].map((i) => (
            <span key={i} className="cs-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
              .
            </span>
          ))}
        </p>
      </main>
    </>
  );
}