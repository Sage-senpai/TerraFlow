"use client";
import { useState, useRef, useEffect } from "react";
import { Settings, X, Moon, Bell, Shield, Globe, ExternalLink } from "lucide-react";
import { REFERENCE_VAULT_PUBKEY } from "@/lib/constants";

interface ToggleProps { label: string; desc: string; icon: React.ElementType; enabled: boolean; onToggle: () => void }

function Toggle({ label, desc, icon: Icon, enabled, onToggle }: ToggleProps) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#252C37] transition-colors text-left">
      <div className="w-8 h-8 rounded-lg bg-[#252C37] flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-[#8F98A3]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[#E8ECF0]">{label}</p>
        <p className="text-xs text-[#4A5568] mt-0.5">{desc}</p>
      </div>
      <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${enabled ? "bg-[#F8C61E]" : "bg-[#2A3340]"}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} />
      </div>
    </button>
  );
}

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-[#4A5568] hover:text-[#8F98A3] hover:bg-[#1B222B] transition-colors"
      >
        <Settings className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-72 bg-[#1B222B] border border-[#2A3340] rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A3340]">
            <h3 className="font-display font-semibold text-sm text-[#E8ECF0]">Settings</h3>
            <button onClick={() => setOpen(false)} className="text-[#4A5568] hover:text-[#8F98A3]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#2A3340]/50">
            <Toggle label="Dark Mode" desc="Bloomberg terminal theme" icon={Moon} enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            <Toggle label="Notifications" desc="Rebalance and yield alerts" icon={Bell} enabled={notifications} onToggle={() => setNotifications(!notifications)} />
            <Toggle label="Auto-Rebalance" desc="AI engine manages allocation" icon={Shield} enabled={autoRebalance} onToggle={() => setAutoRebalance(!autoRebalance)} />
          </div>

          <div className="border-t border-[#2A3340] px-4 py-3 space-y-2">
            <p className="text-xs text-[#4A5568] font-mono">Network</p>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-[#28C76F]" />
              <span className="text-xs text-[#E8ECF0]">Solana Mainnet</span>
            </div>
            <a
              href={`https://solscan.io/account/${REFERENCE_VAULT_PUBKEY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#F8C61E] hover:underline mt-1"
            >
              View vault on Solscan <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="border-t border-[#2A3340] px-4 py-2.5">
            <p className="text-xs text-center text-[#4A5568]">TerraFlow v0.1 · Built on Ranger Earn</p>
          </div>
        </div>
      )}
    </div>
  );
}
