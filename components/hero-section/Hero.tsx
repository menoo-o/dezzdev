import React from 'react';
import './hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        {/* LINE 1 */}
        <span>Crafting</span> <strong>Bold</strong> &
         {/*LINE 2  */}
       <span>Memorable</span>
        {/* LINE3 */} Websites
      </h1>
      <p className="hero-subtitle">Let your brand stand out with design that speaks.</p>
    </section>
  );
}

export default Hero;
