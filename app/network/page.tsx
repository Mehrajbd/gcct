"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalNetwork } from "@/components/home/GlobalNetwork";

export default function NetworkPage() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col pt-[72px]">
      <Navbar />
      <div className="flex-1 py-16">
        <GlobalNetwork />
      </div>
      <Footer />
    </main>
  );
}
