"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesGrid } from "@/components/home/ServicesGrid";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col pt-[72px]">
      <Navbar />
      <div className="flex-1 py-16">
        <ServicesGrid />
      </div>
      <Footer />
    </main>
  );
}
