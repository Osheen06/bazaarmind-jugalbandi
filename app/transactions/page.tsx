import { LogisticsAndTransactions } from "@/components/LogisticsAndTransactions";

export const metadata = {
  title: "Move My Harvest & Transactions | BazaarMind AI",
  description: "Route pooling, freight cost savings, and digital escrow transaction tracking.",
};

export default function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LogisticsAndTransactions />
    </div>
  );
}
