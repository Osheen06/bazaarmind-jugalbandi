"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DEMO_TRANSPORTS } from "@/data/demoData";
import {
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  CreditCard,
  Leaf,
} from "lucide-react";

export function LogisticsAndTransactions() {
  const {
    currentLot,
    currentFarmer,
    selectedOpportunity,
    logisticsBooking,
    bookLogistics,
    transactions,
  } = useApp();

  const [selectedTransportId, setSelectedTransportId] = useState<string>("trans-02");
  const [poolingAccepted, setPoolingAccepted] = useState<boolean>(true);

  const handleBook = (transId: string, pooled: boolean) => {
    setSelectedTransportId(transId);
    setPoolingAccepted(pooled);
    bookLogistics(transId, pooled);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Truck className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Move My Harvest &amp; Transactions
              </h2>
              <p className="text-xs text-slate-500">
                Route Pooling • Logistics Orchestration • Digital Escrow &amp; Impact Tracking
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Pooled Shipment Saves Up to 33% Freight</span>
        </div>
      </div>

      {/* MOVE MY HARVEST: POOLED LOGISTICS FINDER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              Move My Harvest
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-1">
              Active Dispatch: {currentLot.quantityTonnes}T {currentLot.cropName} to {selectedOpportunity?.name || "FreshKart Wholesale"}
            </h3>
            <p className="text-xs text-slate-500">
              Pickup: {currentFarmer.village}, {currentFarmer.district} ➔ Destination: Okhla Hub, Delhi (28 km)
            </p>
          </div>
        </div>

        {/* Nearby Farmer Pooling Opportunity Callout */}
        <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-black text-emerald-950 text-sm block">
                2 Nearby Farmers Found on the Same Route Corridor!
              </span>
              <p className="text-slate-700">
                <strong>Suresh Yadav</strong> (1.5T Tomato in Tigipur) and <strong>Sunita Devi</strong> (2T Tomato in Narela) are also sending produce toward Okhla tomorrow morning.
              </p>
              <div className="flex items-center gap-3 text-emerald-800 font-semibold pt-1">
                <span>Individual Trip: ₹2,700</span>
                <span>•</span>
                <span className="font-black text-emerald-700 text-sm">Pooled Truck: ₹1,800</span>
                <span>•</span>
                <span className="bg-emerald-200/80 px-2 py-0.5 rounded font-black text-emerald-950">
                  You Save: ₹900 (33%)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleBook("trans-02", true)}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white shadow-md flex items-center gap-1.5 shrink-0 transition-all hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Pool Shipment &amp; Save ₹900</span>
          </button>
        </div>

        {/* Transport Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_TRANSPORTS.slice(0, 3).map((t) => {
            const isSelected = logisticsBooking.transportOption?.id === t.id;

            return (
              <div
                key={t.id}
                onClick={() => handleBook(t.id, t.isPooled)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        t.isPooled ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {t.isPooled ? "POOLED ROUTE" : "DEDICATED VEHICLE"}
                    </span>
                    <span className="text-base font-black text-slate-900">
                      ₹{t.costEstimate.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 mt-2">{t.providerName}</h4>
                  <p className="text-xs text-slate-500">{t.vehicleType}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <div className="flex justify-between">
                    <span>Pickup Window:</span>
                    <span className="font-semibold text-slate-800">{t.pickupWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery ETA:</span>
                    <span className="font-semibold text-slate-800">{t.deliveryEta}</span>
                  </div>
                  {t.carbonSavedKg && t.carbonSavedKg > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Carbon Saved:
                      </span>
                      <span>{t.carbonSavedKg} kg CO₂</span>
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? "Selected & Booked ✓" : "Choose Vehicle"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT TRANSACTIONS & ESCROW TRACKING */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-700" />
            <span>Active &amp; Past Transactions (Digital Escrow Lifecycle)</span>
          </h3>
          <span className="text-xs text-slate-500">Auto-settled via NEFT/UPI</span>
        </div>

        <div className="space-y-3">
          {transactions.map((txn) => {
            const isCompleted = txn.status === "payment_received";
            const isInTransit = txn.status === "in_transit";
            const isBooked = txn.status === "logistics_booked";

            return (
              <div
                key={txn.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{txn.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : isInTransit
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {txn.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-slate-400">• {txn.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    {txn.cropName} • {txn.quantityTonnes} Tonnes to <strong>{txn.buyerName}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Transporter: {txn.transportProvider || "AgriLogix Route Shared"} • Delivery: {txn.deliveryLocation}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-lg font-black text-slate-900">
                    ₹{txn.totalAmount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Net Take-Home: ₹{txn.estimatedNetPerKg.toFixed(2)}/kg
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Escrow: {txn.escrowStatus.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ECONOMIC IMPACT CARD */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-1 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
            MEASURABLE FARMER IMPACT
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Expected Incremental Value for Ramesh
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            By selling 3T tomatoes to FreshKart Wholesale (+₹1.15/kg net vs Ghazipur Mandi) and pooling transport with nearby Bakhtawarpur farmers (saving ₹900), Ramesh takes home <strong>+₹4,350 additional cash</strong> on this single harvest.
          </p>
          <span className="text-[10px] text-slate-400 block pt-1">
            * Illustrative simulation metric based on standardized freight and commission models.
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center shrink-0 w-full md:w-auto">
          <span className="text-xs text-emerald-300 block font-bold">Total Single-Harvest Lift</span>
          <span className="text-3xl sm:text-4xl font-black text-amber-300 block mt-1">+₹4,350</span>
          <span className="text-[11px] text-slate-300 block mt-0.5">(+21.4% Net Income Lift)</span>
        </div>
      </div>
    </div>
  );
}
