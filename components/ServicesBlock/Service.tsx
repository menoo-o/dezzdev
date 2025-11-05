import React from 'react'
import './service.css'


function ServiceExport() {
  return (
    <section className="service-who-container" id='services'>
      {/* left content */}
      <div className='service-left-content'>
       <span className='service-who-question service-vertical-label'>/SERVICES/</span>
          <p className='service-who-intro'>
          Where art meets code, ideas become digital.
         </p>  
      </div>
      {/* right content */}
      <div className="service-right-content">
        <p className='service-who-text'>
        Digital solutions that grow your business. Expert web design combines stunning
visuals with strategic thinking to create websites that work for your brand and your
customers.
        </p>
      </div>
      
    </section>
  )
}

export default ServiceExport
