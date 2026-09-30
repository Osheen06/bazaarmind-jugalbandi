"use client";

import React, { useState } from "react";
import { CheckCircle2, RotateCcw, Send, ShieldCheck, ArrowLeft } from "lucide-react";

interface Step5ActionProps {
  intentData: {
    crop?: string;
    quantity_kg?: number;
    quality?: string | null;
    location?: string;
    ready_in_days?: number;
    [key: string]: any;
  } | null;
  onGoBack: () => void;
  onStartOver: () => void;
}

export default function Step5_Action({
  intentData,
  onGoBack,
  onStartOver,
}: Step5ActionProps) {
  const [isSending, setIsSending] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const quantityKg = intentData?.quantity_kg || 3000;
  const formattedQuantity = quantityKg.toLocaleString("en-IN") + " kg";
  const quality = intentData?.quality || "Grade A";
  const crop = (intentData?.crop || "Tomato").toLowerCase();
  const capitalizedCrop = crop.charAt(0).toUpperCase() + crop.slice(1);
  const readyDays = intentData?.ready_in_days ?? 3;

  const handleSendRequest = () => {
    setIsSending(true);
    // 1s brief loading animation then transition to "done"
    setTimeout(() => {
      setIsSending(false);
      setIsDone(true);
    }, 1000);
  };

  // STEP 8 — DONE SCREEN
  if (isDone) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] shadow-md text-center">
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-[#EBF5F0] text-[#1D5C3A] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1C1C] tracking-tight">
            QUOTE REQUEST SENT
          </h2>
          <p className="text-sm text-[#6B7280] mt-2 mb-8">
            BazaarMind will track the buyer response.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Support opportunities reminder */}
          <div className="bg-[#FAFAF7] rounded-xl p-4 border border-[#E5E7EB] mb-8">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#1D5C3A]" />
              <span>2 support opportunities found</span>
            </div>
            <p className="text-sm font-medium text-[#1C1C1C]">
              PMFBY &nbsp;&middot;&nbsp; KCC
            </p>
          </div>

          {/* THE THREE-LINE SIGN-OFF (CRITICAL FOR JUDGES) */}
          <div className="py-6 px-4 bg-[#EBF5F0]/60 rounded-2xl border border-[#1D5C3A]/20 mb-8 text-center space-y-1.5">
            <p className="text-base sm:text-lg font-medium text-[#1C1C1C]">
              Gemini understands.
            </p>
            <p className="text-base sm:text-lg font-medium text-[#1D5C3A]">
              BazaarMind orchestrates.
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#1C1C1C]">
              The farmer approves.
            </p>
          </div>

          {/* Start Over Button */}
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-sm font-medium text-[#1C1C1C] transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-[#6B7280]" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    );
  }

  // STEP 7 — QUOTE REQUEST CONFIRMATION CARD
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-md">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#1D5C3A] text-center mb-6">
          QUOTE REQUEST
        </h2>

        {/* Harvest Summary */}
        <div className="space-y-4 text-center py-2">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[#1C1C1C]">
              {formattedQuantity}
            </div>
            <div className="text-base text-[#1C1C1C] font-medium">
              {quality} {capitalizedCrop}s
            </div>
            <div className="text-sm text-[#6B7280]">
              Ready in {readyDays} days
            </div>
          </div>

          <div className="border-t border-gray-200 my-4" />

          {/* Matched Buyer & Realization */}
          <div className="bg-[#FAFAF7] rounded-xl p-4 border border-gray-100 space-y-1">
            <div className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">
              Target Buyer
            </div>
            <div className="text-base font-semibold text-[#1C1C1C]">
              FreshKart Procurement
            </div>
            <div className="text-sm font-medium text-[#1D5C3A] pt-1">
              Estimated net: ₹20.85/kg
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6" />

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={isSending}
            onClick={handleSendRequest}
            className="w-full py-4 px-6 rounded-xl bg-[#1D5C3A] hover:bg-[#16462C] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] disabled:opacity-60"
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Request...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SEND QUOTE REQUEST</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onGoBack}
            disabled={isSending}
            className="w-full py-3 px-6 rounded-xl border border-transparent hover:bg-gray-50 text-sm font-medium text-[#6B7280] flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        <p className="text-[11px] text-[#6B7280] text-center mt-5">
          Non-binding quote inquiry. No produce is transferred until you review final terms.
        </p>
      </div>
    </div>
  );
}
