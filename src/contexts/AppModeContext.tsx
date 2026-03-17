"use client";
import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type AppMode = "demo" | "live" | "admin";

export interface DemoPortfolio {
  deposited: number;
  earnings: number;
  totalValue: number;
  deposits: DemoTx[];
  withdrawals: DemoTx[];
}

export interface DemoTx {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  timestamp: Date;
  strategy: string;
}

interface AppModeContextValue {
  mode: AppMode;
  isDemo: boolean;
  isLive: boolean;
  isAdmin: boolean;
  forceDemo: boolean;
  setForceDemo: (v: boolean) => void;
  demoPortfolio: DemoPortfolio;
  demoDeposit: (amount: number, strategy: string) => void;
  demoWithdraw: (amount: number) => void;
}

// ─── Admin / Manager pubkeys from env ────────────────────────────────────────

const ADMIN_PUBKEY = process.env.NEXT_PUBLIC_ADMIN_PUBKEY || "";
const MANAGER_PUBKEY = process.env.NEXT_PUBLIC_MANAGER_PUBKEY || "";

// ─── Default demo portfolio ─────────────────────────────────────────────────

const DEFAULT_DEMO: DemoPortfolio = {
  deposited: 42000,
  earnings: 6140,
  totalValue: 48140,
  deposits: [
    { id: "demo-1", type: "deposit", amount: 31500, timestamp: new Date(Date.now() - 45 * 86400000), strategy: "balanced" },
    { id: "demo-2", type: "deposit", amount: 5000, timestamp: new Date(Date.now() - 7 * 86400000), strategy: "balanced" },
    { id: "demo-3", type: "deposit", amount: 5500, timestamp: new Date(Date.now() - 2 * 86400000), strategy: "growth" },
  ],
  withdrawals: [],
};

// ─── Context ────────────────────────────────────────────────────────────────

const AppModeContext = createContext<AppModeContextValue | null>(null);

export function AppModeProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet();
  const [forceDemo, setForceDemo] = useState(false);
  const [demoPortfolio, setDemoPortfolio] = useState<DemoPortfolio>(DEFAULT_DEMO);

  // Accrue simulated earnings over time
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoPortfolio(prev => {
        const dailyRate = 0.142 / 365; // ~14.2% APY
        const newEarnings = prev.totalValue * dailyRate / 24; // hourly tick
        return {
          ...prev,
          earnings: prev.earnings + newEarnings,
          totalValue: prev.deposited + prev.earnings + newEarnings,
        };
      });
    }, 60_000); // tick every minute
    return () => clearInterval(interval);
  }, []);

  // Detect mode
  const walletAddr = publicKey?.toBase58() ?? "";
  const isAdminWallet = walletAddr !== "" && (walletAddr === ADMIN_PUBKEY || walletAddr === MANAGER_PUBKEY);

  const mode: AppMode = useMemo(() => {
    if (forceDemo) return "demo";
    if (!connected) return "demo";
    if (isAdminWallet) return "admin";
    return "live";
  }, [forceDemo, connected, isAdminWallet]);

  const demoDeposit = useCallback((amount: number, strategy: string) => {
    setDemoPortfolio(prev => ({
      ...prev,
      deposited: prev.deposited + amount,
      totalValue: prev.totalValue + amount,
      deposits: [
        { id: `demo-${Date.now()}`, type: "deposit", amount, timestamp: new Date(), strategy },
        ...prev.deposits,
      ],
    }));
  }, []);

  const demoWithdraw = useCallback((amount: number) => {
    setDemoPortfolio(prev => {
      const withdrawable = prev.totalValue;
      const actual = Math.min(amount, withdrawable);
      const earningsReduction = Math.min(prev.earnings, actual);
      const depositReduction = actual - earningsReduction;
      return {
        ...prev,
        deposited: prev.deposited - depositReduction,
        earnings: prev.earnings - earningsReduction,
        totalValue: prev.totalValue - actual,
        withdrawals: [
          { id: `demo-w-${Date.now()}`, type: "withdrawal", amount: actual, timestamp: new Date(), strategy: "" },
          ...prev.withdrawals,
        ],
      };
    });
  }, []);

  const value = useMemo<AppModeContextValue>(() => ({
    mode,
    isDemo: mode === "demo",
    isLive: mode === "live",
    isAdmin: mode === "admin",
    forceDemo,
    setForceDemo,
    demoPortfolio,
    demoDeposit,
    demoWithdraw,
  }), [mode, forceDemo, demoPortfolio, demoDeposit, demoWithdraw]);

  return (
    <AppModeContext.Provider value={value}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const ctx = useContext(AppModeContext);
  if (!ctx) throw new Error("useAppMode must be used within AppModeProvider");
  return ctx;
}
