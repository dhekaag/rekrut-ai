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

  startSpeechRecognition: (onResult, onEnd) => {
    if (
      typeof window === "undefined" ||
      (!window.SpeechRecognition && !window.webkitSpeechRecognition)
    ) {
      console.error("Speech recognition not supported");

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

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      onResult(transcript);
    };

    recognition.onend = () => {
      if (onEnd) onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        recognition.stop();
      },
    };
  },
};

export default speechUtils;
