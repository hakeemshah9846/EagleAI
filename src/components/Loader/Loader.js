import React from 'react'

const Loader = () => {
  console.log("Loader component rendering...");
  
  return ( 
    <div id="preloader loading">
        <div id="status">
          <div className="spinner">
            <i className="uil-shutter-alt spin-icon"></i>
          </div>
        </div>
      </div> 
  )
}

export default Loader