import React, { useEffect } from 'react';

const Loading = () => {
  
  useEffect(() => {
    setInterval(() => {
     
    }, 1000);
  }, []);

  return (
    <>
    <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
    <div className="ovaralay"></div>
    </>
  )
}

export default Loading