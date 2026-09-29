import { HarvestPassportView } from "@/components/HarvestPassportView";

export const metadata = {
  title: "Digital Harvest Passport & Pre-Harvest Demand | BazaarMind AI",
  description: "Track digital lot traceability, pre-harvest buyer discovery, and sell-now vs store scenarios.",
};

export default function HarvestPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HarvestPassportView />
    </div>
  );
}
