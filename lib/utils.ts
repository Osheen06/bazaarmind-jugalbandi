import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NetRealizationBreakdown } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, showDecimals: boolean = true): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

export function convertToKg(quantity: number, unit: "kg" | "quintal" | "tonne"): number {
  switch (unit) {
    case "tonne":
      return quantity * 1000;
    case "quintal":
      return quantity * 100;
    case "kg":
    default:
      return quantity;
  }
}

export function convertFromKg(kg: number, targetUnit: "kg" | "quintal" | "tonne"): number {
  switch (targetUnit) {
    case "tonne":
      return kg / 1000;
    case "quintal":
      return kg / 100;
    case "kg":
    default:
      return kg;
  }
}

/**
 * Signature BazaarMind Net Realization Formula:
 * Gross Revenue = Quoted Price * Quantity (kg)
 * Deductions:
 * - Transport Cost
 * - Handling & Unloading
 * - Mandi Commission / Platform Fee
 * - Expected Wastage Loss (percentage of volume damaged during transit/unloading)
 * - Storage Cost
 * - Other transaction / octroi / packaging costs
 * Net Realization = (Gross Revenue - Total Deductions) / Quantity (kg)
 */
export function calculateNetRealization(params: {
  quotedPricePerKg: number;
  quantityTonnes: number;
  distanceKm: number;
  transportRatePerKmKg?: number; // default ~0.02 to 0.035
  handlingCostPerKg?: number; // default ~0.35
  commissionPercent?: number; // e.g. 0% for direct buyer, 4-6% for APMC mandi
  expectedWastagePercent?: number; // e.g. 2% to 6%
  storageCostPerKg?: number; // default 0 if not stored
  otherCostsPerKg?: number; // packaging, loading, tolls
}): NetRealizationBreakdown {
  const quantityKg = params.quantityTonnes * 1000;
  const grossRevenue = params.quotedPricePerKg * quantityKg;

  // Transport calculation (standard dynamic freight formula)
  const baseRate = params.transportRatePerKmKg ?? 0.025;
  const transportPerKg = Math.max(0.6, Number((params.distanceKm * baseRate).toFixed(2)));
  const totalTransportCost = transportPerKg * quantityKg;

  // Handling & unloading
  const handlingCostPerKg = params.handlingCostPerKg ?? 0.35;
  const totalHandlingCost = handlingCostPerKg * quantityKg;

  // Commission or service fee
  const commissionPercent = params.commissionPercent ?? 0;
  const commissionFeePerKg = (params.quotedPricePerKg * commissionPercent) / 100;
  const totalCommissionFee = commissionFeePerKg * quantityKg;

  // Wastage loss in transit
  const expectedWastagePercent = params.expectedWastagePercent ?? 2.5;
  const wastageLossPerKg = (params.quotedPricePerKg * expectedWastagePercent) / 100;
  const totalWastageLoss = wastageLossPerKg * quantityKg;

  // Storage
  const storageCostPerKg = params.storageCostPerKg ?? 0;
  const totalStorageCost = storageCostPerKg * quantityKg;

  // Other miscellaneous (packaging, toll)
  const otherCostsPerKg = params.otherCostsPerKg ?? 0.2;
  const totalOtherCosts = otherCostsPerKg * quantityKg;

  // Aggregated deductions
  const totalDeductionsPerKg =
    transportPerKg +
    handlingCostPerKg +
    commissionFeePerKg +
    wastageLossPerKg +
    storageCostPerKg +
    otherCostsPerKg;

  const netRealizationPerKg = Math.max(0, params.quotedPricePerKg - totalDeductionsPerKg);
  const netTakeHomeRevenue = netRealizationPerKg * quantityKg;
  const netMarginPercent = grossRevenue > 0 ? (netTakeHomeRevenue / grossRevenue) * 100 : 0;

  return {
    quotedPricePerKg: params.quotedPricePerKg,
    quantityKg,
    grossRevenue,
    transportCostPerKg: transportPerKg,
    totalTransportCost,
    handlingCostPerKg,
    totalHandlingCost,
    commissionFeePerKg,
    totalCommissionFee,
    expectedWastagePercent,
    wastageLossPerKg,
    totalWastageLoss,
    storageCostPerKg,
    totalStorageCost,
    otherCostsPerKg,
    totalOtherCosts,
    totalDeductionsPerKg: Number(totalDeductionsPerKg.toFixed(2)),
    netRealizationPerKg: Number(netRealizationPerKg.toFixed(2)),
    netTakeHomeRevenue: Math.round(netTakeHomeRevenue),
    netMarginPercent: Number(netMarginPercent.toFixed(1)),
  };
}
