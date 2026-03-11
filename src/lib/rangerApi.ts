/**
 * Typed REST wrapper for the Ranger Earn API (api.voltr.xyz)
 * Docs: https://docs.ranger.finance/developers/api-overview
 *
 * All transaction endpoints return unsigned serialized txns (base58).
 * The client deserializes, signs with wallet, and broadcasts.
 */

import { RANGER_API_BASE } from "./constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VaultInfo {
  pubkey: string;
  name: string;
  description: string;
  assetMint: string;
  totalAssets: number;         // in base units (lamports / USDC micro)
  totalAssetsUsd: number;
  apy: number;                 // blended APY (%)
  tvl: number;
  maxCap: number;
  fees: {
    issuance: number;          // bps
    redemption: number;        // bps
    managerManagement: number; // bps annualized
    managerPerformance: number;// bps
    adminManagement: number;
    adminPerformance: number;
  };
  sharePrice: number;          // assets per LP token
  strategies: VaultStrategy[];
}

export interface VaultStrategy {
  pubkey: string;
  adaptorProgram: string;
  totalValue: number;
  allocationPct: number;
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
  transaction: string; // base58 serialized versioned transaction
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${RANGER_API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 30 }, // 30s cache in Next.js
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

/** Full vault info — config, APY, strategies, fees */
export async function getVault(vaultPubkey: string): Promise<VaultInfo> {
  return get<VaultInfo>(`/vault/${vaultPubkey}`);
}

/** Share price at a given timestamp (unix seconds). Omit ts for current. */
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

/** User's vault position in underlying assets */
export async function getUserBalance(
  vaultPubkey: string,
  userPubkey: string
): Promise<UserBalance> {
  return get(`/vault/${vaultPubkey}/user/${userPubkey}/balance`);
}

/** Pending withdrawal request, if any */
export async function getPendingWithdrawal(
  vaultPubkey: string,
  userPubkey: string
): Promise<PendingWithdrawal | null> {
  try {
    return await get(`/vault/${vaultPubkey}/user/${userPubkey}/pending-withdrawal`);
  } catch {
    return null;
  }
}

// ─── Transaction Builders (return unsigned txns) ──────────────────────────────

/** Build a deposit transaction. Returns base58 unsigned versioned tx. */
export async function buildDepositTx(
  vaultPubkey: string,
  userPubkey: string,
  lamportAmount: number
): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/deposit`, {
    userPubkey,
    lamportAmount,
  });
}

/** Build a withdrawal request transaction */
export async function buildRequestWithdrawTx(
  vaultPubkey: string,
  userPubkey: string,
  lamportAmount: number,
  isWithdrawAll = false
): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/request-withdrawal`, {
    userPubkey,
    lamportAmount,
    isWithdrawAll,
  });
}

/** Build the execute-withdrawal transaction (after waiting period) */
export async function buildWithdrawTx(
  vaultPubkey: string,
  userPubkey: string
): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/withdraw`, { userPubkey });
}

/** Cancel a pending withdrawal */
export async function buildCancelWithdrawTx(
  vaultPubkey: string,
  userPubkey: string
): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/cancel-withdrawal`, { userPubkey });
}

/** Direct withdraw — no waiting period (if vault configured for it) */
export async function buildDirectWithdrawTx(
  vaultPubkey: string,
  userPubkey: string,
  lamportAmount: number,
  isWithdrawAll = false
): Promise<UnsignedTx> {
  return post(`/vault/${vaultPubkey}/direct-withdraw`, {
    userPubkey,
    lamportAmount,
    isWithdrawAll,
  });
}
