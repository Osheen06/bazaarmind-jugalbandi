"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MatchingOpportunity } from "@/types";
import {
  Radar as RadarIcon,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Percent,
  Sliders,
} from "lucide-react";

export function DemandRadar() {
  const {
    currentLot,
    opportunities,
    selectedOpportunity,
    setSelectedOpportunity,
    quoteStatus,
    requestFinalQuote,
    riskPreference,
    setRiskPreference,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"cards" | "radar_viz" | "weights">("cards");
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <RadarIcon className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Demand Radar
              </h2>
              <p className="text-xs text-slate-500">
                Live Absorption Engine • Analyzing demand signals within 60 km radius
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
            <span className="font-bold text-slate-900">
              {currentLot.quantityTonnes}T {currentLot.cropName}
            </span>
            <span>•</span>
            <span>Grade {currentLot.grade}</span>
            <span>•</span>
            <span>Harvest: {currentLot.harvestDate}</span>
            <span>•</span>
            <span>{currentLot.location}</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "cards"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Ranked Opportunities
          </button>
          <button
            onClick={() => setActiveTab("radar_viz")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "radar_viz"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Radar Map
          </button>
          <button
            onClick={() => setActiveTab("weights")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "weights"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Algorithm Weights
          </button>
        </div>
      </div>

      {/* Signature BazaarMind Insight Callout */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-slate-800">
          <span className="font-extrabold text-amber-900 block text-sm">
            Signature BazaarMind Insight: Highest Quoted Price ≠ Highest Farmer Earnings
          </span>
          <p className="text-slate-700 leading-relaxed text-xs">
            Notice below: <strong>Ghazipur Mandi</strong> quotes a headline price of <strong>₹23.00/kg</strong>, but deducting 5% mandi commission, long unloading transit, and 5.2% spoilage wastage leaves you with only <strong>₹19.70/kg</strong> in hand. In contrast, <strong>FreshKart Wholesale</strong> offers <strong>₹22.50/kg</strong>, but with 0% commission and 28 km route, your expected net take-home is <strong>₹20.85/kg (+₹1.15/kg higher!)</strong>.
          </p>
        </div>
      </div>

      {/* TAB 1: RANKED OPPORTUNITIES CARDS */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {opportunities.map((opp, idx) => {
            const isSelected = selectedOpportunity?.id === opp.id;
            const isMandi = opp.opportunityType === "mandi";

            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(opp)}
                className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? "border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                    : "border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
                }`}
              >
                {/* Opportunity Top Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                        idx === 0
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : isMandi
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}
                    >
                      {idx === 0 ? "★ TOP EARNING MATCH" : isMandi ? "APMC MANDI BENCHMARK" : "VERIFIED INSTITUTIONAL"}
                    </span>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg mt-1.5">
                      {opp.name}
                    </h3>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-xl text-xs font-black">
                      <span>{opp.matchScore}%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Opportunity Match</span>
                  </div>
                </div>

                {/* Economics Box: Quoted vs Net Realization */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Quoted Offer Price:</span>
                    <span className="text-slate-900 font-extrabold text-sm">
                      ₹{opp.quotedPricePerKg.toFixed(2)}/kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-emerald-700 text-sm">
                        Expected Net Realization:
                      </span>
                    </div>
                    <span className="text-emerald-700 font-black text-base">
                      ₹{opp.expectedNetRealizationPerKg.toFixed(2)}/kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Total In-Hand Take Home:</span>
                    <span className="font-bold text-slate-800">
                      ₹{opp.netBreakdown.netTakeHomeRevenue.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Transparent Match Factors */}
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Distance &amp; Transport:
                    </span>
                    <span className="font-bold text-slate-800">
                      {opp.distanceKm} km (₹{opp.netBreakdown.transportCostPerKg}/kg)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5 text-slate-400" />
                      Mandi Commission / Fee:
                    </span>
                    <span className={`font-bold ${opp.netBreakdown.commissionFeePerKg > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {opp.netBreakdown.commissionFeePerKg > 0
                        ? `-₹${opp.netBreakdown.commissionFeePerKg.toFixed(2)}/kg (5%)`
                        : "₹0.00 (0% direct buyer)"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Payment Reliability:
                    </span>
                    <span className="font-bold text-emerald-700">
                      {opp.paymentReliabilityPercent}% ({opp.paymentSpeedRating.replace("_", " ")})
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                      Expected Spoilage Wastage:
                    </span>
                    <span className="font-bold text-slate-800">
                      {opp.netBreakdown.expectedWastagePercent}% loss
                    </span>
                  </div>
                </div>

                {/* Gemini Recommendation Snippet */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-xs text-slate-700 mb-4 italic">
                  &quot;{opp.hindiReason}&quot;
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  {!isMandi ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOpportunity(opp);
                        requestFinalQuote(opp.id);
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01]"
                    >
                      {quoteStatus === "idle"
                        ? "अंतिम भाव मँगवाएँ (Request Quote)"
                        : quoteStatus === "requested"
                        ? "Waiting for Buyer Quote..."
                        : "Quote Confirmed ₹22.50/kg"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      href="/net-realization"
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Compare Net Realization</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: INTERACTIVE RADAR MAP VISUALIZATION */}
      {activeTab === "radar_viz" && (
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <RadarIcon className="w-5 h-5 text-emerald-400 animate-spin" />
                <span>Spatial Absorption Radar</span>
              </h3>
              <p className="text-xs text-slate-400">
                Concentric distance circles (15km, 30km, 50km, 70km) with live buyer absorption signals
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Verified Direct Buyer</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>APMC Mandi</span>
              </span>
            </div>
          </div>

          {/* SVG Animated Radar Canvas */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
            {/* Concentric distance rings */}
            <div className="absolute w-full h-full rounded-full border border-slate-800" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-slate-800" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-slate-800" />
            <div className="absolute w-1/4 h-1/4 rounded-full border border-slate-800" />

            {/* Crosshairs */}
            <div className="absolute w-full h-px bg-slate-800/80" />
            <div className="absolute h-full w-px bg-slate-800/80" />

            {/* Sweeping Radar Beam */}
            <div
              className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(16, 185, 129, 0.25) 0deg, transparent 60deg)",
                transformOrigin: "bottom left",
                animation: "spin 6s linear infinite",
              }}
            />

            {/* Center Node: Farmer Farm-Gate */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-lg shadow-amber-400/50">
                🌾
              </div>
              <span className="text-[10px] font-bold text-amber-300 mt-1">
                Ramesh (Farm-Gate)
              </span>
            </div>

            {/* Node 1: FreshKart Wholesale (28km, 94% match) */}
            <div
              onClick={() => setSelectedOpportunity(opportunities[0])}
              className="absolute top-1/4 right-1/4 z-20 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shadow-lg shadow-emerald-500/50 animate-bounce">
                FK
              </div>
              <div className="absolute left-7 -top-2 bg-slate-900 border border-emerald-500/60 rounded-lg p-2 text-[10px] whitespace-nowrap shadow-xl">
                <span className="font-bold text-white block">FreshKart (28km)</span>
                <span className="text-emerald-400 font-extrabold">Net: ₹20.85/kg • 94% Match</span>
              </div>
            </div>

            {/* Node 2: Ghazipur Mandi (46km, 71% match) */}
            <div
              onClick={() => setSelectedOpportunity(opportunities.find((o) => o.opportunityType === "mandi") || null)}
              className="absolute bottom-1/4 right-1/3 z-20 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-[10px] shadow-lg shadow-rose-500/50">
                GZ
              </div>
              <div className="absolute left-7 -top-2 bg-slate-900 border border-rose-500/60 rounded-lg p-2 text-[10px] whitespace-nowrap shadow-xl">
                <span className="font-bold text-white block">Ghazipur Mandi (46km)</span>
                <span className="text-rose-400 font-extrabold">Net: ₹19.70/kg • 71% Match</span>
              </div>
            </div>

            {/* Node 3: Delhi Fresh Processors (14km, 88% match) */}
            <div
              onClick={() => setSelectedOpportunity(opportunities[1] || null)}
              className="absolute top-1/3 left-1/4 z-20 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-[10px] shadow-lg shadow-teal-500/50">
                DF
              </div>
              <div className="absolute right-7 -top-2 bg-slate-900 border border-teal-500/60 rounded-lg p-2 text-[10px] whitespace-nowrap shadow-xl">
                <span className="font-bold text-white block">Delhi Fresh (14km)</span>
                <span className="text-teal-400 font-extrabold">Net: ₹20.18/kg • 88% Match</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALGORITHM WEIGHTS TRANSPARENCY */}
      {activeTab === "weights" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-700" />
              <span>Transparent Matching Weights (No Arbitrary Magic)</span>
            </h3>
            <span className="text-xs text-slate-500">Configurable multi-factor framework</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {[
              { factor: "Buyer Demand Fit", weight: "25%", desc: "Volume required vs farmer lot size", color: "bg-emerald-500" },
              { factor: "Expected Net Realization", weight: "25%", desc: "Deductions for transport, handling, commission", color: "bg-teal-500" },
              { factor: "Distance & Route Fit", weight: "15%", desc: "Kilometers to warehouse / gate unloading SLA", color: "bg-blue-500" },
              { factor: "Quality & Grade Fit", weight: "10%", desc: "Required Grade A vs B quality tolerance", color: "bg-indigo-500" },
              { factor: "Delivery Window Timing", weight: "10%", desc: "Harvest readiness vs buyer urgency", color: "bg-purple-500" },
              { factor: "Buyer Payment Reliability", weight: "10%", desc: "Historical settlement speed & escrow fulfillment", color: "bg-amber-500" },
              { factor: "Risk Preference Modifier", weight: "5%", desc: "Farmer's preference for cash vs maximum yield", color: "bg-rose-500" },
            ].map((w) => (
              <div key={w.factor} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900">{w.factor}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white">
                    {w.weight}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className={`h-full ${w.color}`} style={{ width: w.weight }} />
                </div>
                <p className="text-slate-500 text-[11px]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
