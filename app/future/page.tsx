import { FutureVisionView } from "@/components/FutureVisionView";

export const metadata = {
  title: "Future of Agri-Commerce | BazaarMind AI",
  description: "Tomorrow's market starts before the harvest. Know the demand before the harvest.",
};

export default function FuturePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <FutureVisionView />
    </div>
  );
}
