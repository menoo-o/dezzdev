'use client';


import './hero.css'


// src/HomePage.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    // The main container for the entire layout.
    // It uses CSS Grid to arrange its children into distinct areas.
    <div className="container">
      {/* The "RAIN" text, positioned in the top-left grid area. */}
      <div className="rain-text">RAIN</div>

      {/* The descriptive text block, positioned in the top-right grid area. */}
      {/* Uses Flexbox internally to ensure content is aligned to the right and bottom. */}
      <div className="description-text">
        Award-winning sports content that connects audiences across podcasts,
        video, and social media.
      </div>

      {/* The horizontal line, spanning across both columns in the middle grid row. */}
      <div className="horizontal-line"></div>

      {/* The "DELAY" text, positioned in the bottom-right grid area. */}
      <div className="delay-text">DELAY</div>
    </div>
  );
};

export default Hero;