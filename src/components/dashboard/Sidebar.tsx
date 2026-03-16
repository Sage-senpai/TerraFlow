"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LayoutDashboard, Wallet, ArrowDownToLine, BarChart3,
  Activity, Vote, BookOpen, ChevronRight, Zap
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/deposit", label: "Deposit", icon: ArrowDownToLine },
  { href: "/dashboard/strategies", label: "Strategies", icon: BarChart3 },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/governance", label: "Governance", icon: Vote },
  { href: "/dashboard/docs", label: "Docs", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const { publicKey, connected } = useWallet();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#0F141A] border-r border-[#2A3340] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#2A3340]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#F8C61E] flex items-center justify-center shadow-[0_0_16px_rgba(248,198,30,0.4)]">
            <Zap className="w-4 h-4 text-[#0F141A]" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[#E8ECF0] text-lg tracking-tight">TerraFlow</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 group
                ${active
                  ? "bg-[rgba(248,198,30,0.1)] text-[#F8C61E] border border-[rgba(248,198,30,0.15)]"
                  : "text-[#8F98A3] hover:text-[#E8ECF0] hover:bg-[#1B222B]"
                }
              `}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#F8C61E]" : "text-[#4A5568] group-hover:text-[#8F98A3]"}`} />
              {label}
              {active && <ChevronRight className="ml-auto w-3 h-3 text-[#F8C61E]/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: wallet / status */}
      <div className="px-4 pb-4 border-t border-[#2A3340] pt-4">
        <div className="rounded-xl bg-[#1B222B] border border-[#2A3340] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connected ? "bg-[#28C76F] animate-pulse" : "bg-[#4A5568]"}`} />
            <span className="text-xs text-[#8F98A3] font-mono">
              {publicKey
                ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
                : "Not connected"}
            </span>
          </div>
          <div className="mt-1 text-xs text-[#4A5568]">Solana Mainnet</div>
        </div>
      </div>
    </aside>
  );
}
