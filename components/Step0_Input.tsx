"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, ArrowRight, Volume2, Sparkles } from "lucide-react";

interface Step0InputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function Step0_Input({ onAnalyze, isLoading }: Step0InputProps) {
  const defaultText =
    "Mere paas 3 ton Grade A tamatar hain. Teen din mein ready honge. Kahan bechun?";
  const [text, setText] = useState(defaultText);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type or use the pre-filled text.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Speech recognition start failed:", e);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAnalyze(text.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Headings */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F0] text-[#1D5C3A] text-xs font-medium tracking-wide mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Agricultural Selling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1C1C1C] tracking-tight">
          What do you have?
        </h1>
        <p className="mt-2 text-base sm:text-lg text-[#6B7280]">
          अपनी फसल के बारे में बताएं &bull;{" "}
          <span className="italic">Apni fasal ke baare mein batayein</span>
        </p>
      </div>

      {/* Large Microphone Button */}
      <div className="relative mb-8 flex flex-col items-center">
        <button
          type="button"
          onClick={toggleListening}
          aria-label={isListening ? "Stop listening" : "Start speaking in Hindi"}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isListening
              ? "bg-red-600 text-white scale-105 shadow-red-200"
              : "bg-[#1D5C3A] hover:bg-[#16462C] text-white hover:scale-105 shadow-[#1D5C3A]/20"
          }`}
        >
          <Mic className={`w-10 h-10 ${isListening ? "animate-pulse" : ""}`} />
        </button>

        {isListening && (
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30 w-24 h-24 pointer-events-none" />
        )}

        <span className="mt-3 text-xs sm:text-sm font-medium text-[#6B7280]">
          {isListening ? (
            <span className="text-red-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
              Listening to voice (Hindi)...
            </span>
          ) : (
            "Tap to speak or edit below"
          )}
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm focus-within:border-[#1D5C3A] focus-within:ring-2 focus-within:ring-[#1D5C3A]/10 transition-all">
          <label htmlFor="farmer-input" className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1.5">
            Farmer Voice & Text Input
          </label>
          <textarea
            id="farmer-input"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Mere paas 3 ton Grade A tamatar hain..."
            className="w-full text-base sm:text-lg text-[#1C1C1C] placeholder-gray-400 bg-transparent resize-none border-none outline-none leading-relaxed"
          />
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-[#1D5C3A]" />
              Pre-filled for competition demo
            </span>
            <button
              type="button"
              onClick={() => setText(defaultText)}
              className="text-[#1D5C3A] hover:underline font-medium"
            >
              Reset sample text
            </button>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="w-full py-4 px-6 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.99]"
        >
          <span>Analyze</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
