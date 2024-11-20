// Envelope.js
import React, { useState, useEffect } from 'react';
import './index.css';

const Envelope = ({name}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the envelope immediately after the component mounts
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Open after 0.5 seconds

    // Close the envelope automatically after 6 seconds
    const closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 6000);

    // Clear timeouts if the component unmounts
    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);

  return (
    <div className="container">
      <div className={`envelope-wrapper ${isOpen ? 'flap' : ''}`}>
        <div className="envelope">
          <div className="letter">
            <div className="text">
              <p className='text-center'>Happy Birthday</p>
              <p className='text-center '>
               {name|| ''}
              </p>
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>
    </div>
  );
};

export default Envelope;
