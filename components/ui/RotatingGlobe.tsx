import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function RotatingGlobe() {
  const [dots, setDots] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const d = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 10
    }));
    setDots(d);
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-green-500/10 rounded-full blur-[100px] animate-pulse" />
      
      {/* The Globe Container */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full rounded-full border border-green-500/10 shadow-[inset_0_0_100px_rgba(34,197,94,0.05)] overflow-hidden"
      >
        {/* World Map Pattern (Simulated with curved paths) */}
        <div className="absolute inset-0 opacity-20 scale-[1.5]">
          <svg viewBox="0 0 800 400" className="w-full h-full fill-green-500/40">
            <path d="M150 100 Q 200 80, 250 120 T 350 150 T 450 100 T 550 130 T 650 90 T 750 140 V 300 H 150 Z" className="animate-pulse" />
            <path d="M50 200 Q 100 180, 150 220 T 250 250 T 350 200 T 450 230 T 550 190 T 650 240 L 650 350 H 50 Z" className="animate-pulse" />
          </svg>
        </div>

        {/* Latitudinal Lines */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`lat-${i}`}
            className="absolute w-full h-[1px] bg-green-500/10"
            style={{ top: `${(i + 1) * 11.1}%` }}
          />
        ))}
        
        {/* Longitudinal Lines */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={`long-${i}`}
            className="absolute inset-0 border-x border-green-500/5 rounded-full"
            style={{ transform: `rotateY(${i * 15}deg)` }}
          />
        ))}

        {/* Moving Transportation Hubs (Glowing Dots) */}
        {dots.map((dot, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,1)]"
            initial={{ 
              top: dot.top, 
              left: dot.left,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: dot.duration, 
              repeat: Infinity, 
              delay: dot.delay 
            }}
          />
        ))}
      </motion.div>

      {/* Atmospheric Ring */}
      <div className="absolute -inset-4 border border-green-500/5 rounded-full" />
    </div>
  );
}
