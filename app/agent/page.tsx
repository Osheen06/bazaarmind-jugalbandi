import { VoiceAgent } from "@/components/VoiceAgent";

export const metadata = {
  title: "Farmer Voice Agent | BazaarMind AI",
  description: "Natural language and voice-first agricultural commerce assistant for Indian farmers.",
};

export default function AgentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VoiceAgent />
    </div>
  );
}
