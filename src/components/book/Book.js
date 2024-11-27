import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./book.css";
import { HiOutlineCursorClick } from "react-icons/hi";
import ConfettiContainer from "./ConfettiContainer";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ name, message }) => {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCandleBlowAction = () => {
    localStorage.setItem("candleBlown", "true");
  };

  // const requestMicAccess = async () => {
  //   setIsRequesting(true);

  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     setMicAccessGranted(true);
  //     toast.success("Microphone access granted!", {
  //       theme: "dark",
  //       position: "top-right",
  //       autoClose: 3000,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });

  //     stream.getTracks().forEach((track) => track.stop());

  //     setIsRequesting(false);
  //   } catch (err) {
  //     console.error("Error accessing microphone:", err);
  //     toast.error("Microphone access denied or unavailable.", {
  //       theme: "dark",
  //       position: "top-right",
  //       autoClose: 3000,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     setIsRequesting(false);
  //   }
  // };

  // Empty dependency array ensures this runs only once

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

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  const handlePage = () => {
    bookRef.current.pageFlip().flipNext();
  };
  return (
    <div className="flipbook-container">
      <ConfettiContainer handlePage={handlePage} />

      <HTMLFlipBook
        ref={bookRef}
        width={isMobile ? Math.min(window.innerWidth * 0.9, 800) : 550}
        height={isMobile ? Math.min(window.innerHeight * 0.9, 1000) : 700}
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
        className="p-5"
      >
        <div className="page text-white ">
          <div className="flex flex-col justify-center items-center min-h-full ">
            <div className="text-center lg:text-[56px] text-[32px]   font-bold leading-[50px] capitalize font-purplepurse">
              Happy birthday
            </div>
            <h2 className="text-center lg:text-[55px] text-[42px] lg:mt-8 font-bold leading-[65px] capitalize word">
              {name}
            </h2>
          </div>
          <button
            onClick={() => bookRef.current.pageFlip().flipNext()}
            className="absolute right-5 bottom-5 inline-flex items-center gap-2 text-lg uppercase font-semibold"
          >
            Click here <HiOutlineCursorClick className="text-xl" />
          </button>
        </div>

        <div className="page text-white ">
          <div className="flex flex-col justify-center items-center min-h-full ">
            <h2 className="lg:text-[70px] text-[40px] font-bold  text-center font-purplepurse ">
              Blow!
            </h2>
            <h2 className="lg:mt-3 mt-1 text-xl text-center">
              (For a surprise)
            </h2>
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
              className="absolute right-6 top-4 inline-flex underline items-center gap-2 lg:text-xl text-lg font-semibold"
              onClick={handleCandleBlowAction} // Trigger page flip when blown
            >
              Skip
            </button>
            {/* {!isMobile && (
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
            )} */}
          </div>
        </div>

        <div className="page text-white">
          <p className="birthday-greeting-page word px-5 hidden justify-center m-auto items-center text-center min-h-full font-semibold lg:text-[45px] text-[28px] font-dancingscript">
            {message?.length > 270 && !isMobile
              ? `${message.slice(0, 270)}...`
              : message?.length > 400 && isMobile
              ? `${message.slice(0, 400)}...`
              : message}
          </p>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
