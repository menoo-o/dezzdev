import React from "react";
import './BridgeSection.css'

export default function BridgeSection() {
  return (
    <main className="techniques">
      <div className="techniques-container">
        <h1 className="techniques-heading">Built for Your Growth</h1>

        {/* Build Section */}
        <section className="techniques-section">
         <span className="techniques-index">(01)</span>
          <div className="techniques-row">
            <h2 className="techniques-subheading">Design with Guts</h2>
            <div className="techniques-para">
                <p>Emotionally Driven Digital Results. We build immersive online experiences that not only captivate your audience but are engineered to spark action and boost conversions.</p>
            </div>
          </div>
        </section>

        {/* Maintain Section */}
        <section className="techniques-section">
            <span className="techniques-index">(02)</span>
          <div className="techniques-row">
            <h2 className="techniques-subheading">Build to Flex</h2>
             <div className="techniques-para">
                <p>We build a digital presence that adapts to your success. Whether you launch a new product or pivot your strategy, your site is always ready.</p>
             </div>
          </div>
        </section>

        {/* Grow Section */}
        <section className="techniques-section last-techniques-section">
        <span className="techniques-index last-index">(03)</span>
          <div className="techniques-row">
            <h2 className="techniques-subheading">Create to Convert</h2>
            <div className="techniques-para">
             <p>No Detail is Left to Chance. Our design is 100% intentional, engineered for engagement, conversions, and powerful brand building.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
