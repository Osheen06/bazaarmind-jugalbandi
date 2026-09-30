"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface CalculatingViewProps {
  onComplete: () => void;
}

const factors = [
  "Quoted price",
  "Distance",
  "Transport estimate",
  "Handling costs",
  "Expected wastage",
  "Freshness window",
];

export default function CalculatingView({ onComplete }: CalculatingViewProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Reveal factors one by one every 200ms
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < factors.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 200);

    // Auto-advance after 1.5s
    const timeout = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      <div className="w-full bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1D5C3A] mb-2 block">
          FINANCIAL ENGINE
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1C] tracking-tight mb-6">
          COMPARING REALIZATION
        </h2>

        {/* Animated list of checked items */}
        <div className="space-y-3 text-left max-w-xs mx-auto py-2">
          {factors.map((factor, index) => {
            const isVisible = index < visibleCount;
            return (
              <div
                key={factor}
                className={`flex items-center gap-3 transition-all duration-200 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#EBF5F0] text-[#1D5C3A] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">
                  {factor}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
          <span className="w-2 h-2 rounded-full bg-[#1D5C3A] animate-ping" />
          <span>Computing net realization across 3 routes...</span>
        </div>
      </div>
    </div>
  );
}
