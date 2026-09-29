"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  RotateCcw,
  PlayCircle,
  Menu,
  X,
  Languages,
  ShieldCheck,
  Wheat,
  Bot,
  Radar,
  Calculator,
  Store,
  Truck,
  Building2,
  TrendingUp,
  Award,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const {
    role,
    setRole,
    language,
    setLanguage,
    geminiStatus,
    demoMode,
    resetDemo,
    startJudgeTour,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Wheat },
    { label: "Farmer Agent", href: "/agent", icon: Bot, highlight: true },
    { label: "Demand Radar", href: "/demand-radar", icon: Radar, highlight: true },
    { label: "Net Realization", href: "/net-realization", icon: Calculator },
    { label: "Market Map", href: "/markets", icon: Store },
    { label: "Buyer Demand", href: "/buyer-demand", icon: Building2 },
    { label: "Harvest Passport", href: "/harvest", icon: Award },
    { label: "Transactions", href: "/transactions", icon: Truck },
    { label: "Schemes", href: "/benefits", icon: ShieldCheck },
    { label: "FPO Hub", href: "/fpo", icon: Building2 },
    { label: "Buyer Hub", href: "/buyer", icon: Store },
    { label: "Market Insights", href: "/insights", icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification / Demo Indicator Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            SIMULATION DATA
          </span>
          <span className="hidden sm:inline text-slate-400">
            Delhi-NCR Pilot Agricultural Corridor • Realistic Deterministic Dataset
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Gemini Connectivity Status */}
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                geminiStatus === "connected" ? "bg-emerald-400 animate-pulse" : "bg-blue-400"
              }`}
            />
            <span className="text-slate-300 text-[11px] font-medium">
              {geminiStatus === "connected"
                ? "Gemini 1.5 Flash: Connected"
                : "Gemini Agent: Demo Engine"}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-700 hidden sm:block" />

          {/* Quick Judge Mode Trigger */}
          <button
            onClick={startJudgeTour}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Judge Mode (90s Tour)</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemo}
            title="Reset demo data to initial pristine state"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    BAZAAR<span className="text-emerald-700">MIND</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:inline -mt-1 font-medium">
                  Demand-to-Sale Network
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm"
                      : item.highlight
                      ? "text-emerald-800 hover:bg-emerald-50/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More dropdown links */}
            <div className="relative group">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1">
                <span>More</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 hidden group-hover:block z-50">
                {navLinks.slice(7).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-1" />
                <Link
                  href="/about"
                  className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Vision, TAM & Architecture
                </Link>
              </div>
            </div>
          </nav>

          {/* Right Action Controls: Role Switcher & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Persona Role Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setRole("farmer")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "farmer"
                    ? "bg-white text-emerald-700 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Farmer
              </button>
              <button
                onClick={() => setRole("fpo")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "fpo"
                    ? "bg-white text-emerald-700 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                FPO
              </button>
              <button
                onClick={() => setRole("buyer")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "buyer"
                    ? "bg-white text-emerald-700 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Buyer
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl border border-slate-200">
              <Languages className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="hinglish">Hinglish</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/agent"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Farmer Agent</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={startJudgeTour}
              className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1"
            >
              <PlayCircle className="w-4 h-4 text-amber-600" />
              <span>Tour</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Persona
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg">
              {(["farmer", "fpo", "buyer"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1 rounded-md text-xs font-bold capitalize ${
                    role === r ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  pathname === item.href
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-4 h-4 text-emerald-600" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-100 text-xs font-medium text-slate-800 px-3 py-1.5 rounded-lg"
            >
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="hinglish">Hinglish</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
