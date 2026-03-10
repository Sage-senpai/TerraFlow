import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { activityLog } from "@/lib/mockData";
import { ArrowDownToLine, ArrowLeftRight, Sparkles, Shield } from "lucide-react";

const typeConfig = {
  deposit: { icon: ArrowDownToLine, color: "#28C76F", bg: "rgba(40,199,111,0.1)", badge: "positive" as const, label: "Deposit" },
  rebalance: { icon: ArrowLeftRight, color: "#F8C61E", bg: "rgba(248,198,30,0.1)", badge: "sunburst" as const, label: "Rebalance" },
  yield: { icon: Sparkles, color: "#7B6FF0", bg: "rgba(123,111,240,0.1)", badge: "crypto" as const, label: "Yield" },
  hedge: { icon: Shield, color: "#FF9F43", bg: "rgba(255,159,67,0.1)", badge: "warning" as const, label: "Hedge" },
};

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Activity</h1>
        <p className="text-sm text-[#8F98A3] mt-0.5">Full transaction and rebalance history</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-[#E8ECF0]">Transaction Log</h2>
            <div className="flex gap-2">
              {["All", "Deposits", "Yields", "Rebalances"].map(f => (
                <button
                  key={f}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    f === "All"
                      ? "bg-[rgba(248,198,30,0.1)] text-[#F8C61E] border border-[rgba(248,198,30,0.2)]"
                      : "text-[#8F98A3] hover:text-[#E8ECF0] hover:bg-[#252C37]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          <div className="divide-y divide-[#2A3340]">
            {activityLog.map((item) => {
              const cfg = typeConfig[item.type as keyof typeof typeConfig];
              const Icon = cfg.icon;
              return (
                <div key={item.id} className="flex items-center gap-4 py-4 hover:bg-[#252C37]/50 transition-colors px-2 rounded-xl -mx-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#E8ECF0]">{item.desc}</p>
                    <p className="text-xs text-[#4A5568] mt-0.5 font-mono">{item.time}</p>
                  </div>
                  <Badge variant={cfg.badge}>{cfg.label}</Badge>
                  {item.amount !== "—" ? (
                    <span className="font-mono text-sm font-semibold text-[#28C76F] w-24 text-right">{item.amount}</span>
                  ) : (
                    <span className="text-[#4A5568] text-sm w-24 text-right">—</span>
                  )}
                  <Badge variant={item.status === "confirmed" ? "positive" : item.status === "executed" ? "sunburst" : "warning"}>
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
