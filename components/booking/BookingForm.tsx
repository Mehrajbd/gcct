"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, ChevronRight, ChevronLeft, Package, Truck, Globe, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Cargo Details", icon: Package },
  { id: 2, label: "Pickup Info", icon: Truck },
  { id: 3, label: "Destination", icon: Globe },
  { id: 4, label: "Review", icon: ClipboardCheck },
];

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-8 relative">
           <div className="pulse-ring w-full h-full" />
           <CheckCircle2 className="text-green-500" size={48} />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4">Booking Confirmed!</h2>
        <p className="text-white-50 max-w-md mx-auto mb-10">
          Your shipment request has been received. Your tracking ID is:
          <span className="block text-2xl font-mono text-green-400 mt-2">GCCT-2025-BD-4893</span>
        </p>
        <div className="flex gap-4">
           <Link href="/tracking">
              <Button variant="primary">Track Shipment</Button>
           </Link>
           <Button variant="ghost" onClick={() => { setIsSuccess(false); setCurrentStep(1); }}>New Booking</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-12">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2 relative flex-1">
            <div 
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                step.id < currentStep ? "bg-green-500 border-green-500 text-brand-dark" :
                step.id === currentStep ? "border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" :
                "border-white-20 text-white-20"
              )}
            >
              {step.id < currentStep ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
            </div>
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-bold",
              step.id === currentStep ? "text-green-500" : "text-white-20"
            )}>
              {step.label}
            </span>
            {step.id < steps.length && (
              <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-white-20" />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <GlassCard className="p-8 md:p-12 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-8"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold">Cargo Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Company Name" placeholder="Ananta Garments" />
                  <FormSelect label="Exporter Type" options={["RMG", "Leather", "Jute", "Other"]} />
                  <FormInput label="Carton Quantity" placeholder="0" type="number" />
                  <FormInput label="Total Weight (KG)" placeholder="0" type="number" />
                </div>
                <FormTextArea label="Special Instructions" placeholder="Handle with care..." />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold">Pickup Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect label="District" options={["Dhaka", "Chattogram", "Gazipur", "Narayanganj"]} />
                  <FormInput label="Pickup Date" type="date" />
                  <FormInput label="Contact Person" placeholder="John Doe" />
                  <FormInput label="Phone Number" placeholder="+880" />
                </div>
                <FormTextArea label="Factory Address" placeholder="Detailed address..." />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold">Destination Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Destination Country" placeholder="Germany" />
                  <FormInput label="Buyer Company" placeholder="Esprit GmbH" />
                  <FormSelect label="Incoterms" options={["FOB", "CIF", "DDP", "EXW"]} />
                  <FormSelect label="Mode" options={["Ocean Freight", "Air Freight"]} />
                </div>
                <FormTextArea label="Delivery Address" placeholder="Full buyer warehouse address..." />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-green-400">Review & Estimated Quote</h3>
                <div className="p-6 bg-brand-surface rounded-xl border border-white-20 space-y-4">
                   <div className="flex justify-between text-sm">
                      <span className="text-white-50">Estimated Freight:</span>
                      <span className="text-green-400 font-mono font-bold">$2,450.00</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-white-50">Transit Time:</span>
                      <span className="font-semibold">22 - 25 Days</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-white-50">Route:</span>
                      <span className="font-semibold">CTG → HAM via MSC</span>
                   </div>
                </div>
                <p className="text-xs text-white-50 italic">
                   Note: This is an automated estimate. Final rates may vary based on exact volume and vessel availability at time of stuffing.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-12 pt-8 border-t border-white-20">
          <Button 
            variant="ghost" 
            onClick={prev} 
            disabled={currentStep === 1}
            className={cn(currentStep === 1 && "opacity-0")}
          >
            <ChevronLeft className="mr-2" size={18} /> Back
          </Button>
          
          {currentStep < steps.length ? (
            <Button variant="primary" onClick={next}>
              Next Step <ChevronRight className="ml-2" size={18} />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFinish}>
              Confirm Booking <CheckCircle2 className="ml-2" size={18} />
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function FormInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-white-50">{label}</label>
      <input 
        className="w-full bg-brand-dark/50 border border-white-20 rounded-lg px-4 py-3 placeholder:text-white-20 focus:border-green-500 outline-none transition-all"
        {...props} 
      />
    </div>
  );
}

function FormSelect({ label, options }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-white-50">{label}</label>
      <select className="w-full bg-brand-dark/50 border border-white-20 rounded-lg px-4 py-3 text-white-80 focus:border-green-500 outline-none transition-all">
         {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function FormTextArea({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-white-50">{label}</label>
      <textarea 
        className="w-full bg-brand-dark/50 border border-white-20 rounded-lg px-4 py-3 min-h-[100px] placeholder:text-white-20 focus:border-green-500 outline-none transition-all"
        {...props} 
      />
    </div>
  );
}
