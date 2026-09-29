"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Target,
  Layers,
  Cpu,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Compass,
} from "lucide-react";

export function AboutView() {
  const [farmerCount, setFarmerCount] = useState<number>(1000);
  const [buyerCount, setBuyerCount] = useState<number>(100);
  const [avgLotTonnes, setAvgLotTonnes] = useState<number>(3.5);
  const [takeRatePercent, setTakeRatePercent] = useState<number>(1.5);

  // Illustrative business model math
  const monthlyGmv = farmerCount * avgLotTonnes * 1000 * 22; // ~₹7.7 Cr GMV
  const monthlyRevenue = (monthlyGmv * takeRatePercent) / 100;

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/80 relative overflow-hidden space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Google &quot;Fund My Crazy 2.0&quot;
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            &quot;Don&apos;t just know the market. Know where your harvest belongs.&quot;
          </h1>
          <p className="text-sm sm:text-base text-emerald-200 leading-relaxed">
            BAZAARMIND turns fragmented agricultural market signals into an actionable selling decision for the Indian smallholder farmer: <strong>WHAT</strong> to sell, <strong>WHERE</strong> to sell, <strong>WHEN</strong> to sell, <strong>WHO</strong> needs it, and what will be <strong>ACTUALLY EARNED</strong> after costs.
          </p>
        </div>

        {/* 5 Competition Judging Pillars Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-slate-800 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-400 font-black block uppercase">VISION • 30%</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Intelligent Network vs Price Board</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-400 font-black block uppercase">REAL RELEVANCE • 20%</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Voice-First Hindi for Low-Literacy</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-400 font-black block uppercase">GEMINI • 20%</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Intent Extraction &amp; Agent Planning</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-400 font-black block uppercase">FUTURE FOCUSED • 15%</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Pre-Harvest Demand Discovery</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-400 font-black block uppercase">EXECUTION • 15%</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Human-in-the-Loop Safe AI</span>
          </div>
        </div>
      </div>

      {/* CORE PRODUCT THESIS: THE CONCEPTUAL LEAP */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            The Conceptual Leap
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Today&apos;s Agricultural Apps Fail the Farmer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Existing government portals and mandi-price apps publish yesterday&apos;s modal price. But knowing tomato is ₹23/kg at Ghazipur does not help a farmer with 3 tonnes who will spend ₹1.60/kg in transport, pay 5% to an arhatiya, and lose 5% of their crop in bumper-to-bumper yard queues.
          </p>
        </div>

        {/* Matrix Comparison */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                <th className="py-3 px-4 font-bold">Dimension</th>
                <th className="py-3 px-4 font-bold text-slate-500">Traditional Market App</th>
                <th className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/70">
                  BazaarMind AI Network
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Core Proposition</td>
                <td className="py-3 px-4 text-slate-600">Information Display (&quot;Here is the price&quot;)</td>
                <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                  Decision &amp; Action (&quot;Sell here for highest take-home&quot;)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Economic Metric</td>
                <td className="py-3 px-4 text-slate-600">Gross Headline Mandi Price</td>
                <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                  Net Realization (Deducting transport, wastage, commission)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Buyer Connectivity</td>
                <td className="py-3 px-4 text-slate-600">Static Trader Directory (Manual calls)</td>
                <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                  Live Intent Matching &amp; Automated Reverse Procurement
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">AI Integration</td>
                <td className="py-3 px-4 text-slate-600">Conversational Chatbot Widget</td>
                <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                  Autonomous Multi-Step Agent Plan with Human Approval
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Temporal Horizon</td>
                <td className="py-3 px-4 text-slate-600">Post-Harvest Mandi Dumping</td>
                <td className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                  Pre-Harvest Demand Discovery (20 Days in Advance)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MARKET OPPORTUNITY: TAM / SAM / SOM */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Market Opportunity Framework
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">TAM / SAM / SOM</h3>
            <p className="text-xs text-slate-500">
              Clear research placeholder framework for venture evaluation
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            RESEARCH ESTIMATES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              TAM (Total Addressable Market)
            </span>
            <span className="text-3xl font-black text-slate-900 block">$450 Billion</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total gross value of agricultural crop output in India across food grains, oilseeds, and horticulture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              SAM (Serviceable Addressable Market)
            </span>
            <span className="text-3xl font-black text-emerald-800 block">$68 Billion</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-perishability horticulture (fruits, vegetables) and commercial crops with acute need for net realization optimization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
            <span className="text-xs font-black text-teal-800 uppercase tracking-wider">
              SOM (Serviceable Obtainable Market)
            </span>
            <span className="text-3xl font-black text-teal-800 block">$1.2 Billion</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Delhi-NCR and Western UP agricultural trade corridor (Pilot Cluster covering Azadpur, Kundli, Okhla, Sonipat, Noida).
            </p>
          </div>
        </div>
      </div>

      {/* ILLUSTRATIVE BUSINESS MODEL CALCULATOR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Monetization Strategy
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              Illustrative Business Model Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Farmers receive 100% free core access • Revenue generated from institutional buyer take-rate and pooled logistics
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-500">Illustrative Scenario Only</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Active Farmers in Pilot:</label>
            <input
              type="number"
              value={farmerCount}
              onChange={(e) => setFarmerCount(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Active Institutional Buyers:</label>
            <input
              type="number"
              value={buyerCount}
              onChange={(e) => setBuyerCount(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Avg Lot Size (Tonnes):</label>
            <input
              type="number"
              step="0.5"
              value={avgLotTonnes}
              onChange={(e) => setAvgLotTonnes(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Buyer Take Rate (%):</label>
            <input
              type="number"
              step="0.1"
              value={takeRatePercent}
              onChange={(e) => setTakeRatePercent(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>
        </div>

        {/* Calculation Summary Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Projected Monthly Network GMV
            </span>
            <span className="text-3xl font-black text-white block mt-1">
              ₹{(monthlyGmv / 10000000).toFixed(2)} Crore
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Based on {farmerCount.toLocaleString()} farmers selling ~{avgLotTonnes}T harvest
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">
              Projected Monthly Platform Revenue
            </span>
            <span className="text-3xl font-black text-amber-300 block mt-1">
              ₹{(monthlyRevenue / 100000).toFixed(2)} Lakh
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              At {takeRatePercent}% procurement commission paid by corporate buyers
            </span>
          </div>
        </div>
      </div>

      {/* TRUST & SAFETY MANIFESTO */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <h3 className="text-2xl font-black text-slate-900">
            Trust, Safety &amp; Responsible AI Principles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 text-sm block">
              1. Decision Support, Not Guaranteed Predictions
            </span>
            <p>
              BazaarMind presents probabilistic scenarios based on transparent real-time data signals. We never promise guaranteed future prices to vulnerable smallholders.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 text-sm block">
              2. Mandatory Human-in-the-Loop Approval
            </span>
            <p>
              The AI agent autonomously searches, analyzes, and drafts contracts, but a binding monetary transaction can NEVER execute without explicit, consent-driven farmer approval.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 text-sm block">
              3. Transparent Net Realization Formulas
            </span>
            <p>
              Every recommendation displays full breakdown math: transport, handling, commission, and estimated transit wastage. No arbitrary black-box scores.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 text-sm block">
              4. Complete Separation of Simulation &amp; Live Data
            </span>
            <p>
              In prototype mode, all data is explicitly marked &quot;SIMULATION DATA&quot;. In production, live connections to e-NAM, Agmarknet, and verified bank escrows maintain strict data integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
