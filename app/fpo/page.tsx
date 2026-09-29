import { FPOCommandCenterView } from "@/components/FPOCommandCenterView";

export const metadata = {
  title: "FPO Command Center | BazaarMind AI",
  description: "Collective supply aggregation and institutional buyer contract negotiation.",
};

export default function FPOPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FPOCommandCenterView />
    </div>
  );
}
