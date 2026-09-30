"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ShieldCheck, X } from "lucide-react";
import { supportOpportunities } from "../lib/support";

interface Step4RecommendProps {
  onRequestQuote: () => void;
}

export default function Step4_Recommend({
  onRequestQuote,
}: Step4RecommendProps) {
  const [showSupportStrip, setShowSupportStrip] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    // 1 second after the main result appears, strip slides up
    const timer = setTimeout(() => {
      setShowSupportStrip(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Top Section — The Market Recommendation Card */}
      <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] shadow-md text-center relative overflow-hidden mb-6">
        {/* Subtle decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1D5C3A]" />

        <span className="text-xs font-semibold uppercase tracking-widest text-[#1D5C3A] mb-2 block">
          BAZAARMIND RECOMMENDS
        </span>

        <h3 className="text-sm font-medium uppercase tracking-wider text-[#6B7280] mb-4">
          HIGHEST ESTIMATED NET REALIZATION
        </h3>

        {/* Hero Number: 3rem / font-weight 700 */}
        <div className="my-3">
          <span className="text-5xl sm:text-6xl font-bold text-[#1D5C3A] tracking-tight">
            ₹20.85
          </span>
          <span className="text-xl sm:text-2xl font-normal text-[#6B7280] ml-1">
            /kg
          </span>
        </div>

        {/* Buyer & Distance Details */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold text-[#1C1C1C]">
            FreshKart Procurement
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">28 km away &bull; Delhi NCR</p>
        </div>

        {/* Comparison Context Banner */}
        <div className="bg-[#EBF5F0] rounded-xl p-3 mb-8 text-xs text-[#1D5C3A] font-medium max-w-md mx-auto">
          Delivers +₹0.90/kg more net realization than Ghazipur Wholesale despite Ghazipur's higher nominal quote.
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={onRequestQuote}
          className="w-full max-w-md mx-auto py-4 px-8 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99]"
        >
          <span>REQUEST BUYER QUOTE</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Mandatory Disclaimer */}
        <p className="text-[11px] text-[#6B7280] mt-4">
          Illustrative prototype data. Final price subject to buyer inspection and agreement.
        </p>
      </div>

      {/* Support Strip — Slides up 1 second later */}
      {showSupportStrip && (
        <div className="w-full bg-[#FAFAF7] rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500 animate-slide-up">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              <ShieldCheck className="w-4 h-4 text-[#1D5C3A]" />
              <span>2 FARMER SUPPORT OPPORTUNITIES FOUND</span>
            </div>
            <p className="text-sm font-medium text-[#1C1C1C] mt-1">
              PMFBY Crop Insurance &nbsp;&middot;&nbsp; KCC Credit
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="text-xs font-semibold text-[#1D5C3A] hover:text-[#16462C] bg-white border border-[#E5E7EB] hover:border-[#1D5C3A] px-4 py-2 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            VIEW OFFICIAL OPTIONS &rarr;
          </button>
        </div>
      )}

      {/* Support Modal (Official Opportunities) */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E5E7EB] relative">
            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#1D5C3A]" />
              <h3 className="text-lg font-semibold text-[#1C1C1C]">
                Official Support Schemes
              </h3>
            </div>
            <p className="text-xs text-[#6B7280] mb-5">
              Identified based on your crop and harvest timing. Links direct to official government portals.
            </p>

            <div className="space-y-4">
              {supportOpportunities.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF7]"
                >
                  <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wide">
                    {scheme.name}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1 mb-3">
                    {scheme.description}
                  </p>
                  <a
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D5C3A] hover:underline"
                  >
                    <span>{scheme.cta}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-[#1C1C1C]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
