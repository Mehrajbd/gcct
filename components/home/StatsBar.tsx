"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const stats = [
  { value: 20, suffix: "+", label: "Countries Covered" },
  { value: 13, suffix: "", label: "Tracking Checkpoints" },
  { value: 99.9, suffix: "%", label: "Platform Uptime" },
  { value: 500, suffix: "+", label: "Shipments Tracked" },
];

export function StatsBar() {
  return (
    <section className="bg-brand-secondary border-y border-green-border py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={cn(
                "text-center space-y-2",
                i !== stats.length - 1 && "lg:border-r lg:border-white-20"
              )}
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-green-400">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.value % 1 !== 0 ? 1 : 0} 
                />
              </div>
              <p className="text-sm font-body text-white-50 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
