"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Truck, Package, Ship, Globe, FileText, ShieldCheck } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

const services = [
  {
    title: "Factory Pickup",
    description: "GPS-tracked vehicle dispatch from your factory gate directly to the port or ICD.",
    icon: Truck,
  },
  {
    title: "ICD & Stuffing",
    description: "Container stuffing with real-time seal numbers, photos, and automated timestamps.",
    icon: Package,
  },
  {
    title: "Ocean Freight",
    description: "Live vessel tracking via direct Maersk, MSC, CMA CGM API integrations for 100% accuracy.",
    icon: Ship,
  },
  {
    title: "Global Delivery",
    description: "Last-mile delivery to the buyer's warehouse via our extensive 20+ country agent network.",
    icon: Globe,
  },
  {
    title: "Export Docs",
    description: "Auto-generated Invoice, Packing List, and Bill of Lading to eliminate manual errors.",
    icon: FileText,
  },
  {
    title: "Full Accountability",
    description: "One single platform. One responsible party. No more back-and-forth blame games.",
    icon: ShieldCheck,
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        <SectionHeader 
          title="What We Handle" 
          subtitle="A comprehensive suite of logistics services designed for the demands of modern RMG exporters."
        />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div key={service.title} variants={fadeUp}>
              <GlassCard className="h-full flex flex-col p-8 group">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-green-500" size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-white-100 mb-4">{service.title}</h3>
                <p className="text-white-50 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <span>→</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
