"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { yieldHistory } from "@/lib/mockData";

interface YieldChartProps {
  showAll?: boolean;
  /** Live daily APY data from Ranger API */
  liveData?: { date: string; apy: number }[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B222B] border border-[#2A3340] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-[#8F98A3] text-xs mb-2 font-mono">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-4">
            <span className="text-xs text-[#8F98A3] capitalize">{p.name}</span>
            <span className="font-mono text-xs font-semibold" style={{ color: p.color }}>{typeof p.value === "number" ? p.value.toFixed(2) : p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function YieldChart({ showAll = false, liveData }: YieldChartProps) {
  // Use live data if provided, otherwise fall back to mock
  if (liveData && liveData.length > 0) {
    // Show last 90 days, sampled every 3 days for readability
    const recent = liveData.slice(-90).filter((_, i) => i % 3 === 0);
    const apyValues = recent.map(d => d.apy);
    const minApy = Math.max(0, Math.floor(Math.min(...apyValues) - 1));
    const maxApy = Math.ceil(Math.max(...apyValues) + 1);

    return (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={recent} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gLive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F8C61E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F8C61E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3340" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#4A5568", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: string) => v.slice(5)} // "2026-01-15" → "01-15"
          />
          <YAxis
            tick={{ fill: "#4A5568", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
            domain={[minApy, maxApy]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="apy"
            name="Daily APY"
            stroke="#F8C61E"
            strokeWidth={2}
            fill="url(#gLive)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Fallback: mock sector data
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={yieldHistory} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="gHousing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8C61E" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#F8C61E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gTrade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#28C76F" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#28C76F" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gCrypto" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7B6FF0" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#7B6FF0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gBlended" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8C61E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#F8C61E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A3340" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: "#4A5568", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#4A5568", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} domain={[6, 22]} />
        <Tooltip content={<CustomTooltip />} />
        {showAll ? (
          <>
            <Area type="monotone" dataKey="housing" name="Housing" stroke="#F8C61E" strokeWidth={1.5} fill="url(#gHousing)" dot={false} />
            <Area type="monotone" dataKey="trade" name="Trade" stroke="#28C76F" strokeWidth={1.5} fill="url(#gTrade)" dot={false} />
            <Area type="monotone" dataKey="crypto" name="Crypto" stroke="#7B6FF0" strokeWidth={1.5} fill="url(#gCrypto)" dot={false} />
          </>
        ) : (
          <Area type="monotone" dataKey="blended" name="Blended APY" stroke="#F8C61E" strokeWidth={2} fill="url(#gBlended)" dot={false} />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
