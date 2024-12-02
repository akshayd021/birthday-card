/* eslint-env browser */
/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 500;
var HEIGHT = 50;
var rafID = null;

var debuglog = false;

// Show cake holder when page loads
window.onload = function () {
  const cakeHolder = document.getElementById("cake-holder");
  if (cakeHolder) {
    cakeHolder.style.opacity = 1;
  }
};

// Listen for the microphone stream from the parent component
window.addEventListener('message', async (event) => {
  if (event.data.type === 'MIC_STREAM_READY') {
    // Initialize audio context if not already initialized
    if (!audioContext) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      await audioContext.resume();
    }

    try {
      // Get the stream from the parent
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          channelCount: 1
        }
      });

      // Initialize audio processing
      if (typeof audioStream === 'function') {
        audioStream(stream);
        console.log("Microphone stream received from parent");
      } else {
        console.error("audioStream function not found");
      }

      // Make sure cake is visible
      const cakeHolder = document.getElementById("cake-holder");
      if (cakeHolder) {
        cakeHolder.style.opacity = 1;
      }
    } catch (e) {
      console.error("Error setting up audio in iframe:", e);
    }
  }
});

// Debug controls
document.querySelector("#startconsoledebug")?.addEventListener("click", function () {
  debuglog = true;
});

document.querySelector("#stopconsoledebug")?.addEventListener("click", () => {
  debuglog = false;
});

function didntGetStream() {
  console.error("Microphone stream not available");
}

function drawLoop(time) {
  // clear the background
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

  // check if we're currently clipping
  if (meter.checkClipping()) canvasContext.fillStyle = "red";
  else canvasContext.fillStyle = "green";

  // draw a bar based on the current volume
  canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

  // set up the next visual callback
  rafID = window.requestAnimationFrame(drawLoop);
}
