import { agent, statusLabel } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Bot, Calendar, Hash, User } from "lucide-react";

export function Header() {
  return (
    <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{agent.name}</h1>
          <div className="mt-0.5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Hash className="h-3.5 w-3.5" />{agent.id}</span>
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{agent.owner}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{agent.lastAssessment}</span>
            <span>v{agent.version}</span>
          </div>
        </div>
      </div>
      <Badge variant="outline" className={`w-fit font-medium px-3 py-1 ${
        agent.status === "approved" ? "border-risk-low bg-risk-low-bg text-risk-low" :
        agent.status === "in_progress" ? "border-risk-medium bg-risk-medium-bg text-risk-medium" :
        "border-risk-high bg-risk-high-bg text-risk-high"
      }`}>
        {statusLabel[agent.status]}
      </Badge>
    </header>
  );
}
