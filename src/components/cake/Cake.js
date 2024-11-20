// import React, { useEffect } from "react";
// import $ from "jquery"; // Import jQuery
// import "./cake.css";

// const Cake = () => {
//   // Using useEffect to interact with DOM after the component is mounted
//   useEffect(() => {
//     // jQuery logic
//     $(".candles").click(function () {
//       $(".flame").animate({ opacity: 0 }, "fast");
//       $(".flame2").animate({ opacity: 0 }, "fast");
//       $(".flame3").animate({ opacity: 0 }, "fast");
//       $(".text").animate({ top: -90, opacity: 1 }, "fast");
//     });
//   }, []); // Empty dependency array ensures it runs once when the component mounts

//   return (
//     <div id="birthday-cake">
//       <div className="cake">
//         <div className="middle"></div>
//         <div className="chocs"></div>
//         <div className="top"></div>
//       </div>
//       <div className="candles">
//         <div className="flame"></div>
//         <div className="flame2"></div>
//         <div className="flame3"></div>
//         <div className="text">Happy Birthday!</div>
//         <div className="shadows"></div>
//       </div>
//       <p className="text2">*click on the flame to blow candles</p>
//     </div>
//   );
// };

// export default Cake;

import React from 'react'

const Cake = () => {
  return (
    <div>Cake</div>
  )
}

export default Cake