"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TrackingInput({ onSearch }: { onSearch: (id: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter Container No / BL / Tracking ID"
          className="w-full bg-brand-surface border border-green-border rounded-xl px-6 py-4 pl-12 text-sm font-mono text-white-100 placeholder:text-white-20 outline-none focus:border-green-500 transition-all focus:ring-1 focus:ring-green-500/50"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white-20 group-focus-within:text-green-500 transition-colors" size={20} />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4"
          variant="primary"
          size="sm"
        >
          Track
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-[10px] font-mono text-white-50 uppercase mr-2 mt-1.5">Recent:</span>
        <button className="text-[10px] font-mono px-2 py-1 bg-white-20 rounded border border-transparent hover:border-green-500/50 transition-colors">GCCT-2025-BD-4821</button>
        <button className="text-[10px] font-mono px-2 py-1 bg-white-20 rounded border border-transparent hover:border-green-500/50 transition-colors">MSKU1234567</button>
      </div>
    </div>
  );
}
