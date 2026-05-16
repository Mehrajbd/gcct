"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { 
  FileText, Truck, PackageCheck, LocateFixed, 
  Warehouse, ClipboardCheck, Container, 
  Ship, Anchor, MapPin, Globe, CheckCircle2,
  ArrowRight, ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "01", label: "Factory Booking", icon: FileText },
  { id: "02", label: "Vehicle Dispatch", icon: Truck },
  { id: "03", label: "Factory Pickup", icon: PackageCheck },
  { id: "04", label: "GPS Tracking", icon: LocateFixed },
  { id: "05", label: "ICD Gate-In", icon: Warehouse },
  { id: "06", label: "Cargo Verify", icon: ClipboardCheck },
  { id: "07", label: "Container Stuffing", icon: Container },
  { id: "08", label: "Port Dispatch", icon: Truck },
  { id: "09", label: "Port Gate-In", icon: Anchor },
  { id: "10", label: "Vessel Loading", icon: Ship },
  { id: "11", label: "Ocean Tracking", icon: Globe },
  { id: "12", label: "Foreign Port", icon: MapPin },
  { id: "13", label: "Final Delivery", icon: CheckCircle2 },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="From Factory to Buyer" 
          subtitle="The GCCT Digitalized Workflow"
          description="We unify 13 fragmented steps into one seamless digital highway. Every milestone is timestamped and verified."
          align="center"
        />

        <div className="mt-20">
          {/* Mobile/Tablet Layout: Vertical List */}
          <div className="lg:hidden space-y-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full flex items-center gap-4 p-4 bg-brand-surface border border-white-10 rounded-2xl relative"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-display font-black text-xl">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold leading-tight">{step.label}</h4>
                  </div>
                  <div className="text-white-20">
                    <step.icon size={20} />
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="py-2 text-green-500/30"
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Layout: Snake Pattern */}
          <div className="hidden lg:block space-y-16">
            {/* Row 1 (Steps 1-5) */}
            <div className="flex justify-between items-start px-12 relative">
              <RowConnector className="top-8 left-[10%] right-[10%]" direction="right" />
              {steps.slice(0, 5).map((step, i) => (
                <StepNode key={step.id} step={step} index={i} totalInRow={5} />
              ))}
              <VerticalConnector side="right" className="-bottom-16 right-16" />
            </div>

            {/* Row 2 (Steps 6-10) - Reversed */}
            <div className="flex flex-row-reverse justify-between items-start px-12 relative">
              <RowConnector className="top-8 left-[10%] right-[10%]" direction="left" />
              {steps.slice(5, 10).map((step, i) => (
                <StepNode key={step.id} step={step} index={i} totalInRow={5} />
              ))}
              <VerticalConnector side="left" className="-bottom-16 left-16" />
            </div>

            {/* Row 3 (Steps 11-13) */}
            <div className="flex justify-start gap-[12%] items-start px-12 pt-4">
              {steps.slice(10).map((step, i) => (
                <StepNode key={step.id} step={step} index={i} totalInRow={5} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RowConnector({ className, direction }: { className: string, direction: 'left' | 'right' }) {
  return (
    <div className={cn("absolute h-[1px] bg-green-500/20 z-0 flex items-center justify-center", className)}>
       <div className="w-full h-full relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-green-500/40",
              direction === 'right' ? "right-[-10px]" : "left-[-10px] rotate-180"
            )}
          >
             <ArrowRight size={16} />
          </motion.div>
       </div>
    </div>
  );
}

function VerticalConnector({ side, className }: { side: 'left' | 'right', className: string }) {
  return (
    <div className={cn(
      "absolute w-[200px] h-[64px] border-green-500/20 pointer-events-none z-0",
      side === 'right' ? "border-r-2 border-b-2 rounded-br-[64px]" : "border-l-2 border-b-2 rounded-bl-[64px]",
      className
    )} />
  );
}

function StepNode({ step, index, totalInRow }: { step: typeof steps[0], index: number, totalInRow: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center gap-4 relative z-10 w-32"
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-white-10 flex items-center justify-center group hover:border-green-500 transition-all cursor-pointer shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <step.icon size={28} className="text-white-50 group-hover:text-green-500 transition-colors" />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-dark border-2 border-brand-surface flex items-center justify-center text-[10px] font-mono font-bold text-green-500">
           {step.id}
        </div>
      </div>
      <span className="text-[10px] md:text-xs font-bold text-center text-white-50 leading-tight uppercase tracking-widest px-2">
        {step.label}
      </span>
    </motion.div>
  );
}
