"use client";
import { useEffect, useState, useCallback } from "react";
import { getVault, getUserBalance, VaultInfo, UserBalance } from "@/lib/rangerApi";
import { TERRAFLOW_VAULT_PUBKEY } from "@/lib/constants";
import { vaultStats, allocations } from "@/lib/mockData";

export interface TerraFlowVaultData {
  // Vault-level
  totalValue: number;
  totalValueUsd: number;
  apy: number;
  tvl: number;
  sharePrice: number;
  issuanceFee: number;
  redemptionFee: number;
  // User-level
  userBalance: number;
  userBalanceUsd: number;
  // State
  isLoading: boolean;
  isLive: boolean; // true = real data, false = mock fallback
  error: string | null;
  refresh: () => void;
}

const MOCK_DATA: TerraFlowVaultData = {
  totalValue: vaultStats.totalValue,
  totalValueUsd: vaultStats.totalValue,
  apy: vaultStats.apy,
  tvl: vaultStats.tvl,
  sharePrice: 1.184,
  issuanceFee: 10,
  redemptionFee: 10,
  userBalance: 43200,
  userBalanceUsd: 43200,
  isLoading: false,
  isLive: false,
  error: null,
  refresh: () => {},
};

export function useVaultData(userPubkey?: string): TerraFlowVaultData {
  const [data, setData] = useState<TerraFlowVaultData>({ ...MOCK_DATA, isLoading: true });

  const fetch = useCallback(async () => {
    if (!TERRAFLOW_VAULT_PUBKEY) {
      // No vault deployed yet — use mock data
      setData({ ...MOCK_DATA, isLoading: false });
      return;
    }

    setData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const vaultPubkey = TERRAFLOW_VAULT_PUBKEY.toBase58();
      const [vault, userBal] = await Promise.all([
        getVault(vaultPubkey),
        userPubkey ? getUserBalance(vaultPubkey, userPubkey) : Promise.resolve(null),
      ]);

      setData({
        totalValue: vault.totalAssetsUsd,
        totalValueUsd: vault.totalAssetsUsd,
        apy: vault.apy,
        tvl: vault.tvl,
        sharePrice: vault.sharePrice,
        issuanceFee: vault.fees.issuance,
        redemptionFee: vault.fees.redemption,
        userBalance: userBal?.assetBalance ?? 0,
        userBalanceUsd: userBal?.assetBalanceUsd ?? 0,
        isLoading: false,
        isLive: true,
        error: null,
        refresh: fetch,
      });
    } catch (err) {
      // Fall back to mock if API unavailable
      setData({
        ...MOCK_DATA,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch vault data",
        refresh: fetch,
      });
    }
  }, [userPubkey]);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 30_000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetch]);

  return data;
}
