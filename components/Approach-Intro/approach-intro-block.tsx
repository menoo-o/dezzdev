 import './approach-intro.css'
 import ApproachStackCards from '../approach-phases/Phase'
 
function ApproachBlock() {
  return (
    <div className='approach-block'>
     <section className="approach-intro-container">
      {/* left content */}
      <div className='left-content-approach'>
        <span className='approach-question'>/OUR APPROACH/</span>
          <p className='approach-intro'>
          Fixed Process, Fluid Potential.
         </p>  
      </div>
      {/* right content */}
      <div className="right-content-approach">
        <p className='approach-text'>
      Our approach adapts to every vision—fluid yet intentional. While teams and goals shift, our rhythm stays constant: focused, creative, and always driving ideas into impact.
        </p>
      </div>
      
      </section>

      {/* <ApproachStackCards /> */}
    </div>
    
  )
}

export default ApproachBlock
