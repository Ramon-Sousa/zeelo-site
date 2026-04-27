"use client";

import React from "react";

export function CTAButton({
  children,
  href,
  size = "lg",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}) {
  const baseClass = `group inline-flex items-center justify-center gap-3 bg-primary text-[#fafafa] rounded-[4px] font-body font-light transition-all duration-300 hover:brightness-110 active:scale-[0.98] ${
    size === "lg" ? "h-[52px] px-6 text-[15.8px]" : "h-[44px] px-5 text-[13.8px]"
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <svg
        width={size === "lg" ? 20 : 16}
        height={size === "lg" ? 20 : 16}
        viewBox="0 0 20 20"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M4.167 10h11.666M10.833 5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClass}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={baseClass}>
      {content}
    </a>
  );
}
