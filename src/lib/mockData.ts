// ─── Mock Data (used when vault not yet deployed) ────────────────────────────
// Aligned with Drift side track hackathon requirements
// All sector names match real Drift/Kamino/Jupiter strategies

export const vaultStats = {
  totalValue: 43200,
  totalValueChange: 18.4,
  apy: 14.2,
  deposited: 36500,
  earnings: 6700,
  tvl: 284_500_000,
  users: 12843,
};

export const allocations = [
  { sector: "Stable Yield",    pct: 35, value: 15120, apy: 7,  color: "#F8C61E", description: "Drift Earn + Jupiter Lend" },
  { sector: "Active Trading",  pct: 35, value: 15120, apy: 22, color: "#28C76F", description: "Drift delta-neutral funding rate" },
  { sector: "DeFi Yield",      pct: 30, value: 12960, apy: 10, color: "#7B6FF0", description: "Kamino multi-market lending" },
];

export const aiFeed = [
  {
    id: 1,
    type: "rebalance",
    title: "AI Rebalance Executed",
    body: "Shifted 8% from DeFi Yield → Active Trading",
    reason: "Drift funding rate spiked to 32% APY on SOL-PERP",
    time: "2 min ago",
    impact: "+1.8% projected APY",
  },
  {
    id: 2,
    type: "signal",
    title: "Funding Rate Signal",
    body: "Drift SOL-PERP funding rate at +0.04%/hr",
    reason: "Open interest imbalance favoring longs — shorts earn premium",
    time: "18 min ago",
    impact: "Increasing Active Trading to 40%",
  },
  {
    id: 3,
    type: "hedge",
    title: "Basis Trade Opened",
    body: "Long spot SOL + short SOL-PERP on Drift",
    reason: "Annualized basis at 18.5% — above entry threshold",
    time: "1h ago",
    impact: "Delta-neutral: $4,200 deployed",
  },
  {
    id: 4,
    type: "rebalance",
    title: "Lending Rate Optimization",
    body: "Rotated from Jupiter Lend → Kamino JLP Market",
    reason: "Kamino JLP USDC rate increased to 8.2% from 5.1%",
    time: "3h ago",
    impact: "+0.6% APY improvement on DeFi Yield",
  },
  {
    id: 5,
    type: "signal",
    title: "Risk Check Passed",
    body: "All positions health factor > 1.5",
    reason: "No liquidation risk — portfolio within safe parameters",
    time: "5h ago",
    impact: "No action required",
  },
];

export const yieldHistory = [
  { date: "Jan", stableYield: 6.2, activeTrading: 18.5, defiYield: 8.1, blended: 11.2 },
  { date: "Feb", stableYield: 6.8, activeTrading: 22.3, defiYield: 9.5, blended: 13.0 },
  { date: "Mar", stableYield: 7.0, activeTrading: 24.1, defiYield: 8.7, blended: 13.6 },
  { date: "Apr", stableYield: 6.6, activeTrading: 19.8, defiYield: 9.0, blended: 12.1 },
  { date: "May", stableYield: 7.2, activeTrading: 28.4, defiYield: 8.8, blended: 15.1 },
  { date: "Jun", stableYield: 7.5, activeTrading: 21.3, defiYield: 9.1, blended: 13.0 },
  { date: "Jul", stableYield: 7.1, activeTrading: 26.0, defiYield: 10.3, blended: 14.6 },
  { date: "Aug", stableYield: 7.4, activeTrading: 20.2, defiYield: 9.1, blended: 12.5 },
  { date: "Sep", stableYield: 7.0, activeTrading: 25.5, defiYield: 8.9, blended: 14.1 },
  { date: "Oct", stableYield: 7.3, activeTrading: 23.4, defiYield: 9.0, blended: 13.5 },
  { date: "Nov", stableYield: 7.0, activeTrading: 19.8, defiYield: 10.2, blended: 12.6 },
  { date: "Dec", stableYield: 7.0, activeTrading: 22.0, defiYield: 9.0, blended: 13.0 },
];

export const portfolioPositions = [
  { sector: "Stable Yield",    allocated: 15120, earned: 1058, apy: 7,  change: 0.2, color: "#F8C61E" },
  { sector: "Active Trading",  allocated: 15120, earned: 3326, apy: 22, change: 1.1, color: "#28C76F" },
  { sector: "DeFi Yield",      allocated: 12960, earned: 1296, apy: 10, change: -0.3, color: "#7B6FF0" },
];

export const activityLog = [
  { id: 1, type: "deposit",    desc: "Deposited 5,000 USDC",                         time: "Mar 10, 2026 · 14:32", amount: "+$5,000", status: "confirmed" },
  { id: 2, type: "rebalance",  desc: "AI rebalanced: DeFi Yield → Active Trading +8%", time: "Mar 10, 2026 · 14:34", amount: "—", status: "executed" },
  { id: 3, type: "yield",      desc: "Drift funding rate harvest",                   time: "Mar 10, 2026 · 00:00", amount: "+$12.38", status: "confirmed" },
  { id: 4, type: "yield",      desc: "Kamino lending yield accrued",                 time: "Mar 9, 2026 · 00:00",  amount: "+$3.55", status: "confirmed" },
  { id: 5, type: "hedge",      desc: "Basis trade opened — Drift SOL-PERP",          time: "Mar 9, 2026 · 10:14",  amount: "—", status: "active" },
  { id: 6, type: "yield",      desc: "Jupiter Lend yield accrued",                   time: "Mar 8, 2026 · 00:00",  amount: "+$2.89", status: "confirmed" },
  { id: 7, type: "rebalance",  desc: "AI rebalanced: rate differential optimization", time: "Mar 8, 2026 · 09:00",  amount: "—", status: "executed" },
  { id: 8, type: "deposit",    desc: "Deposited 31,500 USDC",                        time: "Feb 1, 2026 · 11:05",  amount: "+$31,500", status: "confirmed" },
];
