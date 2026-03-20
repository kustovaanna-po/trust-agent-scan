import { actionItems } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

export function ActionPanel() {
  const confirmed = actionItems.filter((a) => a.confirmed);
  const proposed = actionItems.filter((a) => !a.confirmed);

  return (
    <Card className="p-5">
      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-muted-foreground" />
        Рекомендации
      </h3>

      {confirmed.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Подтверждённые</p>
          {confirmed.map((a) => (
            <label key={a.id} className="flex items-start gap-2 py-1.5 text-sm">
              <Checkbox checked disabled className="mt-0.5" />
              <div>
                <p className="text-foreground">{a.description}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-xs text-muted-foreground">{a.responsible} · до {a.deadline}</p>
                  {a.relatedRiskIds.map((rId) => (
                    <Badge key={rId} variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">{rId}</Badge>
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      {proposed.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Предложенные</p>
          {proposed.map((a) => (
            <label key={a.id} className="flex items-start gap-2 py-1.5 text-sm">
              <Checkbox className="mt-0.5" />
              <div>
                <p className="text-foreground">{a.description}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-xs text-muted-foreground">{a.responsible} · до {a.deadline}</p>
                  {a.relatedRiskIds.map((rId) => (
                    <Badge key={rId} variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">{rId}</Badge>
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </Card>
  );
}