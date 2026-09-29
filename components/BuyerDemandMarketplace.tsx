"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { BuyerDemand } from "@/types";
import {
  Building2,
  Filter,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight,
} from "lucide-react";

export function BuyerDemandMarketplace() {
  const { activeBuyerDemands, addNewBuyerDemand } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [selectedGrade, setSelectedGrade] = useState<string>("All");
  const [isPostingModalOpen, setIsPostingModalOpen] = useState<boolean>(false);
  const [showReverseProcurementModal, setShowReverseProcurementModal] = useState<boolean>(false);

  // New Demand Form State
  const [newCrop, setNewCrop] = useState("Tomato");
  const [newQty, setNewQty] = useState("10");
  const [newGrade, setNewGrade] = useState<"A" | "B" | "C">("A");
  const [newTargetPrice, setNewTargetPrice] = useState("23.0");
  const [newLocation, setNewLocation] = useState("Okhla Phase-III Logistics Center");
  const [newDeadlineHours, setNewDeadlineHours] = useState("48");

  const filteredDemands = activeBuyerDemands.filter((d) => {
    if (selectedCrop !== "All" && d.cropName.toLowerCase() !== selectedCrop.toLowerCase()) return false;
    if (selectedGrade !== "All" && d.grade !== selectedGrade) return false;
    return true;
  });

  const handleCreateDemand = (e: React.FormEvent) => {
    e.preventDefault();
    addNewBuyerDemand({
      buyerName: "FreshCart Institutional Procurement",
      cropName: newCrop,
      requiredQuantityTonnes: parseFloat(newQty),
      grade: newGrade,
      targetPricePerKg: parseFloat(newTargetPrice),
      deliveryLocation: newLocation,
      deadlineHours: parseInt(newDeadlineHours, 10),
    });
    setIsPostingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Live Buyer Demand Marketplace
              </h2>
              <p className="text-xs text-slate-500">
                Verified institutional requirements • Quick-commerce, retail chains, and food processors
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowReverseProcurementModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Reverse Procurement Demo</span>
          </button>

          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Buyer Demand</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            Filter Crop:
          </span>
          {["All", "Tomato", "Potato", "Onion", "Wheat", "Basmati Rice", "Mustard Seed"].map(
            (c) => (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  selectedCrop === c
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {c}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Grade:</span>
          {["All", "A", "B"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                selectedGrade === g
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              Grade {g}
            </button>
          ))}
        </div>
      </div>

      {/* Demands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDemands.map((demand) => (
          <div
            key={demand.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    VERIFIED BUYER
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    {demand.buyerName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-700">
                    ₹{demand.targetPricePerKg.toFixed(2)}/kg
                  </span>
                  <span className="text-[10px] text-slate-400 block">Target Offer</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Commodity &amp; Grade:</span>
                  <span className="font-bold text-slate-900">
                    {demand.cropName} (Grade {demand.grade})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Required Quantity:</span>
                  <span className="font-bold text-slate-900">
                    {demand.requiredQuantityTonnes} Tonnes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery SLA:</span>
                  <span className="font-bold text-amber-600">
                    Within {demand.deadlineHours} Hours
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{demand.deliveryLocation}</span>
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Payment: {demand.paymentTerms}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready for Direct Match</span>
              </span>

              <button
                onClick={() => {
                  alert(
                    `BazaarMind Match: Connecting ${demand.buyerName} with available farm clusters in North Delhi.`
                  );
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1"
              >
                <span>Fulfill Demand</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reverse Procurement Modal ("Buyers don't search for farmers. BazaarMind searches for supply.") */}
      {showReverseProcurementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Signature Reverse Procurement
                </span>
                <h3 className="font-black text-xl text-slate-900 mt-1">
                  &quot;Buyers don&apos;t search for farmers. BazaarMind searches for supply.&quot;
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulated Buyer Request: Need 20 Tonnes Grade-A Potato by Friday
                </p>
              </div>
              <button
                onClick={() => setShowReverseProcurementModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Aggregated Supply Search Breakdown */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-900">
                  BazaarMind Multi-Cluster Supply Synthesis:
                </span>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                  17 Tonnes Immediate Match Found
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Shakti FPO (Aggregated)</span>
                    <span className="text-[11px] text-slate-500">8 Members combined • 14 km distance</span>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">8.0 Tonnes</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Kisan Unnati Producer Co.</span>
                    <span className="text-[11px] text-slate-500">Sonipat Cluster • Field inspected Grade A</span>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">6.0 Tonnes</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Bakhtawarpur Independent Farm Cluster</span>
                    <span className="text-[11px] text-slate-500">Harish Verma + Manoj Sharma</span>
                  </div>
                  <span className="font-black text-emerald-700 text-sm">3.0 Tonnes</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                <span>Total Immediate Aggregate: 17 Tonnes (85% Fulfilled)</span>
                <span>Remaining 3T queued from upcoming Jewar harvest</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowReverseProcurementModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(
                    "Procurement Offer Created! BazaarMind dispatched digital escrow purchase contracts to the 3 aggregated supplier nodes."
                  );
                  setShowReverseProcurementModal(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md flex items-center gap-1.5"
              >
                <span>Build Consolidated Procurement Offer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Buyer Demand Modal */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  Post Institutional Buyer Demand
                </h3>
                <p className="text-xs text-slate-500">
                  Broadcast your procurement specifications to verified farm clusters &amp; FPOs
                </p>
              </div>
              <button
                onClick={() => setIsPostingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDemand} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Commodity</label>
                <select
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Tomato">Tomato (टमाटर)</option>
                  <option value="Potato">Potato (आलू)</option>
                  <option value="Onion">Onion (प्याज)</option>
                  <option value="Wheat">Wheat (गेहूं)</option>
                  <option value="Basmati Rice">Basmati Rice (बासमती चावल)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity (Tonnes)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Minimum Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                  >
                    <option value="A">Grade A (Premium)</option>
                    <option value="B">Grade B (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTargetPrice}
                    onChange={(e) => setNewTargetPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery SLA (Hours)</label>
                  <input
                    type="number"
                    value={newDeadlineHours}
                    onChange={(e) => setNewDeadlineHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Inbound Delivery Hub</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md"
                >
                  Publish Demand Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
