"use client";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useVaultData } from "@/hooks/useVaultData";
import { useAppMode } from "@/contexts/AppModeContext";
import { ShieldCheck, AlertTriangle, Settings, Zap, Globe, ExternalLink, RefreshCw } from "lucide-react";
import { REFERENCE_VAULT_PUBKEY, VAULT_PROGRAM_ID, LENDING_ADAPTOR_PROGRAM_ID, DRIFT_ADAPTOR_PROGRAM_ID, KAMINO_ADAPTOR_PROGRAM_ID } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const adaptors = [
  { name: "Drift Adaptor", id: DRIFT_ADAPTOR_PROGRAM_ID.toBase58(), sector: "Active Trading", color: "#28C76F" },
  { name: "Kamino Adaptor", id: KAMINO_ADAPTOR_PROGRAM_ID.toBase58(), sector: "DeFi Yield", color: "#7B6FF0" },
  { name: "Lending Adaptor", id: LENDING_ADAPTOR_PROGRAM_ID.toBase58(), sector: "Stable Yield", color: "#F8C61E" },
];

export default function AdminPage() {
  const vault = useVaultData();
  const { isAdmin, isDemo } = useAppMode();
  const router = useRouter();

  // Redirect non-admin users (allow demo mode access for showcase)
  useEffect(() => {
    if (!isAdmin && !isDemo) {
      router.push("/dashboard");
    }
  }, [isAdmin, isDemo, router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Vault Admin</h1>
          <p className="text-sm text-[#8F98A3] mt-0.5">Manage vault configuration, adaptors, and fees</p>
        </div>
        <Badge variant={isAdmin ? "crypto" : "sunburst"}>
          <ShieldCheck className="w-3 h-3 mr-1" />
          {isAdmin ? "Admin" : "Demo View"}
        </Badge>
      </div>

      {!isAdmin && (
        <div className="rounded-xl bg-[rgba(255,159,67,0.06)] border border-[rgba(255,159,67,0.15)] p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FF9F43] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#E8ECF0]">Read-only preview</p>
              <p className="text-xs text-[#8F98A3] mt-1">
                Connect the admin or manager wallet to modify vault settings. This is a demo view of the admin panel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Vault overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Vault TVL", value: `$${vault.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: Globe },
          { label: "30d APY", value: `${vault.apy.thirtyDays.toFixed(2)}%`, icon: Zap },
          { label: "Vault Program", value: VAULT_PROGRAM_ID.toBase58().slice(0, 8) + "...", icon: Settings },
          { label: "Status", value: vault.isLive ? "Active" : "Loading", icon: RefreshCw },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-3.5 h-3.5 text-[#8F98A3]" />
                <p className="text-xs text-[#8F98A3]">{s.label}</p>
              </div>
              <p className="font-mono font-bold text-lg text-[#E8ECF0]">{s.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Vault config */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#F8C61E]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Vault Configuration</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Vault Pubkey", value: vault.vaultPubkey || REFERENCE_VAULT_PUBKEY, mono: true },
              { label: "Vault Name", value: vault.vaultName || "TerraFlow", mono: false },
              { label: "Asset", value: "USDC (EPjFWdd5...Dt1v)", mono: true },
              { label: "Performance Fee", value: `${vault.fees.performance}%`, mono: true },
              { label: "Management Fee", value: `${vault.fees.management}%`, mono: true },
              { label: "Issuance Fee", value: `${vault.fees.issuance}%`, mono: true },
              { label: "Redemption Fee", value: `${vault.fees.redemption}%`, mono: true },
              { label: "Withdrawal Wait", value: "0s (instant)", mono: true },
              { label: "Max Cap", value: "$10,000,000", mono: true },
            ].map(c => (
              <div key={c.label} className="p-3 rounded-xl bg-[#252C37] border border-[#2A3340]">
                <p className="text-xs text-[#8F98A3]">{c.label}</p>
                <p className={`text-sm text-[#E8ECF0] mt-1 truncate ${c.mono ? "font-mono" : ""}`} title={c.value}>{c.value}</p>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-[rgba(248,198,30,0.1)] border border-[rgba(248,198,30,0.2)] text-xs font-medium text-[#F8C61E] hover:bg-[rgba(248,198,30,0.15)] transition-colors">
                Update Fees
              </button>
              <button className="px-4 py-2 rounded-xl bg-[rgba(248,198,30,0.1)] border border-[rgba(248,198,30,0.2)] text-xs font-medium text-[#F8C61E] hover:bg-[rgba(248,198,30,0.15)] transition-colors">
                Update Max Cap
              </button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Adaptors */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#28C76F]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Whitelisted Adaptors</h2>
          </div>
          <p className="text-xs text-[#8F98A3] mt-0.5">Ranger Earn adaptors connected to this vault</p>
        </CardHeader>
        <CardBody className="space-y-3">
          {adaptors.map(a => (
            <div key={a.name} className="flex items-center gap-4 p-4 rounded-xl bg-[#252C37] border border-[#2A3340]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}18` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: a.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold text-[#E8ECF0] text-sm">{a.name}</p>
                  <Badge variant="positive">Active</Badge>
                </div>
                <p className="text-xs font-mono text-[#4A5568] mt-0.5 truncate">{a.id}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[#8F98A3]">Sector</p>
                <p className="text-xs font-mono" style={{ color: a.color }}>{a.sector}</p>
              </div>
              <a
                href={`https://solscan.io/account/${a.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A5568] hover:text-[#F8C61E] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}

          {isAdmin && (
            <button className="w-full py-3 rounded-xl border border-dashed border-[#2A3340] text-xs font-medium text-[#4A5568] hover:text-[#F8C61E] hover:border-[#F8C61E]/30 transition-colors">
              + Add Adaptor
            </button>
          )}
        </CardBody>
      </Card>

      {/* Rebalance bot */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#7B6FF0]" />
            <h2 className="font-display font-semibold text-[#E8ECF0]">Rebalance Bot</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Status", value: "Running", color: "#28C76F" },
              { label: "Last Rebalance", value: "2 min ago", color: "#E8ECF0" },
              { label: "Interval", value: "60 min", color: "#E8ECF0" },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-xl bg-[#252C37] border border-[#2A3340]">
                <p className="text-xs text-[#8F98A3]">{s.label}</p>
                <p className="font-mono font-semibold mt-1" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-[#252C37] border border-[#2A3340] p-4">
            <p className="text-xs text-[#8F98A3] mb-2">Target Allocation</p>
            <div className="space-y-2">
              {[
                { sector: "Stable Yield", target: 35, color: "#F8C61E" },
                { sector: "Active Trading", target: 35, color: "#28C76F" },
                { sector: "DeFi Yield", target: 30, color: "#7B6FF0" },
              ].map(t => (
                <div key={t.sector} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                  <span className="text-xs text-[#8F98A3] w-28">{t.sector}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[#1B222B] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${t.target}%`, background: t.color }} />
                  </div>
                  <span className="text-xs font-mono text-[#E8ECF0] w-10 text-right">{t.target}%</span>
                </div>
              ))}
            </div>
          </div>

          {isAdmin && (
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-[rgba(40,199,111,0.1)] border border-[rgba(40,199,111,0.2)] text-xs font-medium text-[#28C76F] hover:bg-[rgba(40,199,111,0.15)] transition-colors">
                Force Rebalance
              </button>
              <button className="px-4 py-2 rounded-xl bg-[rgba(234,84,85,0.1)] border border-[rgba(234,84,85,0.2)] text-xs font-medium text-[#EA5455] hover:bg-[rgba(234,84,85,0.15)] transition-colors">
                Pause Bot
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
