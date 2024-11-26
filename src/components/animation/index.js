
// Envelope.js
import React, { useState, useEffect } from "react";
import "./index.css";

const Envelope = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Open after 0.5 seconds

    const closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 4000);

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);

  return (
    <div className="container">
      <div className={`envelope-wrapper ${isOpen ? "flap" : ""}`}>
        <div className="envelope">
          <div className="letter">
            <div className="text text-white">
              <p className="text-center text-xl font-bold text-white">Happy Birthday</p>
              <p className="text-center text-xl font-bold text-white">{name || ""}</p>
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>
    </div>
  );
};

export default Envelope;
