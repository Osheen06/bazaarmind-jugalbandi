import { AboutView } from "@/components/AboutView";

export const metadata = {
  title: "About BazaarMind | Vision, TAM & Architecture",
  description: "BazaarMind's vision, judging criteria alignment, TAM/SAM/SOM framework, and trust principles.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AboutView />
    </div>
  );
}
