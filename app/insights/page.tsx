import { MarketIntelligenceView } from "@/components/MarketIntelligenceView";

export const metadata = {
  title: "Market Intelligence & Analytics | BazaarMind AI",
  description: "Macro supply pressure, absorption rates, and price movement analytics across Delhi-NCR.",
};

export default function InsightsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MarketIntelligenceView />
    </div>
  );
}
