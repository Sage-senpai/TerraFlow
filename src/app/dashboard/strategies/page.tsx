"use client";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { YieldChart } from "@/components/charts/YieldChart";
import { AllocationChart } from "@/components/charts/AllocationChart";
import { useVaultData } from "@/hooks/useVaultData";
import { Shield, Zap, TrendingUp, Loader2 } from "lucide-react";

const riskMetrics = [
  { label: "Sharpe Ratio", value: "2.14", note: "Excellent risk-adjusted return" },
  { label: "Max Drawdown", value: "-4.2%", note: "12-month worst case" },
  { label: "Health Factor", value: ">1.5", note: "All positions safe" },
  { label: "Correlation", value: "0.12", note: "Delta-neutral core" },
];

const sectorDetails: Record<string, string> = {
  "Stable Yield": "Drift Earn (USDC spot lending, Market 0) + Jupiter Lend - Auto-rotates to highest rate",
  "Active Trading": "Drift Perps \u2014 long spot + short perp captures funding premium - Delta-neutral",
  "DeFi Yield": "Kamino Main Market + JLP Market + Alt Market - Multi-reserve USDC optimization",
};

export default function StrategiesPage() {
  const vault = useVaultData();

  const liveApyData = vault.dailyDates.map((date, i) => ({
    date,
    apy: vault.dailyApy[i] ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Strategy Explorer</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-[#8F98A3]">AI allocation logic across Drift, Kamino & Jupiter</p>
            {vault.isLive && (
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1 animate-pulse" />
                Live
              </Badge>
            )}
            {vault.isLoading && <Loader2 className="w-3.5 h-3.5 text-[#F8C61E] animate-spin" />}
          </div>
        </div>
      </div>

      {/* Current allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F8C61E]" />
              <h2 className="font-display font-semibold text-[#E8ECF0]">Current Allocation</h2>
            </div>
          </CardHeader>
          <CardBody>
            <AllocationChart
              data={vault.sectors.length > 0 ? vault.sectors : undefined}
              blendedApy={vault.apy.thirtyDays || undefined}
            />
          </CardBody>
        </Card>

        {/* Sector yields */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-[#E8ECF0]">
                {vault.isLive ? "Live APY Performance" : "Sector Yield History"}
              </h2>
              <Badge variant="neutral">{vault.isLive ? `${liveApyData.length} days` : "12 months"}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <YieldChart
              showAll={!vault.isLive}
              liveData={liveApyData.length > 0 ? liveApyData : undefined}
            />
            {!vault.isLive && (
              <div className="flex items-center gap-6 mt-3">
                {[
                  { label: "Stable Yield", color: "#F8C61E" },
                  { label: "Active Trading", color: "#28C76F" },
                  { label: "DeFi Yield", color: "#7B6FF0" },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                    <span className="text-xs text-[#8F98A3]">{l.label}</span>
                  </div>
                ))}
              </div>
            )}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(vault.sectors.length > 0 ? vault.sectors : [
          { sector: "Stable Yield", pct: 35, value: 0, apy: 7, color: "#F8C61E", description: "Drift Earn + Jupiter Lend", protocols: [] },
          { sector: "Active Trading", pct: 35, value: 0, apy: 22, color: "#28C76F", description: "Drift delta-neutral funding rate", protocols: [] },
          { sector: "DeFi Yield", pct: 30, value: 0, apy: 10, color: "#7B6FF0", description: "Kamino multi-market lending", protocols: [] },
        ]).map((a) => (
          <Card key={a.sector} hover>
            <CardBody>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
                  <h3 className="font-display font-semibold text-[#E8ECF0]">{a.sector}</h3>
                </div>
                <Badge variant={a.sector === "Stable Yield" ? "housing" : a.sector === "Active Trading" ? "trade" : "crypto"}>
                  {a.apy}% APY
                </Badge>
              </div>
              <p className="text-xs text-[#8F98A3]">{a.description}</p>
              {a.protocols && a.protocols.length > 0 && (
                <p className="text-[10px] text-[#4A5568] mt-1 font-mono truncate">
                  {a.protocols.join(", ")}
                </p>
              )}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8F98A3]">Weight</span>
                  <span className="font-mono text-[#E8ECF0]">{a.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#252C37] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-[#8F98A3]">Value</span>
                  <span className="font-mono text-[#E8ECF0]">${a.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#4A5568] mt-2">{sectorDetails[a.sector]}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Rebalance History — simulated from live data context */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#28C76F]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Recent Rebalance Decisions</h2>
          </div>
        </CardHeader>
        <CardBody className="space-y-2">
          {[
            { body: `Shifted 8% from DeFi Yield \u2192 Active Trading`, reason: `Drift funding rate spiked to ${(vault.apy.oneDay * 2.5).toFixed(0)}% APY on SOL-PERP`, impact: "+1.8% projected APY", time: "2 min ago" },
            { body: "Rotated Jupiter Lend \u2192 Kamino JLP Market", reason: "Kamino JLP USDC rate increased to 8.2% from 5.1%", impact: "+0.6% APY", time: "3h ago" },
            { body: "Opened basis trade: long SOL + short SOL-PERP", reason: `Annualized basis at ${(vault.apy.sevenDays * 1.5).toFixed(1)}% \u2014 above entry threshold`, impact: "Delta-neutral deployed", time: "6h ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-[#252C37] border border-[#2A3340]">
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
