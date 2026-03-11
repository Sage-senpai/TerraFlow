import { PublicKey } from "@solana/web3.js";

// Ranger Earn Program IDs (Mainnet)
export const VAULT_PROGRAM_ID = new PublicKey("vVoLTRjQmtFpiYoegx285Ze4gsLJ8ZxgFKVcuvmG1a8");
export const LENDING_ADAPTOR_PROGRAM_ID = new PublicKey("aVoLTRCRt3NnnchvLYH6rMYehJHwM5m45RmLBZq7PGz");
export const DRIFT_ADAPTOR_PROGRAM_ID = new PublicKey("EBN93eXs5fHGBABuajQqdsKRkCgaqtJa8vEFD6vKXiP");
export const KAMINO_ADAPTOR_PROGRAM_ID = new PublicKey("to6Eti9CsC5FGkAtqiPphvKD2hiQiLsS8zWiDBqBPKR");

// TerraFlow Vault (set from env — deploy vault first with init script)
export const TERRAFLOW_VAULT_PUBKEY = process.env.NEXT_PUBLIC_VAULT_PUBKEY
  ? new PublicKey(process.env.NEXT_PUBLIC_VAULT_PUBKEY)
  : null;

// Ranger REST API
export const RANGER_API_BASE = "https://api.voltr.xyz";

// Solana
export const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

// USDC on Solana Mainnet
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
// SOL (wrapped)
export const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

// TerraFlow sector metadata (maps to Ranger strategies)
export const SECTOR_METADATA = {
  housing: {
    label: "Housing",
    description: "Tokenized rental income via Ondo Finance RWA rails",
    apy: 12,
    color: "#F8C61E",
    icon: "🏠",
    adaptor: "trustful", // off-chain RWA bridge
  },
  trade: {
    label: "Trade",
    description: "Invoice financing — short-duration commercial debt",
    apy: 18,
    color: "#28C76F",
    icon: "📦",
    adaptor: "lending", // Drift lending / Marginfi
  },
  crypto: {
    label: "Crypto",
    description: "Liquid staking optimization — mSOL/stSOL auto-compound",
    apy: 9,
    color: "#7B6FF0",
    icon: "🔷",
    adaptor: "kamino", // Kamino vault/lending
  },
} as const;

export type SectorKey = keyof typeof SECTOR_METADATA;
