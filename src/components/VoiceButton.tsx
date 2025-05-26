
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

// Add type declarations for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceButtonProps {
  onVoiceStart: () => void;
  onVoiceEnd: (transcript: string) => void;
  isListening: boolean;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onVoiceStart, 
  onVoiceEnd, 
  isListening 
}) => {
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized speech:", transcript);
        stopSpeechRecognition();
        onVoiceEnd(transcript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        stopSpeechRecognition();
        onVoiceEnd("");
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          stopSpeechRecognition();
        }
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.log("Recognition already stopped");
        }
      }
    };
  }, []);

  const handleClick = () => {
    if (!isListening) {
      onVoiceStart();
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
      onVoiceEnd("");
    }
  };

  const startSpeechRecognition = () => {
    if (recognition) {
      try {
        recognition.start();
        console.log("Starting speech recognition...");
      } catch (e) {
        console.error("Error starting speech recognition:", e);
      }
    } else {
      console.error("Speech recognition not initialized");
      // Fallback if speech recognition is not available
      setTimeout(() => {
        stopSpeechRecognition();
        onVoiceEnd("Voice recognition not available in this browser");
      }, 1000);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognition) {
      try {
        recognition.stop();
        console.log("Stopping speech recognition...");
      } catch (e) {
        console.log("Recognition already stopped");
      }
    }
  };

  // More vibrant colors applied here
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        relative rounded-full p-3
        transition-all duration-200
        ${isListening 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-[#0EA5E9] hover:bg-[#0284c7]'}
      `}
    >
      {isListening ? (
        <>
          <MicOff className="h-6 w-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </>
      ) : (
        <Mic className="h-6 w-6 text-white" />
      )}
      
      {isListening && (
        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping" />
      )}
    </motion.button>
  );
};

export default VoiceButton;