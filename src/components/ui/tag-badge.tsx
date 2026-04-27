"use client";

import React from "react";

export function TagBadge({
  children,
  variant = "pink",
}: {
  children: React.ReactNode;
  variant?: "pink" | "orange" | "gold" | "dark";
}) {
  const variantClass = {
    pink: "bg-primary/5 backdrop-blur-md border border-primary/10 text-primary",
    orange: "bg-[#EA7300]/10 backdrop-blur-md border border-[#EA7300]/10 text-[#8A3D00]",
    gold: "bg-[#D3CA79]/20 backdrop-blur-md border border-[#D3CA79]/20 text-[#7A6A00]",
    dark: "bg-[#121212]/5 backdrop-blur-md border border-[#121212]/5 text-[#121212]",
  }[variant];

  return (
    <span
      className={`inline-block px-2 py-1 rounded-[2px] font-mono text-sm font-semibold tracking-[2.8px] uppercase ${variantClass}`}
    >
      {children}
    </span>
  );
}
