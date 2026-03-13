"use client";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AllocationChart } from "@/components/charts/AllocationChart";
import { YieldChart } from "@/components/charts/YieldChart";
import { AIFeed } from "@/components/dashboard/AIFeed";
import { useVaultData } from "@/hooks/useVaultData";
import { TrendingUp, ArrowDownToLine, Zap, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const vault = useVaultData();

  const liveApyData = vault.dailyDates.map((date, i) => ({
    date,
    apy: vault.dailyApy[i] ?? 0,
  }));

  const avgApy = vault.dailyApy.length > 0
    ? vault.dailyApy.slice(-30).reduce((s, v) => s + v, 0) / Math.min(vault.dailyApy.length, 30)
    : 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Vault Overview</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-[#8F98A3]">AI-managed portfolio across 3 economic sectors</p>
            {vault.isLive && (
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1 animate-pulse" />
                Live · Ranger Earn
              </Badge>
            )}
            {vault.isLoading && (
              <Loader2 className="w-3.5 h-3.5 text-[#F8C61E] animate-spin" />
            )}
          </div>
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
            value: `$${vault.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            sub: vault.isLive ? `${vault.vaultPubkey.slice(0, 6)}...${vault.vaultPubkey.slice(-4)}` : "Loading...",
            subColor: vault.isLive ? "#F8C61E" : "#8F98A3",
            icon: "💰"
          },
          {
            label: "Current APY",
            value: `${vault.apy.thirtyDays.toFixed(2)}%`,
            sub: `1d: ${vault.apy.oneDay.toFixed(1)}% · 7d: ${vault.apy.sevenDays.toFixed(1)}%`,
            subColor: "#8F98A3",
            icon: "📈"
          },
          {
            label: "All-Time APY",
            value: `${vault.apy.allTime.toFixed(2)}%`,
            sub: "Since vault inception",
            subColor: "#28C76F",
            icon: "✨"
          },
          {
            label: "Share Price",
            value: vault.sharePrice.toFixed(4),
            sub: "Assets per LP token",
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

      {/* On-chain reference */}
      {vault.isLive && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[rgba(248,198,30,0.04)] border border-[rgba(248,198,30,0.1)]">
          <ExternalLink className="w-3.5 h-3.5 text-[#F8C61E] flex-shrink-0" />
          <p className="text-xs text-[#8F98A3]">
            Reading live data from Ranger Earn vault{" "}
            <a
              href={`https://solscan.io/account/${vault.vaultPubkey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8C61E] font-mono hover:underline"
            >
              {vault.vaultPubkey.slice(0, 8)}...{vault.vaultPubkey.slice(-6)}
            </a>
            {" "}· On-chain, non-custodial, audited
          </p>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Allocation Chart — 2 cols */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-[#E8ECF0]">Capital Allocation</h2>
                <p className="text-xs text-[#8F98A3] mt-0.5">AI-optimized sector distribution via Ranger adaptors</p>
              </div>
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1" />
                {vault.isLive ? "Live" : "Loading"}
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <AllocationChart
              data={vault.sectors.length > 0 ? vault.sectors : undefined}
              blendedApy={vault.apy.thirtyDays || undefined}
            />
            {/* Sector detail cards */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {(vault.sectors.length > 0 ? vault.sectors : [
                { sector: "Housing", value: 0, apy: 0, color: "#F8C61E", description: "Tokenized rental income", pct: 0, protocols: [] },
                { sector: "Trade", value: 0, apy: 0, color: "#28C76F", description: "Invoice financing", pct: 0, protocols: [] },
                { sector: "Crypto", value: 0, apy: 0, color: "#7B6FF0", description: "Liquid staking", pct: 0, protocols: [] },
              ]).map((a) => (
                <div
                  key={a.sector}
                  className="rounded-xl p-3 border border-[#2A3340]"
                  style={{ background: `${a.color}0A` }}
                >
                  <p className="text-xs text-[#8F98A3]">{a.sector}</p>
                  <p className="font-mono font-bold text-[#E8ECF0] text-lg mt-0.5">
                    ${a.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs font-mono font-semibold mt-1" style={{ color: a.color }}>{a.apy}% APY</p>
                  <p className="text-xs text-[#4A5568] mt-0.5">{a.description}</p>
                  {a.protocols && a.protocols.length > 0 && (
                    <p className="text-[10px] text-[#4A5568] mt-1 font-mono truncate" title={a.protocols.join(", ")}>
                      {a.protocols.slice(0, 2).join(", ")}
                    </p>
                  )}
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

      {/* Yield Chart — live data from Ranger */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-[#E8ECF0]">APY Performance</h2>
              <p className="text-xs text-[#8F98A3] mt-0.5">
                {vault.isLive ? "Live daily APY from Ranger vault" : "12-month blended yield history"}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#28C76F]">
              <TrendingUp className="w-3.5 h-3.5" />
              {avgApy.toFixed(1)}% avg (30d)
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <YieldChart liveData={liveApyData.length > 0 ? liveApyData : undefined} />
        </CardBody>
      </Card>
    </div>
  );
}
