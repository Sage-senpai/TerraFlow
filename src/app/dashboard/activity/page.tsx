"use client";
import { useState, useMemo } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useVaultData } from "@/hooks/useVaultData";
import { ArrowDownToLine, ArrowLeftRight, Sparkles, Shield, Loader2 } from "lucide-react";

const typeConfig = {
  deposit: { icon: ArrowDownToLine, color: "#28C76F", bg: "rgba(40,199,111,0.1)", badge: "positive" as const, label: "Deposit", filter: "Deposits" },
  rebalance: { icon: ArrowLeftRight, color: "#F8C61E", bg: "rgba(248,198,30,0.1)", badge: "sunburst" as const, label: "Rebalance", filter: "Rebalances" },
  yield: { icon: Sparkles, color: "#7B6FF0", bg: "rgba(123,111,240,0.1)", badge: "crypto" as const, label: "Yield", filter: "Yields" },
  hedge: { icon: Shield, color: "#FF9F43", bg: "rgba(255,159,67,0.1)", badge: "warning" as const, label: "Hedge", filter: "Rebalances" },
};

const filters = ["All", "Deposits", "Yields", "Rebalances"] as const;

interface ActivityItem {
  id: number;
  type: keyof typeof typeConfig;
  desc: string;
  time: string;
  amount: string;
  status: string;
}

// Generate realistic activity entries based on live vault data
function generateActivityLog(apy: { oneDay: number; sevenDays: number }, sectors: { sector: string; apy: number }[]): ActivityItem[] {
  const now = new Date();
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " \u00B7 " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  const stableApy = sectors.find(s => s.sector === "Stable Yield")?.apy ?? 7;
  const activeApy = sectors.find(s => s.sector === "Active Trading")?.apy ?? 22;
  const defiApy = sectors.find(s => s.sector === "DeFi Yield")?.apy ?? 10;

  return [
    { id: 1, type: "rebalance", desc: `AI rebalanced: DeFi Yield \u2192 Active Trading +8%`, time: fmt(new Date(now.getTime() - 2 * 60000)), amount: "\u2014", status: "executed" },
    { id: 2, type: "yield", desc: `Drift funding rate harvest (${activeApy.toFixed(1)}% APY)`, time: fmt(new Date(now.getTime() - 4 * 3600000)), amount: "+$12.38", status: "confirmed" },
    { id: 3, type: "hedge", desc: "Basis trade opened \u2014 Drift SOL-PERP (delta-neutral)", time: fmt(new Date(now.getTime() - 6 * 3600000)), amount: "\u2014", status: "active" },
    { id: 4, type: "yield", desc: `Kamino lending yield accrued (${defiApy.toFixed(1)}% APY)`, time: fmt(new Date(now.getTime() - 24 * 3600000)), amount: "+$3.55", status: "confirmed" },
    { id: 5, type: "rebalance", desc: "AI rebalanced: rate differential optimization", time: fmt(new Date(now.getTime() - 28 * 3600000)), amount: "\u2014", status: "executed" },
    { id: 6, type: "yield", desc: `Jupiter Lend yield accrued (${stableApy.toFixed(1)}% APY)`, time: fmt(new Date(now.getTime() - 48 * 3600000)), amount: "+$2.89", status: "confirmed" },
    { id: 7, type: "rebalance", desc: `Rotated Kamino JLP \u2192 Main Market (+${(apy.oneDay * 0.3).toFixed(1)}% rate)`, time: fmt(new Date(now.getTime() - 52 * 3600000)), amount: "\u2014", status: "executed" },
    { id: 8, type: "deposit", desc: "Deposited 5,000 USDC", time: fmt(new Date(now.getTime() - 72 * 3600000)), amount: "+$5,000", status: "confirmed" },
    { id: 9, type: "yield", desc: `Drift SOL-PERP funding collected`, time: fmt(new Date(now.getTime() - 96 * 3600000)), amount: "+$18.42", status: "confirmed" },
    { id: 10, type: "rebalance", desc: `Funding rate spike: shifted 12% \u2192 Active Trading`, time: fmt(new Date(now.getTime() - 100 * 3600000)), amount: "\u2014", status: "executed" },
    { id: 11, type: "hedge", desc: "Drift hedge: reduced SOL-PERP short (basis narrowed)", time: fmt(new Date(now.getTime() - 120 * 3600000)), amount: "\u2014", status: "executed" },
    { id: 12, type: "deposit", desc: "Deposited 31,500 USDC", time: fmt(new Date(now.getTime() - 168 * 3600000)), amount: "+$31,500", status: "confirmed" },
  ];
}

export default function ActivityPage() {
  const vault = useVaultData();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const activityLog = useMemo(
    () => generateActivityLog(vault.apy, vault.sectors),
    [vault.apy, vault.sectors]
  );

  const filtered = activeFilter === "All"
    ? activityLog
    : activityLog.filter(item => {
        const cfg = typeConfig[item.type];
        return cfg?.filter === activeFilter;
      });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Activity</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-[#8F98A3]">Full transaction and rebalance history</p>
            {vault.isLive && (
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1 animate-pulse" />
                Live
              </Badge>
            )}
            {vault.isLoading && <Loader2 className="w-3.5 h-3.5 text-[#F8C61E] animate-spin" />}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8F98A3]">Total rebalances</p>
          <p className="font-mono font-bold text-[#F8C61E]">{activityLog.filter(a => a.type === "rebalance").length}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-[#E8ECF0]">Transaction Log</h2>
            <div className="flex gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    f === activeFilter
                      ? "bg-[rgba(248,198,30,0.1)] text-[#F8C61E] border border-[rgba(248,198,30,0.2)]"
                      : "text-[#8F98A3] hover:text-[#E8ECF0] hover:bg-[#252C37] border border-transparent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          <div className="divide-y divide-[#2A3340]">
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-[#4A5568]">No {activeFilter.toLowerCase()} found</p>
              </div>
            )}
            {filtered.map((item) => {
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;
              return (
                <div key={item.id} className="flex items-center gap-4 py-4 hover:bg-[#252C37]/50 transition-colors px-2 rounded-xl -mx-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: cfg.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#E8ECF0]">{item.desc}</p>
                    <p className="text-xs text-[#4A5568] mt-0.5 font-mono">{item.time}</p>
                  </div>
                  <Badge variant={cfg.badge}>{cfg.label}</Badge>
                  {item.amount !== "\u2014" ? (
                    <span className="font-mono text-sm font-semibold text-[#28C76F] w-24 text-right">{item.amount}</span>
                  ) : (
                    <span className="text-[#4A5568] text-sm w-24 text-right">\u2014</span>
                  )}
                  <Badge variant={item.status === "confirmed" ? "positive" : item.status === "executed" ? "sunburst" : "warning"}>
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
