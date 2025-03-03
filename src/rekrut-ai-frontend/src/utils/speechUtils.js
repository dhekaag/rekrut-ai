const speechUtils = {
  speak: (text, onEnd = () => {}) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.error("Speech synthesis not supported");

      return {
        stop: () => {
          console.log("Mock stop called");
          onEnd();
        },
      };
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) =>
        voice.name.includes("Google") ||
        voice.name.includes("Natural") ||
        voice.name.includes("Samantha")
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);

    return {
      stop: () => {
        window.speechSynthesis.cancel();
      },
    };
  },

  startSpeechRecognition: (onResult, onEnd, onVolumeChange) => {
    if (
      typeof window === "undefined" ||
      (!window.SpeechRecognition && !window.webkitSpeechRecognition) ||
      !window.AudioContext
    ) {
      console.error("Speech recognition or AudioContext not supported");

      setTimeout(() => {
        onResult(
          "This is a simulated transcript because speech recognition is not available in this browser."
        );
      }, 2000);

      return {
        stop: () => {
          console.log("Mock recognition stop called");
          if (onEnd) onEnd();
        },
      };
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let audioContext;
    let analyser;
    let microphone;
    let javascriptNode;

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            javascriptNode.onaudioprocess = () => {
              const array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);

              let values = 0;
              const length = array.length;

              for (let i = 0; i < length; i++) {
                values += array[i];
              }

              const average = values / length;

              if (onVolumeChange) {
                onVolumeChange(average);
              }
            };
          })
          .catch((err) => {
            console.error("Error accessing microphone:", err);
          });
      }
    } catch (e) {
      console.error("AudioContext error:", e);
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      onResult(transcript);
    };

    recognition.onend = () => {
      if (javascriptNode) {
        javascriptNode.disconnect();
      }
      if (microphone) {
        microphone.disconnect();
      }
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }

      if (onEnd) onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        if (javascriptNode) {
          javascriptNode.disconnect();
        }
        if (microphone) {
          microphone.disconnect();
        }
        if (audioContext && audioContext.state !== "closed") {
          audioContext.close();
        }

        recognition.stop();
      },
    };
  },
};

export default speechUtils;
