import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { AppModeProvider } from "@/contexts/AppModeContext";

export const metadata: Metadata = {
  title: "TerraFlow — One Vault. Five Economies.",
  description: "AI-managed yield vault on Ranger Earn. Deposit USDC once — TerraFlow routes capital across Drift, Kamino, and Jupiter for optimized returns on Solana.",
  keywords: ["DeFi", "yield vault", "Solana", "Ranger Earn", "Drift", "Kamino", "AI allocation", "TerraFlow", "USDC"],
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icon-192.svg", type: "image/svg+xml" },
  ],
  openGraph: {
    title: "TerraFlow — One Vault. Five Economies.",
    description: "AI-managed yield vault on Ranger Earn. Deposit USDC once — TerraFlow allocates across Drift, Kamino & Jupiter.",
    type: "website",
    siteName: "TerraFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TerraFlow — One Vault. Five Economies.",
    description: "AI-managed yield vault on Ranger Earn. Deposit USDC once — TerraFlow allocates across Drift, Kamino & Jupiter.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0F141A" />
      </head>
      <body className="antialiased">
        <WalletProvider>
          <AppModeProvider>
            {children}
          </AppModeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
