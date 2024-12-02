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

window.onload = async function () {
  // monkeypatch Web Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // Create audio context
  audioContext = new AudioContext();

  try {
    // Request microphone access immediately
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        channelCount: 1
      }
    });

    // Resume audio context (needed for iOS)
    await audioContext.resume();

    // Initialize audio processing
    audioStream(stream);
    console.log("Microphone access granted");

  } catch (e) {
    console.error("Error accessing microphone:", e);
    alert("Please grant microphone access to continue");
  }

  // Debug controls
  document.querySelector("#startconsoledebug").addEventListener("click", function () {
    debuglog = true;
  });

  document.querySelector("#stopconsoledebug").addEventListener("click", () => {
    debuglog = false;
  });
};

function didntGetStream() {
  alert("Please Access Mic or Mic Not Found!");
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
