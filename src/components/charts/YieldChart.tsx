"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { yieldHistory } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B222B] border border-[#2A3340] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-[#8F98A3] text-xs mb-2 font-mono">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-4">
            <span className="text-xs text-[#8F98A3] capitalize">{p.name}</span>
            <span className="font-mono text-xs font-semibold" style={{ color: p.color }}>{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function YieldChart({ showAll = false }: { showAll?: boolean }) {
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
        <YAxis tick={{ fill: "#4A5568", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[6, 22]} />
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
