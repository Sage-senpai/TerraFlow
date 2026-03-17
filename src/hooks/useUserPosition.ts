"use client";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppMode } from "@/contexts/AppModeContext";
import { getUserBalance, getPendingWithdrawal } from "@/lib/rangerApi";
import { TERRAFLOW_VAULT_PUBKEY, REFERENCE_VAULT_PUBKEY } from "@/lib/constants";

export interface UserPosition {
  /** Total USDC value of user's vault position */
  balance: number;
  /** LP token balance */
  lpBalance: number;
  /** Estimated deposit principal */
  deposited: number;
  /** Estimated earnings */
  earnings: number;
  /** Pending withdrawal amount (if any) */
  pendingWithdrawal: number | null;
  /** Whether data is loading */
  isLoading: boolean;
  /** Error message */
  error: string | null;
  /** Refresh function */
  refresh: () => void;
}

export function useUserPosition(): UserPosition {
  const { publicKey, connected } = useWallet();
  const { isDemo, demoPortfolio } = useAppMode();
  const [position, setPosition] = useState<UserPosition>({
    balance: 0,
    lpBalance: 0,
    deposited: 0,
    earnings: 0,
    pendingWithdrawal: null,
    isLoading: false,
    error: null,
    refresh: () => {},
  });

  const fetchPosition = useCallback(async () => {
    if (!connected || !publicKey || isDemo) return;

    setPosition(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const vaultPk = TERRAFLOW_VAULT_PUBKEY
        ? TERRAFLOW_VAULT_PUBKEY.toBase58()
        : REFERENCE_VAULT_PUBKEY;

      const [balData, pendingData] = await Promise.all([
        getUserBalance(vaultPk, publicKey.toBase58()),
        getPendingWithdrawal(vaultPk, publicKey.toBase58()),
      ]);

      const balance = balData.assetBalanceUsd ?? (balData.assetBalance / 1_000_000);
      const lpBalance = balData.lpBalance / 1_000_000;

      setPosition({
        balance,
        lpBalance,
        deposited: balance * 0.85, // Estimate — real app would track from deposit history
        earnings: balance * 0.15,
        pendingWithdrawal: pendingData ? pendingData.lpAmount / 1_000_000 : null,
        isLoading: false,
        error: null,
        refresh: fetchPosition,
      });
    } catch (err) {
      setPosition(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch position",
        refresh: fetchPosition,
      }));
    }
  }, [connected, publicKey, isDemo]);

  // Return demo data when in demo mode
  useEffect(() => {
    if (isDemo) {
      setPosition({
        balance: demoPortfolio.totalValue,
        lpBalance: demoPortfolio.totalValue * 0.98, // simulated LP ratio
        deposited: demoPortfolio.deposited,
        earnings: demoPortfolio.earnings,
        pendingWithdrawal: null,
        isLoading: false,
        error: null,
        refresh: () => {},
      });
    }
  }, [isDemo, demoPortfolio]);

  // Fetch live data when wallet connected
  useEffect(() => {
    if (!isDemo && connected && publicKey) {
      fetchPosition();
      const interval = setInterval(fetchPosition, 30_000);
      return () => clearInterval(interval);
    }
  }, [isDemo, connected, publicKey, fetchPosition]);

  return position;
}
