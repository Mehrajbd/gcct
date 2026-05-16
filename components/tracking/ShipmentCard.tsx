"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Package, Ship, MapPin } from "lucide-react";

export function ShipmentCard({ data }: { data: any }) {
  return (
    <GlassCard className="p-0 overflow-hidden border-green-border/50">
      <div className="bg-green-500/10 p-6 border-b border-green-border/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-mono text-white-50 block uppercase tracking-widest">Shipment ID</span>
            <h2 className="text-2xl font-mono font-bold text-green-400">{data.trackingId}</h2>
          </div>
          <Badge status={data.status} />
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <span className="text-[10px] font-mono text-white-50 block uppercase">ORIGIN</span>
            <p className="font-display font-bold text-lg leading-none">{data.origin.code}</p>
            <p className="text-[10px] text-white-80">{data.origin.port}, {data.origin.country}</p>
          </div>
          <div className="h-0.5 flex-1 bg-white-20 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-green-500">
               →
            </div>
          </div>
          <div className="flex-1 text-right">
            <span className="text-[10px] font-mono text-white-50 block uppercase">DESTINATION</span>
            <p className="font-display font-bold text-lg leading-none">{data.destination.code}</p>
            <p className="text-[10px] text-white-80">{data.destination.port}, {data.destination.country}</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <span className="text-[10px] font-mono text-white-50 block uppercase">Vessel</span>
          <p className="text-sm font-semibold">{data.vessel.name}</p>
          <p className="text-[10px] text-white-50">VOYAGE: {data.vessel.voyage}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-white-50 block uppercase">Exporter</span>
          <p className="text-sm font-semibold truncate">{data.exporter}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-white-50 block uppercase">Container No</span>
          <p className="text-sm font-mono font-semibold">{data.containerNo}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-white-50 block uppercase">Weight</span>
          <p className="text-sm font-semibold">{data.weight}</p>
        </div>
      </div>
    </GlassCard>
  );
}
