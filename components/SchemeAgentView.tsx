"use client";

import React, { useState } from "react";
import { DEMO_SCHEMES } from "@/data/demoData";
import {
  ShieldCheck,
  Search,
  ExternalLink,
  FileText,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

export function SchemeAgentView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredSchemes = DEMO_SCHEMES.filter((scheme) => {
    if (categoryFilter !== "all" && scheme.category !== categoryFilter) return false;
    if (
      searchTerm &&
      !scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !scheme.hindiName.includes(searchTerm) &&
      !scheme.whyRelevant.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Government Benefits &amp; Scheme Finder
              </h2>
              <p className="text-xs text-slate-500">
                Secondary Advisory Layer • Contextual Subsidies, Transport Incentives &amp; Post-Harvest Credit
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            DEMO SCHEME DATASET
          </span>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Verification Disclaimer:</strong> The scheme rules, benefits, and document checklists shown here are sourced from a curated demonstration dataset. Official guidelines, income criteria, and state allocations must always be verified against the official ministry portal or local Krishi Vigyan Kendra (KVK) before submitting binding applications.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-80 bg-white px-3 py-2 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search schemes (उदा. परिवहन, कोल्ड स्टोरेज)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-bold">
          {["all", "subsidy", "credit", "infrastructure", "insurance", "fpo"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    {scheme.category}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    {scheme.name}
                  </h3>
                  <h4 className="text-xs font-semibold text-emerald-800">
                    {scheme.hindiName}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{scheme.department}</p>
                </div>
              </div>

              {/* Potential Benefit Highlight */}
              <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-950 block mb-0.5">Potential Benefit:</span>
                <span className="font-extrabold text-emerald-800 text-sm">{scheme.maxBenefit}</span>
              </div>

              {/* Contextual Relevance */}
              <div className="space-y-1 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">Why Potentially Relevant to Your Harvest:</span>
                <p className="leading-relaxed">{scheme.whyRelevant}</p>
                <p className="text-emerald-900 italic text-[11px] font-medium pt-0.5">
                  &quot;{scheme.hindiWhyRelevant}&quot;
                </p>
              </div>

              {/* Required Documents */}
              <div className="border-t border-slate-100 pt-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Checklist of Required Documents:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Eligibility: {scheme.eligibilitySnippet}
              </span>
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 flex items-center gap-1 transition-colors"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
