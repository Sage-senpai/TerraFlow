"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, Info, Zap } from "lucide-react";

const strategies = [
  { id: "balanced", label: "Balanced", desc: "Equal-weight across all sectors", apy: 13.0, risk: "Medium" },
  { id: "stable", label: "Stable", desc: "Housing-heavy, low volatility", apy: 11.5, risk: "Low" },
  { id: "growth", label: "Growth", desc: "Trade-heavy, maximum APY", apy: 16.8, risk: "Higher" },
];

const riskColors: Record<string, string> = {
  Low: "#28C76F", Medium: "#F8C61E", Higher: "#FF9F43"
};

export default function DepositPage() {
  const [amount, setAmount] = useState("500");
  const [strategy, setStrategy] = useState("balanced");
  const [asset, setAsset] = useState("USDC");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");

  const selected = strategies.find(s => s.id === strategy)!;
  const numAmount = parseFloat(amount) || 0;
  const annualEst = numAmount * (selected.apy / 100);
  const monthlyEst = annualEst / 12;

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto pt-12">
        <Card glow>
          <CardBody className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(40,199,111,0.15)] flex items-center justify-center mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#E8ECF0]">Deposit Submitted</h2>
            <p className="text-[#8F98A3] mt-2 text-sm">TerraFlow is allocating your capital across sectors</p>
            <div className="mt-6 w-full rounded-xl bg-[#252C37] border border-[#2A3340] px-5 py-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8F98A3]">Amount</span>
                <span className="font-mono text-[#E8ECF0]">{numAmount.toLocaleString()} {asset}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8F98A3]">Strategy</span>
                <span className="font-mono text-[#E8ECF0]">{selected.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8F98A3]">Est. APY</span>
                <span className="font-mono text-[#28C76F]">{selected.apy}%</span>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={() => setStep("form")}>Make Another Deposit</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Deposit</h1>
        <p className="text-sm text-[#8F98A3] mt-0.5">One deposit. TerraFlow handles the rest.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: form */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-display font-semibold text-[#E8ECF0]">Amount</h3>
            </CardHeader>
            <CardBody>
              {/* Asset selector */}
              <div className="flex gap-2 mb-4">
                {["USDC", "SOL"].map(a => (
                  <button
                    key={a}
                    onClick={() => setAsset(a)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      asset === a
                        ? "bg-[rgba(248,198,30,0.1)] text-[#F8C61E] border border-[rgba(248,198,30,0.2)]"
                        : "bg-[#252C37] text-[#8F98A3] border border-[#2A3340] hover:text-[#E8ECF0]"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              {/* Amount input */}
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#252C37] border border-[#2A3340] rounded-xl px-4 py-3.5
                    font-mono text-2xl text-[#E8ECF0] focus:outline-none focus:border-[#F8C61E]/50
                    focus:bg-[#2A3340] transition-all placeholder-[#4A5568]"
                  placeholder="0"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8F98A3] font-mono">{asset}</span>
              </div>
              {/* Quick amounts */}
              <div className="flex gap-2 mt-3">
                {["100", "500", "1000", "5000"].map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-mono text-[#8F98A3]
                      bg-[#252C37] hover:bg-[#2A3340] hover:text-[#E8ECF0] border border-[#2A3340] transition-all"
                  >
                    {Number(v).toLocaleString()}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-display font-semibold text-[#E8ECF0]">Strategy</h3>
            </CardHeader>
            <CardBody className="space-y-2.5">
              {strategies.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStrategy(s.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    strategy === s.id
                      ? "bg-[rgba(248,198,30,0.08)] border-[rgba(248,198,30,0.25)]"
                      : "bg-[#252C37] border-[#2A3340] hover:border-[#2A3340]/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        strategy === s.id ? "bg-[#F8C61E] border-[#F8C61E]" : "border-[#4A5568]"
                      }`} />
                      <span className="font-medium text-sm text-[#E8ECF0]">{s.label}</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#28C76F]">{s.apy}%</span>
                  </div>
                  <p className="text-xs text-[#8F98A3] mt-1 ml-5">{s.desc}</p>
                  <p className="text-xs font-mono mt-0.5 ml-5" style={{ color: riskColors[s.risk] }}>Risk: {s.risk}</p>
                </button>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Right: summary */}
        <div className="space-y-4">
          <Card glow>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F8C61E]" />
                <h3 className="font-display font-semibold text-[#E8ECF0]">Projection</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="rounded-xl bg-[#252C37] border border-[#2A3340] p-4 text-center">
                <p className="text-xs text-[#8F98A3]">Estimated APY</p>
                <p className="font-mono font-bold text-4xl text-[#F8C61E] mt-1">{selected.apy}%</p>
                <p className="text-xs text-[#8F98A3] mt-1">{selected.label} strategy</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Deposit Amount", value: `${numAmount.toLocaleString()} ${asset}` },
                  { label: "Monthly Est.", value: `+$${monthlyEst.toFixed(2)}` },
                  { label: "Annual Est.", value: `+$${annualEst.toFixed(2)}` },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-[#8F98A3]">{r.label}</span>
                    <span className="font-mono text-[#E8ECF0]">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-[rgba(248,198,30,0.06)] border border-[rgba(248,198,30,0.12)] p-3">
                <div className="flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-[#F8C61E] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#8F98A3]">
                    TerraFlow AI continuously rebalances your allocation to maximize yield within your selected risk profile.
                  </p>
                </div>
              </div>
              <Button
                fullWidth
                onClick={() => setStep("success")}
                disabled={numAmount <= 0}
                className="mt-2"
              >
                Deposit {numAmount > 0 ? `${numAmount.toLocaleString()} ${asset}` : ""}
              </Button>
              <p className="text-xs text-center text-[#4A5568]">No withdrawal lock-up • Instant allocation</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
