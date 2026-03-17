# TerraFlow — One Vault. Five Economies.

> AI-managed yield vault on Ranger Earn that routes USDC across Drift, Kamino, and Jupiter for optimized, diversified yield on Solana.

**Ranger Build-a-Bear Hackathon — Drift Side Track**

---

## What is TerraFlow?

TerraFlow is a single-deposit yield vault that abstracts away the complexity of DeFi allocation. You deposit USDC once — an AI engine continuously rebalances capital across three yield sectors:

| Sector | Protocols | Strategy | Target APY |
|---|---|---|---|
| **Stable Yield** | Drift Earn + Jupiter Lend | USDC spot lending with automated rate rotation | 5–8% |
| **Active Trading** | Drift Perps | Delta-neutral funding rate farming (long spot + short perp) | 15–30% |
| **DeFi Yield** | Kamino Finance | Multi-market USDC lending optimization (Main, JLP, Alt) | 6–12% |

**Target blended APY: 14%+**

## Architecture

```
User Wallet (USDC)
        │
        ▼
┌──────────────────────────┐
│   Ranger Earn Vault      │  ← On-chain (Voltr SDK)
│   (Single-asset USDC)    │
└──────────┬───────────────┘
           │
┌──────────┴───────────────┐
│   TerraFlow AI Engine    │  ← Off-chain monitor + on-chain keeper
│   (Manager keypair)      │
└──┬───────┬───────┬───────┘
   │       │       │
   ▼       ▼       ▼
┌──────┐┌──────┐┌──────┐
│Drift ││Kamino││Lend  │  ← Ranger Adaptors
│Adaptr││Adaptr││Adaptr│
└──────┘└──────┘└──────┘
```

## Drift Usage (Side Track)

TerraFlow uses Drift Protocol extensively:

1. **Drift Earn** — USDC spot lending (Market 0) via the Drift adaptor. Base yield layer.
2. **Drift Perps** — Delta-neutral funding rate farming. The AI opens long spot SOL + short SOL-PERP positions, capturing the funding rate premium without directional price risk. When funding rates spike (>0.03%/hr), the AI increases Active Trading allocation.
3. **Drift Hedging** — During market drawdowns, Drift derivatives hedge downside exposure automatically via circuit breaker logic.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Vault Infrastructure**: Ranger Earn (`@voltr/vault-sdk`, `api.voltr.xyz`)
- **Wallet**: `@solana/wallet-adapter-react` (Phantom)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Design**: Bloomberg Terminal x Apple Wallet x DeFi dashboard

## Program IDs

| Program | Address |
|---|---|
| Vault (Voltr) | `vVoLTRjQmtFpiYoegx285Ze4gsLJ8ZxgFKVcuvmG1a8` |
| Lending Adaptor | `aVoLTRCRt3NnnchvLYH6rMYehJHwM5m45RmLBZq7PGz` |
| Drift Adaptor | `EBN93eXs5fHGBABuajQqdsKRkCgaqtJa8vEFD6vKXiP` |
| Kamino Adaptor | `to6Eti9CsC5FGkAtqiPphvKD2hiQiLsS8zWiDBqBPKR` |

## Live Data

The dashboard reads real-time data from a Ranger Earn vault on Solana mainnet:
- **Vault**: `DT3srSkTf2tyoAyz9nHf112MChkKEG7LGTGaGWccwgkE` (Stablecoin Multi Lend)
- Live TVL, APY (1d/7d/30d/all-time), daily stats, and allocation breakdown
- Data refreshes every 30 seconds via `api.voltr.xyz`

## Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.local` and configure:

```env
NEXT_PUBLIC_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_VAULT_PUBKEY=DT3srSkTf2tyoAyz9nHf112MChkKEG7LGTGaGWccwgkE
```

### Vault Deployment Scripts

To deploy your own vault (requires ~0.15 SOL):

```bash
cd scripts
npm install
npx ts-node init-vault.ts          # Create vault
npx ts-node setup-strategies.ts    # Add Drift, Kamino, Lending adaptors
npx ts-node rebalance-bot.ts       # Start AI rebalance loop
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with pitch, sectors, security, and CTA |
| `/dashboard` | Vault overview with live TVL, APY, allocation chart, AI feed |
| `/dashboard/portfolio` | User positions, earnings, withdrawal flow |
| `/dashboard/deposit` | Deposit USDC with strategy selection (Balanced/Stable/Growth) |
| `/dashboard/strategies` | Strategy explorer with risk metrics and rebalance history |
| `/dashboard/activity` | Full transaction log with filtering (deposits, yields, rebalances) |
| `/dashboard/governance` | Governance voting (coming soon — post-TGE) |
| `/dashboard/docs` | Protocol documentation, FAQ, architecture diagram |

## AI Rebalance Engine

The rebalance bot (`scripts/rebalance-bot.ts`):

1. Monitors Drift funding rates, Kamino lending rates, and Jupiter yields every 30s
2. Computes optimal sector weights based on rate differentials
3. Triggers on-chain rebalance via Ranger vault manager when improvement > tx cost
4. Circuit breaker: pauses if any sector health factor drops below 1.5

## Security

- **Non-custodial**: Funds held in Ranger Earn vault smart contract
- **Admin/Manager separation**: Admin controls adaptor whitelist; Manager (AI) controls capital deployment only
- **Circuit breakers**: Automated drawdown protection
- **Delta-neutral**: Core trading strategy has zero directional exposure

## Team

Built for the Ranger Finance Build-a-Bear Hackathon (Drift Side Track).

---

*Not financial advice. Use at your own risk.*
