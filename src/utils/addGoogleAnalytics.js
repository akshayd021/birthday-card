// const addGoogleAnalytics = () => {
//   const script = document.createElement("script");
//   script.async = true;
//   script.src = "https://www.googletagmanager.com/gtag/js?id=G-PNERFX4EX4";
//   document.head.appendChild(script);

//   script.onload = () => {
//     window.dataLayer = window.dataLayer || [];
//     function gtag() {
//       window.dataLayer.push(arguments);
//     }
//     gtag("js", new Date());
//     gtag("config", "G-PNERFX4EX4");
//   };
// };

// export default addGoogleAnalytics;

import ReactGA from "react-ga4";

export const initializeGA = () => {
  ReactGA.initialize("G-H1G6HXERG0");
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
