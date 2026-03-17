"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useVaultData } from "@/hooks/useVaultData";
import { useUserPosition } from "@/hooks/useUserPosition";
import { useAppMode } from "@/contexts/AppModeContext";
import { TrendingUp, TrendingDown, X, AlertTriangle, Loader2, Eye } from "lucide-react";
import Link from "next/link";

export default function PortfolioPage() {
  const vault = useVaultData();
  const position = useUserPosition();
  const { isDemo, mode } = useAppMode();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawStep, setWithdrawStep] = useState<"form" | "confirm" | "done">("form");
  const { demoWithdraw } = useAppMode();

  const userValue = position.balance;
  const userDeposited = position.deposited;
  const userEarnings = position.earnings;
  const earningsPct = userDeposited > 0 ? ((userEarnings / userDeposited) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Portfolio</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-[#8F98A3]">Your capital positions across economic sectors</p>
            {isDemo && (
              <Badge variant="sunburst">
                <Eye className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            )}
            {!isDemo && vault.isLive && (
              <Badge variant="positive">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] inline-block mr-1 animate-pulse" />
                Live
              </Badge>
            )}
            {position.isLoading && <Loader2 className="w-3.5 h-3.5 text-[#F8C61E] animate-spin" />}
          </div>
        </div>
        <Link href="/dashboard/deposit">
          <button className="px-5 py-2.5 bg-[#F8C61E] text-[#0F141A] rounded-xl text-sm font-semibold hover:bg-[#FFD84D] transition-colors shadow-[0_4px_24px_rgba(248,198,30,0.2)]">
            + Add Capital
          </button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Deposited", value: `$${userDeposited.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, sub: "Principal", color: "#8F98A3" },
          { label: "Total Earnings", value: `$${userEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, sub: `${vault.apy.allTime.toFixed(1)}% all-time APY`, color: "#28C76F" },
          { label: "Portfolio Value", value: `$${userValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, sub: `+${earningsPct.toFixed(1)}%`, color: "#28C76F" },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="py-4">
              <p className="text-xs text-[#8F98A3]">{s.label}</p>
              <p className="font-mono font-bold text-2xl text-[#E8ECF0] mt-1">{s.value}</p>
              <p className="text-xs font-mono mt-1" style={{ color: s.color }}>{s.sub}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Positions */}
      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Capital Allocation</h2>
          <p className="text-xs text-[#8F98A3] mt-0.5">
            {isDemo ? "Simulated exposure by sector" : "Your underlying exposure by sector"}
          </p>
        </CardHeader>
        <CardBody className="space-y-3">
          {(vault.sectors.length > 0 ? vault.sectors : [
            { sector: "Stable Yield", value: 0, apy: 7, color: "#F8C61E", description: "Drift Earn + Jupiter Lend", pct: 33, protocols: [] },
            { sector: "Active Trading", value: 0, apy: 22, color: "#28C76F", description: "Drift delta-neutral", pct: 33, protocols: [] },
            { sector: "DeFi Yield", value: 0, apy: 10, color: "#7B6FF0", description: "Kamino multi-market", pct: 34, protocols: [] },
          ]).map((pos) => {
            const posValue = userValue * (pos.pct / 100);
            const posEarned = posValue * (pos.apy / 100 / 12);
            const dailyChange = ((pos.apy / 365) * (0.5 + Math.random()));
            return (
              <div
                key={pos.sector}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#252C37] border border-[#2A3340] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${pos.color}18` }}
                >
                  <span className="text-lg">
                    {pos.sector === "Stable Yield" ? "\u{1F3E6}" : pos.sector === "Active Trading" ? "\u{1F4CA}" : "\u{1F537}"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-[#E8ECF0]">{pos.sector}</span>
                    <Badge variant={pos.sector === "Stable Yield" ? "housing" : pos.sector === "Active Trading" ? "trade" : "crypto"}>
                      {pos.apy}% APY
                    </Badge>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-[#1B222B] overflow-hidden w-48">
                    <div className="h-full rounded-full" style={{ width: `${pos.pct}%`, background: pos.color }} />
                  </div>
                </div>
                <div className="text-right space-y-1 hidden sm:block">
                  <p className="font-mono font-bold text-[#E8ECF0]">${posValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p className="font-mono text-xs text-[#28C76F]">+${posEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })} earned</p>
                </div>
                <div className="text-right w-20 hidden md:block">
                  <div className="flex items-center justify-end gap-1 text-xs font-mono text-[#28C76F]">
                    <TrendingUp className="w-3 h-3" />
                    +{dailyChange.toFixed(2)}% today
                  </div>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>

      {/* Withdraw section */}
      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Withdraw</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Withdrawable", value: `$${userValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, note: "Available now" },
              { label: "Cooldown", value: "None", note: "Instant withdrawal" },
              { label: "Redemption Fee", value: `${vault.fees.redemption}%`, note: "Vault fee on exit" },
            ].map(r => (
              <div key={r.label} className="p-4 rounded-xl bg-[#252C37] border border-[#2A3340]">
                <p className="text-xs text-[#8F98A3]">{r.label}</p>
                <p className="font-mono font-bold text-[#E8ECF0] mt-1">{r.value}</p>
                <p className="text-xs text-[#4A5568] mt-0.5">{r.note}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setShowWithdraw(true); setWithdrawStep("form"); setWithdrawAmount(""); }}
            className="mt-4 px-5 py-2.5 border border-[#2A3340] rounded-xl text-sm text-[#8F98A3]
              hover:border-[#EA5455]/30 hover:text-[#EA5455] transition-all font-medium"
          >
            Initiate Withdrawal
          </button>
        </CardBody>
      </Card>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#1B222B] border border-[#2A3340] rounded-2xl shadow-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A3340]">
              <h3 className="font-display font-semibold text-[#E8ECF0]">
                {withdrawStep === "done" ? "Withdrawal Complete" : "Withdraw Funds"}
              </h3>
              <button onClick={() => setShowWithdraw(false)} className="text-[#4A5568] hover:text-[#8F98A3]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5">
              {withdrawStep === "form" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#8F98A3] mb-1.5 block">Amount (USDC)</label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#252C37] border border-[#2A3340] rounded-xl px-4 py-3
                        font-mono text-xl text-[#E8ECF0] focus:outline-none focus:border-[#F8C61E]/50 transition-all placeholder-[#4A5568]"
                    />
                    <div className="flex gap-2 mt-2">
                      {["25%", "50%", "75%", "Max"].map(pct => {
                        const val = pct === "Max" ? userValue : userValue * parseInt(pct) / 100;
                        return (
                          <button
                            key={pct}
                            onClick={() => setWithdrawAmount(Math.floor(val).toString())}
                            className="flex-1 py-1.5 rounded-lg text-xs font-mono text-[#8F98A3]
                              bg-[#252C37] hover:bg-[#2A3340] hover:text-[#E8ECF0] border border-[#2A3340] transition-all"
                          >
                            {pct}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <Button
                    fullWidth
                    variant="danger"
                    onClick={() => setWithdrawStep("confirm")}
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {withdrawStep === "confirm" && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[rgba(255,159,67,0.06)] border border-[rgba(255,159,67,0.15)] p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#FF9F43] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#E8ECF0]">Confirm withdrawal</p>
                        <p className="text-xs text-[#8F98A3] mt-1">
                          Withdrawing <span className="font-mono text-[#E8ECF0]">{parseFloat(withdrawAmount).toLocaleString()} USDC</span>
                          {isDemo && " (demo mode)"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button fullWidth variant="secondary" onClick={() => setWithdrawStep("form")}>Back</Button>
                    <Button fullWidth variant="danger" onClick={() => {
                      if (isDemo) demoWithdraw(parseFloat(withdrawAmount));
                      setWithdrawStep("done");
                    }}>Confirm Withdrawal</Button>
                  </div>
                </div>
              )}

              {withdrawStep === "done" && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[rgba(40,199,111,0.1)] flex items-center justify-center mx-auto">
                    <span className="text-2xl">&#x2705;</span>
                  </div>
                  <p className="text-sm text-[#E8ECF0]">
                    {isDemo ? "Demo withdrawal processed" : "Withdrawal request submitted"}
                  </p>
                  <p className="text-xs text-[#8F98A3]">
                    <span className="font-mono">{parseFloat(withdrawAmount).toLocaleString()} USDC</span>
                    {isDemo ? " removed from demo portfolio" : " will be available after the waiting period"}
                  </p>
                  <Button fullWidth onClick={() => setShowWithdraw(false)}>Done</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
