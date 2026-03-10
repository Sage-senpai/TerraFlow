"use client";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = "", hover = false, glow = false }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-200
        bg-[#1B222B] border-[#2A3340]
        ${hover ? "hover:border-[#F8C61E]/30 hover:bg-[#212A35] cursor-pointer" : ""}
        ${glow ? "shadow-[0_0_24px_rgba(248,198,30,0.06)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-[#2A3340] ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  );
}
