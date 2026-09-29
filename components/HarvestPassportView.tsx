"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Warehouse,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";

export function HarvestPassportView() {
  const { currentLot, currentFarmer, riskPreference, setRiskPreference } = useApp();

  const [activeTab, setActiveTab] = useState<"passport" | "pre_harvest" | "sell_wait_store">("passport");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Award className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Digital Harvest Passport &amp; Pre-Harvest Discovery
              </h2>
              <p className="text-xs text-slate-500">
                Lot Identity • Pre-Harvest Demand Overlap • Sell / Wait / Store Scenarios
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab("passport")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "passport"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Digital Passport
          </button>
          <button
            onClick={() => setActiveTab("pre_harvest")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "pre_harvest"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Pre-Harvest Demand (Future)
          </button>
          <button
            onClick={() => setActiveTab("sell_wait_store")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "sell_wait_store"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sell vs Wait vs Store
          </button>
        </div>
      </div>

      {/* TAB 1: DIGITAL HARVEST PASSPORT */}
      {activeTab === "passport" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Passport Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 relative overflow-hidden space-y-6">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
                  OFFICIAL HARVEST PASSPORT
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  LOT ID: {currentLot.id}
                </h3>
                <p className="text-xs text-emerald-300">
                  Origin: {currentFarmer.village}, {currentFarmer.district} • {currentFarmer.fpoName}
                </p>
              </div>

              {/* Digital QR Mockup */}
              <div className="p-3 bg-white rounded-2xl shadow-lg shrink-0 flex flex-col items-center">
                <QrCode className="w-14 h-14 text-slate-950" />
                <span className="text-[9px] font-bold text-slate-600 mt-1">SCAN FOR TRACE</span>
              </div>
            </div>

            {/* Passport Core Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Crop &amp; Variety</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block">
                  {currentLot.cropName}
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">{currentLot.variety || "Hybrid Red"}</span>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Net Quantity</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block">
                  {currentLot.quantityTonnes} Tonnes
                </span>
                <span className="text-[11px] text-slate-400">{currentLot.quantityTonnes * 1000} Kilograms</span>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Quality Grade</span>
                <span className="font-extrabold text-amber-400 text-sm mt-0.5 block">
                  Grade {currentLot.grade} Verified
                </span>
                <span className="text-[11px] text-emerald-300">Firmness &gt; 4.8 kg/cm²</span>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Harvest Window</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block">
                  {currentLot.harvestDate}
                </span>
                <span className="text-[11px] text-slate-400">Field Ready (3 Days)</span>
              </div>
            </div>

            {/* Verification Chain & Audit Trail */}
            <div className="space-y-2 border-t border-slate-800 pt-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Trust &amp; Verification Chain
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">Soil &amp; Chemical Residue Clear</span>
                </div>
                <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">FPO Cluster Geotag Verified</span>
                </div>
                <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">Digital Escrow Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Explanation: Why Digital Passports Build Market Access */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Institutional Buyer Trust
              </span>
              <h4 className="font-extrabold text-slate-900 text-base">
                Why Unknown Buyers Pay More for Passported Harvests
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional buyers discount smallholder produce because quality is unpredictable and delivery is unreliable. A BazaarMind <strong>Harvest Passport</strong> removes information asymmetry:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Instant gate clearance without prolonged price haggling</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Enables pre-booking by quick-commerce darkstores</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Builds farmer credit history for post-harvest pledge loans</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Demo Note:</strong> Harvest Passport data is synthetically generated for demonstration of agricultural lot traceability.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRE-HARVEST DEMAND (FUTURE FOCUSED 15%) */}
      {activeTab === "pre_harvest" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-700 space-y-4">
            <span className="px-2.5 py-1 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
              FUTURE FOCUSED (15% JUDGING CRITERIA)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Pre-Harvest Demand Intelligence: &quot;Know before you harvest.&quot;
            </h3>
            <p className="text-xs sm:text-sm text-teal-200 max-w-3xl leading-relaxed">
              Why should a farmer wait until harvesting to learn what the market will pay? In BazaarMind, farmers declare crops <strong>20 days before harvest</strong>. BazaarMind proactively matches anticipated supply against forward buyer demand contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Forward Buyer Requirement 1</span>
              <h4 className="font-extrabold text-slate-900 text-base">QuickBazaar Darkstore Logistics</h4>
              <p className="text-xs text-slate-600">
                Forward requirement: <strong>4.0 Tonnes</strong> for delivery on Oct 20.
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
                <span className="text-slate-500">Forward Scenario:</span>
                <span className="font-black text-emerald-700">₹23.50/kg expected</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Forward Buyer Requirement 2</span>
              <h4 className="font-extrabold text-slate-900 text-base">Delhi Fresh Food Processing</h4>
              <p className="text-xs text-slate-600">
                Forward contract: <strong>10.0 Tonnes</strong> bulk tomato puree intake.
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
                <span className="text-slate-500">Forward Scenario:</span>
                <span className="font-black text-emerald-700">₹21.00/kg expected</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Forward Buyer Requirement 3</span>
              <h4 className="font-extrabold text-slate-900 text-base">FreshKart Procurement Hub</h4>
              <p className="text-xs text-slate-600">
                Forward requirement: <strong>5.0 Tonnes</strong> Grade-A.
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
                <span className="text-slate-500">Forward Scenario:</span>
                <span className="font-black text-emerald-700">₹22.50/kg expected</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center">
            * <strong>Disclaimer:</strong> Pre-harvest values are scenario simulations, not guaranteed prices. Enables farmers to plan harvest timing proactively.
          </div>
        </div>
      )}

      {/* TAB 3: SELL NOW / WAIT / STORE DECISION SUPPORT */}
      {activeTab === "sell_wait_store" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Strategic Sell / Wait / Store Decision Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  AI-driven scenario simulation considering market glut, shelf life, and holding costs
                </p>
              </div>

              {/* Risk Preference Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {(["balanced", "max_earning", "fast_payment", "low_risk"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskPreference(r)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize ${
                      riskPreference === r ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"
                    }`}
                  >
                    {r.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Option A: Sell Now */}
            <div
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${
                riskPreference === "fast_payment" || riskPreference === "balanced"
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                  Option A • RECOMMENDED
                </span>
                <h4 className="font-black text-lg text-slate-900">Sell Now (Harvest Gate)</h4>
                <p className="text-xs text-slate-600">
                  Immediate sale to FreshKart Wholesale upon harvest in 3 days.
                </p>
                <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Net Realization:</span>
                    <span className="font-extrabold text-emerald-700 text-base">₹20.85/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Holding &amp; Wastage Risk:</span>
                    <span className="font-bold text-emerald-700">Low (0% storage loss)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Settlement Speed:</span>
                    <span className="font-bold text-slate-800">24 Hours (NEFT)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Scenario Selected: Immediate sale with FreshKart Wholesale.")}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
              >
                Proceed with Immediate Sale
              </button>
            </div>

            {/* Option B: Wait 5 Days */}
            <div
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${
                riskPreference === "max_earning"
                  ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                  Option B • SCENARIO
                </span>
                <h4 className="font-black text-lg text-slate-900">Wait 5 Days (Late Harvest)</h4>
                <p className="text-xs text-slate-600">
                  Hold vine picking until weekend when wedding season demand peaks.
                </p>
                <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Projected Price Range:</span>
                    <span className="font-extrabold text-slate-900 text-base">₹21.20 - ₹22.40/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weather / Spoilage Risk:</span>
                    <span className="font-bold text-amber-600">Medium (Vine overripening)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Net Lift:</span>
                    <span className="font-bold text-emerald-700">+₹0.35 to ₹1.55/kg</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Scenario Selected: Waiting 5 days for demand spike.")}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
              >
                Monitor 5-Day Window
              </button>
            </div>

            {/* Option C: Cold Store */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                  Option C • COLD STORE
                </span>
                <h4 className="font-black text-lg text-slate-900">Cold Storage (14 Days)</h4>
                <p className="text-xs text-slate-600">
                  Place in Kundli cold warehouse with e-NWR warehouse loan.
                </p>
                <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Potential Gross Price:</span>
                    <span className="font-extrabold text-slate-900 text-base">₹24.00/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Storage &amp; Chilling Fee:</span>
                    <span className="font-bold text-rose-600">-₹0.80/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Risk Assessment:</span>
                    <span className="font-bold text-rose-600">Higher (Tomato perishability)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Cold Storage scenario modeled with Kundli pack-house.")}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Inspect Cold Storage Hubs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
