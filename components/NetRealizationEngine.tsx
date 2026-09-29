"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { calculateNetRealization, convertToKg, formatCurrency } from "@/lib/utils";
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Percent,
  Truck,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Sliders,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function NetRealizationEngine() {
  const { currentLot } = useApp();

  // Interactive Sliders State
  const [quotedPrice, setQuotedPrice] = useState<number>(22.5);
  const [quantityTonnes, setQuantityTonnes] = useState<number>(3.0);
  const [distanceKm, setDistanceKm] = useState<number>(28);
  const [handlingCost, setHandlingCost] = useState<number>(0.35);
  const [commissionPercent, setCommissionPercent] = useState<number>(0);
  const [wastagePercent, setWastagePercent] = useState<number>(1.8);
  const [storageCost, setStorageCost] = useState<number>(0);
  const [otherCosts, setOtherCosts] = useState<number>(0.15);

  // Live Dynamic Calculation
  const netBreakdown = calculateNetRealization({
    quotedPricePerKg: quotedPrice,
    quantityTonnes,
    distanceKm,
    transportRatePerKmKg: 0.025,
    handlingCostPerKg: handlingCost,
    commissionPercent,
    expectedWastagePercent: wastagePercent,
    storageCostPerKg: storageCost,
    otherCostsPerKg: otherCosts,
  });

  // Benchmark Comparisons
  const mandiBenchmark = calculateNetRealization({
    quotedPricePerKg: 23.0,
    quantityTonnes,
    distanceKm: 46,
    transportRatePerKmKg: 0.028,
    handlingCostPerKg: 0.55,
    commissionPercent: 5.0, // 5% APMC Arhatiya commission
    expectedWastagePercent: 5.2, // Congested unloading damage
    storageCostPerKg: 0,
    otherCostsPerKg: 0.35, // Gate fees & tolls
  });

  const processorBenchmark = calculateNetRealization({
    quotedPricePerKg: 21.5,
    quantityTonnes,
    distanceKm: 14,
    transportRatePerKmKg: 0.025,
    handlingCostPerKg: 0.3,
    commissionPercent: 0,
    expectedWastagePercent: 1.2,
    storageCostPerKg: 0,
    otherCostsPerKg: 0.1,
  });

  // Chart Data
  const chartData = [
    {
      name: "FreshKart (Direct)",
      "Gross Quoted": 22.5,
      "Deductions (Costs)": Number((22.5 - 20.85).toFixed(2)),
      "Net Farmer Earning": 20.85,
    },
    {
      name: "Ghazipur Mandi (APMC)",
      "Gross Quoted": 23.0,
      "Deductions (Costs)": Number((23.0 - 19.7).toFixed(2)),
      "Net Farmer Earning": 19.7,
    },
    {
      name: "Food Processor",
      "Gross Quoted": 21.5,
      "Deductions (Costs)": Number((21.5 - 20.18).toFixed(2)),
      "Net Farmer Earning": 20.18,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Calculator className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Net Realization Engine
              </h2>
              <p className="text-xs text-slate-500">
                Formula: Net Realization = Quoted Price − Transport − Handling − Commission − Wastage − Storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              Your Real Earning ≠ Mandi Price
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Reality Check Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Scenario 1: BazaarMind Direct Buyer */}
        <div className="bg-emerald-900 text-white rounded-2xl p-5 shadow-lg border border-emerald-700 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              Optimal Choice
            </span>
            <h3 className="font-extrabold text-lg text-white">FreshKart Wholesale</h3>
            <p className="text-xs text-emerald-200">
              Direct institutional buyer • 28 km route • 0% commission
            </p>

            <div className="pt-3 border-t border-emerald-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-emerald-200">
                <span>Quoted Price:</span>
                <span className="font-bold text-white">₹22.50/kg</span>
              </div>
              <div className="flex justify-between text-emerald-200">
                <span>Transport &amp; Freight:</span>
                <span className="font-bold text-white">-₹0.90/kg</span>
              </div>
              <div className="flex justify-between text-emerald-200">
                <span>APMC Commission (0%):</span>
                <span className="font-bold text-emerald-300">₹0.00/kg (Saved!)</span>
              </div>
              <div className="flex justify-between text-emerald-200">
                <span>Handling &amp; Wastage (1.8%):</span>
                <span className="font-bold text-white">-₹0.75/kg</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-200">In-Hand Net Realization:</span>
            <span className="text-2xl font-black text-amber-300">₹20.85/kg</span>
          </div>
        </div>

        {/* Scenario 2: Traditional APMC Mandi */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-200 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">
              Traditional Mandi
            </span>
            <h3 className="font-extrabold text-lg text-slate-900">Ghazipur Mandi (APMC)</h3>
            <p className="text-xs text-slate-500">
              Auction yard • 46 km route • 5% arhatiya commission
            </p>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Headline Modal Price:</span>
                <span className="font-bold text-slate-900 line-through text-slate-400">₹23.00/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Transport &amp; Tolls:</span>
                <span className="font-bold text-rose-600">-₹1.60/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>5% Arhatiya Commission:</span>
                <span className="font-bold text-rose-600">-₹1.15/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Congestion Wastage (5.2%):</span>
                <span className="font-bold text-rose-600">-₹1.20/kg</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Actual Net In-Hand:</span>
            <span className="text-2xl font-black text-rose-600">₹19.70/kg</span>
          </div>
        </div>

        {/* Scenario 3: Industrial Food Processor */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
              Industrial Processor
            </span>
            <h3 className="font-extrabold text-lg text-slate-900">Delhi Fresh Processors</h3>
            <p className="text-xs text-slate-500">
              Puree manufacturing • 14 km route • Bulk absorption
            </p>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Quoted Offer Price:</span>
                <span className="font-bold text-slate-900">₹21.50/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Transport &amp; Freight:</span>
                <span className="font-bold text-slate-900">-₹0.60/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Commission (0%):</span>
                <span className="font-bold text-emerald-600">₹0.00/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Handling &amp; Wastage (1.2%):</span>
                <span className="font-bold text-slate-900">-₹0.72/kg</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Expected Net In-Hand:</span>
            <span className="text-2xl font-black text-teal-700">₹20.18/kg</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sliders */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-700" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Interactive Net Realization Simulator
            </h3>
          </div>
          <span className="text-xs text-slate-500">Move sliders to see deductions update in real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Slider 1: Quoted Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Quoted Price:</span>
              <span className="text-emerald-700">₹{quotedPrice.toFixed(2)}/kg</span>
            </div>
            <input
              type="range"
              min={15}
              max={35}
              step={0.5}
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(parseFloat(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Range: ₹15 to ₹35/kg</span>
          </div>

          {/* Slider 2: Distance */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Distance:</span>
              <span className="text-emerald-700">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Freight scales with route length</span>
          </div>

          {/* Slider 3: Commission */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Commission / Mandi Fee:</span>
              <span className={commissionPercent > 0 ? "text-rose-600" : "text-emerald-700"}>
                {commissionPercent}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={0.5}
              value={commissionPercent}
              onChange={(e) => setCommissionPercent(parseFloat(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Direct buyers = 0%; Mandis = 4-6%</span>
          </div>

          {/* Slider 4: Wastage */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Transit &amp; Gate Wastage:</span>
              <span className="text-emerald-700">{wastagePercent}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.1}
              value={wastagePercent}
              onChange={(e) => setWastagePercent(parseFloat(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Spoilage during haulage &amp; queue</span>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Simulated Result for {quantityTonnes}T ({quantityTonnes * 1000} kg)
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-amber-300">
                ₹{netBreakdown.netRealizationPerKg.toFixed(2)}/kg
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                (Gross ₹{quotedPrice.toFixed(2)} − Deductions ₹{netBreakdown.totalDeductionsPerKg.toFixed(2)})
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Net In-Hand Earning</span>
            <span className="text-2xl font-black text-white">
              {formatCurrency(netBreakdown.netTakeHomeRevenue, false)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Recharts Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Comparison: Gross Quoted vs Actual In-Hand Realization (₹/kg)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 26]} tick={{ fontSize: 12 }} unit="₹" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Gross Quoted" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Deductions (Costs)" fill="#f87171" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Net Farmer Earning" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
