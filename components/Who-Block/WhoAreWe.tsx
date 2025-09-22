import React from 'react'
import './who.css'

function WhoAreWe() {
  return (
    <section className="who-container">
      {/* left content */}
      <div className='left-content'>
        <span className='who-question vertical-label'>/WHAT WE DO?/</span>
          <p className='who-intro who-title'>
          Design and code, perfectly in sync.
         </p>  
      </div>
      {/* right content */}
      <div className="right-content">
        <p className='who-text'>
         A web design & development studio, combining our passion for design and code. We help our clients succeed by transforming their digital presence through a personalized approach to innovative development. 
        </p>
      </div>
      
    </section>
  )
}

export default WhoAreWe
