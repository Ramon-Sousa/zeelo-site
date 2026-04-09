import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:border-primary/40",
        className,
      )}
    >
      {header}
      <div>
        {icon}
        <div className="mt-2 mb-1 font-heading font-bold text-[#121212] text-[15px] leading-[1.3]">
          {title}
        </div>
        <div className="font-body font-light text-text-body text-[13px] leading-[1.5]">
          {description}
        </div>
      </div>
    </div>
  );
};

