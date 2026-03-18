import { actionItems, departmentAssessments } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Clock } from "lucide-react";

export function ActionPanel() {
  const confirmed = actionItems.filter((a) => a.confirmed);
  const proposed = actionItems.filter((a) => !a.confirmed);
  const confirmed = actionItems.filter((a) => a.confirmed);
  const proposed = actionItems.filter((a) => !a.confirmed);

  return (
    <div className="flex flex-col gap-4">
      {/* Department confirmations */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-3">Подтверждения подразделений</h3>
        <div className="flex flex-col gap-2">
          {departmentAssessments.map((d) => (
            <Button key={d.name} variant="outline" size="sm" disabled={d.confirmed} className="justify-start">
              {d.confirmed ? <CheckCircle2 className="h-4 w-4 mr-1.5 text-risk-low" /> : <Clock className="h-4 w-4 mr-1.5" />}
              {d.confirmed ? `${d.name} подтверждено` : `Подтвердить ${d.name}`}
            </Button>
          ))}
        </div>
      </Card>

      {/* Action items */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-3">План мероприятий</h3>

        {confirmed.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Подтверждённые меры</p>
            {confirmed.map((a) => (
              <label key={a.id} className="flex items-start gap-2 py-1.5 text-sm">
                <Checkbox checked disabled className="mt-0.5" />
                <div>
                  <p className="text-foreground">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.responsible} · до {a.deadline}</p>
                </div>
              </label>
            ))}
          </div>
        )}

        {proposed.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Предложенные меры</p>
            {proposed.map((a) => (
              <label key={a.id} className="flex items-start gap-2 py-1.5 text-sm">
                <Checkbox className="mt-0.5" />
                <div>
                  <p className="text-foreground">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.responsible} · до {a.deadline}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
