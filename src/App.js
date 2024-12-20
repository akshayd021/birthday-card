import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  PrivacyPolicy,
  RefundPolicy,
  TermsAndConditions,
  User,
} from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGa from "react-ga";
import { initializeGA } from "./utils/addGoogleAnalytics";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/:id" element={<User />} />
        <Route
          path="/:name/:message/:age/:customUrl"
          element={<Landing />}
        />

        {/* <Route
          path="/:name/:message/:age/:customUrl"
          element={<CustomPage />}
        /> */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-condition" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </Router>
  );
  // //<!-- Google tag (gtag.js) -->
  // <!-- Google tag (gtag.js) -->
  // <script async src="https://www.googletagmanager.com/gtag/js?id=G-PNERFX4EX4"></script>
  // <script>
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());

  //   gtag('config', 'G-PNERFX4EX4');
  // </script>
}

export default App;
