"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Compass, Cpu, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                BAZAAR<span className="text-emerald-400">MIND</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              &quot;Don&apos;t just know the market. Know where your harvest belongs.&quot;
            </p>
            <p className="text-xs text-slate-500">
              AI Demand-to-Sale Network for Indian Agriculture. SENSE → DECIDE → MATCH → EXECUTE → LEARN.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Cpu className="w-3 h-3 text-emerald-400" />
                Google &apos;Fund My Crazy 2.0&apos;
              </span>
            </div>
          </div>

          {/* Col 2: Core Product Loops */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/agent" className="hover:text-emerald-400 transition-colors">
                  Farmer Voice Agent (Hindi/Hinglish)
                </Link>
              </li>
              <li>
                <Link href="/demand-radar" className="hover:text-emerald-400 transition-colors">
                  Signature Demand Radar
                </Link>
              </li>
              <li>
                <Link href="/net-realization" className="hover:text-emerald-400 transition-colors">
                  Net Realization Engine
                </Link>
              </li>
              <li>
                <Link href="/markets" className="hover:text-emerald-400 transition-colors">
                  Market Ecosystem &amp; Map
                </Link>
              </li>
              <li>
                <Link href="/buyer-demand" className="hover:text-emerald-400 transition-colors">
                  Reverse Procurement Marketplace
                </Link>
              </li>
              <li>
                <Link href="/harvest" className="hover:text-emerald-400 transition-colors">
                  Pre-Harvest Demand &amp; Passport
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Roles */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Market Stakeholders
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/fpo" className="hover:text-emerald-400 transition-colors">
                  FPO Command Center (Supply Pooling)
                </Link>
              </li>
              <li>
                <Link href="/buyer" className="hover:text-emerald-400 transition-colors">
                  Buyer Procurement Desk
                </Link>
              </li>
              <li>
                <Link href="/transactions" className="hover:text-emerald-400 transition-colors">
                  Pooled Logistics &amp; Escrow
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="hover:text-emerald-400 transition-colors">
                  Government Schemes Finder
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-emerald-400 transition-colors">
                  Market Intelligence &amp; Analytics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Vision, TAM/SAM/SOM &amp; Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Judging Criteria Alignment */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Evaluation Dimensions
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>Vision</span>
                <span className="text-emerald-400 font-semibold">Demand vs Price</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>Real-life Relevance</span>
                <span className="text-emerald-400 font-semibold">Voice-First Hindi</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>Built with Gemini</span>
                <span className="text-emerald-400 font-semibold">Reasoning &amp; Agent</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>Future Focused</span>
                <span className="text-emerald-400 font-semibold">Pre-Harvest Demand</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Execution</span>
                <span className="text-emerald-400 font-semibold">Responsible AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Trust Note */}
        <div className="pt-8 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-slate-400">Prototype Disclaimer:</strong> All market modal prices, buyer demands, transport rates, distances, and farmer lot values displayed in this prototype are synthetic simulation data designed to demonstrate the BazaarMind decision-and-orchestration architecture. Recommendations do not constitute binding financial guarantees.
          </p>
          <p className="text-[11px] text-slate-600">
            © 2026 BazaarMind • Designed for Indian Agriculture • Powered by Google Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
