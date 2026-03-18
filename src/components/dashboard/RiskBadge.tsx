import { RiskLevel, riskLevelLabel } from "@/data/mockData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const styles: Record<RiskLevel, string> = {
  low: "bg-risk-low-bg text-risk-low",
  medium: "bg-risk-medium-bg text-risk-medium",
  high: "bg-risk-high-bg text-risk-high",
};

const dots: Record<RiskLevel, string> = {
  low: "bg-risk-low",
  medium: "bg-risk-medium",
  high: "bg-risk-high",
};

interface Props {
  level: RiskLevel;
  size?: "sm" | "md" | "lg";
  tooltip?: string;
}

export function RiskBadge({ level, size = "md", tooltip }: Props) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5 font-semibold",
  };

  const badge = (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${styles[level]} ${sizeClasses[size]}`}>
      <span className={`w-2 h-2 rounded-full ${dots[level]}`} />
      {riskLevelLabel[level]}
    </span>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent><p>{tooltip}</p></TooltipContent>
      </Tooltip>
    );
  }

  return badge;
}
