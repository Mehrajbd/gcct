"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/booking/BookingForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col pt-[72px]">
      <Navbar />

      <div className="flex-1 container mx-auto px-6 py-16">
        <SectionHeader 
          title="Book Your Shipment" 
          subtitle="Request a pickup, get instant freight estimates, and start tracking in minutes."
          eyebrow="Digital Logistics"
          align="center"
        />

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BookingForm />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
