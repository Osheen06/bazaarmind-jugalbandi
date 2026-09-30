"use client";

import React from "react";
import { Mic } from "lucide-react";

interface AnalyzingViewProps {
  farmerText: string;
}

export default function AnalyzingView({ farmerText }: AnalyzingViewProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      <div className="w-full bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm text-center">
        {/* Pulsing mic badge */}
        <div className="w-14 h-14 rounded-full bg-[#EBF5F0] text-[#1D5C3A] flex items-center justify-center mx-auto mb-5">
          <Mic className="w-7 h-7 animate-pulse" />
        </div>

        <div className="text-xs font-semibold uppercase tracking-widest text-[#1D5C3A] mb-3">
          🎙 LISTENING TO FARMER...
        </div>

        {/* Farmer spoken text in speech bubble */}
        <div className="bg-[#FAFAF7] rounded-xl p-4 border border-[#E5E7EB] mb-6">
          <p className="text-sm sm:text-base text-[#1C1C1C] italic leading-relaxed">
            "{farmerText}"
          </p>
        </div>

        <div className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase flex items-center justify-center gap-1.5 mb-2">
          <span>BAZAARMIND IS UNDERSTANDING</span>
          <span className="flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D5C3A] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D5C3A] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D5C3A] animate-bounce" />
          </span>
        </div>

        <p className="text-[11px] text-[#6B7280]">
          Invoking Gemini 2.0 Flash semantic structuring
        </p>
      </div>
    </div>
  );
}
