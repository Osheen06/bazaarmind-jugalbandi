"use client";

import React from "react";
import { ArrowRight, MapPin, Store, Building2, Factory } from "lucide-react";
import { marketOptions } from "../lib/marketData";

interface Step2DemandRadarProps {
  onCompare: () => void;
  cropLabel?: string;
  locationLabel?: string;
}

export default function Step2_DemandRadar({
  onCompare,
  cropLabel = "Grade A tomatoes",
  locationLabel = "Delhi NCR",
}: Step2DemandRadarProps) {
  const getBuyerIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Store className="w-5 h-5 text-[#1D5C3A]" />;
      case 1:
        return <Building2 className="w-5 h-5 text-[#1D5C3A]" />;
      case 2:
        return <Factory className="w-5 h-5 text-[#1D5C3A]" />;
      default:
        return <Store className="w-5 h-5 text-[#1D5C3A]" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1D5C3A] mb-2 block">
          MARKET DISCOVERY
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1C1C1C] tracking-tight">
          DEMAND RADAR
        </h2>
        <p className="mt-2 text-base text-[#6B7280]">
          3 relevant opportunities found for {cropLabel}, {locationLabel}
        </p>
      </div>

      {/* 3 Buyer Cards: equal visual weight, showing ONLY quoted price & distance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        {marketOptions.map((opt, idx) => (
          <div
            key={opt.buyer}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-[#E5E7EB] flex items-center justify-center">
                  {getBuyerIcon(idx)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1C1C1C] leading-snug">
                    {opt.buyer}
                  </h3>
                  <span className="text-xs text-[#6B7280]">Verified Market Channel</span>
                </div>
              </div>

              {/* Quoted Price */}
              <div className="my-6 py-4 bg-[#FAFAF7] rounded-xl text-center border border-gray-100">
                <span className="text-xs text-[#6B7280] block mb-1 uppercase tracking-wider font-medium">
                  Quoted Price
                </span>
                <span className="text-3xl font-bold text-[#1C1C1C]">
                  ₹{opt.quotedPrice.toFixed(2)}
                  <span className="text-sm font-normal text-[#6B7280]">/kg</span>
                </span>
              </div>
            </div>

            {/* Distance */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                Distance
              </span>
              <span className="font-medium text-[#1C1C1C]">
                {opt.distanceKm} km away
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <button
        type="button"
        onClick={onCompare}
        className="w-full max-w-md py-4 px-8 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99]"
      >
        <span>Compare Economics</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
