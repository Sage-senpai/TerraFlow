import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { portfolioPositions, vaultStats } from "@/lib/mockData";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Portfolio</h1>
          <p className="text-sm text-[#8F98A3] mt-0.5">Your capital positions across economic sectors</p>
        </div>
        <Link href="/dashboard/deposit">
          <button className="px-5 py-2.5 bg-[#F8C61E] text-[#0F141A] rounded-xl text-sm font-semibold hover:bg-[#FFD84D] transition-colors shadow-[0_4px_24px_rgba(248,198,30,0.2)]">
            + Add Capital
          </button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Deposited", value: `$${vaultStats.deposited.toLocaleString()}`, sub: "Principal" },
          { label: "Total Earnings", value: `$${vaultStats.earnings.toLocaleString()}`, sub: "All-time yield" },
          { label: "Portfolio Value", value: `$${vaultStats.totalValue.toLocaleString()}`, sub: "+18.4%" },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="py-4">
              <p className="text-xs text-[#8F98A3]">{s.label}</p>
              <p className="font-mono font-bold text-2xl text-[#E8ECF0] mt-1">{s.value}</p>
              <p className="text-xs text-[#28C76F] font-mono mt-1">{s.sub}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Positions */}
      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Capital Allocation</h2>
          <p className="text-xs text-[#8F98A3] mt-0.5">Your underlying exposure by sector</p>
        </CardHeader>
        <CardBody className="space-y-3">
          {portfolioPositions.map((pos) => (
            <div
              key={pos.sector}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#252C37] border border-[#2A3340] hover:border-[#2A3340] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${pos.color}18` }}
              >
                <span className="text-lg">
                  {pos.sector === "Housing" ? "🏠" : pos.sector === "Trade" ? "📦" : "🔷"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-[#E8ECF0]">{pos.sector}</span>
                  <Badge variant={pos.sector === "Housing" ? "housing" : pos.sector === "Trade" ? "trade" : "crypto"}>
                    {pos.apy}% APY
                  </Badge>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-[#1B222B] overflow-hidden w-48">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(pos.allocated / vaultStats.totalValue * 100).toFixed(0)}%`,
                      background: pos.color
                    }}
                  />
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="font-mono font-bold text-[#E8ECF0]">${pos.allocated.toLocaleString()}</p>
                <p className="font-mono text-xs text-[#28C76F]">+${pos.earned.toLocaleString()} earned</p>
              </div>
              <div className="text-right w-20">
                <div className={`flex items-center justify-end gap-1 text-xs font-mono ${pos.change >= 0 ? "text-[#28C76F]" : "text-[#EA5455]"}`}>
                  {pos.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {pos.change >= 0 ? "+" : ""}{pos.change}% today
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Withdraw section */}
      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Withdraw</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { label: "Withdrawable", value: `$${vaultStats.totalValue.toLocaleString()}`, note: "Available now" },
              { label: "Cooldown", value: "None", note: "Instant withdrawal" },
              { label: "Est. Slippage", value: "~0.02%", note: "Low liquidity impact" },
            ].map(r => (
              <div key={r.label} className="p-4 rounded-xl bg-[#252C37] border border-[#2A3340]">
                <p className="text-xs text-[#8F98A3]">{r.label}</p>
                <p className="font-mono font-bold text-[#E8ECF0] mt-1">{r.value}</p>
                <p className="text-xs text-[#4A5568] mt-0.5">{r.note}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 px-5 py-2.5 border border-[#2A3340] rounded-xl text-sm text-[#8F98A3]
            hover:border-[#EA5455]/30 hover:text-[#EA5455] transition-all font-medium">
            Initiate Withdrawal
          </button>
        </CardBody>
      </Card>
    </div>
  );
}
