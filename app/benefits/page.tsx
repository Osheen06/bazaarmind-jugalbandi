import { SchemeAgentView } from "@/components/SchemeAgentView";

export const metadata = {
  title: "Government Schemes Finder | BazaarMind AI",
  description: "Contextual agricultural subsidies, transport incentives, and post-harvest credit benefits.",
};

export default function BenefitsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SchemeAgentView />
    </div>
  );
}
