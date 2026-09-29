import { DemandRadar } from "@/components/DemandRadar";

export const metadata = {
  title: "Demand Radar | BazaarMind AI",
  description: "Live spatial absorption engine matching farmer supply to verified buyers and mandis.",
};

export default function DemandRadarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemandRadar />
    </div>
  );
}
