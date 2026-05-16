"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp } from "@/lib/animations";

const countries = [
  "🇩🇪 Germany", "🇺🇸 USA", "🇬🇧 UK", "🇫🇷 France", "🇦🇪 UAE", 
  "🇳🇱 Netherlands", "🇮🇹 Italy", "🇪🇸 Spain", "🇧🇪 Belgium", 
  "🇦🇺 Australia", "🇨🇦 Canada", "🇸🇬 Singapore"
];

const routes = [
  { d: "M200 150 Q350 50 500 100", label: "CTG → HH" },
  { d: "M200 150 Q300 100 650 150", label: "CTG → NYC" },
  { d: "M200 150 Q250 200 300 250", label: "CTG → DXB" },
];

export function GlobalNetwork() {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Global Coverage" 
          subtitle="Connecting Bangladesh to major economic hubs across Europe, Americas, and the Middle East."
        />

        <div className="relative aspect-video max-w-5xl mx-auto bg-brand-surface rounded-3xl border border-white-20 overflow-hidden mb-12">
          {/* Mock SVG World Map Backdrop */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
              <path d="M50 150h50M150 100h200M400 50h100M600 80h150M50 300h100M200 350h300M600 320h100" stroke="white" strokeWidth="1" />
              {/* Add more abstract shapes to represent continents */}
              <circle cx="200" cy="150" r="4" fill="#22C55E" /> {/* BD */}
            </svg>
          </div>

          {/* Animated Routes */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
            {routes.map((route, i) => (
              <g key={i}>
                <motion.path
                  d={route.d}
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 3, delay: i * 0.5, ease: "easeInOut" } as any}
                />
                <motion.circle
                  r="3"
                  fill="#22C55E"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 } as any}
                  style={{ offsetPath: `path('${route.d}')` }}
                />
              </g>
            ))}
          </svg>

          {/* Markers */}
          <div className="absolute top-[37%] left-[25%] flex flex-col items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-[10px] font-mono mt-1 text-green-500 font-bold">CTG PHUB</span>
          </div>

          <div className="absolute bottom-6 left-6 p-4 bg-brand-dark/80 backdrop-blur-md border border-white-20 rounded-xl">
             <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-white-50">Active Routes</span>
                </div>
                <div className="flex items-center gap-2">
                   <svg width="8" height="8" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-white-20" />
                   </svg>
                  <span className="text-white-50">Global Agents</span>
                </div>
             </div>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          {countries.map((country) => (
            <div 
              key={country}
              className="px-4 py-2 bg-brand-surface border border-white-20 rounded-full text-sm font-medium hover:border-green-500/50 transition-colors"
            >
              {country}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
