"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, X, ArrowLeftRight, Sparkles, ArrowDownToLine, Shield } from "lucide-react";

const notifications = [
  { id: 1, type: "rebalance", icon: ArrowLeftRight, color: "#F8C61E", title: "Rebalance Executed", desc: "AI shifted 8% from DeFi Yield → Active Trading", time: "2 min ago", unread: true },
  { id: 2, type: "yield", icon: Sparkles, color: "#7B6FF0", title: "Funding Rate Harvested", desc: "+$42.18 from Drift SOL-PERP funding", time: "1 hr ago", unread: true },
  { id: 3, type: "deposit", icon: ArrowDownToLine, color: "#28C76F", title: "Deposit Confirmed", desc: "500 USDC deposited to Ranger vault", time: "3 hr ago", unread: false },
  { id: 4, type: "hedge", icon: Shield, color: "#FF9F43", title: "Basis Trade Opened", desc: "Long spot + short perp on Drift — delta neutral", time: "6 hr ago", unread: false },
  { id: 5, type: "rebalance", icon: ArrowLeftRight, color: "#F8C61E", title: "Rate Optimization", desc: "Rotated Jupiter Lend → Kamino JLP Market (+1.2% APY)", time: "12 hr ago", unread: false },
];

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread && !read.has(n.id)).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function markAllRead() {
    setRead(new Set(notifications.map(n => n.id)));
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-[#4A5568] hover:text-[#8F98A3] hover:bg-[#1B222B] transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F8C61E]" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-[#1B222B] border border-[#2A3340] rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A3340]">
            <h3 className="font-display font-semibold text-sm text-[#E8ECF0]">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-[#F8C61E] hover:underline">
                  Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-[#4A5568] hover:text-[#8F98A3]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(n => {
              const Icon = n.icon;
              const isUnread = n.unread && !read.has(n.id);
              return (
                <button
                  key={n.id}
                  onClick={() => setRead(prev => new Set(prev).add(n.id))}
                  className={`w-full text-left flex gap-3 px-4 py-3 hover:bg-[#252C37] transition-colors ${
                    isUnread ? "bg-[rgba(248,198,30,0.03)]" : ""
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${n.color}18` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: n.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-[#E8ECF0] truncate">{n.title}</p>
                      {isUnread && <div className="w-1.5 h-1.5 rounded-full bg-[#F8C61E] flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-[#8F98A3] mt-0.5 line-clamp-1">{n.desc}</p>
                    <p className="text-xs text-[#4A5568] mt-0.5 font-mono">{n.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t border-[#2A3340] px-4 py-2.5">
            <p className="text-xs text-center text-[#4A5568]">AI Engine activity log</p>
          </div>
        </div>
      )}
    </div>
  );
}
