import { risks } from "@/data/mockData";
import { RiskBadge } from "./RiskBadge";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";

export function IntegralRiskCard() {
  const high = risks.filter((r) => r.level === "high").length;
  const medium = risks.filter((r) => r.level === "medium").length;
  const low = risks.filter((r) => r.level === "low").length;
  const integralLevel = high > 0 ? (high >= 3 ? "high" : "medium") : medium > 0 ? "medium" : "low";

  const bgMap = { low: "border-risk-low/30 bg-risk-low-bg", medium: "border-risk-medium/30 bg-risk-medium-bg", high: "border-risk-high/30 bg-risk-high-bg" } as const;
  const iconMap = { low: "text-risk-low", medium: "text-risk-medium", high: "text-risk-high" } as const;

  return (
    <Card className={`p-6 border-2 ${bgMap[integralLevel]}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-sm ${iconMap[integralLevel]}`}>
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Интегральный уровень риска</p>
            <div className="mt-1">
              <RiskBadge level={integralLevel} size="lg" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>{risks.length} рисков оценено:</span>
          <span className="flex items-center gap-1 text-risk-low">🟢 {low}</span>
          <span className="flex items-center gap-1 text-risk-medium">🟡 {medium}</span>
          <span className="flex items-center gap-1 text-risk-high">🔴 {high}</span>
        </div>
      </div>
    </Card>
  );
}
