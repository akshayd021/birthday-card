import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./book.css";
import { HiOutlineCursorClick } from "react-icons/hi";
import ConfettiContainer from "./ConfettiContainer";
import "react-toastify/dist/ReactToastify.css";

const Cake = ({ isBlown, isMobile }) => (
  <div className={`mobile ${isBlown ? 'candle-blown' : ''}`}>
    <div id="cake-holder" className={isBlown ? 'done' : ''}>
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className={`candle${num}`}>
            <div className="flame"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Book = ({ name, message }) => {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [micStream, setMicStream] = useState(null);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [audioProcessor, setAudioProcessor] = useState(null);

  // Audio processing setup
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 1
          }
        });

        const context = new (window.AudioContext || window.webkitAudioContext)();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(512, 1, 1);

        processor.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          const sum = input.reduce((acc, val) => acc + (val * val), 0);
          const rms = Math.sqrt(sum / input.length);
          const dB = -20 * Math.log10(1 / rms);

          // Check if blow is detected
          if (dB >= -20) {
            console.log('Blow detected:', dB);
            if (!candlesBlown) {
              setCandlesBlown(true);
              handleCandleBlowAction();
            }
          }
        };

        source.connect(processor);
        processor.connect(context.destination);

        setMicStream(stream);
        setAudioContext(context);
        setAudioProcessor(processor);

        console.log("Audio processing initialized");
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    setupAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
      }
      if (audioProcessor) {
        audioProcessor.disconnect();
      }
    };
  }, []);

  const handleCandleBlowAction = () => {
    localStorage.setItem("candleBlown", "true");
    // Wait a moment for the animation to complete before flipping the page
    setTimeout(() => {
      bookRef.current?.pageFlip().flipNext();
    }, 1000);
  };

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
        <div className="page text-white">
          <div className="flex flex-col justify-center items-center min-h-full">
            <div className="text-center lg:text-[56px] text-[32px] font-bold leading-[50px] capitalize font-purplepurse">
              Happy birthday
            </div>
            <h2 className="text-center lg:text-[55px] text-[42px] lg:mt-8 font-bold leading-[65px] capitalize">
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

        <div className="page text-white">
          <div className="flex flex-col justify-center items-center min-h-full">
            <h2 className="lg:text-[70px] text-[40px] font-bold text-center font-purplepurse">
              Blow!
            </h2>
            <h2 className="lg:mt-3 mt-1 text-xl text-center">
              (For a surprise)
            </h2>
            <div className="cake-container">
              <Cake isBlown={candlesBlown} isMobile={isMobile} />
            </div>
            <button
              className="absolute right-6 top-4 inline-flex underline items-center gap-2 lg:text-xl text-lg font-semibold"
              onClick={handleCandleBlowAction}
            >
              Skip
            </button>
          </div>
        </div>

        <div className="page text-white">
          <p
            className="birthday-greeting-page word px-5 hidden m-auto text-center font-semibold lg:text-[45px] text-[28px] font-dancingscript"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
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
