/**
 * Client-side helpers for signing and broadcasting unsigned Ranger transactions.
 * Works with any @solana/wallet-adapter compatible wallet.
 */

import { Connection, VersionedTransaction } from "@solana/web3.js";

/**
 * Deserialize, sign, and send an unsigned base64 Ranger API transaction.
 * Returns the transaction signature.
 */
export async function signAndSendRangerTx(
  unsignedBase64: string,
  connection: Connection,
  signTransaction: (tx: VersionedTransaction) => Promise<VersionedTransaction>
): Promise<string> {
  const txBytes = Buffer.from(unsignedBase64, "base64");
  const tx = VersionedTransaction.deserialize(txBytes);
  const signed = await signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });
  await connection.confirmTransaction(sig, "confirmed");
  return sig;
}

/** Convert USDC amount (human) to lamports (micro-USDC, 6 decimals) */
export function usdcToLamports(amount: number): number {
  return Math.floor(amount * 1_000_000);
}

/** Convert lamports to USDC (human readable) */
export function lamportsToUsdc(lamports: number): number {
  return lamports / 1_000_000;
}

/** Format share price for display */
export function formatSharePrice(price: number): string {
  return price.toFixed(6);
}

/** Format APY */
export function formatApy(apy: number): string {
  return `${apy.toFixed(2)}%`;
}
