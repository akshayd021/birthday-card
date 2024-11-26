import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

function ConfettiContainer({ handlePage }) {
  const [candleBlown, setCandleBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem("candleBlown")) {
        clearInterval(interval);
        setCandleBlown(true);
        document
          .querySelector(".birthday-greeting-page")
          .classList.replace("hidden", "flex");
        setShowConfetti(true);
        handlePage();
      } else {
        setCandleBlown(false);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      localStorage.removeItem("candleBlown");
    };
  }, []);

  useEffect(() => {
    // Stop showing confetti after 7 seconds
    if (showConfetti) {
      const timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 7000); // 7000ms = 7 seconds

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [showConfetti]);

  if (!candleBlown || !showConfetti) return null;

  return <Confetti width={width} height={height} />;
}

export default ConfettiContainer;
