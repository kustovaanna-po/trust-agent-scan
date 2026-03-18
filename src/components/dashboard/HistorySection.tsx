import { versionHistory, statusLabel } from "@/data/mockData";
import { RiskBadge } from "./RiskBadge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const riskToNum = { low: 1, medium: 2, high: 3 } as const;
const chartData = [...versionHistory].reverse().map((v) => ({
  version: `v${v.version}`,
  risk: riskToNum[v.integralRisk],
}));

export function HistorySection() {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-foreground mb-4">История версий</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Версия</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Риск</TableHead>
                <TableHead>Изменения</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versionHistory.map((v) => (
                <TableRow key={v.version} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">v{v.version}</TableCell>
                  <TableCell className="text-muted-foreground">{v.date}</TableCell>
                  <TableCell><RiskBadge level={v.integralRisk} size="sm" /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.delta}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{statusLabel[v.status]}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Динамика интегрального риска</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="version" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={(v) => ["", "Низ", "Сред", "Выс"][v]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number) => ["Низкий", "Средний", "Высокий"][v - 1]} />
              <Line type="monotone" dataKey="risk" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
