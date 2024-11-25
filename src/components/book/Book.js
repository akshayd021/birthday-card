import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./book.css";
import { HiOutlineCursorClick } from "react-icons/hi";
import { FaMicrophone } from "react-icons/fa";
import ConfettiContainer from "./ConfettiContainer";
import { handleCandleBlow } from "./candleManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ name, message }) => {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMicAccessGranted, setMicAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const requestMicAccess = async () => {
    setIsRequesting(true);
    setError(""); // Clear any previous errors
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAccessGranted(true);
      toast.success("Microphone access granted!", {
        theme: "dark",
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Microphone access granted!");

      // Stop the stream (optional, if you don't want to record audio immediately)
      stream.getTracks().forEach((track) => track.stop());

      setIsRequesting(false);
    } catch (err) {
      // Handle errors (e.g., user denies access or browser issue)
      console.error("Error accessing microphone:", err);
      toast.error("Microphone access denied or unavailable.", {
        theme: "dark",
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsRequesting(false);
    }
  };
  useEffect(() => {
    const candleBlownStatus = sessionStorage.getItem("candleBlown");

    if (candleBlownStatus) {
      const flameElement = document.querySelector("#cake-holder.done .flame");
      if (flameElement) {
        flameElement.style.opacity = 0;
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStorage.getItem("candleBlown")) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      sessionStorage.removeItem("candleBlown");
    };
  }, []);
  console.log("CandleBlown Status:", sessionStorage.getItem("candleBlown"));
  console.log(
    "Flame Elements:",
    document.querySelectorAll(".cake-holder.done .flame")
  );
  document.querySelectorAll(".cake-holder.done .flame");

  return (
    <div className="flipbook-container">
      <ConfettiContainer />
      <HTMLFlipBook
        ref={bookRef}
        width={isMobile ? 300 : 550}
        height={isMobile ? 450 : 700}
        size="fixed"
        minWidth={300}
        maxWidth={800}
        minHeight={400}
        maxHeight={1000}
        maxShadowOpacity={0.5}
        drawShadow={false}
        flippingTime={1000}
        useMouseEvents={true}
        showCover={true}
        onFlip={handleFlip}
      >
        <div className="page text-white">
          <div className=" py-2 px-10 mt-14  lg:mt-0 flex flex-col lg:justify-center  text-center items-center min-h-full">
            <h2 className="text-center lg:text-[56px] text-[32px] font-bold leading-[50px] capitalize font-purplepurse">
              Happy birthday
            </h2>
            <h2 className="text-center lg:text-[55px] text-[42px] lg:mt-8 font-bold leading-[65px] capitalize ">
              {name}
            </h2>
            <button className="absolute right-5 bottom-5 inline-flex items-center gap-2 text-lg uppercase font-semibold">
              Click here <HiOutlineCursorClick className="text-xl" />
            </button>
          </div>
        </div>

        <div className="page text-white">
          <h2 className="lg:text-[70px] text-[40px] font-bold lg:mt-16 mt-1 text-center font-purplepurse ">
            Blow!
          </h2>
          <h2 className="lg:mt-3 mt-1 text-xl text-center">(For a surprise)</h2>
          <iframe
            src="/cake.html"
            title="Cake Animation"
            style={{
              width: isMobile ? "90%" : "100%",
              height: isMobile ? "350px" : "400px",
              border: "none",
            }}
          />
          <button
            className="absolute right-6 top-4 inline-flex underline items-center gap-2 lg:text-xl  text-lg font-semibold"
            onClick={handleCandleBlow}
          >
            Skip
          </button>
          <button
            onClick={requestMicAccess}
            disabled={isMicAccessGranted}
            className="mx-auto flex items-center bg-[#4a4a4a] disabled:cursor-not-allowed opacity-70 py-2 px-6 rounded-md text-white gap-2 lg:text-xl text-sm capitalize font-semibold"
          >
            <FaMicrophone className="text-2xl" />
            {isRequesting
              ? "Requesting..."
              : !isMicAccessGranted
              ? "Allow access to mic"
              : "Mic Access"}
          </button>
          {/* {isMicAccessGranted && (
            <p className="text-green-500 text-sm">Microphone access granted!</p>
          )} */}
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
        </div>
        <div className="page text-white">
          <p className="birthday-greeting-page px-5 hidden justify-center m-auto items-center text-center min-h-full font-semibold text-2xl animate-none">
            {message?.length > 520 ? `${message.slice(0, 520)}...` : message}
          </p>
        </div>
        {/* <div className="page">Back Cover</div> */}
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
