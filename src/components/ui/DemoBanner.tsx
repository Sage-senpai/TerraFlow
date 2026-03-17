"use client";
import { useAppMode } from "@/contexts/AppModeContext";
import { Eye, ShieldCheck, Wallet } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export function DemoBanner() {
  const { mode, isDemo, isAdmin, demoPortfolio } = useAppMode();

  if (isAdmin) {
    return (
      <div className="flex items-center justify-between px-4 lg:px-6 py-2 bg-[rgba(123,111,240,0.06)] border-b border-[rgba(123,111,240,0.15)]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7B6FF0]" />
          <span className="text-xs font-mono text-[#7B6FF0]">Admin Mode</span>
          <span className="text-xs text-[#8F98A3]">Vault management enabled</span>
        </div>
      </div>
    );
  }

  if (isDemo) {
    return (
      <div className="flex items-center justify-between px-4 lg:px-6 py-2 bg-[rgba(248,198,30,0.04)] border-b border-[rgba(248,198,30,0.1)]">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-[#F8C61E]" />
          <span className="text-xs font-mono text-[#F8C61E]">Demo Mode</span>
          <span className="text-xs text-[#8F98A3]">
            Simulated portfolio: ${demoPortfolio.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USDC
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#4A5568]">Connect wallet for live data</span>
          <ConnectWalletButton compact />
        </div>
      </div>
    );
  }

  // Live mode — no banner needed
  return null;
}
