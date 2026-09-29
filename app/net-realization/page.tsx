import { NetRealizationEngine } from "@/components/NetRealizationEngine";

export const metadata = {
  title: "Net Realization Engine | BazaarMind AI",
  description: "Interactive agricultural net earning calculation after transport, handling, commission, and wastage.",
};

export default function NetRealizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NetRealizationEngine />
    </div>
  );
}
