"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DEMO_BUYERS,
  DEMO_MARKETS,
  DEMO_FPOS,
  DEMO_FARMERS,
} from "@/data/demoData";
import {
  Store,
  Building2,
  Wheat,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export function MarketMap() {
  const [filter, setFilter] = useState<"all" | "mandis" | "buyers" | "fpos" | "farms">("all");
  const [selectedNode, setSelectedNode] = useState<{
    type: "mandi" | "buyer" | "fpo" | "farm";
    id: string;
    title: string;
    subtitle: string;
    details: any;
  } | null>({
    type: "mandi",
    id: "mandi-azadpur",
    title: "Azadpur Mandi (Asia's Largest)",
    subtitle: "APMC Terminal Yard • North Delhi",
    details: {
      modalPrice: "₹23.00/kg",
      arrivalsToday: "1,450 Tonnes",
      supplyPressure: "HIGH",
      congestion: "HIGH (2.5 hr unloading delay)",
      commission: "5.5% Arhatiya",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Store className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Market Ecosystem &amp; Spatial Network
              </h2>
              <p className="text-xs text-slate-500">
                Delhi-NCR Pilot Corridor • Real-Time Supply &amp; Demand Connectivity Simulation
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          {[
            { id: "all", label: "All Nodes" },
            { id: "mandis", label: "APMC Mandis (8)" },
            { id: "buyers", label: "Verified Buyers (15)" },
            { id: "fpos", label: "FPO Hubs (5)" },
            { id: "farms", label: "Farm Clusters (20+)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.id
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Connected Market Banner for 'Our Markets' Theme */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
            Our Markets Theme
          </span>
          <h3 className="font-extrabold text-base sm:text-lg text-white">
            &quot;The market shouldn&apos;t wait for supply to arrive. The market should know where supply is needed before it arrives.&quot;
          </h3>
          <p className="text-xs text-slate-400">
            Farm ➔ FPO ➔ Wholesale ➔ Food Processor ➔ Quick Commerce ➔ City Consumer
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Active Intelligence Layer</span>
        </div>
      </div>

      {/* Interactive Map Canvas + Details Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visual (SVG Network Grid) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-6 relative min-h-[460px] flex items-center justify-center overflow-hidden border border-slate-800 shadow-xl">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Animated Connecting Supply-Demand Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Route 1: Bakhtawarpur Farm to FreshKart Wholesale */}
            <path
              d="M 220 120 Q 300 240 420 330"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
            {/* Route 2: Bakhtawarpur Farm to Ghazipur Mandi */}
            <path
              d="M 220 120 Q 320 200 480 260"
              stroke="#f43f5e"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            {/* Route 3: Shakti FPO to Delhi Fresh Kundli */}
            <path
              d="M 180 160 Q 240 100 280 90"
              stroke="#06b6d4"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 3"
            />
            {/* Route 4: Sonipat to Azadpur */}
            <path
              d="M 140 80 Q 230 160 310 180"
              stroke="#eab308"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Node 1: Bakhtawarpur Farm Cluster (Ramesh) */}
          {(filter === "all" || filter === "farms") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "farm",
                  id: "farmer-ramesh",
                  title: "Bakhtawarpur Farm Cluster",
                  subtitle: "North Delhi Pilot Node • 24 Farmers",
                  details: {
                    activeLots: "3T Tomato, 2T Onion, 4.5T Potato",
                    nearestHub: "Shakti FPO (4 km)",
                    avgHarvestDistance: "28 km to Delhi Okhla",
                  },
                })
              }
              className="absolute top-24 left-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-lg shadow-amber-500/50 group-hover:scale-125 transition-transform">
                🌾
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-500/40">
                Bakhtawarpur
              </span>
            </div>
          )}

          {/* Node 2: Shakti FPO */}
          {(filter === "all" || filter === "fpos") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "fpo",
                  id: "fpo-shakti",
                  title: "Shakti Farmer Producer Co.",
                  subtitle: "187 Members • 640 Acres Aggregated",
                  details: {
                    activeSupply: "62.4 Tonnes (Tomato, Potato, Onion)",
                    negotiationPower: "Aggregated 6.5T Lot unlocks bulk buyer",
                    rating: "4.8 / 5.0",
                  },
                })
              }
              className="absolute top-36 left-1/5 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black flex items-center justify-center text-xs shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform">
                🏢
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-cyan-500/40">
                Shakti FPO
              </span>
            </div>
          )}

          {/* Node 3: Azadpur Mandi */}
          {(filter === "all" || filter === "mandis") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "mandi",
                  id: "mandi-azadpur",
                  title: "Azadpur Mandi (APMC)",
                  subtitle: "North Delhi Terminal Market",
                  details: {
                    modalPrice: "₹23.00/kg",
                    arrivalsToday: "1,450 Tonnes",
                    supplyPressure: "HIGH",
                    congestion: "HIGH (unloading queue 2.5 hrs)",
                    commission: "5.5% Arhatiya",
                  },
                })
              }
              className="absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-9 h-9 rounded-full bg-rose-600 text-white font-black flex items-center justify-center text-xs shadow-lg shadow-rose-600/50 group-hover:scale-125 transition-transform">
                AZ
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-rose-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-rose-500/40">
                Azadpur Mandi
              </span>
            </div>
          )}

          {/* Node 4: Ghazipur Mandi */}
          {(filter === "all" || filter === "mandis") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "mandi",
                  id: "mandi-ghazipur",
                  title: "Ghazipur Fruit & Vegetable Mandi",
                  subtitle: "East Delhi APMC Yard",
                  details: {
                    modalPrice: "₹22.80/kg",
                    arrivalsToday: "820 Tonnes",
                    supplyPressure: "HIGH",
                    congestion: "HIGH",
                    commission: "5.0% Arhatiya",
                  },
                })
              }
              className="absolute top-64 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-xs shadow-lg shadow-rose-500/50 group-hover:scale-125 transition-transform">
                GZ
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-rose-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-rose-500/40">
                Ghazipur
              </span>
            </div>
          )}

          {/* Node 5: FreshKart Wholesale (Direct Buyer) */}
          {(filter === "all" || filter === "buyers") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "buyer",
                  id: "buyer-freshkart",
                  title: "FreshKart Wholesale Pvt Ltd",
                  subtitle: "Okhla Phase-III Procurement Hub",
                  details: {
                    requirement: "5 Tonnes Grade-A Tomato",
                    targetOffer: "₹22.50/kg",
                    distanceFromRamesh: "28 km",
                    paymentReliability: "96% (Next-day NEFT)",
                    fulfillmentSLA: "Within 48 hours",
                  },
                })
              }
              className="absolute bottom-20 right-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-xl shadow-emerald-500/60 group-hover:scale-125 transition-transform animate-pulse">
                FK
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-emerald-500/40">
                FreshKart Okhla
              </span>
            </div>
          )}

          {/* Node 6: Delhi Fresh Processors (Kundli) */}
          {(filter === "all" || filter === "buyers") && (
            <div
              onClick={() =>
                setSelectedNode({
                  type: "buyer",
                  id: "buyer-delhi-fresh",
                  title: "Delhi Fresh Processors",
                  subtitle: "Kundli Industrial Area • Puree Manufacturer",
                  details: {
                    requirement: "10 Tonnes Grade-B+ Tomato",
                    targetOffer: "₹21.50/kg",
                    distanceFromRamesh: "14 km",
                    paymentReliability: "94% (48-hr RTGS)",
                  },
                })
              }
              className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-black flex items-center justify-center text-xs shadow-lg shadow-teal-500/50 group-hover:scale-125 transition-transform">
                DF
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-300 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-teal-500/40">
                Delhi Fresh (Kundli)
              </span>
            </div>
          )}
        </div>

        {/* Node Detail Drawer Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                      selectedNode.type === "buyer"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedNode.type === "mandi"
                        ? "bg-rose-100 text-rose-800"
                        : selectedNode.type === "fpo"
                        ? "bg-cyan-100 text-cyan-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedNode.type} Node
                  </span>
                  <h3 className="font-black text-slate-900 text-lg mt-1.5">
                    {selectedNode.title}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedNode.subtitle}</p>
                </div>
              </div>

              {/* Dynamic Metadata Attributes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {Object.entries(selectedNode.details).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-50"
                  >
                    <span className="text-slate-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="font-bold text-slate-900">{String(val)}</span>
                  </div>
                ))}
              </div>

              {/* Node Insight Note */}
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-200">
                {selectedNode.type === "buyer" && (
                  <p>
                    ✓ <strong>Direct Gate Inbound:</strong> No middleman auction. Payment is released to digital escrow within 24h of gate quality pass.
                  </p>
                )}
                {selectedNode.type === "mandi" && (
                  <p>
                    ⚠ <strong>High Congestion:</strong> Arrivals today exceed absorption capacity by 18%, leading to distress price drops and unloading delays.
                  </p>
                )}
                {selectedNode.type === "fpo" && (
                  <p>
                    💡 <strong>Aggregation Hub:</strong> Aggregates small 1-2 tonne lots from members to meet institutional 15+ tonne buyer contracts.
                  </p>
                )}
                {selectedNode.type === "farm" && (
                  <p>
                    📍 <strong>Farm Gate Node:</strong> Produce can be picked up directly by pooled logistics without traveling to a distant mandi.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Click any node on the map to inspect live market signals.</p>
          )}

          <div className="pt-4">
            <Link
              href="/demand-radar"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Match With Demand Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
