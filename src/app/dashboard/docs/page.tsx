"use client";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Zap, Shield, BarChart3, ArrowLeftRight, BookOpen } from "lucide-react";
import { REFERENCE_VAULT_PUBKEY } from "@/lib/constants";

const sections = [
  {
    title: "How TerraFlow Works",
    icon: Zap,
    color: "#F8C61E",
    items: [
      { q: "What is TerraFlow?", a: "TerraFlow is an AI-managed yield vault built on Ranger Earn. It takes a single USDC deposit and routes capital across Drift, Kamino, and Jupiter protocols to capture diversified yield." },
      { q: "How does the vault generate yield?", a: "Three strategies: (1) Stable Yield from Drift Earn spot lending + Jupiter Lend, (2) Active Trading via Drift delta-neutral funding rate farming (long spot + short perp), and (3) DeFi Yield from Kamino multi-market lending optimization." },
      { q: "What is Ranger Earn?", a: "Ranger Earn (formerly Voltr) is a modular vault infrastructure on Solana. It provides the on-chain vault smart contract, adaptor system for connecting to DeFi protocols, and transaction building APIs. TerraFlow uses Ranger as its vault layer." },
      { q: "Is TerraFlow custodial?", a: "No. TerraFlow is fully non-custodial. Your funds are held in a Ranger Earn vault smart contract on Solana. Neither TerraFlow nor Ranger can access your principal. Only you can deposit and withdraw." },
    ],
  },
  {
    title: "Sectors & Strategies",
    icon: BarChart3,
    color: "#28C76F",
    items: [
      { q: "Stable Yield (5-8% APY)", a: "Capital is deployed to Drift Earn (USDC spot lending, Market 0) and Jupiter Lend. The AI automatically rotates between them based on which offers the higher lending rate." },
      { q: "Active Trading (15-30% APY)", a: "Delta-neutral funding rate farming on Drift Protocol. The vault goes long spot SOL and short SOL-PERP simultaneously, capturing the funding rate premium without directional price risk." },
      { q: "DeFi Yield (6-12% APY)", a: "Multi-market USDC lending via Kamino Finance. Capital is spread across Main Market, JLP Market, and Alt Markets, with AI optimizing allocation for peak rates." },
    ],
  },
  {
    title: "AI Rebalance Engine",
    icon: ArrowLeftRight,
    color: "#7B6FF0",
    items: [
      { q: "How does the AI work?", a: "An off-chain monitoring bot tracks Drift funding rates, Kamino lending rates, and Jupiter yields in real-time. When rate differentials exceed a threshold, it triggers an on-chain rebalance via the Ranger vault manager keypair." },
      { q: "How often does it rebalance?", a: "The AI checks rates every 30 seconds and can execute rebalances up to ~47 times per day. It only rebalances when the expected yield improvement exceeds transaction costs." },
      { q: "Can I disable auto-rebalancing?", a: "In Settings (gear icon, top-right), you can toggle Auto-Rebalance off. This locks the current allocation until you re-enable it." },
    ],
  },
  {
    title: "Security & Risk",
    icon: Shield,
    color: "#FF9F43",
    items: [
      { q: "What are the risks?", a: "Smart contract risk (Ranger vault + protocol adaptors), market risk (funding rates can go negative), and liquidity risk (large withdrawals may face slippage). TerraFlow mitigates these with circuit breakers, health factor monitoring, and diversification." },
      { q: "What fees does TerraFlow charge?", a: "Fees are set at the vault level: performance fee on earned yield, plus small issuance/redemption fees. No management fee on principal. Check the deposit page for current rates." },
      { q: "What is the withdrawal process?", a: "Withdrawals go through a short waiting period (~5 minutes) to allow the vault to unwind positions cleanly. You can also use direct withdrawal for instant access with slightly higher slippage." },
    ],
  },
];

const links = [
  { label: "Ranger Earn Docs", url: "https://docs.ranger.finance", desc: "Vault infrastructure documentation" },
  { label: "Drift Protocol", url: "https://docs.drift.trade", desc: "Perpetuals and lending protocol" },
  { label: "Kamino Finance", url: "https://docs.kamino.finance", desc: "Multi-market lending optimizer" },
  { label: "Solscan (Vault)", url: `https://solscan.io/account/${REFERENCE_VAULT_PUBKEY}`, desc: "On-chain vault account" },
];

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Documentation</h1>
          <p className="text-sm text-[#8F98A3] mt-0.5">Protocol mechanics, strategies, and risk disclosures</p>
        </div>
        <Badge variant="neutral">
          <BookOpen className="w-3 h-3 mr-1" />
          v0.1
        </Badge>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map(l => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#1B222B] border border-[#2A3340] hover:border-[#F8C61E]/30 transition-colors group"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-[#E8ECF0] group-hover:text-[#F8C61E] transition-colors">{l.label}</span>
              <ExternalLink className="w-3 h-3 text-[#4A5568] group-hover:text-[#F8C61E] transition-colors" />
            </div>
            <p className="text-xs text-[#4A5568] mt-1">{l.desc}</p>
          </a>
        ))}
      </div>

      {/* FAQ sections */}
      {sections.map(section => {
        const Icon = section.icon;
        return (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${section.color}18` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: section.color }} />
                </div>
                <h2 className="font-display font-semibold text-[#E8ECF0]">{section.title}</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {section.items.map(item => (
                <div key={item.q} className="rounded-xl bg-[#252C37] border border-[#2A3340] p-4">
                  <p className="text-sm font-medium text-[#E8ECF0]">{item.q}</p>
                  <p className="text-sm text-[#8F98A3] mt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        );
      })}

      {/* Architecture diagram */}
      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Architecture</h2>
          <p className="text-xs text-[#8F98A3] mt-0.5">How capital flows through TerraFlow</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center gap-0 py-4">
            <div className="px-6 py-2.5 rounded-xl bg-[#252C37] border border-[#2A3340] text-sm font-mono text-[#E8ECF0]">
              User Wallet (USDC)
            </div>
            <div className="w-px h-6 bg-[#2A3340]" />
            <div className="px-6 py-2.5 rounded-xl bg-[rgba(248,198,30,0.08)] border border-[rgba(248,198,30,0.2)] text-sm font-mono text-[#F8C61E] font-semibold">
              Ranger Earn Vault (on-chain)
            </div>
            <div className="w-px h-4 bg-[#2A3340]" />
            <div className="px-6 py-2 rounded-xl bg-[rgba(123,111,240,0.08)] border border-[rgba(123,111,240,0.15)] text-xs font-mono text-[#7B6FF0]">
              TerraFlow AI Engine (off-chain monitor + on-chain keeper)
            </div>
            <div className="flex items-start gap-0 mt-0">
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-[#2A3340]" />
                <div className="w-40 h-px bg-[#2A3340]" />
              </div>
              <div className="w-px h-6 bg-[#2A3340]" />
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-[#2A3340]" />
                <div className="w-40 h-px bg-[#2A3340]" />
              </div>
            </div>
            <div className="flex gap-4 mt-0">
              {[
                { label: "Drift Adaptor", sub: "Earn + Perps", color: "#F8C61E" },
                { label: "Kamino Adaptor", sub: "Multi-market Lend", color: "#7B6FF0" },
                { label: "Lending Adaptor", sub: "Jupiter + Save", color: "#28C76F" },
              ].map(a => (
                <div key={a.label} className="px-4 py-2.5 rounded-xl border text-center" style={{ background: `${a.color}0A`, borderColor: `${a.color}25` }}>
                  <p className="text-xs font-mono font-medium" style={{ color: a.color }}>{a.label}</p>
                  <p className="text-xs text-[#4A5568] mt-0.5">{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
