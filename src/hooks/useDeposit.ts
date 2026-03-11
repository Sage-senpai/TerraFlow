"use client";
import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { buildDepositTx } from "@/lib/rangerApi";
import { signAndSendRangerTx, usdcToLamports } from "@/lib/vaultHelpers";
import { TERRAFLOW_VAULT_PUBKEY } from "@/lib/constants";
import { VersionedTransaction } from "@solana/web3.js";

type DepositStatus = "idle" | "building" | "signing" | "sending" | "success" | "error";

export function useDeposit() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [status, setStatus] = useState<DepositStatus>("idle");
  const [txSig, setTxSig] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deposit = useCallback(async (usdcAmount: number) => {
    if (!publicKey || !signTransaction) {
      setError("Wallet not connected");
      return;
    }
    if (!TERRAFLOW_VAULT_PUBKEY) {
      // Demo mode — simulate success
      setStatus("success");
      setTxSig("demo-mode-no-vault-deployed");
      return;
    }

    setStatus("building");
    setError(null);
    setTxSig(null);

    try {
      const lamports = usdcToLamports(usdcAmount);
      const { transaction: unsignedBase58 } = await buildDepositTx(
        TERRAFLOW_VAULT_PUBKEY.toBase58(),
        publicKey.toBase58(),
        lamports
      );

      setStatus("signing");
      const sig = await signAndSendRangerTx(
        unsignedBase58,
        connection,
        signTransaction as (tx: VersionedTransaction) => Promise<VersionedTransaction>
      );
      setTxSig(sig);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deposit failed");
      setStatus("error");
    }
  }, [publicKey, signTransaction, connection]);

  const reset = useCallback(() => {
    setStatus("idle");
    setTxSig(null);
    setError(null);
  }, []);

  return { deposit, status, txSig, error, reset };
}
