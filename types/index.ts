export type Language = "en" | "hi" | "hinglish";

export type UserRole = "farmer" | "fpo" | "buyer";

export type RiskPreference = "max_earning" | "balanced" | "low_risk" | "fast_payment";

export type CropCategory = "vegetable" | "fruit" | "grain" | "oilseed" | "cash_crop";

export interface Crop {
  id: string;
  name: string;
  hindiName: string;
  category: CropCategory;
  standardUnit: "kg" | "quintal" | "tonne";
  avgShelfLifeDays: number;
  perishability: "high" | "medium" | "low";
  typicalWastagePercent: number;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  phone: string;
  preferredLanguage: Language;
  landSizeAcres: number;
  fpoId?: string;
  fpoName?: string;
  rating: number;
  completedSales: number;
  avatarUrl?: string;
}

export interface FPO {
  id: string;
  name: string;
  district: string;
  state: string;
  memberCount: number;
  totalAcreage: number;
  coordinates: [number, number];
  primaryCrops: string[];
  totalActiveSupplyTonnes: number;
  contactPerson: string;
  rating: number;
}

export interface Buyer {
  id: string;
  name: string;
  type: "quick_commerce" | "retail_chain" | "food_processor" | "wholesale_trader" | "exporter";
  district: string;
  state: string;
  coordinates: [number, number];
  paymentReliabilityPercent: number; // e.g. 96%
  completedTransactionsCount: number;
  fulfillmentRatePercent: number;
  avgSettlementHours: number; // e.g. 24
  repeatSuppliersPercent: number;
  verified: boolean;
  minQualityGrade: "A" | "B" | "C";
  paymentTerms: string;
}

export interface Market {
  id: string;
  name: string;
  type: "apmc_mandi" | "private_mandi" | "terminal_market";
  district: string;
  state: string;
  coordinates: [number, number];
  modalPricePerKg: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  arrivalsTodayTonnes: number;
  supplyPressure: "low" | "medium" | "high";
  congestionLevel: "low" | "medium" | "high";
  estimatedCommissionPercent: number;
  unloadingHandlingPerKg: number;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  cropId: string;
  cropName: string;
  requiredQuantityTonnes: number;
  fulfilledQuantityTonnes: number;
  grade: "A" | "B" | "C" | "All";
  targetPricePerKg: number;
  deliveryLocation: string;
  coordinates: [number, number];
  deadlineHours: number;
  paymentTerms: string;
  specialRequirements?: string;
  status: "open" | "partially_matched" | "fulfilled";
}

export interface ProduceLot {
  id: string; // e.g. TM-2026-00482
  farmerId: string;
  farmerName: string;
  cropId: string;
  cropName: string;
  quantityTonnes: number;
  harvestDate: string; // YYYY-MM-DD
  grade: "A" | "B" | "C";
  location: string;
  coordinates: [number, number];
  status: "field_ready" | "harvesting" | "matched" | "in_transit" | "delivered";
  qualityStatus: "verified" | "self_declared" | "fpo_inspected";
  storageAvailable: boolean;
  variety?: string;
}

export interface NetRealizationBreakdown {
  quotedPricePerKg: number;
  quantityKg: number;
  grossRevenue: number;
  transportCostPerKg: number;
  totalTransportCost: number;
  handlingCostPerKg: number;
  totalHandlingCost: number;
  commissionFeePerKg: number;
  totalCommissionFee: number;
  expectedWastagePercent: number;
  wastageLossPerKg: number;
  totalWastageLoss: number;
  storageCostPerKg: number;
  totalStorageCost: number;
  otherCostsPerKg: number;
  totalOtherCosts: number;
  totalDeductionsPerKg: number;
  netRealizationPerKg: number;
  netTakeHomeRevenue: number;
  netMarginPercent: number;
}

export interface MatchingOpportunity {
  id: string;
  opportunityType: "direct_buyer" | "mandi" | "food_processor" | "fpo_pooled";
  name: string;
  buyerOrMarketId: string;
  distanceKm: number;
  quotedPricePerKg: number;
  expectedNetRealizationPerKg: number;
  matchScore: number; // 0 - 100
  demandFitScore: number;
  buyerReliabilityScore: number;
  transportFitScore: number;
  wastageRiskScore: number;
  deliveryWindowHours: number;
  paymentSpeedRating: "instant" | "24_hours" | "3_days" | "7_days";
  paymentReliabilityPercent: number;
  supplyPressure: "low" | "medium" | "high";
  recommendationReason: string;
  hindiReason: string;
  netBreakdown: NetRealizationBreakdown;
  advantages: string[];
  risks: string[];
}

export interface TransportOption {
  id: string;
  providerName: string;
  vehicleType: "Tata Ace (1.5T)" | "Pickup 407 (3T)" | "Reefer Van (5T)" | "Shared Agri-Truck";
  capacityTonnes: number;
  costEstimate: number;
  isPooled: boolean;
  pooledWithNearbyFarmersCount?: number;
  pickupWindow: string;
  deliveryEta: string;
  savingsVsIndividual?: number;
  carbonSavedKg?: number;
}

export interface Transaction {
  id: string;
  lotId: string;
  farmerId: string;
  buyerId: string;
  buyerName: string;
  cropName: string;
  quantityTonnes: number;
  finalPricePerKg: number;
  estimatedNetPerKg: number;
  totalAmount: number;
  status: "quote_requested" | "quote_accepted" | "farmer_approved" | "logistics_booked" | "pickup_scheduled" | "in_transit" | "delivered" | "payment_received" | "cancelled";
  createdAt: string;
  deliveryLocation: string;
  transportProvider?: string;
  transportCost?: number;
  escrowStatus: "unfunded" | "held_in_escrow" | "released_to_farmer";
  timeline: {
    step: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Scheme {
  id: string;
  name: string;
  hindiName: string;
  department: string;
  category: "subsidy" | "credit" | "infrastructure" | "insurance" | "fpo";
  maxBenefit: string;
  whyRelevant: string;
  hindiWhyRelevant: string;
  eligibilitySnippet: string;
  requiredDocuments: string[];
  officialPortalUrl: string;
  demoDataOnly: boolean;
}

export interface AgentPlanStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "waiting_approval" | "not_started";
  requiresHumanApproval: boolean;
  actionDetails?: string;
}

export interface ExtractedFarmerIntent {
  crop: string;
  quantityValue: number;
  quantityUnit: "tonne" | "quintal" | "kg";
  harvestWindowDays: number;
  location: string;
  confidence: number;
  missingFields: string[];
  rawText: string;
}
