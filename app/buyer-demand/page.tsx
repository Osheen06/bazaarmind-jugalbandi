import { BuyerDemandMarketplace } from "@/components/BuyerDemandMarketplace";

export const metadata = {
  title: "Live Buyer Demand & Reverse Procurement | BazaarMind AI",
  description: "Browse live institutional buyer requirements and simulate automated reverse procurement.",
};

export default function BuyerDemandPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BuyerDemandMarketplace />
    </div>
  );
}
