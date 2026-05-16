"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SustainabilityHub } from "@/components/home/SustainabilityHub";
import { GlobalNetwork } from "@/components/home/GlobalNetwork";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-[72px]">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <StatsBar />
        <ServicesGrid />
        <HowItWorks />
        <SustainabilityHub />
        <GlobalNetwork />
      </motion.div>

      <Footer />
    </main>
  );
}
