var mediaStreamSource = null;

function audioStream(stream) {
  try {
    // iOS specific handling
    if (window.navigator.userAgent.match(/iPhone|iPad/i)) {
      // Create a short audio clip and play it to activate the audio session
      const audioElement = new Audio();
      audioElement.play().catch(() => {
        // Ignore play() errors - this is just to activate the audio session
      });
    }

    // Create an AudioNode from the stream
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // Start audio detection and recording
    audioDetection(DEFAULT_PARAMETERS_CONFIGURATION);
    audioRecorder(stream);

  } catch (error) {
    console.error('Error in audioStream:', error);
    alert('Error initializing audio. Please refresh the page.');
  }
}