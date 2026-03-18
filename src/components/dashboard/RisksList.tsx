import { useState } from "react";
import { risks, RiskLevel, Department } from "@/data/mockData";
import { RiskBadge } from "./RiskBadge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const levelFilters: { label: string; value: RiskLevel | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "🔴 Высокий", value: "high" },
  { label: "🟡 Средний", value: "medium" },
  { label: "🟢 Низкий", value: "low" },
];

const deptFilters: { label: string; value: Department | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "УОР", value: "УОР" },
  { label: "ДТН", value: "ДТН" },
  { label: "AI Red Team", value: "AI Red Team" },
];

const borderLeft: Record<RiskLevel, string> = {
  high: "border-l-4 border-l-risk-high",
  medium: "border-l-4 border-l-risk-medium",
  low: "border-l-4 border-l-risk-low/40",
};

export function RisksList() {
  const [levelFilter, setLevelFilter] = useState<RiskLevel | "all">("all");
  const [deptFilter, setDeptFilter] = useState<Department | "all">("all");

  const filtered = risks.filter((r) => {
    if (levelFilter !== "all" && r.level !== levelFilter) return false;
    if (deptFilter !== "all" && !r.departments.includes(deptFilter)) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          18 видов рисков
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {levelFilters.map((f) => (
            <Button
              key={f.value} size="sm" variant={levelFilter === f.value ? "default" : "outline"}
              onClick={() => setLevelFilter(f.value)} className="text-xs h-7"
            >
              {f.label}
            </Button>
          ))}
          <span className="mx-1 border-l border-border" />
          {deptFilters.map((f) => (
            <Button
              key={f.value} size="sm" variant={deptFilter === f.value ? "default" : "outline"}
              onClick={() => setDeptFilter(f.value)} className="text-xs h-7"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <Accordion type="multiple" className="flex flex-col gap-2">
        {filtered.map((risk) => (
          <AccordionItem key={risk.id} value={risk.id} className={`rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow ${borderLeft[risk.level]}`}>
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex w-full items-center justify-between pr-2 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-muted-foreground">{risk.id}</span>
                  <span className="font-medium text-foreground truncate">{risk.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {risk.departments.map((d) => (
                    <Badge key={d} variant="secondary" className="text-[10px] px-1.5 py-0">{d}</Badge>
                  ))}
                  <RiskBadge level={risk.level} size="sm" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-4">{risk.verdict}</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Вероятность — {risk.probability}%</p>
                  <Progress value={risk.probability} className="h-2" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Воздействие — {risk.impact}%</p>
                  <Progress value={risk.impact} className="h-2" />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">Обоснование</p>
                <p className="text-sm text-foreground bg-muted rounded-md p-3">{risk.reasoning}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Ключевые факторы</p>
                <div className="flex flex-wrap gap-1.5">
                  {risk.factors.map((f) => (
                    <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>

              {risk.history && risk.history.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">История</p>
                  <div className="flex gap-2">
                    {risk.history.map((h) => (
                      <span key={h.version} className="text-xs bg-secondary rounded px-2 py-1">
                        v{h.version}: <RiskBadge level={h.level} size="sm" />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Нет рисков по выбранным фильтрам</p>
      )}
    </div>
  );
}
