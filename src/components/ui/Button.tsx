"use client";
import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-[#F8C61E] text-[#0F141A] hover:bg-[#FFD84D] font-semibold shadow-[0_4px_24px_rgba(248,198,30,0.25)] hover:shadow-[0_4px_32px_rgba(248,198,30,0.4)]",
  secondary: "bg-[#1B222B] text-[#E8ECF0] border border-[#2A3340] hover:border-[#F8C61E]/40 hover:bg-[#212A35]",
  ghost: "text-[#8F98A3] hover:text-[#E8ECF0] hover:bg-[#1B222B]",
  danger: "bg-[rgba(234,84,85,0.12)] text-[#EA5455] border border-[rgba(234,84,85,0.2)] hover:bg-[rgba(234,84,85,0.2)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children, variant = "primary", size = "md",
  loading = false, fullWidth = false, className = "", ...props
}: ButtonProps) {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-8 py-4 text-base" };
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  );
}
