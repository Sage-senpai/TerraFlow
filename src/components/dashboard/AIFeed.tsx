"use client";
import { aiFeed } from "@/lib/mockData";
import { Zap, TrendingUp, Shield, ArrowLeftRight } from "lucide-react";

const typeConfig = {
  rebalance: { icon: ArrowLeftRight, color: "#F8C61E", bg: "rgba(248,198,30,0.1)", label: "Rebalance" },
  signal: { icon: TrendingUp, color: "#28C76F", bg: "rgba(40,199,111,0.1)", label: "Signal" },
  hedge: { icon: Shield, color: "#7B6FF0", bg: "rgba(123,111,240,0.1)", label: "Hedge" },
};

export function AIFeed({ limit = 5 }: { limit?: number }) {
  return (
    <div className="space-y-2">
      {aiFeed.slice(0, limit).map((item) => {
        const cfg = typeConfig[item.type as keyof typeof typeConfig];
        const Icon = cfg.icon;
        return (
          <div
            key={item.id}
            className="flex gap-3 p-3 rounded-xl bg-[#252C37] border border-[#2A3340] hover:border-[#2A3340]/80 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: cfg.bg }}
            >
              <Icon className="w-4 h-4" style={{ color: cfg.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-[#E8ECF0] leading-snug">{item.title}</p>
                <span className="text-xs text-[#4A5568] font-mono flex-shrink-0">{item.time}</span>
              </div>
              <p className="text-xs text-[#8F98A3] mt-0.5">{item.body}</p>
              <p className="text-xs text-[#4A5568] mt-1 italic">{item.reason}</p>
              <p className="text-xs font-mono mt-1.5" style={{ color: cfg.color }}>{item.impact}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
