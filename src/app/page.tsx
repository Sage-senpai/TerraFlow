"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, ChevronRight, Globe, Activity } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const } }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const sectors = [
  {
    name: "Stable Yield",
    apy: "5\u20138%",
    desc: "Drift Earn USDC lending + Jupiter Lend. Low-risk base yield layer with automated rate optimization.",
    icon: "\u{1F3E6}",
    color: "#F8C61E",
    bg: "rgba(248,198,30,0.07)",
    border: "rgba(248,198,30,0.15)",
    tag: "Drift Earn + Jupiter",
  },
  {
    name: "Active Trading",
    apy: "15\u201330%",
    desc: "Delta-neutral funding rate farming on Drift. Long spot + short perp captures premium without directional risk.",
    icon: "\u{1F4CA}",
    color: "#28C76F",
    bg: "rgba(40,199,111,0.07)",
    border: "rgba(40,199,111,0.15)",
    tag: "Drift Perps",
  },
  {
    name: "DeFi Yield",
    apy: "6\u201312%",
    desc: "Kamino multi-market lending optimization. Capital rotates across Main, JLP, and Alt markets for peak rates.",
    icon: "\u{1F537}",
    color: "#7B6FF0",
    bg: "rgba(123,111,240,0.07)",
    border: "rgba(123,111,240,0.15)",
    tag: "Kamino Markets",
  },
];

const stats = [
  { label: "Total Value Locked", value: "$284.5M" },
  { label: "Avg. Blended APY", value: "14.2%" },
  { label: "Active Depositors", value: "12,843" },
  { label: "AI Rebalances / Day", value: "47" },
];

const steps = [
  { n: "01", title: "Connect Wallet", desc: "Link Phantom, Backpack, or Solflare. No KYC required.", icon: "\u{1F517}" },
  { n: "02", title: "Deposit Once", desc: "Deposit USDC. Select Balanced, Stable, or Growth allocation.", icon: "\u{1F4B3}" },
  { n: "03", title: "TerraFlow Allocates", desc: "AI routes capital across Drift, Jupiter & Kamino strategies via Ranger Earn.", icon: "\u26A1" },
  { n: "04", title: "Earn Continuously", desc: "Yield accrues daily. AI rebalances 24/7 for optimal returns.", icon: "\u{1F4C8}" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F141A] text-[#E8ECF0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A3340] bg-[#0F141A]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F8C61E] flex items-center justify-center shadow-[0_0_12px_rgba(248,198,30,0.4)]">
              <Zap className="w-3.5 h-3.5 text-[#0F141A]" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-[#E8ECF0] text-lg tracking-tight">TerraFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#8F98A3]">
            <a href="#how-it-works" className="hover:text-[#E8ECF0] transition-colors">How it Works</a>
            <a href="#sectors" className="hover:text-[#E8ECF0] transition-colors">Sectors</a>
            <a href="#security" className="hover:text-[#E8ECF0] transition-colors">Security</a>
            <a href="#pitch" className="hover:text-[#E8ECF0] transition-colors">Pitch</a>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-[#F8C61E] text-[#0F141A] rounded-xl text-sm font-semibold
              hover:bg-[#FFD84D] transition-all shadow-[0_4px_16px_rgba(248,198,30,0.25)]"
          >
            Launch App
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #F8C61E 0%, transparent 70%)" }} />

        <motion.div
          className="max-w-4xl mx-auto relative"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(248,198,30,0.1)] border border-[rgba(248,198,30,0.2)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
            <span className="text-xs font-mono text-[#F8C61E]">Live on Solana Mainnet</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            <span className="text-[#E8ECF0]">One Vault.</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #F8C61E 0%, #FFE066 50%, #F8A61E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Five Economies.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-[#8F98A3] max-w-2xl mx-auto leading-relaxed mb-10">
            TerraFlow is an AI-managed yield vault on Ranger Earn that routes your USDC across Drift, Kamino, and Jupiter &mdash;
            capturing funding rates, lending spreads, and basis trades while you do nothing.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/deposit"
              className="flex items-center gap-2.5 px-8 py-4 bg-[#F8C61E] text-[#0F141A] rounded-xl text-base font-bold
                hover:bg-[#FFD84D] transition-all shadow-[0_8px_32px_rgba(248,198,30,0.3)] hover:shadow-[0_8px_40px_rgba(248,198,30,0.45)]
                active:scale-[0.98]"
            >
              Start Earning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 border border-[#2A3340] text-[#8F98A3] rounded-xl text-base font-medium
                hover:border-[#F8C61E]/30 hover:text-[#E8ECF0] transition-all"
            >
              How it Works
            </a>
          </motion.div>

          {/* Capital flow diagram */}
          <motion.div variants={fadeUp} custom={4} className="mt-16 inline-flex flex-col items-center gap-0">
            <div className="px-6 py-3 rounded-xl bg-[#1B222B] border border-[#2A3340] text-sm font-mono text-[#E8ECF0]">
              Your Deposit (USDC)
            </div>
            <div className="flex flex-col items-center gap-0 my-1">
              <div className="w-px h-5 bg-[#2A3340]" />
              <div className="w-2 h-2 rounded-full bg-[#F8C61E] animate-pulse" />
              <div className="w-px h-5 bg-[#2A3340]" />
            </div>
            <div className="px-6 py-2.5 rounded-xl bg-[rgba(248,198,30,0.08)] border border-[rgba(248,198,30,0.2)] text-sm font-mono text-[#F8C61E] font-semibold">
              {"\u26A1"} TerraFlow AI Vault
            </div>
            <div className="hidden sm:flex items-end gap-0 mt-1">
              <div className="flex flex-col items-center mr-[-1px]">
                <div className="w-px h-5 bg-[#2A3340]" />
                <div className="w-16 h-px bg-[#2A3340]" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-10 bg-[#2A3340]" />
              </div>
              <div className="flex flex-col items-center ml-[-1px]">
                <div className="w-px h-5 bg-[#2A3340]" />
                <div className="w-16 h-px bg-[#2A3340]" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0">
              {[
                { label: "Stable Yield", apy: "5\u20138%", color: "#F8C61E", pct: "35%" },
                { label: "Active Trading", apy: "15\u201330%", color: "#28C76F", pct: "35%" },
                { label: "DeFi Yield", apy: "6\u201312%", color: "#7B6FF0", pct: "30%" },
              ].map(s => (
                <div key={s.label} className="px-4 py-2.5 rounded-xl border text-sm text-center" style={{ background: `${s.color}0A`, borderColor: `${s.color}25` }}>
                  <p className="font-mono font-bold" style={{ color: s.color }}>{s.apy}</p>
                  <p className="text-xs text-[#8F98A3] mt-0.5">{s.label}</p>
                  <p className="text-xs font-mono text-[#4A5568]">{s.pct}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats ticker */}
      <div className="border-y border-[#2A3340] bg-[#1B222B] py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 shrink-0">
              <span className="text-xs text-[#8F98A3] font-mono uppercase tracking-wider">{s.label}</span>
              <span className="font-mono font-bold text-[#F8C61E]">{s.value}</span>
              <span className="w-px h-4 bg-[#2A3340]" />
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono text-[#F8C61E] uppercase tracking-widest mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#E8ECF0]">Four steps to yield</h2>
            <p className="text-[#8F98A3] mt-3 max-w-xl mx-auto">
              TerraFlow abstracts away the complexity of DeFi allocation. You deposit once &mdash; the protocol handles everything else.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                className="relative p-5 rounded-2xl bg-[#1B222B] border border-[#2A3340] hover:border-[#F8C61E]/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className="font-mono text-xs text-[#4A5568]">{s.n}</span>
                <div className="text-3xl mt-3 mb-3">{s.icon}</div>
                <h3 className="font-display font-semibold text-[#E8ECF0]">{s.title}</h3>
                <p className="text-sm text-[#8F98A3] mt-1.5 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0F141A] border border-[#2A3340] items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5 text-[#4A5568]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="py-24 px-6 bg-[#0C1017]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono text-[#F8C61E] uppercase tracking-widest mb-3">YIELD SECTORS</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#E8ECF0]">Three economies. One vault.</h2>
            <p className="text-[#8F98A3] mt-3 max-w-xl mx-auto">
              Each sector operates independently, allowing AI-driven rebalancing between them based on macro signals.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s, i) => (
              <motion.div
                key={s.name}
                className="p-6 rounded-2xl border transition-all hover:scale-[1.01] group"
                style={{ background: s.bg, borderColor: s.border }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold" style={{ color: s.color, background: `${s.color}15` }}>
                    {s.apy} APY
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#E8ECF0]">{s.name}</h3>
                <span className="inline-block mt-1 mb-3 text-xs font-mono text-[#4A5568]">{s.tag}</span>
                <p className="text-sm text-[#8F98A3] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { icon: "\u{1F3E0}", name: "RWA Yield", desc: "Tokenized real-world asset lending via Ondo Finance", tag: "Coming Soon", color: "#FF9F43" },
              { icon: "\u{1F331}", name: "Carbon Credits", desc: "Carbon credit liquidity markets on Solana", tag: "Coming Soon", color: "#28C76F" },
            ].map(s => (
              <div key={s.name} className="p-5 rounded-2xl border border-[#2A3340] bg-[#1B222B] flex items-center gap-4 opacity-60">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-[#E8ECF0]">{s.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-mono text-[#4A5568] bg-[#252C37]">{s.tag}</span>
                  </div>
                  <p className="text-sm text-[#4A5568] mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono text-[#F8C61E] uppercase tracking-widest mb-3">SECURITY</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#E8ECF0]">Built for institutional trust</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-5 h-5 text-[#28C76F]" />,
                title: "Circuit Breakers",
                desc: "Automated drawdown protection. Vault pauses rebalancing if any sector drops beyond threshold.",
                color: "#28C76F",
              },
              {
                icon: <Activity className="w-5 h-5 text-[#F8C61E]" />,
                title: "AI + Keeper Architecture",
                desc: "Off-chain AI monitors Drift funding rates and lending spreads. On-chain keeper executes rebalances via Ranger vault manager.",
                color: "#F8C61E",
              },
              {
                icon: <Globe className="w-5 h-5 text-[#7B6FF0]" />,
                title: "Drift Hedging Layer",
                desc: "Drift Protocol derivatives hedge downside exposure during market drawdowns automatically.",
                color: "#7B6FF0",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                className="p-6 rounded-2xl bg-[#1B222B] border border-[#2A3340]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-[#E8ECF0]">{s.title}</h3>
                <p className="text-sm text-[#8F98A3] mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch / Investor */}
      <section id="pitch" className="py-24 px-6 bg-[#0C1017]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono text-[#F8C61E] uppercase tracking-widest mb-3">THE PITCH</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#E8ECF0]">Why TerraFlow wins</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                {
                  title: "The Problem",
                  body: "DeFi yields are fragmented across protocols, chains, and strategies. Managing a diversified yield portfolio requires constant manual rebalancing \u2014 a full-time job.",
                  icon: "\u26A0\uFE0F",
                },
                {
                  title: "The Solution",
                  body: "TerraFlow acts as your on-chain macro fund manager. One deposit gives you exposure to diversified real-world yield, continuously optimized by AI.",
                  icon: "\u{1F4A1}",
                },
                {
                  title: "The Edge",
                  body: "Delta-neutral Drift strategies capture funding rate alpha without directional risk. AI monitors rates 24/7 and rebalances across Drift, Kamino, and Jupiter in real-time.",
                  icon: "\u{1F3F0}",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#1B222B] border border-[#2A3340]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-display font-semibold text-[#E8ECF0]">{item.title}</h3>
                      <p className="text-sm text-[#8F98A3] mt-1.5 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Market Size",
                  body: "Global yield-bearing product market: $400T+. DeFi captures <0.1%. RWA tokenization is the bridge \u2014 expected $16T by 2030 (BlackRock, BCG estimates).",
                  icon: "\u{1F30D}",
                },
                {
                  title: "Revenue Model",
                  body: "0.5% performance fee on earned yield. At $1B TVL and 13% blended APY: $650K/month fee revenue with near-zero marginal cost of capital.",
                  icon: "\u{1F4B0}",
                },
                {
                  title: "Competitive Advantage",
                  body: "No competitor combines AI rebalancing + Drift funding rate farming + multi-protocol lending in a single vault interface with Bloomberg-grade intelligence.",
                  icon: "\u{1F680}",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#1B222B] border border-[#2A3340]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-display font-semibold text-[#E8ECF0]">{item.title}</h3>
                      <p className="text-sm text-[#8F98A3] mt-1.5 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse 80% 60%, #F8C61E, transparent)" }} />
        <motion.div
          className="max-w-3xl mx-auto text-center relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8ECF0] mb-4">
            Start earning from{" "}
            <span style={{
              background: "linear-gradient(135deg, #F8C61E, #FFE066)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              five economies
            </span>
          </h2>
          <p className="text-[#8F98A3] text-lg mb-10 max-w-xl mx-auto">
            Deposit once. Let AI allocate across real-world sectors. No DeFi complexity. Just yield.
          </p>
          <Link
            href="/dashboard/deposit"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#F8C61E] text-[#0F141A] rounded-2xl text-lg font-bold
              hover:bg-[#FFD84D] transition-all shadow-[0_8px_40px_rgba(248,198,30,0.3)] hover:shadow-[0_8px_56px_rgba(248,198,30,0.45)]
              active:scale-[0.98]"
          >
            Launch App &mdash; It&apos;s Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A3340] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#F8C61E] flex items-center justify-center">
              <Zap className="w-3 h-3 text-[#0F141A]" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-[#E8ECF0] text-sm">TerraFlow</span>
            <span className="text-[#4A5568] text-sm ml-2">One Vault. Five Economies.</span>
          </div>
          <p className="text-xs text-[#4A5568] font-mono text-center md:text-right">
            Built on Ranger Earn &middot; Drift &middot; Kamino &middot; Jupiter &mdash; Not financial advice. &copy; 2026 TerraFlow Protocol.
          </p>
        </div>
      </footer>
    </div>
  );
}
