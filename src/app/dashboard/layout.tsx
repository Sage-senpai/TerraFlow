import { Sidebar } from "@/components/dashboard/Sidebar";
import { ConnectWalletButton } from "@/components/ui/ConnectWalletButton";
import { NotificationPanel } from "@/components/ui/NotificationPanel";
import { SettingsPanel } from "@/components/ui/SettingsPanel";

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
            <NotificationPanel />
            <SettingsPanel />
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
