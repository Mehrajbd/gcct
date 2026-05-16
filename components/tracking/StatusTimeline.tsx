"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const allSteps = [
  "Factory Booking", "Vehicle Dispatched", "Cargo Picked Up", "GPS Tracking Active",
  "Arrived at ICD", "Cargo Verified", "Container Stuffed", "Port Dispatch",
  "Gate-In at Port", "Loaded on Vessel", "Ocean Transit", "Destination Port Arrival",
  "Customs Clearance", "Delivered to Buyer"
];

interface StatusTimelineProps {
  currentStep: number;
}

export function StatusTimeline({ currentStep }: StatusTimelineProps) {
  return (
    <div className="space-y-0 relative">
      {/* Connector Line */}
      <div className="absolute top-4 bottom-4 left-[15px] w-[2px] bg-white-20 -z-0" />
      
      {allSteps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        
        return (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-6 pb-10 last:pb-0 relative"
          >
            <div className="relative z-10">
              {isCompleted ? (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="text-brand-dark" size={18} />
                </div>
              ) : isActive ? (
                <div className="w-8 h-8 rounded-full bg-brand-surface border-2 border-green-500 flex items-center justify-center relative">
                   <div className="pulse-ring w-full h-full" />
                   <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-surface border-2 border-white-20 flex items-center justify-center">
                   <Circle className="text-white-20" size={14} />
                </div>
              )}
              
              {/* Green Connector Overlay for completed steps */}
              {isCompleted && i < allSteps.length - 1 && (
                 <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+8px)] bg-green-500" />
              )}
            </div>

            <div className="flex flex-col pt-1">
              <h4 className={cn(
                "text-sm font-bold transition-colors",
                isCompleted ? "text-white-100" : isActive ? "text-green-400" : "text-white-50"
              )}>
                {step}
              </h4>
              {isCompleted && (
                <p className="text-[10px] font-mono text-white-50 mt-1">13 JAN 2025, 09:32 AM</p>
              )}
              {isActive && (
                <div className="mt-2 text-xs text-white-80 bg-green-500/10 border border-green-500/20 rounded px-2 py-1 inline-block w-fit">
                   Current Location: Indian Ocean
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
