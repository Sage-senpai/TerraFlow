import { PublicKey } from "@solana/web3.js";

// ─── Ranger Earn Program IDs (Mainnet) ───────────────────────────────────────
export const VAULT_PROGRAM_ID = new PublicKey("vVoLTRjQmtFpiYoegx285Ze4gsLJ8ZxgFKVcuvmG1a8");
export const LENDING_ADAPTOR_PROGRAM_ID = new PublicKey("aVoLTRCRt3NnnchvLYH6rMYehJHwM5m45RmLBZq7PGz");
export const DRIFT_ADAPTOR_PROGRAM_ID = new PublicKey("EBN93eXs5fHGBABuajQqdsKRkCgaqtJa8vEFD6vKXiP");
export const KAMINO_ADAPTOR_PROGRAM_ID = new PublicKey("to6Eti9CsC5FGkAtqiPphvKD2hiQiLsS8zWiDBqBPKR");

// TerraFlow Vault (set from env — deploy vault first with init script)
export const TERRAFLOW_VAULT_PUBKEY = process.env.NEXT_PUBLIC_VAULT_PUBKEY
  ? new PublicKey(process.env.NEXT_PUBLIC_VAULT_PUBKEY)
  : null;

// Reference vault for live data display (Stablecoin Multi Lend — USDC, uses Kamino/Drift/Save)
export const REFERENCE_VAULT_PUBKEY = "DT3srSkTf2tyoAyz9nHf112MChkKEG7LGTGaGWccwgkE";

// Ranger REST API
export const RANGER_API_BASE = "https://api.voltr.xyz";

// Solana
export const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

// USDC on Solana Mainnet
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
export const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

// ─── TerraFlow Sector Metadata ───────────────────────────────────────────────
// Maps narrative "economy" sectors → real Drift/Kamino/Jupiter strategies
// The "Five Economies" brand stays, but underneath = real deployable strategies

export const SECTOR_METADATA = {
  stableYield: {
    label: "Stable Yield",
    shortLabel: "Stable",
    description: "Drift Earn USDC lending + Jupiter Lend — low-risk base yield",
    protocols: ["Drift Earn", "Jupiter Lend"],
    adaptor: "drift",
    targetApy: { min: 5, max: 8 },
    color: "#F8C61E",
    icon: "🏦",
    risk: "Low",
    driftMarketIndex: 0, // USDC spot market
  },
  activeTrading: {
    label: "Active Trading",
    shortLabel: "Active",
    description: "Drift delta-neutral: funding rate farming + basis trades",
    protocols: ["Drift Perps", "Drift Spot"],
    adaptor: "drift",
    targetApy: { min: 15, max: 30 },
    color: "#28C76F",
    icon: "📊",
    risk: "Medium",
    driftMarketIndex: 0,
  },
  defiYield: {
    label: "DeFi Yield",
    shortLabel: "DeFi",
    description: "Kamino multi-market lending optimization — auto-compounding",
    protocols: ["Kamino Main Market", "Kamino JLP Market", "Kamino Alt Market"],
    adaptor: "kamino",
    targetApy: { min: 6, max: 12 },
    color: "#7B6FF0",
    icon: "🔷",
    risk: "Medium",
    kaminoReserve: "D6q6wuQSrifJKZYpR1M8R4YawnLDtDsMmWM1NbBmgJ59", // Kamino Main Market USDC
  },
} as const;

export type SectorKey = keyof typeof SECTOR_METADATA;

// ─── Hackathon Config ────────────────────────────────────────────────────────
export const HACKATHON = {
  name: "Ranger Build-a-Bear Hackathon — Drift Side Track",
  deadline: "2026-04-06T23:59:00Z",
  prizePool: "$200,000 USDC vault seeding",
  minApy: 10, // minimum 10% APY required
  baseAsset: "USDC",
  lockPeriod: "3 months rolling",
};
