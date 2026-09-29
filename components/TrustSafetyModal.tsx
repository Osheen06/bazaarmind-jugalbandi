"use client";

import React from "react";
import { ShieldCheck, X, CheckCircle2, AlertCircle } from "lucide-react";

interface TrustSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrustSafetyModal({ isOpen, onClose }: TrustSafetyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-forest-50 text-forest-800">
              <ShieldCheck className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-charcoal-dark">
                Trust &amp; Safety Principles
              </h3>
              <p className="text-xs text-charcoal-light">Responsible AI and Simulation Integrity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-charcoal-dark p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-charcoal-muted leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal-dark block">Decision support, not price guarantees:</strong>
              Recommendations are calculated estimates based on transparent current factors (distance, freight, handling, and historical reliability).
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal-dark block">Human approval before binding commitments:</strong>
              The agent organizes and negotiates quotes, but the farmer always provides explicit approval before any trade or logistics request is sent.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal-dark block">Clear simulation labeling:</strong>
              All market prices, distances, and buyer requirements in this prototype are synthetic demonstration data clearly marked as SIMULATION DATA.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal-dark block">No actual money moved in prototype:</strong>
              Trade inquiries are simulated workflows; payments occur directly between verified counterparties outside this demo.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal-dark block">Explainable at the decision level:</strong>
              Every recommendation features a &quot;Why this option?&quot; breakdown explaining exactly why net realization outperforms gross headline price.
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
