"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Farmer,
  Language,
  ProduceLot,
  MatchingOpportunity,
  RiskPreference,
  Transaction,
  TransportOption,
  UserRole,
  AgentPlanStep,
  BuyerDemand,
} from "@/types";
import {
  DEMO_FARMERS,
  DEMO_PRODUCE_LOTS,
  DEMO_TRANSACTIONS,
  DEMO_TRANSPORTS,
  DEMO_BUYER_DEMANDS,
} from "@/data/demoData";
import { findMatchingOpportunities } from "@/lib/matchingEngine";
import { geminiService } from "@/services/geminiService";

interface JudgeScene {
  sceneNumber: number;
  title: string;
  route: string;
  badge: string;
  narration: string;
  judgeInsight: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentFarmer: Farmer;
  setCurrentFarmer: (farmer: Farmer) => void;
  currentLot: ProduceLot;
  setCurrentLot: (lot: ProduceLot) => void;
  riskPreference: RiskPreference;
  setRiskPreference: (pref: RiskPreference) => void;
  opportunities: MatchingOpportunity[];
  selectedOpportunity: MatchingOpportunity | null;
  setSelectedOpportunity: (opp: MatchingOpportunity | null) => void;
  agentPlan: AgentPlanStep[];
  setAgentPlan: React.Dispatch<React.SetStateAction<AgentPlanStep[]>>;
  quoteStatus: "idle" | "requested" | "received" | "approved";
  setQuoteStatus: (status: "idle" | "requested" | "received" | "approved") => void;
  logisticsBooking: {
    booked: boolean;
    transportOption: TransportOption | null;
    isPooled: boolean;
    savings: number;
  };
  transactions: Transaction[];
  geminiStatus: "connected" | "demo_mode";
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  activeBuyerDemands: BuyerDemand[];
  // Actions
  handleFarmerVoiceInput: (rawText: string) => Promise<void>;
  requestFinalQuote: (oppId?: string) => Promise<void>;
  approveSale: () => Promise<void>;
  bookLogistics: (transportId: string, pooled: boolean) => Promise<void>;
  resetDemo: () => void;
  addNewBuyerDemand: (demand: Partial<BuyerDemand>) => void;
  // Judge Mode
  isJudgeTourOpen: boolean;
  judgeSceneIndex: number;
  judgeScenes: JudgeScene[];
  startJudgeTour: () => void;
  nextJudgeScene: () => void;
  prevJudgeScene: () => void;
  closeJudgeTour: () => void;
  jumpToJudgeScene: (idx: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "bazaarmind_state_v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Base State
  const [role, setRole] = useState<UserRole>("farmer");
  const [language, setLanguage] = useState<Language>("hi");
  const [currentFarmer, setCurrentFarmer] = useState<Farmer>(DEMO_FARMERS[0]);
  const [currentLot, setCurrentLot] = useState<ProduceLot>(DEMO_PRODUCE_LOTS[0]);
  const [riskPreference, setRiskPreferenceState] = useState<RiskPreference>("balanced");
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "requested" | "received" | "approved">("idle");
  const [logisticsBooking, setLogisticsBooking] = useState<{
    booked: boolean;
    transportOption: TransportOption | null;
    isPooled: boolean;
    savings: number;
  }>({
    booked: false,
    transportOption: DEMO_TRANSPORTS[1],
    isPooled: true,
    savings: 900,
  });
  const [transactions, setTransactions] = useState<Transaction[]>(DEMO_TRANSACTIONS);
  const [activeBuyerDemands, setActiveBuyerDemands] = useState<BuyerDemand[]>(DEMO_BUYER_DEMANDS);
  const [geminiStatus, setGeminiStatus] = useState<"connected" | "demo_mode">("demo_mode");
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Dynamic Matching Opportunities
  const [opportunities, setOpportunities] = useState<MatchingOpportunity[]>(() =>
    findMatchingOpportunities(DEMO_PRODUCE_LOTS[0], "balanced")
  );
  const [selectedOpportunity, setSelectedOpportunity] = useState<MatchingOpportunity | null>(() =>
    opportunities[0] || null
  );

  // Agent Execution Plan
  const [agentPlan, setAgentPlan] = useState<AgentPlanStep[]>([
    {
      id: "step-1",
      title: "Understand Farmer Requirement",
      description: "Parsed 3 tonnes Grade-A Tomato harvest in 3 days from Bakhtawarpur.",
      status: "completed",
      requiresHumanApproval: false,
    },
    {
      id: "step-2",
      title: "Scan Real-Time Demand Radar",
      description: "Ranked opportunities across buyers and local APMC mandis.",
      status: "completed",
      requiresHumanApproval: false,
    },
    {
      id: "step-3",
      title: "Compute Net Realization Engine",
      description: "Deducted transport, wastage, and zero commission. FreshKart yields highest net (₹20.85/kg).",
      status: "completed",
      requiresHumanApproval: false,
    },
    {
      id: "step-4",
      title: "Request Buyer Quote",
      description: "Dispatched digital quote request to FreshKart Wholesale.",
      status: "not_started",
      requiresHumanApproval: false,
    },
    {
      id: "step-5",
      title: "Farmer Binding Approval",
      description: "Human farmer must confirm final sale economics before binding contract.",
      status: "not_started",
      requiresHumanApproval: true,
      actionDetails: "Click 'Approve Sale' to authorize.",
    },
    {
      id: "step-6",
      title: "Logistics Pooling & Dispatch",
      description: "Combine shipment with 2 nearby Bakhtawarpur farmers on same route.",
      status: "not_started",
      requiresHumanApproval: true,
    },
  ]);

  // Check Gemini connectivity on mount
  useEffect(() => {
    geminiService.checkStatus().then((res) => {
      setGeminiStatus(res.status);
    });
  }, []);

  // Recalculate opportunities when Lot or RiskPreference changes
  const setRiskPreference = (pref: RiskPreference) => {
    setRiskPreferenceState(pref);
    const newOpps = findMatchingOpportunities(currentLot, pref);
    setOpportunities(newOpps);
    if (newOpps.length > 0) {
      setSelectedOpportunity(newOpps[0]);
    }
  };

  // Farmer voice/text input handler
  const handleFarmerVoiceInput = async (rawText: string) => {
    const extracted = await geminiService.parseFarmerIntent(rawText);
    const updatedLot: ProduceLot = {
      ...currentLot,
      cropName: extracted.crop,
      quantityTonnes: extracted.quantityValue,
      harvestDate: new Date(Date.now() + extracted.harvestWindowDays * 24 * 3600 * 1000)
        .toISOString()
        .split("T")[0],
    };
    setCurrentLot(updatedLot);
    const opps = findMatchingOpportunities(updatedLot, riskPreference);
    setOpportunities(opps);
    if (opps.length > 0) setSelectedOpportunity(opps[0]);

    // Update agent plan steps
    setAgentPlan((prev) =>
      prev.map((step) => {
        if (step.id === "step-1") {
          return {
            ...step,
            description: `Parsed ${extracted.quantityValue} tonnes ${extracted.crop} harvest ready in ${extracted.harvestWindowDays} days.`,
            status: "completed",
          };
        }
        if (step.id === "step-2" || step.id === "step-3") {
          return { ...step, status: "completed" };
        }
        return step;
      })
    );
  };

  // Request final quote
  const requestFinalQuote = async (oppId?: string) => {
    setQuoteStatus("requested");
    setAgentPlan((prev) =>
      prev.map((s) => (s.id === "step-4" ? { ...s, status: "in_progress" } : s))
    );

    // Simulate buyer instant response
    setTimeout(() => {
      setQuoteStatus("received");
      setAgentPlan((prev) =>
        prev.map((s) => {
          if (s.id === "step-4") return { ...s, status: "completed" };
          if (s.id === "step-5") return { ...s, status: "waiting_approval" };
          return s;
        })
      );
    }, 1200);
  };

  // Farmer approves sale (Human in the loop!)
  const approveSale = async () => {
    setQuoteStatus("approved");
    setAgentPlan((prev) =>
      prev.map((s) => {
        if (s.id === "step-5") return { ...s, status: "completed" };
        if (s.id === "step-6") return { ...s, status: "waiting_approval" };
        return s;
      })
    );
  };

  // Book logistics
  const bookLogistics = async (transportId: string, pooled: boolean) => {
    const transport = DEMO_TRANSPORTS.find((t) => t.id === transportId) || DEMO_TRANSPORTS[1];
    setLogisticsBooking({
      booked: true,
      transportOption: transport,
      isPooled: pooled,
      savings: pooled ? 900 : 0,
    });

    setAgentPlan((prev) =>
      prev.map((s) => (s.id === "step-6" ? { ...s, status: "completed" } : s))
    );

    // Add new transaction record
    const newTxn: Transaction = {
      id: `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      lotId: currentLot.id,
      farmerId: currentFarmer.id,
      buyerId: selectedOpportunity?.buyerOrMarketId || "buyer-freshkart",
      buyerName: selectedOpportunity?.name || "FreshKart Wholesale Pvt Ltd",
      cropName: currentLot.cropName,
      quantityTonnes: currentLot.quantityTonnes,
      finalPricePerKg: selectedOpportunity?.quotedPricePerKg || 22.5,
      estimatedNetPerKg: selectedOpportunity?.expectedNetRealizationPerKg || 20.85,
      totalAmount: (selectedOpportunity?.quotedPricePerKg || 22.5) * currentLot.quantityTonnes * 1000,
      status: "logistics_booked",
      createdAt: new Date().toISOString().split("T")[0],
      deliveryLocation: "Okhla Hub, Delhi",
      transportProvider: transport.providerName,
      transportCost: transport.costEstimate,
      escrowStatus: "held_in_escrow",
      timeline: [
        { step: "Quote Accepted", timestamp: "Just now", completed: true },
        { step: "Farmer Approved Sale", timestamp: "Just now", completed: true },
        { step: "Logistics Booked (Pooled)", timestamp: "Just now", completed: true },
        { step: "Pickup Scheduled", timestamp: "Tomorrow 07:00 AM", completed: false },
        { step: "Payment Release (Escrow)", timestamp: "Within 24h of Delivery", completed: false },
      ],
    };
    setTransactions((prev) => [newTxn, ...prev]);
  };

  const addNewBuyerDemand = (newDemand: Partial<BuyerDemand>) => {
    const demand: BuyerDemand = {
      id: `demand-${Date.now()}`,
      buyerId: "buyer-freshkart",
      buyerName: newDemand.buyerName || "Verified Buyer",
      cropId: "crop-tomato",
      cropName: newDemand.cropName || "Tomato",
      requiredQuantityTonnes: newDemand.requiredQuantityTonnes || 10,
      fulfilledQuantityTonnes: 0,
      grade: newDemand.grade || "A",
      targetPricePerKg: newDemand.targetPricePerKg || 23.0,
      deliveryLocation: newDemand.deliveryLocation || "Delhi-NCR Depot",
      coordinates: [28.61, 77.2],
      deadlineHours: newDemand.deadlineHours || 48,
      paymentTerms: "Verified Escrow 24h",
      status: "open",
    };
    setActiveBuyerDemands((prev) => [demand, ...prev]);
  };

  const resetDemo = () => {
    setCurrentFarmer(DEMO_FARMERS[0]);
    setCurrentLot(DEMO_PRODUCE_LOTS[0]);
    setRiskPreferenceState("balanced");
    const initOpps = findMatchingOpportunities(DEMO_PRODUCE_LOTS[0], "balanced");
    setOpportunities(initOpps);
    setSelectedOpportunity(initOpps[0] || null);
    setQuoteStatus("idle");
    setLogisticsBooking({
      booked: false,
      transportOption: DEMO_TRANSPORTS[1],
      isPooled: true,
      savings: 900,
    });
    setTransactions(DEMO_TRANSACTIONS);
    setActiveBuyerDemands(DEMO_BUYER_DEMANDS);
    setAgentPlan([
      {
        id: "step-1",
        title: "Understand Farmer Requirement",
        description: "Parsed 3 tonnes Grade-A Tomato harvest in 3 days from Bakhtawarpur.",
        status: "completed",
        requiresHumanApproval: false,
      },
      {
        id: "step-2",
        title: "Scan Real-Time Demand Radar",
        description: "Ranked opportunities across verified buyers and APMC mandis.",
        status: "completed",
        requiresHumanApproval: false,
      },
      {
        id: "step-3",
        title: "Compute Net Realization Engine",
        description: "Deducted transport, wastage, and zero commission. FreshKart yields highest net (₹20.85/kg).",
        status: "completed",
        requiresHumanApproval: false,
      },
      {
        id: "step-4",
        title: "Request Buyer Quote",
        description: "Dispatched digital quote request to FreshKart Wholesale.",
        status: "not_started",
        requiresHumanApproval: false,
      },
      {
        id: "step-5",
        title: "Farmer Binding Approval",
        description: "Human farmer must confirm final sale economics before binding contract.",
        status: "not_started",
        requiresHumanApproval: true,
        actionDetails: "Click 'Approve Sale' to authorize.",
      },
      {
        id: "step-6",
        title: "Logistics Pooling & Dispatch",
        description: "Combine shipment with 2 nearby Bakhtawarpur farmers on same route.",
        status: "not_started",
        requiresHumanApproval: true,
      },
    ]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // ==========================================
  // JUDGE MODE 10-SCENE GUIDED TOUR (90-SECOND STORY)
  // ==========================================
  const judgeScenes: JudgeScene[] = [
    {
      sceneNumber: 1,
      title: "Scene 1: The Core Problem",
      route: "/",
      badge: "VISION 30%",
      narration:
        "Farmers today check prices, but price alone doesn't tell them where their specific harvest belongs or what they will actually take home after transport, mandi commission, and spoilage.",
      judgeInsight:
        "BazaarMind reframes the problem from 'What is today's mandi price?' to 'Where is the strongest demand for MY harvest and what will I ACTUALLY earn?'",
    },
    {
      sceneNumber: 2,
      title: "Scene 2: Natural Voice Interaction",
      route: "/agent",
      badge: "REAL-LIFE RELEVANCE 20%",
      narration:
        "Farmer Ramesh speaks naturally in Hindi: 'मेरे पास 3 टन टमाटर हैं, 3 दिन में तैयार होंगे। कहाँ बेचूँ?' Minimal typing, voice-first, accessible to any Indian farmer.",
      judgeInsight:
        "Voice-first interface built for low-literacy farmers. Converts casual spoken Hindi/Hinglish into structured commerce intents.",
      actionLabel: "Simulate Ramesh's Voice Query",
      onAction: () =>
        handleFarmerVoiceInput(
          "Mere paas teen ton tamatar hain jo teen din mein ready honge. Kahan bechun?"
        ),
    },
    {
      sceneNumber: 3,
      title: "Scene 3: Gemini Intent & Agent Reasoning",
      route: "/agent",
      badge: "BUILT WITH GEMINI 20%",
      narration:
        "Gemini parses the query into structured parameters: Crop: Tomato, Quantity: 3 Tonnes, Harvest Window: 3 Days, Location: Bakhtawarpur. It then kicks off the Agent Plan.",
      judgeInsight:
        "Gemini is NOT a decorative chatbot; it drives structured schema extraction and multi-signal reasoning across supply and buyer demand.",
    },
    {
      sceneNumber: 4,
      title: "Scene 4: The Demand Radar",
      route: "/demand-radar",
      badge: "VISION & EXECUTION",
      narration:
        "Demand Radar plots real-time absorption opportunities based on buyer demand, distance, wastage, payment speed, and net realization.",
      judgeInsight:
        "Transparent multi-factor matching score (Demand 25%, Net Realization 25%, Distance 15%, Quality 10%, Timing 10%, Reliability 10%, Risk 5%).",
    },
    {
      sceneNumber: 5,
      title: "Scene 5: Net Realization Engine",
      route: "/net-realization",
      badge: "SIGNATURE INSIGHT",
      narration:
        "The central truth: Ghazipur Mandi quotes ₹23/kg, but commissions and wastage leave ₹19.70/kg. FreshKart quotes ₹22.50/kg, but 0% commission and low distance yield ₹20.85/kg!",
      judgeInsight:
        "Highest quoted price ≠ highest farmer earnings. The interactive engine makes invisible hidden costs completely transparent.",
    },
    {
      sceneNumber: 6,
      title: "Scene 6: Request Formal Buyer Quote",
      route: "/demand-radar",
      badge: "AGENTIC WORKFLOW",
      narration:
        "The farmer requests a quote from FreshKart Wholesale. The agent dispatches the RFQ and returns a confirmed purchase offer of ₹22.50/kg for 3 tonnes.",
      judgeInsight:
        "Autonomous negotiation and quote matching without manual phone calls or middleman exploitation.",
      actionLabel: "Request FreshKart Quote",
      onAction: () => requestFinalQuote("opp-demand-01"),
    },
    {
      sceneNumber: 7,
      title: "Scene 7: Human Approval (Responsible Agentic AI)",
      route: "/agent",
      badge: "SAFETY & ETHICS",
      narration:
        "The AI does NOT execute binding sales behind the farmer's back. It presents the clear economics and waits for the farmer's explicit approval.",
      judgeInsight:
        "Crucial Responsible AI design principle: AI searches, analyzes, and drafts; the human farmer approves binding monetary contracts.",
      actionLabel: "Farmer Approves Sale",
      onAction: () => approveSale(),
    },
    {
      sceneNumber: 8,
      title: "Scene 8: Move My Harvest (Logistics Pooling)",
      route: "/transactions",
      badge: "EXECUTION & VALUE",
      narration:
        "BazaarMind detects 2 nearby farmers sending produce along the same corridor and pools transport, cutting freight costs from ₹2,700 to ₹1,800 (saving ₹900!).",
      judgeInsight:
        "Logistics orchestration prevents empty backhauls and reduces carbon footprint while putting extra cash in the farmer's pocket.",
      actionLabel: "Book Pooled Transport",
      onAction: () => bookLogistics("trans-02", true),
    },
    {
      sceneNumber: 9,
      title: "Scene 9: Digital Passport & Transaction Tracking",
      route: "/transactions",
      badge: "TRUST LAYER",
      narration:
        "The lot receives a digital Harvest Passport (TM-2026-00482). Escrow secures funds, gate clearance triggers immediate bank transfer, and verified ratings are updated.",
      judgeInsight:
        "End-to-end digital paper trail builds institutional trust between anonymous smallholders and modern corporate buyers.",
    },
    {
      sceneNumber: 10,
      title: "Scene 10: Future Demand & Connected Markets",
      route: "/harvest",
      badge: "FUTURE FOCUSED 15%",
      narration:
        "The ultimate vision: farmers discover buyer demand 20 days BEFORE harvest. Markets no longer wait for physical supply to arrive at mandis; supply is pre-matched to demand!",
      judgeInsight:
        "Evolving Indian agricultural commerce from reactive post-harvest dumping to predictive pre-harvest orchestration.",
    },
  ];

  const [isJudgeTourOpen, setIsJudgeTourOpen] = useState(false);
  const [judgeSceneIndex, setJudgeSceneIndex] = useState(0);

  const startJudgeTour = () => {
    setJudgeSceneIndex(0);
    setIsJudgeTourOpen(true);
  };

  const nextJudgeScene = () => {
    if (judgeSceneIndex < judgeScenes.length - 1) {
      setJudgeSceneIndex((prev) => prev + 1);
    }
  };

  const prevJudgeScene = () => {
    if (judgeSceneIndex > 0) {
      setJudgeSceneIndex((prev) => prev - 1);
    }
  };

  const closeJudgeTour = () => {
    setIsJudgeTourOpen(false);
  };

  const jumpToJudgeScene = (idx: number) => {
    if (idx >= 0 && idx < judgeScenes.length) {
      setJudgeSceneIndex(idx);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        currentFarmer,
        setCurrentFarmer,
        currentLot,
        setCurrentLot,
        riskPreference,
        setRiskPreference,
        opportunities,
        selectedOpportunity,
        setSelectedOpportunity,
        agentPlan,
        setAgentPlan,
        quoteStatus,
        setQuoteStatus,
        logisticsBooking,
        transactions,
        geminiStatus,
        demoMode,
        setDemoMode,
        activeBuyerDemands,
        handleFarmerVoiceInput,
        requestFinalQuote,
        approveSale,
        bookLogistics,
        resetDemo,
        addNewBuyerDemand,
        isJudgeTourOpen,
        judgeSceneIndex,
        judgeScenes,
        startJudgeTour,
        nextJudgeScene,
        prevJudgeScene,
        closeJudgeTour,
        jumpToJudgeScene,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
