"use client";

import { cn } from "@/lib/utils";
import { GreenDot } from "./GreenDot";

export type BadgeStatus = "live" | "in-transit" | "delivered" | "pending" | "customs";

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

export function Badge({ status, className }: BadgeProps) {
  const styles = {
    live: "bg-green-500/15 border-green-500 text-green-500",
    "in-transit": "bg-info/15 border-info text-info",
    delivered: "bg-green-500/20 border-green-500 text-green-500",
    pending: "bg-warning/15 border-warning text-warning",
    customs: "bg-purple-500/15 border-purple-500 text-purple-500",
  };

  const labels = {
    live: "Live Tracking",
    "in-transit": "In Transit",
    delivered: "Delivered",
    pending: "Pending",
    customs: "Customs Clearance",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {status === "live" && <GreenDot className="h-2 w-2" />}
      {labels[status]}
    </div>
  );
}
