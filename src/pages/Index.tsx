import { Header } from "@/components/dashboard/Header";
import { IntegralRiskCard } from "@/components/dashboard/IntegralRiskCard";
import { DepartmentAssessments } from "@/components/dashboard/DepartmentAssessments";
import { RisksList } from "@/components/dashboard/RisksList";
import { ActionPanel } from "@/components/dashboard/ActionPanel";
import { HistorySection } from "@/components/dashboard/HistorySection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-6">
        <Header />
        <IntegralRiskCard />

        <RisksList />

        <ActionPanel />

        <DepartmentAssessments />

        <HistorySection />
      </div>
    </div>
  );
}