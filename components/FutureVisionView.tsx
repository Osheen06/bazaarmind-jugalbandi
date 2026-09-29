"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, Clock, CheckCircle2, ShieldCheck, Bot } from "lucide-react";

export function FutureVisionView() {
  const steps = [
    {
      period: "TODAY",
      title: "Price Discovery",
      desc: "Farmers harvest first, transport to an APMC mandi, and discover yesterday's auction price after paying transit and handling fees.",
      status: "Current Reality (Broken)",
      icon: Clock,
      color: "bg-stone-100 text-stone-700 border-stone-200",
    },
    {
      period: "NEXT",
      title: "Demand Discovery (BazaarMind Now)",
      desc: "BazaarMind maps harvest specifications to verified buyer demand, comparing true net realization and pooling transport before dispatch.",
      status: "BazaarMind Live Pilot",
      icon: Sparkles,
      color: "bg-forest-50 text-forest-800 border-forest-200",
      highlight: true,
    },
    {
      period: "FUTURE",
      title: "Pre-Harvest Demand Matching",
      desc: "Farmers list crops 20 days prior to harvest. Algorithmic forward contracts connect directly with quick-commerce darkstores and processing plants.",
      status: "Phase 2 Horizon",
      icon: Compass,
      color: "bg-blue-50 text-googleBlue border-blue-200",
    },
    {
      period: "VISION",
      title: "Agentic Agricultural Commerce",
      desc: "Markets proactively search for the produce they need. Autonomous orchestration handles quality certification, cold chain pooling, and instant escrow settlement.",
      status: "The New Standard",
      icon: Bot,
      color: "bg-amber-50 text-amber-900 border-amber-200",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-900 border border-forest-200">
          The Future of Indian Agricultural Commerce
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-dark tracking-tight">
          Tomorrow&apos;s market starts before the harvest.
        </h1>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
          &quot;Today, farmers search for markets. Tomorrow, markets will search for their harvest.&quot;
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.period}
              className={`p-6 rounded-2xl border transition-all ${
                step.highlight
                  ? "bg-white border-forest-600 ring-1 ring-forest-600/30 shadow-sm"
                  : "bg-white border-stone-200 shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-charcoal-light">
                      {step.period}
                    </span>
                    <h3 className="font-extrabold text-base text-charcoal-dark">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-100 text-charcoal-muted">
                  {step.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed pl-11">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Core Insight Callout */}
      <div className="bg-forest-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          &quot;Know the demand before the harvest.&quot;
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          By turning reactive post-harvest dumping into proactive forward matching, farmers gain price certainty, reduce distress sales, and eliminate transit spoilage.
        </p>
        <div className="pt-2">
          <Link
            href="/agent"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-charcoal-dark hover:bg-amber-300 transition-colors shadow-sm"
          >
            <span>Experience the Farmer Agent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
