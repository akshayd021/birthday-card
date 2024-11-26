// import React, { useEffect, useState } from "react";
// import Confetti from "react-confetti";

// function ConfettiContainer({ setBlow, blow }) {
//   const [candleBlown, setCandleBlown] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   // Effect to monitor if the candle is blown
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (sessionStorage.getItem("candleBlown")) {
//         clearInterval(interval);
//         setCandleBlown(true); // Candle is blown
//         setShowConfetti(true); // Start confetti
//         setBlow(false); // Prevent blow being true during confetti
//       }
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//       sessionStorage.removeItem("candleBlown"); // Clean up session
//     };
//   }, [setBlow]);


//   useEffect(() => {
//     if (showConfetti) {
//       const timeout = setTimeout(() => {
//         setShowConfetti(false); // Stop confetti
//         setBlow(true); // Mark as blow after confetti stops
//       }, 7000); // Confetti duration = 7 seconds

//       return () => clearTimeout(timeout); // Cleanup timeout
//     }
//   }, [showConfetti, setBlow]);

//   // Do not render Confetti if conditions are not met
//   if (!candleBlown || !showConfetti) return null;

//   return <Confetti width={width} height={height} />;
// }

// export default ConfettiContainer;

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

function ConfettiContainer() {
  const [candleBlown, setCandleBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStorage.getItem("candleBlown")) {
        clearInterval(interval);
        setCandleBlown(true);
        document
          .querySelector(".birthday-greeting-page")
          .classList.replace("hidden", "flex");
        setShowConfetti(true); // Start showing confetti
      } else {
        setCandleBlown(false);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      sessionStorage.removeItem("candleBlown");
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
