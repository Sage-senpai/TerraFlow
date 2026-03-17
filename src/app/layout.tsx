import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { AppModeProvider } from "@/contexts/AppModeContext";

export const metadata: Metadata = {
  title: "TerraFlow — One Vault. Five Economies.",
  description: "AI-managed real-world yield vault. Deposit once. TerraFlow routes your capital across Housing, Trade, and Crypto sectors for optimized returns.",
  keywords: ["DeFi", "yield vault", "real world assets", "RWA", "AI allocation", "TerraFlow"],
  openGraph: {
    title: "TerraFlow — One Vault. Five Economies.",
    description: "AI-managed real-world yield vault. Deposit once. TerraFlow allocates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
