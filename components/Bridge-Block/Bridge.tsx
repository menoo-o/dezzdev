import React from "react";
import './BridgeSection.css'
import techniquesData from "@/utils/bridgeData";

export default function BridgeSection() {
  return (
    <main className="techniques">
      <div className="techniques-container">
        <h1 className="techniques-heading">(Strategy Meets Simplicity)</h1>
      
          {techniquesData.map((technique, i) => (
            <section
              key={i}
              className={`techniques-section ${i === techniquesData.length - 1 ? "last-section" : ""}`}
            >
          <span
              className={`techniques-index ${
        i === 0 ? "first-index" : i === techniquesData.length - 1 ? "last-index" : ""
      }`}
>
  ({String(i + 1).padStart(2, "0")})
</span>

          <div className="techniques-row">
            <h2 className="techniques-subheading">{technique.title}</h2>
            <div className="techniques-para">
              <p>{technique.description}</p>
            </div>
          </div>
        </section>
      ))}

      </div>
    </main>
  );
}
