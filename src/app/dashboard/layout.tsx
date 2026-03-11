import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Settings } from "lucide-react";
import { ConnectWalletButton } from "@/components/ui/ConnectWalletButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0F141A]">
      <Sidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-14 border-b border-[#2A3340] flex items-center justify-between px-6 bg-[#0F141A]/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#4A5568]">NET</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]" />
            <span className="text-xs font-mono text-[#28C76F]">Solana</span>
            <span className="mx-2 text-[#2A3340]">|</span>
            <span className="text-xs font-mono text-[#4A5568]">BUILT ON</span>
            <span className="text-xs font-mono text-[#F8C61E] ml-1">Ranger Earn</span>
            <span className="mx-2 text-[#2A3340]">|</span>
            <span className="text-xs font-mono text-[#4A5568]">TVL</span>
            <span className="text-xs font-mono text-[#E8ECF0] ml-1">$284.5M</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-[#4A5568] hover:text-[#8F98A3] hover:bg-[#1B222B] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F8C61E]" />
            </button>
            <button className="p-2 rounded-lg text-[#4A5568] hover:text-[#8F98A3] hover:bg-[#1B222B] transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <ConnectWalletButton compact />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
