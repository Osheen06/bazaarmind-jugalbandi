"use client";

import React, { useState } from "react";
import { DEMO_FPOS, DEMO_FARMERS } from "@/data/demoData";
import {
  Building2,
  Users,
  Wheat,
  TrendingUp,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  DollarSign,
} from "lucide-react";

export function FPOCommandCenterView() {
  const fpo = DEMO_FPOS[0]; // Shakti Farmer Producer Organisation

  const [aggregatedLot, setAggregatedLot] = useState<{
    farmers: string[];
    crop: string;
    totalTonnes: number;
    unlockedBuyer: string;
    incrementalRevenue: number;
  }>({
    farmers: ["Ramesh Kumar (3T)", "Suresh Yadav (1.5T)", "Sunita Devi (2T)"],
    crop: "Tomato (Grade A)",
    totalTonnes: 6.5,
    unlockedBuyer: "FreshKart Wholesale Mega Hub (Tier 1 Bulk Contract)",
    incrementalRevenue: 9750, // +₹1.50/kg on 6.5 tonnes
  });

  const [isAggregated, setIsAggregated] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
              <Building2 className="w-5 h-5 text-cyan-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                FPO Aggregation &amp; Negotiation Command Center
              </h2>
              <p className="text-xs text-slate-500">
                {fpo.name} • {fpo.district}, {fpo.state}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
            FPO Portal: Active
          </span>
        </div>
      </div>

      {/* Aggregate KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Active Members</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {fpo.memberCount} Farmers
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            640 Cultivable Acres
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Pooled Harvest Volume</span>
          <span className="text-2xl font-black text-cyan-700 mt-1 block">
            {fpo.totalActiveSupplyTonnes} Tonnes
          </span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
            Across Tomato, Onion, Potato
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Institutional RFQs</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">8 Active RFQs</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            78% Demand Coverage
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Est. Market Opportunity</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">₹14.2 Lakh</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
            Next 14-day harvest pipeline
          </span>
        </div>
      </div>

      {/* FEATURE: AGGREGATE & NEGOTIATE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              Signature Collective Bargaining
            </span>
            <h3 className="font-black text-lg text-slate-900 mt-1">
              Supply Pooling &amp; Institutional Unlocking Engine
            </h3>
            <p className="text-xs text-slate-500">
              Combine smallholder lots to meet minimum order quantity (MOQ) requirements of major corporate buyers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left: Individual Fragmented Lots */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Fragmented Smallholder Lots (Bakhtawarpur Cluster)
            </span>

            <div className="space-y-2">
              {aggregatedLot.farmers.map((farmerStr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900">{farmerStr}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Field Ready in 3 Days</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Individual Problem:</strong> Alone, none of these 3 farmers meet the 5-tonne minimum order threshold for Tier-1 corporate buyers.
            </div>
          </div>

          {/* Right: Aggregated Power */}
          <div className="bg-gradient-to-br from-cyan-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-cyan-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                2. Combined Aggregation Result
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-400 text-slate-950">
                MOQ Unlocked!
              </span>
            </div>

            <div>
              <span className="text-3xl font-black text-white">6.5 Tonnes</span>
              <span className="text-xs text-slate-300 block mt-0.5">
                Consolidated Grade-A Tomato Pipeline
              </span>
            </div>

            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 text-xs space-y-1">
              <span className="text-cyan-200 font-bold block">Unlocked Buyer Contract:</span>
              <p className="font-extrabold text-white text-sm">
                FreshKart Wholesale Tier-1 Bulk Desk
              </p>
              <div className="flex justify-between text-emerald-300 pt-1 font-bold">
                <span>Bulk Negotiation Premium:</span>
                <span>+₹1.50/kg over mandi</span>
              </div>
              <div className="flex justify-between text-amber-300 font-bold">
                <span>Total Incremental Farmer Lift:</span>
                <span>+₹9,750 extra dividend</span>
              </div>
            </div>

            <button
              onClick={() => setIsAggregated(true)}
              disabled={isAggregated}
              className={`w-full py-2.5 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all ${
                isAggregated
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-amber-400 hover:bg-amber-500 text-slate-950 hover:scale-[1.02]"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAggregated ? "Aggregation Contract Dispatched ✓" : "Aggregate & Dispatch Combined RFQ"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
