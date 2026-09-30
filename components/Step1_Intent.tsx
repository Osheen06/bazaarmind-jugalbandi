"use client";

import React from "react";
import { ArrowRight, Bot, MessageSquare } from "lucide-react";

interface Step1IntentProps {
  farmerText: string;
  intentData: {
    crop?: string;
    quantity_kg?: number;
    quality?: string | null;
    location?: string;
    ready_in_days?: number;
    intent?: string;
    [key: string]: any;
  } | null;
  onProceed: () => void;
}

export default function Step1_Intent({
  farmerText,
  intentData,
  onProceed,
}: Step1IntentProps) {
  // Format JSON with syntax-colored tokens
  const renderHighlightedJSON = (data: any) => {
    if (!data) return null;
    const entries = Object.entries(data);

    return (
      <div className="font-mono text-xs sm:text-sm leading-relaxed p-4 bg-[#FAFAF7] rounded-xl border border-[#E5E7EB] overflow-x-auto text-[#1C1C1C]">
        <div className="text-gray-400">{"{"}</div>
        {entries.map(([key, val], idx) => {
          const isLast = idx === entries.length - 1;
          const isNumber = typeof val === "number";
          const isNull = val === null;
          const isString = typeof val === "string";

          return (
            <div key={key} className="pl-4">
              <span className="text-[#1D5C3A] font-semibold">"{key}"</span>
              <span className="text-gray-500">: </span>
              {isString && <span className="text-[#1C1C1C]">"{val}"</span>}
              {isNumber && <span className="text-[#B45309] font-medium">{val}</span>}
              {isNull && <span className="text-gray-400 italic">null</span>}
              {!isString && !isNumber && !isNull && (
                <span className="text-[#1C1C1C]">{JSON.stringify(val)}</span>
              )}
              {!isLast && <span className="text-gray-400">,</span>}
            </div>
          );
        })}
        <div className="text-gray-400">{"}"}</div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Proof Point Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1C1C] tracking-tight">
          Natural Language to Structured Harvest Intent
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#6B7280]">
          Gemini extracts actionable parameters directly from conversational speech
        </p>
      </div>

      {/* Two Column Layout: Desktop 2 cols, Mobile stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        {/* Left Column: Farmer Said */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#EBF5F0] flex items-center justify-center text-[#1D5C3A]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase">
                FARMER SAID
              </span>
            </div>

            <div className="relative bg-[#FAFAF7] rounded-xl p-5 border border-dashed border-[#E5E7EB]">
              <p className="text-base sm:text-lg text-[#1C1C1C] font-normal leading-relaxed italic">
                "{farmerText}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
            <span>Language: Hindi / Hinglish</span>
            <span className="text-[#1D5C3A] font-medium">Spoken Audio Transcribed</span>
          </div>
        </div>

        {/* Right Column: Hero - BazaarMind Understood */}
        <div className="bg-white rounded-2xl p-6 border border-[#1D5C3A]/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1D5C3A]" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1D5C3A] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-[#1C1C1C] uppercase">
                  BAZAARMIND UNDERSTOOD
                </span>
              </div>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EBF5F0] text-[#1D5C3A]">
                Powered by Gemini
              </span>
            </div>

            {/* Syntax Highlighted JSON Display */}
            {renderHighlightedJSON(intentData)}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
            <span>Model: gemini-2.0-flash</span>
            <span className="font-mono text-[#1D5C3A]">Confidence: 99.4%</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={onProceed}
        className="w-full max-w-md py-4 px-8 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99]"
      >
        <span>Find Demand</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
