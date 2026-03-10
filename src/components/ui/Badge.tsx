import { ReactNode } from "react";

type Variant = "positive" | "warning" | "danger" | "sunburst" | "neutral" | "housing" | "trade" | "crypto";

const variants: Record<Variant, string> = {
  positive: "bg-[rgba(40,199,111,0.12)] text-[#28C76F] border-[rgba(40,199,111,0.2)]",
  warning: "bg-[rgba(255,159,67,0.12)] text-[#FF9F43] border-[rgba(255,159,67,0.2)]",
  danger: "bg-[rgba(234,84,85,0.12)] text-[#EA5455] border-[rgba(234,84,85,0.2)]",
  sunburst: "bg-[rgba(248,198,30,0.12)] text-[#F8C61E] border-[rgba(248,198,30,0.2)]",
  neutral: "bg-[#252C37] text-[#8F98A3] border-[#2A3340]",
  housing: "bg-[rgba(248,198,30,0.1)] text-[#F8C61E] border-[rgba(248,198,30,0.2)]",
  trade: "bg-[rgba(40,199,111,0.1)] text-[#28C76F] border-[rgba(40,199,111,0.2)]",
  crypto: "bg-[rgba(123,111,240,0.1)] text-[#7B6FF0] border-[rgba(123,111,240,0.2)]",
};

export function Badge({ children, variant = "neutral", className = "" }: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span className={`
      inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border font-mono
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  );
}
