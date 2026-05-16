"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { X, CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const allSteps = [
  "Factory Booking", "Vehicle Dispatched", "Cargo Picked Up", "GPS Tracking Active",
  "Arrived at ICD", "Cargo Verified", "Container Stuffed", "Port Dispatch",
  "Gate-In at Port", "Loaded on Vessel", "Ocean Transit", "Destination Port Arrival",
  "Customs Clearance", "Delivered to Buyer"
];

interface StatusUpdateModalProps {
  shipment: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newStep: number) => void;
}

export function StatusUpdateModal({ shipment, isOpen, onClose, onUpdate }: StatusUpdateModalProps) {
  const [selectedStep, setSelectedStep] = useState(shipment?.currentStep || 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar relative border-green-500/30">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white-50 hover:text-white-100 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold">Update Shipment Status</h2>
            <p className="text-white-50 font-mono text-sm">{shipment?.trackingId} — {shipment?.exporter}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSteps.map((step, i) => (
              <button
                key={step}
                onClick={() => setSelectedStep(i)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                  selectedStep === i ? "bg-green-500/10 border-green-500 text-green-400" :
                  i < selectedStep ? "border-green-500/20 text-white-50" :
                  "bg-brand-surface border-white-10 text-white-20 hover:border-white-20"
                )}
              >
                <div className="shrink-0">
                  {i < selectedStep ? <CheckCircle2 size={18} className="text-green-500" /> :
                   selectedStep === i ? <Clock size={18} className="text-green-500" /> :
                   <Circle size={18} />}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono block opacity-50">STEP {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold">{step}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white-10 flex justify-end gap-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={() => onUpdate(selectedStep)}>
              Save Changes
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
