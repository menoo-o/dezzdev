"use client";

// components/Navbar.tsx
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/LogoBlock/Logo";
import "./newNav.css";
import CtaBtn from "@/components/Cta-Btn/Ctabtn";

gsap.registerPlugin(useGSAP);

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* ────────────────────────────────────────────────────────────────────────
   TUNING KNOBS  (change these first, no logic edits needed)
   ──────────────────────────────────────────────────────────────────────── */

const PILL_MAX_WIDTH = 1100; // width of the compact pill, px
const COMPACT_AT = 24;       // scrollY where the full-width bar shrinks into the pill

// ▼ HOW LONG THE NAVBAR STAYS VISIBLE WHILE SCROLLING DOWN ▼
// The bar can only hide once BOTH of these are true:
//   1) the page is scrolled past HIDE_AFTER (distance from the top), and
//   2) the user has kept scrolling down for HIDE_DELTA px in one go.
// Raise either number to make the bar stay on screen longer.
const HIDE_AFTER = 600;  // was 240. Bigger = bar survives deeper into the page
const HIDE_DELTA = 120;  // NEW. Bigger = needs a longer downward scroll to hide

// ▼ HOW EAGERLY IT COMES BACK WHEN SCROLLING UP ▼
// Tiny upward flicks (trackpad jitter) are ignored until the user has moved
// up this many px. Lower = reappears faster, higher = needs a firmer scroll up.
const SHOW_DELTA = 12;

// ▼ SMOOTHNESS OF THE HIDE / SHOW MOTION ▼
const HIDE_DURATION = 0.9;        // was 0.5s. Longer = softer, less "snappy"
const HIDE_EASE = "power2.inOut"; // gentle at both ends (no sudden start/stop)
const HIDE_DISTANCE = -120;       // yPercent travelled when hidden

export default function Navbar() {
  // Ref to the <header>. useGSAP's `scope` limits selectors to this element.
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // matchMedia lets us run the animation only when a media query matches,
      // and GSAP cleans everything up automatically when it stops matching.
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            reduceMotion: boolean;
          };

          // Phones/tablets: no scroll animation at all.
          if (!desktop) return;

          // Duration multiplier. For users who prefer reduced motion the
          // animations become ~instant (0.01) instead of being removed, so
          // the end states are still reached.
          const d = reduceMotion ? 0.01 : 1;

          // Grab the three elements we animate.
          //   header    = the fixed outer bar (we slide it up/down)
          //   .nav-shell = the inner container (we narrow it into a pill)
          //   .nav-bg    = the pill's background/border layer (fades in)
          const header = root.current;
          const shell = header?.querySelector<HTMLElement>(".nav-shell");
          const bg = header?.querySelector<HTMLElement>(".nav-bg");
          const ticks = header?.querySelector<HTMLElement>(".nav-ticks");   // new
          if (!header || !shell || !bg || !ticks) return;                   // add !ticks

          /* ── ANIMATION 1: full-width bar  →  compact pill ───────────────
             A paused timeline. We never "scrub" it with scroll; we just
             play() it once the user leaves the top and reverse() it when
             they return. The shell's width shrinks, so the logo (left) and
             CTA (right) slide inward while the links stay centred (the
             layout is a grid: 1fr auto 1fr).                              */
          const compact = gsap
            .timeline({
              paused: true,
              defaults: { duration: 0.7 * d, ease: "power3.out" },
            })
            .to(shell, {
              // Function-based value: re-evaluated on invalidate(), so the
              // pill width stays correct after a window resize.
              width: () => Math.min(PILL_MAX_WIDTH, header.clientWidth - 32),
              paddingLeft: 20,
              paddingRight: 20,
            })
            // The "0" puts this tween at time 0 of the timeline, so the
            // background fades in at the same moment the shell narrows.
            .to(bg, { opacity: 1 }, 0)
              // corner ticks fade in while tightening onto the bar's corners
              .to(
                ticks,
                { opacity: 1, top: -6, right: -6, bottom: -6, left: -6 },
                0,
              );

          /* ── ANIMATION 2: hide / show the whole bar ─────────────────────
             ONE tween used in both directions:
               hide.play()    → slides up AND fades out
               hide.reverse() → slides back down AND fades in
             Smoothness comes from three things:
               • longer duration (HIDE_DURATION)
               • an "inOut" ease (slow start + slow end)
               • fading opacity together with the slide, so the bar
                 dissolves while leaving instead of being cut off at the
                 screen edge.                                              */
          const hide = gsap.to(header, {
            yPercent: HIDE_DISTANCE,
            opacity: 0,
            duration: HIDE_DURATION * d,
            ease: HIDE_EASE,
            paused: true,
            // Let a half-finished hide/show be interrupted smoothly:
            // play()/reverse() resume from the current position instead of
            // restarting, so quick direction changes never "jump".
          });

          /* ── STATE (plain variables, not React state, so scrolling never
                triggers re-renders) ─────────────────────────────────────── */
          let isCompact = false; // is the pill currently formed?
          let isHidden = false;  // is the bar currently hidden?
          let lastY = window.scrollY; // previous scroll position
                                      // (starting at the real scrollY stops
                                      // the bar from hiding on a refresh that
                                      // restores a deep scroll position)
          let downTravel = 0; // px scrolled DOWN since the last direction change
          let upTravel = 0;   // px scrolled UP since the last direction change

          /* ── CORE LOGIC: runs on every scroll event ─────────────────── */
          const update = (y: number) => {
            // --- Part A: pill formation (depends only on distance from top)
            if (y > COMPACT_AT && !isCompact) {
              isCompact = true;
              compact.play(); // shrink to pill
            } else if (y <= COMPACT_AT && isCompact) {
              isCompact = false;
              compact.reverse(); // logo + CTA glide back to the corners
            }

            // --- Part B: hide/show (depends on direction + distance)
            const dy = y - lastY; // positive = scrolling down, negative = up

            if (dy > 0) {
              // Scrolling DOWN: accumulate distance, forget any upward run.
              downTravel += dy;
              upTravel = 0;
            } else if (dy < 0) {
              // Scrolling UP: accumulate distance, forget any downward run.
              upTravel += -dy;
              downTravel = 0;
            }

            // HIDE only when: deep enough in the page, scrolled down far
            // enough in one go, and not already hidden.
            if (y > HIDE_AFTER && downTravel > HIDE_DELTA && !isHidden) {
              isHidden = true;
              hide.play();
            }
            // SHOW when: the user has deliberately scrolled up (SHOW_DELTA),
            // OR the page is back above the hide threshold.
            else if ((upTravel > SHOW_DELTA || y <= HIDE_AFTER) && isHidden) {
              isHidden = false;
              hide.reverse();
            }

            lastY = y;
          };

          /* ── SCROLL LISTENER ─────────────────────────────────────────────
             Scroll events do NOT bubble, so a normal listener on window only
             catches the document scroll. A *capturing* listener also sees
             scrolls from inner containers (e.g. a <main> with
             overflow:auto), which covers layouts that scroll inside a
             wrapper instead of the window.                                */
          const onScroll = (e: Event) => {
            const t = e.target as Document | HTMLElement;

            // Normal page scroll.
            if (t === document) {
              update(window.scrollY);
              return;
            }

            // Scroll inside an element: ignore small scrollers (carousels,
            // code blocks, dropdown lists). Only react to near-full-height
            // scroll containers.
            const el = t as HTMLElement;
            if (el.clientHeight < window.innerHeight * 0.8) return;
            update(el.scrollTop);
          };

          // passive:true tells the browser we never call preventDefault(),
          // so it can keep scrolling at full smoothness.
          window.addEventListener("scroll", onScroll, {
            capture: true,
            passive: true,
          });

          // The page may load already scrolled (refresh, #anchor link):
          // apply the correct state immediately.
          update(window.scrollY);

          /* ── RESIZE ──────────────────────────────────────────────────────
             The pill width was computed from the old window width. Clear the
             inline styles, rebuild the tween values, and jump back to the
             same progress so the pill doesn't flicker.                    */
          const onResize = () => {
            const p = compact.progress();
            gsap.set(shell, { clearProps: "width,paddingLeft,paddingRight" });
            compact.invalidate().progress(p);
          };
          window.addEventListener("resize", onResize);

          /* ── KEYBOARD ACCESSIBILITY ──────────────────────────────────────
             If someone tabs into the navbar while it is hidden, bring it
             back so focus is never lost off-screen.                       */
          const onFocusIn = () => {
            if (isHidden) {
              isHidden = false;
              downTravel = 0;
              hide.reverse();
            }
          };
          header.addEventListener("focusin", onFocusIn);

          /* ── CLEANUP ─────────────────────────────────────────────────────
             Runs when the media query stops matching or the component
             unmounts: remove listeners, kill tweens, wipe inline styles.  */
          return () => {
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
            header.removeEventListener("focusin", onFocusIn);
            compact.kill();
            hide.kill();
            gsap.set([header, shell, bg, ticks], { clearProps: "all" });
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <header ref={root} className="site-header">
      <div className="nav-shell">
       <div className="nav-bg" aria-hidden="true" />
        <div className="nav-ticks" aria-hidden="true" />

        <div className="nav-logo">
          <Logo />
        </div>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              <span className="nav-link-label">{l.label}</span>
              <span className="nav-link-flip" aria-hidden="true">
                [{l.label}]
              </span>
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <CtaBtn href="/contact" size="sm" label="Start a project" hoverLabel="Let's talk" />
        </div>
      </div>
    </header>
  );
}