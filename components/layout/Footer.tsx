import Link from "next/link";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-green-border pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="font-display font-black text-2xl tracking-tighter">
              <span className="text-green-500">GC</span>
              <span className="text-white">CT</span>
            </Link>
            <p className="text-white-50 text-sm leading-relaxed max-w-xs">
              From Factory to Buyer — Without Blind Spots. Bangladesh&apos;s first end-to-end digital freight platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white-20 rounded-full hover:bg-green-500 transition-colors">
                <ExternalLink size={20} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-white-20 rounded-full hover:bg-green-500 transition-colors">
                <Mail size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white-100 mb-6">Services</h4>
            <ul className="space-y-4 text-white-50 text-sm">
              <li><Link href="#" className="hover:text-green-500 transition-colors">Factory Pickup</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">ICD Handling</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Ocean Freight</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Global Delivery</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Export Docs</Link></li>
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="font-display font-bold text-white-100 mb-6">Coverage</h4>
            <ul className="space-y-4 text-white-50 text-sm">
              <li><Link href="#" className="hover:text-green-500 transition-colors">Europe & UK</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">USA & Canada</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Middle East</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition-colors">Asia Pacific</Link></li>
              <li><Link href="/network" className="text-green-500 font-semibold mt-2 block">View All 20+ Countries →</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white-100 mb-6">Contact</h4>
            <ul className="space-y-4 text-white-50 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-green-500 shrink-0" />
                <span>Agrabad, Chattogram, Bangladesh</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-green-500 shrink-0" />
                <span>+880-XXX-XXXXXXX</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-green-500 shrink-0" />
                <span>hello@gcct.com.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white-50">
          <p>© 2025 GCCT. All rights reserved. Powered by SmartChain Logistics Platform.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white-100">Privacy Policy</Link>
            <Link href="#" className="hover:text-white-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
