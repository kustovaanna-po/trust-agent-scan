import { departmentAssessments, risks } from "@/data/mockData";
import { RiskBadge } from "./RiskBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, Clock } from "lucide-react";

export function DepartmentAssessments() {
  return (
    <div className="grid gap-4 md:grid-cols-3 opacity-40 pointer-events-none select-none">
      {departmentAssessments.map((dept) => {
        const deptRisks = risks.filter((r) => dept.riskIds.includes(r.id));
        return (
          <Card key={dept.name} className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{dept.name}</h3>
                <p className="text-xs text-muted-foreground">{dept.fullName}</p>
              </div>
              <RiskBadge level={dept.level} />
            </div>

            <p className="text-sm text-muted-foreground">
              Оценено {deptRisks.length} из {risks.length} рисков
            </p>

            <div className="flex flex-wrap gap-1.5">
              {deptRisks.map((r) => (
                <Tooltip key={r.id}>
                  <TooltipTrigger asChild>
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground cursor-default">
                      {r.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{r.verdict}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <Button
              variant={dept.confirmed ? "outline" : "default"}
              size="sm"
              className="mt-auto w-full"
              disabled
            >
              {dept.confirmed ? (
                <><CheckCircle2 className="h-4 w-4 mr-1.5" /> Подтверждено</>
              ) : (
                <><Clock className="h-4 w-4 mr-1.5" /> Подтвердить оценку</>
              )}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}