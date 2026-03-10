import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AllocationChart } from "@/components/charts/AllocationChart";
import { YieldChart } from "@/components/charts/YieldChart";
import { AIFeed } from "@/components/dashboard/AIFeed";
import { vaultStats, allocations } from "@/lib/mockData";
import { TrendingUp, ArrowUpRight, Zap, ArrowDownToLine } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Vault Overview</h1>
          <p className="text-sm text-[#8F98A3] mt-0.5">Your AI-managed portfolio across 3 economic sectors</p>
        </div>
        <Link
          href="/dashboard/deposit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F8C61E] text-[#0F141A] rounded-xl text-sm font-semibold
          shadow-[0_4px_24px_rgba(248,198,30,0.25)] hover:shadow-[0_4px_32px_rgba(248,198,30,0.4)] hover:bg-[#FFD84D] transition-all"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Deposit
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Vault Balance",
            value: `$${vaultStats.totalValue.toLocaleString()}`,
            sub: `+${vaultStats.totalValueChange}% all time`,
            subColor: "#28C76F",
            icon: "💰"
          },
          {
            label: "Current APY",
            value: `${vaultStats.apy}%`,
            sub: "Blended across sectors",
            subColor: "#8F98A3",
            icon: "📈"
          },
          {
            label: "Total Earnings",
            value: `$${vaultStats.earnings.toLocaleString()}`,
            sub: "Since first deposit",
            subColor: "#8F98A3",
            icon: "✨"
          },
          {
            label: "Protocol TVL",
            value: `$${(vaultStats.tvl / 1_000_000).toFixed(1)}M`,
            sub: `${vaultStats.users.toLocaleString()} depositors`,
            subColor: "#8F98A3",
            icon: "🏛️"
          },
        ].map((stat) => (
          <Card key={stat.label} glow={stat.label === "Vault Balance"}>
            <CardBody className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#8F98A3] font-medium">{stat.label}</p>
                  <p className="font-mono font-bold text-2xl text-[#E8ECF0] mt-1">{stat.value}</p>
                  <p className="text-xs mt-1 font-mono" style={{ color: stat.subColor }}>{stat.sub}</p>
                </div>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Allocation Chart — 2 cols */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-[#E8ECF0]">Capital Allocation</h2>
                <p className="text-xs text-[#8F98A3] mt-0.5">AI-optimized sector distribution</p>
              </div>
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <AllocationChart />
            {/* Sector detail cards */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {allocations.map((a) => (
                <div
                  key={a.sector}
                  className="rounded-xl p-3 border border-[#2A3340]"
                  style={{ background: `${a.color}0A` }}
                >
                  <p className="text-xs text-[#8F98A3]">{a.sector}</p>
                  <p className="font-mono font-bold text-[#E8ECF0] text-lg mt-0.5">${a.value.toLocaleString()}</p>
                  <p className="text-xs font-mono font-semibold mt-1" style={{ color: a.color }}>{a.apy}% APY</p>
                  <p className="text-xs text-[#4A5568] mt-0.5">{a.description}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* AI Feed — 1 col */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F8C61E]" />
              <h2 className="font-display font-semibold text-[#E8ECF0]">AI Strategy Feed</h2>
            </div>
            <p className="text-xs text-[#8F98A3] mt-0.5">Real-time rebalance decisions</p>
          </CardHeader>
          <CardBody className="py-4">
            <AIFeed limit={4} />
          </CardBody>
        </Card>
      </div>

      {/* Yield Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-[#E8ECF0]">APY Performance</h2>
              <p className="text-xs text-[#8F98A3] mt-0.5">12-month blended yield history</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#28C76F]">
              <TrendingUp className="w-3.5 h-3.5" />
              13.9% avg
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <YieldChart />
        </CardBody>
      </Card>
    </div>
  );
}
