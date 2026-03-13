/**
 * Typed REST wrapper for the Ranger Earn API (api.voltr.xyz)
 * Matches real API response shapes from mainnet vaults.
 */

import { RANGER_API_BASE } from "./constants";

// ─── Real API Response Types ──────────────────────────────────────────────────

export interface RangerVaultResponse {
  success: boolean;
  vault: RangerVault;
}

export interface RangerVault {
  pubkey: string;
  name: string;
  description: string;
  externalUri: string;
  icon: string;
  totalValue: number;           // micro-units (6 decimals for USDC)
  withdrawalWaitingPeriod: number;
  maxCap: number;
  riskDisclaimer: string;
  feeConfiguration: {
    performanceFee: number;
    managementFee: number;
    issuanceFee: number;
    redemptionFee: number;
  };
  org: {
    name: string;
    description: string;
    web: string;
    logo: string;
    social: string;
  };
  token: {
    name: string;
    decimals: number;
    icon: string;
    mint: string;
    programId: string;
    pythFeedId: string;
    price: number;
  };
  apy: {
    oneDay: number;
    sevenDays: number;
    thirtyDays: number;
    allTime: number;
  };
  dailyStats: {
    dateLabels: string[];
    apyData: number[];
    tvlData: number[];
    lpData: number[];
  };
  allocations: RangerAllocation[];
  integrations: RangerIntegration[];
  strategies: string[];
}

export interface RangerAllocation {
  orgName: string;
  strategyDescription: string;
  tokenName: string;
  positionValue: number;         // micro-units
}

export interface RangerIntegration {
  adaptorPk: string;
  whitelisted: boolean;
  feature: string;
}

export interface UserBalance {
  lpBalance: number;
  assetBalance: number;
  assetBalanceUsd: number;
}

export interface PendingWithdrawal {
  lpAmount: number;
  requestedAt: number;
  availableAt: number;
}

export interface UnsignedTx {
  transaction: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${RANGER_API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Ranger API ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${RANGER_API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Ranger API POST ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Vault Queries ────────────────────────────────────────────────────────────

/** Full vault info from Ranger API */
export async function getVault(vaultPubkey: string): Promise<RangerVault> {
  const res = await get<RangerVaultResponse>(`/vault/${vaultPubkey}`);
  return res.vault;
}

/** Fetch all vaults */
export async function getAllVaults(): Promise<RangerVault[]> {
  const res = await get<{ success: boolean; vaults: RangerVault[] }>("/vaults");
  return res.vaults ?? [];
}

/** Share price at a given timestamp */
export async function getSharePrice(vaultPubkey: string, ts?: number): Promise<{ sharePrice: number }> {
  const q = ts ? `?ts=${ts}` : "";
  return get(`/vault/${vaultPubkey}/share-price${q}`);
}

/** Fees earned in a time range */
export async function getFeesEarned(
  vaultPubkey: string,
  startTs: number,
  endTs: number
): Promise<{ performanceFees: number; managementFees: number }> {
  return get(`/vault/${vaultPubkey}/fee-earned?startTs=${startTs}&endTs=${endTs}`);
}

// ─── User Queries ─────────────────────────────────────────────────────────────

export async function getUserBalance(vaultPubkey: string, userPubkey: string): Promise<UserBalance> {
  return get(`/vault/${vaultPubkey}/user/${userPubkey}/balance`);
}

export async function getPendingWithdrawal(vaultPubkey: string, userPubkey: string): Promise<PendingWithdrawal | null> {
  try {
    return await get(`/vault/${vaultPubkey}/user/${userPubkey}/pending-withdrawal`);
  } catch {
    return null;
  }
}

// ─── Transaction Builders (return unsigned txns) ──────────────────────────────

export async function buildDepositTx(vaultPubkey: string, userPubkey: string, lamportAmount: number): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/deposit`, { userPubkey, lamportAmount });
}

export async function buildRequestWithdrawTx(vaultPubkey: string, userPubkey: string, lamportAmount: number, isWithdrawAll = false): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/request-withdrawal`, { userPubkey, lamportAmount, isWithdrawAll });
}

export async function buildWithdrawTx(vaultPubkey: string, userPubkey: string): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/withdraw`, { userPubkey });
}

export async function buildCancelWithdrawTx(vaultPubkey: string, userPubkey: string): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/cancel-withdrawal`, { userPubkey });
}

export async function buildDirectWithdrawTx(vaultPubkey: string, userPubkey: string, lamportAmount: number, isWithdrawAll = false): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/direct-withdraw`, { userPubkey, lamportAmount, isWithdrawAll });
}
