"use client";

import React, { useState } from "react";
import Step0_Input from "../components/Step0_Input";
import Step1_Intent from "../components/Step1_Intent";
import Step2_DemandRadar from "../components/Step2_DemandRadar";
import Step3_Realization from "../components/Step3_Realization";
import Step4_Recommend from "../components/Step4_Recommend";
import Step5_Action from "../components/Step5_Action";
import AnalyzingView from "../components/AnalyzingView";
import CalculatingView from "../components/CalculatingView";
import { Sprout, RotateCcw } from "lucide-react";

export type Step =
  | "input"
  | "analyzing"
  | "intent"
  | "radar"
  | "calculating"
  | "realization"
  | "recommend"
  | "action"
  | "done";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("input");
  const [farmerText, setFarmerText] = useState(
    "Mere paas 3 ton Grade A tamatar hain. Teen din mein ready honge. Kahan bechun?"
  );
  const [intentData, setIntentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger Gemini API analysis from Step 0
  const handleAnalyze = async (text: string) => {
    setFarmerText(text);
    setCurrentStep("analyzing");
    setIsLoading(true);

    try {
      const res = await fetch("/api/analyze-harvest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmerText: text }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      setIntentData(data.intent);
    } catch (err) {
      console.warn("Using smart fallback intent:", err);
      // Fallback fallback if network error
      setIntentData({
        crop: "tomato",
        quantity_kg: 3000,
        quality: "Grade A",
        location: "Delhi NCR",
        ready_in_days: 3,
        intent: "find_best_market",
      });
    } finally {
      setIsLoading(false);
      setCurrentStep("intent");
    }
  };

  const resetToStart = () => {
    setCurrentStep("input");
    setIntentData(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C1C1C] flex flex-col justify-between selection:bg-[#EBF5F0] selection:text-[#1D5C3A]">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Wordmark (Forest Green, Clean Sans) */}
          <div
            onClick={resetToStart}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1D5C3A] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Sprout className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1D5C3A]">
                BAZAARMIND
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#6B7280] font-normal border-l border-gray-200 pl-2">
                Demand-to-Sale Network
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAFAF7] border border-[#E5E7EB] text-[#6B7280]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D5C3A]" />
              Fund My Crazy 2.0 Demo
            </span>

            {currentStep !== "input" && (
              <button
                type="button"
                onClick={resetToStart}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#6B7280] hover:text-[#1D5C3A] py-1.5 px-3 rounded-lg border border-[#E5E7EB] hover:bg-white transition-colors"
                title="Restart Demonstration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area — State Driven Step Transitions */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {currentStep === "input" && (
          <Step0_Input onAnalyze={handleAnalyze} isLoading={isLoading} />
        )}

        {currentStep === "analyzing" && (
          <AnalyzingView farmerText={farmerText} />
        )}

        {currentStep === "intent" && (
          <Step1_Intent
            farmerText={farmerText}
            intentData={intentData}
            onProceed={() => setCurrentStep("radar")}
          />
        )}

        {currentStep === "radar" && (
          <Step2_DemandRadar
            onCompare={() => setCurrentStep("calculating")}
            cropLabel={
              intentData?.quality && intentData?.crop
                ? `${intentData.quality} ${intentData.crop}es`
                : "Grade A tomatoes"
            }
            locationLabel={intentData?.location || "Delhi NCR"}
          />
        )}

        {currentStep === "calculating" && (
          <CalculatingView
            onComplete={() => setCurrentStep("realization")}
          />
        )}

        {currentStep === "realization" && (
          <Step3_Realization
            onSeeRecommendation={() => setCurrentStep("recommend")}
          />
        )}

        {currentStep === "recommend" && (
          <Step4_Recommend
            onRequestQuote={() => setCurrentStep("action")}
          />
        )}

        {(currentStep === "action" || currentStep === "done") && (
          <Step5_Action
            intentData={intentData}
            onGoBack={() => setCurrentStep("recommend")}
            onStartOver={resetToStart}
          />
        )}
      </main>

      {/* Footer Branding & Disclaimer */}
      <footer className="w-full border-t border-[#E5E7EB] bg-white py-4 text-center text-xs text-[#6B7280]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            BazaarMind &bull; Built with Google Gemini for Indian Agriculture
          </span>
          <span className="text-[11px] text-gray-400">
            "Don't just know the market. Know where your harvest belongs."
          </span>
        </div>
      </footer>
    </div>
  );
}
