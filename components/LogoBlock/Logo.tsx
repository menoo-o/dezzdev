// components/Logo.tsx
import Link from "next/link";
import "./logoo.css";

interface LogoProps {
  asLink?: boolean;
  variant?: "light" | "dark";
  size?: "nav" | "hero";
}

export default function Logo({
  asLink = true,
  variant = "light",
  size = "nav",
}: LogoProps) {
  const mark = (
    <span
      className={`logo-vector size-${size}${variant === "dark" ? " variant-dark" : ""}`}
      role="img"
      aria-label="meeno"
    >
      <span className="logo-bracket logo-bracket-left" aria-hidden="true" />
      <span aria-hidden="true">meeno</span>
      <span className="logo-bracket logo-bracket-right" aria-hidden="true" />
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="meeno home" className="logo-container">
        {mark}
      </Link>
    );
  }
  return <div className="logo-container">{mark}</div>;
}