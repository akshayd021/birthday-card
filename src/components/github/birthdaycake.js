import React, { useEffect } from 'react';
import './BirthdayCake.css'; // For the CSS

function BirthdayCake() {
  // Function to load a script only if it hasn’t already been loaded
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      // Check if the script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        console.log(`${src} loaded successfully`);
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  

  useEffect(() => {
    // Asynchronously load scripts in order
    const loadScripts = async () => {
      try {
        await loadScript('/cake.js');
        await loadScript('/volume-meter.js');
        await loadScript('/audioDetectionConfig.js');
        await loadScript('/audioDetection.js');
        await loadScript('/audioStream.js');
        await loadScript('/demoAudioRecorder.js');
        await loadScript('/demoAudioDetectionListeners.js');
        await loadScript('/demo.js');
      } catch (error) {
        console.error("Script loading error:", error);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      document.body.querySelectorAll('script[src*="/"]').forEach(script => script.remove());
    };
  }, []); // Empty dependency array ensures scripts load only once on component mount

  return (
    <div className="text-center">
      <h1>Birthday Cake 🎂</h1>
      <br />
      <button id="start">START (required on Chrome)</button>
      <button style={{ display: 'none' }} id="startconsoledebug">
        enable console logs
      </button>
      <button style={{ display: 'none' }} id="stopconsoledebug">
        disable console logs
      </button>
      <br />
      <br />
      <div id="cake-holder" style={{ opacity: 0 }}>
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-top"></div>
          <div className="icing"></div>
          <div className="drip drip1"></div>
          <div className="drip drip2"></div>
          <div className="drip drip3"></div>
          <div className="candle">
            <div className="flame"></div>
          </div>
        </div>
        <div className="text-center">
          <h5 className="cake-off">❣ Happy Birthday Dude ❣</h5>
          <p className="cake-off">❤ Wish you the best ❤</p>
        </div>
      </div>
    </div>
  );
}

export default BirthdayCake;
