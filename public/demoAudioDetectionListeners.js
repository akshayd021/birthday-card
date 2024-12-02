/* eslint-env browser */

const dB = (signal) => -Math.round(20 * Math.log10(1 / signal));
const debuglog = true; // Enable debugging by default to help troubleshoot

function showCake() {
  console.log("Attempting to show cake and blow candles");
  const cakeHolder = document.getElementById("cake-holder");
  if (cakeHolder) {
    cakeHolder.classList.add("done");
    document.body.classList.add('candle-blown');
    // Notify parent that candles are blown
    window.parent.postMessage({ type: 'CANDLES_BLOWN' }, '*');
    console.log("Cake animation triggered");
  } else {
    console.error("Cake holder element not found");
  }
}

function hystogramLine(value) {
  const maxCharsperLine = 200;
  const valueInChars = maxCharsperLine * value;
  const char = "█";
  return char.repeat(valueInChars);
}

// Audio detection thresholds
const VOLUME_THRESHOLD = -20; // Adjusted threshold for blowing detection

//
// signal handler - This is the main handler for detecting blowing
//
document.addEventListener("signal", (event) => {
  const volume = event.detail.volume.toFixed(9);
  const timestamp = event.detail.timestamp;
  const items = event.detail.items.toString().padEnd(3);
  const dBV = dB(event.detail.volume);

  // Log all audio input for debugging
  console.log("Audio input detected - dBV:", dBV, "volume:", volume);

  // Check if the volume is loud enough to trigger candle blowing
  if (dBV >= VOLUME_THRESHOLD) {
    console.log("Blow detected! dBV:", dBV);
    showCake();
    localStorage.setItem("candleBlown", "true");
  }
});

//
// silence handler
//
document.addEventListener("silence", (event) => {
  const volume = event.detail.volume.toFixed(9);
  const dBV = dB(event.detail.volume);
  if (debuglog) {
    console.log(`Silence detected - dBV: ${dBV}, volume: ${volume}`);
  }
});

//
// mute handler
//
document.addEventListener("mute", (event) => {
  const volume = event.detail.volume.toFixed(9);
  const dBV = dB(event.detail.volume);
  if (debuglog) {
    console.log(`Mute detected - dBV: ${dBV}, volume: ${volume}`);
  }
});

//
// unmutedmic handler - This ensures the cake is visible when mic is active
//
document.addEventListener("unmutedmic", (event) => {
  const cakeHolder = document.getElementById("cake-holder");
  if (cakeHolder) {
    cakeHolder.style.opacity = 1;
    console.log("Microphone unmuted, cake holder visible");
  }
});
