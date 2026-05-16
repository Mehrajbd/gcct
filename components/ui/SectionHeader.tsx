"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  description,
  eyebrow,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={cn(
        "mb-12 space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-green-500 font-mono text-sm font-semibold tracking-wider uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-bold text-white-100 leading-tight">
        {title}
        <span className={cn(
          "block w-24 h-1 bg-green-500 mt-4 rounded-full",
          align === "center" ? "mx-auto" : "mx-0"
        )} />
      </h2>
      {subtitle && (
        <h3 className={cn(
          "text-white text-xl font-bold max-w-2xl",
          align === "center" ? "mx-auto" : "mx-0"
        )}>
          {subtitle}
        </h3>
      )}
      {description && (
        <p className={cn(
          "text-white-50 text-lg max-w-2xl",
          align === "center" ? "mx-auto" : "mx-0"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
