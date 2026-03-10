"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { allocations } from "@/lib/mockData";

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { apy: number; dollarValue: number } }> }) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div className="bg-[#1B222B] border border-[#2A3340] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-[#E8ECF0] font-display font-semibold text-sm">{d.name}</p>
        <p className="text-[#8F98A3] text-xs mt-1">Allocation: <span className="text-[#F8C61E] font-mono">{d.value}%</span></p>
        <p className="text-[#8F98A3] text-xs">APY: <span className="text-[#28C76F] font-mono">{d.payload.apy}%</span></p>
        <p className="text-[#8F98A3] text-xs">Value: <span className="text-[#E8ECF0] font-mono">${d.payload.dollarValue.toLocaleString()}</span></p>
      </div>
    );
  }
  return null;
};

export function AllocationChart() {
  const chartData = allocations.map(a => ({ name: a.sector, pct: a.pct, apy: a.apy, dollarValue: a.value }));

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-40 h-40 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={66}
              paddingAngle={3}
              dataKey="pct"
              strokeWidth={0}
            >
              {allocations.map((a, i) => (
                <Cell key={i} fill={a.color} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-xs text-[#8F98A3]">Blended</span>
          <span className="font-mono font-bold text-[#F8C61E] text-lg leading-tight">13.2%</span>
          <span className="font-mono text-xs text-[#8F98A3]">APY</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 flex-1">
        {allocations.map((a) => (
          <div key={a.sector} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#E8ECF0] font-medium">{a.sector}</span>
                <span className="font-mono text-xs text-[#8F98A3]">{a.pct}%</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-[#252C37] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${a.pct}%`, background: a.color, opacity: 0.8 }}
                />
              </div>
            </div>
            <span className="font-mono text-xs font-semibold" style={{ color: a.color }}>{a.apy}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
