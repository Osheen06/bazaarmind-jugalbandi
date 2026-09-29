import { MarketMap } from "@/components/MarketMap";

export const metadata = {
  title: "Connected Market Ecosystem & Map | BazaarMind AI",
  description: "Spatial map of farm clusters, FPOs, APMC mandis, and institutional buyers across Delhi-NCR.",
};

export default function MarketsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MarketMap />
    </div>
  );
}
