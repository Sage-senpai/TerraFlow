import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { YieldChart } from "@/components/charts/YieldChart";
import { AllocationChart } from "@/components/charts/AllocationChart";
import { allocations, aiFeed } from "@/lib/mockData";
import { Shield, Zap, TrendingUp } from "lucide-react";

const riskMetrics = [
  { label: "Sharpe Ratio", value: "2.14", note: "Excellent risk-adjusted return" },
  { label: "Max Drawdown", value: "-4.2%", note: "12-month worst case" },
  { label: "Volatility", value: "Low", note: "Stable RWA base" },
  { label: "Correlation", value: "0.31", note: "Low market correlation" },
];

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Strategy Explorer</h1>
        <p className="text-sm text-[#8F98A3] mt-0.5">AI allocation logic, sector yields, and risk ratings</p>
      </div>

      {/* Current allocation */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F8C61E]" />
              <h2 className="font-display font-semibold text-[#E8ECF0]">Current Allocation</h2>
            </div>
          </CardHeader>
          <CardBody>
            <AllocationChart />
          </CardBody>
        </Card>

        {/* Sector yields */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-[#E8ECF0]">Sector Yield History</h2>
              <Badge variant="neutral">12 months</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <YieldChart showAll />
            <div className="flex items-center gap-6 mt-3">
              {[
                { label: "Housing", color: "#F8C61E" },
                { label: "Trade", color: "#28C76F" },
                { label: "Crypto", color: "#7B6FF0" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs text-[#8F98A3]">{l.label}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Risk metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#28C76F]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Risk Assessment</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-4 gap-4">
            {riskMetrics.map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-[#252C37] border border-[#2A3340]">
                <p className="text-xs text-[#8F98A3]">{m.label}</p>
                <p className="font-mono font-bold text-xl text-[#E8ECF0] mt-1">{m.value}</p>
                <p className="text-xs text-[#4A5568] mt-0.5">{m.note}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Sector breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {allocations.map((a) => (
          <Card key={a.sector} hover>
            <CardBody>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
                  <h3 className="font-display font-semibold text-[#E8ECF0]">{a.sector}</h3>
                </div>
                <Badge variant={a.sector === "Housing" ? "housing" : a.sector === "Trade" ? "trade" : "crypto"}>
                  {a.apy}% APY
                </Badge>
              </div>
              <p className="text-xs text-[#8F98A3]">{a.description}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8F98A3]">Weight</span>
                  <span className="font-mono text-[#E8ECF0]">{a.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#252C37] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                </div>
                {a.sector === "Housing" && (
                  <p className="text-xs text-[#4A5568] mt-2">Via Ondo Finance RWA rails · Pyth yield feed</p>
                )}
                {a.sector === "Trade" && (
                  <p className="text-xs text-[#4A5568] mt-2">Invoice financing pool · 90-day average duration</p>
                )}
                {a.sector === "Crypto" && (
                  <p className="text-xs text-[#4A5568] mt-2">mSOL + stSOL LST optimization · Auto-compound</p>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent rebalances */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#28C76F]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Rebalance History</h2>
          </div>
        </CardHeader>
        <CardBody className="space-y-2">
          {aiFeed.slice(0, 3).map(item => (
            <div key={item.id} className="flex items-start justify-between p-3 rounded-xl bg-[#252C37] border border-[#2A3340]">
              <div>
                <p className="text-sm font-medium text-[#E8ECF0]">{item.body}</p>
                <p className="text-xs text-[#8F98A3] mt-0.5">{item.reason}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-xs font-mono text-[#28C76F]">{item.impact}</p>
                <p className="text-xs text-[#4A5568] mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
