"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { marketOptions } from "../lib/marketData";
import { calculateNet } from "../lib/realization";

interface Step3RealizationProps {
  onSeeRecommendation: () => void;
}

export default function Step3_Realization({
  onSeeRecommendation,
}: Step3RealizationProps) {
  // FreshKart is the winner (₹20.85), Ghazipur is lowest (₹19.95), Local is middle (₹20.18)
  const optionsWithNet = marketOptions.map((opt) => ({
    ...opt,
    net: calculateNet(opt),
    isWinner: opt.buyer.includes("FreshKart"),
    isLowest: opt.buyer.includes("Ghazipur"),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Heading */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1D5C3A] mb-2 block">
          FINANCIAL INTELLIGENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1C1C1C] tracking-tight">
          PRICE ≠ REALIZATION
        </h2>
        <p className="mt-2 text-base text-[#6B7280]">
          Gross quoted price hides transport, handling, and transit wastage costs.
        </p>
      </div>

      {/* 3 Calculation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
        {optionsWithNet.map((opt) => {
          return (
            <div
              key={opt.buyer}
              className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col justify-between transition-all duration-200 ${
                opt.isWinner
                  ? "border-[#1D5C3A] ring-1 ring-[#1D5C3A]/30 relative"
                  : "border-[#E5E7EB]"
              }`}
            >
              {opt.isWinner && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1D5C3A] text-white text-[11px] font-semibold uppercase tracking-wider py-0.5 px-3 rounded-full shadow-sm">
                  Highest Net Realization
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#1C1C1C]">
                    {opt.buyer}
                  </h3>
                  <span className="text-xs text-[#6B7280]">
                    {opt.distanceKm} km
                  </span>
                </div>

                {/* Breakdown Table */}
                <div className="space-y-2.5 text-sm py-2">
                  <div className="flex justify-between items-center text-[#1C1C1C] font-medium">
                    <span>Quoted Price</span>
                    <span className={opt.isLowest ? "text-amber-800 font-semibold" : ""}>
                      ₹{opt.quotedPrice.toFixed(2)}/kg
                      {opt.isLowest && (
                        <span className="text-[10px] text-gray-500 block text-right font-normal">
                          (Highest quoted)
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#6B7280]">
                    <span>− Transport</span>
                    <span>₹{opt.transport.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#6B7280]">
                    <span>− Handling</span>
                    <span>₹{opt.handling.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#6B7280]">
                    <span>− Wastage</span>
                    <span>₹{opt.wastage.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4" />

                {/* Net Realization Result */}
                <div
                  className={`py-3 px-3 rounded-xl flex items-center justify-between ${
                    opt.isWinner
                      ? "bg-[#EBF5F0] text-[#1D5C3A]"
                      : "bg-[#FAFAF7] text-[#6B7280]"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    EST. NET
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xl font-bold ${
                        opt.isWinner ? "text-[#1D5C3A]" : "text-[#1C1C1C]"
                      }`}
                    >
                      ₹{opt.net.toFixed(2)}/kg
                    </span>
                    {opt.isWinner && (
                      <span className="w-5 h-5 rounded-full bg-[#1D5C3A] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {opt.isLowest && (
                <p className="mt-3 text-[11px] text-gray-400 italic text-center">
                  High transport & wastage drops realization to lowest
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Mandatory Disclaimer */}
      <p className="text-xs text-[#6B7280] text-center max-w-xl mb-8">
        Illustrative prototype estimates. Actual realization depends on confirmed
        buyer quote, logistics costs and realized wastage.
      </p>

      {/* Bottom CTA */}
      <button
        type="button"
        onClick={onSeeRecommendation}
        className="w-full max-w-md py-4 px-8 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99]"
      >
        <span>See Recommendation</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
