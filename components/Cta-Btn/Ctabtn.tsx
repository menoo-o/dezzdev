import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import "./cta.css"; 

/* ──────────────────────────────────────────────────────────────────────────
   CtaBtn — "Roll" CTA
   • Pass `href`  → renders a Next <Link> (navigation, e.g. /contact)
   • No `href`    → renders a <button> (actions, e.g. open a modal)
   All animation lives in cta-btn.css (pure CSS, no JS at runtime), so this
   file can stay a Server Component — no "use client" needed unless YOU pass
   an onClick handler from a Client Component.
   ────────────────────────────────────────────────────────────────────────── */

type Common = {
  /** Visible label at rest. Also what screen readers announce. */
  label: string;
  /** Label that rolls in on hover/focus. Decorative (hidden from screen readers). */
  hoverLabel?: string;
  /** "light" for Paper backgrounds, "dark" for Ink backgrounds (footer, hero). */
  tone?: "light" | "dark";
  /** "md" (default) scales up on big screens — for hero/sections.
   *  "sm" is a fixed compact size — use it inside the navbar. */
  size?: "md" | "sm";
  className?: string;
};

type AsLink = Common & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "children" | "className"
  >;

type AsButton = Common & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "children" | "className"
  >;

export type CtaBtnProps = AsLink | AsButton;

/* The left / right brackets. The 12×100 viewBox is stretched to the button's
   height by CSS (preserveAspectRatio="none"), so one drawing fits every size.
   Paths are inset 1.5 so the stroke is never clipped at the viewBox edge. */
function Bracket({ side }: { side: "l" | "r" }) {
  return (
    <svg
      className={`cta-btn__bracket cta-btn__bracket--${side}`}
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={side === "l" ? "M12 1.5H1.5V98.5H12" : "M0 1.5H10.5V98.5H0"} />
    </svg>
  );
}

export default function CtaBtn(props: CtaBtnProps) {
  const { label, hoverLabel = label, tone = "light", size = "md", className } =
    props;

  const classes = [
    "cta-btn",
    tone === "dark" && "cta-btn--dark",
    size === "sm" && "cta-btn--sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Shared inner markup. The second line is aria-hidden so assistive tech
  // reads the label once, not "Start a project Let's talk".
  const content = (
    <>
      <Bracket side="l" />
      <span className="cta-btn__roll">
        <span className="cta-btn__roll-inner">
          <span className="cta-btn__line">{label}</span>
          <span className="cta-btn__line" aria-hidden="true">
            {hoverLabel}
          </span>
        </span>
      </span>
      <Bracket side="r" />
    </>
  );

  if (props.href !== undefined) {
    // Strip our own props so they don't leak onto the DOM <a>.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      label: _l,
      hoverLabel: _h,
      tone: _t,
      size: _s,
      className: _c,
      ...linkProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    label: _l,
    hoverLabel: _h,
    tone: _t,
    size: _s,
    className: _c,
    ...buttonProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}

/* ── USAGE ──────────────────────────────────────────────────────────────────
   <CtaBtn href="/contact" label="Start a project" hoverLabel="Let's talk" />

   // On a dark section:
   <CtaBtn href="/contact" tone="dark" label="Start a project" hoverLabel="Let's talk" />

   // Inside the navbar — compact size, fixed at every screen width:
   <div className="nav-cta">
     <CtaBtn href="/contact" size="sm" label="Start a project" hoverLabel="Let's talk" />
   </div>

   // If the navbar grid already controls spacing around it:
   .nav-shell .cta-btn { --cta-reserve: 0; }   // in your CSS
   ────────────────────────────────────────────────────────────────────────── */