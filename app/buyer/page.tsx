import { BuyerCommandCenterView } from "@/components/BuyerCommandCenterView";

export const metadata = {
  title: "Buyer Procurement Desk | BazaarMind AI",
  description: "Corporate buyer procurement dashboard, automated supply match, and fulfillment SLAs.",
};

export default function BuyerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BuyerCommandCenterView />
    </div>
  );
}
