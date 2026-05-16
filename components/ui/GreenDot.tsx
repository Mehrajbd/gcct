"use client";

import { cn } from "@/lib/utils";

interface GreenDotProps {
  className?: string;
  pulse?: boolean;
}

export function GreenDot({ className, pulse = true }: GreenDotProps) {
  return (
    <div className={cn("relative flex h-3 w-3", className)}>
      {pulse && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      )}
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </div>
  );
}
