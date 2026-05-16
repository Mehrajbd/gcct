"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrackingInput } from "@/components/tracking/TrackingInput";
import { ShipmentCard } from "@/components/tracking/ShipmentCard";
import { StatusTimeline } from "@/components/tracking/StatusTimeline";
import { LiveMap } from "@/components/tracking/LiveMap";
import { motion, AnimatePresence } from "framer-motion";

const mockShipment = {
  trackingId: "GCCT-2025-BD-4821",
  containerNo: "MSKU1234567",
  status: "in-transit" as const,
  currentStep: 10,
  origin: { port: "Chittagong", code: "CTG", country: "Bangladesh" },
  destination: { port: "Hamburg", code: "HAM", country: "Germany" },
  vessel: { name: "MSC GAIA", voyage: "ME241N" },
  exporter: "Ananta Garments Ltd.",
  weight: "12,450 KG",
};

export default function TrackingPage() {
  const [activeShipment, setActiveShipment] = useState(mockShipment);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (id: string) => {
    setIsLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      // For demo, any search returns the mock data with the new ID
      setActiveShipment({
        ...mockShipment,
        trackingId: id.startsWith("GCCT") ? id : `GCCT-2025-${id}`,
        containerNo: id.length > 8 ? id : mockShipment.containerNo
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-brand-dark flex flex-col pt-[72px]">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-72px)] overflow-hidden">
        {/* Left Panel: Details & Timeline */}
        <div className="w-full lg:w-[450px] xl:w-[550px] overflow-y-auto no-scrollbar border-r border-white-20 bg-brand-dark/50 backdrop-blur-sm z-10">
          <div className="p-6 md:p-8 space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-display font-bold">Track Shipment</h1>
              <p className="text-white-50 text-sm">Real-time container & BL tracking data.</p>
            </div>

            <TrackingInput onSearch={handleSearch} />

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center pt-20 space-y-4"
                >
                   <div className="w-12 h-12 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                   <p className="text-sm font-mono text-white-50">Querying Global Hub...</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key={activeShipment.trackingId}
                  className="space-y-12 pb-20"
                >
                  <ShipmentCard data={activeShipment} />
                  
                  <div className="px-2">
                    <h3 className="text-sm font-mono font-bold text-green-500 uppercase tracking-widest mb-8">Shipment Timeline</h3>
                    <StatusTimeline currentStep={activeShipment.currentStep} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0 bg-brand-surface">
          <LiveMap key={activeShipment.trackingId} />
        </div>
      </div>
    </main>
  );
}
