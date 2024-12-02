var mediaStreamSource = null;
var audioContext = null;
var meter = null;

function createAudioMeter(audioContext) {
  const processor = audioContext.createScriptProcessor(512);
  processor.onaudioprocess = volumeAudioProcess;
  processor.volume = 0;
  processor.connect(audioContext.destination);
  return processor;
}

function volumeAudioProcess(event) {
  const buf = event.inputBuffer.getChannelData(0);
  const bufLength = buf.length;
  let sum = 0;
  let x;

  // Do a root-mean-square on the samples
  for (let i = 0; i < bufLength; i++) {
    x = buf[i];
    sum += x * x;
  }

  // Get the RMS value
  const rms = Math.sqrt(sum / bufLength);

  // Trigger a signal event with the volume
  document.dispatchEvent(new CustomEvent('signal', {
    detail: {
      volume: rms,
      timestamp: Date.now(),
      items: bufLength
    }
  }));
}

function audioStream(stream) {
  try {
    // Initialize audio context if not already done
    if (!audioContext) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    }

    // Make sure cake is visible
    const cakeHolder = document.getElementById("cake-holder");
    if (cakeHolder) {
      cakeHolder.style.opacity = 1;
    }

    // Create an AudioNode from the stream
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // Dispatch unmutedmic event to show cake
    document.dispatchEvent(new Event('unmutedmic'));

    console.log('Audio processing initialized successfully');
  } catch (error) {
    console.error('Error in audioStream:', error);
  }
}