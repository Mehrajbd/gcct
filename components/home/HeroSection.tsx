"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GreenDot } from "@/components/ui/GreenDot";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { RotatingGlobe } from "@/components/ui/RotatingGlobe";
import { ArrowRight, Box, MoveRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ x: string; y: string; opacity: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate particles only on the client
    const p = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      opacity: Math.random() * 0.2 + 0.1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(p);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-dark"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-glow rounded-full blur-[120px] opacity-40" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Scan Line */}
        <div className="scan-line top-0 opacity-10" />
        
        {/* Rotating Globe Background */}
        <div className="absolute -right-20 md:right-0 top-1/2 -translate-y-1/2 overflow-visible">
           <RotatingGlobe />
        </div>
        
        {/* Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            initial={{ 
              x: p.x, 
              y: p.y, 
              opacity: p.opacity 
            }}
            animate={{ 
              y: [null, "-=100", "+=50"],
              opacity: [p.opacity, p.opacity * 2, p.opacity]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >

          <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-white-100 leading-tight mb-6">
            From Factory to Buyer.<br />
            <span className="text-green-400">Without Blind Spots.</span>
          </h1>
          
          <p className="text-white-50 text-xl font-body mb-10 leading-relaxed max-w-lg">
            Bangladesh&apos;s first end-to-end digital freight platform. 
            Real-time GPS, ocean tracking, customs — all in one unified dashboard.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" className="gap-2 group">
              Track Shipment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" size="lg">
              Book Pickup
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            {/* Logo Placeholders */}
            <span className="text-xs font-mono uppercase tracking-widest text-white-50">Trusted by:</span>
            <div className="flex gap-6">
              <div className="w-24 h-6 bg-white-20 rounded" />
              <div className="w-24 h-6 bg-white-20 rounded" />
              <div className="w-24 h-6 bg-white-20 rounded" />
            </div>
          </div>
        </motion.div>

        {/* Floating Card Mockup */}
        <div className="hidden lg:block relative perspective-1000">
          <motion.div
            style={{
              rotateY: mousePos.x * 12,
              rotateX: -mousePos.y * 12,
              transition: "transform 0.1s ease-out"
            }}
          >
            <GlassCard className="w-[450px] space-y-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-500/20 blur-3xl rounded-full" />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white-50">TRACKING NUMBER</span>
                  <p className="text-lg font-mono font-bold text-green-400">GCCT-2025-BD-4821</p>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Box className="text-green-500" size={20} />
                </div>
              </div>

              <div className="flex items-center gap-4 py-4">
                <div className="text-center flex-1">
                  <p className="font-display font-bold text-xl">CTG</p>
                  <p className="text-xs text-white-50">CHITTAGONG</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-[1px] bg-white-20 relative">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 -left-1"
                      animate={{ left: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <GreenDot className="h-2 w-2" />
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-mono text-green-400">ON VESSEL</span>
                </div>
                <div className="text-center flex-1">
                  <p className="font-display font-bold text-xl">HAM</p>
                  <p className="text-xs text-white-50">HAMBURG</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white-20">
                <div>
                  <span className="text-[10px] font-mono text-white-50 block uppercase">Vessel</span>
                  <span className="text-sm font-semibold">MSC GAIA</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white-50 block uppercase">ETA</span>
                  <span className="text-sm font-semibold">04 FEB 2025</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-white-50 mb-2">
                  <span>TRANSIT PROGRESS</span>
                  <span>72%</span>
                </div>
                <div className="h-1.5 w-full bg-white-20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-green-500" 
                  />
                </div>
              </div>
            </GlassCard>

            {/* Background SVG Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] opacity-20 pointer-events-none">
                <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 200C200 100 600 300 700 200" stroke="#22C55E" strokeWidth="2" strokeDasharray="8 8" className="animate-draw-line" />
                  <circle cx="100" cy="200" r="4" fill="#22C55E" />
                  <circle cx="700" cy="200" r="4" fill="#22C55E" />
                </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
