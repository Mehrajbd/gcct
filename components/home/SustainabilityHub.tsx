"use client";

import { motion } from "framer-motion";
import { Leaf, Wind, Droplets, Zap, TrendingDown, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const metrics = [
  { 
    name: "Carbon Offset", 
    value: "2,450 kg", 
    change: "-12%", 
    icon: Wind, 
    color: "text-green-400",
    description: "Total CO2 reduction through optimized vessel routing."
  },
  { 
    name: "Water Usage", 
    value: "840 L", 
    change: "-5%", 
    icon: Droplets, 
    color: "text-blue-400",
    description: "Digital documentation saved approx. 840L of manufacturing water."
  },
  { 
    name: "Energy Efficiency", 
    value: "94%", 
    change: "+8%", 
    icon: Zap, 
    color: "text-yellow-400",
    description: "Warehouse logistics energy efficiency score." 
  },
  { 
    name: "Compliance Score", 
    value: "A+", 
    change: "Verified", 
    icon: ShieldCheck, 
    color: "text-purple-400",
    description: "Real-time compliance data for EU Environment Standards."
  }
];

export function SustainabilityHub() {
  return (
    <section className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-green-glow rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          title="Green Cargo Tower" 
          subtitle="Sustainability & Compliance Metrics"
          description="We help Bangladesh RMG exporters meet European Green Deal standards with real-time carbon tracking and digital compliance verify."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full border-white-10 hover:border-green-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-white-5 ${m.color}`}>
                    <m.icon size={24} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-white-50 block uppercase">Real-time</span>
                    <span className={`text-xs font-bold ${m.change.includes('-') || m.change === 'Verified' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {m.change}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white-100 mb-2">{m.value}</h3>
                <p className="text-sm font-bold text-white-80 mb-4">{m.name}</p>
                <p className="text-xs text-white-50 leading-relaxed">{m.description}</p>
                
                <div className="mt-6 pt-6 border-t border-white-5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-[10px] font-mono text-green-500 flex items-center gap-2 hover:gap-3 transition-all">
                      DOWNLOAD REPORT <TrendingDown size={12} />
                   </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 p-8 bg-brand-dark/50 border border-green-500/20 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Leaf size={32} />
             </div>
             <div>
                <h4 className="text-lg font-bold text-white-100">EU Green Deal Ready?</h4>
                <p className="text-sm text-white-50">Our platform automatically generates the required ESG reports for your European buyers.</p>
             </div>
          </div>
          <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-brand-dark font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
             Check Your Compliance Score
          </button>
        </motion.div>
      </div>
    </section>
  );
}
