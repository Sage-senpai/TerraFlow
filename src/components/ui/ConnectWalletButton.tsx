"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Wallet, LogOut } from "lucide-react";

export function ConnectWalletButton({ compact = false }: { compact?: boolean }) {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  if (publicKey) {
    const addr = publicKey.toBase58();
    const short = `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1B222B] border border-[#2A3340]">
          <div className="w-2 h-2 rounded-full bg-[#28C76F]" />
          <span className="font-mono text-xs text-[#E8ECF0]">{short}</span>
        </div>
        <button
          onClick={disconnect}
          className="p-2 rounded-xl text-[#4A5568] hover:text-[#EA5455] hover:bg-[rgba(234,84,85,0.1)] transition-colors"
          title="Disconnect"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      disabled={connecting}
      className={`
        inline-flex items-center gap-2 font-semibold rounded-xl transition-all
        bg-[#F8C61E] text-[#0F141A] hover:bg-[#FFD84D]
        shadow-[0_4px_16px_rgba(248,198,30,0.25)] hover:shadow-[0_4px_24px_rgba(248,198,30,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${compact ? "px-3 py-2 text-xs" : "px-5 py-2.5 text-sm"}
      `}
    >
      <Wallet className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
