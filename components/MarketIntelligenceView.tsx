"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export function MarketIntelligenceView() {
  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");

  // 14-day price trend simulation
  const priceTrendData = [
    { day: "Sep 17", "Azadpur Modal": 21.0, "Direct Buyer Offer": 21.8, "Net Realization": 20.1 },
    { day: "Sep 19", "Azadpur Modal": 21.5, "Direct Buyer Offer": 22.0, "Net Realization": 20.3 },
    { day: "Sep 21", "Azadpur Modal": 22.0, "Direct Buyer Offer": 22.2, "Net Realization": 20.5 },
    { day: "Sep 23", "Azadpur Modal": 23.5, "Direct Buyer Offer": 22.5, "Net Realization": 20.85 },
    { day: "Sep 25", "Azadpur Modal": 22.8, "Direct Buyer Offer": 22.5, "Net Realization": 20.8 },
    { day: "Sep 27", "Azadpur Modal": 23.0, "Direct Buyer Offer": 22.5, "Net Realization": 20.85 },
    { day: "Sep 29", "Azadpur Modal": 22.5, "Direct Buyer Offer": 22.8, "Net Realization": 21.0 },
    { day: "Oct 01 (Est)", "Azadpur Modal": 22.0, "Direct Buyer Offer": 23.0, "Net Realization": 21.2 },
  ];

  // Supply vs Demand by Market Hub
  const supplyDemandData = [
    { hub: "Okhla", "Farmer Supply (T)": 14, "Buyer Demand (T)": 28 },
    { hub: "Kundli", "Farmer Supply (T)": 22, "Buyer Demand (T)": 35 },
    { hub: "Azadpur", "Farmer Supply (T)": 45, "Buyer Demand (T)": 40 },
    { hub: "Ghazipur", "Farmer Supply (T)": 30, "Buyer Demand (T)": 25 },
    { hub: "Noida 63", "Farmer Supply (T)": 12, "Buyer Demand (T)": 24 },
    { hub: "Gurugram", "Farmer Supply (T)": 10, "Buyer Demand (T)": 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Market Intelligence &amp; Absorption Analytics
              </h2>
              <p className="text-xs text-slate-500">
                Delhi-NCR Pilot Macro Signals • Supply Pressures &amp; Net Margin Trajectories
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          {["Tomato", "Potato", "Onion", "Wheat", "Basmati Rice"].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCrop === crop
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Regional Demand Deficit</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">+42.5 Tonnes</span>
          <span className="text-emerald-600 font-semibold text-[11px] mt-0.5 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> High buyer absorption
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Avg Distance to Buyer</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">31.4 km</span>
          <span className="text-slate-500 font-medium text-[11px] mt-0.5 block">
            45% closer than central APMC
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Net Margin Advantage</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">+₹1.85/kg</span>
          <span className="text-slate-500 font-medium text-[11px] mt-0.5 block">
            Over traditional mandi auction
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <span className="text-slate-400 font-bold uppercase block">Transit Spoilage Saved</span>
          <span className="text-2xl font-black text-teal-700 mt-1 block">3.4%</span>
          <span className="text-emerald-600 font-semibold text-[11px] mt-0.5 block">
            Via direct gate delivery
          </span>
        </div>
      </div>

      {/* Chart 1: Headline Mandi vs Direct Buyer vs Net Realization */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Price Trajectory: Headline Mandi Price vs True In-Hand Net Realization (₹/kg)
            </h3>
            <p className="text-xs text-slate-500">
              Notice how net realization remains stable and superior due to eliminated 5% arhatiya deductions
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-400">14-Day Simulation Window</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis domain={[18, 25]} tick={{ fontSize: 12 }} unit="₹" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="Azadpur Modal"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Direct Buyer Offer"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Net Realization"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Supply vs Demand by Corridor Hub */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Corridor Absorption: Farmer Supply vs Institutional Buyer Demand (Tonnes)
            </h3>
            <p className="text-xs text-slate-500">
              Corridors like Okhla, Kundli, and Noida show severe demand shortages—prime opportunities for smallholders
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplyDemandData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="hub" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="T" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Farmer Supply (T)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Buyer Demand (T)" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
