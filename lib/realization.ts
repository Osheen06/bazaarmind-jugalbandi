import { marketOptions, MarketOption } from "./marketData";

export interface RankedMarketOption extends MarketOption {
  estimatedNet: number;
}

export function calculateNet(option: {
  quotedPrice: number;
  transport: number;
  handling: number;
  wastage: number;
}): number {
  return parseFloat(
    (option.quotedPrice - option.transport - option.handling - option.wastage).toFixed(2)
  );
}

export const rankedOptions: RankedMarketOption[] = marketOptions
  .map((o) => ({ ...o, estimatedNet: calculateNet(o) }))
  .sort((a, b) => b.estimatedNet - a.estimatedNet);
