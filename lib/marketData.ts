export interface MarketOption {
  buyer: string;
  quotedPrice: number;
  distanceKm: number;
  transport: number;
  handling: number;
  wastage: number;
}

export const marketOptions: MarketOption[] = [
  {
    buyer: "FreshKart Procurement",
    quotedPrice: 22.50,
    distanceKm: 28,
    transport: 0.90,
    handling: 0.40,
    wastage: 0.35,
  },
  {
    buyer: "Ghazipur Wholesale",
    quotedPrice: 23.00,
    distanceKm: 46,
    transport: 1.80,
    handling: 0.55,
    wastage: 0.70,
  },
  {
    buyer: "Local Processor",
    quotedPrice: 21.50,
    distanceKm: 38,
    transport: 0.85,
    handling: 0.40,
    wastage: 0.07,
  },
];
