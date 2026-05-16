"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

export function LiveMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Fix Leaflet marker icon issue in Next.js by importing L dynamically
    import("leaflet").then((L) => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isClient) return <div className="w-full h-full bg-brand-surface animate-pulse" />;

  const origin: [number, number] = [22.335, 91.832]; // Chittagong
  const destination: [number, number] = [53.551, 9.993]; // Hamburg
  const vessel: [number, number] = [35.0, 45.0]; // Mediterranean (mock)

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={[30, 50]} 
        zoom={3} 
        style={{ height: "100%", width: "100%", background: "#0A0F0A" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={origin} />
        <Marker position={destination} />
        <Marker 
          position={vessel}
          // In a real app, I'd use a custom ship icon here
        />
        <Polyline 
          positions={[origin, vessel, destination]} 
          color="#22C55E" 
          weight={2} 
          dashArray="10, 10" 
        />
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[1000] p-4 bg-brand-dark/90 border border-green-border rounded-xl backdrop-blur-md">
        <h4 className="text-xs font-mono font-bold text-green-500 mb-2 uppercase">Vessel Details</h4>
        <div className="space-y-1">
          <p className="text-[10px] text-white-50">NAME: <span className="text-white-100 font-semibold">MSC GAIA</span></p>
          <p className="text-[10px] text-white-50">SPEED: <span className="text-white-100 font-semibold">18.4 KTS</span></p>
          <p className="text-[10px] text-white-50">STATUS: <span className="text-green-500 font-semibold">ON TRACK</span></p>
        </div>
      </div>
    </div>
  );
}
