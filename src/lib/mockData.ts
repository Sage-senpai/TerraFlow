export const vaultStats = {
  totalValue: 43200,
  totalValueChange: 18.4,
  apy: 18.4,
  deposited: 36500,
  earnings: 6700,
  tvl: 284_500_000,
  users: 12843,
};

export const allocations = [
  { sector: "Housing", pct: 40, value: 17280, apy: 12, color: "#F8C61E", description: "Tokenized rental income" },
  { sector: "Trade", pct: 30, value: 12960, apy: 18, color: "#28C76F", description: "Invoice financing" },
  { sector: "Crypto", pct: 30, value: 12960, apy: 9, color: "#7B6FF0", description: "Liquid staking optimization" },
];

export const aiFeed = [
  {
    id: 1,
    type: "rebalance",
    title: "AI Rebalance Executed",
    body: "Moved 5% from Crypto → Trade",
    reason: "Liquidity spread widening detected in trade invoices",
    time: "2 min ago",
    impact: "+0.4% projected APY",
  },
  {
    id: 2,
    type: "signal",
    title: "Macro Signal Detected",
    body: "Housing demand index +3.2%",
    reason: "Pyth oracle: rental yield spreads at 6-month high",
    time: "18 min ago",
    impact: "Increasing Housing allocation by 3%",
  },
  {
    id: 3,
    type: "hedge",
    title: "Hedge Position Opened",
    body: "Drift Protocol short — crypto hedge",
    reason: "Drawdown protection triggered at -5% threshold",
    time: "1h ago",
    impact: "Protecting $3,240 in Crypto exposure",
  },
  {
    id: 4,
    type: "rebalance",
    title: "Yield Optimization",
    body: "Rotated LST from stSOL → mSOL",
    reason: "mSOL validator APY increased to 9.8%",
    time: "3h ago",
    impact: "+0.2% APY improvement",
  },
  {
    id: 5,
    type: "signal",
    title: "Risk Alert Cleared",
    body: "Trade invoice default risk normalized",
    reason: "Portfolio diversification within acceptable range",
    time: "5h ago",
    impact: "No action required",
  },
];

export const yieldHistory = [
  { date: "Jan", housing: 11.2, trade: 16.8, crypto: 8.1, blended: 12.4 },
  { date: "Feb", housing: 11.8, trade: 17.2, crypto: 8.5, blended: 13.0 },
  { date: "Mar", housing: 12.0, trade: 17.5, crypto: 8.7, blended: 13.3 },
  { date: "Apr", housing: 11.6, trade: 18.1, crypto: 9.0, blended: 13.6 },
  { date: "May", housing: 12.2, trade: 17.9, crypto: 8.8, blended: 13.5 },
  { date: "Jun", housing: 12.5, trade: 18.3, crypto: 9.1, blended: 14.0 },
  { date: "Jul", housing: 12.1, trade: 18.0, crypto: 9.3, blended: 13.8 },
  { date: "Aug", housing: 12.4, trade: 18.2, crypto: 9.1, blended: 13.9 },
  { date: "Sep", housing: 12.0, trade: 18.5, crypto: 8.9, blended: 14.1 },
  { date: "Oct", housing: 12.3, trade: 18.4, crypto: 9.0, blended: 14.2 },
  { date: "Nov", housing: 12.0, trade: 17.8, crypto: 9.2, blended: 13.8 },
  { date: "Dec", housing: 12.0, trade: 18.0, crypto: 9.0, blended: 13.9 },
];

export const portfolioPositions = [
  { sector: "Housing", allocated: 17280, earned: 2074, apy: 12, change: 0.3, color: "#F8C61E" },
  { sector: "Trade", allocated: 12960, earned: 2333, apy: 18, change: 0.5, color: "#28C76F" },
  { sector: "Crypto", allocated: 12960, earned: 1166, apy: 9, change: -0.2, color: "#7B6FF0" },
];

export const activityLog = [
  { id: 1, type: "deposit", desc: "Deposited 5,000 USDC", time: "Mar 10, 2026 · 14:32", amount: "+$5,000", status: "confirmed" },
  { id: 2, type: "rebalance", desc: "AI rebalanced: Crypto → Trade +5%", time: "Mar 10, 2026 · 14:34", amount: "—", status: "executed" },
  { id: 3, type: "yield", desc: "Yield accrued — Housing sector", time: "Mar 10, 2026 · 00:00", amount: "+$5.72", status: "confirmed" },
  { id: 4, type: "yield", desc: "Yield accrued — Trade sector", time: "Mar 9, 2026 · 00:00", amount: "+$6.39", status: "confirmed" },
  { id: 5, type: "hedge", desc: "Hedge opened — Drift Protocol", time: "Mar 9, 2026 · 10:14", amount: "—", status: "active" },
  { id: 6, type: "yield", desc: "Yield accrued — Crypto sector", time: "Mar 8, 2026 · 00:00", amount: "+$3.21", status: "confirmed" },
  { id: 7, type: "rebalance", desc: "AI rebalanced: LST rotation", time: "Mar 8, 2026 · 09:00", amount: "—", status: "executed" },
  { id: 8, type: "deposit", desc: "Deposited 31,500 USDC", time: "Feb 1, 2026 · 11:05", amount: "+$31,500", status: "confirmed" },
];
