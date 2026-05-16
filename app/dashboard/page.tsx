"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  LayoutDashboard, Package, Truck, Database, Settings, 
  Search, Edit2, Trash2, Plus, ArrowUpRight, Filter, X
} from "lucide-react";
import { StatusUpdateModal } from "@/components/dashboard/StatusUpdateModal";
import { cn } from "@/lib/utils";

const mockShipments = [
  {
    id: 1,
    trackingId: "GCCT-2025-BD-4821",
    exporter: "Ananta Garments Ltd.",
    origin: "CTG",
    destination: "HAM",
    status: "in-transit" as const,
    currentStep: 10,
    container: "MSKU1234567"
  },
  {
    id: 2,
    trackingId: "GCCT-2025-BD-4822",
    exporter: "Pacific Jeans",
    origin: "CTG",
    destination: "NYC",
    status: "pending" as const,
    currentStep: 2,
    container: "TCNU9876543"
  },
  {
    id: 3,
    trackingId: "GCCT-2025-BD-4824",
    exporter: "Mohammadi Group",
    origin: "CTG",
    destination: "RTM",
    status: "live" as const,
    currentStep: 6,
    container: "MAEU5544332"
  }
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState("Shipments");
  const [shipments, setShipments] = useState(mockShipments);
  const [editingShipment, setEditingShipment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin@gcct.com" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Try admin@gcct.com / admin123");
    }
  };

  const handleUpdateStatus = (newStep: number) => {
    setShipments(shipments.map(s => 
      s.id === editingShipment.id ? { ...s, currentStep: newStep } : s
    ));
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this shipment?")) {
      setShipments(shipments.filter(s => s.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-grid">
        <GlassCard className="w-full max-w-md p-8 md:p-12 space-y-8 border-green-500/20">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">Admin Login</h1>
            <p className="text-white-50 text-sm">Log in to manage the Global Cargo Tower.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white-50 tracking-widest">Username</label>
              <input 
                type="text" 
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="admin@gcct.com"
                className="w-full bg-brand-dark border border-white-10 rounded-lg px-4 py-3 outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white-50 tracking-widest">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-brand-dark border border-white-10 rounded-lg px-4 py-3 outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            
            {loginError && <p className="text-xs text-error font-medium">{loginError}</p>}
            
            <Button variant="primary" className="w-full py-4 text-brand-dark">
              Enter Dashboard
            </Button>
          </form>
          
          <div className="pt-6 border-t border-white-10">
             <p className="text-[10px] text-white-20 text-center uppercase tracking-widest">
               Credentials: admin@gcct.com / admin123
             </p>
          </div>
        </GlassCard>
      </main>
    );
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ... handleLogin, handleUpdateStatus, etc.

  // ... if (!isLoggedIn) return ...

  return (
    <main className="min-h-screen bg-brand-dark flex">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[80] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-brand-secondary z-[90] p-6 lg:hidden flex flex-col gap-8"
            >
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl tracking-tighter">
                      <span className="text-green-500">GC</span>
                      <span className="text-white">CT</span>
                    </span>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded font-mono font-bold">ADMIN</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white-50"><X size={24} /></button>
               </div>
               <div className="space-y-2">
                <SidebarLink icon={LayoutDashboard} label="Overview" active={activeTab === "Overview"} onClick={() => { setActiveTab("Overview"); setIsMobileMenuOpen(false); }} />
                <SidebarLink icon={Package} label="Shipments" active={activeTab === "Shipments"} onClick={() => { setActiveTab("Shipments"); setIsMobileMenuOpen(false); }} />
                <SidebarLink icon={Truck} label="Fleet Status" active={activeTab === "Fleet Status"} onClick={() => { setActiveTab("Fleet Status"); setIsMobileMenuOpen(false); }} />
                <SidebarLink icon={Database} label="System Logs" active={activeTab === "System Logs"} onClick={() => { setActiveTab("System Logs"); setIsMobileMenuOpen(false); }} />
              </div>
              <div className="mt-auto space-y-2">
                <SidebarLink icon={Settings} label="Global Settings" active={activeTab === "Settings"} onClick={() => { setActiveTab("Settings"); setIsMobileMenuOpen(false); }} />
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-all text-left"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="w-64 border-r border-white-10 p-6 hidden lg:flex flex-col gap-8 bg-brand-secondary/50 shrink-0 h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-display font-black text-2xl tracking-tighter">
            <span className="text-green-500">GC</span>
            <span className="text-white">CT</span>
          </span>
          <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded font-mono font-bold">ADMIN</span>
        </div>

        <div className="space-y-2">
          <SidebarLink icon={LayoutDashboard} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
          <SidebarLink icon={Package} label="Shipments" active={activeTab === "Shipments"} onClick={() => setActiveTab("Shipments")} />
          <SidebarLink icon={Truck} label="Fleet Status" active={activeTab === "Fleet Status"} onClick={() => setActiveTab("Fleet Status")} />
          <SidebarLink icon={Database} label="System Logs" active={activeTab === "System Logs"} onClick={() => setActiveTab("System Logs")} />
        </div>
        
        <div className="mt-auto space-y-2">
          <SidebarLink icon={Settings} label="Global Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-all text-left"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-white-10 flex items-center justify-between px-6 bg-brand-secondary/50 sticky top-0 z-50 backdrop-blur-md">
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-white-100"><LayoutDashboard size={24} /></button>
           <span className="font-display font-black text-xl tracking-tighter">
            <span className="text-green-500">GC</span>
            <span className="text-white">CT</span>
          </span>
          <button className="text-white-50"><Settings size={20} /></button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto max-h-screen no-scrollbar">
          {activeTab === "Shipments" ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">Shipment Control Center</h1>
                  <p className="text-white-50">Manage global tracking data and manual overrides.</p>
                </div>
                <Button variant="primary" className="gap-2">
                  <Plus size={18} /> New Shipment
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                 <StatCard label="Total Active" value="1,248" trend="+12%" />
                 <StatCard label="Live Tracking" value="842" color="text-green-400" />
                 <StatCard label="Flagged Delay" value="14" color="text-error" />
              </div>

              {/* Table Controls */}
              <div className="flex justify-between items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white-20" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search shipments..." 
                     className="w-full bg-brand-surface border border-white-10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-green-500 outline-none"
                   />
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                   <Filter size={18} /> Filter
                </Button>
              </div>

              {/* Main Table */}
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-brand-surface/50 border-b border-white-10">
                        <th className="p-4 text-xs font-mono uppercase text-white-50">Tracking ID</th>
                        <th className="p-4 text-xs font-mono uppercase text-white-50">Exporter</th>
                        <th className="p-4 text-xs font-mono uppercase text-white-50">Route</th>
                        <th className="p-4 text-xs font-mono uppercase text-white-50">Status</th>
                        <th className="p-4 text-xs font-mono uppercase text-white-50 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white-10">
                      {shipments.map((s, i) => (
                        <motion.tr 
                          key={s.trackingId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-white-[0.02] transition-colors group"
                        >
                          <td className="p-4">
                            <span className="font-mono font-bold text-green-400">{s.trackingId}</span>
                            <span className="block text-[10px] text-white-20 mt-1">{s.container}</span>
                          </td>
                          <td className="p-4">
                             <span className="text-sm font-semibold">{s.exporter}</span>
                          </td>
                          <td className="p-4">
                             <div className="flex items-center gap-2 text-sm">
                                <span className="font-bold">{s.origin}</span>
                                <span className="text-white-20">→</span>
                                <span className="font-bold">{s.destination}</span>
                             </div>
                          </td>
                          <td className="p-4">
                             <div className="flex flex-col gap-2 items-start">
                                <Badge status={s.status} className="scale-90 origin-left" />
                                <div className="flex items-center gap-2">
                                   <div className="h-1 w-24 bg-white-10 rounded-full overflow-hidden">
                                      <div className="h-full bg-green-500" style={{ width: `${(s.currentStep + 1) / 14 * 100}%` }} />
                                   </div>
                                   <span className="text-[10px] font-mono text-white-50">STEP {s.currentStep + 1}</span>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => { setEditingShipment(s); setIsModalOpen(true); }}
                                  className="p-2 text-white-50 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(s.id)}
                                  className="p-2 text-white-50 hover:text-error hover:bg-error/10 rounded-lg transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                             </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </>
          ) : activeTab === "Fleet Status" ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">Fleet Management</h1>
                  <p className="text-white-50">Real-time telemetry and status of all GCCT partner vehicles.</p>
                </div>
                <div className="flex gap-3">
                   <Button variant="ghost" className="text-xs">Export Report</Button>
                   <Button variant="primary" className="text-xs">Add Vehicle</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                 <FleetCard name="Truck #8821" driver="Rahim Uddin" status="En Route" progress={65} location="Dhaka-CTG Hwy" />
                 <FleetCard name="Truck #4492" driver="Karim Miah" status="Loading" progress={10} location="DEPZ, Savar" />
                 <FleetCard name="Vessel: MSC GAIA" driver="Capt. H. Miller" status="Ocean Transit" progress={82} location="Indian Ocean" type="ship" />
                 <FleetCard name="Truck #3321" driver="S. Alam" status="Idle" progress={0} location="Audit Port" color="text-warning" />
                 <FleetCard name="Truck #1102" driver="Habibullah" status="Maintenance" progress={0} location="Bogura Workshop" color="text-error" />
                 <FleetCard name="Vessel: COSCO" driver="Capt. Zhang" status="At Port" progress={100} location="Rotterdam Port" type="ship" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-white-5 flex items-center justify-center text-white-20">
                  <Database size={32} />
               </div>
               <h2 className="text-xl font-display font-bold">In Development</h2>
               <p className="text-white-50 max-w-sm">The {activeTab} module is currently being optimized for real-time data sync. Please check back soon.</p>
            </div>
          )}
        </div>
      </div>

      <StatusUpdateModal 
        isOpen={isModalOpen}
        shipment={editingShipment}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateStatus}
      />
    </main>
  );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active ? "bg-green-500 text-brand-dark shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "text-white-50 hover:bg-white-5 hover:text-white-100"
      )}
    >
      <Icon size={18} /> {label}
    </button>
  );
}

function StatCard({ label, value, trend, color = "text-white-100" }: any) {
  return (
    <GlassCard className="p-6 space-y-4">
      <p className="text-xs font-mono text-white-50 uppercase tracking-widest">{label}</p>
      <div className="flex justify-between items-end">
        <h3 className={cn("text-3xl font-display font-bold", color)}>{value}</h3>
        {trend && (
           <span className="text-xs text-green-400 flex items-center bg-green-500/10 px-2 py-0.5 rounded-full">
              {trend} <ArrowUpRight size={12} className="ml-1" />
           </span>
        )}
      </div>
    </GlassCard>
  );
}

function FleetCard({ name, driver, status, progress, location, type = "truck", color = "text-green-400" }: any) {
  return (
    <GlassCard className="p-6 space-y-4 group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg">{name}</h3>
          <p className="text-xs text-white-50">{driver}</p>
        </div>
        <div className={cn("p-2 rounded-lg bg-white-5", color)}>
          {type === "truck" ? <Truck size={20} /> : <ArrowUpRight size={20} />}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono uppercase text-white-50">
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white-10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={cn("h-full", color.replace("text-", "bg-"))} 
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 text-[10px] text-white-20 font-mono">
        <div className="w-1.5 h-1.5 rounded-full bg-white-20 animate-pulse" />
        {location}
      </div>
    </GlassCard>
  );
}
