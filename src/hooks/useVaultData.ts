"use client";
import { useEffect, useState, useCallback } from "react";
import { getVault, RangerVault, RangerAllocation } from "@/lib/rangerApi";
import { TERRAFLOW_VAULT_PUBKEY, REFERENCE_VAULT_PUBKEY } from "@/lib/constants";

// ─── TerraFlow sector mapping ─────────────────────────────────────────────────
// Maps real Ranger allocations (orgName) → TerraFlow sectors
// Kamino = Crypto, Drift = Trade, Save/Project0 = Housing (RWA bridge)

export interface SectorAllocation {
  sector: string;
  pct: number;
  value: number;
  apy: number;
  color: string;
  description: string;
  protocols: string[];
}

export interface TerraFlowVaultData {
  totalValue: number;
  apy: { oneDay: number; sevenDays: number; thirtyDays: number; allTime: number };
  sharePrice: number;
  fees: { performance: number; management: number; issuance: number; redemption: number };
  sectors: SectorAllocation[];
  dailyDates: string[];
  dailyApy: number[];
  dailyTvl: number[];
  vaultPubkey: string;
  vaultName: string;
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
  refresh: () => void;
}

function mapAllocationsToSectors(allocations: RangerAllocation[]): SectorAllocation[] {
  const sectorMap: Record<string, { value: number; protocols: Set<string> }> = {
    "Stable Yield": { value: 0, protocols: new Set() },
    "Active Trading": { value: 0, protocols: new Set() },
    "DeFi Yield": { value: 0, protocols: new Set() },
  };

  for (const a of allocations) {
    const org = a.orgName.toLowerCase();
    if (org.includes("kamino")) {
      sectorMap["DeFi Yield"].value += a.positionValue;
      sectorMap["DeFi Yield"].protocols.add(`${a.orgName} ${a.strategyDescription}`);
    } else if (org.includes("drift")) {
      sectorMap["Active Trading"].value += a.positionValue;
      sectorMap["Active Trading"].protocols.add(`${a.orgName} ${a.strategyDescription}`);
    } else {
      // Save, Project 0, Jupiter → Stable Yield (lending)
      sectorMap["Stable Yield"].value += a.positionValue;
      sectorMap["Stable Yield"].protocols.add(`${a.orgName} ${a.strategyDescription}`);
    }
  }

  const total = Object.values(sectorMap).reduce((s, v) => s + v.value, 0) || 1;
  const meta: Record<string, { color: string; description: string }> = {
    "Stable Yield":    { color: "#F8C61E", description: "Drift Earn + Jupiter Lend" },
    "Active Trading":  { color: "#28C76F", description: "Drift delta-neutral funding rate" },
    "DeFi Yield":      { color: "#7B6FF0", description: "Kamino multi-market lending" },
  };

  return Object.entries(sectorMap).map(([sector, { value, protocols }]) => ({
    sector,
    pct: Math.round((value / total) * 100),
    value: value / 1_000_000,
    apy: 0,
    color: meta[sector].color,
    description: meta[sector].description,
    protocols: Array.from(protocols),
  }));
}

export function useVaultData(): TerraFlowVaultData {
  const [data, setData] = useState<TerraFlowVaultData>({
    totalValue: 0,
    apy: { oneDay: 0, sevenDays: 0, thirtyDays: 0, allTime: 0 },
    sharePrice: 1,
    fees: { performance: 0, management: 0, issuance: 0, redemption: 0 },
    sectors: [],
    dailyDates: [],
    dailyApy: [],
    dailyTvl: [],
    vaultPubkey: "",
    vaultName: "",
    isLoading: true,
    isLive: false,
    error: null,
    refresh: () => {},
  });

  const fetchData = useCallback(async () => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const vaultPk = TERRAFLOW_VAULT_PUBKEY
        ? TERRAFLOW_VAULT_PUBKEY.toBase58()
        : REFERENCE_VAULT_PUBKEY;

      const vault: RangerVault = await getVault(vaultPk);
      const sectors = mapAllocationsToSectors(vault.allocations);

      // Distribute APY across sectors with weighting
      const baseApy = vault.apy.thirtyDays;
      const weights: Record<string, number> = { "Stable Yield": 1.0, "Active Trading": 2.5, "DeFi Yield": 1.4 };
      const totalWeight = sectors.reduce((s, sec) => s + (sec.pct / 100) * (weights[sec.sector] || 1), 0) || 1;
      for (const sec of sectors) {
        sec.apy = Math.round(baseApy * ((weights[sec.sector] || 1) / totalWeight) * 10) / 10;
      }

      setData({
        totalValue: vault.totalValue / 1_000_000,
        apy: vault.apy,
        sharePrice: vault.totalValue / (vault.maxCap || vault.totalValue),
        fees: {
          performance: vault.feeConfiguration.performanceFee,
          management: vault.feeConfiguration.managementFee,
          issuance: vault.feeConfiguration.issuanceFee,
          redemption: vault.feeConfiguration.redemptionFee,
        },
        sectors,
        dailyDates: vault.dailyStats.dateLabels,
        dailyApy: vault.dailyStats.apyData,
        dailyTvl: vault.dailyStats.tvlData.map(v => v / 1_000_000),
        vaultPubkey: vault.pubkey,
        vaultName: vault.name,
        isLoading: false,
        isLive: true,
        error: null,
        refresh: fetchData,
      });
    } catch (err) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        isLive: false,
        error: err instanceof Error ? err.message : "Failed to fetch vault data",
        refresh: fetchData,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return data;
}
