import {
  MatchingOpportunity,
  ProduceLot,
  RiskPreference,
} from "@/types";
import {
  DEMO_BUYERS,
  DEMO_BUYER_DEMANDS,
  DEMO_MARKETS,
} from "@/data/demoData";
import { calculateNetRealization } from "@/lib/utils";

export interface MatchingWeights {
  demandFit: number; // default 0.25
  netRealization: number; // default 0.25
  distance: number; // default 0.15
  quality: number; // default 0.10
  timing: number; // default 0.10
  reliability: number; // default 0.10
  riskFit: number; // default 0.05
}

export const DEFAULT_WEIGHTS: MatchingWeights = {
  demandFit: 0.25,
  netRealization: 0.25,
  distance: 0.15,
  quality: 0.10,
  timing: 0.10,
  reliability: 0.10,
  riskFit: 0.05,
};

export function findMatchingOpportunities(
  lot: Partial<ProduceLot> & {
    cropName: string;
    quantityTonnes: number;
    harvestDate?: string;
    grade?: "A" | "B" | "C";
    location?: string;
  },
  riskPreference: RiskPreference = "balanced",
  customWeights: MatchingWeights = DEFAULT_WEIGHTS
): MatchingOpportunity[] {
  const cropLower = lot.cropName.toLowerCase();
  const quantity = lot.quantityTonnes || 3.0;
  const grade = lot.grade || "A";

  const opportunities: MatchingOpportunity[] = [];

  // 1. Check matching Buyer Demands
  const matchingDemands = DEMO_BUYER_DEMANDS.filter(
    (d) => d.cropName.toLowerCase() === cropLower
  );

  for (const demand of matchingDemands) {
    const buyer = DEMO_BUYERS.find((b) => b.id === demand.buyerId);
    if (!buyer) continue;

    // Realistic distance approximation
    let distanceKm = 28;
    if (buyer.district.includes("Kundli")) distanceKm = 14;
    else if (buyer.district.includes("Okhla")) distanceKm = 28;
    else if (buyer.district.includes("Mayapuri")) distanceKm = 32;
    else if (buyer.district.includes("Gurugram")) distanceKm = 54;
    else if (buyer.district.includes("Noida")) distanceKm = 42;
    else if (buyer.district.includes("Farrukhnagar")) distanceKm = 48;
    else if (buyer.district.includes("Sahibabad")) distanceKm = 36;
    else if (buyer.district.includes("Rai")) distanceKm = 18;
    else distanceKm = 35;

    // Wastage & handling factor
    const wastagePercent = buyer.type === "quick_commerce" ? 1.8 : buyer.type === "food_processor" ? 1.2 : 2.5;
    const handling = 0.35;

    const netCalc = calculateNetRealization({
      quotedPricePerKg: demand.targetPricePerKg,
      quantityTonnes: quantity,
      distanceKm,
      transportRatePerKmKg: 0.025,
      handlingCostPerKg: handling,
      commissionPercent: 0, // Direct buyer = 0% APMC commission!
      expectedWastagePercent: wastagePercent,
      storageCostPerKg: 0,
      otherCostsPerKg: 0.15,
    });

    // Factor Scores (0 - 100)
    // Demand fit: does quantity match requirement?
    const demandRatio = Math.min(1, quantity / demand.requiredQuantityTonnes);
    const demandFitScore = Math.round(75 + demandRatio * 25);

    // Distance fit: closer is better
    const transportFitScore = Math.max(50, Math.round(100 - distanceKm * 0.8));

    // Reliability score from buyer profile
    const buyerReliabilityScore = buyer.paymentReliabilityPercent;

    // Quality match
    const qualityMatchScore =
      demand.grade === grade ? 98 : demand.grade === "B" && grade === "A" ? 95 : 70;

    // Wastage score
    const wastageRiskScore = Math.round(100 - wastagePercent * 10);

    // Risk fit adjustment based on preference
    let riskBonus = 0;
    if (riskPreference === "fast_payment" && (buyer.avgSettlementHours <= 24)) riskBonus = 12;
    if (riskPreference === "low_risk" && buyer.paymentReliabilityPercent >= 96) riskBonus = 10;
    if (riskPreference === "max_earning" && netCalc.netRealizationPerKg > 20.5) riskBonus = 8;
    if (riskPreference === "balanced") riskBonus = 6;

    // Raw weighted score calculation
    const rawScore =
      demandFitScore * customWeights.demandFit +
      Math.min(100, (netCalc.netRealizationPerKg / 24) * 100) * customWeights.netRealization +
      transportFitScore * customWeights.distance +
      qualityMatchScore * customWeights.quality +
      88 * customWeights.timing +
      buyerReliabilityScore * customWeights.reliability +
      riskBonus * customWeights.riskFit * 10;

    const matchScore = Math.min(98, Math.max(65, Math.round(rawScore)));

    const isTopEarning = netCalc.netRealizationPerKg >= 20.5;

    opportunities.push({
      id: `opp-${demand.id}`,
      opportunityType: buyer.type === "food_processor" ? "food_processor" : "direct_buyer",
      name: buyer.name,
      buyerOrMarketId: buyer.id,
      distanceKm,
      quotedPricePerKg: demand.targetPricePerKg,
      expectedNetRealizationPerKg: netCalc.netRealizationPerKg,
      matchScore,
      demandFitScore,
      buyerReliabilityScore,
      transportFitScore,
      wastageRiskScore,
      deliveryWindowHours: demand.deadlineHours,
      paymentSpeedRating:
        buyer.avgSettlementHours <= 12
          ? "instant"
          : buyer.avgSettlementHours <= 24
          ? "24_hours"
          : buyer.avgSettlementHours <= 72
          ? "3_days"
          : "7_days",
      paymentReliabilityPercent: buyer.paymentReliabilityPercent,
      supplyPressure: "low",
      recommendationReason: isTopEarning
        ? `Provides optimal net take-home earnings (₹${netCalc.netRealizationPerKg}/kg) with guaranteed 0% commission and verified payment in ${buyer.avgSettlementHours}h.`
        : `Verified institutional buyer with steady requirement (${demand.requiredQuantityTonnes}T) and low transit wastage risk.`,
      hindiReason: isTopEarning
        ? `बिना किसी आढ़ती कमीशन के सबसे ज़्यादा बचत (₹${netCalc.netRealizationPerKg}/किलो) और ${buyer.avgSettlementHours} घंटे में सुरक्षित बैंक भुगतान।`
        : `सत्यापित खरीदार, ${demand.requiredQuantityTonnes} टन की मांग और कम दूरी के कारण सुरक्षित सौदा।`,
      netBreakdown: netCalc,
      advantages: [
        `0% Mandi Commission (saves ₹${(demand.targetPricePerKg * 0.05).toFixed(2)}/kg)`,
        `Lower transit loss (${wastagePercent}%) vs 5% at crowded mandi`,
        `Direct digital payment in ${buyer.avgSettlementHours}h`,
        buyer.verified ? "Verified BazaarMind Buyer" : "Standard Buyer",
      ],
      risks: [
        `Quality tolerance: Requires Grade-${demand.grade} sorting`,
        `Gate delivery scheduled within ${demand.deadlineHours}h`,
      ],
    });
  }

  // 2. Add APMC Mandi benchmark comparison (e.g. Ghazipur or Azadpur)
  const mandi = DEMO_MARKETS.find((m) => m.id === "mandi-ghazipur") || DEMO_MARKETS[0];
  const mandiDist = 46;
  const mandiQuoted = cropLower.includes("tomato") ? 23.0 : cropLower.includes("potato") ? 19.0 : 28.0;
  const mandiWastage = 5.2; // Crowded mandi unloading damages

  const mandiNetCalc = calculateNetRealization({
    quotedPricePerKg: mandiQuoted,
    quantityTonnes: quantity,
    distanceKm: mandiDist,
    transportRatePerKmKg: 0.028,
    handlingCostPerKg: mandi.unloadingHandlingPerKg,
    commissionPercent: mandi.estimatedCommissionPercent, // 5% APMC commission
    expectedWastagePercent: mandiWastage,
    storageCostPerKg: 0,
    otherCostsPerKg: 0.35, // Gate entry, weighment, tolls
  });

  opportunities.push({
    id: `opp-mandi-${mandi.id}`,
    opportunityType: "mandi",
    name: mandi.name,
    buyerOrMarketId: mandi.id,
    distanceKm: mandiDist,
    quotedPricePerKg: mandiQuoted,
    expectedNetRealizationPerKg: mandiNetCalc.netRealizationPerKg,
    matchScore: 71,
    demandFitScore: 80,
    buyerReliabilityScore: 75,
    transportFitScore: 62,
    wastageRiskScore: 50,
    deliveryWindowHours: 12,
    paymentSpeedRating: "3_days",
    paymentReliabilityPercent: 78,
    supplyPressure: mandi.supplyPressure,
    recommendationReason: `Headline price looks attractive (₹${mandiQuoted}/kg), but heavy mandi commission (5%), unloading handling, and congestion wastage reduce your actual in-hand earnings to ₹${mandiNetCalc.netRealizationPerKg}/kg.`,
    hindiReason: `दिखने में मंडी भाव ₹${mandiQuoted}/किलो अच्छा लग सकता है, लेकिन 5% आढ़त, पल्लेदारी और जाम में माल खराब होने से हाथ में केवल ₹${mandiNetCalc.netRealizationPerKg}/किलो ही बचेगा।`,
    netBreakdown: mandiNetCalc,
    advantages: [
      "Open physical auction",
      "Immediate unloading if arrived before 6 AM",
    ],
    risks: [
      "5.0% APMC arhatiya commission deducted",
      "High unloading delays & congestion",
      "Transit & handling wastage up to 5.2%",
      "Payment terms depend on individual traders (unregulated)",
    ],
  });

  // Sort by matchScore or net realization based on risk preference
  return opportunities.sort((a, b) => {
    if (riskPreference === "max_earning") {
      return b.expectedNetRealizationPerKg - a.expectedNetRealizationPerKg;
    }
    if (riskPreference === "fast_payment") {
      const speedA = a.paymentSpeedRating === "instant" ? 4 : a.paymentSpeedRating === "24_hours" ? 3 : 1;
      const speedB = b.paymentSpeedRating === "instant" ? 4 : b.paymentSpeedRating === "24_hours" ? 3 : 1;
      return speedB - speedA || b.matchScore - a.matchScore;
    }
    if (riskPreference === "low_risk") {
      return b.buyerReliabilityScore - a.buyerReliabilityScore || b.matchScore - a.matchScore;
    }
    // Balanced
    return b.matchScore - a.matchScore;
  });
}
