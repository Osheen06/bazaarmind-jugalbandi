"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  Bot,
  Radar,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  CheckCircle2,
  PlayCircle,
  Wheat,
  Building2,
  Store,
} from "lucide-react";

export function LandingHero() {
  const { startJudgeTour } = useApp();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-12 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          {/* Theme Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Google &quot;Fund My Crazy 2.0&quot; • Theme: Our Markets</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              BAZAAR<span className="text-emerald-700">MIND</span>
            </h1>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">
              &quot;Don&apos;t just know the market.
              <br className="hidden sm:inline" /> Know where your harvest belongs.&quot;
            </p>
          </div>

          {/* Descriptor */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            An AI-powered demand-to-sale network that connects what farmers grow with who actually needs it — while optimizing the real money they take home after transport, wastage, and costs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/agent"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Try the Farmer Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/demand-radar"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Radar className="w-4 h-4 text-emerald-700" />
              <span>Explore Demand Radar</span>
            </Link>

            <button
              onClick={startJudgeTour}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-extrabold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4 text-slate-950" />
              <span>Start 90s Judge Tour</span>
            </button>
          </div>

          {/* Powered by Gemini & Simulation Trust Note */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Powered by Google Gemini 1.5 Flash
            </span>
            <span>•</span>
            <span className="italic text-slate-500">
              Prototype simulation — market and transaction values shown here are synthetic demo data.
            </span>
          </div>
        </div>

        {/* Dynamic Connected Ecosystem Flow Visual */}
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="text-center mb-6">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950 uppercase tracking-wider">
                CORE PRODUCT ARCHITECTURE
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-white mt-1">
                SENSE → DECIDE → MATCH → EXECUTE → LEARN
              </h3>
            </div>

            {/* Nodes Chain Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">🌾</span>
                <span className="font-extrabold text-white text-[11px]">1. FARMER</span>
                <span className="text-[10px] text-slate-400">Ramesh (Hindi)</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">📦</span>
                <span className="font-extrabold text-white text-[11px]">2. SUPPLY</span>
                <span className="text-[10px] text-slate-400">3T Tomato (Grade A)</span>
              </div>

              <div className="p-3 bg-gradient-to-tr from-emerald-800 to-teal-700 rounded-xl border border-emerald-500 shadow-md shadow-emerald-500/20 flex flex-col items-center justify-center space-y-1">
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                <span className="font-extrabold text-white text-[11px]">3. BAZAARMIND AI</span>
                <span className="text-[10px] text-emerald-200">Gemini Reasoning</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">📡</span>
                <span className="font-extrabold text-white text-[11px]">4. DEMAND</span>
                <span className="text-[10px] text-slate-400">Demand Radar</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">🏢</span>
                <span className="font-extrabold text-white text-[11px]">5. BUYERS</span>
                <span className="text-[10px] text-slate-400">FreshKart / Mandis</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">🚚</span>
                <span className="font-extrabold text-white text-[11px]">6. LOGISTICS</span>
                <span className="text-[10px] text-slate-400">Pooled Routes</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-1">
                <span className="text-lg">💰</span>
                <span className="font-extrabold text-emerald-400 text-[11px]">7. SALE</span>
                <span className="text-[10px] text-amber-300">₹20.85/kg Net Earning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              The Reality in Indian Agriculture
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              &quot;Farmers see prices. Buyers see demand. Neither side sees the whole market.&quot;
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When a smallholder farmer in North Delhi harvests 3 tonnes of tomatoes, they load a vehicle and drive to Azadpur Mandi hoping for a fair auction. They don&apos;t know that 28 km away, a quick-commerce warehouse desperately needs 5 tonnes of Grade-A tomatoes and will pay ₹22.50/kg with guaranteed direct bank transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="text-xs font-extrabold text-rose-800 uppercase block">1. The Mandi Illusion</span>
              <p className="text-xs text-rose-950 leading-relaxed">
                Headline mandi prices hide 5% arhatiya commission, long unloading queues, and transit spoilage that consume up to 20% of the farmer&apos;s revenue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-xs font-extrabold text-amber-800 uppercase block">2. Reverse Blindness</span>
              <p className="text-xs text-amber-950 leading-relaxed">
                Institutional buyers spend millions hunting for supply through layers of middlemen, while farmers literally dump produce nearby during local gluts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-extrabold text-emerald-800 uppercase block">3. The BazaarMind Fix</span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                BazaarMind acts as the intelligent orchestration layer: matching supply to demand, calculating true net earnings, and pooling transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SIGNATURE FEATURES HIGHLIGHT */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Explore the Prototype
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Three Core Innovations in BazaarMind
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/demand-radar"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Radar className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">
                1. Demand Radar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spatial absorption engine scanning 30+ buyers and mandis. Ranks opportunities by transparent factors: Demand fit, net realization, and buyer reliability.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>View Demand Radar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/net-realization"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">
                2. Net Realization Engine
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your real earning is not the mandi price. Deducts freight, handling, commission, and transit wastage to show what actually lands in your bank account.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>Simulate Real Earnings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/harvest"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">
                3. Pre-Harvest Demand (Future)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover buyer demand 20 days before harvest. Digital Harvest Passports (e.g. TM-2026-00482) create verifiable institutional trust.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>Inspect Harvest Passport</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to experience BazaarMind in action?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto">
            Experience the complete 9-step farmer journey from spoken Hindi query to buyer matching, quote negotiation, logistics pooling, and transaction settlement.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/agent"
              className="px-7 py-3 rounded-2xl text-xs font-black bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md transition-all hover:scale-[1.02]"
            >
              Start Ramesh&apos;s Demo Journey
            </Link>
            <button
              onClick={startJudgeTour}
              className="px-7 py-3 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              Guided 90-Second Judge Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
