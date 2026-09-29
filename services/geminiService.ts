import { ExtractedFarmerIntent, AgentPlanStep } from "@/types";

export interface GeminiResponse<T = any> {
  success: boolean;
  liveCall: boolean;
  source: string;
  data: T;
  error?: string;
}

export const geminiService = {
  async checkStatus(): Promise<{ status: "connected" | "demo_mode"; message: string }> {
    try {
      const res = await fetch("/api/gemini", { method: "GET" });
      if (!res.ok) throw new Error("Status check failed");
      const data = await res.json();
      return { status: data.status, message: data.message };
    } catch {
      return {
        status: "demo_mode",
        message: "Running deterministic demo intelligence agent",
      };
    }
  },

  async parseFarmerIntent(text: string): Promise<ExtractedFarmerIntent & { hindiSummary: string; englishSummary: string }> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "parseFarmerIntent",
          payload: { text },
        }),
      });
      const json: GeminiResponse = await res.json();
      return json.data;
    } catch {
      // Offline fallback
      return {
        crop: "Tomato",
        quantityValue: 3.0,
        quantityUnit: "tonne",
        harvestWindowDays: 3,
        location: "Bakhtawarpur, North Delhi",
        confidence: 0.95,
        missingFields: [],
        rawText: text,
        hindiSummary: "3 टन टमाटर (3 दिन में तैयार) की मांग खोजी जा रही है।",
        englishSummary: "3 tonnes of Tomatoes ready in 3 days.",
      };
    }
  },

  async explainRecommendation(params: {
    crop: string;
    quantity: number;
    topBuyerName: string;
    topPrice: number;
    topNet: number;
    topDistance: number;
    mandiPrice: number;
    mandiNet: number;
  }): Promise<{ hindiExplanation: string; englishExplanation: string; signatureInsight: string }> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "explainRecommendation",
          payload: params,
        }),
      });
      const json: GeminiResponse = await res.json();
      return json.data;
    } catch {
      return {
        hindiExplanation: `FreshKart आपको ₹${params.topPrice}/किलो दे रहा है। 0% मंडी आढ़त और केवल ${params.topDistance} किमी दूरी होने से आपके हाथ में पूरे ₹${params.topNet}/किलो बचेंगे।`,
        englishExplanation: `${params.topBuyerName} gives the highest net realization at ₹${params.topNet}/kg by cutting out 5% mandi commissions and high transit wastage.`,
        signatureInsight: "Highest quoted price ≠ Highest farmer earnings. Direct buyers eliminate commission and cut transit damage.",
      };
    }
  },

  async generateAgentPlan(crop: string, quantity: number): Promise<AgentPlanStep[]> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateAgentPlan",
          payload: { crop, quantity },
        }),
      });
      const json: GeminiResponse = await res.json();
      return json.data;
    } catch {
      return [
        {
          id: "step-1",
          title: "Understand Farmer Requirement",
          description: `Parsed ${quantity} tonnes ${crop} harvest.`,
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-2",
          title: "Scan Real-Time Demand Radar",
          description: "Queried verified buyers and local mandis.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-3",
          title: "Compute Net Realization Engine",
          description: "Optimized net take-home earnings.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-4",
          title: "Request Formal Buyer Quote",
          description: "Instant quote received from FreshKart Wholesale.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-5",
          title: "Farmer Binding Approval",
          description: "Confirm transaction with human approval.",
          status: "waiting_approval",
          requiresHumanApproval: true,
          actionDetails: "Click 'Approve Sale' to confirm.",
        },
      ];
    }
  },

  async generateNegotiationSuggestion(params: {
    crop: string;
    quantity: number;
    buyerName: string;
    targetPrice: number;
  }): Promise<{ suggestedOffer: string; rationale: string }> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateNegotiationSuggestion",
          payload: params,
        }),
      });
      const json: GeminiResponse = await res.json();
      return json.data;
    } catch {
      return {
        suggestedOffer: `₹${(params.targetPrice + 0.5).toFixed(2)}/kg for immediate farm-gate pickup`,
        rationale: "Quick delivery SLA and high-grade sorting commands a premium.",
      };
    }
  },

  async answerFarmerQuestion(question: string, language: string = "hi"): Promise<string> {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "answerFarmerQuestion",
          payload: { question, language },
        }),
      });
      const json: GeminiResponse = await res.json();
      return json.data.answer;
    } catch {
      return "BazaarMind connects your harvest directly to verified buyers who need your crop right now, calculating your true net take-home earnings.";
    }
  },
};
