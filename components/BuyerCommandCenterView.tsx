"use client";

import React, { useState } from "react";
import { DEMO_BUYERS, DEMO_BUYER_DEMANDS } from "@/data/demoData";
import {
  Store,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
} from "lucide-react";

export function BuyerCommandCenterView() {
  const buyer = DEMO_BUYERS[0]; // FreshKart Wholesale Pvt Ltd

  const [activeTab, setActiveTab] = useState<"procurement" | "matches" | "deliveries" | "reliability">("procurement");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Store className="w-5 h-5 text-purple-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Buyer Procurement Desk
              </h2>
              <p className="text-xs text-slate-500">
                {buyer.name} • {buyer.district}, {buyer.state} • Quick-Commerce Sourcing
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            Escrow Rating: {buyer.paymentReliabilityPercent}% Verified
          </span>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Completed POs</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {buyer.completedTransactionsCount} Orders
          </span>
          <span className="text-emerald-600 font-semibold text-[11px] mt-0.5 block">
            {buyer.fulfillmentRatePercent}% Fulfilled SLA
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Avg Settlement</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">
            {buyer.avgSettlementHours} Hours
          </span>
          <span className="text-slate-500 font-medium text-[11px] mt-0.5 block">
            Direct Bank NEFT / Escrow
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Supplier Retention</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">
            {buyer.repeatSuppliersPercent}% Repeat
          </span>
          <span className="text-slate-500 font-medium text-[11px] mt-0.5 block">
            Across 14 Farm Clusters
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Active Daily Inbound</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">18.5 Tonnes</span>
          <span className="text-slate-500 font-medium text-[11px] mt-0.5 block">
            In Transit to Okhla Hub
          </span>
        </div>
      </div>

      {/* Procurement Inbound Matches */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              Automated Sourcing Match
            </span>
            <h3 className="font-black text-lg text-slate-900 mt-1">
              Active Requirement: 10 Tonnes Grade-A Tomato by Friday
            </h3>
            <p className="text-xs text-slate-500">
              BazaarMind automated matching engine queried verified farm-gate clusters within 45 km radius
            </p>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black">
            12.6 Tonnes Supply Found (126% Coverage)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <span className="font-extrabold text-slate-900 text-sm block">
              Shakti Farmer Producer Co.
            </span>
            <p className="text-slate-600">Bakhtawarpur &amp; Tigipur members combined lot.</p>
            <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
              <span>Matched Volume:</span>
              <span className="text-emerald-700 font-black">5.0 Tonnes</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Distance: 28 km • Gate ETA: 2h</span>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <span className="font-extrabold text-slate-900 text-sm block">
              Kisan Unnati Producer Co.
            </span>
            <p className="text-slate-600">Sonipat agricultural corridor cluster.</p>
            <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
              <span>Matched Volume:</span>
              <span className="text-emerald-700 font-black">3.6 Tonnes</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Distance: 38 km • Gate ETA: 3.5h</span>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <span className="font-extrabold text-slate-900 text-sm block">
              North Delhi Independent Collective
            </span>
            <p className="text-slate-600">Ramesh Kumar + Sunita Devi lots.</p>
            <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
              <span>Matched Volume:</span>
              <span className="text-emerald-700 font-black">4.0 Tonnes</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Distance: 26 km • Gate ETA: 2h</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() =>
              alert("Consolidated Purchase Orders Dispatched to the 3 Matched Farmer Groups!")
            }
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center gap-1.5"
          >
            <span>Confirm &amp; Lock Inbound Inflow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
