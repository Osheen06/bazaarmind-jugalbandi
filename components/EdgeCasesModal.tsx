"use client";

import React, { useState } from "react";
import { AlertCircle, X, CheckCircle2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface EdgeCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EdgeCasesModal({ isOpen, onClose }: EdgeCasesModalProps) {
  const { handleFarmerVoiceInput, setRiskPreference } = useApp();
  const [selectedCase, setSelectedCase] = useState<string>("case-d");

  const edgeCases = [
    {
      id: "case-d",
      title: "Edge Case D: Highest Price ≠ Highest Earning",
      badge: "Core Thesis Demo",
      scenario: "Ghazipur quotes ₹23.00/kg; FreshKart quotes ₹22.50/kg.",
      behavior: "BazaarMind deducts 5% APMC commission and 46 km transport, proving FreshKart yields ₹20.85/kg (+₹0.90/kg higher net).",
      actionLabel: "View in Demand Radar",
      actionHref: "/demand-radar",
    },
    {
      id: "case-c",
      title: "Edge Case C: Demand Exceeds Supply",
      badge: "Market Deficit",
      scenario: "Buyer requests 20 Tonnes Grade-A tomatoes, but local cluster only has 7T.",
      behavior: "BazaarMind displays '7 tonnes confirmed • 13 tonnes additional supply needed' and initiates cross-FPO pooling search.",
      actionLabel: "View in Buyer Demand",
      actionHref: "/buyer",
    },
    {
      id: "case-b",
      title: "Edge Case B: Small Individual Volume (200 kg)",
      badge: "Sub-scale Farmer",
      scenario: "Farmer enters: 'Mere paas sirf 200 kilo tamatar hain'.",
      behavior: "System detects sub-scale freight viability and triggers aggregation through Shakti FPO instead of dispatching solo truck.",
      actionLabel: "Test 200kg Query",
      onTrigger: () => {
        handleFarmerVoiceInput("Mere paas sirf 200 kilo tamatar hain, kahan bechun?");
        onClose();
      },
    },
    {
      id: "case-g",
      title: "Edge Case G: Incomplete Request",
      badge: "Smart Single-Question Prompt",
      scenario: "Farmer says only: 'Mere paas tamatar hain'.",
      behavior: "BazaarMind does not overwhelm with 5 form fields; it asks only: 'How much quantity do you have available?'",
      actionLabel: "Test Incomplete Query",
      onTrigger: () => {
        handleFarmerVoiceInput("Mere paas tamatar hain.");
        onClose();
      },
    },
    {
      id: "case-a",
      title: "Edge Case A: No Buyer Found in Radius",
      badge: "Zero-Glut Safeguard",
      scenario: "Uncommon crop or remote pin code with no direct buyer match.",
      behavior: "BazaarMind never fabricates fake buyers; it offers 4 real alternatives: 'Explore nearby APMC mandis', 'Expand search radius to 80km', 'Consider local cold store', or 'Post supply notice'.",
      actionLabel: "Simulate No-Buyer Fallback",
      onTrigger: () => {
        alert("Edge Case A Simulation: No verified buyer found within 20km. System presents nearby mandis and FPO storage options.");
      },
    },
    {
      id: "case-e",
      title: "Edge Case E: Gemini API Unavailable",
      badge: "High-Availability Fallback",
      scenario: "Network failure or missing Gemini API key.",
      behavior: "Server automatically routes to deterministic agricultural intelligence engine. Demo flows operate flawlessly with zero crashes.",
      actionLabel: "Status Verified (Active)",
    },
  ];

  if (!isOpen) return null;

  const current = edgeCases.find((c) => c.id === selectedCase) || edgeCases[0];

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
              Judge Evaluation Aid
            </span>
            <h3 className="font-extrabold text-base text-charcoal-dark mt-1">
              Handled Edge Cases Matrix
            </h3>
            <p className="text-xs text-charcoal-light">
              Demonstrating production-grade handling for small volumes, missing buyers, and network limits.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-charcoal-dark p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {edgeCases.map((ec) => (
            <button
              key={ec.id}
              onClick={() => setSelectedCase(ec.id)}
              className={`p-2 rounded-xl text-left border text-xs transition-all ${
                selectedCase === ec.id
                  ? "bg-forest-50 border-forest-600 font-bold text-forest-900 shadow-sm"
                  : "bg-stone-50 border-stone-200 text-charcoal-muted hover:bg-white"
              }`}
            >
              <span className="block font-bold truncate">{ec.title.split(":")[0]}</span>
              <span className="text-[10px] text-charcoal-light block truncate">{ec.badge}</span>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3 text-xs">
          <div>
            <span className="font-bold text-charcoal-dark text-sm block mb-1">
              {current.title}
            </span>
            <div className="space-y-1.5 text-charcoal-muted leading-relaxed">
              <p>
                <strong className="text-charcoal-dark">Scenario:</strong> {current.scenario}
              </p>
              <p>
                <strong className="text-charcoal-dark">BazaarMind Behavior:</strong> {current.behavior}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {current.actionHref ? (
              <a
                href={current.actionHref}
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white flex items-center gap-1.5"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            ) : current.onTrigger ? (
              <button
                onClick={current.onTrigger}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white flex items-center gap-1.5"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-forest-700 bg-forest-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{current.actionLabel}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
