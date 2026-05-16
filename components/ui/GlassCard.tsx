"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-brand-glass backdrop-blur-xl border border-green-border rounded-2xl p-6 transition-all duration-300",
        hover && "hover:border-green-500/50 hover:shadow-[0_0_32px_rgba(34,197,94,0.12)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
